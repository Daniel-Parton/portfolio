import { ReactNode, useRef } from 'react';
import { ActionIcon, Box, Center, Group, Image, Stack } from '@mantine/core';
import { BrandIconProps } from '@/components/BrandIcons/BrandIcon.types';
import { GithubIcon } from '@/components/BrandIcons/GithubIcon';
import { LinkedInIcon } from '@/components/BrandIcons/LinkedInIcon';

export function Footer() {
  return (
    <Box bg="var(--mantine-primary-color-light)" component="footer">
      <Stack py="xl" className="content-container" gap="md">
        <Group justify="space-between" align="center" gap="md">
          <Image
            src="./assets/footer-logo.png"
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
