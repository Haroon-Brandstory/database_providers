"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import indBasedLottie from '../animations/Industry-Data-base.json'
import jobBasedLottie from '../animations/Job-Roles-Data-base.json'
import regionBasedLottie from '../animations/Region-Data-base.json'
import technologyBasedLottie from '../animations/Technology-Data-base.json'

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    {
        title: "Industry Based Segmentation",
        description: "Maximize targeted precision in business strategies by empowering organizations to understand unique industry dynamics, tailor offerings, and effectively allocate resources. ",
        subDescription: "With granular insights about industry leads, businesses can optimize decision-making, enhance customer engagement, and gain a competitive edge, leading to sustained growth and maximum business success.",
        animationData: indBasedLottie,
        cta: '#'
    },
    {
        title: "Job Roles based Segmentation",
        description: "Attaining remarkable business success is made possible by harnessing the power of titles and job role data. By gaining insights into the responsibilities and positions of influential decision-makers, businesses can devise tailored strategies, improve customer acquisition, and offer relevant solutions. ",
        subDescription: "This approach leads to heightened conversions, increased customer satisfaction, and enhanced profitability, cementing a strong foundation for overall business prosperity.",
        animationData: jobBasedLottie,
        cta: '#'
    },
    {
        title: "Region Based Segmentation",
        description: "Understanding local preferences, cultural nuances, and market dynamics through region/geography segmentation helps organizations maximize relevance, customer engagement, and market penetration. ",
        subDescription: "This focused approach is essential for achieving targeted business success and growth, making it indispensable in today's business landscape.",
        animationData: regionBasedLottie,
        cta: '#'
    },
    {
        title: "Technology Based Segmentation",
        description: "Harnessing the division of technology preferences in data-centric corporate communication yields specific achievements and financial expansion. Organizations can customize messages, product choices, and interactions by comprehending customers' technological inclinations. ",
        subDescription: "This personalized strategy amplifies involvement, cultivates customer devotion, and optimizes income channels, placing businesses in a favourable position for enduring triumph in a technology-dominated era.",
        animationData: technologyBasedLottie,
        cta: '#'
    },

];

export default function Segmentation() {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const items = cardRefs.current;
        // Set initial state: only the first card is visible
        items.forEach((item, index) => {
            if (index !== 0) {
                gsap.set(item, { yPercent: 100 });
            }
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true,
                start: "bottom bottom",
                end: () => `+=${items.length * 100}%`,
                // end: () => `bottom bottom`,
                scrub: 1,
                invalidateOnRefresh: true,
                markers: true,
            },
            defaults: { ease: "none" },
        });

        items.forEach((item, index) => {
            // Animate the current card (scale, borderRadius for effect)
            timeline.to(item, {
                scale: 0.97,
                borderRadius: "16px",
            });
            // Animate the next card sliding up
            if (items[index + 1]) {
                timeline.to(
                    items[index + 1],
                    {
                        yPercent: 0,
                    },
                    "<"
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            timeline.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="scroll-section vertical-section section bg-white py-20 px-4 md:px-20 overflow-hidden relative">
            <div className="container mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">
                        Types of Segmentation
                    </h5>
                    <h2 className="text-black text-[36px] font-medium mb-6">
                        We Scrutinize For Your <span className="text-[#00000080] block">Business</span>
                    </h2>
                </div>
                <div
                    ref={wrapperRef}
                    className="wrapper mt-16 pt-10"
                    style={{ height: "100vh", position: "relative" }}
                >
                    {cardData.map((item, i) => (
                        <div
                            key={i}
                            ref={el => (cardRefs.current[i] = el)}
                            className="item card bg-white border border-[#E4E4E4] rounded-xl shadow-xl p-6 lg:p-12 flex items-center justify-center flex-col text-center text-black min-h-[500px]"
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                inset: 0,
                                zIndex: cardData.length + i,
                                boxShadow: "rgb(149, 157, 165, 0.2) 0px 8px 24px",
                                overflow: "hidden",
                            }}
                        >
                            <div className="grid lg:grid-cols-2 gap-10 w-full">
                                <div className="text-start flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                                    <p className="text-gray-700 mb-2 text-[14px] md:text-[16px]">{item.description}</p>
                                    <p className="text-gray-700 text-[14px] md:text-[16px]">{item.subDescription}</p>
                                    <div className="pt-4">
                                        <a href={item.cta} className="text-[#2C6BFF] font-medium flex items-center gap-1">
                                            Know More <span aria-hidden>→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="lottie-wrapper w-full">
                                    <Lottie animationData={item.animationData} loop autoplay />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
