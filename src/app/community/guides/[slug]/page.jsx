import { notFound } from "next/navigation";
import GuideDetail from "@/components/community/GuideDetail";
import {
    communityGuides,
    getGuideBySlug,
    getRelatedGuideSummaries,
    getRelatedPostSummaries,
} from "@/lib/communityData";
import { getCommunityGuideDetail } from "@/lib/communityHtml";
import { generateSeoMetadata } from "@/lib/seo";

const BASE_URL = "https://www.thedatabaseproviders.com";

export function generateStaticParams() {
    return communityGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);
    if (!guide) {
        return { title: "Guide not found | Database Providers" };
    }

    return generateSeoMetadata({
        locale: "en",
        slug: `community/guides/${slug}`,
        title: `${guide.title} | Community | Database Providers`,
        description: guide.summary,
        noIntl: true,
    });
}

function buildBreadcrumbSchema(guide) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${BASE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Community",
                item: `${BASE_URL}/community/`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: guide.title,
                item: `${BASE_URL}/community/guides/${guide.slug}/`,
            },
        ],
    };
}

function buildArticleSchema(guide) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.summary,
        author: {
            "@type": "Organization",
            name: guide.authorName || "Database Providers",
        },
        publisher: {
            "@type": "Organization",
            name: "Database Providers",
        },
    };
}

export default async function CommunityGuidePage({ params }) {
    const { slug } = await params;
    const listing = getGuideBySlug(slug);
    const detail = getCommunityGuideDetail(slug);
    if (!listing || !detail) notFound();

    const guide = { ...listing, ...detail };
    const relatedGuides = getRelatedGuideSummaries(guide.slug, 3);
    const relatedPosts = getRelatedPostSummaries(null, 3);
    const schemas = [buildArticleSchema(guide), buildBreadcrumbSchema(guide)];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <GuideDetail
                guide={guide}
                relatedGuides={relatedGuides}
                relatedPosts={relatedPosts}
            />
        </>
    );
}
