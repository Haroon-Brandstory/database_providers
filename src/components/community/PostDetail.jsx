import Link from "next/link";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import PostReplyForm from "./PostReplyForm";
import { getCategoryBySlug, getPostPath, TEAM_AUTHOR } from "@/lib/communityData";

function AuthorRow({ name, avatar, date, dateTime, size = "md" }) {
    const img = size === "sm" ? "h-8 w-8" : "h-9 w-9";
    return (
        <div className={`flex items-center gap-2.5 ${size === "sm" ? "mb-3" : "mb-0"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={avatar || "/community/avatars/01.svg"}
                alt=""
                width={size === "sm" ? 32 : 36}
                height={size === "sm" ? 32 : 36}
                className={`${img} rounded-full object-cover bg-[#e8eaed] ring-1 ring-[#dadce0]`}
            />
            <div className="min-w-0">
                <p className="text-sm font-medium text-[#202124] truncate">{name}</p>
                {date ? (
                    <time className="text-xs text-[#80868b]" dateTime={dateTime || date}>
                        {date}
                    </time>
                ) : null}
            </div>
        </div>
    );
}

function AnswerCard({ answer }) {
    return (
        <article
            id={answer.id}
            className={`rounded-2xl border bg-white p-5 md:p-6 shadow-sm ${
                answer.accepted
                    ? "border-[#34a853]/40 ring-1 ring-[#34a853]/15"
                    : "border-[#dadce0]"
            }`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <AuthorRow
                    name={answer.authorName || TEAM_AUTHOR}
                    avatar={answer.authorAvatar}
                    date={answer.createdAt}
                    size="sm"
                />
                {answer.accepted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] px-2.5 py-1 text-[11px] font-medium text-[#137333]">
                        <FiCheck className="text-sm" aria-hidden />
                        Accepted answer
                    </span>
                ) : null}
            </div>

            {answer.bodyHtml ? (
                <div
                    className="text-[#3c4043] text-[15px] md:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: answer.bodyHtml }}
                />
            ) : (
                <p className="text-[#3c4043] text-[15px] md:text-base leading-relaxed whitespace-pre-wrap">
                    {answer.body}
                </p>
            )}
        </article>
    );
}

export default function PostDetail({ post, related = [] }) {
    const category = getCategoryBySlug(post.categorySlug);
    const answers = Array.isArray(post.answers)
        ? post.answers
        : post.acceptedAnswer
          ? [post.acceptedAnswer]
          : [];
    const answerCount = answers.length;

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
                        {/* Question */}
                        <article className="rounded-2xl border border-[#dadce0] bg-white p-5 md:p-6 shadow-sm">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {category ? (
                                    <span className="rounded bg-[#f1f3f4] px-1.5 py-0.5 text-[11px] font-medium text-[#5f6368]">
                                        {category.title}
                                    </span>
                                ) : null}
                                <span className="text-xs text-[#80868b]">
                                    {answerCount}{" "}
                                    {answerCount === 1 ? "answer" : "answers"}
                                </span>
                            </div>

                            <div className="mb-5">
                                <AuthorRow
                                    name={post.authorName || "Community member"}
                                    avatar={post.authorAvatar}
                                    date={post.createdAt}
                                />
                            </div>

                            <h1 className="text-[22px] md:text-[28px] font-medium text-[#202124] leading-snug mb-4">
                                {post.title}
                            </h1>

                            {post.bodyHtml ? (
                                <div
                                    className="text-[#3c4043] text-[15px] md:text-base leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0"
                                    dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
                                />
                            ) : (
                                <p className="text-[#3c4043] text-[15px] md:text-base leading-relaxed whitespace-pre-wrap">
                                    {post.body}
                                </p>
                            )}
                        </article>

                        {/* Answers thread */}
                        <section aria-labelledby="answers-heading" className="space-y-3">
                            <div className="flex items-center justify-between gap-3 px-1">
                                <h2
                                    id="answers-heading"
                                    className="text-lg font-medium text-[#202124]"
                                >
                                    {answerCount}{" "}
                                    {answerCount === 1 ? "Answer" : "Answers"}
                                </h2>
                            </div>

                            {answerCount === 0 ? (
                                <div className="rounded-2xl border border-dashed border-[#dadce0] bg-white px-5 py-8 text-center text-sm text-[#5f6368]">
                                    No answers yet. Be the first to reply.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {answers.map((answer) => (
                                        <AnswerCard
                                            key={answer.id || `${answer.authorName}-${answer.createdAt}`}
                                            answer={answer}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

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
