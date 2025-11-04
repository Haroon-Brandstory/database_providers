"use client";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { useMemo, useState } from "react";



export default function HomeFaqSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const t = useTranslations();

    const faqs = [
        {
            question: t('home.faqSection.question1.q'),
            answer: t('home.faqSection.question1.ans'),
        },
        {
            question: t('home.faqSection.question2.q'),
            answer: t('home.faqSection.question2.ans'),
        },
        {
            question: t('home.faqSection.question3.q'),
            answer: t('home.faqSection.question3.ans'),
        },
        {
            question: t('home.faqSection.question4.q'),
            answer: t('home.faqSection.question4.ans'),
        },
        {
            question: t('home.faqSection.question5.q'),
            answer: t('home.faqSection.question5.ans'),
        }
    ];

    const faqSchema = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }, [faqs]);

    const handleAccordion = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    return (
        <section className="pt-10 pb-24 bg-white flex flex-col items-center text-black">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-5xl container lg:px-0 px-1 w-full mx-auto flex flex-col items-center">
                <div className="text-center max-w-4xl mb-12">
                    <h2 className="text-[#000000] lg:text-[36px] text-[28px] font-medium">FAQ's</h2>
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
                                            <h3>{i + 1}. {faq.question}</h3>
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
