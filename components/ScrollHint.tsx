"use client";

import { useEffect, useRef, useState } from "react";

type ScrollHintProps = {
  idleMs?: number;
};

export default function ScrollHint({ idleMs = 10000 }: ScrollHintProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
      }, idleMs);
    };

    const hide = () => {
      setVisible(false);
      startTimer();
    };

    startTimer();

    const events = ["scroll", "mousemove", "mousedown", "touchstart", "keydown"];

    events.forEach((e) => window.addEventListener(e, hide, { passive: true }));

    return () => {
      clearTimer();
      events.forEach((e) => window.removeEventListener(e, hide));
    };
  }, [idleMs]);

  if (!visible) return null;

  return (
    <div className="scroll-hint">
      <span>Scroll down</span>
      <div className="arrow">↓</div>
    </div>
  );
}
