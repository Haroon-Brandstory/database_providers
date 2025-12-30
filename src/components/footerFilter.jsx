"use client";
import { useNavHref } from "@/hooks/useNavHref";
import Image from "next/image";
import Link from "next/link";

export default function FooterFilter() {
    const { navHref } = useNavHref();
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 pointer-events-none rounded-[20px] bg-[radial-gradient(ellipse_at_center,rgba(0, 0, 0, 0.02)_40%,rgba(0,0,0,0.6)_100%)]">
                </div>
                <div className="container px-2">
                    <div className="max-w-7xl bg-[url('/footer/footerFilterBg.png')] bg-center bg-cover bg-norepeat mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-[#222] py-18">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <div className="flex  md:flex-nowrap flex-wrap rounded-[8px] overflow-hidden backdrop-blur-[7px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(219,229,255,0.1)_100%),linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))] border border-transparent  border-[1px]  [border-image-source:linear-gradient(243.14deg,rgba(255,255,255,0.3)_-106.31%,rgba(21,45,103,0.3)_84.25%)]  border-image-slice-[1]">
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-medium mb-2">Customise Your <span className="text-[#5673F6]">Database</span></h3>
                                        <p className="text-[#D0D0D0]">Advanced Search made simple Filter Deeper, Work Smarter.</p>
                                    </div>
                                    <div>
                                        <Link href={navHref("/contact-us")}>
                                            <button className="header_cta_contact">
                                                {/* {t("nav.contact", { defaultMessage: "Contact Us" })} */}
                                                Start Filtering
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Image src='/footer/custom-database.svg' width={296} height={190} alt="img" />
                                </div>
                            </div>
                            <div className="flex md:flex-nowrap flex-wrap justify-end md:justify-center rounded-[8px] overflow-hidden backdrop-blur-[7px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(219,229,255,0.1)_100%),linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))] border border-transparent  border-[1px]  [border-image-source:linear-gradient(243.14deg,rgba(255,255,255,0.3)_-106.31%,rgba(21,45,103,0.3)_84.25%)]  border-image-slice-[1]">
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-medium mb-2">Customise Your <span className="text-[#5673F6]">Database</span></h3>
                                        <p className="text-[#D0D0D0]">From data to delivery a complete 360° Marketing solution</p>
                                    </div>
                                    <div>
                                        <Link href={"/pricing-plans"}>
                                            <button className="header_cta_contact">
                                                {/* {t("nav.contact", { defaultMessage: "Contact Us" })} */}
                                                See Pricing
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src='/footer/integrated-marketing.svg' width={250} height={212} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}