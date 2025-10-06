"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";


export default function IndustrySlider() {
    const insutryDemoData = [
        {
            bgImage: '/about-us/health-care-banner.png',
            industry: "Healthcare",
            paraText: 'Reach top healthcare professionals, decision-makers, and administrators with precision-targeted B2B data. Our U.S.',
            paraText2: 'healthcare database includes verified contact details across hospitals, clinics, pharma companies, and medical institutions — enabling compliant, high-impact outreach and partnership growth.'
        },
        {
            bgImage: '/about-us/global-professional-banner.png',
            industry: "Global Professional Data",
            paraText: 'Reach top healthcare professionals, decision-makers, and administrators with precision-targeted B2B data. Our U.S.',
            paraText2: 'healthcare database includes verified contact details across hospitals, clinics, pharma companies, and medical institutions — enabling compliant, high-impact outreach and partnership growth.'
        },
        {
            bgImage: '/about-us/industry-banner.png',
            industry: "Industry Data",
            paraText: 'Reach top healthcare professionals, decision-makers, and administrators with precision-targeted B2B data. Our U.S.',
            paraText2: 'healthcare database includes verified contact details across hospitals, clinics, pharma companies, and medical institutions — enabling compliant, high-impact outreach and partnership growth.'
        },
    ];

    return (
        <section>
            <Swiper
                className="about-Us_IndustrySlider"
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >
                {insutryDemoData.map((industry, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                background: `url(${industry.bgImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center'
                            }}
                            className="py-16 px-6 md:h-[500px] flex items-center justify-center"
                        >
                            <div className="container max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="bg-[radial-gradient(70.91%_165.08%_at_38.85%_40.4%,_#000099_29.5%,_#000033_100%)] p-6 rounded-[10px]">
                                        <div className="border-b border-[#FFFFFF4D]">
                                            <p className="text-[#5673F6] text-[16px] font-medium">Industries We Serve</p>
                                            <h4 className="text-white md:text-[36px] text-[26px] font-medium mb-4">{industry.industry}</h4>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-[#D0D0D0] mb-4">{industry.paraText}</p>
                                            <p className="text-[#D0D0D0] mb-4">{industry.paraText2}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
