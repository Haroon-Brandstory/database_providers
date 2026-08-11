"use client";

import LikeButton from "./LikeButton";

function renderGuideBody(body) {
    const blocks = body.trim().split(/\n\n+/);
    return blocks.map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
            return (
                <h2 key={index} className="text-xl font-medium text-[#111827] mt-8 mb-3">
                    {trimmed.replace(/^##\s+/, "")}
                </h2>
            );
        }
        if (/^\d+\.\s/m.test(trimmed) || trimmed.startsWith("- ")) {
            const lines = trimmed.split("\n").filter(Boolean);
            const isOrdered = /^\d+\.\s/.test(lines[0]);
            const ListTag = isOrdered ? "ol" : "ul";
            return (
                <ListTag
                    key={index}
                    className={`text-[#374151] text-base leading-relaxed mb-4 space-y-2 pl-5 ${
                        isOrdered ? "list-decimal" : "list-disc"
                    }`}
                >
                    {lines.map((line, lineIndex) => (
                        <li key={lineIndex}>
                            {line.replace(/^\d+\.\s+/, "").replace(/^-\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                        </li>
                    ))}
                </ListTag>
            );
        }
        return (
            <p key={index} className="text-[#374151] text-base leading-relaxed mb-4 whitespace-pre-wrap">
                {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
            </p>
        );
    });
}

export default function GuideDetail({ guide }) {
    return (
        <div className="rounded-xl border border-[#D6E3FF] bg-white p-5 md:p-8 shadow-sm">
            {renderGuideBody(guide.body)}
            <div className="mt-6 pt-4 border-t border-[#E8EEF9]">
                <LikeButton count={guide.upvotes} label="Like this guide" />
            </div>
        </div>
    );
}
