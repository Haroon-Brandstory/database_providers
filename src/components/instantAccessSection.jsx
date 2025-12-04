"use client";
import { useNavHref } from "@/hooks/useNavHref";
import Image from "next/image";
import Link from "next/link";

export default function InstantAccessSection({ data }) {
    const { navHref } = useNavHref();
    return (
        <section className="relative h-[320px] md:h-[350px]  w-full flex items-center justify-center overflow-hidden">
            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/whychooseus/hover-bg.svg"
                    alt="Background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            {/* Content */}
            <div className="relative z-10 p-8 my-10 lg:p-0 flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-[18px] lg:text-[36px]  font-semibold text-white text-center md:mb-6 mb-2">
                    {data.sectionTitle}
                </h2>
                <p className="text-white max-w-3xl text-center mb-3">{data.sectionDescription}</p>
                <Link href={navHref(data.button.buttonURL)}>
                    <button className="md:mt-4 md:px-6 cursor-pointer px-6 text-[12px] md:text-[18px] py-2 bg-white text-blue-700 font-medium rounded-full shadow-md hover:bg-blue-100 transition-all">
                        {data.button.buttonLabel}
                    </button>
                </Link>
            </div>
        </section>
    );
}
