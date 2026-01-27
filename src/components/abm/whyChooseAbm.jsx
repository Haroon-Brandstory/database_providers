import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function WhyChooseAbm({ content }) {
    return (
        <section className="bg-white lg:py-20 pt-5 pb-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <div>
                    <div className="flex justify-center flex-col items-center">
                        <div className="bg-[#F5F5F5] mb-2 text-[#6D6D6D] px-4 backdrop-blur-md py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                            {"Why Choose Database Providers as Your ABM Partner?"}
                        </div>
                        <div className="max-w-5xl">
                            <h2 className="lg:text-5xl text-xl font-medium lg:leading-14 text-center text-black mb-4">{"Verified Data, Precision Targeting, and Personalization That Drives ABM Success"}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F5F5F5] ">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div className="lg:py-15 pt-15 pb-5">
                            <div>
                                <p className="text-[#6D6D6D] md:text-[16px] text-[14px]">
                                    We provide verified B2B email data, accurate decision-makers' insights, and advanced targeting for every ABM program.   Our ABM specialists handle segmentation, personalization, and full-funnel activation across all stages of the sales cycle.
                                    <br /><br />
                                    With premium deliverability and multi-channel workflows, your message reaches the right buyers at the right time. You get transparency, measurable results, and a partner focused on real revenue outcomes through Account-based marketing (ABM) and key account marketing excellence.
                                </p>
                            </div>
                            <div className="mt-5">
                                <Link href={"/pricing-plan/?query=abm"}>
                                    <button className="btn bg-[#1798FF] text-white lg:text-[16px] flex items-center justify-center gap-2 text-[12px] font-semibold lg:py-4 py-2 lg:px-6 px-4 hover:scale-[1.045] transition-all ease-in lg:rounded-[10px] rounded-[5px] cursor-pointer">
                                        See Pricing <FaArrowRight />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-end flex-col">
                            <Image src={"/abm/why-choose-sec-globe.png"} width={670} height={406} alt="Globe"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}