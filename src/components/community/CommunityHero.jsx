"use client";

import { useState } from "react";
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
            <section className="bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-no-repeat px-4 md:px-20 pt-30 pb-14 overflow-hidden">
                <div className="container mx-auto w-full">
                    <div className="min-h-[240px] md:min-h-[300px] flex flex-col justify-center max-w-3xl">
                        <p className="text-blue-300 text-sm uppercase tracking-wide mb-3">
                            Database Providers
                        </p>
                        <h1 className="text-white text-[34px] md:text-[48px] font-medium leading-tight">
                            Welcome to the Community
                        </h1>
                        <p className="text-[#D0D0D0] text-base md:text-lg mt-4 max-w-2xl">
                            Ask questions, share tips, and find guides about B2B lists, data quality,
                            outreach, and account support.
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl"
                            role="search"
                        >
                            <label htmlFor="community-search" className="sr-only">
                                Search community
                            </label>
                            <input
                                id="community-search"
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    onSearch?.(e.target.value);
                                }}
                                placeholder="Describe your issue to find related posts"
                                className="flex-1 rounded-lg border border-white/20 bg-white px-4 py-3 text-[#1a1a1a] text-sm placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#2C6BFF]/40"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-[#2C6BFF] px-5 py-3 text-sm font-medium text-white hover:bg-[#2558d6] transition whitespace-nowrap"
                            >
                                Search
                            </button>
                        </form>

                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={() => setComposerOpen(true)}
                                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition"
                            >
                                Post a question
                            </button>
                        </div>
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
