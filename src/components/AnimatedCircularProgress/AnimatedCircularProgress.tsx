import { ReactNode, useMemo } from 'react';
import { Box, MantineColor, parseThemeColor, useMantineTheme } from '@mantine/core';

interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value: number;
  gaugePrimaryColor?: MantineColor;
  className?: string;
  children: ReactNode;
}

const radius = 45;
export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  className,
  children,
}: AnimatedCircularProgressBarProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.primaryColor;

  const color = useMemo(() => {
    return parseThemeColor({
      color: gaugePrimaryColor || primaryColor,
      theme,
    }).value;
  }, [gaugePrimaryColor, primaryColor]);

  const circumference = 2 * Math.PI * radius;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);
  return (
    <Box
      pos="relative"
      h={(radius * 2) / 0.5625}
      w={(radius * 2) / 0.5625}
      fw="semibold"
      fz="xl"
      className={className}
      style={
        {
          '--circle-size': '100px',
          '--circumference': circumference,
          '--percent-to-px': `${percentPx}px`,
          '--gap-percent': '5',
          '--offset-factor': '0',
          '--transition-length': '1s',
          '--transition-step': '200ms',
          '--delay': '0s',
          '--percent-to-deg': '3.6deg',
          transform: 'translateZ(0)',
        } as React.CSSProperties
      }
    >
      <Box component="svg" fill="none" h="100%" w="100%" strokeWidth="2" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            {
              opacity: 1,
              stroke: 'var(--mantine-color-default-border)',
              '--stroke-percent': 90 - currentPercent,
              '--offset-factor-secondary': 'calc(1 - var(--offset-factor))',
              strokeDasharray:
                'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
              transform:
                'rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)',
              transition: 'all var(--transition-length) ease var(--delay)',
              transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
            } as React.CSSProperties
          }
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            {
              opacity: 1,
              stroke: color,
              '--stroke-percent': currentPercent,
              strokeDasharray:
                'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
              transition:
                'var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)',
              transitionProperty: 'stroke-dasharray,transform',
              transform:
                'rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))',
              transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
            } as React.CSSProperties
          }
        />
      </Box>
      <Box
        pos="absolute"
        m="auto"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        data-current-value={currentPercent}
      >
        {children}
      </Box>
    </Box>
  );
}
