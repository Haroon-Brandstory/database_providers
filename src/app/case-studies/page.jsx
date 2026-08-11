import ResourcesListingPage from "@/components/resources/ResourcesListingPage";
import {
    getAllCaseStudies,
    getFeaturedCaseStudy,
} from "@/lib/caseStudiesData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
    return generateSeoMetadata({
        locale: "en",
        slug: "case-studies",
        title: "Case Studies | Database Providers",
        description:
            "Real results from teams that scaled outreach with verified, targeted B2B data from Database Providers.",
        noIntl: true,
    });
}

export default function CaseStudiesPage() {
    return (
        <ResourcesListingPage
            heroTitle="Case Studies"
            heroDescription="Real results from teams that scaled outreach with verified, targeted B2B data."
            sectionLabel="Our most recent case studies"
            breadcrumbLabel="Case Studies"
            basePath="/case-studies"
            featured={getFeaturedCaseStudy()}
            items={getAllCaseStudies()}
        />
    );
}
