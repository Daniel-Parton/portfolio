import { ReactNode } from 'react';
import cx from 'clsx';
import { Box, BoxProps, Paper, PaperProps, Stack, Text } from '@mantine/core';
import { BrandIconProps } from './BrandIcon.types';
import classes from './_BrandIcon.module.css';

export const BrandIcon = ({
  className,
  color,
  pathColorVariant = 'fill',
  size,
  ...rest
}: BrandIconProps) => {
  const vars: BoxProps['__vars'] = {
    '--brand-icon-color': color || 'var(--mantine-color-text)',
  };
  if (size) {
    vars['--brand-icon-size'] = `${size}px`;
  }

  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      role="img"
      mod={{
        'path-color-variant': pathColorVariant,
        'brand-icon-size': size,
      }}
      className={cx(classes.root, 'brand-icon', className)}
      __vars={vars}
      {...rest}
    />
  );
};

export interface BrandIconMarqueeItemProps extends Omit<PaperProps, 'bg' | 'c' | 'children'> {
  icon: (props: Pick<BrandIconProps, 'color' | 'size'>) => ReactNode;
  label: string;
  brandColor: PaperProps['bg'];
  textColor: 'white' | 'black';
}

export const BrandIconMarqueeItem = ({
  icon,
  label,
  textColor,
  brandColor,
  ...rest
}: BrandIconMarqueeItemProps) => {
  return (
    <Paper
      px="lg"
      py="xs"
      component={Stack}
      align="center"
      justify="space-between"
      gap="xs"
      radius="md"
      w={150}
      {...rest}
      c={textColor}
      bg={brandColor}
    >
      {icon({ size: 50, color: textColor })}
      <Text size="xs" c="inherit">
        {label}
      </Text>
    </Paper>
  );
};
