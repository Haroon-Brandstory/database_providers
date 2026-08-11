"use client";

import { useState } from "react";
import LikeButton from "./LikeButton";
import { notifyComingSoon } from "./comingSoon";

export default function PostDetail({ post }) {
    const [reply, setReply] = useState("");

    function handleReply(e) {
        e.preventDefault();
        notifyComingSoon("Posting");
        setReply("");
    }

    return (
        <div>
            <div className="rounded-xl border border-[#D6E3FF] bg-white p-5 md:p-7 mb-6 shadow-sm">
                <p className="text-[#374151] text-base leading-relaxed whitespace-pre-wrap">
                    {post.body}
                </p>
                <div className="mt-5 pt-4 border-t border-[#E8EEF9]">
                    <LikeButton count={post.upvotes} />
                </div>
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-medium text-black mb-4">
                    {post.replyCount} {post.replyCount === 1 ? "Reply" : "Replies"}
                </h2>
                {!post.replies?.length ? (
                    <p className="text-sm text-[#6b7280]">No replies yet. Be the first to help.</p>
                ) : (
                    <ul className="space-y-4">
                        {post.replies.map((item, index) => (
                            <li
                                key={`${item.authorName}-${item.createdAt}-${index}`}
                                className="rounded-xl border border-[#D6E3FF] bg-white p-5 shadow-sm"
                            >
                                <p className="text-sm text-[#6b7280] mb-2">
                                    {item.authorName} · {item.createdAt}
                                </p>
                                <p className="text-[#374151] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {item.body}
                                </p>
                                <div className="mt-4 pt-3 border-t border-[#E8EEF9]">
                                    <LikeButton count={item.upvotes} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="rounded-xl border border-[#D6E3FF] bg-white p-5 md:p-7 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-1">
                    <h2 className="text-lg md:text-xl font-medium text-[#111827]">Add a reply</h2>
                    <span className="shrink-0 rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[11px] font-medium text-[#2C6BFF]">
                        Preview
                    </span>
                </div>
                <p className="text-sm text-[#6b7280] mb-5">
                    Replies are not saved yet. Share what you know — skip passwords and payment details.
                </p>
                <form onSubmit={handleReply} className="space-y-4">
                    <div>
                        <label
                            htmlFor="reply-body"
                            className="block text-sm font-medium text-[#374151] mb-2"
                        >
                            Your reply
                        </label>
                        <textarea
                            id="reply-body"
                            required
                            rows={5}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Write a helpful answer…"
                            className="w-full rounded-xl border border-[#D6E3FF] bg-[#F8FAFF] px-4 py-3 text-[#111827] text-sm leading-relaxed placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2C6BFF] focus:ring-2 focus:ring-[#2C6BFF]/20 resize-y min-h-[120px]"
                        />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                        <p className="text-xs text-[#9ca3af]">
                            Be respectful. Community tips help everyone.
                        </p>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-lg bg-[#2C6BFF] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2558d6] transition w-full sm:w-auto"
                        >
                            Post reply
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
