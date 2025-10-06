import { getCategoryBySlug, getServicesBySlug } from "@/lib/services";
import ServicePageBanner from '@/components/servicebanner';
import PowerPackSection from '@/components/servPowerPack';
import PowerPackInfinitySection from '@/components/catPowerInfinity';
import CategoryDynamicVideo from '@/components/catDynamicVideo';
import WorldMap from '@/components/worldMap';
import IconCategorySection from '@/components/iconIndSection';
import EmailFormatSection from '@/components/emailFotmatSection';
import VerificationProcess from '@/components/dataVerificationSection';
import InstantAccessSection from '@/components/instantAccessSection';
import RoiServiceSection from '@/components/roiServSection';
import BusinessExpansionSection from '@/components/businessExpansionSection';
import EmailDatabaseSection from '@/components/emailDbSection';
import ClientForm from '@/components/clientForm';
import ServiceFaqSection from '@/components/serviceFaq';
import BenefitEmailCategory from '@/components/benefitEmailSection';
import EmailOpenRates from '@/components/emailOpenRates';

import { notFound } from "next/navigation";

const componentMap = {
    "service-category.category-banner": ServicePageBanner,
    "service-category.power-packed-section": PowerPackSection,
    "service-category.powerpack-infinity": PowerPackInfinitySection,
    "service-category.video-section": CategoryDynamicVideo,
    "service-category.country-section": WorldMap,
    "service-category.industries-covered": IconCategorySection,
    "service-category.email-format-section": EmailFormatSection,
    "service-category.data-verification": VerificationProcess,
    "service-category.instant-access": InstantAccessSection,
    "service-category.roi-section": RoiServiceSection,
    "service-category.business-expansion": BusinessExpansionSection,
    "service-category.exclusive-email": EmailDatabaseSection,
    "service-category.faq-section": ServiceFaqSection,
    "service-category.benefit-email": BenefitEmailCategory,
    "service-category.client-form": ClientForm,
    "service-category.email-open-rates": EmailOpenRates,
};

export default async function Page({ params }) {
    const { slug } = await params;

    let data = await getServicesBySlug(slug);

    if (!data?.data?.[0]) {
        data = await getCategoryBySlug(slug);
    }

    const item = data?.data?.[0];
    if (!item) notFound();

    let sections = [];

    if (item.sections) {
         sections = item.sections
    } else if (item.components) {
        sections = item.components
    } else {
        return sections;
    }

    return (
        <>
            {sections.length === 0 ? (
                <h3 className="text-center py-50 text-white font-medium">
                    No sections available for this page.
                </h3>
            ) : (
                sections.map((sec, idx) => {
                    const Component = componentMap[sec.__component];
                    if (!Component) return null;

                    try {
                        return <Component key={idx} data={sec} />;
                    } catch (err) {
                        console.error("Error rendering component:", sec.__component, err);
                        return null;
                    }
                })
            )}
        </>
    );
}
