import CTASection from '@/features/landing-page/components/cta-section';
import FeaturesSection from '@/features/landing-page/components/features-section';
import HeroSection from '@/features/landing-page/components/hero-section';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
