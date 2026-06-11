"use client";

import ListPagination from "@/components/ui/ListPagination";
import ListSearchBar from "@/components/ui/ListSearchBar";
import { useNavHref } from "@/hooks/useNavHref";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { getAllBlogs } from "@/lib/services";
import { API_URL } from "@/utils/config";
import Image from "next/image";
import { useEffect, useState } from "react";

function getBlogSearchText(blog) {
    const authorName = blog.author?.AuthorName || "";
    return [blog.BlogName, blog.BlogSlug, authorName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

export default function BlogList() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const STRAPI_URL = API_URL;
    const { navHref } = useNavHref();

    const {
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        isSearching,
        itemsPerPage,
        setItemsPerPage,
        currentPage,
        setCurrentPage,
        filteredData,
        paginatedData,
        totalPages,
        resultStart,
        resultEnd,
        pageNumbers,
        itemsPerPageOptions,
        totalCount,
        filteredCount,
    } = usePaginatedSearch({
        data: allBlogs,
        getSearchText: getBlogSearchText,
        initialItemsPerPage: 9,
    });

    useEffect(() => {
        const fetchAllBlogsfromStrapi = async () => {
            try {
                const blogsReturned = await getAllBlogs();
                setAllBlogs(blogsReturned.data || []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBlogsfromStrapi();
    }, []);

    if (loading) {
        return (
            <section className="bg-[#F0F4FF]">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-[#0133E9] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-4 md:px-6 flex justify-center items-center">
            <div className="container max-w-7xl mx-auto">
                <ListSearchBar
                    title="Browse Blogs"
                    searchLabel="Search blogs"
                    searchId="blog-search"
                    placeholder="Search by title, slug, or author..."
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={itemsPerPageOptions}
                    resultStart={resultStart}
                    resultEnd={resultEnd}
                    filteredCount={filteredCount}
                    totalCount={totalCount}
                    itemLabel="blogs"
                    isSearching={isSearching}
                />

                {filteredData.length === 0 ? (
                    <h1 className="text-center text-black text-[30px] font-medium">
                        {debouncedSearchQuery.trim() ? "No blogs match your search" : "No Blogs to show"}
                    </h1>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedData.map((post) => {
                                const imageUrl = post.BlogPreviewImage?.url
                                    ? STRAPI_URL + post.BlogPreviewImage.url
                                    : null;

                                return (
                                    <div
                                        key={post.id}
                                        className="each-blog bg-[#F6F8FF] w-full flex flex-col rounded-2xl p-4 shadow-sm"
                                    >
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                width={320}
                                                height={180}
                                                unoptimized
                                                alt={post.BlogName}
                                                className="rounded-xl w-full h-[180px] object-cover mb-6"
                                            />
                                        ) : (
                                            <div className="rounded-xl w-full h-[180px] bg-gray-200 mb-6" />
                                        )}

                                        <p className="text-[#222] text-[18px] font-medium mb-6">
                                            {post.BlogName}
                                        </p>

                                        <a
                                            href={navHref(`/blogs/${post.BlogSlug}`)}
                                            className="text-[#2C6BFF] font-medium flex items-center mb-4 gap-1"
                                        >
                                            Read More <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>

                        <ListPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            pageNumbers={pageNumbers}
                        />
                    </>
                )}
            </div>
        </section>
    );
}
