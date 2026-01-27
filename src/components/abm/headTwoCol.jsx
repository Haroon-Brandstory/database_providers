import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HeadAndTwoCol({ content }) {
    return (
        <section className="py-20 bg-white flex items-center justify-center">
            <div className="container max-w-7xl px-4">
                <div className="flex items-center justify-center flex-col ">
                    <div className="bg-[#F5F5F5] mb-2 text-[#6D6D6D] px-3 py-2 w-fit rounded-full lg:text-[14px] text-[10px]">
                        {content.bubbleTitle}
                    </div>
                    <div>
                        <h2 className="lg:text-5xl text-xl text-center max-w-4xl font-medium lg:leading-14 text-black mb-4">{content.title}</h2>
                    </div>
                    <div className="mt-4s">
                        {
                            content.cta && content.cta.url && (
                                <Link href={content.cta.url}>
                                    <button className="btn bg-[#1798FF] text-white lg:text-[16px] flex items-center justify-center gap-2 text-[12px] font-semibold lg:py-4 py-2 lg:px-6 px-4 hover:scale-[1.045] transition-all ease-in lg:rounded-[10px] rounded-[5px] cursor-pointer">
                                        {content.cta.label} <FaArrowRight />
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className="mt-8">
                    <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
                        <div className="lg:order-1 order-2 flex flex-col items-center justify-center">
                            {content.sectionContentisList &&
                                (< ul >
                                    {
                                        content.sectionContentisList.map((listItems, index) => (
                                            <li key={index} className="flex gap-4 py-4 border-b border-gray-200">
                                                <span className="flex-shrink-0 mt-1">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                                                        <svg
                                                            className="h-3 w-3 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                </span>

                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    {listItems}
                                                </p>
                                            </li>
                                        ))
                                    }
                                </ul>)
                            }{
                                content.sectionContentisPara && (
                                    <p className="text-gray-700 text-[16px] leading-relaxed">
                                        {content.sectionContentisPara}
                                    </p>
                                )
                            }
                        </div>
                        <div className="lg:order-2 order-1">
                            <Image src={content.image} width={555} height={417} alt="Account Based Marketing" />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}