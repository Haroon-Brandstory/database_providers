import { notFound } from "next/navigation";
import PostDetail from "@/components/community/PostDetail";
import {
    communityPosts,
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

    const related = getRecentPosts(6).filter((item) => item.slug !== post.slug).slice(0, 5);

    return <PostDetail post={post} related={related} />;
}
