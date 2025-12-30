import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import EachBlogContent from "@/components/ind-blog/eachBlogContent";
import RecentThreeBlogs from "@/components/ind-blog/recentThreeBlog";
import StrapiBlogContent from "@/components/ind-blog/strapiBlogContent";
import { getBlogBySlug } from "@/lib/services";
import { API_URL } from "@/utils/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogDetails({ params }) {
    const STRAPI_URL = API_URL;
    const { slug } = await params;
    const res = await getBlogBySlug(slug);
    const blog = res?.data?.[0];
    console.log("to check how the blog is coming",blog);
    if (!blog) {
        return notFound();
    }
    try {
        // Point to the JSON file inside /src/content/blogs/
        // const filePath = path.join(process.cwd(), "src", "content", "blogs", `${slug}.json`);
        // const fileContents = await fs.promises.readFile(filePath, "utf-8");
        // const blog = JSON.parse(fileContents);
        return (
            <section className="">
                <div style={{ background: `url(${blog.BlogPreviewImage.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} className=" text-white  flex flex-col items-center justify-center px-4 md:px-20 pt-20 pb-10 overflow-hidden pt-30">
                    <div className="container max-w-7xl mx-auto flex justify-start items-center ">
                        <div className="h-[450px] flex items-start flex-col justify-center">
                            <h1 className="text-white md:text-[48px] max-w-4xl font-medium text-[36px]">{blog.BlogName}</h1>
                            <p className="text-white text-[18px] my-4">By {blog.author.AuthorName}</p>
                        </div>
                    </div>
                </div>
                <EachBlogContent blog={blog} />
                <RecentThreeBlogs currentSlug={blog} />
                {/* <StrapiBlogContent slug={slug} /> */}
            </section>
        );
    } catch (error) {
        notFound();
    }
}
