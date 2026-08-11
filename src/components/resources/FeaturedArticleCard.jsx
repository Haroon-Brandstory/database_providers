import Link from "next/link";
import { FaRegClock, FaRegComment, FaRegEye } from "react-icons/fa";

export default function FeaturedArticleCard({ item, basePath }) {
    if (!item) return null;

    return (
        <article className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(8,15,52,0.06)] hover:shadow-[0_8px_28px_rgba(44,107,255,0.12)] transition mb-6">
            <div className="p-7 md:p-9 lg:p-10 flex flex-col">
                <h3 className="text-[22px] md:text-[28px] font-semibold text-[#2a3547] leading-[1.35] mb-3.5">
                    <Link
                        href={`${basePath}/${item.slug}/`}
                        className="hover:text-[#0133e9] transition no-underline text-inherit"
                    >
                        {item.title}
                    </Link>
                </h3>
                <p className="text-[15px] leading-relaxed text-[#7c8fac] mb-auto text-left">
                    {item.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-7 text-[13px] text-[#7c8fac]">
                    {item.views != null ? (
                        <span className="inline-flex items-center gap-1.5">
                            <FaRegEye aria-hidden />
                            {item.views}
                        </span>
                    ) : null}
                    {item.comments != null ? (
                        <span className="inline-flex items-center gap-1.5">
                            <FaRegComment aria-hidden />
                            {item.comments}
                        </span>
                    ) : null}
                    <span>{item.dateLabel}</span>
                    <span className="inline-flex items-center gap-1.5">
                        <FaRegClock aria-hidden />
                        {item.readTime}
                    </span>
                </div>
            </div>
            <div
                className="relative min-h-[240px] md:min-h-[280px] bg-gradient-to-br from-[#0a1a4a] via-[#0133e9] to-[#2c6bff] bg-cover bg-center"
                style={
                    item.coverImage
                        ? {
                              backgroundImage: `linear-gradient(135deg, rgba(10,26,74,0.55), rgba(1,51,233,0.35)), url(${item.coverImage})`,
                          }
                        : undefined
                }
            >
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white border-2 border-white shadow text-[#0133e9] text-sm font-semibold flex items-center justify-center">
                    {item.author || "DP"}
                </div>
            </div>
        </article>
    );
}
