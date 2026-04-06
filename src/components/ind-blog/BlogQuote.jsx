"use client";
import React from 'react';

export default function BlogQuote({ section }) {
    // Default values for demonstration if none provided
    const displayQuote = section?.quote || "No Quote to show";
    const displayAuthor = section?.blogAuthor || "No Author to show";

    return (
        <div className="relative bg-[#F0F7FF] rounded-[24px] p-8 md:p-12 mb-8 overflow-hidden" style={{ borderLeft: "4px solid #007AFF" }}>
            <div className="ml-4">
                <blockquote className="space-y-4">
                    <p className="text-[#00000099] text-[20px] md:text-[24px] italic leading-[1.6]">
                        "{displayQuote}"
                    </p>
                    <footer className="text-black font-semibold text-[18px]">
                        - {displayAuthor}
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}