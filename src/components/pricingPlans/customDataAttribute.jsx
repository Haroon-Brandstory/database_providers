"use client";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef } from "react";
import gsap from "gsap";

const dataAttributes = [
    "First Name",
    "Last Name",
    "Company Linkedin URL",
    "Email",
    "Company Country",
    "Company Name",
]

export default function CustomDataAttribute() {

    const imgRef = useRef(null);

    useEffect(() => {
        gsap.to(imgRef.current, {
            scale: 1.03,
            y: -6,
            duration: 1.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });

    }, [])

    return (
        <>
            <section className="bg-black py-4">
                <div className="container mx-auto px-6">
                    <div className="bg-[url('/pricing-plan/dataAttributeSectionBg.png')] lg:rounded-[30px] rounded-[15px] bg-cover bg-no-repeat bg-center rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-[35%_64%]">
                            <div className="flex justify-center items-end overflow-hidden">
                                <Image ref={imgRef} src={"/pricing-plan/coin_tower.svg"} width={259} height={424} alt="coin-tower" className="lg:rotate-[0deg] rotate-[180deg]" />
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="p-4 flex flex-col items-center justify-center gap-4">
                                    <div>
                                        <h2 className="text-white lg:text-4xl text-2xl font-medium text-center">What Data Attributes Does <span className="md:block gradient-text">Each Contact Have?</span></h2>
                                    </div>
                                    <div>
                                        <Swiper
                                            direction={'vertical'}
                                            autoplay={true}
                                            slidesPerView={3.75}
                                            spaceBetween={15}
                                            freeMode={true}
                                            className="mySwiper h-[224px] fade-edges"
                                        >
                                            {
                                                dataAttributes.map((attributes, index) => (
                                                    <SwiperSlide key={index} style={{ display: "flex" }} className="flex items-center justify-center">
                                                        <div className="border w-fit rounded-full text-center cursor-pointer px-4 py-3 flex items-center justify-center">
                                                            {attributes}
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
