export function slugify(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function getNodeText(node) {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join("");
    if (node?.props?.text) return String(node.props.text);
    if (node?.props?.children != null) return getNodeText(node.props.children);
    return "";
}

/** Plain text from a Strapi blocks inline/children tree. */
export function getBlockPlainText(nodes) {
    if (!Array.isArray(nodes)) return "";
    return nodes
        .map((node) => {
            if (!node) return "";
            if (typeof node.text === "string") return node.text;
            if (Array.isArray(node.children)) return getBlockPlainText(node.children);
            return "";
        })
        .join("");
}

/** Collect level-2 headings from a Strapi blocks array. */
export function extractH2FromBlocks(blocks, acc = []) {
    if (!Array.isArray(blocks)) return acc;
    for (const block of blocks) {
        if (block?.type === "heading" && block.level === 2) {
            const title = getBlockPlainText(block.children).trim();
            if (title) acc.push(title);
        }
        if (Array.isArray(block?.children)) {
            extractH2FromBlocks(block.children, acc);
        }
    }
    return acc;
}

/**
 * TOC from Strapi BlogTableOfContents when present,
 * otherwise H2 titles from blog content blocks.
 */
export function resolveBlogTableOfContents(blog, blogSections) {
    const fromStrapi = blog?.BlogTableOfContents;
    if (Array.isArray(fromStrapi) && fromStrapi.length > 0) {
        return fromStrapi;
    }

    const titles = [];
    if (Array.isArray(blogSections) && blogSections.length > 0) {
        for (const section of blogSections) {
            if (section?.__component === "blog.blog-content") {
                extractH2FromBlocks(section.blogContents, titles);
            }
        }
    } else {
        extractH2FromBlocks(blog?.newBlogContents, titles);
    }

    return titles.map((sectionTitle, index) => ({
        id: `h2-${index}-${slugify(sectionTitle)}`,
        sectionTitle,
    }));
}
