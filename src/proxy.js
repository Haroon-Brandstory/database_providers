import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { GEO_FLAG_LOCALE, isGeoPrefix } from './lib/geoPrefixes';
import {
    LOCALE_APP_SEGMENTS,
    NONLOCALE_APP_SEGMENTS,
} from './lib/navPaths';
import slugData from './lib/static-page-slugs.json';

const TRUE_GLOBAL_PAGES = [
    'thank-you',
    'blogs',
    'pricing-plans',
    'tools',
    'searchDatabase',
    'abm',
    'company',
    'careers',
    'case-studies',
    'news',
    'white-papers',
];

const LEGAL_PAGE_SLUGS = slugData.LEGAL_PAGE_SLUGS ?? [];
const STATIC_PAGE_SLUGS = slugData.STATIC_PAGE_SLUGS ?? [];
const LOCALE_FREE_PAGE_SLUGS = slugData.LOCALE_FREE_PAGE_SLUGS ?? [];

const legalSlugSet = new Set(LEGAL_PAGE_SLUGS);
const staticPageSlugSet = new Set(STATIC_PAGE_SLUGS);
const localeFreeSlugSet = new Set(LOCALE_FREE_PAGE_SLUGS);
const trueGlobalSet = new Set(TRUE_GLOBAL_PAGES);

const staticSlugSetsByLocale = Object.fromEntries(
    Object.entries(slugData.STATIC_PAGE_SLUGS_BY_LOCALE ?? {}).map(([locale, slugs]) => [
        locale,
        new Set(slugs),
    ])
);

function hasStaticPageForLocale(locale, slug) {
    if (locale === 'en') {
        return localeFreeSlugSet.has(slug);
    }

    return staticSlugSetsByLocale[locale]?.has(slug) ?? false;
}

function withTrailingSlash(pathname) {
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export default function proxy(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/sitemap.xml')) {
        return NextResponse.redirect(new URL('/en', request.url));
    }

    // Skip static files like images, videos, fonts, css, js
    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
    if (hasFileExtension) return NextResponse.next();

    const pathParts = pathname.split('/').filter(Boolean);
    const localeSegment = pathParts[0];
    const secondSegment = pathParts[1];

    // Geo prefix (dubai): only real static landings; never country/global app pages
    if (isGeoPrefix(localeSegment)) {
        // /dubai or /dubai/ → send to mapped country home
        if (!secondSegment) {
            const flagLocale = GEO_FLAG_LOCALE[localeSegment] || routing.defaultLocale;
            const dest = flagLocale === 'en' ? '/' : `/${flagLocale}/`;
            return NextResponse.redirect(new URL(dest, request.url), 301);
        }

        const restPath = pathParts.slice(1).join('/');

        // /dubai/blogs → /blogs
        if (
            trueGlobalSet.has(secondSegment) ||
            NONLOCALE_APP_SEGMENTS.has(secondSegment)
        ) {
            return NextResponse.redirect(
                new URL(withTrailingSlash(`/${restPath}`), request.url),
                301
            );
        }

        // /dubai/about → /ae/about
        if (LOCALE_APP_SEGMENTS.has(secondSegment)) {
            const flagLocale = GEO_FLAG_LOCALE[localeSegment] || 'ae';
            const dest =
                flagLocale === 'en'
                    ? withTrailingSlash(`/${restPath}`)
                    : withTrailingSlash(`/${flagLocale}/${restPath}`);
            return NextResponse.redirect(new URL(dest, request.url), 301);
        }

        // /dubai/{landing} only if HTML exists under static-pages/dubai
        if (hasStaticPageForLocale(localeSegment, secondSegment)) {
            const url = request.nextUrl.clone();
            url.pathname = withTrailingSlash(`/geo/${pathParts.join('/')}`);
            return NextResponse.rewrite(url);
        }

        // Unknown /dubai/foo → country home
        const flagLocale = GEO_FLAG_LOCALE[localeSegment] || routing.defaultLocale;
        const dest = flagLocale === 'en' ? '/' : `/${flagLocale}/`;
        return NextResponse.redirect(new URL(dest, request.url), 301);
    }

    // Redirect localized global URLs to main URL
    // Example: /in/blogs/blog12 -> /blogs/blog12
    // Keep /in/slug when that locale has its own static page
    if (routing.locales.includes(localeSegment) && secondSegment) {
        const isTrueGlobal = trueGlobalSet.has(secondSegment);
        const isLocaleFreeSlug = localeFreeSlugSet.has(secondSegment);
        const keepLocalizedStatic =
            localeSegment !== routing.defaultLocale &&
            hasStaticPageForLocale(localeSegment, secondSegment);

        if ((isTrueGlobal || isLocaleFreeSlug) && !keepLocalizedStatic) {
            const newPath = withTrailingSlash('/' + pathParts.slice(1).join('/'));
            return NextResponse.redirect(new URL(newPath, request.url), 301);
        }
    }

    // Same behavior as former next.config rewrites (without 1500+ config entries):
    // /privacy-policy → /legal/privacy-policy
    if (legalSlugSet.has(localeSegment)) {
        const url = request.nextUrl.clone();
        url.pathname = withTrailingSlash(`/legal/${pathParts.join('/')}`);
        return NextResponse.rewrite(url);
    }

    // /physicians-email-list → /en/physicians-email-list
    if (staticPageSlugSet.has(localeSegment)) {
        const url = request.nextUrl.clone();
        url.pathname = withTrailingSlash(`/en/${pathParts.join('/')}`);
        return NextResponse.rewrite(url);
    }

    // Allow true global pages without locale
    if (
        TRUE_GLOBAL_PAGES.some(
            (path) => pathname === `/${path}` || pathname.startsWith(`/${path}/`)
        )
    ) {
        return NextResponse.next();
    }

    // Let next-intl handle locale redirects
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel).*)'],
};
