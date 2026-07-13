import { google } from 'googleapis';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

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
    const credentials = getGoogleCredentials();

    if (!credentials) {
        return null;
    }

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [SHEETS_SCOPE],
    });

    return google.sheets({ version: 'v4', auth });
}

export async function fetchSheetRows() {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:S';
    const sheets = getSheetsClient();

    if (!spreadsheetId || !sheets) {
        return [];
    }

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    return response.data.values ?? [];
}
