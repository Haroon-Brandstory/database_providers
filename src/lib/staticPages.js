import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStaticPageSlugData } from './staticPageSlugData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EMPTY_SLUG_DATA = {
    LEGAL_PAGE_SLUGS: [],
    STATIC_PAGE_SLUGS: [],
    LOCALE_FREE_PAGE_SLUGS: [],
    STATIC_PAGE_SLUGS_BY_LOCALE: {},
};

function loadJsonFallback() {
    const jsonPath = path.join(__dirname, 'static-page-slugs.json');

    if (!existsSync(jsonPath)) {
        return EMPTY_SLUG_DATA;
    }

    return JSON.parse(readFileSync(jsonPath, 'utf8'));
}

function loadSlugData() {
    try {
        return getStaticPageSlugData();
    } catch {
        return loadJsonFallback();
    }
}

const {
    LEGAL_PAGE_SLUGS,
    STATIC_PAGE_SLUGS,
    LOCALE_FREE_PAGE_SLUGS,
    STATIC_PAGE_SLUGS_BY_LOCALE,
} = loadSlugData();

export {
    LEGAL_PAGE_SLUGS,
    STATIC_PAGE_SLUGS,
    LOCALE_FREE_PAGE_SLUGS,
    STATIC_PAGE_SLUGS_BY_LOCALE,
};

const legalSlugSet = new Set(LEGAL_PAGE_SLUGS);
const staticSlugSet = new Set(STATIC_PAGE_SLUGS);
const localeFreeSlugSet = new Set(LOCALE_FREE_PAGE_SLUGS);
const staticSlugSetsByLocale = Object.fromEntries(
    Object.entries(STATIC_PAGE_SLUGS_BY_LOCALE).map(([locale, slugs]) => [locale, new Set(slugs)])
);

export function isLegalPageSlug(slug) {
    return legalSlugSet.has(slug);
}

export function isStaticPageSlug(slug) {
    return staticSlugSet.has(slug);
}

export function isLocaleFreePageSlug(slug) {
    return localeFreeSlugSet.has(slug);
}

export function isStaticPageSlugForLocale(locale, slug) {
    if (locale === 'en') {
        return localeFreeSlugSet.has(slug);
    }

    return staticSlugSetsByLocale[locale]?.has(slug) ?? false;
}
