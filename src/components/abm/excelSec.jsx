import Image from "next/image";

export default function ExcelSec({ content }) {
    return (
        <section className="bg-[url('/abm/excel-sec-bg.png')] bg-cover bg-center bg-norepeat py-15 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl min-h-[400px] relative flex  ">
                <div>
                    <div className="grid lg:grid-cols-[40%_60%] grid-cols-1">
                        <div className="">
                            <div className="bg-[#F5F5F533] mb-2 text-white px-4 backdrop-blur-md py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                                {content.bubbleTitle}
                            </div>
                            <div>
                                <h2 className="lg:text-5xl text-xl font-medium lg:leading-14 text-white mb-4">{content.title}</h2>
                                <p className="text-[#6D6D6D] md:text-[16px] text-[14px] text-white">{content.para}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center pt-4 lg:hidden block">
                                <Image src={'/abm/excel-tab.png'} height={315} alt="excel tab" width={675} className="rounded overflow-hidden" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute lg:-right-[210px] lg:block hidden top-10 ">
                    <div className="flex justify-end">
                        <Image src={'/abm/excel-tab.png'} height={315} alt="excel tab" width={675} />
                    </div>
                </div>
            </div>
        </section>
    )
}