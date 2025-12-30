import Image from "next/image";

export default function ServicePageBanner({ data }) {
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    // console.log(data)

    return (
        <section className="bg-[url(/service-category/service-cat-bg.png)] min-h-[100vh] flex justify-center bg-cover bg-bottom text-white py-16 px-6 pt-50">
            <div
                key={data.id}
                className="max-w-7xl grid md:grid-cols-2 gap-10 items-center"
            >
                {/* LEFT CONTENT */}
                <div>
                    <h1 className="text-[46px] text-[36px] font-[500] mb-4">
                        {data?.bannerTitle.split(" ").map((word, idx) =>
                            idx === data.bannerTitle.split(" ").length - 2 ? (
                                <span key={idx} className="text-[#5673F6]">
                                    {word}
                                </span>
                            ) : (
                                <span key={idx}> {word} </span>
                            )
                        )}
                    </h1>

                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {data.bannerDescription}
                    </p>

                    {data.button && (
                        <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                            <span className="relative z-10">{data.button[0]?.buttonLabel ||
                                "Get Global Email Contacts Now"}</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                            </span>
                        </button>
                    )}
                </div>
                {/* RIGHT SIDE CARDS */}
                <div className=" bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xlbg-gray-800/50 backdrop-blur-sm rounded-2xl lg:p-6 p-2 border border-gray-700/50 shadow-xl">
                    {/* Domestic */}
                    <div className="p-2 lg:p-5 flex items-center justify-between border-gray-800">
                        <div className="flex items-center gap-3">
                            {data.currentCountryImg?.url && (
                                <Image
                                    src={data.currentCountryImg.url}
                                    alt={data.currentCountry}
                                    width={36}
                                    height={24}
                                    className="rounded"
                                />
                                // <Image
                                //     src={STRAPI_URL + data.currentCountryImg.url}
                                //     alt={data.currentCountry}
                                //     width={36}
                                //     height={24}
                                //     className="rounded"
                                // />
                            )}
                            <span className="font-semibold text-lg">
                                {data.currentCountry}
                            </span>
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-[#EF8F66]">Total counts</p>
                            <p className="text-2xl font-bold text-white">
                                {data.currentCountryCount}
                            </p>
                        </div>
                    </div>
                    {/* Worldwide */}
                    <div className="p-2 lg:p-5 flex items-center justify-between border-t-2 border-gray-800">
                        <div className="flex items-center gap-3">
                            {data.worldWideImg?.url && (
                                <Image
                                    src={data.worldWideImg.url}
                                    alt={data.worldWide}
                                    width={36}
                                    height={24}
                                    className="rounded"
                                />
                                // <Image
                                //     src={STRAPI_URL + data.worldWideImg.url}
                                //     alt={data.worldWide}
                                //     width={36}
                                //     height={24}
                                //     className="rounded"
                                // />
                            )}
                            <span className="font-semibold text-lg">
                                {data.worldWide}
                            </span>
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-[#00DA62]">Total counts</p>
                            <p className="text-2xl font-bold text-white">
                                {data.worldWideCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}