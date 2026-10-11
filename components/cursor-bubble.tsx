"use client";

import { useEffect, useRef, type ElementType, type PointerEvent, type ReactNode } from "react";

// Share of the remaining distance covered each frame. Lower means the bubble trails the pointer more slowly.
const FOLLOW_EASE = 0.06;

// Wraps a block with a round label that drifts after the pointer anywhere inside it.
export function CursorBubble({
  label,
  as: Tag = "div",
  id,
  className,
  children,
}: {
  label: string;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const areaRef = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  const paint = () => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const { x, y } = current.current;
    bubble.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  const step = () => {
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * FOLLOW_EASE;
    c.y += (t.y - c.y) * FOLLOW_EASE;
    paint();

    const settled = Math.abs(t.x - c.x) < 0.5 && Math.abs(t.y - c.y) < 0.5;
    frame.current = settled ? 0 : requestAnimationFrame(step);
  };

  // Converts the pointer position to coordinates relative to the wrapper.
  const aim = (e: PointerEvent<HTMLElement>) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onEnter = (e: PointerEvent<HTMLElement>) => {
    aim(e);
    // Appear right under the pointer instead of sliding in from the corner.
    current.current = { ...target.current };
    paint();
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    aim(e);
    if (!frame.current) frame.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <Tag
      ref={areaRef}
      id={id}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      className={`group relative ${className ?? ""}`}
    >
      {children}

      <span
        ref={bubbleRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 flex h-20 w-20 scale-0 items-center justify-center rounded-full bg-background text-base text-foreground transition-[scale] duration-300 ease-out group-hover:scale-100"
      >
        {label}
      </span>
    </Tag>
  );
}
