import slugData from './static-page-slugs.json';

const localeFreeSlugSet = new Set(slugData.LOCALE_FREE_PAGE_SLUGS);
const staticSlugSetsByLocale = Object.fromEntries(
    Object.entries(slugData.STATIC_PAGE_SLUGS_BY_LOCALE ?? {}).map(([locale, slugs]) => [
        locale,
        new Set(slugs),
    ])
);

export function isLocaleFreePageSlug(slug) {
    return localeFreeSlugSet.has(slug);
}

export function isStaticPageSlugForLocale(locale, slug) {
    if (locale === 'en') {
        return localeFreeSlugSet.has(slug);
    }

    return staticSlugSetsByLocale[locale]?.has(slug) ?? false;
}
