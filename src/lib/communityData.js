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
        upvotes: 2104,
        body: `Important: This is a community guide. We cannot reset your password for you. Use the official recovery flow, then come back here if you still need help.

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
Post in **Account Access & Orders** with what you already tried. Do not share passwords or full payment details in a public post.`,
    },
    {
        slug: "improve-list-deliverability",
        title: "How to improve email list deliverability",
        summary:
            "Practical checklist for verification, suppression, and sending practices that keep bounce rates low.",
        upvotes: 3842,
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
Post sample bounce codes (without contact PII) in **Data Quality & Coverage** so others can help diagnose.`,
    },
    {
        slug: "choosing-the-right-segment",
        title: "Choosing the right B2B segment",
        summary:
            "How to pick industry, title, and geography filters so your list matches campaign goals.",
        upvotes: 1560,
        body: `A good segment is narrow enough to personalize, wide enough to fill pipeline.

## Start from the offer
- Who can buy or influence this product?
- Which titles actually reply in your past campaigns?
- Which geos can you support with follow-up?

## Common mistakes
- Mixing too many industries in one send.
- Targeting C-level only when managers own the workflow.
- Ignoring company size when your pricing is SMB-only.

Use **Outreach & Campaigns** to share what worked for your niche.`,
    },
];

export const communityPosts = [
    {
        slug: "order-delivery-timeline",
        title: "How long does list delivery usually take?",
        body: `I placed an order for a targeted IT decision-maker list yesterday. Portal still shows processing. What is a normal turnaround, and when should I follow up with support?`,
        categorySlug: "account-access",
        authorName: "Priya M.",
        createdAt: "2026-07-28",
        upvotes: 42,
        featured: true,
        replies: [
            {
                authorName: "Community Guide",
                body: "Most standard list orders complete within 1–2 business days. Custom multi-geo or enrichment jobs can take longer. If it passes 3 business days, reply with your order ID in a support ticket.",
                createdAt: "2026-07-28",
                upvotes: 18,
            },
            {
                authorName: "Alex R.",
                body: "Same here last month — mine landed next morning for a US-only SaaS segment.",
                createdAt: "2026-07-29",
                upvotes: 5,
            },
        ],
    },
    {
        slug: "high-bounce-after-export",
        title: "Seeing higher bounce than expected after export",
        body: `Exported a verified manufacturing segment and bounce sat around 8% on first send. Is that normal? Any checklist before blaming the file?`,
        categorySlug: "data-quality",
        authorName: "Jordan K.",
        createdAt: "2026-07-20",
        upvotes: 67,
        featured: true,
        replies: [
            {
                authorName: "Samita L.",
                body: "Check suppression and whether the sending domain was warmed. Also confirm you did not mix old CRM contacts into the same campaign.",
                createdAt: "2026-07-21",
                upvotes: 22,
            },
        ],
    },
    {
        slug: "gdpr-compliant-outreach",
        title: "GDPR-friendly outreach with purchased B2B lists",
        body: `We sell into EU accounts. What do teams typically document when using B2B contact data for cold email under GDPR? Looking for practical process tips, not legal advice.`,
        categorySlug: "outreach-campaigns",
        authorName: "Elena V.",
        createdAt: "2026-07-12",
        upvotes: 91,
        featured: true,
        replies: [
            {
                authorName: "Community Guide",
                body: "Talk to your counsel. Operationally, teams keep a lawful-basis record, honor opt-outs fast, and avoid scraping personal inboxes. Use role-based B2B contacts and clear unsubscribe paths.",
                createdAt: "2026-07-12",
                upvotes: 34,
            },
        ],
    },
    {
        slug: "cannot-reset-portal-password",
        title: "Password reset email never arrives",
        body: `Tried forgot-password three times. Nothing in inbox or spam. Company uses Google Workspace. Anyone else hit this?`,
        categorySlug: "account-access",
        authorName: "Chris D.",
        createdAt: "2026-07-05",
        upvotes: 28,
        featured: false,
        replies: [
            {
                authorName: "Maya S.",
                body: "Ask IT to allowlist the sender domain. Also confirm the email matches the one on the original purchase.",
                createdAt: "2026-07-05",
                upvotes: 9,
            },
        ],
    },
    {
        slug: "coverage-for-apac-titles",
        title: "APAC coverage for VP Marketing titles",
        body: `Need Singapore + Malaysia VP/Head of Marketing. Roughly how deep is coverage for mid-market SaaS?`,
        categorySlug: "data-quality",
        authorName: "Wei T.",
        createdAt: "2026-06-30",
        upvotes: 35,
        featured: false,
        replies: [],
    },
    {
        slug: "segment-by-technographics",
        title: "Can I filter by CRM or marketing stack?",
        body: `Want accounts already on HubSpot or Salesforce. Is technographic filtering available on list builds, or only firmographic?`,
        categorySlug: "outreach-campaigns",
        authorName: "Nina P.",
        createdAt: "2026-06-22",
        upvotes: 54,
        featured: false,
        replies: [
            {
                authorName: "Omar H.",
                body: "Ask your AE for intent/technographic add-ons. Not every package includes stack filters by default.",
                createdAt: "2026-06-23",
                upvotes: 11,
            },
        ],
    },
    {
        slug: "export-to-salesforce",
        title: "Best way to push contacts into Salesforce",
        body: `We get CSV exports today. Anyone using a cleaner Salesforce import mapping for title, company, and LinkedIn URL fields?`,
        categorySlug: "integrations-tools",
        authorName: "Derek F.",
        createdAt: "2026-06-15",
        upvotes: 39,
        featured: false,
        replies: [
            {
                authorName: "Community Guide",
                body: "Map Email as external ID when possible, keep Company as Account Name match, and store LinkedIn URL in a custom field. Deduplicate before import.",
                createdAt: "2026-06-16",
                upvotes: 15,
            },
        ],
    },
    {
        slug: "email-permutator-tips",
        title: "Email permutator — when to use it vs verified lists",
        body: `Is the on-site email permutator meant for enrichment when I already have names, or as a replacement for verified lists?`,
        categorySlug: "integrations-tools",
        authorName: "Hannah B.",
        createdAt: "2026-06-08",
        upvotes: 48,
        featured: false,
        replies: [
            {
                authorName: "Luis G.",
                body: "Treat it as a helper for known names, then verify. Not a substitute for a verified database pull.",
                createdAt: "2026-06-09",
                upvotes: 17,
            },
        ],
    },
    {
        slug: "order-partial-refund",
        title: "Partial credit when count is short",
        body: `Ordered 5k contacts; delivery came in under count for a rare title combo. How do refunds or credits usually work?`,
        categorySlug: "account-access",
        authorName: "Ravi S.",
        createdAt: "2026-05-28",
        upvotes: 21,
        featured: false,
        replies: [],
    },
    {
        slug: "remove-duplicate-tool",
        title: "Remove-duplicate tool vs Excel",
        body: `Anyone prefer the site remove-duplicate tool over spreadsheet dedupe before uploads to CRM?`,
        categorySlug: "integrations-tools",
        authorName: "Kate N.",
        createdAt: "2026-05-18",
        upvotes: 16,
        featured: false,
        replies: [
            {
                authorName: "Tom W.",
                body: "I run the tool first on email, then a second pass on domain+title in Sheets for edge cases.",
                createdAt: "2026-05-19",
                upvotes: 6,
            },
        ],
    },
];

function withReplyCount(post) {
    return {
        ...post,
        replyCount: post.replies?.length ?? 0,
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

export function getPostBySlug(slug) {
    const post = communityPosts.find((item) => item.slug === slug);
    return post ? withReplyCount(post) : null;
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

export function searchCommunity(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        return { posts: getAllPosts(), guides: communityGuides };
    }

    const posts = getAllPosts().filter(
        (post) =>
            post.title.toLowerCase().includes(q) ||
            post.body.toLowerCase().includes(q) ||
            post.authorName.toLowerCase().includes(q)
    );

    const guides = communityGuides.filter(
        (guide) =>
            guide.title.toLowerCase().includes(q) ||
            guide.summary.toLowerCase().includes(q) ||
            guide.body.toLowerCase().includes(q)
    );

    return { posts, guides };
}
