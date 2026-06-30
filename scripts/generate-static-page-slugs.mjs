import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStaticPageSlugData } from '../src/lib/staticPageSlugData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '../src/lib/static-page-slugs.json');

const slugData = getStaticPageSlugData();

fs.writeFileSync(outputPath, `${JSON.stringify(slugData, null, 2)}\n`);

const localeSummary = Object.entries(slugData.STATIC_PAGE_SLUGS_BY_LOCALE)
    .map(([locale, slugs]) => `${locale}:${slugs.length}`)
    .join(', ');

console.log(`Generated static-page-slugs.json (${localeSummary})`);
