import { HeroSection } from '@/components/sections/HeroSection';
import { TripleEconomyDashboard } from '@/components/sections/TripleEconomyDashboard';
import { TechnicalMoatSection } from '@/components/sections/TechnicalMoatSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { SecureVaultEntry } from '@/components/sections/SecureVaultEntry';
import { GlobeSection } from '@/components/sections/GlobeSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GlobeSection />
      <TripleEconomyDashboard />
      <TechnicalMoatSection />
      <FounderSection />
      <SecureVaultEntry />
      <FooterSection />
    </>
  );
}
