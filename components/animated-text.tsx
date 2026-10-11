"use client";

import type { CSSProperties, ElementType } from "react";
import { useInView } from "@/hooks/use-in-view";

type AnimatedTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  // Delay between consecutive words, in ms.
  stagger?: number;
  // Delay before the first word starts, in ms.
  delay?: number;
};

// Each word rises out of its own mask, one after another, when the block scrolls into view.
export function AnimatedText({
  text,
  as: Tag = "p",
  className,
  stagger = 60,
  delay = 0,
}: AnimatedTextProps) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} data-in-view={inView || undefined}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-word">
          <span
            className="split-inner"
            style={{ "--split-delay": `${delay + i * stagger}ms` } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
