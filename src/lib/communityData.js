export const TEAM_AUTHOR = "Database Providers";

export const communityCategories = [
    {
        slug: "account-access",
        title: "Account Access & Orders",
        description:
            "Sign-in issues, order status, delivery timelines, and account settings.",
    },
    {
        slug: "data-quality",
        title: "Data Quality & Coverage",
        description:
            "Bounce rates, verification, industry coverage, and enrichment questions.",
    },
    {
        slug: "outreach-campaigns",
        title: "Outreach & Campaigns",
        description:
            "List building, segmentation, compliance, and campaign best practices.",
    },
    {
        slug: "integrations-tools",
        title: "Integrations & Tools",
        description:
            "CRM exports, email tools, permutator, and workflow tips.",
    },
];

export const communityGuides = [
    {
        slug: "forgot-account-password",
        title: "I forgot my account password — FAQ",
        summary:
            "Steps to reset access, recover your Database Providers portal login, and what to do if recovery email is missing.",
        authorName: TEAM_AUTHOR,
        body: `Important: This is an official guide from Database Providers. We cannot reset your password for you. Use the official recovery flow, then contact support if you still need help.

## Quick steps
1. Go to the sign-in page and choose **Forgot password**.
2. Enter the email tied to your Database Providers account.
3. Open the reset link from your inbox (check spam).
4. Set a new password and sign in again.

## If you never get the email
- Confirm you are using the same email used on the original order.
- Wait a few minutes and request another reset.
- Contact support with your company name and recent order ID.

## Still locked out?
Open a support ticket with what you already tried. Do not share passwords or full payment details.`,
    },
    {
        slug: "improve-list-deliverability",
        title: "How to improve email list deliverability",
        summary:
            "Practical checklist for verification, suppression, and sending practices that keep bounce rates low.",
        authorName: TEAM_AUTHOR,
        body: `Deliverability problems usually come from stale contacts, weak targeting, or aggressive sending — not from one bad export.

## Before you send
- Suppress known unsubscribes and hard bounces.
- Prefer recently verified segments for cold outreach.
- Align titles and industries with your ICP before volume ramps.

## Sending hygiene
- Warm domains gradually; avoid blasting a brand-new domain.
- Keep subject lines and body copy relevant to the persona.
- Monitor bounce and complaint rates after each batch.

## When bounce is high
Share sample bounce codes (without contact PII) with support so we can help diagnose.`,
    },
    {
        slug: "choosing-the-right-segment",
        title: "Choosing the right B2B segment",
        summary:
            "How to pick industry, title, and geography filters so your list matches campaign goals.",
        authorName: TEAM_AUTHOR,
        body: `A good segment is narrow enough to personalize, wide enough to fill pipeline.

## Start from the offer
- Who can buy or influence this product?
- Which titles actually reply in your past campaigns?
- Which geos can you support with follow-up?

## Common mistakes
- Mixing too many industries in one send.
- Targeting C-level only when managers own the workflow.
- Ignoring company size when your pricing is SMB-only.

Talk with your account team about what has worked for your niche.`,
    },
];

/** @typedef {{ slug: string, title: string, categorySlug?: string }} CommunityLinkSummary */

/**
 * Q&A topics attributed to Database Providers (no fabricated personas or upvote counts).
 * oldSlug keeps 301s from former /community/post/{oldSlug}/ URLs.
 */
