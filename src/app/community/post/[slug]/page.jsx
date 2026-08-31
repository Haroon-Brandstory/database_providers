import { notFound, permanentRedirect } from "next/navigation";
import {
    communityPosts,
    resolveCommunityPostSlug,
} from "@/lib/communityData";

export function generateStaticParams() {
    const slugs = new Set();
    for (const post of communityPosts) {
        slugs.add(post.slug);
        if (post.oldSlug) slugs.add(post.oldSlug);
    }
    return [...slugs].map((slug) => ({ slug }));
}

/** Legacy /community/post/{slug}/ → flat /community/{slug}/ */
export default async function LegacyCommunityPostRedirect({ params }) {
    const { slug } = await params;
    const post = resolveCommunityPostSlug(slug);
    if (!post) notFound();
    permanentRedirect(`/community/${post.slug}/`);
}
