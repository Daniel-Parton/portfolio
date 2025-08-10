import { useEffect, useRef, useState } from 'react';

export const useHasMountedState = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const useHasMountedRef = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => void (mounted.current = false);
  }, []);
  return mounted;
};

export const useHasUnMountedRef = () => {
  const unMounted = useRef(false);
  useEffect(() => {
    return () => void (unMounted.current = true);
  }, []);
  return unMounted;
};