export const communityPosts = [
    {
        slug: "how-long-does-list-delivery-usually-take",
        oldSlug: "order-delivery-timeline",
        title: "How long does list delivery usually take?",
        body: `I placed an order for a targeted IT decision-maker list yesterday. Portal still shows processing. What is a normal turnaround, and when should I follow up with support?`,
        categorySlug: "account-access",
        createdAt: "2026-07-28",
        featured: true,
        metaDescription:
            "Most standard list orders complete within 1–2 business days. Custom multi-geo or enrichment jobs can take longer—follow up after 3 business days with your order ID.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Most standard list orders complete within 1–2 business days. Custom multi-geo or enrichment jobs can take longer. If it passes 3 business days, reply with your order ID in a support ticket.",
            createdAt: "2026-07-28",
        },
    },
    {
        slug: "seeing-higher-bounce-than-expected-after-export",
        oldSlug: "high-bounce-after-export",
        title: "Seeing higher bounce than expected after export",
        body: `Exported a verified manufacturing segment and bounce sat around 8% on first send. Is that normal? Any checklist before blaming the file?`,
        categorySlug: "data-quality",
        createdAt: "2026-07-20",
        featured: true,
        metaDescription:
            "Before blaming the file, check suppression lists, domain warm-up, and whether old CRM contacts were mixed into the same campaign as your verified export.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Check suppression and whether the sending domain was warmed. Also confirm you did not mix old CRM contacts into the same campaign. Bounce around that range often points to sending hygiene or list mixing rather than a single export issue.",
            createdAt: "2026-07-21",
        },
    },
    {
        slug: "gdpr-friendly-outreach-with-purchased-b2b-lists",
        oldSlug: "gdpr-compliant-outreach",
        title: "GDPR-friendly outreach with purchased B2B lists",
        body: `We sell into EU accounts. What do teams typically document when using B2B contact data for cold email under GDPR? Looking for practical process tips, not legal advice.`,
        categorySlug: "outreach-campaigns",
        createdAt: "2026-07-12",
        featured: true,
        metaDescription:
            "Operational GDPR hygiene for B2B lists: document lawful basis, honor opt-outs fast, prefer role-based contacts, and keep clear unsubscribe paths—always confirm with your counsel.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Talk to your counsel. Operationally, teams keep a lawful-basis record, honor opt-outs fast, and avoid scraping personal inboxes. Use role-based B2B contacts and clear unsubscribe paths.",
            createdAt: "2026-07-12",
        },
    },
    {
        slug: "password-reset-email-never-arrives",
        oldSlug: "cannot-reset-portal-password",
        title: "Password reset email never arrives",
        body: `Tried forgot-password three times. Nothing in inbox or spam. Company uses Google Workspace. Anyone else hit this?`,
        categorySlug: "account-access",
        createdAt: "2026-07-05",
        featured: false,
        metaDescription:
            "If portal password-reset mail never arrives, allowlist the sender domain with IT and confirm the email matches the one on your original purchase.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Ask IT to allowlist the sender domain. Also confirm the email matches the one on the original purchase. If it still fails, open a support ticket with your company name and order ID.",
            createdAt: "2026-07-05",
        },
    },
    {
        slug: "apac-coverage-for-vp-marketing-titles",
        oldSlug: "coverage-for-apac-titles",
        title: "APAC coverage for VP Marketing titles",
        body: `Need Singapore + Malaysia VP/Head of Marketing. Roughly how deep is coverage for mid-market SaaS?`,
        categorySlug: "data-quality",
        createdAt: "2026-06-30",
        featured: false,
        metaDescription:
            "Singapore and Malaysia VP/Head of Marketing coverage varies by firmographic filters—share ICP details with your AE for a count estimate before ordering.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Coverage for Singapore and Malaysia marketing leadership is available and depth depends on company size, industry, and title mix. Share your ICP with your account executive for a count estimate before you order.",
            createdAt: "2026-06-30",
        },
    },
    {
        slug: "can-i-filter-by-crm-or-marketing-stack",
        oldSlug: "segment-by-technographics",
        title: "Can I filter by CRM or marketing stack?",
        body: `Want accounts already on HubSpot or Salesforce. Is technographic filtering available on list builds, or only firmographic?`,
        categorySlug: "outreach-campaigns",
        createdAt: "2026-06-22",
        featured: false,
        metaDescription:
            "Technographic filters such as HubSpot or Salesforce are available as add-ons on some packages—ask your AE; they are not included in every firmographic-only build.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Ask your AE for intent/technographic add-ons. Not every package includes stack filters by default; many builds start firmographic and add technology filters when scoped.",
            createdAt: "2026-06-23",
        },
    },
    {
        slug: "best-way-to-push-contacts-into-salesforce",
        oldSlug: "export-to-salesforce",
        title: "Best way to push contacts into Salesforce",
        body: `We get CSV exports today. Anyone using a cleaner Salesforce import mapping for title, company, and LinkedIn URL fields?`,
        categorySlug: "integrations-tools",
        createdAt: "2026-06-15",
        featured: false,
        metaDescription:
            "For Salesforce imports, map Email as an external ID, match Company to Account Name, store LinkedIn URL in a custom field, and deduplicate before import.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Map Email as external ID when possible, keep Company as Account Name match, and store LinkedIn URL in a custom field. Deduplicate before import.",
            createdAt: "2026-06-16",
        },
    },
    {
        slug: "email-permutator-when-to-use-vs-verified-lists",
        oldSlug: "email-permutator-tips",
        title: "Email permutator — when to use it vs verified lists",
        body: `Is the on-site email permutator meant for enrichment when I already have names, or as a replacement for verified lists?`,
        categorySlug: "integrations-tools",
        createdAt: "2026-06-08",
        featured: false,
        metaDescription:
            "Use the email permutator to enrich known names, then verify—do not treat it as a substitute for a verified database pull.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Treat it as a helper for known names, then verify. It is not a substitute for a verified database pull.",
            createdAt: "2026-06-09",
        },
    },
    {
        slug: "partial-credit-when-count-is-short",
        oldSlug: "order-partial-refund",
        title: "Partial credit when count is short",
        body: `Ordered 5k contacts; delivery came in under count for a rare title combo. How do refunds or credits usually work?`,
        categorySlug: "account-access",
        createdAt: "2026-05-28",
        featured: false,
        metaDescription:
            "When a rare title combo delivers under count, contact support with your order ID—credits or replenishment options are handled case by case.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "For short counts on rare title combinations, open a support ticket with your order ID. We review delivery against the scoped filters and typically offer credit or replenishment options when the count falls short of what was confirmed.",
            createdAt: "2026-05-28",
        },
    },
    {
        slug: "remove-duplicate-tool-vs-excel",
        oldSlug: "remove-duplicate-tool",
        title: "Remove-duplicate tool vs Excel",
        body: `Anyone prefer the site remove-duplicate tool over spreadsheet dedupe before uploads to CRM?`,
        categorySlug: "integrations-tools",
        createdAt: "2026-05-18",
        featured: false,
        metaDescription:
            "Run the on-site remove-duplicate tool on email first, then optionally a second pass on domain and title in Sheets for edge cases before CRM upload.",
        acceptedAnswer: {
            authorName: TEAM_AUTHOR,
            body: "Run the tool first on email, then a second pass on domain+title in Sheets for edge cases before CRM upload.",
            createdAt: "2026-05-19",
        },
    },
];

