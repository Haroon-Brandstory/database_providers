import HomeNew from "./home/page";
import { Metadata } from "next";

import { getTranslations } from 'next-intl/server';

/**
 * @param {{ params: { locale: string } }} context
 */
export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;

  const t = await getTranslations({ locale: params.locale, namespace: 'home' });

  const title = t('seo.title');
  const description = t('seo.description');
  const canonical = `https://www.thedatabaseproviders.com/${params.locale == 'en' ? "" : params.locale + '/'}`;
  const localeMap = {
    en: 'en-US',  // Global/Default
    in: 'en-IN',  // India
    ae: 'en-AE', // UAE
    sg: 'en-SG', // Singapore
    my: 'en-MY',  // Malaysia
  };

  const locale = localeMap[params.locale] || 'en-US';
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    metadataBase: new URL('https://www.thedatabaseproviders.com'),
    other: {
      'og:locale': locale,
    },
  };
}

export default function Home() {
  return <HomeNew />;
}
