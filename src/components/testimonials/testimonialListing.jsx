"use client";
import Image from "next/image"
import { useState } from "react"

export default function TestimonialsListingSection() {
    const [visibleCount, setVisibleCount] = useState(6);

    const dummyTestimonialData = [
        {
            image: '/testimonialPage/testimonialImage1.png',
            reviewerName: 'Amit Mitra',
            reviewerPosition: 'Chief Executive Officer',
            review: 'Working with Database Providers was a breeze.They have the best lead generation process available for most companies from FMCG lead generation to trade industry lead generation. Because of their intervention, we were able to scale our sales up by 30%.'
        },
        {
            image: '/testimonialPage/testimonialImage2.png',
            reviewerName: 'Sathwik K',
            reviewerPosition: 'Marketing Associate',
            review: "I can't believe it's been already 4 years since we first started getting our leads from Database Providers. We highly recommend them for targeted leads generation skills."
        },
        {
            image: '/testimonialPage/testimonialImage3.png',
            reviewerName: 'Amey Badami',
            reviewerPosition: 'Head - Operations and Projects',
            review: 'We thought we reached out to all our potential clients and there were none left. But Dataase Providers proved us wrong. And helped us gather new contacts.'
        },
        {
            image: '/testimonialPage/testimonialImage4.png',
            reviewerName: 'Archana Sharma ',
            reviewerPosition: 'Founder & Managing Director',
            review: 'We were searching for a lead generation company in Bangalore for a long time. But the ones we were getting back calls from were either not gurranteing targeted leads or were too vague about their lead generation process. But Database providers were serious about their 95% mail delivery rate. Which after 3 years of collaboration, we can vouch for. They are the best in the market.'
        },
        {
            image: '/testimonialPage/testimonialImage5.png',
            reviewerName: 'Vinay S R ',
            reviewerPosition: 'Managing Director',
            review: 'We’ve always believed great design starts with the right conversations. But getting through to decision-makers was our biggest roadblock. That changed when Database Providers stepped in. Their targeted list gave us access to the exact people we needed across real estate, construction, and coworking. In just two months, we booked 2.7X more walkthroughs and project discussions.'
        },
        {
            image: '/testimonialPage/testimonialImage6.png',
            reviewerName: 'Damodaran Subramanian',
            reviewerPosition: 'Chief Executive Officer',
            review: "If your company's not talking to potential customers, then you are lacking behind generating revenue. But if you start working with Database providers who target only potential customers, then you can easily achieve your sales goals just like we did."
        },
    ]

    const showMore = () => {
        setVisibleCount((prev) => prev + 6);
    }

    const showLess = () => {
        setVisibleCount(6);
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-6 flex justify-center items-center">
            <div className="container max-w-7xl mx-auto">
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            dummyTestimonialData.slice(0, visibleCount).map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-[20px] min-h-[400px]">
                                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                                        <div style={{ position: 'relative', width: '100%', height: '60px' }}>
                                            <Image src={testimonial.image} fill style={{ objectFit: 'contain' }} alt="clientImage" />
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <h4 className="text-[#2C6BFF] text-[18px] font-bold text-center">{testimonial.reviewerName}</h4>
                                            <p className="text-[#51525C] text-[14px] font-[400] text-center">{testimonial.reviewerPosition}</p>
                                        </div>
                                    </div>
                                    <div className="pb-16 pt-8 px-9 border-t">
                                        <p className="text-[#51525C] text-[16px] font-[400] text-center">{testimonial.review}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center justify-center">
                        {visibleCount < dummyTestimonialData.length && (
                            <button onClick={showMore} className="relative text-white px-15 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in">
                                <span className="relative z-10">Show More</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                </span>
                            </button>
                        )}
                        {visibleCount > dummyTestimonialData.length && (
                            <button onClick={showLess} className="relative text-white px-15 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in">
                                <span className="relative z-10">Show Less</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}