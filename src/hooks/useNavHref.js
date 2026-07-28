"use client";

import { usePathname } from "next/navigation";
import { isGeoPrefix } from "@/lib/geoPrefixes";

const SUPPORTED_LOCALES = ["en", "in", "ae", "sg", "my"];

export function useNavHref() {
    const pathname = usePathname();

    // URL prefix for links: country locales OR geo (dubai). Flag display is separate.
    const getLocaleFromPath = () => {
        const parts = pathname.split("/").filter(Boolean);
        const first = parts[0];

        if (isGeoPrefix(first)) {
            return first;
        }

        return SUPPORTED_LOCALES.includes(first) ? first : "en";
    };

    const locale = getLocaleFromPath();

    const navHref = (path) => {
        if (!path.startsWith("/")) path = `/${path}`;

        // en: no prefix
        if (locale === "en") {
            return path === "/" ? "/" : path;
        }

        if (path === "/") return `/${locale}`;
        return `/${locale}${path}`;
    };

    return { navHref, locale };
}
