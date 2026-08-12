import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/community/PostList";
import {
    communityCategories,
    getCategoryBySlug,
    getPostsByCategory,
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

    return (
        <div className="bg-white min-h-screen pb-16">
            <div
                className="h-[72px] md:h-[97px] bg-[#9a9a9a]/80 backdrop-blur-md"
                aria-hidden
            />
            <div className="container mx-auto max-w-[900px] px-4 pt-8">
                <nav className="text-sm text-[#5f6368] mb-4 flex flex-wrap gap-2">
                    <Link href="/community/" className="text-[#1a73e8] hover:underline">
                        Community
                    </Link>
                    <span>/</span>
                    <span className="text-[#202124]">{category.title}</span>
                </nav>
                <h1 className="text-[28px] md:text-[32px] font-medium text-[#202124] mb-2">
                    {category.title}
                </h1>
                <p className="text-[#5f6368] mb-8">{category.description}</p>
                <PostList
                    title={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
                    posts={posts}
                    emptyMessage="No posts in this category yet."
                />
            </div>
        </div>
    );
}
