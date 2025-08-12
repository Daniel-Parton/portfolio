import { ReactNode } from 'react';
import { BoxProps, ElementProps } from '@mantine/core';

export interface BrandIconProps
  extends Omit<BoxProps, 'c' | 'h' | 'w' | '__vars'>,
    ElementProps<'svg', 'color' | 'size' | 'display' | 'opacity'> {
  size?: number;
  children?: ReactNode;
  pathColorVariant?: 'fill' | 'stroke';
  color?: string;
}
