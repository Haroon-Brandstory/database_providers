"use client";
import Image from "next/image";

export default function WaterEffectSection() {
    return (
        <section className="relative h-[200px] md:h-[350px] w-full flex items-center justify-center overflow-hidden">
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
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-2xl md:text-4xl font-semibold text-white text-center mb-6">
                    Enhance your Business and Marketing efforts<br />
                    with a Data-Driven Strategy!
                </h2>
                <button className="mt-4 px-6 py-3 bg-white text-blue-700 font-medium rounded-full shadow-md hover:bg-blue-100 transition-all">
                    Get a free sample data
                </button>
            </div>
        </section>
    );
}
