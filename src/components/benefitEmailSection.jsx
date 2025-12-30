import { API_URL } from "@/utils/config";
import Image from "next/image";

export default function BenefitEmailCategory({ data }) {
    const STRAPI_URL = API_URL;
    const iconMap = data.iconBox
    return (
        <section className="bg-white py-16 px-6 justify-center flex">
            <div className="container max-w-7xl flex justify-center flex-col items-center">
                <div className="text-center max-w-4xl mx-auto">
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
                                        <span className="text-[#00000080] block">{highlightPart}</span>
                                    </>
                                );
                            }
                        })()}
                    </h2>
                    <p className="text-[#54555F] text-[16px] mb-6">{data.sectionDescription}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                    {iconMap.map((icon, index) =>
                        <div key={index} className="bg-[#F7F7F8] p-6 rounded-[20px]">
                            <div className="icon pb-5 border-b-1 mb-3 border-[#D0D0D099]">
                                <Image src={icon.icon.url} width={52} height={52} alt="benefit-icon" />
                                {/* <Image src={STRAPI_URL + icon.icon.url} width={52} height={52} alt="benefit-icon" /> */}
                            </div>
                            <div>
                                <h4 className="text-black text-[20px] font-medium mb-2">{icon.cardTitle}</h4>
                                <p className="text-[#51525C] text-[16px]">{icon.cardDescription}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}