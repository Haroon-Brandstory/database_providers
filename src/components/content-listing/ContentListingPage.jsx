import Link from "next/link";

export default function ContentListingPage({ data }) {
    return (
        <div className="text-white">
            <section className="bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center px-4 md:px-20 pt-30 pb-10 overflow-hidden">
                <div className="container mx-auto">
                    <div className="min-h-[320px] md:min-h-[420px] flex flex-col justify-center max-w-3xl">
                        <p className="text-blue-300 text-sm uppercase tracking-wide mb-3">
                            Database Providers
                        </p>
                        <h1 className="text-white text-[34px] md:text-[48px] font-medium leading-tight">
                            {data.headline}
                        </h1>
                        <p className="text-[#D0D0D0] text-base md:text-lg mt-4 max-w-2xl">
                            {data.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-20 py-14 md:py-20 bg-[#050505]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {data.items.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-xl border border-[#222] bg-[#0d0d0d] p-6 md:p-8 hover:border-[#2C6BFF] transition"
                            >
                                <p className="text-sm text-[#8a8a8a] mb-2">{item.meta}</p>
                                <h2 className="text-xl md:text-2xl font-medium mb-3">{item.title}</h2>
                                <p className="text-[#D0D0D0] text-sm md:text-base leading-relaxed">
                                    {item.summary}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16 rounded-xl border border-[#1e3a8a] bg-[#0a1628] p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-medium mb-2">Ready to talk to our team?</h3>
                            <p className="text-[#D0D0D0] text-sm md:text-base max-w-xl">
                                This is placeholder content. Contact us for real openings, case studies, news, or white papers.
                            </p>
                        </div>
                        <Link
                            href="/contact-us/"
                            className="inline-flex items-center justify-center rounded-lg bg-[#2C6BFF] px-6 py-3 text-white font-medium hover:bg-[#2558d6] transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
