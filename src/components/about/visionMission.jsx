import Image from "next/image";

export default function AboutVisionMission() {
    return (
        <section className="py-16 px-6 bg-[#F5F5F5] justify-center flex">
            <div className="container max-w-7xl">
                <h2 className="text-black lg:text-[36px] text-center text-[26px] font-medium mb-6">Accelerate Market Reach with Compliant,<span className="block text-[#00000080]"> Insight-Driven Data</span></h2>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    <div className="bg-[url('/about-us/visonBgNoCloud.png')] relative overflow-hidden bg-center bg-no-repeat bg-cover md:p-6 p-4 rounded-[20px] min-h-[412px] overflow-hidden">
                        <h3 className="md:text-[42px] text-[30px] font-[600] mb-4 bg-gradient-to-t from-[#A5ACB7] to-[#DEE4EB] bg-clip-text text-transparent">
                            Vision
                        </h3>
                        <p className="max-w-[65%] text-[#D0D0D0] md:text-[16px]/7 text-[16px]">To be the most trusted global partner for B2B data solutions — empowering businesses with 100% ready-to-use, verified, and compliant data that fuels smarter marketing, scalable lead generation, and sustainable business growth through insight-driven strategies</p>
                        <div className="animate-cloud-slow cloud1">
                            <Image src="/about-us/cloud1.png" width={340} height={150} alt="cloud1" />
                        </div>
                    </div>
                    <div className="bg-[url('/about-us/missionBgNoCloud.png')] relative overflow-hidden bg-center bg-no-repeat bg-cover md:p-6 p-4 pb-6 rounded-[20px] min-h-[412px] overflow-hidden">
                        <h3 className="md:text-[42px] text-[30px] font-[600] mb-4 bg-gradient-to-t from-[#A5ACB7] to-[#DEE4EB] bg-clip-text text-transparent">
                            Mission
                        </h3>
                        <p className="max-w-[60%] text-[#D0D0D0] md:text-[16px]/7 text-[16px]">To deliver high-quality, verified B2B email databases and data services that help businesses scale lead generation, connect with the right decision-makers, expand market reach, and achieve measurable marketing success — all while upholding the highest standards of data privacy, security, and integrity.</p>
                        <div className="animate-cloud-slower cloud2">
                            <Image src="/about-us/cloud2.png" width={340} height={150} alt="cloud1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}