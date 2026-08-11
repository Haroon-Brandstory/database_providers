import { notFound } from "next/navigation";
import ArticleDetail from "@/components/resources/ArticleDetail";
import { getNewsBySlug, getRelatedNews, newsArticles } from "@/lib/newsData";
import { generateSeoMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return newsArticles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = getNewsBySlug(slug);
    if (!item) return { title: "News Not Found | Database Providers" };

    return generateSeoMetadata({
        locale: "en",
        slug: `news/${slug}`,
        title: `${item.title} | News | Database Providers`,
        description: item.excerpt,
        noIntl: true,
    });
}

export default async function NewsDetailPage({ params }) {
    const { slug } = await params;
    const item = getNewsBySlug(slug);
    if (!item) notFound();

    return (
        <ArticleDetail
            item={item}
            basePath="/news"
            parentLabel="News"
            related={getRelatedNews(slug)}
            relatedTitle="More news"
        />
    );
}
