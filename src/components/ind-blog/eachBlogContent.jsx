"use client";
import { useEffect, useState, useCallback } from "react";
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
import { slugify } from "@/utils/slugify";

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

/** Distance from viewport top used to decide which heading is "current". */
const ACTIVE_OFFSET = 140;

export default function EachBlogContent({ blog, blogSections }) {
    const [activeId, setActiveId] = useState(null);

    const getTocHeadings = useCallback(() => {
        const tocIds = new Set(
            (blog.BlogTableOfContents || []).map((toc) => slugify(toc.sectionTitle))
        );

        return Array.from(
            document.querySelectorAll("article h1[id], article h2[id], article h3[id]")
        ).filter((el) => el.id && tocIds.has(el.id));
    }, [blog.BlogTableOfContents]);

    const syncActiveFromScroll = useCallback(() => {
        const headings = getTocHeadings();
        if (!headings.length) return;

        // Last heading whose top has crossed the offset line = current section
        let current = headings[0].id;
        for (const heading of headings) {
            if (heading.getBoundingClientRect().top <= ACTIVE_OFFSET) {
                current = heading.id;
            }
        }
        setActiveId(current);
    }, [getTocHeadings]);

    useEffect(() => {
        const headings = getTocHeadings();
        if (!headings.length) return;

        // Initial + hash deep-link
        const hashId = window.location.hash.replace(/^#/, "");
        if (hashId && headings.some((h) => h.id === hashId)) {
            setActiveId(hashId);
        } else {
            syncActiveFromScroll();
        }

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                syncActiveFromScroll();
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("hashchange", syncActiveFromScroll);
        window.addEventListener("resize", syncActiveFromScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("hashchange", syncActiveFromScroll);
            window.removeEventListener("resize", syncActiveFromScroll);
        };
    }, [blog.BlogTableOfContents, blogSections, getTocHeadings, syncActiveFromScroll]);

    const handleTocClick = useCallback((id) => {
        setActiveId(id);
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
                <div className="container mx-auto flex flex-col p-2 text-black justify-start  ">
                    <div className="md:flex relative gap-4">
                        <BlogTableOfContent
                            tableOfContents={blog.BlogTableOfContents}
                            activeId={activeId}
                            onItemClick={handleTocClick}
                        />
                        <article className="w-full md:w-3/4" >
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
