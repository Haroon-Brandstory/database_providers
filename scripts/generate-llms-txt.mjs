import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import {
    BASE_SLUG_ORDER,
    EXCLUDED_SLUGS,
    LLMS_HEADER,
    SECTION_ORDER,
    formatLinkTitle,
    getBaseSlug,
    getPageDescription,
    getSectionForPage,
} from '../src/lib/llmsTxtData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_PAGES_ROOT = path.join(__dirname, '../src/content/static-pages');
const OUTPUT_PATH = path.join(__dirname, '../public/llms.txt');

function readLocaleDirectories() {
    if (!fs.existsSync(STATIC_PAGES_ROOT)) {
        return [];
    }

    return fs
        .readdirSync(STATIC_PAGES_ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
}

function parseStaticPage(filePath, locale, slug) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    const canonical = $('link[rel="canonical"]').attr('href')?.trim();
    const title = $('title').text().trim();

    if (!canonical || !title) {
        return null;
    }

    const section = getSectionForPage(locale, slug);
    const description = getPageDescription(slug);
    const baseSlug = getBaseSlug(slug);

    if (!section || !description || !BASE_SLUG_ORDER.includes(baseSlug)) {
        return null;
    }

    return {
        section,
        baseSlug,
        linkTitle: formatLinkTitle(title, locale, slug),
        url: canonical,
        description,
    };
}

function collectPages() {
    const pages = [];

    for (const locale of readLocaleDirectories()) {
        const localeDir = path.join(STATIC_PAGES_ROOT, locale);
        const files = fs
            .readdirSync(localeDir)
            .filter((file) => file.endsWith('.html'));

        for (const file of files) {
            const slug = file.replace(/\.html$/, '');

            if (EXCLUDED_SLUGS.has(slug)) {
                continue;
            }

            const page = parseStaticPage(path.join(localeDir, file), locale, slug);

            if (page) {
                pages.push(page);
            }
        }
    }

    return pages;
}

function sortPages(pages) {
    const sectionRank = new Map(SECTION_ORDER.map((section, index) => [section, index]));
    const slugRank = new Map(BASE_SLUG_ORDER.map((slug, index) => [slug, index]));

    return [...pages].sort((a, b) => {
        const sectionDiff = (sectionRank.get(a.section) ?? 999) - (sectionRank.get(b.section) ?? 999);

        if (sectionDiff !== 0) {
            return sectionDiff;
        }

        return (slugRank.get(a.baseSlug) ?? 999) - (slugRank.get(b.baseSlug) ?? 999);
    });
}

function buildLlmsTxt(pages) {
    const lines = [LLMS_HEADER.trimEnd()];

    let currentSection = null;

    for (const page of pages) {
        if (page.section !== currentSection) {
            currentSection = page.section;
            lines.push('', `## ${currentSection}`, '');
        }

        lines.push(
            `- [${page.linkTitle}](${page.url}): ${page.description}`
        );
    }

    lines.push('');
    return `${lines.join('\n')}`;
}

function main() {
    const pages = sortPages(collectPages());
    const output = buildLlmsTxt(pages);

    fs.writeFileSync(OUTPUT_PATH, output);

    const sectionCount = new Set(pages.map((page) => page.section)).size;
    console.log(`Generated llms.txt (${pages.length} URLs across ${sectionCount} sections)`);
}

main();
