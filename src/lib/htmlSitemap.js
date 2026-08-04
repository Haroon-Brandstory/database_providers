import fs from "fs";
import path from "path";

/** Human HTML sitemap sources (public/*.xml). */
export const HTML_SITEMAP_SOURCES = [
    {
        id: "xml-indexes",
        file: "global-sitemap.xml",
        title: "XML Sitemaps",
        kind: "xml-index",
    },
    {
        id: "en",
        file: "sitemap_index.xml",
        title: "Global (EN)",
        kind: "pages",
        prefix: null,
    },
    {
        id: "in",
        file: "sitemap-in.xml",
        title: "India",
        kind: "pages",
        prefix: "in",
    },
    {
        id: "ae",
        file: "sitemap-ae.xml",
        title: "United Arab Emirates",
        kind: "pages",
        prefix: "ae",
    },
    {
        id: "sg",
        file: "sitemap-sg.xml",
        title: "Singapore",
        kind: "pages",
        prefix: "sg",
    },
    {
        id: "my",
        file: "sitemap-my.xml",
        title: "Malaysia",
        kind: "pages",
        prefix: "my",
    },
    {
        id: "dubai",
        file: "sitemap-dubai.xml",
        title: "Dubai",
        kind: "pages",
        prefix: "dubai",
    },
];

const COMPANY_SLUGS = new Set([
    "about",
    "contact",
    "contact-us",
    "careers",
    "company",
    "thank-you",
]);

const RESOURCE_SLUGS = new Set([
    "testimonials",
    "videos",
    "news",
    "case-studies",
    "white-papers",
    "tools",
    "abm",
    "pricing-plans",
    "searchDatabase",
    "home",
]);

function readPublicXml(fileName) {
    const filePath = path.join(process.cwd(), "public", fileName);
    return fs.readFileSync(filePath, "utf8");
}

function extractLocs(xml) {
    const locs = [];
    const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
    let match;
    while ((match = re.exec(xml)) !== null) {
        locs.push(match[1].trim());
    }
    return locs;
}

function toPathname(loc) {
    try {
        const url = new URL(loc);
        return url.pathname || "/";
    } catch {
        return loc.startsWith("/") ? loc : `/${loc}`;
    }
}

function slugToLabel(slug) {
    if (!slug || slug === "/") return "Home";
    return slug
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean)
        .pop()
        .split("-")
        .map((part) => {
            if (part.toLowerCase() === "b2b") return "B2B";
            if (part.toLowerCase() === "hr") return "HR";
            if (part.toLowerCase() === "abm") return "ABM";
            if (part.toLowerCase() === "ae") return "AE";
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(" ");
}

function stripLocalePrefix(pathname, prefix) {
    if (!prefix) return pathname;
    const normalized = pathname.endsWith("/") && pathname.length > 1
        ? pathname.slice(0, -1)
        : pathname;
    if (normalized === `/${prefix}`) return "/";
    if (normalized.startsWith(`/${prefix}/`)) {
        return normalized.slice(prefix.length + 1) || "/";
    }
    return pathname;
}

function bucketForPath(pathname, prefix) {
    const localPath = stripLocalePrefix(pathname, prefix);
    const parts = localPath.split("/").filter(Boolean);
    const first = parts[0] || "";

    if (!first) return "company";
    if (first === "blogs") return "blogs";
    if (COMPANY_SLUGS.has(first)) return "company";
    if (RESOURCE_SLUGS.has(first)) return "resources";
    return "data";
}

function letterForLabel(label) {
    const ch = (label || "").trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : "#";
}

/**
 * Build Apple-style grouped sitemap data from public XML files.
 */
export function getHtmlSitemapData() {
    const sections = HTML_SITEMAP_SOURCES.map((source) => {
        const xml = readPublicXml(source.file);
        const locs = extractLocs(xml);

        if (source.kind === "xml-index") {
            return {
                id: source.id,
                title: source.title,
                file: source.file,
                kind: source.kind,
                groups: [
                    {
                        id: "xml-files",
                        title: "Sitemap Files",
                        links: locs.map((loc) => {
                            const pathname = toPathname(loc);
                            return {
                                href: pathname.endsWith("/") ? pathname.slice(0, -1) : pathname,
                                label: pathname.split("/").filter(Boolean).pop() || pathname,
                                external: false,
                            };
                        }),
                    },
                ],
                total: locs.length,
            };
        }

        const buckets = {
            company: [],
            resources: [],
            blogs: [],
            data: [],
        };

        const seen = new Set();

        for (const loc of locs) {
            const pathname = toPathname(loc);
            if (seen.has(pathname)) continue;
            seen.add(pathname);

            const href = pathname.endsWith("/") || pathname === "/" ? pathname : `${pathname}/`;
            const label = slugToLabel(pathname);
            const bucket = bucketForPath(pathname, source.prefix);
            buckets[bucket].push({ href, label, pathname });
        }

        const sortLinks = (links) =>
            links.sort((a, b) => a.label.localeCompare(b.label, "en"));

        sortLinks(buckets.company);
        sortLinks(buckets.resources);
        sortLinks(buckets.blogs);
        sortLinks(buckets.data);

        const dataByLetter = {};
        for (const link of buckets.data) {
            const letter = letterForLabel(link.label);
            if (!dataByLetter[letter]) dataByLetter[letter] = [];
            dataByLetter[letter].push(link);
        }

        const groups = [
            {
                id: "company",
                title: "Company",
                links: buckets.company,
            },
            {
                id: "resources",
                title: "Resources",
                links: buckets.resources,
            },
            {
                id: "blogs",
                title: "Blogs",
                links: buckets.blogs,
            },
            {
                id: "data",
                title: "Data & Email Lists",
                links: buckets.data,
                letters: Object.keys(dataByLetter)
                    .sort((a, b) => {
                        if (a === "#") return 1;
                        if (b === "#") return -1;
                        return a.localeCompare(b);
                    })
                    .map((letter) => ({
                        letter,
                        links: dataByLetter[letter],
                    })),
            },
        ].filter((group) => group.links.length > 0);

        return {
            id: source.id,
            title: source.title,
            file: source.file,
            kind: source.kind,
            groups,
            total: seen.size,
        };
    });

    return {
        title: "Site Map",
        description:
            "Browse every public page across Global, India, UAE, Singapore, Malaysia, and Dubai.",
        sections,
        totalLinks: sections.reduce((sum, section) => sum + section.total, 0),
    };
}
