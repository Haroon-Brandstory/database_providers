import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

const STATIC_PAGES_GLOB = ['./src/content/static-pages/**/*'];

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'thedatabaseproviders.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'light-agreement-480bf24ca8.media.strapiapp.com',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                pathname: '/**',
            },
        ],
    },
    // DO NOT add i18n config here when using next-intl
    trailingSlash: true,
    // EN locale-free + legal rewrites live in src/proxy.js (Set lookup)
    // to avoid Next.js 1000+ custom-routes warning from per-slug rewrites.

    // Vercel: force HTML into serverless bundles (dynamic fs paths alone are unreliable).
    outputFileTracingIncludes: {
        '/*': STATIC_PAGES_GLOB,
        '/[locale]/[slug]': STATIC_PAGES_GLOB,
        '/legal/[slug]': STATIC_PAGES_GLOB,
        '/geo/[geo]/[slug]': STATIC_PAGES_GLOB,
    },

    // Quiet known Turbopack warn from intentional runtime fs reads of static-pages/.
    // Files still ship via outputFileTracingIncludes above.
    turbopack: {
        ignoreIssue: [
            {
                path: '**/src/lib/staticPage.js',
                description: /Overly broad patterns/i,
            },
            {
                path: '**/src/lib/staticPage.js',
                title: /Overly broad patterns/i,
            },
        ],
    },
};

export default withNextIntl(nextConfig);
