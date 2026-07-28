import createNextIntlPlugin from 'next-intl/plugin';
import slugData from './src/lib/static-page-slugs.json' with { type: 'json' };

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

const LEGAL_PAGE_SLUGS = slugData.LEGAL_PAGE_SLUGS ?? [];
const STATIC_PAGE_SLUGS = slugData.STATIC_PAGE_SLUGS ?? [];

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
