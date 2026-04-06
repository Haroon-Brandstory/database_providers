import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";

export default function EmailMarket({ section }) {
    const { title, description, buttonLabel, bgImage, buttonUrl } = section;
    const titleAss = title || "Start Your Email Marketing Journey";
    const descriptionAss = description || "Build high-performing email campaigns that engage, convert, and retain your audience.";
    const buttonText = buttonLabel || "Get Started";
    const imageUrl = bgImage?.url || "/blog/email-journeyBg.png";

    return (
        <section
            className="relative w-full rounded-[28px] overflow-hidden bg-cover bg-center md:px-16 md:py-16 px-8 py-10 my-12 shadow-2xl transition-transform duration-300"
            style={{ backgroundImage: `url('${imageUrl}')` }}
        >
            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl text-center md:text-left">
                    <h2 className="text-[20px] md:text-[24px] font-[500] text-white mb-6 leading-tight tracking-tight">
                        {titleAss}
                    </h2>
                    <div className="text-white/90 text-[13px] md:text-[15px] font-medium leading-relaxed max-w-lg">
                        <BlocksRenderer content={descriptionAss} />
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Link href={buttonUrl}>
                        <button className="bg-white text-[#2C6BFF] px-10 py-4 cursor-pointer rounded-full font-regular text-xl hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.3)]">
                            {buttonText}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}