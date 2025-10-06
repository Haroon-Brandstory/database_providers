import { useLocale } from "next-intl";

export function useNavHref() {
    const locale = useLocale();

    const navHref = (path) => {
        if (path === '/') return `/${locale}`;
        return `/${locale}${path}`;
    };

    return { navHref };
}
