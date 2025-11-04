import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'in', 'ae', 'sg', 'my'],
    defaultLocale: 'en',
    localePrefix: {
        mode: 'as-needed',
    }
});