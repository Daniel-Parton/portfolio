import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { debounce as debounceFunc } from '../debounce';
import { useHasMountedState } from '../useHasMounted';
import { useLatest } from '../useLatest';
import { useStateWithRef } from '../useStateWithRef';
import { BoundsData, HTMLOrSVGElement, RectDataModel, UseMeasureState } from './types';

declare type ResizeObserverCallback = (entries: any[], observer: ResizeObserver) => void;
declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: any): void;
  unobserve(target: Element): void;
  disconnect(): void;
  static toString(): string;
}

export interface UseMeasureLogicOptions<TElement extends HTMLOrSVGElement = HTMLElement> {
  defaultElement?: TElement;
  debounce?: number | { scroll: number; resize: number };
  scroll?: boolean;
  polyfill?: { new (cb: ResizeObserverCallback): ResizeObserver };
  onChange?: (element: TElement, data: BoundsData) => void;
}

export function useMeasureLogic<TElement extends HTMLOrSVGElement = HTMLElement>(
  elementRef: RefObject<TElement>,
  stateRef: RefObject<UseMeasureState>,
  { debounce, scroll, polyfill, onChange }: UseMeasureLogicOptions<TElement> = {
    debounce: 0,
    scroll: false,
  }
) {
  const ResizeObserver =
    polyfill ||
    (typeof window === 'undefined' ? class ResizeObserver {} : (window as any).ResizeObserver);
  const [boundsData, setBoundsData, boundsDataRef] = useStateWithRef<BoundsData>({
    bounds: RectDataModel.fromElement(elementRef.current),
    hasBounds: !!elementRef.current,
  });

  // set actual debounce values early, so effects know if they should react accordingly
  const scrollDebounce = debounce
    ? typeof debounce === 'number'
      ? debounce
      : debounce.scroll
    : null;
  const resizeDebounce = debounce
    ? typeof debounce === 'number'
      ? debounce
      : debounce.resize
    : null;
  // make sure to update state only as long as the component is truly mounted
  const mounted = useHasMountedState();
  // memoize handlers, so event-listeners know when they should update

  const onChangeRef = useLatest(onChange);

  const [forceRefresh, resizeChange, scrollChange] = useMemo(() => {
    const callback = () => {
      if (!elementRef.current) {
        if (boundsDataRef.current.hasBounds) {
          setBoundsData((x) => ({ ...x, hasBounds: false }));
        }
        return;
      }

      const bounds = RectDataModel.fromElement(elementRef.current);
      if (mounted && !stateRef.current.lastBounds.isEqual(bounds))
        stateRef.current.lastBounds = bounds;
      setBoundsData({
        bounds,
        hasBounds: true,
      });
      onChangeRef.current?.(elementRef.current, {
        bounds,
        hasBounds: true,
      });
    };
    return [
      callback,
      resizeDebounce ? debounceFunc(callback, resizeDebounce) : callback,
      scrollDebounce ? debounceFunc(callback, scrollDebounce) : callback,
    ];
  }, [scrollDebounce, resizeDebounce, mounted]);

  // cleanup current scroll-listeners / observers
  const removeListeners = useCallback(() => {
    if (stateRef.current.scrollContainers) {
      stateRef.current.scrollContainers.forEach((element) =>
        element.removeEventListener('scroll', scrollChange, true)
      );
      stateRef.current.scrollContainers = null;
    }
    if (stateRef.current.resizeObserver) {
      stateRef.current.resizeObserver?.disconnect();
      stateRef.current.resizeObserver = null;
    }
  }, []);
  // add scroll-listeners / observers
  const addListeners = useCallback(() => {
    if (!elementRef.current) return;
    stateRef.current.resizeObserver = !ResizeObserver
      ? undefined
      : new ResizeObserver(scrollChange);
    stateRef.current.resizeObserver?.observe(elementRef.current);
    if (scroll && stateRef.current.scrollContainers) {
      stateRef.current.scrollContainers.forEach((scrollContainer) =>
        scrollContainer.addEventListener('scroll', scrollChange, {
          capture: true,
          passive: true,
        })
      );
    }
  }, []);

  // add general event listeners
  useOnWindowScroll(scrollChange, Boolean(scroll));
  useOnWindowResize(resizeChange);
  // respond to changes that are relevant for the listeners
  useEffect(() => {
    removeListeners();
    addListeners();
  }, [scroll, scrollChange, resizeChange]);
  // remove all listeners when the components unmounts
  useEffect(() => removeListeners, []);
  return {
    forceRefresh,
    resizeChange,
    scrollChange,
    removeListeners,
    addListeners,
    mounted,
    boundsData,
    setBounds: setBoundsData,
    ResizeObserver,
  };
}

// Adds native resize listener to window
function useOnWindowResize(onWindowResize: (event: Event) => void) {
  useEffect(() => {
    const cb = onWindowResize;
    window.addEventListener('resize', cb);
    return () => void window.removeEventListener('resize', cb);
  }, [onWindowResize]);
}

function useOnWindowScroll(onScroll: () => void, enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      const cb = onScroll;
      window.addEventListener('scroll', cb, { capture: true, passive: true });
      return () => void window.removeEventListener('scroll', cb, true);
    }
  }, [onScroll, enabled]);
}
