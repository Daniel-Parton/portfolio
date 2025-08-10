'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useLatest<T = any>(value: T) {
  const ref = useRef<T>(null);
  ref.current = value;

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
