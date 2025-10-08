import Image from "next/image";
import Link from "next/link";

export default function AboutUsBanner() {
    return (
        <section className="relative bg-[url('/about-us/aboutUsBannerBg.png')] bg-norepeat bg-center bg-cover text-white min-h-screen flex flex-col items-center justify-center px-4 md:px-20 pt-20  overflow-hidden pt-50">
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#133075] to-transparent pointer-events-none"></div>
            <div className="container max-w-7xl h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center ">
                    <div className="md:pb-20">
                        <h1 className="md:text-[48px] text-[36px] font-[500] mb-4">About <span className="text-[#5673F6]">Us</span></h1>
                        <p className="text-[#D0D0D0] text-[18px] font-[400px] mb-4">With over a decade of industry expertise, we deliver verified and accurate B2B email databases tailored to your business objectives. Based in the USA and trusted by clients in over 190 countries, our data solutions enable meaningful connections with key decision-makers and significantly enhance your marketing performance. We prioritize data quality, compliance, and scalable global reach to help your business grow with confidence.</p>
                        <Link href={'/contact-us'}>
                            <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                                <span className="relative z-10">Get Global Email Contacts Now</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop"></span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Image src='/about-us/aboutUsBanner.png' height={580} width={740} alt="banner-man-img" />
                    </div>
                </div>
            </div>
        </section>
    )
}