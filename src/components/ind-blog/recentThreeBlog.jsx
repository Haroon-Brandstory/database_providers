import Image from "next/image";

export default function RecentThreeBlogs({ currentSlug = null }) {
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

    // Fetch all blogs and get 3 random ones
    // const allBlogs = await getAllBlogs();
    // const randomBlogs = getRandomThreeBlogs(allBlogs, currentSlug);
    // const demoBlogDAta = formatBlogsForComponent(randomBlogs);

    // // If no blogs are available, don't render the section
    // if (demoBlogDAta.length === 0) {
    //     return null;
    // }

    return (
        <section className="bg-[#F0F4FF] pt-8 pb-14">
            <div className="container max-w-7xl mx-auto">
                <div>
                    <h2 className="text-black font-medium lg:text-[36px] text-[28px] mb-5 text-center">Keep <span className="text-[#00000080]">Reading</span></h2>
                </div>
                <div className="demoBlogSection">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                        {
                            demoBlogDAta.map((item, i) => (
                                <div key={i} className="each-blog bg-[#F6F8FF] rounded-2xl p-4 shadow-sm w-full mx-auto">
                                    <div className="rounded-xl overflow-hidden mb-6">
                                        <Image
                                            src={item?.img}
                                            width={320}
                                            height={180}
                                            alt="blog_demo"
                                            className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <p className="text-[#222] text-[16px]  font-normal mb-6">
                                        {item?.blogDesc}
                                    </p>
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
    );
}