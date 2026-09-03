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
