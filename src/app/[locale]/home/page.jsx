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
import { generateSeoMetadata } from '@/lib/seo';

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