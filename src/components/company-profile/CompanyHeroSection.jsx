import Image from 'next/image';
import CompanyBannerCard from './CompanyBannerCard';

export default function CompanyHeroSection({ company, previewText, fullText }) {
    return (
        <section className="relative bg-[#F4F6FA]">
            {/* Banner as background band — does not push page height on its own */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[200px] sm:h-[280px] lg:h-[360px]"
            >
                <Image
                    src="/company/companyPg_banner.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Card starts lower into the banner; less empty space on mobile */}
            <div className="container relative z-10 mx-auto w-full px-4 pt-[88px] sm:px-6 sm:pt-[120px] lg:pt-[160px]">
                <CompanyBannerCard
                    company={company}
                    previewText={previewText}
                    fullText={fullText}
                />
            </div>
        </section>
    );
}
