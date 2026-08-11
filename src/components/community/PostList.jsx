import Link from "next/link";
import { FaRegThumbsUp } from "react-icons/fa";
import { getCategoryBySlug } from "@/lib/communityData";

export default function PostList({
    posts = [],
    title = "Recent posts",
    emptyMessage = "No posts found.",
    headingClassName = "text-[#111827]",
}) {
    return (
        <section>
            {title ? (
                <div className="flex items-end justify-between gap-4 mb-6">
                    <h2 className={`text-2xl md:text-3xl font-medium ${headingClassName}`}>{title}</h2>
                </div>
            ) : null}
            {!posts.length ? (
                <p className="text-[#6b7280] text-sm">{emptyMessage}</p>
            ) : (
                <ul className="divide-y divide-[#E8EEF9] rounded-xl border border-[#D6E3FF] bg-white overflow-hidden shadow-sm">
                    {posts.map((post) => {
                        const category = getCategoryBySlug(post.categorySlug);
                        return (
                            <li key={post.slug}>
                                <Link
                                    href={`/community/post/${post.slug}/`}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5 hover:bg-[#F8FAFF] transition"
                                >
                                    <div className="min-w-0">
                                        <h3 className="text-base md:text-lg font-medium text-[#111827]">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[#6b7280] mt-1">
                                            {category?.title ?? "Community"} · {post.replyCount}{" "}
                                            {post.replyCount === 1 ? "reply" : "replies"} ·{" "}
                                            {post.authorName} · {post.createdAt}
                                        </p>
                                    </div>
                                    <p className="shrink-0 inline-flex items-center gap-1.5 text-sm text-[#2C6BFF]">
                                        <FaRegThumbsUp className="text-[12px]" aria-hidden />
                                        <span className="font-medium tabular-nums">{post.upvotes}</span>
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
