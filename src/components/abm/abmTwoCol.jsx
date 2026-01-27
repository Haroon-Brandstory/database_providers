import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AbmTwoCol({ content }) {
    console.log(content)
    return (
        <section className="lg:py-20 pt-20 bg-white flex items-center justify-center">
            <div className="container max-w-7xl px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
                    <div className="">
                        <Image src={content.image} width={content.imgWidth} height={content.imgHeight} alt={content.imgAlt} />
                    </div>
                    <div className="max-w-xl flex flex-col lg:items-start items-center justify-center md:mt-0 mt-4">
                        <div className="bg-[#F5F5F5] mb-2 text-[#6D6D6D] px-3 py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                            {content.bubbleTitle}
                        </div>
                        <div>
                            <h2 className="lg:text-5xl lg:text-start text-center text-xl font-medium lg:leading-14 text-black mb-4">{content.title}</h2>
                            <p className="text-[#6D6D6D] md:text-[16px] text-[14px] lg:text-start text-center" dangerouslySetInnerHTML={{ __html: content.description }} />
                        </div>
                        {
                            content?.cta && content?.cta?.url && (
                                <div className="mt-5">
                                    <Link href={content.cta.url}>
                                        <button className="btn bg-[#1798FF] text-white lg:text-[16px] flex items-center justify-center gap-2 text-[12px] font-semibold lg:py-4 py-2 lg:px-6 px-4 hover:scale-[1.045] transition-all ease-in lg:rounded-[10px] rounded-[5px] cursor-pointer">
                                            {content.cta.label} <FaArrowRight />
                                        </button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}