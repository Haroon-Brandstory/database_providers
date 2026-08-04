import SiteMapView from "@/components/sitemap/SiteMapView";
import { getHtmlSitemapData } from "@/lib/htmlSitemap";
import { generateSeoMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: "sitemap",
        title: "Site Map | Database Providers",
        description:
            "Human-readable site map of Database Providers pages across Global, India, UAE, Singapore, Malaysia, and Dubai.",
        noIntl: true,
    });
}

export default function SitemapPage() {
    const data = getHtmlSitemapData();
    return <SiteMapView data={data} />;
}
