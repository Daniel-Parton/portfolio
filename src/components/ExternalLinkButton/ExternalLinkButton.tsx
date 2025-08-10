import { ReactNode, useRef } from 'react';
import { ActionIcon, Box, Center, Group, Image, Stack } from '@mantine/core';
import { BrandIconProps } from '@/components/BrandIcons/BrandIcon.types';
import { GithubIcon } from '@/components/BrandIcons/GithubIcon';
import { LinkedInIcon } from '@/components/BrandIcons/LinkedInIcon';

export type ExternalLinkButtonProps = {
  href: string;
  icon: (props: Partial<BrandIconProps>) => ReactNode;
};

export const ExternalLinkButton = ({ href, icon }: ExternalLinkButtonProps) => {
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
