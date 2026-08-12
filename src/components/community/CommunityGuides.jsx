import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";

export default function CommunityGuides({ guides = [] }) {
    if (!guides.length) return null;

    return (
        <section className="max-w-[900px] mx-auto">
            <h2 className="text-[22px] md:text-[24px] font-medium text-[#202124] mb-4">
                Community guides
            </h2>
            <ul className="rounded-2xl border border-[#dadce0] bg-white overflow-hidden divide-y divide-[#e8eaed]">
                {guides.map((guide) => (
                    <li key={guide.slug}>
                        <Link
                            href={`/community/guides/${guide.slug}/`}
                            className="flex items-start gap-4 px-4 md:px-5 py-4 hover:bg-[#f8f9fa] transition"
                        >
                            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                                <FaThumbtack className="text-sm rotate-45" aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-[15px] md:text-base font-medium text-[#1a73e8] leading-snug">
                                    {guide.title}
                                </h3>
                                <p className="mt-1 text-sm text-[#5f6368] line-clamp-2">
                                    {guide.summary}
                                </p>
                            </div>
                            <span className="shrink-0 text-sm text-[#80868b] whitespace-nowrap">
                                {guide.upvotes} likes
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
