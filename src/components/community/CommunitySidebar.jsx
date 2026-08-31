import Link from "next/link";
import { getCategoriesWithCounts, getPostPath } from "@/lib/communityData";

export default function CommunitySidebar({
    recentPosts = [],
    title = "Recent posts",
}) {
    const categories = getCategoriesWithCounts();

    return (
        <aside className="space-y-6">
            <div className="rounded-xl border border-[#D6E3FF] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-medium text-[#111827] mb-4">{title}</h2>
                {!recentPosts.length ? (
                    <p className="text-sm text-[#6b7280]">No other posts yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {recentPosts.map((post) => (
                            <li key={post.slug} className="border-b border-[#E8EEF9] last:border-0 pb-4 last:pb-0">
                                <Link
                                    href={getPostPath(post.slug)}
                                    className="block group"
                                >
                                    <h3 className="text-sm font-medium text-[#111827] group-hover:text-[#2C6BFF] transition leading-snug">
                                        {post.title}
                                    </h3>
                                    {post.createdAt ? (
                                        <p className="mt-1.5 text-xs text-[#6b7280]">
                                            <time dateTime={post.createdAt}>
                                                {post.createdAt}
                                            </time>
                                        </p>
                                    ) : null}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <Link
                    href="/community/"
                    className="mt-4 inline-block text-sm font-medium text-[#2C6BFF] hover:underline"
                >
                    View all community
                </Link>
            </div>

            <div className="rounded-xl border border-[#D6E3FF] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-medium text-[#111827] mb-4">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.slug}>
                            <Link
                                href={`/community/category/${category.slug}/`}
                                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#F8FAFF] hover:text-[#2C6BFF] transition"
                            >
                                <span>{category.title}</span>
                                <span className="text-xs text-[#6b7280]">{category.postCount}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
