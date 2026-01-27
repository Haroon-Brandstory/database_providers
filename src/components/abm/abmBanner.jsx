"use client"
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import animationData from "@/animations/abm-banner-lottie.json"

export default function AbmBanner() {
    return (
        <section className="bg-[#264BD1] lg:min-h-[100vh] min-h-[80vh] transition-all ease-in-out lg:pt-40 pt-20 pb-10 flex items-center justify-center">
            <div className="container max-w-7xl px-4">
                {/* <div>
                    <div className="flex items-center justify-center">
                        <div className="backdrop-blur-md bg-[#4466DE] flex items-center justify-center py-2 px-3 rounded-[20px]">
                            <Image src={"/abm/Trust-Pilot-Micro-Star.svg"} width={173} height={24} alt="trust pilot image" />
                        </div>
                    </div>
                </div> */}
                <div className="flex items-center justify-center mt-6">
                    <h1 className="lg:text-7xl text-2xl text-white font-regular">Account-Based Marketing</h1>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <div className="max-w-2xl">
                        <p className="lg:text-[18px] text-[16px] text-center text-[#D5D8DD]">Activate High-Value Growth With Account-Based Marketing Target and Convert Your Most Valuable Accounts With Precision and Intelligence</p>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-10 lg:gap-5 flex-wrap md:flex-row gap-4 flex-col">
                    <div>
                        <Link href={"/contact-us/"}>
                            <button className="btn bg-[#1798FF] text-white lg:text-[16px] text-[12px] font-semibold lg:py-4 py-2 lg:px-6 px-4 hover:scale-[1.045] transition-all ease-in lg:rounded-[10px] rounded-[5px] cursor-pointer">
                                Start Your ABM Program
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link href={"/pricing-plans?query=abm"}>
                            <button className="btn bg-[#4466DE] text-white lg:text-[16px] text-[12px] font-semibold lg:py-4 py-2 lg:px-16 px-10 hover:scale-[1.045] transition-all ease-in lg:rounded-[10px] rounded-[5px] cursor-pointer">
                                See Pricing
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Lottie loop animationData={animationData} />
                    </div>
                </div>
            </div>
        </section>
    );
}