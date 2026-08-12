import { notFound } from "next/navigation";
import GuideDetail from "@/components/community/GuideDetail";
import {
    communityGuides,
    getFeaturedPosts,
    getGuideBySlug,
} from "@/lib/communityData";
import { generateSeoMetadata } from "@/lib/seo";

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

export default async function CommunityGuidePage({ params }) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);
    if (!guide) notFound();

    const relatedGuides = communityGuides
        .filter((item) => item.slug !== guide.slug)
        .slice(0, 3);
    const relatedPosts = getFeaturedPosts().slice(0, 3);

    return (
        <GuideDetail
            guide={guide}
            relatedGuides={relatedGuides}
            relatedPosts={relatedPosts}
        />
    );
}
