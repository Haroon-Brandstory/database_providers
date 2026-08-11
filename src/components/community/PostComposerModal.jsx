"use client";

import { useEffect, useState } from "react";
import { notifyComingSoon } from "./comingSoon";

export default function PostComposerModal({ open, onClose, categories = [] }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "");

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open && categories.length && !categorySlug) {
            setCategorySlug(categories[0].slug);
        }
    }, [open, categories, categorySlug]);

    if (!open) return null;

    function handleSubmit(e) {
        e.preventDefault();
        notifyComingSoon("Posting");
        setTitle("");
        setBody("");
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0f172a]/50 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-composer-title"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl border border-[#D6E3FF] bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 id="community-composer-title" className="text-xl font-medium text-[#111827]">
                        Post a question
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#6b7280] hover:text-[#111827] text-sm"
                        aria-label="Close"
                    >
                        Close
                    </button>
                </div>
                <p className="text-sm text-[#6b7280] mb-5">
                    Static preview — posts are not saved yet.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="composer-category" className="block text-sm text-[#374151] mb-1.5">
                            Category
                        </label>
                        <select
                            id="composer-category"
                            value={categorySlug}
                            onChange={(e) => setCategorySlug(e.target.value)}
                            className="w-full rounded-lg border border-[#D6E3FF] bg-[#F8FAFF] px-3 py-2.5 text-[#111827] text-sm focus:outline-none focus:border-[#2C6BFF]"
                        >
                            {categories.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="composer-title" className="block text-sm text-[#374151] mb-1.5">
                            Title
                        </label>
                        <input
                            id="composer-title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What do you need help with?"
                            className="w-full rounded-lg border border-[#D6E3FF] bg-[#F8FAFF] px-3 py-2.5 text-[#111827] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2C6BFF]"
                        />
                    </div>
                    <div>
                        <label htmlFor="composer-body" className="block text-sm text-[#374151] mb-1.5">
                            Details
                        </label>
                        <textarea
                            id="composer-body"
                            required
                            rows={5}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Share what you already tried. Do not post passwords or payment details."
                            className="w-full rounded-lg border border-[#D6E3FF] bg-[#F8FAFF] px-3 py-2.5 text-[#111827] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2C6BFF] resize-y"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-[#D6E3FF] px-4 py-2.5 text-sm text-[#374151] hover:border-[#2C6BFF] transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-[#2C6BFF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2558d6] transition"
                        >
                            Post question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
