import fs from 'fs';
import path from 'path';

const STATIC_PAGES_ROOT = path.join(process.cwd(), 'src/content/static-pages');

// Routing config only — which en pages use /legal/[slug] vs /en/[slug]
export const LEGAL_ROUTE_SLUGS = new Set([
    'privacy-policy',
    'data-security-policy',
    'gdpr-ccpa-privacy-notice',
    'do-not-sell-share',
    'do-not-call-compliance',
    'cookie-policy',
    'disclaimer',
]);

function readSlugNamesFromDir(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.html'))
        .map((file) => file.replace(/\.html$/, ''))
        .sort();
}

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

export function getStaticPageSlugData() {
    const staticPageSlugsByLocale = {};

    for (const locale of readLocaleDirectories()) {
        staticPageSlugsByLocale[locale] = readSlugNamesFromDir(
            path.join(STATIC_PAGES_ROOT, locale)
        );
    }

    const enSlugs = staticPageSlugsByLocale.en ?? [];

    return {
        LEGAL_PAGE_SLUGS: enSlugs.filter((slug) => LEGAL_ROUTE_SLUGS.has(slug)),
        STATIC_PAGE_SLUGS: enSlugs.filter((slug) => !LEGAL_ROUTE_SLUGS.has(slug)),
        LOCALE_FREE_PAGE_SLUGS: enSlugs,
        STATIC_PAGE_SLUGS_BY_LOCALE: staticPageSlugsByLocale,
    };
}
