import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { LOCALE_FREE_PAGE_SLUGS } from './lib/staticPages.js';

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

    const globalPages = [
        'thank-you',
        'blogs',
        'pricing-plans',
        'tools',
        'searchDatabase',
        'abm',
        ...LOCALE_FREE_PAGE_SLUGS,
    ];

    // Redirect localized global URLs to main URL
    // Example: /in/blogs/blog12 -> /blogs/blog12
    // Example: /in/pricing-plans -> /pricing-plans
    if (
        routing.locales.includes(localeSegment) &&
        globalPages.includes(pathParts[1])
    ) {
        const newPath = '/' + pathParts.slice(1).join('/');
        return NextResponse.redirect(new URL(newPath, request.url), 301);
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