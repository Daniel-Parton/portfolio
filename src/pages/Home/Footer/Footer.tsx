import { ReactNode, useRef } from 'react';
import { ActionIcon, Box, Center, Group, Image, Stack } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { BrandIconProps } from '@/components/BrandIcons/BrandIcon.types';
import { GithubIcon } from '@/components/BrandIcons/GithubIcon';
import { LinkedInIcon } from '@/components/BrandIcons/LinkedInIcon';

function getRemainingScrollDistance() {
  const scrollTop = document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const remainingScrollDistance = documentHeight - (scrollTop + viewportHeight);
  return remainingScrollDistance;
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useWindowEvent('scroll', () => {
    const diff = getRemainingScrollDistance() - 30;
    if (ref.current) {
      const translate = diff > 0 ? diff / 2 : 0;
      ref.current.style.transform = `translateY(${translate}px)`;
    }
  });

  return (
    <Box bg="var(--mantine-primary-color-light)" component="footer" ref={ref}>
      <Stack py="xl" className="content-container" gap="md">
        <Group justify="space-between" align="center" gap="md">
          <Image
            src="/assets/footer-logo.png"
            alt="logo"
            height={200}
            width={200}
            w={100}
            h="auto"
          />
          <Group gap="md">
            <FooterLinkButton href="https://www.linkedin.com/in/dan-part" icon={LinkedInIcon} />
            <FooterLinkButton href="https://github.com/Daniel-Parton" icon={GithubIcon} />
          </Group>
        </Group>

        <Center>Made with ❤️ by Daniel Parton</Center>
      </Stack>
    </Box>
  );
}

type FooterLinkButtonProps = {
  href: string;
  icon: (props: Partial<BrandIconProps>) => ReactNode;
};
const FooterLinkButton = ({ href, icon }: FooterLinkButtonProps) => {
  return (
    <ActionIcon
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="subtle"
      size="xl"
      radius="xl"
    >
      {icon({ size: 24 })}
    </ActionIcon>
  );
};
