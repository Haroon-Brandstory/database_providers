"use client";
import Image from "next/image";
import { useState } from "react";

export default function AbmCta() {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle submit logic here
        console.log(email);
    };

    return (
        <>
            <section className="banner bg-[url('/pricing-plan/bulkCta.png')]  bg-no-repeat bg-cover bg-center py-30 md:min-h-[80vh] flex items-center justify-center">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                    <div className="lg:mb-6 mb-4">
                        <h2 className="lg:text-5xl text-4xl font-medium text-center">Try Bookyourdata with 10 Free Credits, <span className="gradient-text"><br />No Credit Card Required.</span></h2>
                    </div>
                    <div className="flex flex-col lg:mb-6 mb-4 items-center justify-center">
                        <p className="text-[#FCFCFD] text-center lg:max-w-2xl md:text-[18px] text-[15px]">No subscription commitments or mandatory demos. Discover the power of 97% accurate, laser-targeted data on your terms.</p>
                    </div>
                    <div className="lg:mb-10 mb-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="w-full max-w-4xl flex items-center md:gap-5  bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2  py-1">
                                <input
                                    type="email"
                                    placeholder="Enter Your Mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent text-white placeholder:text-white/60 px-4 py-3 outline-none text-sm"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="bg-white text-[#14204b] lg:text-[12px] text-[10px] cursor-pointer font-medium lg:px-6 px-3 py-3 rounded-full text-sm hover:bg-gray-100 transition"
                                >
                                    Get 10 Free Leads
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        <div className="flex gap-2 items-center justify-center">
                            <Image src={'/pricing-plan/abm-feature1.svg'} width={24} height={24} alt="db bubble" />
                            <p>Pay as you go</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <Image src={'/pricing-plan/abm-feature2.svg'} width={24} height={24} alt="db bubble" />
                            <p>Real-time email verification</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <Image src={'/pricing-plan/abm-feature3.svg'} width={24} height={24} alt="db bubble" />
                            <p>97% data accuracy</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}