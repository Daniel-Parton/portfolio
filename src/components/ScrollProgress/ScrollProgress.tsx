import React from 'react';
import cx from 'clsx';
import isNil from 'lodash/isNil';
import { motion, MotionProps, useScroll } from 'motion/react';
import classes from './ScrollProgress.module.css';

export interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  topOffset?: number;
}

export const ScrollProgress = ({ className, topOffset, ...rest }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className={cx(classes.root, className)}
      style={{
        scaleX: scrollYProgress,
        y: !isNil(topOffset) ? `${topOffset}px` : undefined,
      }}
      {...rest}
    />
  );
};
