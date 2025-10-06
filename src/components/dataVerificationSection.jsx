"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const steps = [
    { id: 1, title: "Syntax Check", icon: "/servicesection/steps/syntaxCheck.png" },
    { id: 2, title: "DNS Record Check", icon: "/servicesection/steps/dnsRecordsCheck.png" },
    { id: 3, title: "SMTP Check", icon: "/servicesection/steps/smtpCheck.png" },
    { id: 4, title: "Spam Trap Check", icon: "/servicesection/steps/spamTrackCheck.png" },
    { id: 5, title: "Validity Check", icon: "/servicesection/steps/validity-check.png" },
];

export default function VerificationProcess({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    const retData = data.dataVerificationItem;
    const [activeStep, setActiveStep] = useState(retData[0]?.id || 1);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 650);
        };

        handleResize(); // run on mount
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const middleIndex = Math.floor((retData.length - 1) / 2);

    return (
        <section className="bg-[url('/servicesection/dataVerification-backgroundImage.png')] bg-top bg-cover bg-norepeat pt-16 md:pb-28 pb-16 px-6 text-white">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-[36px] text-center font-medium mb-4">
                    Data Verification <span className="text-[#5673F6]">Process</span>
                </h2>
                <div className="mt-12 flex flex-col md:flex-row items-center gap-10 md:px-6 px-2">
                    <div className="flex relative md:w-2/3 w-full">
                        <div className="flex md:flex-col flex-row md:flex-wrap flex-nowrap overflow-x-auto md:overflow-visible whitespace-nowrap gap-9 w-full md:w-1/2 w-full">
                            {retData.map((step, index) => {
                                const offset = Math.abs(index - middleIndex) * 40;
                                return (
                                    <div
                                        key={index}
                                        style={!isSmallScreen ? { left: `${offset}px` } : {}}
                                        onMouseEnter={() => setActiveStep(step.id)}
                                        className={`flex items-center gap-3 relative px-4 py-3 rounded md:w-full w-fit cursor-pointer transition-all duration-200
                                        ${activeStep === step.id
                                                ? "bg-blue-600 shadow-lg scale-[1.02]"
                                                : "bg-[#0a1a3a]"
                                            }`}
                                    >
                                        <span
                                            className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold
                                            ${activeStep === step.id ? "bg-white text-blue-600" : "bg-blue-600 text-white"}
                                            `}
                                        >
                                            {index + 1}
                                        </span>
                                        <p className="text-base">{step.verificationTitle}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="md:flex items-center hidden justify-centers">
                            <Image src='/servicesection/emailVerificationBranch.png' width={370} height={400} alt="img" />
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full md:w-1/3 flex justify-center items-center">
                        <div className="relative w-[420px] h-[280px]">
                            <Image
                                key={activeStep} // ensures smooth fade on change
                                src={STRAPI_URL + (retData.find((s) => s.id === activeStep)?.verificationImage.url || "")}
                                alt="verification step"
                                fill
                                className="object-contain rounded-xl transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
