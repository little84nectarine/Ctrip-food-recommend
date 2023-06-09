import { useCallback, useRef } from "react";

export default function useThrottle(fn, delay) {
  const timer = useRef(-1);
  // console.log("timer:", timer);
  const throttle = () => {
    if (timer.current > -1) {
      return;
    }
    timer.current = setTimeout(() => {
      fn();
      timer.current = -1;
      clearTimeout(timer.current);
    }, delay);
  };
  return throttle;
}