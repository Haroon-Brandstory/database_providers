"use client";
import { useEffect, useState } from "react";
import BlogBlocksRenderer from "./BlogBlocksRenderer";
import BlogKeyPoint from "./blogKeyPoint";
import AuthorDetails from "./AuthorDetails";
import AnalyzeArticleWithAi from "./AnalyzeArticleWithAi";
import BlogQuote from "./BlogQuote";
import BlogNote from "./BlogNote";
import EmailMarket from "./EmailMarket";
import DownloadPdf from "./DownloadPdf";
import BlogFaq from "./BlogFaq";
import DynamicTable from "./DynamicTable";
import BlogTableOfContent from "./BlogTableOfContent";
import BlogContentImage from "./BlogContentImage";

const COMPONENT_MAP = {
    "blog.article-analyzer": AnalyzeArticleWithAi,
    "blog.keypoints": BlogKeyPoint,
    "blog.blog-image": BlogContentImage,
    "blog.blog-quote": BlogQuote,
    "blog.blog-note": BlogNote,
    "blog.blog-cta": EmailMarket,
    "blog.blog-pdf": DownloadPdf,
    "blog.table": DynamicTable,
    "blog.blog-faq": BlogFaq,
};

export default function EachBlogContent({ blog, blogSections }) {
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

    const renderSection = (section, index) => {
        const componentType = section.__component;

        if (componentType === "blog.blog-content") {
            return (
                <div key={index} className="bg-white rounded-[20px] shadow md:p-8 p-5 mb-8">
                    <BlogBlocksRenderer content={section.blogContents} />
                </div>
            );
        }

        const Component = COMPONENT_MAP[componentType];

        if (Component) {
            return <Component key={index} section={section} {...section} />;
        }

        return (
            <div key={index} className="text-red-500 text-xs p-4 border border-red-200 rounded mb-4">
                Unknown component: {componentType}
            </div>
        );
    };

    return (
        <div className="bg-white py-8">
            <div>
                <div className="container max-w-7xl mx-auto flex flex-col p-2 text-black justify-start  ">
                    <div className="md:flex relative gap-4">
                        {/* Left Column - Table of Contents */}
                        <BlogTableOfContent
                            tableOfContents={blog.BlogTableOfContents}
                            activeId={activeId}
                        />
                        {/* Right Column - Blog Content */}
                        <article className="w-full md:w-3/4" >
                            {/* Blog Content */}
                            <AuthorDetails author={blog.author} updatedAt={blog.updatedAt} />

                            {blogSections && blogSections.length > 0 ? (
                                blogSections.map((section, index) => renderSection(section, index))
                            ) : (
                                <div className="bg-white rounded-[20px] shadow md:p-8 p-5">
                                    <BlogBlocksRenderer content={blog?.newBlogContents || []} />
                                </div>
                            )}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}