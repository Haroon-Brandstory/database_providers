import CareersPage from "@/components/careers/CareersPage";
import { getCareersPageData } from "@/lib/careersData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
    const data = await getCareersPageData();

    return generateSeoMetadata({
        locale: "en",
        slug: "careers",
        title: data.seo?.title || "Careers | Database Providers",
        description: data.seo?.description,
        noIntl: true,
    });
}

export default async function CareersRoutePage() {
    const data = await getCareersPageData();
    return <CareersPage data={data} />;
}
