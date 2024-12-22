import { useState, useEffect } from 'react';
import { formatTime } from '../utils/timeUtils';

interface UseTimerProps {
  showResult: boolean;
}

export function useTimer({ showResult }: UseTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!showResult && !isPaused) {
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showResult, isPaused]);

  const resetTimer = () => setSeconds(0);
  const togglePause = () => setIsPaused(!isPaused);

  return {
    timer: formatTime(seconds),
    seconds,
    isPaused,
    togglePause,
    resetTimer
  };
}