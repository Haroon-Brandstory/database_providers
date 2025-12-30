"use client";

import { useMemo, useState } from "react";

export default function EmailSizeCalculator() {
    const [content, setContent] = useState("");

    const analysis = useMemo(() => {
        const text = content.trim();

        const characters = text.length;
        const words = text ? text.split(/\s+/).length : 0;
        const bytes = new Blob([text]).size;

        let score = "Excellent";
        let scoreClass = "text-green-600";
        let tip =
            "🎉 Your email is short, clear, and ideal for cold outreach.";

        if (words === 0 && characters === 0) {
            score = "NA";
            scoreClass = "text-gray-400";
            tip = "Please enter your email content to analyze its size and quality.";
        }
        else if (words <= 125 && characters <= 800) {
            score = "Excellent";
            scoreClass = "text-green-600";
            tip = "🎉 Your email is short, clear, and ideal for cold outreach.";
        }
        else if (words <= 200 && characters <= 1200) {
            score = "Good";
            scoreClass = "text-blue-200";
            tip = "👍 Your email is acceptable, but shorter emails usually perform better.";
        }
        else {
            score = "Risky";
            scoreClass = "text-red-600";
            tip = "⚠️ Your email is too long. High chance of lower replies or spam filtering.";
        }

        return {
            characters,
            words,
            bytes,
            score,
            scoreClass,
            tip,
        };
    }, [content]);

    return (
        <section className="bg-[url('/pricing-plan/bulkCta.png')] bg-center bg-norepeat bg-cover py-30">
            <div className="container max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <p className="text-center text-blue-600 font-semibold tracking-widest">
                    FREE TOOL
                </p>

                <h1 className="text-center text-3xl md:text-4xl font-semibold mt-2">
                    Email Size Calculator
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-12 max-w-2xl mx-auto">
                    Estimate the size of your cold email or drip campaign content and stay
                    within best-practice limits.
                </p>

                {/* TOOL BOX */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

                    {/* LEFT EDITOR */}
                    <div className="flex-1">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your email content here..."
                            className="
                w-full h-[320px] 
                p-4 text-sm md:text-base
                shadow-sm bg-[#F3F3F733] backdrop-blur-[20px]
                rounded-lg text-gray-50
                resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
                        />
                    </div>

                    {/* RIGHT STATS */}
                    <div className="w-full text-gray-50 bg-[#F3F3F733] backdrop-blur-[20px] h-[320px] rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between mb-4">
                            <span>Overall score:</span>
                            <span className={`font-semibold ${analysis.scoreClass}`}>
                                {analysis.score}
                            </span>
                        </div>

                        <div className="flex justify-between mb-3">
                            <span>Total size:</span>
                            <span>{analysis.bytes} Bytes</span>
                        </div>

                        <div className="flex justify-between mb-3">
                            <span>Total characters:</span>
                            <span>{analysis.characters}</span>
                        </div>

                        <div className="flex justify-between mb-3">
                            <span>Words:</span>
                            <span>{analysis.words}</span>
                        </div>

                        <div className="mt-6 bg-[#264BD133] backdrop-blur-[20px] p-4 rounded-lg text-sm leading-relaxed">
                            {analysis.tip}
                        </div>
                    </div>
                </div>

                {/* FOOTER NOTE */}
                <p className="text-center text-xs text-gray-500 mt-10">
                    Best for cold emails & drip campaigns. Text-only email size
                    recommendations are used for scoring.
                </p>
            </div>
        </section>
    );
}
