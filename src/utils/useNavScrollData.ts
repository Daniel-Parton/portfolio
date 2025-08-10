import { useMemo } from 'react';
import { useScrollSpy } from '@mantine/hooks';

export const useNavScrollData = () => {
  const spy = useScrollSpy({
    selector: 'section',
    getValue: (e) => e.ariaLabel!,
  });

  const links = useMemo(() => {
    let index = -1;
    return spy.data.reduce<NavLinkData[]>((all, x) => {
      ++index;
      if (!x.id || x.id.startsWith('mantine-')) {
        return all;
      }

      x.getNode;
      all.push({
        id: x.id,
        index,
        getNode: x.getNode,
        label: x.value,
        isActive: spy.active === index,
      });
      return all;
    }, []);
  }, [spy]);

  return {
    links,
    activeIndex: spy.active,
  };
};

type NavLinkData = {
  id: string;
  index: number;
  label: string;
  getNode: () => HTMLElement | null;
  isActive: boolean;
};
