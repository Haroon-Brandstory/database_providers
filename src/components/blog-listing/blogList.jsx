"use client";

import { useNavHref } from "@/hooks/useNavHref";
import { getAllBlogs } from "@/lib/services";
import { API_URL } from "@/utils/config";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12];

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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const STRAPI_URL = API_URL;
    const { navHref } = useNavHref();

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

    const filteredBlogs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return allBlogs;

        return allBlogs.filter((blog) => getBlogSearchText(blog).includes(query));
    }, [allBlogs, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));

    const paginatedBlogs = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredBlogs.slice(start, start + itemsPerPage);
    }, [filteredBlogs, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, itemsPerPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const resultStart = filteredBlogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const resultEnd = Math.min(currentPage * itemsPerPage, filteredBlogs.length);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let page = start; page <= end; page += 1) {
            pages.push(page);
        }

        return pages;
    }, [currentPage, totalPages]);

    if (loading) {
        return (
            <section className="bg-white">
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-6 flex justify-center items-center">
            <div className="container max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search all blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-[#D6E0FF] rounded-xl bg-white text-[#222] placeholder-gray-400 focus:outline-none focus:border-[#2C6BFF] focus:ring-1 focus:ring-[#2C6BFF]/40"
                        />
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#444]">
                        <label htmlFor="items-per-page" className="font-medium whitespace-nowrap">
                            Items per page
                        </label>
                        <select
                            id="items-per-page"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="rounded-xl border border-[#D6E0FF] bg-white px-3 py-2 text-[#222] focus:outline-none focus:border-[#2C6BFF] focus:ring-1 focus:ring-[#2C6BFF]/40"
                        >
                            {ITEMS_PER_PAGE_OPTIONS.map((count) => (
                                <option key={count} value={count}>
                                    {count}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="mb-6 text-sm text-[#555]">
                    {filteredBlogs.length === 0
                        ? "Showing 0 of 0 blogs"
                        : `Showing ${resultStart}-${resultEnd} of ${filteredBlogs.length} blog${filteredBlogs.length === 1 ? "" : "s"}`}
                    {searchQuery.trim() && allBlogs.length > 0
                        ? ` (filtered from ${allBlogs.length} total)`
                        : ""}
                </p>

                {filteredBlogs.length === 0 ? (
                    <h1 className="text-center text-black text-[30px] font-medium">
                        {searchQuery.trim() ? "No blogs match your search" : "No Blogs to show"}
                    </h1>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedBlogs.map((post) => {
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

                        {totalPages > 1 && (
                            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-xl border border-[#D6E0FF] bg-white px-4 py-2 text-sm font-medium text-[#2C6BFF] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {pageNumbers.map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            className={`min-w-10 rounded-xl px-3 py-2 text-sm font-medium ${
                                                page === currentPage
                                                    ? "bg-[#2C6BFF] text-white"
                                                    : "border border-[#D6E0FF] bg-white text-[#2C6BFF]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-xl border border-[#D6E0FF] bg-white px-4 py-2 text-sm font-medium text-[#2C6BFF] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
