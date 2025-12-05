"use client";
import Lottie from 'lottie-react';
import animationData from '../animations/cta-lottie.json';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'use-intl';

// Counter hook
function useCountUp(target, inView, duration = 1500) {
    const [count, setCount] = useState(0);
    const startTimestamp = useRef(null);

    useEffect(() => {
        if (!inView) return;
        let animationFrame;

        function step(timestamp) {
            if (!startTimestamp.current) startTimestamp.current = timestamp;
            const progress = Math.min((timestamp - startTimestamp.current) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        }

        animationFrame = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(animationFrame);
            startTimestamp.current = null;
        };
    }, [target, inView, duration]);

    return count;
}

// Optimized Lottie loader
function LottieAnimation() {
    const [lottieLoaded, setLottieLoaded] = useState(false);

    useEffect(() => {
        if (animationData) {
            setLottieLoaded(true);
        }
    }, []);

    return (
        <div>
            <div className="md:flex hidden">
                {!lottieLoaded && (
                    <div
                        style={{
                            height: "200px",
                            width: "100%",
                            background: "#e0e7ff",
                            border: "2px solid #6366f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "12px",
                        }}
                    >
                        <span style={{ color: "#ffffff", fontWeight: "bold", opacity: 0 }}>
                            Demo Container (150px height)
                        </span>
                    </div>
                )}

                {lottieLoaded && (
                    <Lottie
                        animationData={animationData}
                        className='md:flex hidden'
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block"
                        }}
                        loop={true}
                    />
                )}
            </div>
        </div>
    );
}

export default function CountSection() {
    const t = useTranslations();

    const countCardData = [
        {
            title: "Healthcare",
            titleHighlight: "Data",
            contacts: 6,
            description: t('home.section2.data1.para'),
        },
        {
            title: "Global Professional",
            titleHighlight: "Data",
            contacts: 15,
            description: t('home.section2.data2.para'),
        },
        {
            title: "Industry",
            titleHighlight: "Data",
            contacts: 9,
            description: t('home.section2.data3.para'),
        },
    ];

    // OPTIONAL: warm up the JSON fetch early (redundant if using static import like you do)
    // useEffect(() => {
    //     fetch('/animations/cta-lottie.json'); // Uncomment if loading via fetch instead of import
    // }, []);

    return (
        <section className="bg-white pt-10 pb-20 px-4 md:px-20 text-black text-center flex flex-col items-center">
            <div className="container flex flex-col items-center">
                <div className="text-center max-w-4xl">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Count Section</h5>
                    <h2 className="text-[#000000] lg:text-[36px] text-[28px] font-medium">
                        Total 140 Million <span className="text-[#00000080]">Data</span>
                    </h2>
                </div>
            </div>

            <div className="cards-section-container flex flex-wrap gap-8 md:gap-12 justify-center items-center mt-10">
                {countCardData.map((item, index) => {
                    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
                    const animatedCount = useCountUp(item.contacts, inView);

                    return (
                        <div
                            key={index}
                            ref={ref}
                            className="bg-[url('/countsection/cardsNormal.png')] hover:bg-[url('/countsection/cardHover.png')] bg-cover bg-center transition-all duration-300 rounded-xl p-6 shadow-md flex flex-col md:h-[400px] w-full sm:w-[380px] lg:w-[350px]"
                        >
                            <div className="top-content flex flex-col items-center text-center">
                                <h3 className="text-[20px] md:text-[24px] text-white font-medium">
                                    {item.title} <span className="text-[#5673F6]">{item.titleHighlight}</span>
                                </h3>
                                <h3 className="text-[72px] relative font-semibold mt-6 bg-gradient-to-b from-[#5A5E64] via-[#B3BDC9] to-[#5E5E5E] bg-clip-text text-transparent">
                                    {animatedCount}M+
                                    <span>
                                        <img
                                            src="/countsection/sparkler.svg"
                                            alt="plus"
                                            className="w-10 h-10 absolute top-[8px] right-[88px]"
                                        />
                                    </span>
                                </h3>
                                <p className="text-white -mt-4">Contacts</p>
                            </div>

                            <div className="pt-12">
                                <hr className="w-full border-t border-white/30 mb-4" />
                                <div className="bottom-p-content text-center pt-4">
                                    <p className="text-[#D0D0D0] text-[16px]">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 relative">
                <LottieAnimation />

                <div className="flex md:hidden h-[300px] rounded-[20px]">
                    <img
                        src="/countsection/cta-banner.png"
                        alt="img"
                        style={{ objectFit: "cover", objectPosition: "center right", borderRadius: "20px" }}
                    />
                </div>

                <div className="content-on-lotti absolute top-0 bottom-0 place-content-center left-0 right-0">
                    <h3 className="text-[24px] text-black text-center font-medium mb-4">
                        {(() => {
                            const heading = t('home.section2.buttonHeading');
                            const words = heading.split(' ');
                            const lastThree = words.slice(-1).join(' ');
                            const firstPart = words.slice(0, -1).join(' ');
                            return (
                                <>
                                    {firstPart} <span className="text-[#00000080]">{lastThree}</span>
                                </>
                            );
                        })()}
                        {/* Custom Data <span className="text-[#00000080]">Solutions</span> */}
                    </h3>
                    <button className="relative gtm-button bg-black text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_15px_#0133E9CC]">
                        <span className="relative z-10">{t('home.section2.buttonCta')}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
