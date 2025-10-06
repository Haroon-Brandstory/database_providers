import { getCategoryBySlug } from "@/lib/services";
import ServicePageBanner from "@/components/servicebanner";
import PowerPackSection from "@/components/servPowerPack";
import CategoryDynamicVideo from "@/components/catDynamicVideo";
import PowerPackInfinitySection from "@/components/catPowerInfinity";
import WorldMap from "@/components/worldMap";
import IconCategorySection from "@/components/iconIndSection";
import EmailFormatSection from "@/components/emailFotmatSection";
import VerificationProcess from "@/components/dataVerificationSection";
import InstantAccessSection from "@/components/instantAccessSection";
import RoiServiceSection from "@/components/roiServSection";
import BusinessExpansionSection from "@/components/businessExpansionSection";
import EmailDatabaseSection from "@/components/emailDbSection";
import ClientForm from "@/components/clientForm";
import ServiceFaqSection from "@/components/serviceFaq";
import BenefitEmailCategory from "@/components/benefitEmailSection";
import EmailOpenRates from "@/components/emailOpenRates";
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

export default async function CategoryPage({ params }) {
    const { category } = params;

    // Fetch category data
    const res = await getCategoryBySlug(category);

    // Ensure data exists
    const service = res?.data?.[0];
    if (!service) notFound();

    // Sections array with fallback
    const sections = service.sections || [];

    return (
        <>
            {sections.length === 0 ? (
                <p className="text-center py-10 text-gray-500">
                    No sections available for this category.
                </p>
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
