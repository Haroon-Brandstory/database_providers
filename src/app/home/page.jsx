import dynamic from 'next/dynamic';
import CountSection from "@/components/countSection";
import WhoWeAre from "@/components/whoWeAre";
import BtoBMarketing from "@/components/btobmarketing";
const HomeBanner = dynamic(() => import('@/components/banner'), { ssr: true });

export default function HomeNew() {
  return (
    <div>
      <HomeBanner />
      <WhoWeAre />
      <CountSection />
      <BtoBMarketing />
    </div>
  );
}