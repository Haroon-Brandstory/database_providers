import { getServicesBySlug } from "@/lib/services";
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
import { notFound } from "next/navigation";
import EmailOpenRates from "@/components/emailOpenRates";

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

export default async function ServicePage({ params }) {
    const { services } = await params;
    const data = await getServicesBySlug(services,);
    const serviceUnderCategory = data?.data?.[0];
    if (!serviceUnderCategory) {
        notFound();
    }
    const sections = serviceUnderCategory?.components;

    return (
        <>
            <>
                {sections.map((sec, idx) => {
                    const Component = componentMap[sec.__component];
                    if (!Component) return null;
                    return <Component key={idx} data={sec} />;
                })}
            </>
        </>
    );
}
