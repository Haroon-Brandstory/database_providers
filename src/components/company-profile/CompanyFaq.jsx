'use client';

import { useState } from 'react';

function buildFaqs(company) {
    const name = company.companyName;
    const location = [company.city, company.country].filter(Boolean).join(', ');

    return [
        {
            question: `What does ${name} do?`,
            answer: `${name} operates in the ${company.industry || 'business'} sector${location ? ` and is based in ${location}` : ''}.`,
        },
        {
            question: `How many employees does ${name} have?`,
            answer: `${name} has approximately ${company.employees || 'undisclosed'} employees according to available company records.`,
        },
        {
            question: `When was ${name} founded?`,
            answer: `${name} was founded in ${company.foundedYear || 'an undisclosed year'}.`,
        },
        {
            question: `How can I access verified contacts at ${name}?`,
            answer: `Request full access through Database Providers to unlock decision-maker contacts, org chart visibility, and growth insights for ${name}.`,
        },
        {
            question: `What company data is available for ${name}?`,
            answer: `You can view company overview, employee growth trends, org structure, and verified business contact details for ${name} through Database Providers.`,
        },
    ];
}

function FaqCard({ faq, index, isOpen, onToggle }) {
    return (
        <div className="rounded-[12px] bg-white p-5 shadow-[0px_2px_6px_rgba(13,10,44,0.08)]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
            >
                <span
                    className={`text-[15px] font-medium leading-[1.5] md:text-[16px] ${
                        isOpen ? 'text-[#1798FF]' : 'text-[#6B7280]'
                    }`}
                >
                    {index + 1}. {faq.question}
                </span>
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[18px] font-medium ${
                        isOpen
                            ? 'bg-[#E8F4FF] text-[#1798FF]'
                            : 'bg-[#F3F4F6] text-[#9CA3AF]'
                    }`}
                >
                    {isOpen ? '−' : '+'}
                </span>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="text-[14px] leading-[1.7] text-[#6B7280] md:text-[15px]">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

function FaqColumn({ faqs, startIndex, openIndex, onToggle }) {
    return (
        <div className="flex flex-col gap-4">
            {faqs.map((faq, columnIndex) => {
                const index = startIndex + columnIndex;

                return (
                    <FaqCard
                        key={faq.question}
                        faq={faq}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() => onToggle(index)}
                    />
                );
            })}
        </div>
    );
}

export default function CompanyFaq({ company }) {
    const faqs = buildFaqs(company);
    const [openIndex, setOpenIndex] = useState(0);

    const leftFaqs = faqs.slice(0, 2);
    const rightFaqs = faqs.slice(2);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="rounded-[20px] bg-[#F4F7FA] p-6 md:p-8">
            <h2 className="text-[18px] font-regular text-[#111827] md:text-[28px]">FAQ&apos;s</h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FaqColumn
                    faqs={leftFaqs}
                    startIndex={0}
                    openIndex={openIndex}
                    onToggle={handleToggle}
                />
                <FaqColumn
                    faqs={rightFaqs}
                    startIndex={2}
                    openIndex={openIndex}
                    onToggle={handleToggle}
                />
            </div>
        </section>
    );
}
