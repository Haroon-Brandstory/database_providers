import Link from "next/link";
import { FaRegClock, FaRegComment, FaRegEye } from "react-icons/fa";

export default function ArticleCardGrid({ items = [], basePath }) {
    if (!items.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <article
                    key={item.slug}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(8,15,52,0.06)] hover:shadow-[0_8px_28px_rgba(44,107,255,0.12)] transition flex flex-col"
                >
                    <div
                        className="relative h-[200px] bg-gradient-to-br from-[#0f2a6b] to-[#2c6bff] bg-cover bg-center"
                        style={
                            item.coverImage
                                ? {
                                      backgroundImage: `linear-gradient(135deg, rgba(15,42,107,0.45), rgba(44,107,255,0.25)), url(${item.coverImage})`,
                                  }
                                : undefined
                        }
                    >
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white border-2 border-white shadow text-[#0133e9] text-sm font-semibold flex items-center justify-center">
                            {item.author || "DP"}
                        </div>
                        <span className="absolute top-4 right-4 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[#51525c] shadow-sm">
                            {item.readTime}
                        </span>
                        {item.resultPill ? (
                            <span className="absolute bottom-4 left-4 right-4 inline-flex w-fit max-w-[calc(100%-2rem)] rounded-full bg-[#0133e9] px-3 py-1.5 text-[12px] font-medium text-white">
                                {item.resultPill}
                            </span>
                        ) : null}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-[#2a3547] leading-snug mb-4 flex-1">
                            <Link
                                href={`${basePath}/${item.slug}/`}
                                className="hover:text-[#0133e9] transition no-underline text-inherit"
                            >
                                {item.title}
                            </Link>
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#7c8fac] pt-1">
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
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
