import BannerThankYou from "@/components/thankYou";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({params:paramsPromise}){
    const params = await paramsPromise;
    return generateSeoMetadata({
        locale: "en",
        slug: "thank-you",
        title: "Thank You | Database Providers",
        description: "Thank you for connecting with Database Providers. We look forward to supporting your sales and marketing journey with verified B2B databases.",
        noIntl: true,
    })
}

export default function ThankYou() {
    return (
        <div>
            <BannerThankYou />
        </div>
    );
}