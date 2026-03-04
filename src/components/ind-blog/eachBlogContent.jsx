"use client";
import { useEffect, useState } from "react";
import BlogBlocksRenderer from "./BlogBlocksRenderer";
import BlogKeyPoint from "./blogKeyPoint";

export default function EachBlogContent({ blog }) {
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const sections = document.querySelectorAll("article [id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 } // 30% visible before switching active
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);


    return (
        <div className="bg-white py-8">
            <div>
                <div className="container max-w-7xl mx-auto flex flex-col p-2 text-black justify-start  ">
                    <div className="md:flex relative gap-4">
                        {/* Left Column - Table of Contents */}
                        <aside className="w-full md:w-1/4 absolute md:p-6 p-2 h-fit sticky md:top-24 mb-4 shadow rounded-[20px]">
                            <h2 className="text-[24px] font-[500] border-b pb-4 mb-4 border-[#00000033]">Table of contents</h2>
                            {blog.BlogTableOfContents?.length > 0 && (
                                <ul className="space-y-3 text-sm">
                                    {blog.BlogTableOfContents.map((toc) => (
                                        <li key={toc.id}>
                                            <a
                                                href={`#${toc.anchorLink}`}
                                                className={`block transition-colors ${activeId === toc.anchorLink
                                                    ? "text-[#2C6BFF] font-medium"
                                                    : "text-[#00000099]"
                                                    }`}
                                            >
                                                {toc.sectionTitle}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </aside>
                        {/* Right Column - Blog Content */}
                        <article className="w-full md:w-3/4" >
                            {/* Blog Content */}
                            <BlogKeyPoint />
                            <div className=" bg-white rounded-[20px] shadow md:p-8 p-5">
                                <BlogBlocksRenderer content={blog?.newBlogContents} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}