"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ================== DATA ================== */

const includedFeatures = [
    "ICP-based segmentation (Industry, Job Title, Region, Company Type)",
    "Multi-layer verification (AI + SMTP + Human QC)",
    "Waterfall Data Enrichment",
    "95% accuracy guaranteed",
    "GDPR & CAN-SPAM compliant dataset",
    "Essential fields included (Name, Business email, Job Title, Company, Location)",
    "Duplicate-free records",
    "CRM-ready format (Zoho, HubSpot, Salesforce, Pipedrive)",
    "CSV / Excel Delivery (CRM-Ready)",
];

const pricingSlabs = [
    { contacts: 2000, usd: 149, inr: 12500, costPerContact: 6.25 },
    { contacts: 4000, usd: 229, inr: 19250, costPerContact: 4.81 },
    { contacts: 6000, usd: 299, inr: 25200, costPerContact: 4.2 },
    { contacts: 8000, usd: 369, inr: 31000, costPerContact: 3.88 },
    { contacts: 10000, usd: 449, inr: 37750, costPerContact: 3.77 },
];


export default function CustomPricingPlan() {
    const [activeIndex, setActiveIndex] = useState(1);

    const isCustom = activeIndex === pricingSlabs.length;
    const activePlan = !isCustom ? pricingSlabs[activeIndex] : null;
    const percentage = (activeIndex / pricingSlabs.length) * 100;

    return (
        <section className="bg-black text-white pb-14">
            <div className="container mx-auto px-6">
                <div className="rounded-[20px] overflow-hidden">

                    <div className="bg-gradient-to-b from-blue-500/80 to-blue-700/80 py-6 flex justify-center">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/pricing-plan/custom-db-logo.svg"
                                width={42}
                                height={42}
                                alt="db-logo"
                            />
                            <h2 className="text-lg md:text-xl font-medium">
                                Build Your Custom Data Plan
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-10 bg-[url('/pricing-plan/custom-price-meter-bg.png')] bg-cover bg-center border border-blue-900/30 p-6 md:p-8">

                        <div className="border border-blue-900/40 rounded-xl bg-[#565AD026] backdrop-blur-[40px]">

                            <div className="p-6 backdrop-blur-[20px]">
                                <h3 className="text-sm md:text-base font-medium mb-6">
                                    On-Demand Data Credit Packs
                                </h3>

                                <div className="relative mt-10">
                                    <div
                                        className="absolute -top-8 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow"
                                        style={{ left: `${percentage}%` }}
                                    >
                                        {isCustom ? "More" : `${activePlan.contacts.toLocaleString()} Contacts`}
                                    </div>

                                    <input
                                        type="range"
                                        min={0}
                                        max={pricingSlabs.length}
                                        step={1}
                                        value={activeIndex}
                                        onChange={(e) => setActiveIndex(Number(e.target.value))}
                                        className="w-full"
                                        style={{
                                            "--range-progress": `${percentage}%`,
                                        }} />
                                </div>

                                <div className="relative mt-8 ">
                                    <div className="relative  h-[56px]">
                                        {pricingSlabs.map((slab, index) => {
                                            const left = (index / pricingSlabs.length) * 100;
                                            const isActive = index === activeIndex;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveIndex(index)}
                                                    className="absolute -translate-x-1/3 flex flex-col items-center"
                                                    style={{ left: `${left}%` }}
                                                >
                                                    <span
                                                        className={`w-3 h-3 rounded-full transition-all ${isActive ? "bg-blue-500 scale-125" : "bg-gray-500/50"}`}
                                                    />
                                                    <div
                                                        className={`mt-2 text-xs text-center whitespace-nowrap ${isActive ? "text-white" : "text-gray-400"}`}
                                                    >
                                                        <div className="font-medium">
                                                            {slab.contacts.toLocaleString()}
                                                        </div>
                                                        <div className="text-[10px] opacity-70">
                                                            ${slab.usd}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setActiveIndex(pricingSlabs.length)}
                                            className="absolute -translate-x-1/2 flex flex-col items-center"
                                            style={{ left: "100%" }}
                                        >
                                            <span
                                                className={`w-3 h-3 rounded-full transition-all ${isCustom ? "bg-blue-500 scale-125" : "bg-gray-500/50"}`}
                                            />
                                            <div
                                                className={`mt-2 text-xs text-center ${isCustom ? "text-white" : "text-gray-400"}`}
                                            >
                                                <div className="font-medium">More</div>
                                                <div className="text-[10px] opacity-70">Custom</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="backdrop-blur-[24px] border-gray-700 bg-[#15151766] border w-fit rounded-full lg:px-5 px-3 py-1 mt-8 shadow-[0_4px_16px_0_rgba(0,0,0,0.4)]">
                                    <p className="bg-[linear-gradient(19.53deg,#FFB045_-18.18%,#EE9432_-12.72%,#E07D21_-6.7%,#D76F17_-1.06%,#D46A14_3.79%,#D7731C_9.28%,#E08C32_18.34%,#EEB556_29.81%,#FFE581_41.49%,#FFE37B_71.33%,#FFB045_101.17%,#AF4800_131.01%)] bg-clip-text text-transparent md:text-[15px] text-[8px]">1 Credit = 1 Verified Contact | Transparent & Flexible Pricing</p>
                                </div>
                            </div>

                            <div className="mt-6 text-sm">
                                {!isCustom ? (
                                    <>
                                        <div>
                                            <div className="px-5 py-3">
                                                <h4 className="md:text-[18px] text-[15px] font-semibold ">Your Plan</h4>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-800 text-[#FFFFFFB2] md:p-5 p-3 md:text-[15px] text-[12px]">
                                                <span>Standard Inclusions</span>
                                                <span>${activePlan.usd}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-800 text-[#FFFFFFB2] md:p-5 p-3 md:text-[15px] text-[12px]">
                                                <span>Cost per Contact</span>
                                                <span>₹{activePlan.costPerContact}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-800 text-[#FFFFFFB2] md:p-5 p-3 md:text-[15px] text-[12px]">
                                                <span>20,000 Verified Database</span>
                                                <span>Included</span>
                                            </div>

                                            <div className="flex justify-between border-b border-gray-800 text-[#FFFFFFB2] md:p-5 p-3 md:text-[15px] text-[12px]">
                                                <span>GDPR-Compliant Data Sources</span>
                                                <span>Included</span>
                                            </div>

                                            <div className="flex justify-between border-b border-gray-800 text-[#FFFFFFB2] md:p-5 p-3 md:text-[15px] text-[12px]">
                                                <span>24-Hour Data Delivery</span>
                                                <span>Included</span>
                                            </div>
                                        </div>
                                        <div className="md:p-8 p-6 backdrop-blur-[40px] overflow-hidden bg-[#565AD026] rounded-b-[10px]">
                                            <div className="flex justify-between md:text-lg text-[15px] font-medium">
                                                <span>Total Price</span>
                                                <span>${activePlan.usd}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center my-6">
                                        <p className="text-gray-400 mb-4">
                                            Need more than 10,000 contacts?
                                        </p>
                                        <a
                                            href="/contact-us"
                                            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-b from-blue-500/80 to-blue-700/80 font-medium shadow hover:scale-[1.02] transition"
                                        >
                                            Contact Us for Custom Pricing
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-6 gradient-text">
                                    Included Features
                                </h3>
                                <ul className="space-y-4">
                                    {includedFeatures.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="grid grid-cols-[24px_1fr] gap-3 text-sm text-white/70"
                                        >
                                            <Image
                                                src="/pricing-plan/green-tick.svg"
                                                width={24}
                                                height={24}
                                                alt="Included"
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href={"/contact-us"}>
                                <button className="mt-8 w-full py-3 cursor-pointer bg-gradient-to-b from-blue-500/80 to-blue-700/80 rounded-lg font-medium shadow hover:scale-[1.01] transition">
                                    Book Your Data Plan
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}


