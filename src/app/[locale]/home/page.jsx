import dynamic from 'next/dynamic';
import CountSection from "@/components/countSection";
import WhoWeAre from "@/components/whoWeAre";
import BtoBMarketing from "@/components/btobmarketing";
import ServiceSection from '@/components/serviceSection';
import Segmentation from '@/components/segmentation';
import UseCases from '@/components/useCases';
import WhyChooseUs from '@/components/whyChooseUs';
import WaterEffectSection from '@/components/demoscroll';
import IntegrationSection from '@/components/integrationSection';
import LatestBlogs from '@/components/latestBlogs';
import SliderTestimonial from '@/components/sliderTestimonial';
import ClientForm from '@/components/clientForm';
import HomeFaqSection from '@/components/homeFaq';
const HomeBanner = dynamic(() => import('@/components/banner'), { ssr: true });

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
    en: 'en-US',  
    in: 'en-IN',  
    ae: 'en-AE', 
    sg: 'en-SG', 
    my: 'en-MY',  
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
export default function HomeNew() {
  return (
    <div>
      <HomeBanner />
      <WhoWeAre />
      <CountSection />
      <BtoBMarketing />
      <ServiceSection />
      <Segmentation />
      <UseCases />
      <WhyChooseUs />
      <IntegrationSection />
      <LatestBlogs />
      <SliderTestimonial />
      <ClientForm />
      <HomeFaqSection />
    </div>
  );
}