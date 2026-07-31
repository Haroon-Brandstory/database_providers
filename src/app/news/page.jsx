import ContentListingPage from "@/components/content-listing/ContentListingPage";
import { contentListingPages } from "@/lib/contentListingPages";
import { generateSeoMetadata } from "@/lib/seo";

const page = contentListingPages.news;

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: page.slug,
        title: `${page.title} | Database Providers`,
        description: page.seoDescription,
        noIntl: true,
    });
}

export default function NewsPage() {
    return <ContentListingPage data={page} />;
}
