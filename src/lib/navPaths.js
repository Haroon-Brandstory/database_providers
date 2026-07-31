import { GEO_FLAG_LOCALE, isGeoPrefix } from './geoPrefixes.js';
import { isStaticPageSlugForLocale } from './localeFreePageSlugs.js';

/**
 * Root-only app routes — never prefix with country or geo (/dubai, /in, …).
 */
export const NONLOCALE_APP_PATHS = new Set([
    '/blogs',
    '/tools',
    '/case-studies',
    '/news',
    '/white-papers',
    '/careers',
    '/abm',
    '/pricing-plans',
    '/searchDatabase',
    '/thank-you',
    '/company',
]);

/**
 * Dedicated pages under src/app/[locale]/…
 * On geo (dubai), these map to the flag country (ae), never /dubai/about.
 */
export const LOCALE_APP_PATHS = new Set([
    '/about',
    '/contact-us',
    '/testimonials',
    '/videos',
    '/home',
]);

export const LOCALE_APP_SEGMENTS = new Set(
    [...LOCALE_APP_PATHS].map((path) => path.replace(/^\//, ''))
);

export const NONLOCALE_APP_SEGMENTS = new Set(
    [...NONLOCALE_APP_PATHS].map((path) => path.replace(/^\//, ''))
);

export function normalizeNavPath(url) {
    if (!url || url === '#') return url;
    let path = url.startsWith('/') ? url : `/${url}`;
    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    return path;
}

function firstSegment(path) {
    return path.replace(/^\//, '').split('/')[0] || '';
}

export function isNonLocaleAppPath(path) {
    const normalized = normalizeNavPath(path);
    if (!normalized || normalized === '#') return false;
    return NONLOCALE_APP_SEGMENTS.has(firstSegment(normalized));
}

export function isLocaleAppPath(path) {
    const normalized = normalizeNavPath(path);
    if (!normalized || normalized === '#') return false;
    return LOCALE_APP_PATHS.has(normalized);
}

/**
 * Build href for header/footer/nav.
 * @param {string} path - app path e.g. /about or /physicians-email-list
 * @param {string} urlPrefix - first URL segment: en|in|ae|sg|my|dubai (or "")
 */
export function resolveNavHref(path, urlPrefix) {
    const normalized = normalizeNavPath(path);
    if (!normalized || normalized === '#') return normalized;

    // Global site routes — never geo/country prefix
    if (isNonLocaleAppPath(normalized)) {
        return normalized;
    }

    const prefix = urlPrefix && urlPrefix !== 'en' ? urlPrefix : null;

    if (!prefix) {
        return normalized;
    }

    const slug = firstSegment(normalized);

    // Geo (dubai): only static landings keep /dubai/…
    if (isGeoPrefix(prefix)) {
        if (isLocaleAppPath(normalized)) {
            const flagLocale = GEO_FLAG_LOCALE[prefix] || 'en';
            if (flagLocale === 'en') return normalized;
            return `/${flagLocale}${normalized}`;
        }

        if (isStaticPageSlugForLocale(prefix, slug)) {
            return `/${prefix}${normalized}`;
        }

        // Missing dubai landing → EN root URL
        return normalized;
    }

    // Country locale: prefix [locale] pages + static slugs
    return `/${prefix}${normalized}`;
}
