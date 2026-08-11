import ResourcesListingPage from "@/components/resources/ResourcesListingPage";
import { getAllNews, getFeaturedNews } from "@/lib/newsData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: "news",
        title: "News | Database Providers",
        description:
            "Product updates, industry insights, and company announcements from Database Providers.",
        noIntl: true,
    });
}

export default function NewsPage() {
    return (
        <ResourcesListingPage
            heroTitle="News"
            heroDescription="Product updates, industry insights, and company announcements from Database Providers."
            sectionLabel="Our most recent articles"
            breadcrumbLabel="News"
            basePath="/news"
            featured={getFeaturedNews()}
            items={getAllNews()}
        />
    );
}
