import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function LaunchAbm() {
    return (
        <section className="bg-white py-15">
            <div className="container mx-auto px-4 max-w-7xl flex items-center justify-center">
                <div className="bg-[url('/abm/launch-abm-engine.png')] p-10 bg-center bg-cover bg-norepeat w-full flex flex-col items-center justify-center py-30 lg:rounded-[20px] rounded-[10px]">
                    <h2 className="text-center lg:text-5xl text-2xl text-white">Ready to Launch Your ABM Engine?</h2>
                    <div className="mt-8">
                        <Link href={'/contact-us/'}>
                            <button className="bg-white lg:p-4 px-3 py-2 rounded text-[#1798FF] lg:text-[18px] text-[12px] flex gap-3 items-center justify-center cursor-pointer">
                                Start Your ABM Strategy Call <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}