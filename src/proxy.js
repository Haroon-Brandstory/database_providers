import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { isGeoPrefix } from './lib/geoPrefixes';
import slugData from './lib/static-page-slugs.json';

const TRUE_GLOBAL_PAGES = [
    'thank-you',
    'blogs',
    'pricing-plans',
    'tools',
    'searchDatabase',
    'abm',
    'company',
];

const LOCALE_FREE_PAGE_SLUGS = slugData.LOCALE_FREE_PAGE_SLUGS ?? [];
const localeFreeSlugSet = new Set(LOCALE_FREE_PAGE_SLUGS);
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

export default function proxy(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/sitemap.xml")) {
        return NextResponse.redirect(new URL("/en", request.url));
    }

    // Skip static files like images, videos, fonts, css, js
    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
    if (hasFileExtension) return NextResponse.next();

    const pathParts = pathname.split('/').filter(Boolean);
    const localeSegment = pathParts[0];
    const secondSegment = pathParts[1];

    // City/geo static pages: /dubai/slug → internal /geo/dubai/slug (not a header locale)
    if (isGeoPrefix(localeSegment)) {
        if (!secondSegment) {
            return NextResponse.next();
        }

        const url = request.nextUrl.clone();
        url.pathname = `/geo/${pathParts.join('/')}`;
        return NextResponse.rewrite(url);
    }

    const globalPages = [
        ...TRUE_GLOBAL_PAGES,
        ...LOCALE_FREE_PAGE_SLUGS,
    ];

    // Redirect localized global URLs to main URL
    // Example: /in/blogs/blog12 -> /blogs/blog12
    // Example: /in/pricing-plans -> /pricing-plans
    // Keep /in/slug when that locale has its own static page
    if (
        routing.locales.includes(localeSegment) &&
        secondSegment
    ) {
        const isTrueGlobal = TRUE_GLOBAL_PAGES.includes(secondSegment);
        const isLocaleFreeSlug = localeFreeSlugSet.has(secondSegment);
        const keepLocalizedStatic =
            localeSegment !== routing.defaultLocale &&
            hasStaticPageForLocale(localeSegment, secondSegment);

        if ((isTrueGlobal || isLocaleFreeSlug) && !keepLocalizedStatic) {
            const newPath = '/' + pathParts.slice(1).join('/');
            return NextResponse.redirect(new URL(newPath, request.url), 301);
        }
    }

    // Allow global pages without locale
    if (
        globalPages.some((path) =>
            pathname === `/${path}` || pathname.startsWith(`/${path}/`)
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
