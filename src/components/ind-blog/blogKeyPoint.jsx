import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function getPointText(point) {
    return typeof point === "string" ? point : point.point;
}

export default function BlogKeyPoint({ section }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const rawPoints = section.points;

    const displayPoints = rawPoints && rawPoints.length > 0 ? rawPoints : [
        "Email marketing enables direct communication with a permission-based audience, delivering one of the highest returns on investment among digital marketing channels.",
        "From lead nurturing and onboarding to retention and re-engagement, email marketing plays a critical role at every stage of the customer lifecycle.",
        "Personalization and automation allow for highly targeted messaging that resonates with individual recipient needs and behaviors.",
        "Advanced analytics provide deep insights into campaign performance, enabling continuous optimization and data-driven decision making."
    ];

    const primaryPoints = displayPoints.slice(0, 2);
    const extraPoints = displayPoints.slice(2);
    const hasMore = extraPoints.length > 0;

    return (
        <div style={{ borderLeft: "4px solid #007AFF" }} className="relative bg-[#F0F7FF] rounded-[24px] p-6 md:p-10 mb-8 overflow-hidden">
            <div className="ml-4">
                <h3 className="text-[24px] font-semibold text-black mb-6">Key Points</h3>

                <ul className="space-y-5">
                    {primaryPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00000033] mt-2.5 shrink-0"></span>
                            <p className="text-[#00000099] text-[16px] leading-[1.6]">
                                {getPointText(point)}
                            </p>
                        </li>
                    ))}
                </ul>

                {hasMore && (
                    <div
                        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
                    >
                        <div className="overflow-hidden min-h-0">
                            <ul
                                className={`space-y-5 pt-5 transition-opacity duration-500 ease-in-out ${
                                    isExpanded ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {extraPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00000033] mt-2.5 shrink-0"></span>
                                        <p className="text-[#00000099] text-[16px] leading-[1.6]">
                                            {getPointText(point)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {hasMore && (
                    <div
                        className={`flex justify-center transition-[margin,padding] duration-500 ease-in-out ${
                            isExpanded ? "mt-8" : "mt-6"
                        }`}
                    >
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                            className="flex cursor-pointer items-center gap-2 text-[#2C6BFF] font-medium text-[16px] hover:underline transition-colors"
                        >
                            {isExpanded ? "See Less" : "See More"}
                            <IoIosArrowDown
                                className={`text-[20px] transition-transform duration-500 ease-in-out ${
                                    isExpanded ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
