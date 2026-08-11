"use client";

import { useState } from "react";
import Link from "next/link";
import ResourcesCtaBand from "@/components/resources/ResourcesCtaBand";
import ResourcesPageHero from "@/components/resources/ResourcesPageHero";
import { getAllWhitePapers, getFeaturedWhitePaper } from "@/lib/whitePapersData";

export default function WhitePapersListingPage() {
    const featured = getFeaturedWhitePaper();
    const others = getAllWhitePapers().filter((item) => item.slug !== featured.slug);
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? others : others.slice(0, 4);

    return (
        <div className="bg-white">
            <ResourcesPageHero
                title="White Papers"
                description="In-depth research and actionable insights on B2B data, targeting, and marketing performance."
            />

            <section className="py-16 md:py-[80px] md:pb-[100px] bg-white">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                    {/* Featured: media + overlapping card — matches HTML */}
                    <div className="relative mb-16 md:mb-20">
                        <Link href={`/white-papers/${featured.slug}/`} className="block group">
                            <div
                                className="w-full h-[280px] md:h-[420px] lg:h-[520px] overflow-hidden bg-gradient-to-br from-[#0a1a4a] via-[#0133e9] to-[#2c6bff] bg-cover bg-center"
                                style={
                                    featured.coverImage
                                        ? {
                                              backgroundImage: `linear-gradient(120deg, rgba(1,51,233,0.35), rgba(0,0,0,0.25)), url(${featured.coverImage})`,
                                          }
                                        : undefined
                                }
                            />
                        </Link>
                        <div className="relative z-[2] w-[calc(100%-24px)] md:w-[calc(100%-40px)] max-w-[560px] ml-3 md:ml-10 -mt-16 md:-mt-[140px] bg-white p-7 md:p-12 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                            <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#9aa0a6] mb-4">
                                {featured.dateLabel}
                                <span className="mx-2.5 text-[#c5c9ce]">|</span>
                                {featured.readTime}
                            </p>
                            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1a1a1a] leading-snug mb-4">
                                <Link
                                    href={`/white-papers/${featured.slug}/`}
                                    className="hover:text-[#0133e9] transition no-underline text-inherit"
                                >
                                    {featured.title}
                                </Link>
                            </h2>
                            <p className="text-[#51525c] leading-relaxed mb-5 text-[15px] md:text-base">
                                {featured.excerpt}
                            </p>
                            <Link
                                href={`/white-papers/${featured.slug}/`}
                                className="text-sm font-medium text-[#0133e9] hover:underline"
                            >
                                Read Full Story →
                            </Link>
                        </div>
                    </div>

                    {/* 2-col grid with media */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-8 md:gap-y-12">
                        {visible.map((item) => (
                            <article key={item.slug} className="flex flex-col">
                                <Link
                                    href={`/white-papers/${item.slug}/`}
                                    className="block mb-7 overflow-hidden group"
                                >
                                    <div
                                        className="w-full h-[220px] md:h-[280px] bg-gradient-to-br from-[#0f2a6b] to-[#2c6bff] bg-cover bg-center transition group-hover:scale-[1.02]"
                                        style={
                                            item.coverImage
                                                ? {
                                                      backgroundImage: `linear-gradient(135deg, rgba(15,42,107,0.35), rgba(44,107,255,0.2)), url(${item.coverImage})`,
                                                  }
                                                : undefined
                                        }
                                    />
                                </Link>
                                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#9aa0a6] mb-3">
                                    {item.dateLabel}
                                    <span className="mx-2.5 text-[#c5c9ce]">|</span>
                                    {item.readTime}
                                </p>
                                <h3 className="text-xl md:text-[22px] font-semibold text-[#1a1a1a] leading-snug mb-3">
                                    <Link
                                        href={`/white-papers/${item.slug}/`}
                                        className="hover:text-[#0133e9] transition no-underline text-inherit"
                                    >
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-sm md:text-[15px] text-[#51525c] leading-relaxed mb-4 flex-1">
                                    {item.excerpt}
                                </p>
                                <Link
                                    href={`/white-papers/${item.slug}/`}
                                    className="text-sm font-medium text-[#0133e9] hover:underline"
                                >
                                    Read Full Story →
                                </Link>
                            </article>
                        ))}
                    </div>

                    {others.length > 4 ? (
                        <div className="flex justify-center mt-12">
                            <button
                                type="button"
                                onClick={() => setShowAll((v) => !v)}
                                className="rounded-full border border-[#D6E3FF] bg-white px-6 py-2.5 text-sm font-medium text-[#0133e9] hover:border-[#0133e9] transition"
                            >
                                {showAll ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>

            <ResourcesCtaBand />
        </div>
    );
}
