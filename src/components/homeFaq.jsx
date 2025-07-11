"use client";
import { useState, useRef } from "react";

const faqs = [
    {
        question: "What is a C-level executive's email list?",
        answer: "It is your direct line to the boardroom. A list of C-level executives' email addresses provides verified email contact details of top decision makers like CEOs, CFOs, CTOs, CMOs, etc., across industries. So, you can pitch directly to the people with buying power.",
    },
    {
        question: "How can a C-level mailing list help in B2B marketing campaigns?",
        answer: "A C-level mailing list helps you target high-level decision makers, increasing your chances of closing deals and building valuable business relationships in B2B marketing.",
    },
    {
        question: "Are your C-level email contacts GDPR and CAN-SPAM compliant?",
        answer: "Yes, all our C-level email contacts are GDPR and CAN-SPAM compliant, ensuring your campaigns are both effective and legally sound.",
    },
    {
        question: "Can I get a custom C-level email database based on my requirements?",
        answer: "Absolutely! We offer custom C-level email databases tailored to your specific industry, location, and other requirements.",
    },
    {
        question: "Do you offer samples of your C-level executive's email list?",
        answer: "Yes, we provide free samples so you can evaluate the quality and accuracy of our C-level executive email lists before making a purchase.",
    },
];

export default function HomeFaqSection() {
    const [openIndex, setOpenIndex] = useState(0);
    const contentRefs = useRef([]);

    const handleAccordion = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="py-24 bg-white flex flex-col items-center text-black">
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
                <div className="text-center max-w-4xl mb-12">
                    <h2 className="text-[#000000] text-[36px] font-medium">FAQ's</h2>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-200 border  border-transparent ${isOpen ? "border-blue-100" : ""}`}
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
                                        className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-[#F6F8FF] text-[#175CFF] text-xl focus:outline-none"
                                        aria-label={isOpen ? "Collapse" : "Expand"}
                                    >
                                        {isOpen ? (
                                            <span className="text-2xl">&minus;</span>
                                        ) : (
                                            <span className="text-2xl">+</span>
                                        )}
                                    </button>
                                </div>
                                <div
                                    id={`faq-content-${i}`}
                                    ref={el => (contentRefs.current[i] = el)}
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={
                                        isOpen && contentRefs.current[i]
                                            ? { maxHeight: contentRefs.current[i].scrollHeight }
                                            : { maxHeight: 0 }
                                    }
                                >
                                    <div className={`text-[#444] text-[15px] leading-relaxed ${isOpen ? 'opacity-100 mt-2' : 'opacity-0 mt-0'}`}>
                                        {faq.answer}
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

    