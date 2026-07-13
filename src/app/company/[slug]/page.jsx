import { notFound } from 'next/navigation';
import CompanyWhyChoose from '@/components/company-profile/CompanyWhyChoose';
import CompanyFaq from '@/components/company-profile/CompanyFaq';
import CompanyGrowthChart from '@/components/company-profile/CompanyGrowthChart';
import CompanyHeroSection from '@/components/company-profile/CompanyHeroSection';
import CompanyMidBanner from '@/components/company-profile/CompanyMidBanner';
import CompanyOrgChart from '@/components/company-profile/CompanyOrgChart';
import CompanyOverview from '@/components/company-profile/CompanyOverview';
import {
    buildCompanyAbout,
    buildCompanySeoDescription,
    getCompanyProfileBySlug,
} from '@/lib/companyProfiles';
import { generateSeoMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const company = await getCompanyProfileBySlug(slug);

    if (!company) {
        return { title: 'Company Not Found' };
    }

    return generateSeoMetadata({
        slug: `company/${slug}/`,
        title: `${company.companyName} | Database Providers`,
        description: buildCompanySeoDescription(company),
        noIntl: true,
    });
}

export default async function CompanyProfilePage({ params }) {
    const { slug } = await params;
    const company = await getCompanyProfileBySlug(slug);

    if (!company) {
        notFound();
    }

    const aboutText = buildCompanyAbout(company);
    const extraText = company.address
        ? ` The registered office is located at ${company.address}${company.postalCode ? `, ${company.postalCode}` : ''}.`
        : '';
    const fullAboutText = `${aboutText}${extraText}`;
    const previewAboutText = `${aboutText.slice(0, 280)}...`;

    return (
        <div className="bg-[#F4F6FA] pb-16">
            <CompanyHeroSection
                company={company}
                previewText={previewAboutText}
                fullText={fullAboutText}
            />

            <div className="container mx-auto mt-6 space-y-6 px-4 md:mt-8 md:px-6">
                <CompanyOverview company={company} />
                <CompanyOrgChart company={company} />
                <CompanyMidBanner companyName={company.companyName} />
                <CompanyGrowthChart company={company} />
                <CompanyWhyChoose />
                <CompanyFaq company={company} />
            </div>
        </div>
    );
}
