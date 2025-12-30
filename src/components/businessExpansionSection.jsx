import Image from "next/image";
import Link from "next/link";

export default function BusinessExpansionSection({ data }) {
    console.log(data)
    const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL
    return (
        <section className="bg-white py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-black lg:text-[36px] text-center text-[26px] font-medium mb-6">
                    {(() => {
                        const heading = data?.sectionTitle;
                        const match = heading?.match(/^(.*?)\((.*?)\)(.*)$/);
                        if (match) {
                            // Case 1: If brackets exist → highlight inside brackets
                            const [, before, inside, after] = match;
                            return (
                                <>
                                    {before.trim()}{" "}
                                    <span className="text-[#00000080]">({inside.trim()})</span>{" "}
                                    {after.trim()}
                                </>
                            );
                        } else {
                            // Case 2: No brackets → highlight last 2 words
                            const words = heading.trim().split(" ");
                            const normalPart = words.slice(0, -2).join(" "); // all except last 2
                            const highlightPart = words.slice(-2).join(" "); // last 2 words

                            return (
                                <>
                                    {normalPart}{" "}
                                    <span className="text-[#00000080] block">{highlightPart}</span>
                                </>
                            );
                        }
                    })()}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="businessImgWrapper">
                        <Image src={data.sectionImage.url} width={600} height={400} alt="img" />
                    </div>
                    <div>
                        <div className="">
                            {/* {data.sectionPara.map((para, index) => (
                                <p key={index} className="text-[#54555F] text-[16px] mb-6">
                                    {para.children.map((child, idx) => child.text)}
                                </p>
                            ))} */}
                            {data.sectionPara.map((para, index) => (
                                <p key={index} className="text-[#54555F] text-[16px] mb-6">
                                    {para.children.map((child, idx) => {
                                        // If it's plain text
                                        if (child.type === "text") {
                                            return <span key={idx}>{child.text}</span>;
                                        }

                                        // If it's a link
                                        if (child.type === "link" && child.url) {
                                            // Some links have children that contain text
                                            const linkText =
                                                child.children && child.children.length > 0
                                                    ? child.children.map((c, i) =>
                                                        c.type === "text" ? c.text : ""
                                                    )
                                                    : child.url;

                                            return (
                                                <a
                                                    key={idx}
                                                    href={child.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline hover:text-blue-800"
                                                >
                                                    {linkText}
                                                </a>
                                            );
                                        }

                                        return null; // fallback
                                    })}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center items-center md:justify-center md:items-start">
                            {data.sectionCta && (
                                <Link href={data.sectionCta.buttonURL}>
                                    <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in ">
                                        <span className="relative z-10">{data.sectionCta.buttonLabel}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}