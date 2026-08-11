import { notFound } from "next/navigation";
import WhitePaperDetail from "@/components/resources/WhitePaperDetail";
import {
    getRelatedWhitePapers,
    getWhitePaperBySlug,
    whitePapers,
} from "@/lib/whitePapersData";
import { generateSeoMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return whitePapers.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = getWhitePaperBySlug(slug);
    if (!item) return { title: "White Paper Not Found | Database Providers" };

    return generateSeoMetadata({
        locale: "en",
        slug: `white-papers/${slug}`,
        title: `${item.title} | White Papers | Database Providers`,
        description: item.excerpt,
        noIntl: true,
    });
}

export default async function WhitePaperDetailPage({ params }) {
    const { slug } = await params;
    const item = getWhitePaperBySlug(slug);
    if (!item) notFound();

    return (
        <WhitePaperDetail item={item} related={getRelatedWhitePapers(slug)} />
    );
}
