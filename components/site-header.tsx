"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

// closed → opening → open → closing → closed
type MenuPhase = "closed" | "opening" | "open" | "closing";

const MENU_MS = 1100;

export function SiteHeader() {
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const isOpen = phase === "opening" || phase === "open";

  // Finish the enter/exit animation, then settle into the next phase.
  useEffect(() => {
    if (phase === "opening") {
      const timer = setTimeout(() => setPhase("open"), MENU_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "closing") {
      const timer = setTimeout(() => setPhase("closed"), MENU_MS);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Lock page scroll while the mobile menu is open and close on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("closing");
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const toggle = () => setPhase(isOpen ? "closing" : "opening");
  const close = () => {
    if (isOpen) setPhase("closing");
  };
  // Menu links navigate away, so they hide the menu at once without the close animation.
  const closeInstantly = () => setPhase("closed");

  const panelAnimation = phase === "opening" ? "menu-in" : phase === "closing" ? "menu-out" : "";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="text-3xl font-medium tracking-tight">
            {site.logoText}
          </Link>

          <nav className="hidden items-center gap-10 text-2xl font-medium md:flex">
            {site.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link-bold">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="hidden text-2xl font-medium md:inline nav-link-bold">
              {site.ctaLabel}
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label={site.ctaLabel}
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 hover:rotate-45 md:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center md:hidden"
            >
              <span className="relative block h-6 w-7">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-7 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${
                    isOpen ? "translate-y-[11px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-7 -translate-y-1/2 bg-foreground transition-opacity duration-300 motion-reduce:transition-none ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-7 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${
                    isOpen ? "-translate-y-[11px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-blur would otherwise trap the fixed drawer inside the header box. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex-col bg-foreground text-background md:hidden ${
          phase === "closed" ? "hidden" : "flex"
        } ${panelAnimation}`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-24 shrink-0 items-center justify-between px-6">
          <Link href="/" onClick={closeInstantly} className="text-3xl font-medium tracking-tight">
            {site.logoText}
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="flex h-8 w-8 cursor-pointer items-center justify-center"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-6 pt-16">
          {site.navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeInstantly} className="py-3 text-5xl font-normal leading-tight">
              {link.label}
            </a>
          ))}

          <a
            href={`mailto:${site.email}`}
            onClick={closeInstantly}
            className="mt-16 inline-flex items-center gap-4 self-start py-3 text-4xl font-normal"
          >
            {site.ctaLabel}
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
