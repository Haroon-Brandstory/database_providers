import { useTranslations } from "next-intl";
import ContactForm from "../contactForm";

export default function ContactFormList() {

    const t = useTranslations("contact-us");

    return (
        <section className="bg-white py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container mx-auto">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-black mb-4">
                            {(() => {
                                const text = t('section1.title');
                                const words = text.split(" ");
                                const lastTwo = words.slice(-2).join(" ");
                                const firstPart = words.slice(0, -2).join(" ");

                                return (
                                    <>
                                        {firstPart}{" "}
                                        <span className="text-[#A3A3A3] font-normal">{lastTwo}</span>
                                    </>
                                );
                            })()}
                        </h2>
                        <p className="text-[#444] text-[16px] mb-6 leading-relaxed">
                            {t('section1.content')}
                        </p>
                    </div>
                    <div className="flex items-end justify-end">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}