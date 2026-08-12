"use client";

import Link from "next/link";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import LikeButton from "./LikeButton";

function renderGuideBody(body) {
    const blocks = body.trim().split(/\n\n+/);
    return blocks.map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
            return (
                <h2
                    key={index}
                    className="text-xl font-medium text-[#202124] mt-8 mb-3"
                >
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
                    className={`text-[#3c4043] text-base leading-relaxed mb-4 space-y-2 pl-5 ${
                        isOrdered ? "list-decimal" : "list-disc"
                    }`}
                >
                    {lines.map((line, lineIndex) => (
                        <li key={lineIndex}>
                            {line
                                .replace(/^\d+\.\s+/, "")
                                .replace(/^-\s+/, "")
                                .replace(/\*\*(.*?)\*\*/g, "$1")}
                        </li>
                    ))}
                </ListTag>
            );
        }
        return (
            <p
                key={index}
                className="text-[#3c4043] text-base leading-relaxed mb-4 whitespace-pre-wrap"
            >
                {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
            </p>
        );
    });
}

export default function GuideDetail({
    guide,
    relatedGuides = [],
    relatedPosts = [],
}) {
    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-16">
            <div
                className="h-[72px] md:h-[97px] bg-[#9a9a9a]/80 backdrop-blur-md"
                aria-hidden
            />
            <div className="container mx-auto max-w-[1100px] px-4 pt-6 md:pt-8">
                <Link
                    href="/community/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline mb-5"
                >
                    <FiArrowLeft aria-hidden />
                    Back
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
                    <div className="min-w-0 space-y-4">
                        <article className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-3 mb-5">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="shrink-0 h-10 w-10 rounded-full bg-[#1a73e8] text-white text-sm font-medium flex items-center justify-center">
                                        CG
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-medium text-[#1a73e8]">
                                                Community Guide
                                            </span>
                                            <span className="rounded bg-[#e6f4ea] px-1.5 py-0.5 text-[11px] font-medium text-[#137333]">
                                                Recommended
                                            </span>
                                            <span className="rounded bg-[#e8f0fe] px-1.5 py-0.5 text-[11px] font-medium text-[#1967d2]">
                                                Official Guide
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#80868b] mt-1">
                                            Database Providers Help Community
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 text-[#5f6368]">
                                    <span className="text-xs md:text-sm whitespace-nowrap">
                                        Guide
                                    </span>
                                    <button
                                        type="button"
                                        className="p-1 rounded-full hover:bg-[#f1f3f4]"
                                        aria-label="More options"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-[22px] md:text-[28px] font-medium text-[#202124] leading-snug mb-3">
                                {guide.title}
                            </h1>
                            <p className="text-[#5f6368] text-[15px] md:text-base leading-relaxed mb-5">
                                {guide.summary}
                            </p>

                            <div className="border-t border-[#e8eaed] pt-5">
                                {renderGuideBody(guide.body)}
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#e8eaed] flex flex-wrap items-center gap-3">
                                <LikeButton
                                    count={guide.upvotes}
                                    storageKey={`guide:${guide.slug}`}
                                    label="Like this guide"
                                />
                            </div>
                        </article>
                    </div>

                    <aside className="lg:sticky lg:top-28">
                        <div className="rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-4">
                                Related content
                            </h2>
                            <ul className="space-y-3">
                                {relatedGuides.map((item) => (
                                    <li key={`guide-${item.slug}`}>
                                        <Link
                                            href={`/community/guides/${item.slug}/`}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                {relatedPosts.map((item) => (
                                    <li key={`post-${item.slug}`}>
                                        <Link
                                            href={`/community/post/${item.slug}/`}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/community/"
                                        className="flex items-start gap-2.5 group"
                                    >
                                        <HiOutlineDocumentText
                                            className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                            aria-hidden
                                        />
                                        <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                            Browse all community topics
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
