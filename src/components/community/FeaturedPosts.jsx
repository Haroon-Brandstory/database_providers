import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";

export default function FeaturedPosts({ posts = [], viewAllHref = "/community/" }) {
    if (!posts.length) return null;

    return (
        <section className="max-w-[900px] mx-auto">
            <h2 className="text-[22px] md:text-[24px] font-medium text-[#202124] mb-2">
                Featured posts
            </h2>
            <Link
                href={viewAllHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-[#1a73e8] hover:underline mb-4"
            >
                View all featured posts
                <span aria-hidden>→</span>
            </Link>

            <ul className="rounded-2xl border border-[#dadce0] bg-white overflow-hidden divide-y divide-[#e8eaed]">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/community/post/${post.slug}/`}
                            className="flex items-start gap-4 px-4 md:px-5 py-4 hover:bg-[#f8f9fa] transition"
                        >
                            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                                <FaThumbtack className="text-sm" aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-[15px] md:text-base font-medium text-[#1a73e8] leading-snug">
                                    {post.title}
                                </h3>
                                <p className="mt-1 text-sm text-[#5f6368] line-clamp-2 leading-relaxed">
                                    {post.body}
                                </p>
                            </div>
                            <span className="shrink-0 text-sm text-[#80868b] whitespace-nowrap pt-0.5">
                                {post.replyCount} {post.replyCount === 1 ? "Reply" : "Replies"}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
