"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PostComposerModal from "./PostComposerModal";

export default function CommunityHero({ categories = [], onSearch }) {
    const [query, setQuery] = useState("");
    const [composerOpen, setComposerOpen] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        onSearch?.(query);
    }

    return (
        <>
            <section className="bg-white pt-8 md:pt-10 pb-8 md:pb-10">
                <div className="container mx-auto max-w-[900px] px-4 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden>
                            <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            <circle cx="12" cy="10" r="2.2" fill="#fff" />
                        </svg>
                    </div>

                    <h1 className="text-[28px] md:text-[36px] font-medium text-[#1a73e8] leading-tight mb-6">
                        Welcome to the Database Providers Community
                    </h1>

                    <form
                        onSubmit={handleSearch}
                        role="search"
                        className="mx-auto max-w-[720px] relative"
                    >
                        <label htmlFor="community-search" className="sr-only">
                            Search community
                        </label>
                        <FiSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6368] text-xl"
                            aria-hidden
                        />
                        <input
                            id="community-search"
                            type="search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                onSearch?.(e.target.value);
                            }}
                            placeholder="Describe your issue"
                            className="w-full rounded-full border border-[#dadce0] bg-white py-3.5 pl-12 pr-4 text-[#202124] text-base shadow-[0_1px_6px_rgba(32,33,36,0.12)] placeholder:text-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:shadow-[0_1px_6px_rgba(26,115,232,0.28)]"
                        />
                    </form>

                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={() => setComposerOpen(true)}
                            className="inline-flex items-center justify-center rounded-full border border-[#dadce0] bg-white px-5 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f8f9fa] transition"
                        >
                            Post a question
                        </button>
                    </div>

                    {/* Soft community illustration strip */}
                    <div className="mt-8 md:mt-10 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f8f9fa] to-white border border-[#f1f3f4]">
                        <svg
                            viewBox="0 0 800 140"
                            className="w-full h-auto opacity-90"
                            aria-hidden
                        >
                            <circle cx="120" cy="90" r="28" fill="#e8f0fe" />
                            <circle cx="120" cy="62" r="16" fill="#1a73e8" opacity="0.35" />
                            <rect x="250" y="70" width="90" height="12" rx="6" fill="#e6f4ea" />
                            <circle cx="295" cy="50" r="18" fill="#34a853" opacity="0.35" />
                            <rect x="420" y="55" width="70" height="55" rx="12" fill="#fce8e6" />
                            <circle cx="455" cy="45" r="14" fill="#ea4335" opacity="0.35" />
                            <rect x="560" y="75" width="110" height="14" rx="7" fill="#fef7e0" />
                            <circle cx="615" cy="55" r="16" fill="#fbbc04" opacity="0.4" />
                            <path
                                d="M160 95c40-30 80-10 120 0M360 100c50-25 90-5 130 8M500 100c40-20 80-15 120 5"
                                stroke="#dadce0"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </section>

            <PostComposerModal
                open={composerOpen}
                onClose={() => setComposerOpen(false)}
                categories={categories}
            />
        </>
    );
}
