import { notFound } from "next/navigation";
import CommunityDetailBanner from "@/components/community/CommunityDetailBanner";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostDetail from "@/components/community/PostDetail";
import {
    communityPosts,
    getCategoryBySlug,
    getPostBySlug,
    getRecentPosts,
} from "@/lib/communityData";
import { generateSeoMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return communityPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return { title: "Post not found | Database Providers" };
    }

    return generateSeoMetadata({
        locale: "en",
        slug: `community/post/${slug}`,
        title: `${post.title} | Community | Database Providers`,
        description: post.body.slice(0, 155),
        noIntl: true,
    });
}

export default async function CommunityPostPage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const category = getCategoryBySlug(post.categorySlug);
    const sidebarPosts = getRecentPosts(6).filter((item) => item.slug !== post.slug);

    return (
        <div className="bg-[#0B1020]">
            <CommunityDetailBanner
                crumbs={[
                    { label: "Community", href: "/community/" },
                    category
                        ? { label: category.title, href: `/community/category/${category.slug}/` }
                        : null,
                    { label: post.title },
                ].filter(Boolean)}
                title={post.title}
                meta={`Posted by ${post.authorName} · ${post.createdAt}${
                    category ? ` · ${category.title}` : ""
                }`}
            />

            <section className="px-4 md:px-20 py-10 md:py-14 bg-[#F5F8FF]">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <div className="lg:col-span-2">
                        <PostDetail post={post} />
                    </div>
                    <div className="lg:col-span-1">
                        <CommunitySidebar recentPosts={sidebarPosts} />
                    </div>
                </div>
            </section>
        </div>
    );
}
