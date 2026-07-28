import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import {
    CORE_SITE_PAGES,
    LLMS_HEADER,
    SECTION_ORDER,
    SITE_ORIGIN,
    buildStaticPageUrl,
    formatLinkTitle,
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

function normalizeUrl(url) {
    if (!url) return null;

    try {
        const parsed = new URL(url, SITE_ORIGIN);
        let pathname = parsed.pathname || '/';
        if (!pathname.endsWith('/')) {
            pathname = `${pathname}/`;
        }
        return `${parsed.origin}${pathname}`;
    } catch {
        return null;
    }
}

function parseStaticPage(filePath, locale, slug) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
    const canonical = normalizeUrl($('link[rel="canonical"]').attr('href')?.trim());
    const fallbackUrl = buildStaticPageUrl(locale, slug);
    const url = canonical || fallbackUrl;
    const linkTitle = formatLinkTitle(title, locale, slug);
    const description =
        getPageDescription(slug) ||
        metaDescription ||
        `${linkTitle} landing page.`;

    return {
        section: getSectionForPage(locale, slug),
        linkTitle,
        url,
        description,
    };
}

function collectStaticPages() {
    const pages = [];

    for (const locale of readLocaleDirectories()) {
        const localeDir = path.join(STATIC_PAGES_ROOT, locale);
        const files = fs
            .readdirSync(localeDir)
            .filter((file) => file.endsWith('.html'))
            .sort();

        for (const file of files) {
            const slug = file.replace(/\.html$/, '');

            try {
                pages.push(parseStaticPage(path.join(localeDir, file), locale, slug));
            } catch (err) {
                console.warn(`Skip ${locale}/${slug}: ${err.message}`);
            }
        }
    }

    return pages;
}

function collectCorePages() {
    return CORE_SITE_PAGES.map((page) => ({
        section: page.section,
        linkTitle: page.title,
        url: normalizeUrl(page.url),
        description: page.description,
    }));
}

function dedupeByUrl(pages) {
    const seen = new Set();
    const unique = [];

    for (const page of pages) {
        if (!page?.url || seen.has(page.url)) {
            continue;
        }

        seen.add(page.url);
        unique.push(page);
    }

    return unique;
}

function sortPages(pages) {
    const sectionRank = new Map(SECTION_ORDER.map((section, index) => [section, index]));

    return [...pages].sort((a, b) => {
        const sectionDiff =
            (sectionRank.get(a.section) ?? 900) - (sectionRank.get(b.section) ?? 900);

        if (sectionDiff !== 0) {
            return sectionDiff;
        }

        // Keep unknown city sections grouped after known ones, alpha by section then title
        const sectionNameDiff = a.section.localeCompare(b.section);
        if (sectionNameDiff !== 0) {
            return sectionNameDiff;
        }

        return a.linkTitle.localeCompare(b.linkTitle);
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

        lines.push(`- [${page.linkTitle}](${page.url}): ${page.description}`);
    }

    lines.push('');
    return `${lines.join('\n')}`;
}

function main() {
    const pages = sortPages(dedupeByUrl([...collectCorePages(), ...collectStaticPages()]));
    const output = buildLlmsTxt(pages);

    fs.writeFileSync(OUTPUT_PATH, output);

    const sectionCount = new Set(pages.map((page) => page.section)).size;
    console.log(`Generated llms.txt (${pages.length} URLs across ${sectionCount} sections)`);
}

main();
