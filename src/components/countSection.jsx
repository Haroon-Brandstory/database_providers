"use client";
import Lottie from 'lottie-react';
import animationData from '../animations/cta-lottie.json';
import { useInView } from 'react-intersection-observer';


export default function CountSection() {

    const LottieAnimation = () => {
        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

        return (
            <div ref={ref} >
                {inView && (
                    <Lottie animationData={animationData} className='md:flex hidden' style={{width:"100%",height:"100%",objectFit:"cover"}} loop={true} />
                )}
            </div>
        );
    };

    const countCardData = [
        {
            title: "Healthcare",
            titleHighlight: "Data",
            contacts: 6,
            description: "Reach doctors, nurses, hospital administrators, and healthcare executives across the world  verified and compliance-ready.",
        },
        {
            title: "Global Professional",
            titleHighlight: "Data",
            contacts: 15,
            description: "C-level executives, decision-makers, and working professionals from sectors like IT, finance, HR, and marketing worldwide.",
        },
        {
            title: "Industry",
            titleHighlight: "Data",
            contacts: 9,
            description: "Pre-segmented email databases for real estate, education, retail, manufacturing, construction, and more.",
        },
    ]

    return (
        <section className="bg-white pt-10 pb-20 px-4 md:px-20 text-black text-center flex flex-col items-center">
            <div className="container flex flex-col items-center">
                <div className="tex-center max-w-4xl">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Count Section</h5>
                    <h2 className="text-[#000000] text-[36px] font-medium">Total 140 Million <span className="text-[#00000080]">Data</span></h2>
                </div>
            </div>
            <div className="cards-section-container flex  flex-wrap gap-8 md:gap-12  justify-center items-center mt-10">
                {countCardData.map((item, index) => (
                    <div key={index} className="bg-[url('/countsection/cardsNormal.png')] hover:bg-[url('/countsection/cardHover.png')] bg-cover bg-center transition-all duration-300 rounded-xl p-6 shadow-md flex flex-col  md:h-[400px] w-full sm:w-[380px] lg:w-[350px]">
                        <div className="top-content flex flex-col items-center text-center">
                            <h3 className="text-[20px] md:text-[24px] text-white font-medium">
                                {item.title} <span className="text-[#5673F6] ">{item.titleHighlight}</span>
                            </h3>
                            <h1 className="text-[72px] relative font-semibold mt-6 bg-gradient-to-b from-[#5A5E64] via-[#B3BDC9] to-[#5E5E5E] bg-clip-text text-transparent">
                                {item.contacts}M+
                                <span><img src="/countsection/sparkler.svg" alt="plus" className="w-10 h-10 absolute top-[8px] right-[88px]" /></span>
                            </h1>
                            <p className="text-white -mt-4">Contacts</p>
                        </div>
                        <div className="pt-12">
                            <hr className="w-full border-t border-white/30 mb-4" />
                            <div className="bottom-p-content text-center pt-4">
                                <p className="text-[#D0D0D0] text-[16px]">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" mt-8 relative">
                <LottieAnimation />
                <div className='flex md:hidden h-[300px] rounded-[20px]'>
                    <img src="/countsection/cta-banner.png" style={{objectFit:"cover",objectPosition:"center right",borderRadius:"20px"}} alt="img" />
                </div>
                <div className="content-on-lotti absolute top-0 bottom-0 place-content-center left-0 right-0">
                    <h3 className='text-[24px] text-black text-center font-medium mb-4'>Custom Data <span className='text-[#00000080]'>Solutions</span></h3>
                    <button className="relative bg-black text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in  drop-shadow-[0px_0px_15px_#0133E9CC]">
                        <span className="relative z-10">Tell us what you want</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}