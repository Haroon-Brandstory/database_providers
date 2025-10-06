import InstantAccessSection from "@/components/instantAccessSection";
import YtVideoListingSection from "@/components/videos/videListinSection";
import YtVideoSectionBanner from "@/components/videos/videoSectionBanner";

export default function YoutubeVideoSec() {

    const dataForInstantAcces = {
        sectionTitle: "Empower Your Business with Smart Data Solutions",
        sectionDescription: "Unlock the power of precision-driven data to reach the right audience, at the right time. Our targeted U.S. and global B2B databases help you connect with key decision-makers across industries, driving impactful engagement and measurable results.",
        button: {
            buttonURL: "#",
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