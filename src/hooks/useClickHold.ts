import { useState, useEffect, useRef } from 'react';

interface IUseClickHoldProps {
  callback: (...args: never) => unknown;
  isInstant?: boolean;
  delay?: number;
}

const useClickHold = ({
  callback,
  isInstant = false,
  delay = 200,
}: IUseClickHoldProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHolding) {
      if (isInstant) {
        setTimeout(callback, 0);
      }
      intervalRef.current = setInterval(callback, delay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [delay, isHolding]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return {
    onPointerDown: () => setIsHolding(true),
    onPointerUp: () => setIsHolding(false),
    onPointerLeave: () => setIsHolding(false),
  };
};

export default useClickHold;
