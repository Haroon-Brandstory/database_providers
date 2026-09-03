"use client";
import { slugify } from "@/utils/slugify";

const BlogTableOfContent = ({ tableOfContents, activeId, onItemClick }) => {
    if (!tableOfContents || tableOfContents.length === 0) {
        return null;
    }

    return (
        <aside className="w-full md:w-1/4 absolute md:p-6 p-2 h-fit sticky md:top-24 mb-4 shadow rounded-[20px] bg-white">
            <h2 className="text-[24px] font-[500] border-b pb-4 mb-4 border-[#00000033]">Table of contents</h2>
            <ul className="space-y-3 text-sm">
                {tableOfContents.map((toc) => {
                    const id = slugify(toc.sectionTitle);
                    return (
                        <li key={toc.id}>
                            <a
                                href={`#${id}`}
                                onClick={() => onItemClick?.(id)}
                                className={`block transition-all duration-300 origin-left hover:scale-105 hover:text-black ${
                                    activeId === id
                                        ? "text-[#2C6BFF] font-medium scale-105"
                                        : "text-[#00000099]"
                                }`}
                            >
                                {toc.sectionTitle}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default BlogTableOfContent;
