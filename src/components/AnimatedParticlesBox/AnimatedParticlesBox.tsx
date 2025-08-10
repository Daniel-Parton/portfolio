import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps, ElementProps } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { useAnimatedParticlesBoxCss } from './useAnimatedParticlesBoxCss';

export interface AnimatedParticlesBoxProps extends Omit<BoxProps, 'pos'>, ElementProps<'div'> {
  children?: ReactNode;
  particleColor?: string;
  animate?: boolean;
  particleWidth?: number;
  defaultAnimate?: boolean;
  animateDisabled?: boolean;
  onAnimateChange?: (animate: boolean) => void;
  animateOnClick?: boolean;
}

export const AnimatedParticlesBox = forwardRef<HTMLDivElement, AnimatedParticlesBoxProps>(
  (
    {
      children,
      className: classNameProp,
      defaultAnimate,
      animate: animateProp,
      animateOnClick,
      animateDisabled,
      onAnimateChange,
      onClick,
      particleColor,
      particleWidth,
      style: styleProp,
      ...rest
    },
    ref
  ) => {
    const [animate, handleAnimateChange] = useUncontrolled({
      value: animateProp,
      defaultValue: defaultAnimate,
      onChange: onAnimateChange,
    });

    const { pos, style, className } = useAnimatedParticlesBoxCss({
      animate,
      color: particleColor,
      width: particleWidth,
      className: classNameProp,
      disabled: animateDisabled,
    });

    return (
      <Box
        ref={ref}
        className={className}
        pos={pos}
        data-animating={animate ? 'true' : 'false'}
        style={!styleProp ? style : { ...style, ...styleProp }}
        onClick={(e) => {
          if (animateOnClick) {
            handleAnimateChange(true);
            setTimeout(() => handleAnimateChange(false), 1000);
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
