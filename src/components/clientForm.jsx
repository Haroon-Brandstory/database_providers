import { useTranslations } from "next-intl";
import ContactForm from "./contactForm";

export default function ClientForm() {
    const t = useTranslations();
    return (
        <section className="py-20 px-4 md:px-20 bg-white relative">
            <div className="container px-1 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 container mx-auto">
                    <div>
                        <h2 className="lg:text-[36px] text-[28px] md:text-4xl font-semibold leading-tight text-black mb-4">
                               {(() => {
                            const heading = t('home.section12.sectionHeading');
                            const words = heading.split(' ');
                            const lastThree = words.slice(-2).join(' ');
                            const firstPart = words.slice(0, -2).join(' ');
                            return (
                                <>
                                    {firstPart} <span className=" font-normal block text-[#00000080]">{lastThree}</span>
                                </>
                            );
                        })()}
                        </h2>
                        <p className="text-[#444] text-[16px] mb-6 leading-relaxed">
                           {t('home.section12.sectionPara')}
                        </p>
                        <p className="text-green-500 text-[15px] font-semibold">
                           {t('home.section12.sectionGreenText')}
                        </p>
                    </div>
                    <div className="flex items-end justify-end">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
