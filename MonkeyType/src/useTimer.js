import { useState, useRef, useEffect, useCallback } from "react";

export function useTimer(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(
    (newSeconds = initialSeconds) => {
      clearInterval(intervalRef.current);
      setSecondsLeft(newSeconds);
      setRunning(false);
    },
    [initialSeconds]
  );

  return { secondsLeft, running, start, stop, reset };
}
