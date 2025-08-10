import { MutableRefObject, RefObject, useCallback, useMemo, useRef } from 'react';
import { useLatest } from '../useLatest';
import { useMeasureLogic, UseMeasureLogicOptions } from './_useMeasureLogic';
import { findScrollContainers } from './_utils';
import { BoundsData, HTMLOrSVGElement, RectDataModel, UseMeasureState } from './types';

export interface UseMeasureResult<TElement extends HTMLOrSVGElement = HTMLElement> {
  register: (element: TElement | null) => void;
  data: BoundsData;
  ref: RefObject<TElement>;
  reMeasure: () => void;
}

//https://github.com/pmndrs/react-use-measure
export function useMeasure<TElement extends HTMLOrSVGElement = HTMLElement>(
  options?: UseMeasureLogicOptions<TElement>
): UseMeasureResult<TElement> {
  // keep all state in a ref
  const elementRef = useRef<TElement>(null);
  const stateRef = useRef<UseMeasureState>({
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: RectDataModel.empty(),
  });
  const { boundsData, forceRefresh, removeListeners, addListeners } = useMeasureLogic<TElement>(
    elementRef as RefObject<TElement>,
    stateRef,
    options
  );

  const forceRefreshRef = useLatest(forceRefresh);
  const register = useCallback((node: TElement | null) => {
    if (!node || node === elementRef.current) return;
    removeListeners();
    elementRef.current = node;
    stateRef.current.scrollContainers = findScrollContainers(node);
    addListeners();
    forceRefreshRef.current!();
  }, []);

  return useMemo<UseMeasureResult<TElement>>(
    () => ({
      register,
      data: boundsData,
      ref: elementRef as RefObject<TElement>,
      reMeasure: forceRefreshRef.current as () => void,
    }),
    [boundsData]
  );
}
