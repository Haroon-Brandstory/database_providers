"use client";

import Image from "next/image";
import Link from "next/link";

const fields = [
    "Email", "Email Status", "First Name", "Last Name", "Title", "Company",
    "Head Count", "Industry", "Person LinkedIn URL", "Website", "Company LinkedIn URL",
    "Company City", "Company State", "Company Country", "City", "State", "Country"
];

export default function EmailFormatSection({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    const emailData = data.emailFormats

    return (
        <section className="relative bg-[url(/servicesection/emailFormatbg.png)] bg-white bg-center bg-cover bg-norepeat py-16 px-6 ">
            <div className="container max-w-7xl mx-auto flex justify-center flex-col items-center">
                <div className="flex flex-col justify-center max-w-4xl items-center">
                    <h2 className="text-black lg:text-[36px] text-center text-[26px] font-medium mb-6">
                        {(() => {
                            const heading = data.title;
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
                                        <span className="text-[#00000080]">{highlightPart}</span>
                                    </>
                                );
                            }
                        })()}
                    </h2>
                    <p className="mt-4 text-gray-500 text-center max-w-4xl ">
                        {data.sectionDescription}
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                            {emailData.map((field, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-1 px-4 py-1.5 bg-white text-gray-700 rounded-full shadow-sm text-sm"
                                >
                                    <Image src='/servicesection/emailFormatBefUrl.svg' width={14} height={14} alt="img" />
                                    {field.Format}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 text-[#51525C] text-center lg:text-left text-sm leading-relaxed max-w-xl">
                            {data.sectionPara}
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col items-center  sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href={data.button.buttonURL}>
                                <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                                    <span className="relative z-10">{data.button.buttonLabel}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                    </span>
                                </button>
                            </Link>
                            <Link href={data.linkButton.buttonURL}>
                                <button className="px-6 py-3 cursor-pointer rounded-lg text-blue-600 font-medium flex items-center gap-2 hover:underline">
                                    {data.linkButton.buttonLabel} →
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className=" p-6 flex justify-center">
                        {data.sectionimage?.url && (
                            <Image
                                src={STRAPI_URL + data.sectionimage.url}
                                // src="/servicesection/emailFormatServ.png"
                                alt="email format services"
                                width={800}   // set actual or max width
                                height={600}  // set aspect ratio
                                className="w-[85%] h-full"
                            />
                        )}
                    </div>
                </div>
            </div>

        </section>
    );
}
