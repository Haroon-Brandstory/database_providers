import AboutUsBanner from "@/components/about/aboutBanner";
import TestimonialAbout from "@/components/about/aboutTestimonials";
import IndustrySlider from "@/components/about/industriesSlider";
import SvgMap from "@/components/about/svgMap";
import AboutVisionMission from "@/components/about/visionMission";
import InstantAccessSection from "@/components/instantAccessSection";
import { generateSeoMetadata } from "@/lib/seo";

import { getTranslations } from 'next-intl/server';

/**
 * @param {{ params: { locale: string } }} context
 */
const localeMap = {
    en: 'en-US',
    in: 'en-IN',
    sg: 'en-SG',
    my: 'en-MY',
    ae: 'en-AE'
};

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    const t = await getTranslations({
        locale: params.locale,
        namespace: "about",
    });

    return generateSeoMetadata({
        locale: params.locale,
        slug: "about",
        title: t("seo.title"),
        description: t("seo.description"),
    });
}

export default function AboutUs() {

    const dataForInstantAcces = {
        sectionTitle: "Empower Your Business with Smart Data Solutions",
        sectionDescription: "Reach the right audience with precision. Our targeted U.S. and global B2B databases give you direct access to key decision-makers across industries, enabling stronger engagement and measurable marketing results.",
        button: {
            buttonURL: "/contact-us",
            buttonLabel: "Contact Us",
        }
    }

    return (
        <div>
            <AboutUsBanner />
            <AboutVisionMission />
            <SvgMap />
            <IndustrySlider />
            <TestimonialAbout />
            <InstantAccessSection data={dataForInstantAcces} />
        </div>
    )
}