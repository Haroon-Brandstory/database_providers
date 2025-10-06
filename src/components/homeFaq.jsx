"use client";
import { useState } from "react";

const faqs = [
    {
        question: "What are the data attributes you provide us with?",
        answer: "As per your requirement, we provide the following data elements business mail-id, key executive's names and LinkedIn URLs, company name, industry name, employee size, company domain,  and job designation.",
    },
    {
        question: "What are the advantages of data-driven marketing?",
        answer: "With our data, you can gain insights about key personnel, company decision maker's email-id, and employer size. With the provided insights, you can,",
        liAnsers: ["Increase sales and marketing efficiency", "Gain higher lead generation", "Improve Customer Retention", "Enhance Targeting & Personalization"]
    },
    {
        question: "For what industries do you provide data?",
        answer: "At database providers, we work with all industries, from healthcare, manufacturing, technology, education, and many more. We will provide data as per your required industry verticals.",
    },
    {
        question: "In what format do you provide the data?",
        answer: "We provide the data in Excel format for easy access.",
    },
    {
        question: "Do you verify the data before outsourcing?",
        answer: "Yes. We provide only accurate and reliable information to help your business reach the right lead.",
    },
    {
        question: "Can you provide data from small businesses too?",
        answer: "Absolutely. We value our customers, and their requirement is what drives our business. So we provide data from companies that have employee sizes 1-50,51-100,101-250,251-500,501-1000,1001-2500,2501-5000,5000 & above."
    },
];

export default function HomeFaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleAccordion = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    return (
        <section className="pt-10 pb-24 bg-white flex flex-col items-center text-black">
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
                <div className="text-center max-w-4xl mb-12">
                    <h2 className="text-[#000000] text-[36px] font-medium">FAQ's</h2>
                </div>
                <div className="w-full flex flex-wrap gap-6 items-start ">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-200 min-h-[110px] border ${isOpen ? "border-blue-100" : "border-transparent"} w-full md:w-[calc(50%-12px)]`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <button
                                        className={`text-left cursor-pointer font-medium text-[16px] flex-1 ${isOpen ? "text-[#175CFF]" : "text-[#222]"}`}
                                        onClick={() => handleAccordion(i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-content-${i}`}
                                    >
                                        <span className="block mb-2">
                                            {i + 1}. {faq.question}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleAccordion(i)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F6F8FF] text-[#175CFF] text-xl focus:outline-none"
                                        aria-label={isOpen ? "Collapse" : "Expand"}
                                    >
                                        {isOpen ? (
                                            <span className="text-2xl">&minus;</span>
                                        ) : (
                                            <span className="text-2xl">+</span>
                                        )}
                                    </button>
                                </div>

                                {/* Animated content */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                                        }`}
                                    id={`faq-content-${i}`}
                                >
                                    <div className="text-[#444] text-[15px] leading-relaxed">
                                        {faq.answer}
                                        <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
                                            {faq.liAnsers?.length === 0 ? "" : faq.liAnsers?.map((li_answers, i) => (

                                                <li key={i}>{li_answers}</li>

                                            ))}
                                        </ul>
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
