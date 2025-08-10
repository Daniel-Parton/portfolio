import { HTMLOrSVGElement } from './types';

export function findScrollContainers(
  element: HTMLOrSVGElement | null
): HTMLOrSVGElement[] {
  const result: HTMLOrSVGElement[] = [];
  if (!element || element === document.body) return result;
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  if (
    [overflow, overflowX, overflowY].some(
      (prop) => prop === 'auto' || prop === 'scroll'
    )
  )
    result.push(element);
  return [...result, ...findScrollContainers(element.parentElement)];
}
