import { MouseEvent, useRef } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { flushSync } from 'react-dom';
import {
  ActionIcon,
  ActionIconProps,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import classes from './ColorSchemeSwitcher.module.css';

export type ColorSchemeSwitcherProps = Omit<ActionIconProps, 'children' | 'onClick'> & {
  tooltipLabel?: string;
  onClick?: (newScheme: 'light' | 'dark', e: MouseEvent<HTMLButtonElement>) => void;
};
export const ColorSchemeSwitcher = ({
  size = 'lg',
  variant = 'default',
  onClick,
  tooltipLabel = 'Toggle color scheme',
  ...rest
}: ColorSchemeSwitcherProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const isLight = computedColorScheme === 'light';
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Tooltip label={tooltipLabel}>
      <ActionIcon
        ref={buttonRef}
        onClick={async (e) => {
          if (!buttonRef.current) return;
          const newScheme = isLight ? 'dark' : 'light';

          await document.startViewTransition(() => {
            flushSync(() => {
              setColorScheme(newScheme);
              onClick?.(newScheme, e);
            });
          }).ready;

          const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
          const y = top + height / 2;
          const x = left + width / 2;

          const right = window.innerWidth - left;
          const bottom = window.innerHeight - top;
          const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
            },
            {
              duration: 700,
              easing: 'ease-in-out',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        }}
        variant="light"
        color={isLight ? 'dark' : 'yellow'}
        size={size}
        aria-label={tooltipLabel}
        {...rest}
      >
        <SunIcon className={classes.light} />
        <MoonIcon className={classes.dark} />
      </ActionIcon>
    </Tooltip>
  );
};
