"use client";

import { useEffect, useRef, useState } from "react";

// Flips to true the first time the element enters the viewport, then stops observing.
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | undefined;

    // Wait for the preloader to finish, so animations start only once the page is revealed.
    const start = () => {
      // Already on screen: reveal right away instead of waiting for the observer's next frame.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer?.disconnect();
          }
        },
        { threshold, rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(el);
    };

    if (document.documentElement.dataset.intro === "done") start();
    else window.addEventListener("intro-done", start, { once: true });

    return () => {
      window.removeEventListener("intro-done", start);
      observer?.disconnect();
    };
  }, [threshold]);

  return [ref, inView] as const;
}
