import communityIndex from './community-index.json';

export const TEAM_AUTHOR = 'Database Providers';

export const communityCategories = [
    {
        slug: 'account-access',
        title: 'Account Access & Orders',
        description:
            'Sign-in issues, order status, delivery timelines, and account settings.',
    },
    {
        slug: 'data-quality',
        title: 'Data Quality & Coverage',
        description:
            'Bounce rates, verification, industry coverage, and enrichment questions.',
    },
    {
        slug: 'outreach-campaigns',
        title: 'Outreach & Campaigns',
        description:
            'List building, segmentation, compliance, and campaign best practices.',
    },
    {
        slug: 'integrations-tools',
        title: 'Integrations & Tools',
        description:
            'CRM exports, email tools, permutator, and workflow tips.',
    },
];

/** Listing rows from generated index (HTML folder scan). */
export const communityPosts = communityIndex.posts ?? [];
export const communityGuides = communityIndex.guides ?? [];

/** @typedef {{ slug: string, title: string, categorySlug?: string }} CommunityLinkSummary */

const RESERVED_COMMUNITY_SEGMENTS = new Set(['guides', 'category', 'post']);

function toLinkSummary(post) {
    return {
        slug: post.slug,
        title: post.title,
        categorySlug: post.categorySlug,
    };
}

export function getAllPosts() {
    return communityPosts;
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

/** Index-only listing row (safe for client imports). */
export function getPostBySlug(slug) {
    return communityPosts.find((item) => item.slug === slug) ?? null;
}

export function getPostByOldSlug(oldSlug) {
    return communityPosts.find((item) => item.oldSlug === oldSlug) ?? null;
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

/** Index-only guide listing (safe for client imports). */
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

    const posts = getAllPosts().filter((post) =>
        (post.searchText || `${post.title} ${post.metaDescription || ''}`)
            .toLowerCase()
            .includes(q)
    );

    const guides = communityGuides.filter((guide) =>
        (guide.searchText || `${guide.title} ${guide.summary || ''}`)
            .toLowerCase()
            .includes(q)
    );

    return { posts, guides };
}
