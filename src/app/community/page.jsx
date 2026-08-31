import CommunityHub from "@/components/community/CommunityHub";
import {
    communityGuides,
    getCategoriesWithCounts,
    getFeaturedPosts,
    getRecentPosts,
} from "@/lib/communityData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: "community",
        title: "Community | Database Providers",
        description:
            "Ask questions and find guides about B2B lists, data quality, outreach, and account support in the Database Providers community.",
        noIntl: true,
    });
}

export default function CommunityPage() {
    const listFields = (posts) =>
        posts.map(({ slug, title, metaDescription, replyCount, createdAt, categorySlug }) => ({
            slug,
            title,
            metaDescription,
            replyCount,
            createdAt,
            categorySlug,
        }));

    const guideFields = communityGuides.map(({ slug, title, summary }) => ({
        slug,
        title,
        summary,
    }));

    return (
        <CommunityHub
            categories={getCategoriesWithCounts()}
            featuredPosts={listFields(getFeaturedPosts())}
            guides={guideFields}
            recentPosts={listFields(getRecentPosts(8))}
        />
    );
}
