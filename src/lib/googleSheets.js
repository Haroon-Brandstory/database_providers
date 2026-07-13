import 'server-only';

import { GoogleAuth } from 'google-auth-library';
import { sheets } from '@googleapis/sheets';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let sheetsClientPromise = null;

function getGoogleCredentials() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
        return null;
    }

    return {
        client_email: clientEmail,
        private_key: privateKey,
    };
}

function getSheetsClient() {
    if (sheetsClientPromise) {
        return sheetsClientPromise;
    }

    const credentials = getGoogleCredentials();

    if (!credentials) {
        return null;
    }

    sheetsClientPromise = (async () => {
        const auth = new GoogleAuth({
            credentials,
            scopes: [SHEETS_SCOPE],
        });

        return sheets({ version: 'v4', auth });
    })();

    return sheetsClientPromise;
}

export async function fetchSheetRows() {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:S';
    const client = await getSheetsClient();

    if (!spreadsheetId || !client) {
        return [];
    }

    const response = await client.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    return response.data.values ?? [];
}
