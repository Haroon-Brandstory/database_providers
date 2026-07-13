import Image from 'next/image';
import Link from 'next/link';

export default function CompanyMidBanner({
    companyName,
    title,
    description,
    buttonLabel = 'Learn More',
}) {
    const heading = title ?? `Unlock verified insights for ${companyName}`;
    const subtitle =
        description ??
        'Access decision-maker contacts, org structure, and growth signals with Database Providers.';

    return (
        <section className="relative overflow-hidden rounded-[24px]">
            <div className="relative min-h-[220px] md:min-h-[260px]">
                <Image
                    src="/company/cta-banner.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                />
                <div className="relative z-10 flex min-h-[220px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[260px]">
                    <h2 className="max-w-3xl text-[18px] font-regular text-white md:text-[28px]">
                        {heading}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] text-white/85 md:text-[16px]">
                        {subtitle}
                    </p>
                    <Link
                        href="/contact-us"
                        className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#0133E9] transition-opacity hover:opacity-90"
                    >
                        {buttonLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
