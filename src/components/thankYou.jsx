"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BannerThankYou() {
    const socialLinks = [
        { href: "#", src: "/thankYou/tk-linkedin.svg", alt: "LinkedIn" },
        { href: "#", src: "/thankYou/tk-fb.svg", alt: "Facebook" },
        { href: "#", src: "/thankYou/tk-x.svg", alt: "X" },
        { href: "#", src: "/thankYou/tk-ig.svg", alt: "Instagram" },
        { href: "#", src: "/thankYou/tk-yt.svg", alt: "YouTube" },
    ];

    const imgRefs = useRef([]);

    useEffect(() => {
        // Clear previous refs
        imgRefs.current = imgRefs.current.slice(0, 3);

        // GSAP timeline
        const tl = gsap.timeline({ repeat: -1, defaults: { y: 0 } });

        // Animate each image alternately
        imgRefs.current.forEach((img, i) => {
            tl.to(img, { y: -20, duration: 0.3, ease: "power1.out" }, i * 0.2)
                .to(img, { y: 0, duration: 0.3, ease: "power1.in" }, i * 0.2 + 0.3);
        });
    }, []);

    return (
        <section className="bg-white text-black flex flex-col items-center justify-center px-6 pt-20 pb-20 overflow-hidden pt-40">
            <div className="container max-w-7xl mx-auto flex items-center justify-center">
                <div className="space-y-3">
                    <div className="flex justify-center lg:gap-4">
                        {/* <Image src="/thankYou/pinkMail.svg" alt="mail icon" width={310} height={70} /> */}
                        <Image  ref={(el) => (imgRefs.current[0] = el)} src="/thankYou/pinkMail-ind1.svg" alt="mail icon" width={110} height={70} />
                        <Image  ref={(el) => (imgRefs.current[1] = el)} src="/thankYou/pinkMail-ind2.svg" alt="mail icon" width={100} height={70} />
                        <Image  ref={(el) => (imgRefs.current[2] = el)} src="/thankYou/pinkMail-ind3.svg" alt="mail icon" width={105} height={70} />
                    </div>
                    <h1
                        className="md:text-[96px] text-[50px] text-center font-bold text-transparent bg-clip-text"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #1798FF 0.03%, #264BD1 100.05%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Thank You!
                    </h1>
                    <p className="text-gray-600 text-center">
                        Your message has been sent. We'll be in touch shortly to answer all your questions!
                    </p>

                    <p className="text-sm text-gray-500 text-center">Like and share us on social media</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        {socialLinks.map((social, index) => (
                            <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition">
                                    <Image src={social.src} alt={social.alt} width={24} height={24} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}