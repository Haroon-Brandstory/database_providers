"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function TestimonialAbout() {

    const testimonialContent = [
        {
            rating: 4,
            comments: "If your company's not talking to potential customers, then you are lacking behind generating revenue. But if you start working with Database Providers who target only potential customers, then you can easily achieve your sales goals just like we did. Their data helped us reach the right insurance claim professionals, which was key to growing Prema Consulting Group’s forensic engineering services.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Steve Pignotti",
            reviewerDesignation: "Chief Growth Officer"
        },
        {
            rating: 3,
            comments: "B2B global database is hard to reach but with Database Providers it was really easy. We reached 32% of our sales goals within the first month. Their support with BFSI and government tech decision-maker data in UAE and Saudi Arabia gave SquareOne the edge we needed in a competitive market.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Minosh Salam",
            reviewerDesignation: "Chief Operating Officer"
        },
        {
            rating: 5,
            comments: "Reaching the right UHNI buyers in Chennai was a challenge until we partnered with Database Providers. Their data was spot on. Within just one month, we saw a 3.2X increase in high-intent enquiries and a 48% improvement in our lead-to-site-visit ratio. It gave our outreach the precision it needed.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Shiny VR",
            reviewerDesignation: "Sourcing Manager"
        },
        {
            rating: 4,
            comments: "We were struggling to connect with the right people in supply chain and warehouse management. After partnering with Database Providers, we saw a 3.5X jump in demo requests and a 60% increase in qualified leads within the first month. Their database gave our outreach the exact push it needed.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Maya",
            reviewerDesignation: "Marketing Analyst"
        },
    ];

    // Function to render stars dynamically
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i - rating < 1) {
                stars.push(<span key={i} className="text-yellow-400">☆</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        return stars;
    }

    return (
        <section className="bg-white lg:py-32 py-16 px-6 flex items-center justify-center">
            <div className="container">
                <h2 className="text-black lg:text-[36px] text-[26px] font-medium text-center mb-12">
                    Client <span className="text-[#00000080]">Reviews</span>
                </h2>
                <Swiper
                    style={{ paddingBottom: "20px" }}
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    // centeredSlides={true}          
                    spaceBetween={30}
                    slidesPerView={1.5}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1.2, spaceBetween: 20 },
                        768: { slidesPerView: 1.5, spaceBetween: 20 },
                        1024: { slidesPerView: 1.8, spaceBetween: 20 },
                        1280: { slidesPerView: 1.8, spaceBetween: 20 },
                    }}
                    className="!h-auto"
                >
                    {testimonialContent.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white shadow-lg max-w-[800px] md:m-8 m-5 rounded-xl md:p-8 p-4 flex flex-col items-center text-center">
                                <div className="mb-4 text-2xl">
                                    {renderStars(item.rating)}
                                </div>
                                <p className="text-gray-700 mb-6">{item.comments}</p>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.reviewerImage}
                                        alt={item.reviewerName}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">{item.reviewerName}</h4>
                                        <p className="text-gray-400 text-sm">{item.reviewerDesignation}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
