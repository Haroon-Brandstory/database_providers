import Link from "next/link";

export default function CategoryGrid({ categories = [] }) {
    if (!categories.length) return null;

    return (
        <section>
            <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-medium text-[#111827]">Categories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/community/category/${category.slug}/`}
                        className="rounded-xl border border-[#D6E3FF] bg-white p-5 md:p-6 shadow-sm hover:border-[#2C6BFF] hover:shadow-md transition"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-lg md:text-xl font-medium text-[#111827]">
                                {category.title}
                            </h3>
                            <span className="shrink-0 text-xs font-medium text-[#2C6BFF] bg-[#EEF4FF] px-2 py-1 rounded-md mt-0.5">
                                {category.postCount}{" "}
                                {category.postCount === 1 ? "post" : "posts"}
                            </span>
                        </div>
                        <p className="text-sm text-[#4b5563] leading-relaxed">
                            {category.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
