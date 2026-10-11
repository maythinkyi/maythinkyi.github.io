"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Page scroll needed per pixel of sideways travel. Higher means the cards slide more slowly.
const SCROLL_PER_PX = 3;

// Pins the section while the page scrolls down and slides the row of cards sideways in step with it.
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const refresh = () => {
      frame = 0;
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      // How far the track must slide so its last card lands at the right edge.
      setDistance(Math.max(0, track.scrollWidth - document.documentElement.clientWidth));

      const { top, height } = wrapper.getBoundingClientRect();
      const travel = height - window.innerHeight;
      setProgress(travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(refresh);
    };

    frame = requestAnimationFrame(refresh);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Reduced motion: keep the cards in a plain sideways scroll with no pinning.
  if (reduced) {
    return (
      <div className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-6 md:-mx-10 md:px-10">{children}</div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${distance * SCROLL_PER_PX}px)` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 will-change-transform md:px-10"
          style={{ transform: `translateX(${-progress * distance}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
