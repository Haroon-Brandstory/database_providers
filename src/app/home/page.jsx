import dynamic from 'next/dynamic';
import CountSection from "@/components/countSection";
import WhoWeAre from "@/components/whoWeAre";

const HomeBanner = dynamic(() => import('@/components/banner'), { ssr: true });

export default function HomeNew() {
  return (
    <div>
      <HomeBanner />
      <WhoWeAre />
      <CountSection />
    </div>
  );
}