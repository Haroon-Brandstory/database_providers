import Image from "next/image";

export default function CareersHero({ title, description, image }) {
    return (
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#002aad_0%,_#001888_25%,_#001863_50%,_#000f3e_75%,_#000619_100%)] text-white pt-28 md:pt-36 pb-0">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-[32px] sm:text-[44px] md:text-[64px] lg:text-[76px] font-normal leading-[1.1] tracking-[-1.5px] md:tracking-[-3px]">
                        {title}
                    </h1>
                    {description ? (
                        <p className="mt-5 md:mt-7 mx-auto max-w-2xl text-[#d5d8dd] text-base md:text-lg leading-relaxed">
                            {description}
                        </p>
                    ) : null}
                </div>

                {image?.src ? (
                    <div className="relative mx-auto mt-8 md:mt-12 max-w-5xl">
                        <Image
                            src={image.src}
                            alt={image.alt || ""}
                            width={image.width || 1024}
                            height={image.height || 364}
                            className="w-full h-auto object-contain mix-blend-lighten"
                            priority
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
