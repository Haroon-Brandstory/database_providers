'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useTranslations } from 'next-intl';


function ServiceCard({ icon, title, description }) {
    return (
        <div className='p-4 bg-[#0032A866] backdrop-blur-sm flex rounded-2xl'>
            <div className="bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col justify-between items-center text-center min-h-[340px] w-auto border-4 border-transparent swiper-slide-active:border-[#2C6BFF] transition-all duration-300">
                <div className="mb-4">
                    <Image src={icon} alt={title} width={56} height={56} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                </div>
                <div>
                    <p className="text-gray-600 md:text-[14px] text-[12px]  text-base mb-6">{description}</p>
                </div>
                <hr className="w-full border-t border-[#C4C4C4] mb-4" />
                <div>
                    <a href="#">
                        <span className="text-[#2C6BFF] font-medium cursor-pointer flex items-center gap-1 select-none">
                            Know More <span aria-hidden>→</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function ServiceSection() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const t = useTranslations();

    const services = [
        {
            icon: "/servicesection/service_testi_icon1.svg",
            title: t('home.section4.data1.title'),
            description: t('home.section4.data1.description')
        },
        {
            icon: "/servicesection/service_testi_icon2.svg",
            title: t('home.section4.data2.title'),
            description: t('home.section4.data2.description')
        },
        {
            icon: "/servicesection/service_testi_icon3.svg",
            title: t('home.section4.data3.title'),
            description: t('home.section4.data3.description')
        }
    ];

    return (
        <section className="py-20 px-4 md:px-20 bg-[url('/servicesection/sevice_banner.png')] overflow-hidden bg-center bg-cover">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-10">
                    <div className="text-start max-w-4xl flex flex-col justify-center">
                        <h5 className="text-[#2C6BFF] text-[16px] font-medium">Services</h5>
                        <h2 className="text-white lg:text-[36px] text-[28px] font-medium mb-6">
                            {(() => {
                                const heading = t('home.section4.sectionHeading');
                                const words = heading.split(' ');
                                const lastThree = words.slice(-3).join(' ');
                                const firstPart = words.slice(0, -3).join(' ');

                                return (
                                    <>
                                        {firstPart}
                                        <span className="block">
                                            <span className="text-[#5673F6]">{lastThree}</span>
                                        </span>
                                    </>
                                );
                            })()}
                        </h2>
                        <p className="text-[#D0D0D0] text-[16px] font-light w-[90%]">
                            {t('home.section4.sectionPara')}
                        </p>
                    </div>
                    <div className="text-start flex flex-col items-center justify-center">
                        <Swiper
                            effect="cards"
                            grabCursor={true}
                            centeredSlides={true}
                            modules={[EffectCards, Navigation]}
                            className="mySwiperServices w-[260px] m-[0px] md:m-auto h-[400px] md:w-[300px] md:h-[400px] self-center"
                            onInit={(swiper) => {
                                setTimeout(() => {
                                    if (swiper.params && swiper.params.navigation) {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                });
                            }}>
                            {services.map((service, idx) => (
                                <SwiperSlide key={idx} style={{ display: "flex" }}>
                                    <ServiceCard {...service} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="flex justify-center mt-6 gap-2">
                            <button ref={prevRef} className="custom-swiper-prev cursor-pointer bg-[#2C6BFF] rounded-l-xl px-2 py-2 focus:outline-none">
                                <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button ref={nextRef} className="custom-swiper-next cursor-pointer bg-[#2C6BFF] rounded-r-xl px-2 py-2 focus:outline-none">
                                <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="1"><path d="M9 6l6 6-6 6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
