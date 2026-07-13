import { LEGAL_ROUTE_SLUGS } from './staticPageSlugData.js';

export const SITE_ORIGIN = 'https://www.thedatabaseproviders.com';

export const LLMS_HEADER = `# Database Providers

> Database Providers (thedatabaseproviders.com) is a USA-based B2B data services company providing verified, permission-compliant email lists, business contact databases, and professional data for sales, marketing, and account-based marketing (ABM) teams. Coverage spans global industries — including healthcare, technology, finance, and other B2B sectors — with contacts ranging from C-level executives to functional decision-makers.

## Company Information

- **Legal / brand name:** Database Providers
- **Website:** https://www.thedatabaseproviders.com/
- **Headquarters:** United States
- **Industry:** B2B data services — verified email lists, contact databases, and professional/consumer data
- **Core offerings:** B2B email lists, business contact databases, targeted/segmented email lists (by industry, job title, company size, or zip code), bulk email leads, email marketing databases, and consumer email databases
- **Target customers:** B2B sales teams, marketing and demand-generation teams, ABM practitioners, and agencies running email marketing or outbound campaigns
- **Geographic markets covered:** United States (national and major metro markets), India (national and major metro markets), United Arab Emirates (national, Dubai, and other emirates), Singapore, and Malaysia
- **Content scope of this file:** Programmatic SEO landing pages for email list and contact database offerings, organized by country and city
`;

export const EXCLUDED_SLUGS = new Set([
    ...LEGAL_ROUTE_SLUGS,
    'professional-email-list',
]);

export const BASE_SLUG_ORDER = [
    'best-b2b-email-list-providers',
    'email-marketing-lists-for-purchase',
    'buy-email-database',
    'email-list-providers',
    'buy-email-leads',
    'best-email-list-providers',
    'buy-targeted-email-list',
    'buy-b2b-email-database',
    'mailing-list-providers',
    'b2b-email-list-providers',
    'buy-business-email-list',
    'buy-contact-database',
    'buy-email-lists-by-zip-code',
    'email-marketing-list-providers',
    'buy-email-marketing-database',
    'business-email-lists-for-sale',
    'top-email-list-providers',
    'best-email-marketing-list-providers',
    'business-email-list-providers',
    'email-data-list-providers',
    'best-place-to-buy-email-leads',
    'buy-bulk-email-leads',
    'targeted-email-lists-for-sale',
    'buy-email-contact-list',
    'buy-email-address-database',
    'buy-consumer-email-database',
];

export const PAGE_DESCRIPTIONS = Object.fromEntries(
    [
        ['best-b2b-email-list-providers', 'Overview of what makes a top-tier B2B email list provider.'],
        ['email-marketing-lists-for-purchase', 'Guide to purchasing ready-made email marketing lists.'],
        ['buy-email-database', 'How to buy a verified email database for outreach.'],
        ['email-list-providers', 'Directory-style guide to email list providers.'],
        ['buy-email-leads', 'Where and how to buy qualified email leads.'],
        ['best-email-list-providers', 'Comparison of the best email list providers.'],
        ['buy-targeted-email-list', 'Buying a targeted email list filtered by industry and role.'],
        ['buy-b2b-email-database', 'Purchasing a B2B email database for enterprise outreach.'],
        ['mailing-list-providers', 'Overview of mailing list providers and how to choose one.'],
        ['b2b-email-list-providers', 'B2B email list providers compared for accuracy and reach.'],
        ['buy-business-email-list', 'How to buy a business email list for campaigns.'],
        ['buy-contact-database', 'Buying a verified contact database of decision-makers.'],
        ['buy-email-lists-by-zip-code', 'Purchasing email lists segmented by zip code.'],
        ['email-marketing-list-providers', 'Choosing an email marketing list provider.'],
        ['buy-email-marketing-database', 'Buying a database built for email marketing campaigns.'],
        ['business-email-lists-for-sale', 'Business email lists available for sale.'],
        ['top-email-list-providers', 'Ranking of the top email list providers.'],
        ['best-email-marketing-list-providers', 'Best providers of email marketing lists.'],
        ['business-email-list-providers', 'Business email list providers compared.'],
        ['email-data-list-providers', 'Providers of structured email data lists.'],
        ['best-place-to-buy-email-leads', 'Where to find the best place to buy email leads.'],
        ['buy-bulk-email-leads', 'Buying bulk email leads at scale.'],
        ['targeted-email-lists-for-sale', 'Targeted email lists for sale by industry and title.'],
        ['buy-email-contact-list', 'How to buy an email contact list.'],
        ['buy-email-address-database', 'Purchasing a database of verified email addresses.'],
        ['buy-consumer-email-database', 'Buying a consumer email database for B2C outreach.'],
    ].map(([slug, description]) => [slug, description])
);

const US_CITY_SECTIONS = {
    'san-francisco': 'United States — San Francisco, CA',
    'san-jose': 'United States — San Jose, CA',
    'new-york-city': 'United States — New York City, NY',
    'seattle': 'United States — Seattle, WA',
    'austin': 'United States — Austin, TX',
    'los-angeles': 'United States — Los Angeles, CA',
    'chicago': 'United States — Chicago, IL',
    'boston': 'United States — Boston, MA',
    'denver': 'United States — Denver, CO',
    'san-diego': 'United States — San Diego, CA',
    'atlanta': 'United States — Atlanta, GA',
};

const IN_CITY_SECTIONS = {
    india: 'India (National)',
    bangalore: 'India — Bangalore',
    delhi: 'India — Delhi',
    chennai: 'India — Chennai',
    hyderabad: 'India — Hyderabad',
    mumbai: 'India — Mumbai',
    pune: 'India — Pune',
    kolkata: 'India — Kolkata',
    ahmedabad: 'India — Ahmedabad',
};

export const SECTION_ORDER = [
    'United States (National)',
    ...Object.values(US_CITY_SECTIONS),
    ...Object.values(IN_CITY_SECTIONS),
    'Singapore',
    'Malaysia',
];

export function getBaseSlug(slug) {
    const match = slug.match(/^(.+)-in-[a-z0-9-]+$/);
    return match ? match[1] : slug;
}

export function getLocationSuffix(slug) {
    const match = slug.match(/-in-([a-z0-9-]+)$/);
    return match?.[1] ?? null;
}

export function getSectionForPage(locale, slug) {
    const location = getLocationSuffix(slug);

    if (locale === 'en') {
        if (!location) {
            return 'United States (National)';
        }

        return US_CITY_SECTIONS[location] ?? null;
    }

    if (locale === 'in') {
        return IN_CITY_SECTIONS[location] ?? null;
    }

    if (locale === 'sg') {
        return 'Singapore';
    }

    if (locale === 'my') {
        return 'Malaysia';
    }

    return null;
}

export function formatLinkTitle(title, locale, slug) {
    let text = title.replace(/\s*\|\s*Database Providers\s*$/i, '').trim();

    if (locale === 'en' && !getLocationSuffix(slug)) {
        text = text.replace(/\s+in USA$/i, '');
    }

    return text;
}

export function getPageDescription(slug) {
    return PAGE_DESCRIPTIONS[getBaseSlug(slug)] ?? null;
}
