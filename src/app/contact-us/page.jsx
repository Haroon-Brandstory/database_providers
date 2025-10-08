import ContactFormList from "@/components/contact-us/contactFormPage";
import CusContactSection from "@/components/contact-us/contactSection";
import ContactusBanner from "@/components/contact-us/contactUsBanner";

export default function ContactUs() {
    return (
        <div>
            <ContactusBanner />
            <ContactFormList />
            <CusContactSection />
        </div>
    )
}