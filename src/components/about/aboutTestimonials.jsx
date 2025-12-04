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
            comments: "Their data quality and global coverage directly contributed to our expansion into new markets. A trustworthy partner that consistently supports sustainable growth.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "John D.",
            reviewerDesignation: "Company CEO"
        },
        {
            rating: 3,
            comments: "Their accurate and well-segmented B2B data elevated our campaign performance across every channel. We saw faster conversions and stronger engagement from day one.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Jane S.",
            reviewerDesignation: "Marketing Head"
        },
        {
            rating: 5,
            comments: "The datasets were clean, structured, and easy to integrate into our systems. It immediately improved product functionality and reduced internal processing time.",
            reviewerImage: "/about-us/reviewerImg.svg",
            reviewerName: "Michael B.",
            reviewerDesignation: "Product Manager"
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
                                        <h4 className="font-semibold">{item.reviewerName}</h4>
                                        <p className="text-gray-500 text-sm">{item.reviewerDesignation}</p>
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
