export const debounce = (func: (...args: any[]) => any, time: number) => {
  let timer: ReturnType<typeof setTimeout>;

  function debounced(...args: any[]) {
    clearTimeout(timer);
    setTimeout(() => func(args), time);
  }

  debounced.clear = function () {
    clearTimeout(timer);
  };
  return debounced;
};
