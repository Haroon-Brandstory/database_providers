"use client";

import { useEffect, useState } from "react";
import { notifyPostSubmitted } from "./comingSoon";

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
        notifyPostSubmitted();
        setTitle("");
        setBody("");
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-composer-title"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl border border-[#dadce0] bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 id="community-composer-title" className="text-xl font-medium text-[#202124]">
                        Post a question
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#5f6368] hover:text-[#202124] text-sm"
                        aria-label="Close"
                    >
                        Close
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="composer-category" className="block text-sm text-[#5f6368] mb-1.5">
                            Category
                        </label>
                        <select
                            id="composer-category"
                            value={categorySlug}
                            onChange={(e) => setCategorySlug(e.target.value)}
                            className="w-full rounded-lg border border-[#dadce0] bg-white px-3 py-2.5 text-[#202124] text-sm focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                        >
                            {categories.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="composer-title" className="block text-sm text-[#5f6368] mb-1.5">
                            Title
                        </label>
                        <input
                            id="composer-title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What do you need help with?"
                            className="w-full rounded-lg border border-[#dadce0] bg-white px-3 py-2.5 text-[#202124] text-sm placeholder:text-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                        />
                    </div>
                    <div>
                        <label htmlFor="composer-body" className="block text-sm text-[#5f6368] mb-1.5">
                            Details
                        </label>
                        <textarea
                            id="composer-body"
                            required
                            rows={5}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Share what you already tried. Do not post passwords or payment details."
                            className="w-full rounded-lg border border-[#dadce0] bg-white px-3 py-2.5 text-[#202124] text-sm placeholder:text-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-y"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-[#dadce0] px-4 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f8f9fa] transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-medium text-white hover:bg-[#1765cc] transition"
                        >
                            Post question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
