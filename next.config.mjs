import createNextIntlPlugin from 'next-intl/plugin';
import { LEGAL_PAGE_SLUGS, STATIC_PAGE_SLUGS } from './src/lib/staticPages.js';

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

    async rewrites() {
        return [
            ...LEGAL_PAGE_SLUGS.map((slug) => ({
                source: `/${slug}/:path*`,
                destination: `/legal/${slug}/:path*`,
            })),
            ...STATIC_PAGE_SLUGS.map((slug) => ({
                source: `/${slug}/:path*`,
                destination: `/en/${slug}/:path*`,
            })),
        ];
    },
};

export default withNextIntl(nextConfig);