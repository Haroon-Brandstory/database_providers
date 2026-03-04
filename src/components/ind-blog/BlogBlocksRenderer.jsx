import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BlogBlocksRenderer({ content }) {
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                heading: ({ children, level }) => {
                    // Generate ID for TOC
                    const text = children.map(child => {
                        if (typeof child === 'string') return child;
                        if (child.props && child.props.text) return child.props.text;
                        return '';
                    }).join('');
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                    switch (level) {
                        case 1:
                            return <h1 id={id} className="md:text-[40px] text-[32px] font-bold mb-6 mt-8">{children}</h1>;
                        case 2:
                            return <h2 id={id} className="md:text-[32px] text-[26px] font-semibold mb-4 mt-8">{children}</h2>;
                        case 3:
                            return <h3 id={id} className="md:text-[24px] text-[20px] font-medium mb-3 mt-6">{children}</h3>;
                        default:
                            return <h2 id={id} className="md:text-[32px] text-[26px] font-semibold mb-4 mt-8">{children}</h2>;
                    }
                },
                paragraph: ({ children }) => (
                    <p className="text-[#000000CC] text-[16px] leading-[1.6] mb-4">{children}</p>
                ),
                list: ({ children, format }) => {
                    if (format === "ordered") {
                        return <ol className="list-decimal pl-6 mb-4 space-y-2 text-[#000000CC]">{children}</ol>;
                    }
                    return <ul className="list-disc pl-6 mb-4 space-y-2 text-[#000000CC]">{children}</ul>;
                },
                link: ({ children, url }) => (
                    <a href={url} className="text-[#2C6BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                ),
            }}
        />
    );
}
