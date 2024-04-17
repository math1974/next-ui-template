import { debounce } from "lodash";
import { useMemo } from "react";

const useDebounce = (callback, delay = 1000) => {
  const debouncedFn = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );

  return debouncedFn;
};

export default useDebounce;
