import Link from "next/link";
import { FaRegThumbsUp } from "react-icons/fa";

export default function FeaturedPosts({ posts = [] }) {
    if (!posts.length) return null;

    return (
        <section>
            <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-medium text-[#111827]">Featured posts</h2>
            </div>
            <ul className="space-y-3">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/community/post/${post.slug}/`}
                            className="block rounded-xl border border-[#D6E3FF] bg-white p-4 md:p-5 shadow-sm hover:border-[#2C6BFF] hover:shadow-md transition"
                        >
                            <h3 className="text-base md:text-lg font-medium text-[#111827]">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[#6b7280] mt-1.5">
                                {post.replyCount} {post.replyCount === 1 ? "reply" : "replies"} ·{" "}
                                {post.authorName}
                            </p>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#2C6BFF]">
                                <FaRegThumbsUp className="text-[12px]" aria-hidden />
                                <span className="font-medium tabular-nums">{post.upvotes}</span>
                                <span className="text-[#6b7280]">likes</span>
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
