"use client";

import Link from "next/link";
import { useRef } from "react";
import { useTouchInView } from "@/components/use-touch-in-view";

type WorkCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  tone: string;
};

// Hover zooms the image and shifts the title. On touch devices the same effect runs while the card is in the middle of the screen.
export function WorkCard({ slug, title, subtitle, tone }: WorkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const active = useTouchInView(ref);

  return (
    <Link ref={ref} href={`/work/${slug}`} className="group block">
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${tone} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02] ${
          active ? "scale-[1.02]" : ""
        }`}
      >
        <span className="absolute top-6 right-6 rounded-full bg-background/90 px-4 py-1 text-base">case study</span>

        {/* Touch devices get the "Explore" bubble here while the card is active; desktop uses the one drawn by the section. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-base text-foreground transition-transform duration-300 ease-out ${
            active ? "scale-100" : "scale-0"
          }`}
        >
          Explore
        </span>
      </div>
      <h3
        className={`mt-6 text-3xl font-light transition-transform duration-500 group-hover:translate-x-3 ${
          active ? "translate-x-3" : ""
        }`}
      >
        {title}
      </h3>
      <p className="text-2xl text-muted">{subtitle}</p>
    </Link>
  );
}
