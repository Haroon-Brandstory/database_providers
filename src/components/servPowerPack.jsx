import { API_URL } from "@/utils/config";
import Image from "next/image";
import Link from "next/link";

export default function PowerPackSection({ data }) {
    const STRAPI_URL = API_URL
    return (
        <>
            <section className="bg-white py-16 px-6 justify-center flex">
                <div className="container max-w-7xl flex justify-center flex-col items-center">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* <h5 className="text-[#2C6BFF] text-[16px] font-medium">
                            { }
                        </h5> */}
                        {/* doing this to change the color of the text coming inside the brackets */}
                        <h2 className="text-black lg:text-[36px] text-[26px] font-medium mb-6">
                            {(() => {
                                const heading = data.heading;
                                const match = heading.match(/^(.*?)\((.*?)\)(.*)$/);
                                if (match) {
                                    // Case 1: If brackets exist → highlight inside brackets
                                    const [, before, inside, after] = match;
                                    return (
                                        <>
                                            {before.trim()}{" "}
                                            <span className="text-[#00000080]">({inside.trim()})</span>{" "}
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

                        {data.powerButton && (
                            <Link href={data.powerButton.buttonURL}>
                                <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                                    <span className="relative z-10">{data.powerButton.buttonLabel ||
                                        "Request a Free Sample"}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="bg-[url(/service-category/power-pack-sec-bg.png)] mt-12 bg-cover bg-center bg-no-repeat  rounded-[20px]">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-8">
                                {data.descriptionParaText.map((para, index) => (
                                    <p key={index} className="text-[#54555F] text-[16px] mb-6">
                                        {para.children.map((child, idx) => child.text)}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Image src={STRAPI_URL + data.VideoAKALottie.url} width={650} height={540} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}