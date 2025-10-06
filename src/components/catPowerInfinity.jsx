"use client";
import { useState } from "react";


export default function PowerPackInfinitySection({ data }) {
    // console.log("data in power pack infinity section",data)
    const dummyContent = data.infSecContent

    const [visibleCount, setVisibleCount] = useState(20);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 20);
    };

    const handleShowLess = () => {
        setVisibleCount(20); // reset to first 20
    };

    return (
        <>
            <section className="bg-[#F7F7F8] py-16 px-6 justify-center flex">
                <div className="container max-w-7xl flex justify-center flex-col items-center">
                    <h2 className="text-black lg:text-[36px] text-[26px] font-medium mb-6">
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
                                        <span className="text-[#00000080]">{highlightPart}</span>
                                    </>
                                );
                            }
                        })()}
                    </h2>

                    <div className="dum_wrapper w-[100%]">
                        {/* Items grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                            {dummyContent.slice(0, visibleCount).map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-[20px] shadow pe-3 pt-4 pb-4 overflow-hidden text-sm text-gray-700 text-left flex items-center"
                                >
                                    <span className="w-[3px] h-5 bg-[#5673F699] rounded mr-2"></span>
                                    {item?.fieldUrl ? (
                                        <a href={item.fieldUrl}>{item.fieldName}</a>
                                    ) : (
                                        <span>{item.fieldName}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="mt-6">
                            {dummyContent.length > 20 && (
                                <>
                                    {visibleCount < dummyContent.length ? (
                                        <button
                                            onClick={handleShowMore}
                                            className="text-blue-500 cursor-pointer flex items-center justify-center mx-auto"
                                        >
                                            Show More ↓
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleShowLess}
                                            className="text-blue-500 cursor-pointer flex items-center justify-center mx-auto"
                                        >
                                            Hide ↑
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}