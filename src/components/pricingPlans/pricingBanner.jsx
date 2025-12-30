"use client";

import { useState } from "react";

export default function PricingBanner({ onChange, defaultPlan }) {
    const [active, setActive] = useState(defaultPlan);

    const handleClick = (value) => {
        setActive(value);
        onChange(value);
    };

    return (
        <div className="banner bg-[url('/pricing-plan/pricing-plan-banner.png')] bg-no-repeat bg-cover bg-center py-20 lg:min-h-[90vh] flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-whiteo flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="backdrop-blur-[24px] border-blue-900 border w-fit rounded-full px-4 py-1 mt-8 inset-shadow-gray-300">
                        <p className="text-center gradient-text text-[12px] font-normal">Bring your business to the best scale</p>
                    </div>
                    <h1 className="lg:text-[64px] md:text-[50px] text-[38px] text-center text-white font-medium">The best work solution,<span className="block gradient-text">for the best price.</span></h1>
                    <p className="text-center text-white font-normal mt-4">Choose the best plan for your business. Change plans as you grow.</p>
                    <div className="mt-8">
                        <div className="relative flex items-center bg-[#F3F3F733] backdrop-blur-[24px] border border-gray-500 rounded-full p-1 w-[280px]">
                            <div
                                className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-white transition-all duration-300 ease-in-out ${active === "bulk" ? "left-1" : "left-[50%]"
                                    }`}
                            ></div>
                            <button
                                onClick={() => handleClick("bulk")}
                                className={`flex-1 text-center py-3 cursor-pointer rounded-full text-sm transition-all duration-300 relative z-10 ${active === "bulk" ? "text-[#14204b] " : "text-white"}`}
                            >
                                Bulk Email Data
                            </button>
                            <button
                                onClick={() => handleClick("abm")}
                                className={`flex-1 text-center py-3 cursor-pointer rounded-full text-sm transition-all duration-300 relative z-10 ${active === "abm" ? "text-[#14204b] " : "text-white"}`}
                            >
                                ABM
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}