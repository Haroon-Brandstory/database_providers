"use client";
import { useMemo, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BlogFaq({ section }) {
    const [openIndex, setOpenIndex] = useState(null);

    // Dynamic FAQs from Strapi
    const faqs = section?.faq || [];

    const handleAccordion = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    return (
        <section className="mb-4 bg-white flex flex-col items-center text-black">
            <div className="max-w-5xl container lg:px-0 px-1 w-full mx-auto flex flex-col items-start">
                <div className="text-start max-w-4xl mb-4">
                    <h2 className="text-[#000000] text-start lg:text-[36px] text-[28px] font-medium">FAQ's</h2>
                </div>
                <div className="w-full flex flex-wrap gap-6 items-start ">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-200 border ${isOpen ? "border-blue-100" : "border-transparent"} w-full `}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <button
                                        className={`text-left cursor-pointer font-medium text-[16px] flex-1 ${isOpen ? "text-[#175CFF]" : "text-[#222]"}`}
                                        onClick={() => handleAccordion(i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-content-${i}`}
                                    >
                                        <span className="block mb-2">
                                            <h3 className={`${isOpen ? "text-[#175CFF]" : "text-[#757575]"}`}>{i + 1}. {faq.question}</h3>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleAccordion(i)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F6F8FF] text-[#175CFF] text-xl focus:outline-none"
                                        aria-label={isOpen ? "Collapse" : "Expand"}
                                    >
                                        {isOpen ? (
                                            <span className="text-2xl font-bold">&minus;</span>
                                        ) : (
                                            <span className="text-2xl font-bold">+</span>
                                        )}
                                    </button>
                                </div>

                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
                                    id={`faq-content-${i}`}
                                >
                                    <div className="text-[#444] text-[15px] leading-relaxed font-normal">
                                        <BlocksRenderer content={faq.answer} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
