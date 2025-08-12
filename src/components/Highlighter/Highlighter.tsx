import { useEffect, useRef, useState } from 'react';
import { annotate } from 'rough-notation';
import { RoughAnnotation } from 'rough-notation/lib/model';
import { MantineColor, Text, TextProps, useMantineTheme } from '@mantine/core';
import { useIntersection, useMergedRef } from '@mantine/hooks';

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

  const { ref: viewPortRef, entry } = useIntersection();
  const ref = useMergedRef(viewPortRef, elementRef);

  const [isSeen, setIsSeen] = useState(false);
  const isFullyVisible = entry?.isIntersecting;

  useEffect(() => {
    if (isFullyVisible) {
      setIsSeen(true);
    }
  }, [isFullyVisible]);

  console.log({
    isSeen,
    isFullyVisible,
    children,
  });

  const primaryColor = theme.primaryColor;
  const color = _color || primaryColor;
  useEffect(() => {
    let annotation: RoughAnnotation | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (isSeen) {
      console.log(children, 'yep');
      timeout = setTimeout(() => {
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
    }

    // Store the current element in closure for cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (annotation) {
        annotation.remove();
      }
    };
  }, [action, isSeen, color, strokeWidth, animationDuration, iterations, padding, multiline]);

  return (
    <Text
      component="span"
      display="inline-block"
      bg="transparent"
      pos="relative"
      ref={ref}
      {...rest}
    >
      {children}
    </Text>
  );
}
