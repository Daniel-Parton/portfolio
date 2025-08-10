import { BackgroundInteractiveParticles } from '@/components/BackgroundInteractiveParticles';
import { Navbar } from '@/pages/Home/Navbar';
import { Footer } from './Footer';
import { ContactSection } from './Sections/Contact';
import { ExperienceSection } from './Sections/Experience';
import { HeroSection } from './Sections/Hero';
import { SkillsSection } from './Sections/Skills';

export function HomePage() {
  return (
    <>
      <BackgroundInteractiveParticles />
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <Footer />
    </>
  );
}
