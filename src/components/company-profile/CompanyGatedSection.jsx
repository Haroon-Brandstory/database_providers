import Link from 'next/link';

export default function CompanyGatedSection({
    title,
    children,
    ctaTitle = 'View Company Growth Data',
    ctaLabel = 'Get Full Access',
    minHeight = '300px',
}) {
    return (
        <section className="overflow-hidden rounded-[20px] bg-white p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.1)] md:p-8">
            <h2 className="mb-6 text-[18px] font-regular text-[#111827] md:text-[28px]">{title}</h2>
            <div className="relative overflow-hidden rounded-[16px] border border-[#EEF2F8]" style={{ minHeight }}>
                <div className="pointer-events-none select-none" style={{ filter: 'blur(5px)' }}>
                    {children}
                </div>
                <div className="absolute inset-0 bg-white/45" aria-hidden="true" />
                <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
                    <div className="rounded-[16px] border border-[#D6E4FF] bg-[#F4F8FF]/95 px-10 py-6 text-center shadow-[0_8px_30px_rgba(1,51,233,0.1)]">
                        {ctaTitle ? (
                            <p className="text-[16px] font-medium text-[#111827] md:text-[18px]">
                                {ctaTitle}
                            </p>
                        ) : null}
                        <Link
                            href="/contact-us"
                            className={`inline-flex rounded-lg bg-[#1798FF] px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${ctaTitle ? 'mt-4' : ''}`}
                        >
                            {ctaLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
