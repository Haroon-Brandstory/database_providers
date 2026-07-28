/** City/geo URL prefixes for static pages — not next-intl locales, not in header list. */
export const GEO_PREFIXES = ['dubai'];

/** Which header flag to show for each geo (display only — URL stays /{geo}/...). */
export const GEO_FLAG_LOCALE = {
    dubai: 'ae',
};

const geoPrefixSet = new Set(GEO_PREFIXES);

export function isGeoPrefix(segment) {
    return geoPrefixSet.has(segment);
}

/** Header flag locale for a path segment. Geo pages map to a country flag without changing URL. */
export function getFlagLocaleForSegment(segment) {
    if (isGeoPrefix(segment)) {
        return GEO_FLAG_LOCALE[segment] ?? 'en';
    }
    return null;
}
