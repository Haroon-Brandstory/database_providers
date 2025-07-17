'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    company: 'DEMATIC',
    logo: '/testimonials/client-testi1.svg',
    name: 'Maya',
    position: 'Marketing analyst',
    content: 'By partnering with Database Providers, we made informed marketing decisions, leading to increased ROI. The industry-based segmentation data was refined and of great precision, which helped us connect with key personnel and gain a competitive advantage in our industry.'
  },
  {
    company: 'CISCO',
    logo: '/testimonials/client-testi2.svg',
    name: 'Raj',
    position: 'Sales Director',
    content: 'The quality of data provided by Database Providers has been instrumental in our B2B outreach. Their comprehensive database helped us identify and connect with decision-makers effectively, resulting in higher conversion rates.'
  },
  {
    company: 'ORACLE',
    logo: '/testimonials/client-testi3.svg',
    name: 'Aisha',
    position: 'Business Development Manager',
    content: 'Database Providers has been a game-changer for our lead generation efforts. Their accurate and up-to-date contact information helped us streamline our outreach process and achieve better results in our campaigns.'
  }
];

export default function SliderTestimonial() {
  const leftSwiperRef = useRef(null);
  const centerSwiperRef = useRef(null);
  const rightSwiperRef = useRef(null);

  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        centerSwiperRef.current?.swiper &&
        rightSwiperRef.current?.swiper
      ) {
        const centerSwiper = centerSwiperRef.current.swiper;
        const rightSwiper = rightSwiperRef.current.swiper;

        centerSwiper.controller.control = rightSwiper;
        rightSwiper.controller.control = centerSwiper;

        // Force update and restart autoplay
        centerSwiper.update();
        rightSwiper.update();
        if (centerSwiper.autoplay) centerSwiper.autoplay.start();
        if (rightSwiper.autoplay) rightSwiper.autoplay.start();
      }
    }, 100); // 100ms delay to ensure Swipers are initialized

    return () => clearTimeout(timer);
  }, []);


  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 flex flex-col justify-center">
          <h2 className="text-black text-[36px] font-medium mb-6">
            Client's Success <span className="text-[#00000080]">Stories</span>
          </h2>
        </div>
        <div className="relative max-w-6xl mx-auto bg-[#F6F6F6]">
          <div className="grid  grid-cols-1 bg-[#F6F6F6]  md:grid-cols-2 gap-0  rounded-2xl overflow-hidden shadow-md min-h-[420px]">
            {/* Left: 3x3 grid with two Swipers */}
            <div className="left-parent-wrapper">
              <div className="md:grid grid-cols-3 gap-1 h-full flex justify-center  items-center">
                <div className="leftMostSwiper hidden md:flex w-100% h-[420px] rounded-xl overflow-hidden">
                  <Swiper
                    direction="vertical"
                    loop={true}
                    slidesPerView={2.6}
                    autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
                    speed={900}
                    ref={leftSwiperRef}
                    className="w-full h-full"
                  >
                    {[...Array(5)].map((_, index) => (
                      <SwiperSlide key={index}>
                        <div className="bg-[#F6F6F6] w-full h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="centerSwiper w-full h-[420px] rounded-xl overflow-hidden flex flex-col items-center">
                  {/* Top dummy square */}
                  <div className="bg-[#F6F6F6] w-full mb-3 h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                  {/* Swiper */}
                  <Swiper
                    direction="vertical"
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    speed={900}
                    spaceBetween={10}
                    modules={[Autoplay, Controller]}
                    ref={centerSwiperRef}
                    className="w-full h-[180px]"
                  >
                    {testimonials.map((testimonial, index) => (
                      <SwiperSlide key={index}>
                        <div className="bg-[#E5ECFA] w-full h-[150px] rounded-lg flex items-center justify-center" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}>
                          <img src={testimonial.logo} alt={testimonial.company} className="w-16 h-16 object-contain" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Bottom dummy square */}
                  <div className="bg-[#F6F6F6] w-full mt-3 h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                </div>
                <div className="rightMostDummyArea w-100% hidden md:block overflow-hidden h-[420px]">
                  <div className="bg-[#F6F6F6] w-full mb-3 h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                  <div className="bg-[#F6F6F6] w-full mb-3 h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                  <div className="bg-[#F6F6F6] w-full h-[150px] rounded-lg" style={{ boxShadow: '0px 0px 4px 0px #00000040 inset' }}></div>
                </div>
              </div>
            </div>
            {/* Right: Testimonial content Swiper */}
            <div className="flex bg-[#F6F6F6] flex-col justify-center h-[420px] px-8 py-6 bg-[#F6F6F6] w-full">
              <Swiper
                direction="vertical"
                loop={true}
                speed={900}
                modules={[Autoplay, Controller]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                ref={rightSwiperRef}
                className="w-full h-full "
              >
                {testimonials.map((testimonial, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col justify-center h-full">
                      <p className="text-gray-700 mb-8 text-lg leading-relaxed">{testimonial.content}</p>
                      <div>
                        <h4 className="text-blue-600 font-bold text-xl mb-1">{testimonial.name}</h4>
                        <p className="text-blue-500 text-base mb-2">{testimonial.position}</p>
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