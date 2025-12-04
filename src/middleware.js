import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default function middleware(request) {
    const { pathname } = request.nextUrl;
    const currentPathname = request.nextUrl.pathname;

    if (currentPathname.startsWith("/sitemap.xml")) {
        return NextResponse.redirect(new URL("/en", request.url));
    }

    // Skip static files (images, videos, fonts)
    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
    if (hasFileExtension) return NextResponse.next();

    // // Pages you want to always serve without /en
    // const defaultLocalePages = ['/blogs', '/testimonials', '/videos','/contact-us'];

    // // If path starts with /in, /usa, etc., redirect to default if it's one of the pages
    // const localeSegment = pathname.split('/')[1];
    // if (routing.locales.includes(localeSegment)) {
    //     const restOfPath = pathname.replace(`/${localeSegment}`, '');
    //     if (defaultLocalePages.includes(restOfPath)) {
    //         return NextResponse.redirect(new URL(restOfPath, request.url));
    //     }
    // }

    const globalPages = ['/thank-you', '/blogs'];
    if (globalPages.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Let next-intl handle locale redirects
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel).*)'],
};

// // ****************************************************************************************

// import { NextResponse } from 'next/server';

// // Declare supported locales
// const locales = ['en', 'in', 'usa', 'uae', 'sgp', 'tur'];
// // const locales = ['in', 'usa', 'uae', 'sgp', 'tur'];
// const defaultLocale = 'en';

// function getLocaleFromPath(pathname) {
//     // console.log(pathname);
//     const match = pathname.match(/^\/([^\/]+)(?:\/|$)/);
//     return match ? match[1] : null;
// }

// export function middleware(request) {
//     const { pathname } = request.nextUrl;

//     // 1) Skip Next internals & API
//     if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/.well-known')) {
//         return NextResponse.next();
//     }

//     const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
//     const segment = getLocaleFromPath(pathname);

//     // 2) If a static asset request is prefixed with a locale, rewrite to root path
//     if (hasFileExtension && segment && locales.includes(segment)) {
//         const rest = pathname.replace(new RegExp(`^/${segment}`), '');
//         return NextResponse.rewrite(new URL(rest || '/', request.url));
//     }

//     // 3) Skip static files from public (any path ending with an extension)
//     if (hasFileExtension) {
//         return NextResponse.next();
//     }

//     // 4) Redirect root "/" to default locale
//     if (pathname === '/') {
//         return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
//     }

//     // 5) If first segment is not a supported locale, redirect to /en + rest
//     if (!segment || !locales.includes(segment)) {
//         const withoutLeadingSlash = pathname.startsWith('/') ? pathname.slice(1) : pathname;
//         const rest = withoutLeadingSlash.includes('/') ? withoutLeadingSlash.substring(withoutLeadingSlash.indexOf('/')) : '';
//         return NextResponse.redirect(new URL(`/${defaultLocale}${rest}`, request.url));
//     }

//     return NextResponse.next();
// }

// // export const config = {
// //     matcher: ['/((?!_next|api).*)']
// // };

// // the above one was the prev config we used - to check as we get rid of the .well-known issue, we are removing it even from the matcher

// export const config = {
//     matcher: ['/((?!_next|api|.well-known).*)'],
// };

// // ****************************************************************************************


// // import { NextResponse } from 'next/server';

// // // Declare supported locales
// // const locales = ['en', 'in', 'usa', 'uae', 'sgp', 'tur'];
// // const defaultLocale = 'en';

// // function getLocaleFromPath(pathname) {
// //     const match = pathname.match(/^\/([^\/]+)(?:\/|$)/);
// //     return match ? match[1] : null;
// // }

// // export function middleware(request) {
// //     const { pathname } = request.nextUrl;

// //     // 1) Skip Next internals & API
// //     if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/.well-known')) {
// //         return NextResponse.next();
// //     }

// //     const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);
// //     const segment = getLocaleFromPath(pathname);

// //     // 2) If a static asset request is prefixed with a locale, rewrite to root path
// //     if (hasFileExtension && segment && locales.includes(segment)) {
// //         const rest = pathname.replace(new RegExp(`^/${segment}`), '');
// //         return NextResponse.rewrite(new URL(rest || '/', request.url));
// //     }

// //     // 3) Skip static files from public (any path ending with an extension)
// //     if (hasFileExtension) {
// //         return NextResponse.next();
// //     }

// //     // 4) Rewrite root "/" to internal /en (URL remains "/")
// //     if (pathname === '/') {
// //         const url = request.nextUrl.clone();
// //         url.pathname = `/${defaultLocale}`;
// //         return NextResponse.rewrite(url);
// //     }

// //     // 5) If first segment is not a supported locale, redirect to /en + rest
// //     if (!segment || !locales.includes(segment)) {
// //         const withoutLeadingSlash = pathname.startsWith('/') ? pathname.slice(1) : pathname;
// //         const rest = withoutLeadingSlash.includes('/') ? withoutLeadingSlash.substring(withoutLeadingSlash.indexOf('/')) : '';
// //         return NextResponse.redirect(new URL(`/${defaultLocale}${rest}`, request.url));
// //     }

// //     return NextResponse.next();
// // }

// // export const config = {
// //     matcher: ['/((?!_next|api|.well-known).*)'],
// // };
