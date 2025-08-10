import { CSSProperties, useMemo } from 'react';
import cx from 'clsx';
import isNil from 'lodash/isNil';
import { BoxProps } from '@mantine/core';
import classes from './AnimatedParticlesBox.module.css';

type Options = {
  animate: boolean;
  color?: string;
  disabled?: boolean;
  className?: string;
  width?: number;
};

type Value = {
  style: CSSProperties;
  pos: BoxProps['pos'];
  className: string;
};

const pos: Value['pos'] = 'relative';

export const useAnimatedParticlesBoxCss = ({
  animate,
  color,
  disabled,
  className,
  width,
}: Options) => {
  return useMemo<Value>(() => {
    const value: Value = {
      style: {
        position: 'relative',
        '--particle-color': color || 'white',
        '--particle-width': `${width || 0}px`,
      } as any,
      pos,
      className: cx(classes.root, className, {
        [classes.animate]: animate && !disabled,
        [classes.width]: !isNil(width),
      }),
    };

    return value;
  }, [animate, color, className, disabled, width]);
};