const RESERVED_COMMUNITY_SEGMENTS = new Set(["guides", "category", "post"]);

function withReplyCount(post) {
    return {
        ...post,
        replyCount: post.acceptedAnswer ? 1 : 0,
    };
}

function toLinkSummary(post) {
    return {
        slug: post.slug,
        title: post.title,
        categorySlug: post.categorySlug,
    };
}

export function getAllPosts() {
    return communityPosts.map(withReplyCount);
}

export function getFeaturedPosts() {
    return getAllPosts().filter((post) => post.featured);
}

export function getRecentPosts(limit = 8) {
    return [...getAllPosts()]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
}

/** Slim related cards — never ship body/answers into client props. */
export function getRelatedPostSummaries(excludeSlug, limit = 5) {
    return getRecentPosts(limit + 5)
        .filter((item) => item.slug !== excludeSlug)
        .slice(0, limit)
        .map(toLinkSummary);
}

export function getRelatedGuideSummaries(excludeSlug, limit = 3) {
    return communityGuides
        .filter((item) => item.slug !== excludeSlug)
        .slice(0, limit)
        .map((guide) => ({
            slug: guide.slug,
            title: guide.title,
        }));
}

export function getPostBySlug(slug) {
    const post = communityPosts.find((item) => item.slug === slug);
    return post ? withReplyCount(post) : null;
}

export function getPostByOldSlug(oldSlug) {
    const post = communityPosts.find((item) => item.oldSlug === oldSlug);
    return post ? withReplyCount(post) : null;
}

export function resolveCommunityPostSlug(slug) {
    return getPostBySlug(slug) ?? getPostByOldSlug(slug);
}

export function isReservedCommunitySegment(slug) {
    return RESERVED_COMMUNITY_SEGMENTS.has(slug);
}

export function getPostsByCategory(categorySlug) {
    return getAllPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug) {
    return communityCategories.find((item) => item.slug === slug) ?? null;
}

export function getGuideBySlug(slug) {
    return communityGuides.find((item) => item.slug === slug) ?? null;
}

export function getCategoriesWithCounts() {
    return communityCategories.map((category) => ({
        ...category,
        postCount: getPostsByCategory(category.slug).length,
    }));
}

export function getPostPath(slug) {
    return `/community/${slug}/`;
}

export function searchCommunity(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        return { posts: getAllPosts(), guides: communityGuides };
    }

    const posts = getAllPosts().filter(
        (post) =>
            post.title.toLowerCase().includes(q) ||
            post.body.toLowerCase().includes(q) ||
            post.acceptedAnswer?.body?.toLowerCase().includes(q)
    );

    const guides = communityGuides.filter(
        (guide) =>
            guide.title.toLowerCase().includes(q) ||
            guide.summary.toLowerCase().includes(q) ||
            guide.body.toLowerCase().includes(q)
    );

    return { posts, guides };
}
