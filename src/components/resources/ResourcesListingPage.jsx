"use client";

import { useState } from "react";
import ArticleCardGrid from "@/components/resources/ArticleCardGrid";
import FeaturedArticleCard from "@/components/resources/FeaturedArticleCard";
import ResourcesCtaBand from "@/components/resources/ResourcesCtaBand";
import ResourcesPageHero from "@/components/resources/ResourcesPageHero";

const INITIAL_VISIBLE = 6;

export default function ResourcesListingPage({
    heroTitle,
    heroDescription,
    sectionLabel,
    breadcrumbLabel,
    basePath,
    featured,
    items,
}) {
    const gridItems = items.filter((item) => item.slug !== featured?.slug);
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? gridItems : gridItems.slice(0, INITIAL_VISIBLE);
    const hasMore = gridItems.length > INITIAL_VISIBLE;

    return (
        <div className="bg-white">
            <ResourcesPageHero title={heroTitle} description={heroDescription} />

            <section className="py-16 md:py-[80px] md:pb-[100px] bg-[#f5f6fa]">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-7">
                        <h2 className="text-[24px] md:text-[28px] font-medium text-[#2a3547] m-0">
                            {sectionLabel}
                        </h2>
                        <p className="text-[13px] text-[#7c8fac] m-0">
                            Database Providers &gt; {breadcrumbLabel}
                        </p>
                    </div>

                    <FeaturedArticleCard item={featured} basePath={basePath} />
                    <ArticleCardGrid items={visible} basePath={basePath} />

                    {hasMore ? (
                        <div className="flex justify-center mt-10">
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
