import { notFound } from "next/navigation";
import EachBlogContent from "@/components/ind-blog/eachBlogContent";
import RecentThreeBlogs from "@/components/ind-blog/recentThreeBlog";
import { getBlogBySlug, getLatestThreeBlogs } from "@/lib/services";
import { API_URL } from "@/utils/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const res = await getBlogBySlug(slug);
    const blog = res?.data?.[0];

    if (!blog) {
        return {
            title: "Blog Not Found",
        };
    }

    return {
        title: blog.metaTitle || blog.BlogName,
        description: blog.metaDescription || "Database Providers Blog",
        keywords: blog.keywords || "",
        alternates: {
            canonical: `/blogs/${slug}/`,
        },
        authors: blog.author ? [{ name: blog.author.AuthorName }] : [],
        robots: {
            index: true,
            follow: true,
            maxImagePreview: 'large',
            maxSnippet: -1,
            maxVideoPreview: -1,
        },
    };
}

export default async function BlogDetails({ params }) {
    const STRAPI_URL = API_URL;
    const { slug } = await params;
    const res = await getBlogBySlug(slug);
    const blog = res?.data?.[0];

    // console.log("blog", blog)

    if (!blog) {
        return notFound();
    }

    const latest3Blogs = await getLatestThreeBlogs();

    // Extract all FAQ sections from blogSections
    const faqSections = blog.blogSections?.filter(s => s.__component === "blog.blog-faq") || [];
    const allFaqs = faqSections.flatMap(s => s.faq || []);

    const faqSchema = allFaqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": Array.isArray(faq.answer)
                    ? faq.answer.map(block => block.children?.map(child => child.text).join("")).join(" ")
                    : faq.answer
            }
        }))
    } : null;

    try {
        return (
            <section className="">
                {faqSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )}
                <div style={{ background: `${blog?.BlogPreviewImage?.url ? `url(${STRAPI_URL + blog.BlogPreviewImage.url})` : '#001340'}` , backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} className=" text-white  flex flex-col items-center justify-center px-4 md:px-20 pt-20 pb-10 overflow-hidden pt-30">
                    <div className="container max-w-7xl mx-auto flex justify-start items-center ">
                        <div className="h-[450px] flex items-start flex-col justify-center">
                            <h1 className="text-white md:text-[48px] max-w-4xl font-medium text-[36px]">{blog.BlogName}</h1>
                            {blog.author && (
                                <p className="text-white text-[18px] my-4">By {blog.author.AuthorName}</p>
                            )}
                        </div>
                    </div>
                </div>
                <EachBlogContent blog={blog} blogSections={blog.blogSections} />
                <RecentThreeBlogs recentBlogs={latest3Blogs?.data} />
            </section>
        );
    } catch (error) {
        notFound();
    }
}
