import Image from "next/image";

export default function LatestBlogs() {

    const demoBlogDAta = [
        {
            img: "/latestBlogs/blog1.png",
            blogDesc: "5 proven techniques to identify and contact your B2B audience",
            blogRedirection: "https://thedatabaseproviders.com/blogs/5-proven-techniques-to-identify-and-contact-your-b2b-audience/"
        },
        {
            img: "/latestBlogs/blog2.png",
            blogDesc: "Potential of content syndication for B2B lead generation",
            blogRedirection: "https://thedatabaseproviders.com/blogs/potential-of-content-syndication-for-b2b-lead-generation/"
        },
        {
            img: "/latestBlogs/blog3.png",
            blogDesc: "Step by step guide for B2B Email marketing",
            blogRedirection: "https://thedatabaseproviders.com/blogs/step-by-step-guide-for-b2b-email-marketing/"
        },
    ]

    return (
        <section className="py-24 px-4 md:px-20 bg-[#F0F4FF] relative">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center">
                    <h2 className="text-black lg:text-[36px] text-[28px] font-medium mb-6">
                        Our Latest <span className="text-[#00000080]">Blogs</span>
                    </h2>
                </div>
                <div className="demoBlogSection">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                        {
                            demoBlogDAta.map((item, i) => (
                                <div key={i} className="each-blog bg-[#F6F8FF] rounded-2xl p-4 shadow-sm max-w-[320px] mx-auto">
                                    <Image
                                        src={item?.img}
                                        width={320}
                                        height={180}
                                        alt="blog_demo"
                                        className="rounded-xl w-full h-[180px] object-cover mb-6"
                                    />
                                    <h3 className="text-[#222] text-[16px]  font-normal mb-6">
                                        {item?.blogDesc}
                                    </h3>
                                    <a
                                        href={item?.blogRedirection} target="_blank"
                                        className="text-[#2C6BFF] font-medium flex items-center mb-4 gap-1"
                                    >
                                        Read More <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}