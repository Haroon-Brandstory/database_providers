"use client";

import { useMemo, useState } from "react";
import CommunityHero from "./CommunityHero";
import FeaturedPosts from "./FeaturedPosts";
import CommunityGuides from "./CommunityGuides";
import CategoryGrid from "./CategoryGrid";
import PostList from "./PostList";
import { searchCommunity } from "@/lib/communityData";

export default function CommunityHub({
    categories,
    featuredPosts,
    guides,
    recentPosts,
}) {
    const [query, setQuery] = useState("");

    const results = useMemo(() => searchCommunity(query), [query]);
    const isSearching = query.trim().length > 0;

    return (
        <div className="bg-white min-h-screen pb-16">
            {/* Keeps site header (white text) readable on light community pages */}
            <div
                className="h-[72px] md:h-[97px] bg-[#9a9a9a]/80 backdrop-blur-md"
                aria-hidden
            />
            <CommunityHero categories={categories} onSearch={setQuery} />

            <section className="px-4 py-8 md:py-10">
                <div className="container mx-auto space-y-10 md:space-y-12">
                    {isSearching ? (
                        <>
                            <PostList
                                title={`Search results for “${query.trim()}”`}
                                posts={results.posts}
                                emptyMessage="No matching posts."
                            />
                            <CommunityGuides guides={results.guides} />
                            {!results.posts.length && !results.guides.length ? (
                                <p className="max-w-[900px] mx-auto text-[#5f6368] text-sm">
                                    Try different keywords, or browse categories below.
                                </p>
                            ) : null}
                            <CategoryGrid categories={categories} />
                        </>
                    ) : (
                        <>
                            <FeaturedPosts posts={featuredPosts} />
                            <CommunityGuides guides={guides} />
                            <CategoryGrid categories={categories} />
                            <PostList posts={recentPosts} title="Recent posts" />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
