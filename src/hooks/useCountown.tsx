import { useState, useEffect, useRef } from "react";

export function useCountdown(initialTime: number) {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout>();
  const endTimeRef = useRef<number>();

  // Start or reset the countdown
  const start = (time: number = initialTime) => {
    setRemainingTime(time);
    endTimeRef.current = Date.now() + time * 1000;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const timeLeft = Math.max(
        0,
        Math.ceil((endTimeRef.current! - Date.now()) / 1000)
      );

      if (timeLeft === 0 && timerRef.current) {
        clearInterval(timerRef.current);
      }

      setRemainingTime(timeLeft);
    }, 1000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { remainingTime, start };
}
