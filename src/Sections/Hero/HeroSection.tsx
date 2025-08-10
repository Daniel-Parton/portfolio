import { Image, Stack, Text, Title } from '@mantine/core';
import { Section } from '@/components/Section';
import { WaveEmoji } from '@/components/WaveEmoji';
import classes from './HeroSection.module.css';

export function HeroSection() {
  return (
    <Section h="100vh" pos="relative" justify="center" className={classes.root}>
      <Image
        src="/assets/hero.png"
        alt="Dan drinking coffee with laptop"
        width={500}
        height={500}
        className={classes.image}
      />
      <Stack gap={0}>
        <Title order={2} className={classes.title} ta="center">
          Hi all, I'm Daniel
          <WaveEmoji ml="xs" size="calc(var(--hero-title-font-size) * 0.75)" />
        </Title>

        <Text className={classes.text} maw={580} mx="auto" mt="xl">
          a self taught full stack developer passionate about creating software that's both powerful
          and intuitive. I thrive on turning ideas into scalable, reliable applications people love
          to use.
        </Text>
      </Stack>
    </Section>
  );
}
