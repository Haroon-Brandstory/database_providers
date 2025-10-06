import Image from "next/image";
import Link from "next/link";

const dummyRoiValues = [
    { name: "Industry", icon: "/servicesection/roi-icon1.svg", },
    { name: "Job title", icon: "/servicesection/roi-icon2.svg", },
    { name: "Location", icon: "/servicesection/roi-icon3.svg", },
    { name: "Employee size", icon: "/servicesection/roi-icon4.svg", },
    { name: "Revenue size", icon: "/servicesection/roi-icon5.svg", },
];

export default function RoiServiceSection({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    const RetData = data.roiComponents;
    return (
        <section className="bg-white py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="roiWrapper rounded-[10px] bg-[url(/servicesection/segmented-list-banner.png)] py-10 px-3 bg-cover bg-center bg-norepeat">
                    <div className="flex flex-col items-center justify-center ">
                        <h2 className="text-2xl text-black md:text-[36px] text-center font-medium mb-4">
                            {data.sectionTitle}
                        </h2>
                        <p className="max-w-4xl text-[#51525C] text-center">{data.sectionDescription}</p>
                    </div>
                    <div className="grid grid-cols-2 justify-items-center md:grid-cols-5 justify-center items-center gap-6 max-w-5xl mx-auto my-8">
                        {RetData.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-[80%] flex flex-col items-center justify-center p-2 rounded-xl shadow-md bborder-[0.59px] border-[#D4D4D4] bg-white/10 backdrop-blur-lg border border-white/20">

                                <div
                                    className='w-full h-auto rounded-xl flex items-center justify-center '
                                >
                                    <Image src={STRAPI_URL + item.componentIcon.url} alt={item.componentTitle} width={52} height={52} />
                                </div>
                                <p className="mt-3 text-center text-gray-700 font-medium">{item.componentTitle}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        {data.button && (
                            <Link href={data.button.buttonURL}>
                                <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                                    <span className="relative z-10">{data.button.buttonLabel}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}