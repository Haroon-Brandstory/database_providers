// src/lib/seo.js
export const localeMap = {
    en: "en-US",
    in: "en-IN",
    sg: "en-SG",
    my: "en-MY",
    ae: "en-AE",
};

const BASE_URL = "https://www.thedatabaseproviders.com";

/**
 * noIntl = true means NO hreflang will be generated.
 */
export function generateSeoMetadata({
    locale,
    slug,
    title,
    description,
    noIntl = false,
}) {
    const isHome = !slug;

    // Canonical URL
    const canonicalPath = isHome
        ? locale === "en"
            ? "/"
            : `/${locale}/`
        : locale === "en"
            ? `/${slug}`
            : `/${locale}/${slug}`;

    /** ------------------------------
     * If noIntl = true
     * → return ONLY canonical, no hreflang
     * -------------------------------*/
    if (noIntl) {
        return {
            title,
            description,
            alternates: {
                canonical: `${BASE_URL}${canonicalPath}`.replace(/\/+$/, "/"),
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    /** ------------------------------
     * HREFLANG generation (intl pages)
     * -------------------------------*/
    const languages = {};

    Object.entries(localeMap).forEach(([loc, langCode]) => {
        const url = isHome
            ? loc === "en"
                ? `${BASE_URL}/`
                : `${BASE_URL}/${loc}/`
            : loc === "en"
                ? `${BASE_URL}/${slug}`
                : `${BASE_URL}/${loc}/${slug}`;

        languages[langCode] = url;
    });

    // x-default
    languages["x-default"] = isHome
        ? `${BASE_URL}/`
        : `${BASE_URL}/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}${canonicalPath}`.replace(/\/+$/, "/"),
            languages,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
