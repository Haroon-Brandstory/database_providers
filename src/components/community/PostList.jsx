import Link from "next/link";
import { getCategoryBySlug, getPostPath } from "@/lib/communityData";

export default function PostList({
    posts = [],
    title = "Recent posts",
    emptyMessage = "No posts found.",
}) {
    return (
        <section className="max-w-[900px] mx-auto">
            {title ? (
                <h2 className="text-[22px] md:text-[24px] font-medium text-[#202124] mb-4">
                    {title}
                </h2>
            ) : null}
            {!posts.length ? (
                <p className="text-sm text-[#5f6368]">{emptyMessage}</p>
            ) : (
                <ul className="rounded-2xl border border-[#dadce0] bg-white overflow-hidden divide-y divide-[#e8eaed]">
                    {posts.map((post) => {
                        const category = getCategoryBySlug(post.categorySlug);
                        return (
                            <li key={post.slug}>
                                <Link
                                    href={getPostPath(post.slug)}
                                    className="flex items-start justify-between gap-4 px-4 md:px-5 py-4 hover:bg-[#f8f9fa] transition"
                                >
                                    <div className="min-w-0">
                                        <h3 className="text-[15px] md:text-base font-medium text-[#1a73e8] leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5f6368]">
                                            {category?.title ?? "Community"}
                                            {post.createdAt ? (
                                                <>
                                                    {" · "}
                                                    <time dateTime={post.createdAt}>
                                                        {post.createdAt}
                                                    </time>
                                                </>
                                            ) : null}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-sm text-[#80868b] whitespace-nowrap">
                                        {post.replyCount}{" "}
                                        {post.replyCount === 1 ? "Answer" : "Answers"}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
