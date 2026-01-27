"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    FaFileAlt,
    FaSearch,
    FaCopy,
    FaEnvelope,
    FaChartBar,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const steps = [
    {
        title: "Identify",
        description: "Identify high-value accounts matching your ICP",
        icon: <FaFileAlt />,
    },
    {
        title: "Map",
        description: "Map decision-makers and buying committees",
        icon: <FaSearch />,
    },
    {
        title: "Strategy",
        description: "Personalized ABM strategy and messaging",
        icon: <FaCopy />,
    },
    {
        title: "Engage",
        description: "Engage accounts across multiple channels",
        icon: <FaEnvelope />,
    },
    {
        title: "Measure",
        description: "Track performance and optimize ROI",
        icon: <FaChartBar />,
    },
];

export default function ABMStepMeter() {
    const [active, setActive] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % steps.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const totalSpan = isMobile ? 120 : 180;
    const startAngle = -totalSpan / 2;
    const needleRotation =
        startAngle + active * (totalSpan / (steps.length - 1));

    return (
        <section className="relative bg-[#F5F5F5] py-24 overflow-hidden">
            <div className="mx-auto max-w-6xl px-6 text-center">
                {/* HEADER */}
                <div className="flex flex-col items-center">
                    <div className="bg-[#FFFFFF] mb-2 text-[#6D6D6D] text-center px-3 py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                        How Does ABM Work?
                    </div>

                    <h2 className="lg:text-5xl text-xl text-center max-w-4xl font-medium lg:leading-14 text-black mb-4">
                        A Proven, End-to-End ABM System
                        <br />
                        Built for Results
                    </h2>
                </div>

                {/* DESKTOP SPEEDOMETER */}
                {!isMobile && (
                    <>
                        <div className="overflow-hidden pb-14">
                            <div className="relative mx-auto h-[240px] md:h-[500px] max-w-4xl">
                                {/* ROTATING ICONS */}
                                <div
                                    className="absolute z-30 left-1/2 md:left-[45%] -bottom-8 w-[300px] md:w-[820px] h-[150px] md:h-[390px] origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                    style={{ transform: `translateX(-50%)` }}
                                >
                                    {steps.map((step, i) => {
                                        const angle =
                                            startAngle +
                                            i * (totalSpan / (steps.length - 1));
                                        const isActive = i === active;

                                        return (
                                            <div
                                                key={i}
                                                className="absolute md:left-1/2 left-[135px] bottom-0"
                                                style={{
                                                    transform: `
                            rotate(${angle}deg)
                            translateY(var(--gauge-radius, -125px))
                            rotate(${-angle}deg)
                          `,
                                                }}
                                            >
                                                <style jsx>{`
                          div {
                            --gauge-radius: -135px;
                          }
                          @media (min-width: 768px) {
                            div {
                              --gauge-radius: -400px;
                            }
                          }
                        `}</style>

                                                <div
                                                    className={`flex h-8 w-8 md:h-20 md:w-20 items-center justify-center rounded-xl transition-all duration-700
                          ${isActive
                                                            ? "bg-gradient-to-b from-blue-400 to-blue-600 text-white scale-110 shadow-[0_15px_30px_rgba(30,136,229,0.35)]"
                                                            : "bg-white text-gray-300 shadow-inner opacity-70"
                                                        }`}
                                                >
                                                    <span className="text-xl md:text-3xl">
                                                        {step.icon}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* OUTER ARC */}
                                <div className="absolute inset-x-0 bottom-3 flex justify-center mb-1 md:mb-4">
                                    <div className="relative w-[300px] md:w-[660px] h-[300px] md:h-[660px] translate-y-[150px] md:translate-y-[360px] rounded-full border-[10px] md:border-[30px] border-white shadow-2xl">
                                        {/* NEEDLE */}
                                        <div
                                            className="absolute left-1/2 bottom-1/2 w-[3px] md:w-[6px] h-[105px] md:h-[300px] origin-bottom -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center"
                                            style={{
                                                transform: `translateX(-50%) rotate(${needleRotation}deg)`,
                                            }}
                                        >
                                            <div className="w-[2px] md:w-[4px] h-[20px] md:h-[60px] rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                            <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-20" />
                                        </div>
                                    </div>
                                </div>

                                {/* INNER RING */}
                                <div className="absolute inset-x-0 bottom-3 flex justify-center">
                                    <div className="w-[210px] md:w-[520px] h-[210px] md:h-[510px] translate-y-[105px] md:translate-y-[260px] rounded-full bg-white shadow-inner border border-gray-100" />
                                </div>

                                {/* CENTER LOGO */}
                                <div className="absolute bottom-[15px] md:bottom-[12px] left-1/2 z-30 -translate-x-1/2">
                                    <Image
                                        src={"/abm/dp-svg.svg"}
                                        width={163}
                                        height={163}
                                        alt="dp logo"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* STEP TEXT */}
                        <div className="flex items-center justify-center mt-5 w-full">
                            <div className="w-full text-center">
                                <span className="mb-0 lg:text-[20px] block text-[10px] md:text-base font-semibold text-blue-500">
                                    Step {active + 1}
                                </span>
                                <p className="text-gray-500 text-[9px] md:text-[22px] px-4">
                                    {steps[active].description}
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* MOBILE SWIPER */}
                {isMobile && (
                    <div className="mt-10">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{ delay: 1500, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            spaceBetween={16}
                            slidesPerView={1}
                        >
                            {steps.map((step, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-white rounded-2xl p-6 mb-10 min-h-[220px] shadow-md flex flex-col items-center justify-center text-center">
                                        <div className="mb-4 text-blue-500 text-3xl">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-black mb-2">
                                            Step {index + 1}: {step.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </section>
    );
}
