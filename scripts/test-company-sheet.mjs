import 'dotenv/config';
import { fetchSheetRows } from '../src/lib/googleSheets.js';
import { slugify } from '../src/lib/slugify.js';

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
