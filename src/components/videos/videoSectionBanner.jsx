"use client"
import { useNavHref } from "@/hooks/useNavHref";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function YtVideoSectionBanner() {

    const t = useTranslations('videos');
    const { navHref } = useNavHref();

    return (
        <section className="bg-[url('/blog/blogListingBanner.png')] bg-center bg-cover bg-norepeat text-white  flex flex-col items-center justify-center px-4 md:px-20 pt-20 pb-10 overflow-hidden pt-30">
            <div className="container max-w-7xl mx-auto flex justify-start items-center ">
                <div className="h-[450px] flex items-start flex-col justify-center">
                    <h1 className="text-white text-[48px]  font-medium text-[34px]">{t('section1.title')}</h1>
                    <p className="text-white text-[18px] mb-6">{t('section1.description')}</p>
                    <Link href={navHref('/contact-us')}>
                        <button className="relative gtm-button text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                            <span className="relative z-10">Let’s Talk</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}