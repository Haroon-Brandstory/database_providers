"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import LikeButton from "./LikeButton";
import { notifyReplySubmitted } from "./comingSoon";
import { getCategoryBySlug } from "@/lib/communityData";

function initials(name = "U") {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function PostDetail({ post, related = [] }) {
    const [reply, setReply] = useState("");
    const category = getCategoryBySlug(post.categorySlug);

    function handleReply(e) {
        e.preventDefault();
        if (!reply.trim()) return;
        notifyReplySubmitted();
        setReply("");
    }

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
                        {/* Author + post card */}
                        <article className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-3 mb-5">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="shrink-0 h-10 w-10 rounded-full bg-[#1a73e8] text-white text-sm font-medium flex items-center justify-center">
                                        {initials(post.authorName)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-medium text-[#1a73e8]">
                                                {post.authorName}
                                            </span>
                                            <span className="rounded bg-[#e8f0fe] px-1.5 py-0.5 text-[11px] font-medium text-[#1967d2]">
                                                Original Poster
                                            </span>
                                            {category ? (
                                                <span className="rounded bg-[#f1f3f4] px-1.5 py-0.5 text-[11px] font-medium text-[#5f6368]">
                                                    {category.title}
                                                </span>
                                            ) : null}
                                        </div>
                                        <p className="text-xs text-[#80868b] mt-1">
                                            Community member
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 text-[#5f6368]">
                                    <time className="text-xs md:text-sm whitespace-nowrap">
                                        {post.createdAt}
                                    </time>
                                    <button
                                        type="button"
                                        className="p-1 rounded-full hover:bg-[#f1f3f4]"
                                        aria-label="More options"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-[22px] md:text-[28px] font-medium text-[#202124] leading-snug mb-4">
                                {post.title}
                            </h1>

                            <p className="text-[#3c4043] text-[15px] md:text-base leading-relaxed whitespace-pre-wrap mb-5">
                                {post.body}
                            </p>

                            <div className="pt-4 border-t border-[#e8eaed] flex flex-wrap items-center gap-3">
                                <LikeButton
                                    count={post.upvotes}
                                    storageKey={`post:${post.slug}`}
                                />
                                <span className="text-sm text-[#80868b]">
                                    {post.replyCount}{" "}
                                    {post.replyCount === 1 ? "reply" : "replies"}
                                </span>
                            </div>
                        </article>

                        {/* Replies */}
                        <section className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-4">
                                {post.replyCount} {post.replyCount === 1 ? "Reply" : "Replies"}
                            </h2>
                            {!post.replies?.length ? (
                                <p className="text-sm text-[#5f6368]">
                                    No replies yet. Be the first to help.
                                </p>
                            ) : (
                                <ul className="space-y-5">
                                    {post.replies.map((item, index) => (
                                        <li
                                            key={`${item.authorName}-${item.createdAt}-${index}`}
                                            className="pb-5 border-b border-[#e8eaed] last:border-0 last:pb-0"
                                        >
                                            <div className="flex items-start gap-3 mb-2">
                                                <div className="shrink-0 h-8 w-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-xs font-medium flex items-center justify-center">
                                                    {initials(item.authorName)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-medium text-[#1a73e8]">
                                                            {item.authorName}
                                                        </span>
                                                        {item.authorName === "Community Guide" ? (
                                                            <span className="rounded bg-[#e6f4ea] px-1.5 py-0.5 text-[11px] font-medium text-[#137333]">
                                                                Recommended Answer
                                                            </span>
                                                        ) : null}
                                                        <span className="text-xs text-[#80868b]">
                                                            {item.createdAt}
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-sm md:text-[15px] text-[#3c4043] leading-relaxed whitespace-pre-wrap">
                                                        {item.body}
                                                    </p>
                                                    <div className="mt-3">
                                                        <LikeButton
                                                            count={item.upvotes}
                                                            storageKey={`reply:${post.slug}:${index}`}
                                                            label="Like"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* Add reply */}
                        <section className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-1">
                                Add a reply
                            </h2>
                            <p className="text-sm text-[#5f6368] mb-4">
                                Replies are reviewed before they appear publicly.
                            </p>
                            <form onSubmit={handleReply} className="space-y-3">
                                <label htmlFor="reply-body" className="sr-only">
                                    Reply
                                </label>
                                <textarea
                                    id="reply-body"
                                    required
                                    rows={4}
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Write a helpful answer…"
                                    className="w-full rounded-xl border border-[#dadce0] bg-white px-3 py-2.5 text-[#202124] text-sm placeholder:text-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-y"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-medium text-white hover:bg-[#1765cc] transition"
                                    >
                                        Post reply
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Related sidebar — Google style */}
                    <aside className="lg:sticky lg:top-28">
                        <div className="rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-4">
                                Related content
                            </h2>
                            <ul className="space-y-3">
                                {related.map((item) => (
                                    <li key={item.slug}>
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
                                {category ? (
                                    <li>
                                        <Link
                                            href={`/community/category/${category.slug}/`}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                More in {category.title}
                                            </span>
                                        </Link>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
