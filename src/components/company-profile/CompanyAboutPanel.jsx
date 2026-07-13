'use client';

import { useState } from 'react';

export default function CompanyAboutPanel({ companyName, previewText, fullText }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="px-5 py-5 md:px-8 md:py-7">
            <div className="rounded-[16px] bg-[#F9FAFB] px-5 py-6 md:px-7 md:py-7">
                <h2 className="text-[18px] font-regular text-[#111827] md:text-[28px]">
                    About {companyName}
                </h2>
                <p className="mt-4 text-[14px] leading-[1.85] text-[#4B5563] md:text-[15px]">
                    {expanded ? fullText : previewText}
                </p>
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="mt-5 inline-flex cursor-pointer rounded-lg bg-[#1798FF] px-10 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                    {expanded ? 'Show Less' : 'Show More'}
                </button>
            </div>
        </div>
    );
}
