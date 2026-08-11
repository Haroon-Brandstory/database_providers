import Link from "next/link";

export default function CommunityDetailBanner({
    crumbs = [],
    title,
    meta,
}) {
    return (
        <section className="bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-no-repeat px-4 md:px-20 pt-30 pb-12 overflow-hidden">
            <div className="container mx-auto">
                {crumbs.length ? (
                    <nav className="text-sm text-[#a8b0c0] mb-4 flex flex-wrap gap-2">
                        {crumbs.map((crumb, index) => (
                            <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                                {index > 0 ? <span>/</span> : null}
                                {crumb.href ? (
                                    <Link href={crumb.href} className="text-blue-300 hover:text-white transition">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#D0D0D0] truncate max-w-[240px] md:max-w-md">
                                        {crumb.label}
                                    </span>
                                )}
                            </span>
                        ))}
                    </nav>
                ) : null}
                <h1 className="text-white text-[28px] md:text-[42px] font-medium leading-tight max-w-3xl">
                    {title}
                </h1>
                {meta ? (
                    <p className="text-[#D0D0D0] text-sm md:text-base mt-4">{meta}</p>
                ) : null}
            </div>
        </section>
    );
}
