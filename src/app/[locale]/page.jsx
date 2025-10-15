import HomeNew from "./home/page";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;        // ✅ wait for params
  const locale = resolvedParams.locale;       // ✅ safely access
  const t = await getTranslations({ locale });

  const title = t("home.seo.title");
  const description = t("home.seo.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://thedatabaseproviders.com/${locale}`,
    },
    alternates: {
      canonical: `https://thedatabaseproviders.com/${locale}`,
    },
  };
}



export default function Home() {
  return <HomeNew />;
}
