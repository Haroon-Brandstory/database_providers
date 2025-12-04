import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'thedatabaseproviders.com'],
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/uploads/**',
        }],
    },
    // DO NOT add i18n config here when using next-intl
    trailingSlash: true,

};

export default withNextIntl(nextConfig);