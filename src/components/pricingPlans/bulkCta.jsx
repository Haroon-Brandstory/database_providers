"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BulkCta({content}) {

    const pulseRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.2,
        });

        tl.to(pulseRef.current, {
            scale: 1.07,
            duration: 0.25,
            ease: "power2.out",
        })
            .to(pulseRef.current, {
                scale: 1,
                duration: 0.25,
                ease: "power2.in",
            })
            .to(pulseRef.current, {
                scale: 1.07,
                duration: 0.25,
                ease: "power2.out",
            })
            .to(pulseRef.current, {
                scale: 1,
                duration: 0.25,
                ease: "power2.inOut",
            });

        return () => tl.kill();
    }, []);

    return (
        <>
            <section className="banner bg-[url('/pricing-plan/bulkCta.png')]  bg-no-repeat bg-cover bg-center py-30 min-h-[90vh] flex items-center justify-center">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                    <div className="lg:mb-6 mb-4">
                        <h2 className="lg:text-5xl text-4xl font-medium text-center" dangerouslySetInnerHTML={{__html:content?.title}}/>
                    </div>
                    <div className="flex flex-col lg:mb-6 mb-4 items-center justify-center">
                        <p className="text-[#FCFCFD] text-center lg:max-w-2xl md:text-[18px] text-[15px]">{content?.description}</p>
                    </div>
                    <div className="lg:mb-6 mb-4">
                        <Link href={'/contact-us'}>
                            <button className="btn bg-white rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-out px-6 py-3 text-black">
                                {content?.cta}
                            </button>
                        </Link>
                    </div>
                    <div className="mt-5">
                        <Image ref={pulseRef} src={'/pricing-plan/db_bubble.png'} width={120} height={120} alt="db bubble" />
                    </div>
                </div>
            </section>
        </>
    );
}