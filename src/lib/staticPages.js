// Legal pages — served via /legal/[slug]
export const LEGAL_PAGE_SLUGS = [
    'privacy-policy',
    'data-security-policy',
    'gdpr-ccpa-privacy-notice',
    'do-not-sell-share',
    'do-not-call-compliance',
    'cookie-policy',
    'disclaimer',
];

// Marketing static pages from src/content/static-pages/en (excluding legal pages).
export const STATIC_PAGE_SLUGS = [
    'b2b-email-list-providers',
    'b2b-email-list-providers-in-san-francisco',
    'best-b2b-email-list-providers',
    'best-b2b-email-list-providers-in-san-francisco',
    'best-email-list-providers',
    'best-email-list-providers-in-san-francisco',
    'best-email-marketing-list-providers',
    'best-email-marketing-list-providers-in-san-francisco',
    'best-place-to-buy-email-leads',
    'best-place-to-buy-email-leads-in-san-francisco',
    'business-email-list-providers',
    'business-email-list-providers-in-san-francisco',
    'business-email-lists-for-sale',
    'business-email-lists-for-sale-in-san-francisco',
    'buy-b2b-email-database',
    'buy-b2b-email-database-in-san-francisco',
    'buy-bulk-email-leads',
    'buy-bulk-email-leads-in-san-francisco',
    'buy-business-email-list',
    'buy-business-email-list-in-san-francisco',
    'buy-consumer-email-database',
    'buy-consumer-email-database-in-san-francisco',
    'buy-contact-database',
    'buy-contact-database-in-san-francisco',
    'buy-email-address-database',
    'buy-email-address-database-in-san-francisco',
    'buy-email-contact-list',
    'buy-email-contact-list-in-san-francisco',
    'buy-email-database',
    'buy-email-database-in-san-francisco',
    'buy-email-leads',
    'buy-email-leads-in-san-francisco',
    'buy-email-lists-by-zip-code',
    'buy-email-lists-by-zip-code-in-san-francisco',
    'buy-email-marketing-database',
    'buy-email-marketing-database-in-san-francisco',
    'buy-targeted-email-list',
    'buy-targeted-email-list-in-san-francisco',
    'email-data-list-providers',
    'email-data-list-providers-in-san-francisco',
    'email-list-providers',
    'email-list-providers-in-san-francisco',
    'email-marketing-list-providers',
    'email-marketing-list-providers-in-san-francisco',
    'email-marketing-lists-for-purchase',
    'email-marketing-lists-for-purchase-in-san-francisco',
    'mailing-list-providers',
    'mailing-list-providers-in-san-francisco',
    'professional-email-list',
    'targeted-email-lists-for-sale',
    'targeted-email-lists-for-sale-in-san-francisco',
    'top-email-list-providers',
    'top-email-list-providers-in-san-francisco',
];

export const LOCALE_FREE_PAGE_SLUGS = [...LEGAL_PAGE_SLUGS, ...STATIC_PAGE_SLUGS];

const legalSlugSet = new Set(LEGAL_PAGE_SLUGS);
const staticSlugSet = new Set(STATIC_PAGE_SLUGS);
const localeFreeSlugSet = new Set(LOCALE_FREE_PAGE_SLUGS);

export function isLegalPageSlug(slug) {
    return legalSlugSet.has(slug);
}

export function isStaticPageSlug(slug) {
    return staticSlugSet.has(slug);
}

export function isLocaleFreePageSlug(slug) {
    return localeFreeSlugSet.has(slug);
}
