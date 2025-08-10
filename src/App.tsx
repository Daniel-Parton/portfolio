import './app.css';

import { useState } from 'react';
import { BackgroundInteractiveParticles } from '@/components/BackgroundInteractiveParticles';
import { ExperienceSection } from './Sections/Experience';
import { Footer } from './Sections/Footer';
import { HeroSection } from './Sections/Hero';
import { Navbar } from './Sections/Navbar';
import { SkillsSection } from './Sections/Skills';
import { SplashScreen } from './Sections/Splash';
import { ThemeProvider } from './theme';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <ThemeProvider>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <BackgroundInteractiveParticles />
          <Navbar />
          <HeroSection />
          <SkillsSection />
          <ExperienceSection />
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}
