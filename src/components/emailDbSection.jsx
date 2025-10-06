"use client";
import Image from "next/image";
import Link from "next/link";

export default function EmailDatabaseSection({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    return (
        <section className="w-full bg-[#0a0f1e] text-white bg-[url(/servicesection/bgBannerBusiness.png)] lg:bg-right bg-bottom-right bg-norepeat bg-cover">
            <div className="container-fluid">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-end">
                        <Image
                            src={STRAPI_URL + data.sectionImage.url}
                            alt="Business Professional"
                            width={800}
                            height={537}
                            className="z-10"
                        />
                    </div>
                    <div className="flex flex-col justify-center py-16 md:px-8 px-4 max-w-3xl">
                        <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] bg-cover opacity-30 -z-10"></div>
                        <h2 className="text-2xl md:text-[36px] font-medium leading-snug mb-6">
                            {data.sectionTitle}
                        </h2>
                        <p className="text-[#D0D0D0] text-[16px] leading-relaxed mb-8">
                            {data.sectionPara}
                        </p>
                        <ul className="mb-8" style={{ listStyle: "disc", paddingLeft: "20px" }}>
                            {Array.isArray(data?.features) && data?.features?.length > 0
                                ? data?.features.map((item, index) => (
                                    <li className="text-[#D0D0D0] text-[16px]" key={index}>{item}</li>
                                ))
                                : null}
                        </ul>
                        {data.button && (
                            <Link href={data.button.buttonURL}>
                                <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                                    <span className="relative z-10">{data.button.buttonLabel}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
