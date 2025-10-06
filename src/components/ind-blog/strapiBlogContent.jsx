// app/blogs/[slug]/page.jsx
import { getBlogBySlug } from "@/lib/services";

export default async function BlogPage({ slug }) {
    const res = await getBlogBySlug(slug);
    const blog = res?.data?.[0]; // 👈 take the first blog object
    // console.log(blog)

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <article className="prose lg:prose-xl">
            {/* Title */}
            <h1>{blog.BlogName}</h1>

            {/* Author */}
            <p className="text-gray-600">By {blog.author?.AuthorName}</p>

            {/* Preview Image */}
            {blog.BlogPreviewImage?.url && (
                <img
                    src={blog.BlogPreviewImage.url}
                    alt={blog.BlogName}
                    className="rounded-lg my-6"
                />
            )}

            {/* Table of Contents */}
            {blog.BlogTableOfContents?.length > 0 && (
                <ul className="list-disc pl-6">
                    {blog.BlogTableOfContents.map((toc) => (
                        <li key={toc.id}>
                            <a href={`#${toc.anchorLink}`}>{toc.sectionTitle}</a>
                        </li>
                    ))}
                </ul>
            )}

            {/* Blog Content */}
            <div className="mt-8">
                {blog.blogContents?.[0]?.blogContents?.map((block, i) => {
                    if (block.type === "heading" && block.level === 2) {
                        const text = block.children.map((c) => c.text).join(" ");
                        return <h2 className="lg:text-[36px] text-[30px] mb-4 font-medium" key={i}>{text}</h2>;
                    }
                    if (block.type === "heading" && block.level === 3) {
                        const text = block.children.map((c) => c.text).join(" ");
                        return <h3 className="text-[26px] font-medium mb-3" key={i}>{text}</h3>;
                    }
                    if (block.type === "paragraph") {
                        const text = block.children.map((c) => c.text).join(" ");
                        return <p key={i}>{text}</p>;
                    }
                    if (block.type === "list") {
                        return (
                            <ul key={i} className="list-disc pl-6">
                                {block.children.map((li, j) => (
                                    <li key={j}>{li.children.map((c) => c.text).join(" ")}</li>
                                ))}
                            </ul>
                        );
                    }
                    return null;
                })}
            </div>
        </article>
    );
}
