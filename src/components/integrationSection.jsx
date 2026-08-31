"use client";
import Lottie from "lottie-react"
import WaterEffectSection from "./demoscroll"
import integrationAnimation from '../animations/integrations.json'
import { useTranslations } from "next-intl";

export default function IntegrationSection() {
    const t = useTranslations();
    return (
        <>
            {/* Mobile: standalone section in flow */}
            <div className="w-full md:hidden">
                <WaterEffectSection />
            </div>

            <section className="relative bg-white px-4 pb-20 pt-10 md:px-20 md:pt-50 lg:pt-100">
                {/* Desktop: floating overlap */}
                <div className="absolute -top-[100px] left-1/2 hidden w-[89%] -translate-x-1/2 justify-center items-center md:flex">
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
        </>
    )
}
