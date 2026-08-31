"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const CARD_GAP = 16;
const CARD_WIDTH_MOBILE = 280;

const cardData = [
    {
        title: "Streamlined Data",
        description:
            "Simplify your access to structured databases for efficient marketing and sales campaigns, generating high-quality leads.",
        img: "/whychooseus/slider-icon1.svg",
    },
    {
        title: "Data Security & Privacy",
        img: "/whychooseus/slider-icon2.svg",
        description:
            "Safeguard your valuable business data as we protect it from unauthorized access and breaches with robust data protection measures, practices, and compliance policies.",
    },
    {
        title: "Expanded Market Reach",
        img: "/whychooseus/slider-icon3.svg",
        description:
            "Maximize growth and build business across borders with data access to titles, states, phone numbers, and email addresses of potential and key global prospects.",
    },
    {
        title: "Accurate Targeting",
        img: "/whychooseus/slider-icon4.svg",
        description:
            "Reach the right audience with precision using our advanced segmentation and targeting tools.",
    },
    {
        title: "Comprehensive Insights",
        img: "/whychooseus/slider-icon5.svg",
        description:
            "Gain deep insights into your market and prospects with our comprehensive data analytics.",
    },
    {
        title: "Custom Solutions",
        img: "/whychooseus/slider-icon6.svg",
        description:
            "Get tailored data solutions to fit your unique business needs and objectives.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const viewportRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const t = useTranslations();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const section = sectionRef.current;
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!section || !track || !viewport) return;

        const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

        const ctx = gsap.context(() => {
            gsap.set(track, { x: 0 });

            gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getScrollDistance()}`,
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        const refresh = () => ScrollTrigger.refresh();
        const raf = requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("load", refresh);
            ctx.revert();
        };
    }, [isMobile]);

    const updateScrollProgress = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        setScrollProgress(maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0);
    }, []);

    const handleScrollbarPointer = useCallback((clientX, barEl) => {
        const viewport = viewportRef.current;
        if (!viewport || !barEl) return;
        const rect = barEl.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        viewport.scrollTo({ left: ratio * maxScroll });
        setScrollProgress(ratio);
    }, []);

    const onScrollbarPointerDown = useCallback(
        (e) => {
            const bar = e.currentTarget;
            bar.setPointerCapture(e.pointerId);
            handleScrollbarPointer(e.clientX, bar);

            const onMove = (moveEvent) =>
                handleScrollbarPointer(moveEvent.clientX, bar);
            const onUp = () => {
                bar.releasePointerCapture(e.pointerId);
                bar.removeEventListener("pointermove", onMove);
                bar.removeEventListener("pointerup", onUp);
            };
            bar.addEventListener("pointermove", onMove);
            bar.addEventListener("pointerup", onUp);
        },
        [handleScrollbarPointer]
    );

    const heading = t("home.section7.heading");
    const words = heading.split(" ");
    const mid = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, mid - 1).join(" ");
    const secondHalf = words.slice(mid - 1).join(" ");

    return (
        <section
            ref={sectionRef}
            className="relative flex w-full min-h-screen items-center justify-center overflow-hidden bg-[url('/whychooseus/sectionbanner.png')] bg-cover bg-top px-4 py-16 md:px-20"
        >
            <div className="flex w-full flex-col items-center justify-center">
                <div className="mb-8 flex max-w-4xl flex-col justify-center text-center">
                    <h2 className="text-[16px] font-medium text-[#2C6BFF]">
                        Why Choose Us
                    </h2>
                    <h2 className="mb-3 text-[28px] font-medium text-white lg:text-[36px]">
                        {firstHalf}
                        <span className="block">
                            <span className="text-[#5673F6]">{secondHalf}</span>
                        </span>
                    </h2>
                    <p className="pb-3 text-center text-[16px] text-[#D0D0D0]">
                        {t("home.section7.para1")}
                    </p>
                    <p className="pb-3 text-center text-[16px] text-[#D0D0D0]">
                        {t("home.section7.para2")}
                    </p>
                </div>

                <div className="relative w-full">
                    <div
                        id="why-choose-cards"
                        ref={viewportRef}
                        onScroll={isMobile ? updateScrollProgress : undefined}
                        className={
                            isMobile
                                ? "flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                : "w-full overflow-hidden"
                        }
                    >
                        <div
                            ref={trackRef}
                            className={
                                isMobile
                                    ? "flex gap-4"
                                    : "flex w-max gap-4 will-change-transform"
                            }
                        >
                            {cardData.map((item, i) => (
                                <div
                                    key={i}
                                    className={`each-cards shrink-0 snap-start rounded-xl p-5 ${
                                        isMobile ? "w-[280px]" : "w-[350px]"
                                    }`}
                                >
                                    <div className="card-img-wrapper mb-4 border-b pb-5">
                                        <Image
                                            src={item.img}
                                            width={52}
                                            height={52}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="mb-2 text-[24px] font-semibold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] font-normal text-white">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {isMobile && (
                        <div
                            role="scrollbar"
                            aria-controls="why-choose-cards"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(scrollProgress * 100)}
                            aria-orientation="horizontal"
                            aria-label="Scroll cards"
                            tabIndex={0}
                            onPointerDown={onScrollbarPointerDown}
                            onKeyDown={(e) => {
                                const viewport = viewportRef.current;
                                if (!viewport) return;
                                const step = CARD_WIDTH_MOBILE + CARD_GAP;
                                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                                    viewport.scrollBy({ left: step, behavior: "smooth" });
                                }
                                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                                    viewport.scrollBy({ left: -step, behavior: "smooth" });
                                }
                            }}
                            className="relative mx-auto mt-6 h-1.5 w-[70%] max-w-xs cursor-pointer touch-none rounded-full bg-white/25"
                        >
                            <div
                                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#2C6BFF] transition-[left] duration-75"
                                style={{
                                    width: `${100 / cardData.length}%`,
                                    left: `${scrollProgress * (100 - 100 / cardData.length)}%`,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
