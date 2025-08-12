import { ReactNode } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { ActionIcon, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { GithubIcon } from '@/components/BrandIcons/GithubIcon';
import { LinkedInIcon } from '@/components/BrandIcons/LinkedInIcon';
import { Section } from '@/components/Section';
import { WaveEmoji } from '@/components/WaveEmoji';
import classes from './HeroSection.module.css';

export function HeroSection() {
  return (
    <Section h="100vh" pos="relative" justify="center" gap="xl" className={classes.root}>
      <Image
        src="./assets/hero.png"
        alt="Dan drinking coffee with laptop"
        width={500}
        height={500}
        className={classes.image}
      />
      <Stack gap={0}>
        <Title order={2} className={classes.title} ta="center">
          Hi all, I'm Daniel
          <WaveEmoji className={classes.wave} ml="xs" />
        </Title>

        <Text className={classes.text} maw={580} mx="auto" mt="xl">
          A self taught full stack developer passionate about creating software that's both powerful
          and intuitive. I thrive on turning ideas into scalable, reliable applications people love
          to use.
        </Text>
      </Stack>
      <Stack justify="center" align="center" gap="lg">
        <Button
          size="md"
          component="a"
          href="./assets/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          rightSection={<ExternalLinkIcon size={20} />}
        >
          View Resume
        </Button>
        <Group align="center">
          <SocialButton href="https://www.linkedin.com/in/dan-part">
            <LinkedInIcon />
          </SocialButton>
          <SocialButton href="https://github.com/Daniel-Parton">
            <GithubIcon />
          </SocialButton>
        </Group>
      </Stack>
    </Section>
  );
}

type FooterLinkButtonProps = {
  href: string;
  children: ReactNode;
};
const SocialButton = ({ href, children }: FooterLinkButtonProps) => {
  return (
    <ActionIcon
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="light"
      size="input-md"
      radius="xl"
    >
      {children}
    </ActionIcon>
  );
};
