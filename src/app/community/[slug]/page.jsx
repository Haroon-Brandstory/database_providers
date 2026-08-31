import { notFound } from "next/navigation";
import PostDetail from "@/components/community/PostDetail";
import {
    communityPosts,
    getPostBySlug,
    getRelatedPostSummaries,
    isReservedCommunitySegment,
} from "@/lib/communityData";
import { generateSeoMetadata } from "@/lib/seo";

const BASE_URL = "https://www.thedatabaseproviders.com";

export function generateStaticParams() {
    return communityPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    if (isReservedCommunitySegment(slug)) {
        return { title: "Community | Database Providers" };
    }

    const post = getPostBySlug(slug);
    if (!post) {
        return { title: "Post not found | Database Providers" };
    }

    return generateSeoMetadata({
        locale: "en",
        slug: `community/${slug}`,
        title: `${post.title} | Community | Database Providers`,
        description: post.metaDescription,
        noIntl: true,
    });
}

function buildQaSchema(post) {
    const answer = post.acceptedAnswer;
    return {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: {
            "@type": "Question",
            name: post.title,
            text: post.body,
            answerCount: answer ? 1 : 0,
            dateCreated: post.createdAt,
            ...(answer
                ? {
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: answer.body,
                          dateCreated: answer.createdAt,
                          author: {
                              "@type": "Organization",
                              name: answer.authorName,
                          },
                      },
                  }
                : {}),
        },
    };
}

function buildBreadcrumbSchema(post) {
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
                name: post.title,
                item: `${BASE_URL}/community/${post.slug}/`,
            },
        ],
    };
}

export default async function CommunityPostPage({ params }) {
    const { slug } = await params;
    if (isReservedCommunitySegment(slug)) notFound();

    const post = getPostBySlug(slug);
    if (!post) notFound();

    const related = getRelatedPostSummaries(post.slug, 5);
    const schemas = [buildQaSchema(post), buildBreadcrumbSchema(post)];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <PostDetail post={post} related={related} />
        </>
    );
}
