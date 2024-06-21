import { useEffect, useRef } from "react";

const useClickOutside = <TRef extends HTMLElement>(callback: Function) => {
  const ref = useRef<TRef>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;