import AboutUsBanner from "@/components/about/aboutBanner";
import TestimonialAbout from "@/components/about/aboutTestimonials";
import IndustrySlider from "@/components/about/industriesSlider";
import SvgMap from "@/components/about/svgMap";
import AboutVisionMission from "@/components/about/visionMission";
import InstantAccessSection from "@/components/instantAccessSection";

import { getTranslations } from 'next-intl/server';

/**
 * @param {{ params: { locale: string } }} context
 */
export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;

    const t = await getTranslations({ locale: params.locale, namespace: 'about' });

    const title = t('seo.title');
    const description = t('seo.description');
    const canonical = `https://www.thedatabaseproviders.com/${params.locale == 'en' ? "" : params.locale + '/'}about`;

    return {
        title,
        description,
        alternates: { canonical },
        robots: { index: true, follow: true },
    };
}
export default function AboutUs() {

    const dataForInstantAcces = {
        sectionTitle: "Empower Your Business with Smart Data Solutions",
        sectionDescription: "Unlock the power of precision-driven data to reach the right audience, at the right time. Our targeted U.S. and global B2B databases help you connect with key decision-makers across industries, driving impactful engagement and measurable results.",
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