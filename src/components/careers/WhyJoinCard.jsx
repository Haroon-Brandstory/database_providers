import Image from "next/image";

export default function WhyJoinCard({ title, description, image, variant = "narrow" }) {
    const hasImage = Boolean(image?.src);
    const isWide = variant === "wide";

    return (
        <article
            className={`relative overflow-hidden rounded-[20px] bg-[#f5f5f5] ${
                isWide ? "md:col-span-8" : "md:col-span-4"
            } ${hasImage ? "min-h-[260px] md:min-h-[280px]" : ""}`}
        >
            <div
                className={`relative z-10 h-full p-6 md:p-8 lg:p-10 ${
                    hasImage ? "md:max-w-[58%] lg:max-w-[55%]" : ""
                }`}
            >
                <h3 className="text-[#080808] text-xl md:text-[22px] lg:text-2xl font-medium leading-tight tracking-[-0.4px]">
                    {title}
                    {title && !title.trim().endsWith(":") ? ":" : ""}
                </h3>
                {description ? (
                    <p className="mt-3 md:mt-4 text-[#6d6d6d] text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                ) : null}
            </div>

            {hasImage ? (
                <div className="relative z-0 mt-4 flex justify-center md:mt-0 md:absolute md:inset-y-0 md:right-0 md:w-[48%] md:items-end md:justify-end pointer-events-none">
                    <Image
                        src={image.src}
                        alt={image.alt || ""}
                        width={image.width || 315}
                        height={image.height || 218}
                        className="h-auto w-[220px] sm:w-[260px] md:w-[90%] md:max-w-[320px] object-contain object-bottom translate-y-2 md:translate-y-4 md:translate-x-2"
                    />
                </div>
            ) : null}
        </article>
    );
}
