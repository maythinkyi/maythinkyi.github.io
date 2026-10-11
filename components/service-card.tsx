"use client";

import { useRef } from "react";
import { useTouchInView } from "@/components/use-touch-in-view";

type ServiceCardProps = {
  title: string;
  tags: readonly string[];
  dark: boolean;
};

// Light cards turn black on hover, or while they are in the middle of the screen on touch devices. The "More" bubble is drawn by ServicesGrid.
export function ServiceCard({ title, tags, dark }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useTouchInView(ref, !dark);

  return (
    <div
      ref={ref}
      className={`group relative flex h-full min-h-[360px] flex-col justify-between gap-16 overflow-hidden p-10 transition-colors duration-500 md:p-14 ${
        dark
          ? "bg-foreground text-background"
          : active
            ? "bg-foreground text-background"
            : "bg-surface hover:bg-foreground hover:text-background"
      }`}
    >
      <h3 className="text-4xl font-light tracking-tight md:text-5xl">{title}</h3>
      <ul className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li
            key={tag}
            className={`rounded-full border px-6 py-3 text-xl font-light whitespace-nowrap transition-colors duration-500 ${
              dark || active ? "border-background/30" : "border-foreground/25 group-hover:border-background/30"
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
