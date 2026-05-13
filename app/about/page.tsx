import { FounderSection } from '@/components/sections/FounderSection';
import { FooterSection } from '@/components/sections/FooterSection';

export const metadata = {
  title: 'Sarah Ahmed Abumandil — Founder | ISOTOP',
  description: 'AI Engineer, Dental Medicine Student, FX Market Analyst, and Hackathon Champion from Gaza, Palestine.',
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-24">
        <FounderSection />
      </div>
      <FooterSection />
    </>
  );
}
