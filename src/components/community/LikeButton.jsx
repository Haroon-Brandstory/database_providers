"use client";

import { FaRegThumbsUp } from "react-icons/fa";
import { notifyComingSoon } from "./comingSoon";

export default function LikeButton({ count, label = "Like", className = "" }) {
    return (
        <button
            type="button"
            onClick={() => notifyComingSoon("Likes")}
            className={`inline-flex items-center gap-1.5 rounded-full border border-[#D6E3FF] bg-[#F8FAFF] px-3 py-1.5 text-sm text-[#2C6BFF] hover:border-[#2C6BFF] hover:bg-[#EEF4FF] transition ${className}`}
            aria-label={`${label}, ${count}`}
        >
            <FaRegThumbsUp className="text-[13px] shrink-0" aria-hidden />
            <span className="font-medium tabular-nums">{count}</span>
            {label ? <span className="text-[#6b7280] font-normal">{label}</span> : null}
        </button>
    );
}
