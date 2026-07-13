import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';
import { sheets } from '@googleapis/sheets';
import { slugify } from '../src/lib/slugify.js';

async function fetchSheetRows() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:S';

    if (!clientEmail || !privateKey || !spreadsheetId) {
        throw new Error('Missing Google Sheets env vars');
    }

    const auth = new GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = sheets({ version: 'v4', auth });
    const response = await client.spreadsheets.values.get({ spreadsheetId, range });
    return response.data.values ?? [];
}

try {
    const rows = await fetchSheetRows();
    console.log('Row count:', rows.length);
    if (rows[0]) console.log('Headers:', rows[0]);
    if (rows[1]) console.log('First data row:', rows[1]);

    const nameIndex = rows[0]?.findIndex((h) => String(h).trim() === 'Company Name');
    console.log('Company Name column index:', nameIndex);

    if (rows.length > 1 && nameIndex >= 0) {
        const firstName = rows[1][nameIndex];
        console.log('First company:', firstName);
        console.log('Slug would be:', slugify(firstName));
    }
} catch (error) {
    console.error('Error:', error.message);
    if (error.response?.data) console.error(error.response.data);
}
