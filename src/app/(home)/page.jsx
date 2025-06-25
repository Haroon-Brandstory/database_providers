import dynamic from 'next/dynamic';
import CountSection from "@/components/countSection";
import WhoWeAre from "@/components/whoWeAre";

export default function HomeNew() {
  const HomeBanner = dynamic(() => import('@/components/banner'), { ssr: true });
  return (
    <div>
      <HomeBanner />
      <WhoWeAre />
      <CountSection />
    </div>
  );
}