"use client";

import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";

import indBasedLottie from "../animations/Industry-Data-base.json";
import jobBasedLottie from "../animations/Job-Roles-Data-base.json";
import regionBasedLottie from "../animations/Region-Data-base.json";
import technologyBasedLottie from "../animations/Technology-Data-base.json";

const cardData = [
    {
        title: "Industry Based Segmentation",
        description:
            "Maximize targeted precision in business strategies by empowering organizations to understand unique industry dynamics, tailor offerings, and effectively allocate resources.",
        subDescription:
            "With granular insights about industry leads, businesses can optimize decision-making, enhance customer engagement, and gain a competitive edge, leading to sustained growth and maximum business success.",
        // animationData: indBasedLottie,
        cta: "#",
        vid: "/lottiReplacedVideos/segmentation-comp-vid1.mp4",
    },
    {
        title: "Job Roles based Segmentation",
        description:
            "Attaining remarkable business success is made possible by harnessing the power of titles and job role data. By gaining insights into the responsibilities and positions of influential decision-makers, businesses can devise tailored strategies, improve customer acquisition, and offer relevant solutions.",
        subDescription:
            "This approach leads to heightened conversions, increased customer satisfaction, and enhanced profitability, cementing a strong foundation for overall business prosperity.",
        // animationData: jobBasedLottie,
        cta: "#",
        vid: "/lottiReplacedVideos/segmentation-comp-vid2.mp4",
    },
    {
        title: "Region Based Segmentation",
        description:
            "Understanding local preferences, cultural nuances, and market dynamics through region/geography segmentation helps organizations maximize relevance, customer engagement, and market penetration.",
        subDescription:
            "This focused approach is essential for achieving targeted business success and growth, making it indispensable in today's business landscape.",
        // animationData: regionBasedLottie,
        cta: "#",
        vid: "/lottiReplacedVideos/segmentation-comp-vid3.mp4",
    },
    {
        title: "Technology Based Segmentation",
        description:
            "Harnessing the division of technology preferences in data-centric corporate communication yields specific achievements and financial expansion. Organizations can customize messages, product choices, and interactions by comprehending customers' technological inclinations.",
        subDescription:
            "This personalized strategy amplifies involvement, cultivates customer devotion, and optimizes income channels, placing businesses in a favourable position for enduring triumph in a technology-dominated era.",
        // animationData: technologyBasedLottie,
        cta: "#",
        vid: "/lottiReplacedVideos/segmentation-comp-vid4.mp4",
    },
];

export default function Segmentation() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const cards = cardRefs.current;
        if (!cards.length) return;

        const observers = [];
        let animationFrame;

        cards.forEach((card, index) => {
            if (!card || index === cards.length - 1) return;

            const nextCard = cards[index + 1];
            const cardInner = card.querySelector(".card__inner");
            const offsetTop = 20 + index * 20;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = requestAnimationFrame(() => {
                        const ratio = entry.intersectionRatio;
                        const scale = 1 - (cards.length - 1 - index) * 0.07 * ratio;
                        const brightness = 1 - 0.3 * ratio;

                        if (cardInner) {
                            cardInner.style.transform = `scale(${scale})`;
                            cardInner.style.filter = `brightness(${brightness})`;
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: `-${offsetTop}px 0px -${window.innerHeight - card.clientHeight}px 0px`,
                    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
                }
            );

            observer.observe(nextCard);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            {/* <div className="h-[50vh]"></div> */}

            <section className="bg-white px-4 py-24 md:px-20 pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">
                        Types of Segmentation
                    </h5>
                    <h2 className="text-black lg:text-[36px] text-[28px] font-medium mb-6">
                        We Scrutinize For Your{" "}
                        <span className="text-[#00000080] block">Business</span>
                    </h2>
                </div>

                <div className="cards mx-auto max-w-6xl mt-16 space-y-16">
                    {cardData.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className="card sticky top-0"
                        >
                            <div
                                className="card__inner transition-transform transition-filter duration-300 ease-out will-change-transform will-change-filter
                flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-xl origin-top min-h-[500px] p-6 lg:p-12"
                            >
                                <div className="text-start flex-1 flex flex-col justify-center">
                                    <h2 className="text-2xl text-black font-bold mb-2">{item.title}</h2>
                                    <p className="text-gray-700 mb-2 text-sm md:text-base">
                                        {item.description}
                                    </p>
                                    <p className="text-gray-700 text-sm md:text-base">
                                        {item.subDescription}
                                    </p>
                                    <div className="pt-4">
                                        <a
                                            href={item.cta}
                                            className="text-[#2C6BFF] font-medium flex items-center gap-1"
                                        >
                                            Know More <span aria-hidden>→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 pt-4 md:pt-4 flex justify-center items-center">
                                    {/* <Lottie
                                        animationData={item.animationData}
                                        loop
                                        autoplay
                                        className="max-w-[400px] w-full"
                                    /> */}
                                    <video src={item.vid} loop muted autoPlay playsInline className="rounded-[30px]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* <div className="h-[80vh]"></div> */}
        </>
    );
}
