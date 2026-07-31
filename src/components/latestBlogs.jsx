import Image from "next/image";
import { getLatestThreeBlogs } from "@/lib/services";
import { API_URL } from "@/utils/config";

export default async function LatestBlogs() {
    let blogs = [];

    try {
        const response = await getLatestThreeBlogs();
        blogs = response?.data || [];
    } catch (err) {
        console.error("Error fetching latest blogs:", err);
    }

    if (blogs.length === 0) {
        return <div className="text-center text-2xl font-bold text-blue-500">No blogs found</div>;
    }

    const items = blogs.slice(0, 3).map((blog) => ({
        id: blog.id,
        img: blog.BlogPreviewImage?.url
            ? `${API_URL}${blog.BlogPreviewImage.url}`
            : "/latestBlogs/demo_blog.png",
        blogDesc: blog.BlogName || "Untitled Blog",
        blogRedirection: blog.BlogSlug
            ? `/blogs/${blog.BlogSlug}`
            : "/blogs",
    }));

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
                        {items.map((item) => (
                            <div
                                key={item.id || item.blogRedirection}
                                className="each-blog bg-[#F6F8FF] rounded-2xl p-4 shadow-sm max-w-[320px] mx-auto"
                            >
                                <Image
                                    src={item.img}
                                    width={320}
                                    height={180}
                                    unoptimized
                                    alt={item.blogDesc}
                                    className="rounded-xl w-full h-[180px] object-cover mb-6"
                                />
                                <h3 className="text-[#222] text-[16px] font-normal mb-6">
                                    {item.blogDesc}
                                </h3>
                                <a
                                    href={item.blogRedirection}
                                    className="text-[#2C6BFF] font-medium flex items-center mb-4 gap-1"
                                >
                                    Read More <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
