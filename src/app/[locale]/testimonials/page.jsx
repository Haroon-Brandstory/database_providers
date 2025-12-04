import InstantAccessSection from "@/components/instantAccessSection";
import TestimonialSectionBanner from "@/components/testimonials/testimonialBanner";
import TestimonialsListingSection from "@/components/testimonials/testimonialListing";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    const t = await getTranslations({
        locale: params.locale,
        namespace: "testimonials",
    });

    return generateSeoMetadata({
        locale: params.locale,
        slug: "testimonials",
        title: t("seo.title"),
        description: t("seo.description"),
    });
}

export default function TestimonialPage() {

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
            <TestimonialSectionBanner />
            <TestimonialsListingSection />
            <InstantAccessSection data={dataForInstantAcces} />
        </div>
    )
}