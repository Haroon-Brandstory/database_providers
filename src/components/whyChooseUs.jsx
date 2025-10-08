"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    {
        title: "Streamlined Data",
        description: "Simplify your access to structured databases for efficient marketing and sales campaigns, generating high-quality leads.",
        img: "/whychooseus/slider-icon1.svg",
    },
    {
        title: "Data Security & Privacy",
        img: "/whychooseus/slider-icon2.svg",
        description: "Safeguard your valuable business data as we protect it from unauthorized access and breaches with robust data protection measures, practices, and compliance policies.",
    },
    {
        title: "Expanded Market Reach",
        img: "/whychooseus/slider-icon3.svg",
        description: "Maximize growth and build business across borders with data access to titles, states, phone numbers, and email addresses of potential and key global prospects.",
    },
    {
        title: "Accurate Targeting",
        img: "/whychooseus/slider-icon4.svg",
        description: "Reach the right audience with precision using our advanced segmentation and targeting tools.",
    },
    {
        title: "Comprehensive Insights",
        img: "/whychooseus/slider-icon5.svg",
        description: "Gain deep insights into your market and prospects with our comprehensive data analytics.",
    },
    {
        title: "Custom Solutions",
        img: "/whychooseus/slider-icon6.svg",
        description: "Get tailored data solutions to fit your unique business needs and objectives.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     // Set isMobile on mount and on resize
    //     const checkMobile = () => {
    //         setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    //     };
    //     checkMobile();
    //     window.addEventListener("resize", checkMobile); 
    //     return () => window.removeEventListener("resize", checkMobile);
    // }, []);

    useEffect(() => {
        if (typeof window === "undefined" || isMobile) return;
        const section = sectionRef.current;
        const scrollContainer = scrollRef.current;
        if (!section || !scrollContainer) return;

        let ctx = gsap.context(() => {
            const totalScrollWidth = scrollContainer.scrollWidth;
            const viewportWidth = section.offsetWidth;
            const scrollDistance = totalScrollWidth - viewportWidth;

            gsap.set(scrollContainer, { x: 0 });

            let startPin = "top top";
            if (window.innerWidth <= 1500 && window.innerWidth >= 1220) {
                startPin = "15% top"
            }
            if (window.innerWidth <= 650) { startPin = "5% top" }

            ScrollTrigger.create({
                trigger: section,
                pin: true,
                start: startPin,
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pinSpacing: true,
                invalidateOnRefresh: true,
                // markers:true,
                onUpdate: self => {
                    const progress = self.progress;
                    gsap.set(scrollContainer, {
                        x: -scrollDistance * progress
                    });
                }
            });
        }, section);

        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile]);

    const cardContainerClass = isMobile
        ? "flex gap-4 overflow-x-auto md:overflow-x-visible scrollbar-hide"
        : "flex gap-4";

    return (
        <section
            ref={sectionRef}
            className="relative flex justify-center items-center w-full pt-12 pb-60 px-4 md:px-20 bg-[url('/whychooseus/sectionbanner.png')] bg-top bg-cover overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-full flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center mb-6">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Why Choose Us</h5>
                    <h2 className="text-white lg:text-[36px] text-[28px] font-medium mb-3">
                        Get your B2B Data With{" "}
                        <span className="block">
                            <span className="text-[#5673F6]">Accuracy & Reliability</span>
                        </span>
                    </h2>
                    <p className="text-center text-[#D0D0D0] text-[16px] pb-3">
                        As a leading B2B data service provider in the USA, we are backed by professionals and industry experts in every step of the data processing journey.
                    </p>
                    <p className="text-center text-[#D0D0D0] text-[16px] pb-3">
                        We continue to serve the B2B market with advanced analytics and technology that empower our client’s businesses with personalized strategies, potential prospects, and exponential growth.
                    </p>
                </div>
                {/* Horizontal Scroll Section */}
                <div className="w-full overflow-hidden" style={{ position: "relative", height: "250px" }}>
                    <div
                        ref={scrollRef}
                        className={cardContainerClass}
                        style={{
                            width: isMobile ? "100%" : `${cardData.length * 386}px`,
                            willChange: "transform"
                        }}
                    >
                        {cardData.map((item, i) => (
                            <div key={i} className="each-cards p-5 w-[350px] shrink-0 rounded-xl">
                                <div className="card-img-wrapper mb-4 border-b pb-5">
                                    <Image src={item.img} width={52} height={52} alt="img" />
                                </div>
                                <div className="card-content">
                                    <h4 className="text-white text-[24px] font-semibold mb-2">{item.title}</h4>
                                    <p className="text-[14px] text-white font-normal">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}