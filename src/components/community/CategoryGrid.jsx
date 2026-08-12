import Link from "next/link";

export default function CategoryGrid({ categories = [] }) {
    if (!categories.length) return null;

    return (
        <section className="max-w-[900px] mx-auto">
            <h2 className="text-[22px] md:text-[24px] font-medium text-[#202124] mb-4">
                Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/community/category/${category.slug}/`}
                        className="rounded-2xl border border-[#dadce0] bg-white p-4 hover:bg-[#f8f9fa] transition"
                    >
                        <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="text-base font-medium text-[#1a73e8]">
                                {category.title}
                            </h3>
                            <span className="text-xs text-[#80868b] shrink-0">
                                {category.postCount}{" "}
                                {category.postCount === 1 ? "post" : "posts"}
                            </span>
                        </div>
                        <p className="text-sm text-[#5f6368] leading-relaxed">
                            {category.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
