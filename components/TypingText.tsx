"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  sessionKey?: string; // types once per tab session
  showCursor?: boolean;
  onDone?: () => void;
};

export default function TypingText({
  text,
  speedMs = 55,
  startDelayMs = 0,
  sessionKey,
  showCursor = true,
  onDone,
}: TypingTextProps) {
  const [out, setOut] = useState("");

  useEffect(() => {
    // If already typed this session, show instantly and advance sequence.
    if (sessionKey) {
      const already = sessionStorage.getItem(sessionKey);
      if (already === "1") {
        setOut(text);
        onDone?.();
        return;
      }
    }

    let cancelled = false;
    let i = 0;
    let timeoutId: number | undefined;

    const start = () => {
      const tick = () => {
        if (cancelled) return;

        i += 1;
        setOut(text.slice(0, i));

        if (i < text.length) {
          timeoutId = window.setTimeout(tick, speedMs);
        } else {
          if (sessionKey) sessionStorage.setItem(sessionKey, "1");
          onDone?.();
        }
      };
      tick();
    };

    timeoutId = window.setTimeout(start, startDelayMs);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [text, speedMs, startDelayMs, sessionKey, onDone]);

  const done = out.length >= text.length;

  return (
    <span>
      {out}
      {showCursor && !done && <span className="cursor">|</span>}
    </span>
  );
}