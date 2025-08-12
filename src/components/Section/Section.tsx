import { ReactNode, useEffect, useState } from 'react';
import cx from 'clsx';
import { Stack, StackProps, Title } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { Highlighter } from '../Highlighter';
import classes from './Section.module.css';

export interface SectionProps extends StackProps {
  children?: ReactNode;
  navData?: { id: string; label: string };
  title?: string;
  containerProps?: StackProps;
}
export function Section({
  children,
  className,
  navData,
  mih = '100vh',
  title,
  containerProps,
  ...rest
}: SectionProps) {
  const { className: containerClassName, ...containerRest } = containerProps || {};
  const { ref, inViewport } = useInViewport();
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    if (inViewport) {
      setIsSeen(true);
    }
  }, [inViewport]);

  return (
    <Stack
      id={navData?.id}
      aria-label={navData?.label}
      component="section"
      mih={mih}
      ref={ref}
      className={cx(classes.root, containerClassName)}
      {...containerRest}
    >
      <Stack
        mih={mih}
        className={cx(classes.content, 'content-container', className, {
          [classes.revealed]: isSeen,
        })}
        {...rest}
      >
        {!!title && (
          <Title w="100%" order={2}>
            <Highlighter inherit action="underline">
              {title}
            </Highlighter>
          </Title>
        )}
        {children}
      </Stack>
    </Stack>
  );
}
