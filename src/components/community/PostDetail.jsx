import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import PostReplyForm from "./PostReplyForm";
import { getCategoryBySlug, getPostPath, TEAM_AUTHOR } from "@/lib/communityData";

export default function PostDetail({ post, related = [] }) {
    const category = getCategoryBySlug(post.categorySlug);
    const answer = post.acceptedAnswer;

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
                    <div className="min-w-0 space-y-4">
                        <article className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <div className="flex flex-wrap items-center gap-2 mb-5">
                                {category ? (
                                    <span className="rounded bg-[#f1f3f4] px-1.5 py-0.5 text-[11px] font-medium text-[#5f6368]">
                                        {category.title}
                                    </span>
                                ) : null}
                                <time
                                    className="text-xs md:text-sm text-[#80868b]"
                                    dateTime={post.createdAt}
                                >
                                    {post.createdAt}
                                </time>
                            </div>

                            <h1 className="text-[22px] md:text-[28px] font-medium text-[#202124] leading-snug mb-4">
                                {post.title}
                            </h1>

                            <p className="text-[#3c4043] text-[15px] md:text-base leading-relaxed whitespace-pre-wrap mb-8">
                                {post.body}
                            </p>

                            {answer ? (
                                <section
                                    className="pt-6 border-t border-[#e8eaed]"
                                    aria-labelledby="accepted-answer-heading"
                                >
                                    <h2
                                        id="accepted-answer-heading"
                                        className="text-lg font-medium text-[#202124] mb-3"
                                    >
                                        Accepted answer
                                    </h2>
                                    <p className="text-xs text-[#80868b] mb-3">
                                        <span className="font-medium text-[#1a73e8]">
                                            {answer.authorName || TEAM_AUTHOR}
                                        </span>
                                        {" · "}
                                        <time dateTime={answer.createdAt}>
                                            {answer.createdAt}
                                        </time>
                                    </p>
                                    <p className="text-[#3c4043] text-[15px] md:text-base leading-relaxed whitespace-pre-wrap">
                                        {answer.body}
                                    </p>
                                </section>
                            ) : null}
                        </article>

                        <PostReplyForm />
                    </div>

                    <aside className="lg:sticky lg:top-28">
                        <div className="rounded-2xl border border-[#dadce0] bg-white p-5 shadow-sm">
                            <h2 className="text-base font-medium text-[#202124] mb-4">
                                Related content
                            </h2>
                            <ul className="space-y-3">
                                {related.map((item) => (
                                    <li key={item.slug}>
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
                                {category ? (
                                    <li>
                                        <Link
                                            href={`/community/category/${category.slug}/`}
                                            className="flex items-start gap-2.5 group"
                                        >
                                            <HiOutlineDocumentText
                                                className="mt-0.5 shrink-0 text-[#1a73e8] text-lg"
                                                aria-hidden
                                            />
                                            <span className="text-sm text-[#1a73e8] group-hover:underline leading-snug">
                                                More in {category.title}
                                            </span>
                                        </Link>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
