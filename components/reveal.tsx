"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

// Fades and lifts its children into place once, the first time they scroll into view.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      data-in-view={inView || undefined}
      className={`reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
