import { notFound } from "next/navigation";
import CommunityDetailBanner from "@/components/community/CommunityDetailBanner";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostList from "@/components/community/PostList";
import {
    communityCategories,
    getCategoryBySlug,
    getPostsByCategory,
    getRecentPosts,
} from "@/lib/communityData";
import { generateSeoMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return communityCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    if (!category) {
        return { title: "Category not found | Database Providers" };
    }

    return generateSeoMetadata({
        locale: "en",
        slug: `community/category/${slug}`,
        title: `${category.title} | Community | Database Providers`,
        description: category.description,
        noIntl: true,
    });
}

export default async function CommunityCategoryPage({ params }) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    if (!category) notFound();

    const posts = getPostsByCategory(slug);
    const sidebarPosts = getRecentPosts(6).filter((post) => post.categorySlug !== slug);

    return (
        <div className="bg-[#0B1020]">
            <CommunityDetailBanner
                crumbs={[
                    { label: "Community", href: "/community/" },
                    { label: category.title },
                ]}
                title={category.title}
                meta={category.description}
            />

            <section className="px-4 md:px-20 py-10 md:py-14 bg-[#F5F8FF]">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <div className="lg:col-span-2">
                        <PostList
                            title={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
                            posts={posts}
                            emptyMessage="No posts in this category yet."
                            headingClassName="text-[#111827]"
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <CommunitySidebar
                            recentPosts={sidebarPosts.length ? sidebarPosts : getRecentPosts(6)}
                            title="From other categories"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
