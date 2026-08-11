import { notFound } from "next/navigation";
import ArticleDetail from "@/components/resources/ArticleDetail";
import {
    caseStudies,
    getCaseStudyBySlug,
    getRelatedCaseStudies,
} from "@/lib/caseStudiesData";
import { generateSeoMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = getCaseStudyBySlug(slug);
    if (!item) return { title: "Case Study Not Found | Database Providers" };

    return generateSeoMetadata({
        locale: "en",
        slug: `case-studies/${slug}`,
        title: `${item.title} | Case Studies | Database Providers`,
        description: item.excerpt,
        noIntl: true,
    });
}

export default async function CaseStudyDetailPage({ params }) {
    const { slug } = await params;
    const item = getCaseStudyBySlug(slug);
    if (!item) notFound();

    return (
        <ArticleDetail
            item={item}
            basePath="/case-studies"
            parentLabel="Case Studies"
            related={getRelatedCaseStudies(slug)}
            relatedTitle="More case studies"
        />
    );
}
