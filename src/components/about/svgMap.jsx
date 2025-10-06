"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SvgMap() {
    const [svgMarkup, setSvgMarkup] = useState("\n");

    const markers = [
        { id: "usa", x: 144, y: 160, label: "USA", count: 1500000, flag: "/servicesection/flag-usa.svg", },
        { id: "uae", x: 693, y: 246, label: "UAE", count: 500000, flag: "/servicesection/flag-uae.svg", },
        { id: "india", x: 785, y: 240, label: "India", count: 2000000, flag: "/servicesection/flag-india.svg" },
        { id: "singapore", x: 880, y: 330, label: "Singapore", count: 300000, flag: "/servicesection/flag-singapore.svg" },
        { id: "Malaysia", x: 920, y: 330, label: "Malaysia", count: 450000, flag: "/servicesection/flag-malaysia.svg", },
    ];

    const containerRef = useRef(null);
    const [hoverInfo, setHoverInfo] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetch("/about-us/global-map.svg")
            .then((res) => res.text())
            .then((text) => {
                if (isMounted) setSvgMarkup(text);
            })
            .catch(() => {
                if (isMounted) setSvgMarkup("\n");
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="bg-white flex items-center justify-center py-16 px-6" aria-label="Global map">
            <div className="container max-w-7xl max-auto  flex-col items-center justify-center">
                <div className="overflow-x-auto flex items-center lg:justify-center max-w-7xl">
                    <div className="relative" ref={containerRef}>
                        <div
                            aria-hidden="true"
                            style={{ pointerEvents: "none" }}
                            dangerouslySetInnerHTML={{ __html: svgMarkup }}
                        />

                        <svg
                            viewBox="0 0 1151 563"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 h-full w-full"
                        >
                            {markers.map((m) => (
                                <g key={m.id}>
                                    <circle
                                        cx={m.x}
                                        cy={m.y}
                                        r={12}
                                        fill="transparent"
                                        className="transition-transform duration-150 ease-out "
                                        onMouseEnter={(e) => {
                                            const rect = containerRef.current?.getBoundingClientRect();
                                            if (!rect) return;
                                            const scaleX = rect.width / 1151;
                                            const scaleY = rect.height / 563;
                                            setHoverInfo({
                                                id: m.id,
                                                label: m.label,
                                                count: m.count,
                                                flag: m.flag,
                                                left: m.x * scaleX,
                                                top: m.y * scaleY,
                                            });
                                        }}
                                        onMouseLeave={() => setHoverInfo(null)}
                                    />
                                    <circle
                                        cx={m.x}
                                        cy={m.y}
                                        r={12}
                                        fill="none"
                                        stroke="transparent"
                                        strokeOpacity="0.25"
                                    />
                                </g>
                            ))}
                        </svg>

                        {hoverInfo && (
                            <div
                                className="pointer-events-none absolute z-10"
                                style={{
                                    left: hoverInfo.left + 12,
                                    top: hoverInfo.top - 8,
                                }}
                            >
                                <div className="relative bg-[#00134E] shadow-lg rounded-[10px] p-4 border w-56">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={hoverInfo.flag}
                                            alt={hoverInfo.label}
                                            className="w-6 h-4"
                                        />
                                        <div className="font-semibold text-white text-[14px] uppercase">
                                            {hoverInfo.label}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-300">Total Counts</p>
                                        <div className="text-white text-[14px] font-medium">
                                            {hoverInfo.count?.toLocaleString?.() ?? hoverInfo.count}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#2C6BFF] text-[16px] font-medium">Global B2B Data</p>
                    <h2 className="text-black  text-center lg:text-[36px] text-[26px] font-medium mb-6">Worldwide Email Lists. <span className="text-[#00000080]">Verified & Ready.</span></h2>
                    <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                        <span className="relative z-10">Know More</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}