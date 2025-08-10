import { useEffect, useState } from 'react';
import cx from 'clsx';
import { animate } from 'motion';
import { Image } from '@mantine/core';
import { AnimatedCircularProgressBar } from '@/components/AnimatedCircularProgress';
import { useAnimatedParticlesBoxCss } from '@/components/AnimatedParticlesBox';
import { Section } from '@/components/Section';
import classes from './SplashScreen.module.css';

type SplashScreenProps = {
  onFinish: () => void;
};
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [value, setValue] = useState<number>(0);
  const [showParticles, setShowParticles] = useState(false);
  const [finished, setFinished] = useState(false);

  const { style, className } = useAnimatedParticlesBoxCss({
    animate: showParticles,
    color: 'var(--mantine-primary-color-filled)',
    disabled: false,
    width: 1500,
  });
  useEffect(() => {
    const controls = animate(0, 100, {
      onUpdate: (v) => setValue(Math.round(v)),
      onComplete: () => {
        setFinished(true);
        setTimeout(() => {
          setShowParticles(true);
        }, 750);
        setTimeout(() => {
          onFinish();
        }, 2000);
      },
      duration: 1.5,
      ease: 'easeOut',
    });
    return controls.stop; // cleanup
  }, []);

  return (
    <Section mih="100vh" pos="relative" align="center" justify="center" className={classes.root}>
      <AnimatedCircularProgressBar value={value}>
        <div className={cx(classes.logoWrapper, className)} style={style}>
          <Image
            src="./assets/logo.png"
            alt="logo"
            height={80}
            width={80}
            w={80}
            h="auto"
            mod={{
              finished,
            }}
          />
        </div>
      </AnimatedCircularProgressBar>
    </Section>
  );
}
