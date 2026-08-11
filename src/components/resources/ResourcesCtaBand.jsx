import Link from "next/link";

export default function ResourcesCtaBand() {
    return (
        <section
            className="py-16 md:py-20 text-center bg-[#0B1020] bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('/whychooseus/hover-bg.svg'), linear-gradient(135deg, #0B1020 0%, #0a1a4a 100%)",
            }}
        >
            <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                <h2 className="text-white text-2xl md:text-4xl font-medium mb-4">
                    Empower Your Business with Smart Data Solutions
                </h2>
                <p className="text-white/90 max-w-[700px] mx-auto mb-2 text-sm md:text-base leading-relaxed">
                    Unlock the power of precision-driven data to reach the right audience, at the
                    right time. Our targeted U.S. and global B2B databases help you connect with
                    decision-makers that matter.
                </p>
                <Link
                    href="/contact-us/"
                    className="inline-flex items-center justify-center mt-5 rounded-lg bg-[#2C6BFF] px-6 py-3 text-white font-medium hover:bg-[#2558d6] transition"
                >
                    Let’s Talk
                </Link>
            </div>
        </section>
    );
}
