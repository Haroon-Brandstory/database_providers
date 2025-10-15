"use client";
import Lottie from "lottie-react"
import WaterEffectSection from "./demoscroll"
import integrationAnimation from '../animations/integrations.json'
import { useTranslations } from "next-intl";

export default function IntegrationSection() {
    const t = useTranslations();
    return (
        <section className="pb-20 lg:pt-100 pt-50 px-4 md:px-20 bg-white relative">
            <div className="absolute -top-[100px] w-[89%] flex justify-center items-center">
                <WaterEffectSection />
            </div>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Integrations</h5>
                    <h2 className="text-black lg:text-[36px] text-[28px] font-medium mb-6">
                         {(() => {
                            const heading = t('home.section9.sectionHeading');
                            const words = heading.split(' ');
                            const lastThree = words.slice(-2).join(' ');
                            const firstPart = words.slice(0, -2).join(' ');
                            return (
                                <>
                                    {firstPart} <span className=" block text-[#00000080]">{lastThree}</span>
                                </>
                            );
                        })()}
                    </h2>
                </div>
                <div className="integrationSection flex flex-col justify-center items-center">
                    <Lottie animationData={integrationAnimation} loop={true} />
                </div>
            </div>
        </section>
    )
}
