"use client";

import { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

export default function LikeButton({
    count = 0,
    storageKey,
    label = "Like",
    className = "",
}) {
    const [likes, setLikes] = useState(count);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (!storageKey || typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(`community-like:${storageKey}`);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (typeof parsed?.likes === "number") setLikes(parsed.likes);
            if (parsed?.liked) setLiked(true);
        } catch {
            /* ignore */
        }
    }, [storageKey]);

    function persist(nextLikes, nextLiked) {
        if (!storageKey || typeof window === "undefined") return;
        try {
            localStorage.setItem(
                `community-like:${storageKey}`,
                JSON.stringify({ likes: nextLikes, liked: nextLiked })
            );
        } catch {
            /* ignore */
        }
    }

    function handleClick() {
        if (liked) {
            const next = Math.max(0, likes - 1);
            setLikes(next);
            setLiked(false);
            persist(next, false);
            return;
        }
        const next = likes + 1;
        setLikes(next);
        setLiked(true);
        persist(next, true);
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition ${
                liked
                    ? "border-[#c2e7ff] bg-[#e8f0fe] text-[#1967d2]"
                    : "border-[#dadce0] bg-white text-[#5f6368] hover:bg-[#f8f9fa] hover:border-[#bdc1c6]"
            } ${className}`}
            aria-pressed={liked}
            aria-label={`${label}, ${likes}`}
        >
            {liked ? (
                <FaThumbsUp className="text-[13px] shrink-0" aria-hidden />
            ) : (
                <FaRegThumbsUp className="text-[13px] shrink-0" aria-hidden />
            )}
            <span className="font-medium tabular-nums">{likes}</span>
            {label ? <span className="font-normal">{label}</span> : null}
        </button>
    );
}
