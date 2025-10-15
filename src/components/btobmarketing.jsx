"use client"
import Lottie from "lottie-react"
import animationData from '../animations/email-verification.json'
import gsap from "gsap";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";


export default function BtoBMarketing() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const cardRefs = useRef([]);
    const t = useTranslations();

    const emailMarketingContent = [
        {
            img: '/btobsection/emailm1.svg',
            title: t('home.section3.data1.title'),
            desc: t('home.section3.data1.para')
        },
        {
            img: '/btobsection/emailm2.svg',
            title: t('home.section3.data2.title'),
            desc: t('home.section3.data2.para')
        },

    ]

    const handleMouseEnter = (i) => {
        if (!cardRefs.current[i]) return;
        setHoveredIndex(i);
        gsap.killTweensOf(cardRefs.current[i]);
        gsap.to(cardRefs.current[i], {
            y: -10,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
        });
    };

    const handleMouseLeave = (i) => {
        if (!cardRefs.current[i]) return;
        setHoveredIndex(null);
        gsap.killTweensOf(cardRefs.current[i]);
        gsap.to(cardRefs.current[i], {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section className="bg-[url('/btobsection/bg-img-btob.png')] bg-cover md:bg-top bg:left pt-16 pb-20 px-4 md:px-20 text-black text-center flex flex-col items-center">
            <div className="container flex flex-col items-center">
                <div className="tex-center max-w-xl">
                    <h2 className="text-[#000000] lg:text-[36px] text-[28px] font-medium">
                        {(() => {
                            const heading = t('home.section3.sectionHeading');
                            const words = heading.split(' ');
                            const lastThree = words.slice(-3).join(' ');
                            const firstPart = words.slice(0, -3).join(' ');
                            return (
                                <>
                                    {firstPart} <span className="text-[#00000080]">{lastThree}</span>
                                </>
                            );
                        })()}
                    </h2>
                </div>
            </div>
            <div className="container mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="content-container flex flex-col">
                        <div className="md:w-160 w-auto">
                            <p className="text-[16px] text-start text-light text-[#51525C] mb-3">{t('home.section3.sectionPara')}</p>
                            <p className="text-[16px] text-start text-light text-[#51525C]"> {t('home.section3.sectionPara2')}</p>
                        </div>
                        <div className="email-tech flex flex-col gap-4 pt-10">
                            {emailMarketingContent.map((item, index) => (
                                <div key={index} ref={(el) => (cardRefs.current[index] = el)} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} style={{ boxShadow: '0px 0px 15px 0px #0000000D' }} className="bg-white rounded-[20px] flex flex-col px-5 py-5">
                                    <div className="flex items-center ">
                                        <img src={item.img} width={40} height={40} alt={item.title} />
                                        <h4 className="text-[24px] text-start ps-2">{item.title}</h4>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[16px] text-[#51525C] font-light text-start">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lottie-container flex flex-col items-center justify-center">
                        <Lottie animationData={animationData} loop={true} className="w-full max-w-[500px] h-auto" />
                    </div>
                </div>
            </div>
        </section>
    )
}