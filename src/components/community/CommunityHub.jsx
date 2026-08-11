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
        <div className="bg-[#0B1020]">
            <CommunityHero categories={categories} onSearch={setQuery} />

            <section className="px-4 md:px-20 py-14 md:py-20 bg-[#F5F8FF]">
                <div className="container mx-auto space-y-14 md:space-y-16">
                    {isSearching ? (
                        <>
                            <PostList
                                title={`Search results for “${query.trim()}”`}
                                posts={results.posts}
                                emptyMessage="No matching posts."
                                headingClassName="text-[#111827]"
                            />
                            <CommunityGuides guides={results.guides} />
                            {!results.posts.length && !results.guides.length ? (
                                <p className="text-[#6b7280] text-sm">
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
                            <PostList
                                posts={recentPosts}
                                title="Recent posts"
                                headingClassName="text-[#111827]"
                            />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
