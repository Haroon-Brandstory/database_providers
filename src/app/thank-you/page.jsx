import BannerThankYou from "@/components/thankYou";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export const metadata = {
    title: "Thank You | Database Providers",
    description:
        "Thank you for connecting with Database Providers. We look forward to supporting your sales and marketing journey with verified B2B databases.",
    alternates: {
        canonical: "https://thedatabaseproviders.com/thank-you",
    },
    metadataBase: new URL("https://thedatabaseproviders.com"),
    language: "en-US",
    robots: {
        index: false,
        follow: false,
    },
};


export default function ThankYou() {
    return (
        <div>
            <BannerThankYou />
        </div>
    );
}