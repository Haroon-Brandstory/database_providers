import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function BlogKeyPoint({ points = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Default points for demonstration if none provided
    const displayPoints = points.length > 0 ? points : [
        "Email marketing enables direct communication with a permission-based audience, delivering one of the highest returns on investment among digital marketing channels.",
        "From lead nurturing and onboarding to retention and re-engagement, email marketing plays a critical role at every stage of the customer lifecycle.",
        "Personalization and automation allow for highly targeted messaging that resonates with individual recipient needs and behaviors.",
        "Advanced analytics provide deep insights into campaign performance, enabling continuous optimization and data-driven decision making."
    ];

    const visiblePoints = isExpanded ? displayPoints : displayPoints.slice(0, 2);
    const hasMore = displayPoints.length > 2;

    return (
        <div className="relative bg-[#F0F7FF] rounded-[24px] p-6 md:p-10 mb-8 overflow-hidden" style={{ border: "Mixed solid #007AFF" }}>
            {/* Blue indicator bar on the left */}
            <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-[#2C6BFF] rounded-r-full"></div>

            <div className="ml-4">
                <h3 className="text-[24px] font-semibold text-black mb-6">Key Points</h3>

                <ul className="space-y-5">
                    {visiblePoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00000033] mt-2.5 shrink-0"></span>
                            <p className="text-[#00000099] text-[16px] leading-[1.6]">
                                {point}
                            </p>
                        </li>
                    ))}
                </ul>

                {hasMore && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-[#2C6BFF] font-medium text-[16px] hover:underline transition-all"
                        >
                            {isExpanded ? "See Less" : "See More"}
                            {isExpanded ? <IoIosArrowUp className="text-[20px]" /> : <IoIosArrowDown className="text-[20px]" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}