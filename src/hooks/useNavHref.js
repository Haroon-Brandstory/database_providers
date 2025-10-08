"use client";

import { usePathname } from "next/navigation";

export function useNavHref() {
    const pathname = usePathname();

    // Derive locale from the first URL segment
    const getLocaleFromPath = () => {
        const parts = pathname.split("/").filter(Boolean);
        const supportedLocales = ["en", "in", "uae", "sgp", "tur"];
        return supportedLocales.includes(parts[0]) ? parts[0] : "en";
    };

    const locale = getLocaleFromPath();

    const navHref = (path) => {
        if (path === "/") return `/${locale}`;
        return `/${locale}${path}`;
    };

    return { navHref, locale };
}
