import Image from 'next/image';
import CompanyBannerCard from './CompanyBannerCard';

export default function CompanyHeroSection({ company, previewText, fullText }) {
    return (
        <section className="bg-[#F4F6FA]">
            {/* Full-width banner below site header */}
            <div className="relative h-[560px] w-full sm:h-[300px] lg:h-[620px]">
                <Image
                    src="/company/companyPg_banner.png"
                    alt=""
                    fill
                    priority="high"
                    className="object-cover object-center"
                />
            </div>

            {/*
              Card overlaps bottom ~45% of banner (matches reference):
              banner 320px → card starts ~145px from banner top
            */}
            <div className="container relative z-10 mx-auto w-full -mt-[116px] px-4 sm:-mt-[132px] md:px-6 lg:-mt-[378px]">
                <CompanyBannerCard
                    company={company}
                    previewText={previewText}
                    fullText={fullText}
                />
            </div>
        </section>
    );
}
