import Image from "next/image";

export default function AbmBenefits({ content }) {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <div>
                    <div className="flex justify-center flex-col items-center">
                        <div className="bg-[#F5F5F5] mb-2 text-[#6D6D6D] px-4 backdrop-blur-md py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                            {content?.bubbleTitle || "bubble title"}
                        </div>
                        <div className="max-w-4xl">
                            <h2 className="lg:text-5xl text-xl font-medium lg:leading-14 text-center text-black mb-4">{content?.title || "title"}</h2>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[25%_50%_25%] gap-4">
                        <div>
                            <div className="bg-[#F5F5F5] rounded-[20px] w-full">
                                <div className="p-4">
                                    <div className="mb-3">
                                        <Image src={"/abm/benefit-sec-img1.svg"} width={52} height={52} alt="benefit Icon" />
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] text-[#6D6D6D]">Higher-quality leads with intent alignment </h3>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <Image src={"/abm/benefit-grid-img1.png"} width={235} height={197} alt="gridImg1" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 flex flex-col">
                            <div className="w-full bg-[#F5F5F5] rounded-[20px] flex justify-between p-4">
                                <div className="flex flex-col md:flex-row justify-between w-full">
                                    <div className="">
                                        <div className="mb-3">
                                            <Image src={"/abm/benefit-sec-img2.svg"} width={52} height={52} alt="benefit Icon" />
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] text-[#6D6D6D]">Increased deal value and faster closing </h3>
                                        </div>
                                    </div>
                                    <div className="pr-4 flex items-center justify-center pt-4">
                                        <Image src={"/abm/benefit-grid-img2.png"} width={197} height={140} alt="gridImg1" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
                                <div className="w-full bg-[#F5F5F5] rounded-[20px] p-4">
                                    <div className="">
                                        <div className="mb-3">
                                            <Image src={"/abm/benefit-sec-img4.svg"} width={52} height={52} alt="benefit Icon" />
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] text-[#6D6D6D]">Better ROI from every campaign</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-[#F5F5F5] rounded-[20px] p-4">
                                    <div className="">
                                        <div className="mb-3">
                                            <Image src={"/abm/benefit-sec-img5.svg"} width={52} height={52} alt="benefit Icon" />
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] text-[#6D6D6D]">Personalized journeys across decision-makers</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-[#F5F5F5] rounded-[20px] w-full h-full">
                                <div className="p-4">
                                    <div className="mb-3">
                                        <Image src={"/abm/benefit-sec-img3.svg"} width={52} height={52} alt="benefit Icon" />
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] text-[#6D6D6D]">Improved sales-marketing collaboration</h3>
                                    </div>
                                </div>
                                <div className="pb-4 flex justify-end">
                                    <Image src={"/abm/benefit-grid-img3.png"} width={235} height={197} alt="gridImg1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}