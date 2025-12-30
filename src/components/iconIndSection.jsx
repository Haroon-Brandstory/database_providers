"use client";

import Image from "next/image";

// const industries = [
//     { name: "Technology & IT", icon: "/servicesection/icon-sec-img1.svg", color: "from-blue-500 to-blue-400" },
//     { name: "Healthcare & Pharmaceuticals", icon: "/servicesection/icon-sec-img2.svg", color: "from-green-500 to-green-400" },
//     { name: "Finance & Insurance", icon: "/servicesection/icon-sec-img3.svg", color: "from-orange-500 to-orange-400" },
//     { name: "Manufacturing", icon: "/servicesection/icon-sec-img4.svg", color: "from-purple-500 to-purple-400" },
//     { name: "Education & Training", icon: "/servicesection/icon-sec-img5.svg", color: "from-emerald-500 to-emerald-400" },
//     { name: "Legal & Consulting", icon: "/servicesection/icon-sec-img6.svg", color: "from-red-500 to-red-400" },
//     { name: "Real Estate", icon: "/servicesection/icon-sec-img7.svg", color: "from-pink-500 to-pink-400" },
//     { name: "Logistics & Transportation", icon: "/servicesection/icon-sec-img8.svg", color: "from-blue-600 to-blue-400" },
//     { name: "Energy & Utilities", icon: "/servicesection/icon-sec-img9.svg", color: "from-green-600 to-green-400" },
//     { name: "Retail & Ecommerce", icon: "/servicesection/icon-sec-img10.svg", color: "from-indigo-500 to-indigo-400" },
// ];

export default function IconCategorySection({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    const newInd = data.industriesCovered;
    return (
        <section className="bg-white py-16 px-6 justify-center flex">
            <div className="container max-w-7xl">
                <h2 className="text-black lg:text-[36px] text-center text-[26px] font-medium mb-6">
                    {(() => {
                        const heading = data.sectionTitle;
                        const match = heading.match(/^(.*?)\((.*?)\)(.*)$/);

                        if (match) {
                            // Case 1: If brackets exist → highlight inside brackets
                            const [, before, inside, after] = match;
                            return (
                                <>
                                    {before.trim()}{" "}
                                    <span className="text-[#00000080] block text-center">({inside.trim()})</span>{" "}
                                    {after.trim()}
                                </>
                            );
                        } else {
                            // Case 2: No brackets → highlight last 2 words
                            const words = heading.trim().split(" ");
                            const normalPart = words.slice(0, -2).join(" "); // all except last 2
                            const highlightPart = words.slice(-2).join(" "); // last 2 words

                            return (
                                <>
                                    {normalPart}{" "}
                                    <span className="text-[#00000080] block">{highlightPart}</span>
                                </>
                            );
                        }
                    })()}
                </h2>
                <p className="mt-4 text-center text-[20px] text-gray-500 max-w-2xl mx-auto">
                    {data.sectionDescription}
                </p>
                <div className="mt-10 flex flex-wrap justify-center items-center gap-6 max-w-7xl mx-auto">
                    {newInd.map((industry, index) => (
                        <div key={index} className="flex items-center gap-3 md:p-3 p-2 rounded-xl transition-all duration-200 ease-in-out hover:scale-105 border shadow border-gray-200 bg-white hover:shadow-lg transition">
                            <div className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] flex items-center justify-center rounded-lg ">
                                <Image
                                    src={industry?.icon.url}
                                    alt="Finance & Insurance"
                                    width={50}
                                    height={50}
                                />
                                {/* <Image
                                    src={STRAPI_URL + industry?.icon.url}
                                    alt="Finance & Insurance"
                                    width={50}
                                    height={50}
                                /> */}
                            </div>
                            <p className="text-gray-700 font-medium text-[16px] md:text-base">
                                {industry?.industryName}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="mt-8 lg:mb-16 text-gray-400 text-center text-[16px] max-w-2xl mx-auto">
                    These industry-specific segments help USA businesses target by sector, job function, and region—
                    perfect for niche campaigns.
                </p>
            </div>
        </section>
    );
}
