import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { fetchSheetRows } from './googleSheets';
import { slugify } from './slugify';

const SHEET_FIELD_MAP = {
    'Company Name': 'companyName',
    '# Employees': 'employees',
    Industry: 'industry',
    Website: 'website',
    'Company Linkedin Url': 'linkedin',
    'Facebook Url': 'facebook',
    'Twitter Url': 'twitter',
    'Company City': 'city',
    'Company State': 'state',
    'Company Country': 'country',
    'Company Postal Code': 'postalCode',
    'Company Address': 'address',
    'Total Funding': 'totalFunding',
    'Latest Funding': 'latestFunding',
    'Latest Funding Amount': 'latestFundingAmount',
    'Last Raised At': 'lastRaisedAt',
    'Annual Revenue': 'annualRevenue',
    'Founded Year': 'foundedYear',
    'Logo Url': 'logoUrl',
};

function normalizeHeader(header) {
    return String(header || '').trim();
}

function rowToCompany(headers, row) {
    const company = {};

    headers.forEach((header, index) => {
        const field = SHEET_FIELD_MAP[normalizeHeader(header)];
        if (!field) return;
        company[field] = String(row[index] ?? '').trim();
    });

    if (!company.companyName) {
        return null;
    }

    return company;
}

function assignSlugs(companies) {
    const slugCounts = new Map();

    return companies.map((company) => {
        const baseSlug = slugify(company.companyName);
        const count = slugCounts.get(baseSlug) ?? 0;
        slugCounts.set(baseSlug, count + 1);

        const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

        return {
            ...company,
            slug,
        };
    });
}

function parseSheetRows(rows) {
    if (!rows.length) {
        return [];
    }

    const [headerRow, ...dataRows] = rows;
    const companies = dataRows
        .map((row) => rowToCompany(headerRow, row))
        .filter(Boolean);

    return assignSlugs(companies);
}

async function loadCompanyProfiles() {
    try {
        const rows = await fetchSheetRows();
        return parseSheetRows(rows);
    } catch (error) {
        console.error('Failed to load company profiles from Google Sheets:', error);
        return [];
    }
}

const getCachedCompanyProfiles = unstable_cache(
    loadCompanyProfiles,
    ['company-profiles', process.env.GOOGLE_SHEETS_SPREADSHEET_ID || 'default'],
    { revalidate: 300 }
);

export async function getAllCompanyProfiles() {
    return getCachedCompanyProfiles();
}

export const getCompanyProfileBySlug = cache(async (slug) => {
    const companies = await getAllCompanyProfiles();
    return companies.find((company) => company.slug === slug) ?? null;
});

export function formatCompactCurrency(value) {
    const num = Number(String(value || '').replace(/[^0-9.-]/g, ''));

    if (!Number.isFinite(num) || num === 0) {
        return value || '—';
    }

    if (num >= 1_000_000_000) {
        return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }

    if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(1)}M`;
    }

    if (num >= 1_000) {
        return `$${(num / 1_000).toFixed(1)}K`;
    }

    return `$${num.toLocaleString()}`;
}

export function formatEmployeeCount(value) {
    const num = Number(String(value || '').replace(/[^0-9.-]/g, ''));

    if (!Number.isFinite(num) || num === 0) {
        return value || '—';
    }

    return num.toLocaleString();
}

export function buildCompanyLocation(company) {
    return [company.city, company.state, company.country].filter(Boolean).join(', ');
}

export function buildCompanyAbout(company) {
    const location = buildCompanyLocation(company);
    const employees = formatEmployeeCount(company.employees);
    const founded = company.foundedYear || 'N/A';
    const industry = company.industry || 'its industry';

    return `${company.companyName} is a ${industry} company founded in ${founded}${location ? ` and headquartered in ${location}` : ''}. The organization employs approximately ${employees} people and serves customers through digital and enterprise channels.`;
}

export function buildCompanySeoDescription(company) {
    const location = buildCompanyLocation(company);

    return `Explore ${company.companyName}${location ? ` in ${location}` : ''}. View company overview, industry, employee count, revenue, funding details, and contact information on Database Providers.`;
}
