import { useEffect, useRef } from 'react';
import type React from 'react';
import { delay } from 'lodash';
import { annotate } from 'rough-notation';
import { RoughAnnotation } from 'rough-notation/lib/model';
import { MantineColor, Text, TextProps, useMantineTheme } from '@mantine/core';

// Define available annotation actions
type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

// Custom TypeScript interface for supported props
interface HighlighterProps
  extends Omit<TextProps, 'color' | 'c' | 'p' | 'pb' | 'pt' | 'px' | 'py' | 'pl' | 'pr'> {
  children: React.ReactNode;
  action?: AnnotationAction;
  strokeWidth?: number;
  animationDuration?: number;
  color?: MantineColor;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  delay?: number;
}

export function Highlighter({
  children,
  action = 'highlight',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  color: _color,
  multiline = true,
  delay,
  ...rest
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const theme = useMantineTheme();
  const primaryColor = theme.primaryColor;
  const color = _color || primaryColor;
  useEffect(() => {
    let annotation: RoughAnnotation | null = null;
    setTimeout(() => {
      const element = elementRef.current;
      if (element) {
        annotation = annotate(element, {
          type: action,
          color: `var(--mantine-color-${color}-text)`,
          strokeWidth,
          animationDuration,
          iterations,
          padding,
          multiline,
        });

        annotation.show();
      }
    }, delay ?? 0);

    // Store the current element in closure for cleanup
    return () => {
      if (annotation) {
        annotation.remove();
      }
    };
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline]);

  return (
    <Text
      component="span"
      display="inline-block"
      bg="transparent"
      pos="relative"
      ref={elementRef}
      {...rest}
    >
      {children}
    </Text>
  );
}
