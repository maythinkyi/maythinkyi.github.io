"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type PreloaderPhase = "show" | "white-in" | "done";

const COUNT_MS = 2200;
const HOLD_MS = 300;
// The black slide-out lasts 4000ms (see app/globals.css). The hero starts at its midpoint.
const REVEAL_AT_MS = 2000;

// Full-screen intro. The black panel grows from the left as the count goes up to 100. Then it
// slides out to the right, revealing the index page from the left, and the overlay is removed.
export function Preloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("show");
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const slideTimer = setTimeout(() => setPhase("white-in"), COUNT_MS + HOLD_MS);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(slideTimer);
    };
  }, [reduced]);

  // Keep the page still while the intro is on screen.
  useEffect(() => {
    if (phase === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  // Start the hero while the black panel is halfway through its slide-out.
  useEffect(() => {
    if (phase !== "white-in") return;

    const timer = setTimeout(() => {
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro-done"));
    }, REVEAL_AT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  // Tell the page the intro is over, so the hero and other reveals can start.
  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event("intro-done"));
  }, [phase]);

  if (phase === "done") return null;

  const sliding = phase === "white-in";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden"
      // Remove the overlay the moment the black panel's slide-out ends, so the index page shows with no gap.
      onAnimationEnd={(event) => {
        if (sliding && event.target === event.currentTarget.firstElementChild) setPhase("done");
      }}
    >
      {/* White screen during the count, matching the black panel's right side. */}
      {phase === "show" && <div className="absolute inset-0 bg-background" />}

      {/* Black panel: its width follows the count, then it slides out to the right. */}
      <div
        className={`absolute inset-y-0 left-0 bg-foreground ${sliding ? "slide-out-right" : ""}`}
        style={{ width: `${sliding ? 100 : count}%` }}
      />

      {/* Difference blend keeps the number readable on the black panel. Removed once the slide starts. */}
      {phase === "show" && (
        <p className="absolute bottom-6 right-6 text-[clamp(6rem,14vw,12rem)] leading-none font-extralight tabular-nums tracking-tight text-background mix-blend-difference md:bottom-10 md:right-10">
          {count}
        </p>
      )}
    </div>
  );
}
