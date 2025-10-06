import Image from "next/image";
import Link from "next/link";

export default function CusContactSection() {
    return (
        <section className="bg-white py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="relative p-6">
                    <div className="absolute inset-0 w-full h-full z-0 ">
                        <Image
                            src="/whychooseus/hover-bg.svg"
                            alt="Background"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            className="rounded"
                        />
                    </div>
                    <div className="relative z-10 p-8 my-10 lg:p-0 flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-[18px] md:text-4xl font-semibold text-white text-center md:mb-6 mb-2 flex justify-center items-center ">
                            <span><Image src='/header/locationMarker.svg' width={42} height={42} alt="marker-location" /></span> USA
                        </h2>
                        <p className="text-white max-w-3xl lg:text-[24px] text-[18px] text-center mb-3">39109 Guardino Dr, Fremont, <br />
                            CA - 94538.</p>
                        <Link href='#'>
                            <button className="md:mt-4 md:px-6 cursor-pointer px-6 text-[12px] md:text-[18px] py-2 bg-white text-blue-700 font-medium rounded-full shadow-md hover:bg-blue-100 transition-all">
                                Send mail
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}