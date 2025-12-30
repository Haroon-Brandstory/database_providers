"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function CustomerReviewCarousel({ reviews,title }) {
  return (
    <section className="bg-black py-16">
      <div className="container-fluid">
        <h2 className="gradient-text text-4xl font-medium text-center mb-12">
          {title}
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation,Autoplay]}
            slidesPerView={1.2}
            centeredSlides
            spaceBetween={30}
            navigation={{
              nextEl: ".review-next",
              prevEl: ".review-prev",
            }}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3.5,
              },
            }}
            className=""
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`
                      transition-all duration-500 rounded-2xl p-8 h-full border border-[#264BD1]
                      ${isActive
                        ? "bg-[url('/pricing-plan/pricing-reviewBg.png')] bg-center bg-cover bg-no-repeat scale-100 opacity-100"
                        : "bg-[#020617] scale-90 opacity-40"
                      }
                    `}
                  >
                    {/* Quote Icon */}
                    <div className="text-blue-400 text-5xl mb-4 leading-none">
                      <Image src={"/pricing-plan/pricing-reviewCol.svg"} width={68} height={72} alt="review-col" />
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 md:text-[16px] text-[12px] leading-relaxed mb-6">
                      {review?.text}
                    </p>

                    {/* Author */}
                    <div className="mt-auto">
                      <p className="bg-[linear-gradient(19.53deg,#FFB045_-18.18%,#EE9432_-12.72%,#E07D21_-6.7%,#D76F17_-1.06%,#D46A14_3.79%,#D7731C_9.28%,#E08C32_18.34%,#EEB556_29.81%,#FFE581_41.49%,#FFE37B_71.33%,#FFB045_101.17%,#AF4800_131.01%)] bg-clip-text text-transparent text-sm font-medium">
                        {review?.name}
                      </p>
                      <p className="text-white text-xs">
                        {review?.company}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-8">
            <button className="review-prev text-blue-400 text-xl cursor-pointer">
              {'<'}
            </button>
            <button className="review-next text-blue-400 text-xl cursor-pointer">
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
