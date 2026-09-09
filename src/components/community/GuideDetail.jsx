import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { getPostPath, TEAM_AUTHOR } from "@/lib/communityData";

export default function GuideDetail({
    guide,
    relatedGuides = [],
    relatedPosts = [],
}) {
    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-16">
            <div
                className="h-[72px] md:h-[97px] bg-[#9a9a9a]/80 backdrop-blur-md"
                aria-hidden
            />
            <main className="container mx-auto max-w-[1100px] px-4 pt-6 md:pt-8">
                <Link
                    href="/community/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline mb-5"
                >
                    <FiArrowLeft aria-hidden />
                    Back
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
                    <article className="min-w-0 rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="rounded bg-[#e6f4ea] px-1.5 py-0.5 text-[11px] font-medium text-[#137333]">
                                Official Guide
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 mb-5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={guide.authorAvatar || "/pricing-plan/db_bubble.png"}
                                alt=""
                                width={36}
                                height={36}
                                className="h-9 w-9 rounded-full object-cover bg-[#e8eaed] ring-1 ring-[#dadce0]"
                            />
                            <p className="text-sm font-medium text-[#202124]">
                                {guide.authorName || TEAM_AUTHOR}
                            </p>
                        </div>

                        <h1 className="text-[22px] md:text-[28px] font-medium text-[#202124] leading-snug mb-3">
                            {guide.title}
                        </h1>
                        <p className="text-[#5f6368] text-[15px] md:text-base leading-relaxed mb-5">
                            {guide.summary}
                        </p>

                        <div className="border-t border-[#e8eaed] pt-5 community-guide-body [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-[#202124] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[#3c4043] [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:text-[#3c4043] [&_li]:text-base [&_li]:leading-relaxed">
                            {guide.bodyHtml ? (
                                <div dangerouslySetInnerHTML={{ __html: guide.bodyHtml }} />
                            ) : (
                                <p className="text-[#3c4043] text-base leading-relaxed whitespace-pre-wrap">
                                    {guide.body}
                                </p>
                            )}
                        </div>
                    </article>

                    <aside className="lg:sticky lg:top-28">
                        <div className="rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-4">
                                Related content
                            </h2>
                            <ul className="space-y-3">
                                {relatedGuides.map((item) => (
                                    <li key={`guide-${item.slug}`}>
                                        <Link
                                            href={`/community/guides/${item.slug}/`}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                {relatedPosts.map((item) => (
                                    <li key={`post-${item.slug}`}>
                                        <Link
                                            href={getPostPath(item.slug)}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/community/"
                                        className="flex items-start gap-2.5 group"
                                    >
                                        <HiOutlineDocumentText
                                            className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                            aria-hidden
                                        />
                                        <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                            Browse all community topics
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
