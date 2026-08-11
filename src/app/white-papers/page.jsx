import WhitePapersListingPage from "@/components/resources/WhitePapersListingPage";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: "white-papers",
        title: "White Papers | Database Providers",
        description:
            "In-depth research and actionable insights on B2B data, targeting, and marketing performance.",
        noIntl: true,
    });
}

export default function WhitePapersPage() {
    return <WhitePapersListingPage />;
}
