import { notFound } from "next/navigation";
import CommunityDetailBanner from "@/components/community/CommunityDetailBanner";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import GuideDetail from "@/components/community/GuideDetail";
import {
    communityGuides,
    getGuideBySlug,
    getRecentPosts,
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

    return (
        <div className="bg-[#0B1020]">
            <CommunityDetailBanner
                crumbs={[
                    { label: "Community", href: "/community/" },
                    { label: "Guides" },
                    { label: guide.title },
                ]}
                title={guide.title}
                meta={guide.summary}
            />

            <section className="px-4 md:px-20 py-10 md:py-14 bg-[#F5F8FF]">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <div className="lg:col-span-2">
                        <GuideDetail guide={guide} />
                    </div>
                    <div className="lg:col-span-1">
                        <CommunitySidebar
                            recentPosts={getRecentPosts(6)}
                            title="Recent posts"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
