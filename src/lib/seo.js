export const localeMap = {
    en: "en-US",
    in: "en-IN",
    sg: "en-SG",
    my: "en-MY",
    ae: "en-AE",
};

const BASE_URL = "https://www.thedatabaseproviders.com";

export function generateSeoMetadata({
    locale,
    slug,
    title,
    description,
    noIntl = false,
    canonical,
}) {
    const isHome = !slug;

    const autoCanonicalPath = isHome ? (locale === "en" ? "/" : `/${locale}/`) : (locale === "en" ? `/${slug}` : `/${locale}/${slug}`);

    const autoCanonical = `${BASE_URL}${autoCanonicalPath}`.replace(/\/+$/, "/");

    const finalCanonical = canonical ? canonical : autoCanonical;

    /** -------------------------
     * NO INTL (no hreflang)
     * ------------------------- */
    if (noIntl) {
        return {
            title,
            description,
            alternates: {
                canonical: finalCanonical,   // FIXED: now uses override
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    /** -------------------------
     * INTL (hreflang enabled)
     * ------------------------- */
    const languages = {};

    Object.entries(localeMap).forEach(([loc, langCode]) => {
        const url = isHome ? (loc === "en" ? `${BASE_URL}/` : `${BASE_URL}/${loc}/`) : (loc === "en" ? `${BASE_URL}/${slug}` : `${BASE_URL}/${loc}/${slug}`);
        languages[langCode] = url;
    });

    languages["x-default"] = isHome
        ? `${BASE_URL}/`
        : `${BASE_URL}/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: finalCanonical,
            languages,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
