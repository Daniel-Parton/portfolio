import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from 'react';
import { useStateIfMounted } from './useStateIfMounted';

export function useStateWithRef<T = unknown>(initialState: T | (() => T)) {
  const [state, setState] = useStateIfMounted(initialState);
  const currentValueRef = useRef(state);

  const handleSetState = useCallback(
    (value: SetStateAction<T>) => {
      if (value instanceof Function) {
        setState((x) => {
          currentValueRef.current = value(x);
          return currentValueRef.current;
        });
      } else {
        currentValueRef.current = value;
        setState(value);
      }
    },
    [setState]
  );

  return [state, handleSetState, currentValueRef] as [
    T,
    Dispatch<SetStateAction<T>>,
    MutableRefObject<T>,
  ];
}
