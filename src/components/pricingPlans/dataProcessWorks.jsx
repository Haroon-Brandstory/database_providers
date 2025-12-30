"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";

export default function DataProcessWorks({ steps, title }) {
    const [iconSwiper, setIconSwiper] = useState(null);
    const [contentSwiper, setContentSwiper] = useState(null);

    return (
        <section className="bg-[url('/pricing-plan/how-data-process-works.png')] bg-cover bg-center bg-no-repeat py-8">
            <div className="container mx-auto px-6">
                <div>
                    <h2 className="gradient-text capitalize text-4xl font-medium text-center mt-12">
                       {title}
                    </h2>
                </div>
                <div>
                    <div className="relative  rounded-2xl overflow-hidden">
                        <div className="lg:py-30 md:py-20 py-10">
                            <Swiper
                                modules={[Controller, Autoplay]}
                                onSwiper={setIconSwiper}
                                controller={{ control: contentSwiper }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 5,
                                    },
                                }}
                                normalizeSlideIndex
                                centeredSlides
                                spaceBetween={48}
                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                slideToClickedSlide
                                watchSlidesProgress
                                className="max-w-4xl mx-auto z-30"
                            >
                                {steps.map((step, index) => (
                                    <SwiperSlide key={index}>
                                        {({ isActive }) => (
                                            <div
                                                className={`flex justify-center items-center md:h-[200px] h-[150px] w-auto mb-3 transition-all duration-500 `}
                                            >
                                                <Image
                                                    src={step.icon}
                                                    width={150}
                                                    height={150}
                                                    alt={step.title}
                                                    className={`flex cursor-pointer items-center justify-center rounded-full w-auto transition-all duration-500 
                                                ${isActive ? "scale-110 shadow-[0_0_40px_#2563eb]" : "bg-blue-900/40 opacity-50 scale-50"}`}
                                                />
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="relative flex justify-center my-4 bg-transparent">
                                <div className="w-[2px] h-20 bg-gradient-to-b from-blue-500 to-transparent" />
                                <div className="absolute top-0 w-4 h-4 rounded-full bg-blue-500" />
                            </div>

                            <Swiper
                                modules={[Controller]}
                                onSwiper={setContentSwiper}
                                controller={{ control: iconSwiper }}
                                slidesPerView={1}
                                spaceBetween={30}
                                // allowTouchMove={false}
                                className="max-w-xl mx-auto "
                                watchSlidesProgress
                                normalizeSlideIndex
                            >
                                {steps.map((step, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="backdrop-blur-[10px] bg-[#00000029] border border-blue-600/50 rounded-[20px] py-12 px-4 mx-2">
                                            <div className="text-center transition-all duration-500">
                                                {/* <span className="inline-block text-xs px-4 py-1 mb-3 rounded-full bg-blue-900/40 text-blue-300">
                                                    
                                                </span> */}
                                                <div className="backdrop-blur-[24px] inline-block border-gray-700 bg-[#15151766] border w-fit rounded-full px-4 py-1 mb-3 shadow-[0_4px_16px_0_rgba(0,0,0,0.4)]">
                                                    <p className="font-medium bg-[linear-gradient(19.53deg,#FFB045_-18.18%,#EE9432_-12.72%,#E07D21_-6.7%,#D76F17_-1.06%,#D46A14_3.79%,#D7731C_9.28%,#E08C32_18.34%,#EEB556_29.81%,#FFE581_41.49%,#FFE37B_71.33%,#FFB045_101.17%,#AF4800_131.01%)] bg-clip-text text-transparent md:text-[15px] text-[10px]">Step {index + 1}</p>
                                                </div>

                                                <h3 className="md:text-3xl text-xl gradient-text mb-3">
                                                    {step.title}
                                                </h3>

                                                <p className="text-gray-300 lg:px-12 md:text-[16px] text-sm leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
