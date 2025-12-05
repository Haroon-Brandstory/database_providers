import InstantAccessSection from "@/components/instantAccessSection";
import YtVideoListingSection from "@/components/videos/videListinSection";
import YtVideoSectionBanner from "@/components/videos/videoSectionBanner";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    const t = await getTranslations({
        locale: params.locale,
        namespace: "videos",
    })

    return generateSeoMetadata({
        locale: params.locale,
        slug: "videos",
        title: t("seo.title"),
        description: t("seo.description"),
        canonical: "https://www.thedatabaseproviders.com/videos/"
    })
}

export default function YoutubeVideoSec() {

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
            <YtVideoSectionBanner />
            <YtVideoListingSection />
            <InstantAccessSection data={dataForInstantAcces} />
        </div>
    );
}