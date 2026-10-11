"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// A sticky statement whose words go from faint to full ink as the reader scrolls through it.
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const raw = travel > 0 ? -top / travel : 1;
      setScrolled(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // With reduced motion every word is shown at full ink.
  const progress = reduced ? 1 : scrolled;
  // Words light up one at a time; each one fades over roughly one word's worth of scroll.
  const lit = progress * words.length;

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <p className={className}>
          {words.map((word, i) => {
            const amount = Math.min(1, Math.max(0, lit - i));
            return (
              <span
                key={`${word}-${i}`}
                className="transition-colors duration-300"
                style={{ color: `color-mix(in srgb, var(--foreground) ${Math.round(amount * 100)}%, var(--faint))` }}
              >
                {word}
                {i < words.length - 1 ? " " : null}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
