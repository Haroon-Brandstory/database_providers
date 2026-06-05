export const LEGAL_PAGE_SLUGS = [
    'privacy-policy',
    'data-security-policy',
    'gdpr-ccpa-privacy-notice',
    'do-not-sell-share',
    'do-not-call-compliance',
    'cookie-policy',
    'disclaimer',
];

export function isLegalPageSlug(slug) {
    return LEGAL_PAGE_SLUGS.includes(slug);
}
