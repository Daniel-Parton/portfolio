export const debounce = (func: () => void, wait: number, immediate?: boolean) => {
  let timeout: any;
  return function () {
    // @ts-expect-error TS2683
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      // @ts-expect-error TS2345
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    // @ts-expect-error TS2345
    if (callNow) func.apply(context, args);
  };
};
