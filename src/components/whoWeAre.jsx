"use client"
import { useRef, useState } from "react";
import gsap from "gsap";

export default function WhoWeAre() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const cardRefs = useRef([]);

    const stats = [
        {
            icon: '/icons/icon1.svg',
            value: '10+',
            label: 'Years of experience',
            bg: 'from-purple-400 to-purple-600',
            arcImg: '/whoweare/arc_img1.svg'
        },
        {
            icon: '/icons/icon2.svg',
            value: '750+',
            label: 'Customers served',
            bg: 'from-orange-400 to-orange-600',
            arcImg: '/whoweare/arc_img2.svg'
        },
        {
            icon: '/icons/icon3.svg',
            value: '120+',
            label: 'Key business verticals',
            bg: 'from-blue-400 to-blue-600',
            arcImg: '/whoweare/arc_img3.svg'
        },
        {
            icon: '/icons/icon4.svg',
            value: '2Bn+',
            label: 'Data processed',
            bg: 'from-green-400 to-green-600',
            arcImg: '/whoweare/arc_img4.svg'
        },
    ];

    const getShadowColor = (bg) => {
        const colorMap = {
            'from-purple-400 to-purple-600': '#9333ea',
            'from-orange-400 to-orange-600': '#f97316',
            'from-blue-400 to-blue-600': '#3b82f6',
            'from-green-400 to-green-600': '#10b981',
        };
        return colorMap[bg] || '#000000';
    };

    const handleMouseEnter = (i) => {
        if (!cardRefs.current[i]) return;
        setHoveredIndex(i);
        gsap.killTweensOf(cardRefs.current[i]);
        gsap.to(cardRefs.current[i], {
            y: -15,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
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
        <section className="bg-white py-20 px-4 md:px-20 text-black text-center flex flex-col items-center">
            <div className="container flex flex-col items-center">
                <div className="tex-center max-w-4xl">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Who We Are</h5>
                    <h2 className="text-[#000000] text-[36px] font-medium">
                        Your Data Enthusiasts For <span className="block text-[#00000080]">B2B Marketing</span>
                    </h2>
                    <p className="text-center text-[16px] text-[#54555F] pt-5 max-w-3xl">
                        Database Providers is a reputable data service company in the USA specializing in segmenting and optimizing key data information. We enhance your business outreach and ABM marketing goals through accurate and authentic data.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
                    {stats.map((item, i) => {
                        const isTop = i % 2 === 0;
                        return (
                            <div key={i} ref={(el) => (cardRefs.current[i] = el)} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={() => handleMouseLeave(i)} className="relative w-[250px] h-[180px] rounded-2xl bg-[#f9f9f9] shadow-md overflow-hidden flex flex-col items-center justify-between text-center" >
                                <div className={`absolute left-1/2 transform -translate-x-1/2 w-[180px] h-[100px] ${isTop ? 'top-0' : 'bottom-0'} z-0`} >
                                    <div className={`absolute transition-all duration-500 inset-0 rounded-full blur-2xl z-0 ${isTop ? '-top-[20px]' : '-bottom-[20px]'}`} style={{ background: getShadowColor(item.bg), opacity: hoveredIndex === i ? 0.6 : 0, pointerEvents: 'none', }} />
                                    <img src={item.arcImg} alt="arc" className={`w-full h-[50%] object-cover ${isTop ? 'rounded-b-full absolute top-0' : 'rounded-t-full absolute bottom-0'} z-10`} />
                                </div>
                                <div className={`absolute left-1/2 transform -translate-x-1/2 z-20 w-10 h-10 ${isTop ? 'top-[20px]' : 'bottom-[20px]'} flex items-center justify-center`}>
                                </div>
                                <div className={`flex flex-col items-center justify-center text-center ${isTop ? 'mt-16 mb-6' : 'mt-6 mb-16'}`}>
                                    <h3 className="text-[24px] sm:text-[32px] md:text-[42px] font-medium text-black">{item.value}</h3>
                                    <p className="text-sm text-gray-600">{item.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
