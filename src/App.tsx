import './app.css';

import { BackgroundInteractiveParticles } from '@/components/BackgroundInteractiveParticles';
import { ExperienceSection } from './Sections/Experience';
import { Footer } from './Sections/Footer';
import { HeroSection } from './Sections/Hero';
import { Navbar } from './Sections/Navbar';
import { SkillsSection } from './Sections/Skills';
import { ThemeProvider } from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <BackgroundInteractiveParticles />
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <Footer />
    </ThemeProvider>
  );
}
