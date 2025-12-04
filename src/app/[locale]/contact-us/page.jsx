import ContactFormList from "@/components/contact-us/contactFormPage";
import CusContactSection from "@/components/contact-us/contactSection";
import ContactusBanner from "@/components/contact-us/contactUsBanner";
import { generateSeoMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    const t = await getTranslations({
        locale: params.locale,
        namespace: "contact-us",
    });
    
    return generateSeoMetadata({
        locale: params.locale,
        slug: "contact-us",
        title: t("seo.title"),
        description: t("seo.description"),
    });
}


export default function ContactUs() {
    return (
        <div>
            <ContactusBanner />
            <ContactFormList />
            <CusContactSection />
        </div>
    )
}