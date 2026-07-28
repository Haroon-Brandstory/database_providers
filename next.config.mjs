import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

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
            }
        ],
    },
    // DO NOT add i18n config here when using next-intl
    trailingSlash: true,
    // EN locale-free + legal rewrites live in src/proxy.js (Set lookup)
    // to avoid Next.js 1000+ custom-routes warning from per-slug rewrites.
};

export default withNextIntl(nextConfig);
