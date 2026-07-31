"use client";

import { usePathname } from "next/navigation";
import { isGeoPrefix } from "@/lib/geoPrefixes";
import { resolveNavHref } from "@/lib/navPaths";

const SUPPORTED_LOCALES = ["en", "in", "ae", "sg", "my"];

export function useNavHref() {
    const pathname = usePathname();

    const getUrlPrefix = () => {
        const parts = pathname.split("/").filter(Boolean);
        const first = parts[0];

        if (isGeoPrefix(first)) {
            return first;
        }

        return SUPPORTED_LOCALES.includes(first) ? first : "en";
    };

    const locale = getUrlPrefix();

    const navHref = (path) => resolveNavHref(path, locale);

    return { navHref, locale };
}
