import Link from "next/link";
import { FaRegThumbsUp } from "react-icons/fa";

export default function CommunityGuides({ guides = [] }) {
    if (!guides.length) return null;

    return (
        <section>
            <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-medium text-[#111827]">Community guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {guides.map((guide) => (
                    <Link
                        key={guide.slug}
                        href={`/community/guides/${guide.slug}/`}
                        className="rounded-xl border border-[#D6E3FF] bg-white p-5 md:p-6 shadow-sm hover:border-[#2C6BFF] hover:shadow-md transition flex flex-col"
                    >
                        <h3 className="text-lg font-medium text-[#111827] mb-2">{guide.title}</h3>
                        <p className="text-sm text-[#4b5563] leading-relaxed flex-1">
                            {guide.summary}
                        </p>
                        <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#2C6BFF]">
                            <FaRegThumbsUp className="text-[12px]" aria-hidden />
                            <span className="font-medium tabular-nums">{guide.upvotes}</span>
                            <span className="text-[#6b7280]">likes</span>
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
