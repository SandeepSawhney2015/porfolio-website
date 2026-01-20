"use client";

import { useEffect, useMemo, useState } from "react";

type Activity =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; href: string };

type Props = {
  start?: boolean;
  displayMs?: number; // how long each activity stays visible
  transitionMs?: number; // fade/slide duration
};

function pickRandomIndex(max: number, exclude: number) {
  if (max <= 1) return 0;
  let next = exclude;
  while (next === exclude) {
    next = Math.floor(Math.random() * max);
  }
  return next;
}

export default function CyclingActivities({
  start = true,
  displayMs = 2200,
  transitionMs = 240,
}: Props) {
  const activities: Activity[] = useMemo(
    () => [
      { kind: "text", value: "Embedded Sys AI Research" },
      { kind: "text", value: "Drone Embedded Systems" },
      { kind: "text", value: "Club Athletics" },

      { kind: "text", value: "Running" },
      {
      kind: "link",
      value: "MAAV Public Relations",
      href: "https://www.instagram.com/umichmaav/?hl=en",
      holdMs: 6500, // <-- longer hold (adjust to taste)
      },

      { kind: "text", value: "Cooking" },
      { kind: "text", value: "Computer Programming" },
      { kind: "text", value: "Hackathons" },
      { kind: "text", value: "Puzzles" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!start) return;

    // Hold visible, then fade out, then switch, then fade in
    const holdTimer = window.setTimeout(() => {
      setPhase("out");

      const swapTimer = window.setTimeout(() => {
        setIndex((cur) => pickRandomIndex(activities.length, cur));
        setPhase("in");
      }, transitionMs);

      return () => window.clearTimeout(swapTimer);
    }, displayMs);

    return () => window.clearTimeout(holdTimer);
  }, [start, index, displayMs, transitionMs, activities.length]);

  const item = activities[index];

  const content =
    item.kind === "link" ? (
      <span className="activityLinkWrap">
        <a className="activityLink" href={item.href} target="_blank" rel="noreferrer">
          {item.value}
        </a>

        <span className="activityNudge" aria-hidden="true">
          <span className="activityNudgeArrow">←</span>
          <span className="activityNudgeText">Click me to learn more!</span>
        </span>
      </span>
    ) : (
      <span>{item.value}</span>
    );


  return (
    <span
      className={`activitySwap ${phase === "in" ? "activityIn" : "activityOut"}`}
      style={{ transitionDuration: `${transitionMs}ms` }}
    >
      {content}
    </span>
  );
}
