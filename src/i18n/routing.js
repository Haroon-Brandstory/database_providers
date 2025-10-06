import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'in', 'usa', 'uae', 'sgp', 'tur'],
    defaultLocale: 'en',
    localePrefix: {
        mode: 'as-needed',
    }
});