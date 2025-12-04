import { generateSeoMetadata } from "@/lib/seo";
import HomeNew from "./home/page";
import { Metadata } from "next";

import { getTranslations } from 'next-intl/server';

/**
 * @param {{ params: { locale: string } }} context
 */

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "home",
  });

  return generateSeoMetadata({
    locale: params.locale,
    slug: undefined,
    title: t("seo.title"),
    description: t("seo.description"),
  });
}

export default function Home() {
  return <HomeNew />;
}
