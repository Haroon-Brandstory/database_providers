"use client";
import Image from "next/image";
import { useTranslations } from "use-intl";

export default function WaterEffectSection() {
    const t = useTranslations()
    return (
        <section className="relative h-[200px] md:h-[350px] w-full flex items-center justify-center overflow-hidden">
            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/whychooseus/hover-bg.svg"
                    alt="Background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-0 flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-[18px] md:text-4xl font-semibold text-white text-center mb-6">
                    {(() => {
                        const heading = t('home.section8.sectionHeading');
                        const words = heading.split(' ');
                        const lastThree = words.slice(-2).join(' ');
                        const firstPart = words.slice(0, -2).join(' ');
                        return (
                            <>
                                {firstPart} <span className=" block ">{lastThree}</span>
                            </>
                        );
                    })()}
                </h2>
                <button className="md:mt-4 md:px-6 px-6 text-[12px] md:text-[18px] py-3 bg-white text-blue-700 font-medium rounded-full shadow-md hover:bg-blue-100 transition-all">
                    Get a free sample data
                </button>
            </div>
        </section>
    );
}
