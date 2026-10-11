"use client";

import { useEffect, useState, type RefObject } from "react";

// Touch screens have no hover. Instead, exactly one registered element at a time counts as hovered:
// the visible one whose centre is closest to the middle of the viewport. Every card on the page shares this list,
// so skill cards and work items never light up together.
type Entry = { el: HTMLElement; set: (active: boolean) => void };

const entries = new Set<Entry>();
let frame = 0;

function update() {
  frame = 0;
  const middle = window.innerHeight / 2;
  let best: Entry | null = null;
  let bestDistance = Infinity;

  for (const entry of entries) {
    const rect = entry.el.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;

    const distance = Math.abs((rect.top + rect.bottom) / 2 - middle);
    if (distance < bestDistance) {
      best = entry;
      bestDistance = distance;
    }
  }

  for (const entry of entries) entry.set(entry === best);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

export function useTouchInView(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !window.matchMedia("(hover: none)").matches) return;

    const entry: Entry = { el, set: setActive };
    entries.add(entry);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      entries.delete(entry);
      if (entries.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
      schedule();
    };
  }, [ref, enabled]);

  return active;
}