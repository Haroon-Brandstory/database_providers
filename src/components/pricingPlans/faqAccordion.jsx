"use client";
import { useState } from "react";

export default function FaqAccordion({ faqs }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-black py-10">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-center gradient-text text-4xl font-medium mb-12">
                    FAQ’s
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div key={index} className={`rounded-2xl transition-all cursor-pointer duration-300 transition-all duraion-200 ease-in-out ${isOpen ? "bg-[linear-gradient(277.61deg,#05092F_14.95%,#101D95_166.97%)] border border-[#264BD1] shadow-lg" : "bg-[#0A1E36] opacity-70"}`}>
                                <div className={` ${isOpen ? "" : ""}`}>
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex justify-between cursor-pointer items-center p-6 text-left"
                                    >
                                        <span className="text-white cursor-pointer text-sm md:text-base font-medium leading-snug">
                                            {index + 1}. {faq.question}
                                        </span>

                                        <span
                                            className={`flex items-center justify-center w-8 h-8 rounded-md transition-transform duration-300 ease-in-out bg-[#0F2A4A] text-blue-400 text-xl font-bold transition-transform  ${isOpen ? "rotate-180" : ""} `}
                                        >
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-sm text-blue-100 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </div>

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
