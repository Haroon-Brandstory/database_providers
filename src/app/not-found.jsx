"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function NotFound() {
    const router = useRouter();
    const oopsBallRef = useRef(null);
    const pageNotFoundBallRef = useRef(null);
    const orangeBallRef = useRef(null);

    useEffect(() => {
        // Bounce animation for oopsBall
        gsap.to(oopsBallRef.current, {
            y: -20,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.5,
        });

        // Float animation for pageNotFoundBall
        gsap.to(pageNotFoundBallRef.current, {
            y: -15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 2,
            delay: 0.5,
        });

        // Slow bounce for orangeBall
        gsap.to(orangeBallRef.current, {
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 2.5,
            delay: 1,
        });
    }, []);

    return (
        <section className="relative bg-[url('/about-us/aboutUsBannerBg.png')] bg-norepeat bg-center bg-cover text-white min-h-screen flex flex-col items-center justify-center px-4 md:px-20 pt-20  overflow-hidden pt-50">
            <div className="container h-full max-w-7xl mx-auto">
                <div className="space-y-10">
                    <div className="h-full relative">
                        <div ref={oopsBallRef} className="absolute -top-30 left-20 md:flex hidden">
                            <Image src='/404Red/oopsBall.png' width={142} height={142} alt="oops-Ball" />
                        </div>
                        <div className="imgWraper flex items-center justify-center">
                            <Image src='/404Red/404.png' width={500} height={257} alt="404" />
                        </div>
                        <div ref={pageNotFoundBallRef} className="absolute right-0 place-content-center bottom-0 md:flex hidden">
                            <Image src='/404Red/pageNotFoundBall.png' width={142} height={142} alt="pnf-img" />
                        </div>
                        <div ref={orangeBallRef} className="absolute left-0  -bottom-10 md:flex hidden">
                            <Image src='/404Red/orangeBall.png' width={80} height={80} alt="pnf-img" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href='/en'>
                            <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                                <span className="relative z-10">Go Back Home</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
