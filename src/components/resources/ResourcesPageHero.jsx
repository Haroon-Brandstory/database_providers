import Link from "next/link";

export default function ResourcesPageHero({
    title,
    description,
    ctaLabel = "Let’s Talk",
    ctaHref = "/contact-us/",
}) {
    return (
        <section className="relative min-h-[420px] md:min-h-[520px] bg-[url('/blog/blogListingBanner.png')] flex justify-center items-center bg-center bg-cover bg-no-repeat px-4 md:px-6 pt-28 md:pt-[100px] pb-14 md:pb-16 overflow-hidden">
            <div className="container mx-auto max-w-[1200px]">
                <div className="max-w-[760px]">
                    <h1 className="text-white text-[34px] md:text-[48px] font-medium leading-tight mb-5">
                        {title}
                    </h1>
                    {description ? (
                        <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                            {description}
                        </p>
                    ) : null}
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center justify-center rounded-lg bg-[#2C6BFF] px-6 py-3 text-sm font-medium text-white hover:bg-[#2558d6] transition"
                    >
                        {ctaLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
