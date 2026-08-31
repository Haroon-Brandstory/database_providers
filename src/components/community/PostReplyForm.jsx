"use client";

import { useState } from "react";
import { notifyReplySubmitted } from "./comingSoon";

export default function PostReplyForm() {
    const [reply, setReply] = useState("");

    function handleReply(e) {
        e.preventDefault();
        if (!reply.trim()) return;
        notifyReplySubmitted();
        setReply("");
    }

    return (
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
    );
}
