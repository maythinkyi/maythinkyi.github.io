import Link from "next/link";
import { AnimatedText } from "@/components/animated-text";
import { Counter } from "@/components/counter";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { ScrollWords } from "@/components/scroll-words";
import { ServiceCard } from "@/components/service-card";
import { WorkCard } from "@/components/work-card";
// import { HorizontalScroll } from "@/components/horizontal-scroll";
import { CursorBubble } from "@/components/cursor-bubble";
import { SiteHeader } from "@/components/site-header";
import {
  footer,
  hero,
  industries,
  manifesto,
  services,
  site,
  stats,
  // testimonials,
  work,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pt-40 pb-16 md:px-10">
          <div>
            <Reveal>
              <span className="mb-10 inline-block rounded-full bg-surface px-5 py-2 text-lg">
                {hero.badge}
              </span>
            </Reveal>
            <h1 className="text-[clamp(2.25rem,7vw,7.5rem)] leading-[1.1] font-extralight tracking-[-0.035em]">
              <AnimatedText as="span" className="block" text={hero.headline} delay={150} stagger={40} />
            </h1>
          </div>

          <AnimatedText
            as="p"
            className="mt-5 sm:mt-0 ml-auto max-w-2xl text-2xl leading-snug font-light text-muted md:text-3xl"
            text={hero.intro}
            delay={900}
            stagger={28}
          />
        </section>

        {/* Manifesto, scroll-driven */}
        <section id="about" className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ScrollWords
            text={manifesto}
            className="max-w-6xl text-[clamp(2.25rem,5vw,5rem)] leading-[1.25] font-light tracking-[-0.02em] md:leading-[1.05]"
          />
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
          <AnimatedText as="h2" className="mb-16 text-5xl font-light tracking-tight md:text-7xl" text="Technical Skills" />

          <CursorBubble label="More" className="grid gap-px bg-foreground/20 md:grid-cols-2">
            {services.map((service, i) => {
              const dark = service.variant === "dark";
              return (
                <Reveal key={service.title} delay={i * 120}>
                  <ServiceCard title={service.title} tags={service.tags} dark={dark} />
                </Reveal>
              );
            })}
          </CursorBubble>
        </section>

        {/* Industries */}
        <section className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="bg-surface py-24">
            <div className="px-10 md:px-16">
              <AnimatedText as="h2" className="text-5xl font-light tracking-tight md:text-6xl" text="Project Domains" />
              <Reveal>
                <p className="mt-8 max-w-xl text-2xl leading-snug text-muted">{industries.description}</p>
              </Reveal>
            </div>
            <Marquee items={industries.list} />
          </div>
        </section>

        {/* Testimonials (hidden for now)
        <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
          <AnimatedText
            as="h2"
            className="mb-16 max-w-3xl text-5xl leading-tight font-light tracking-tight md:text-6xl"
            text="Our clients say it best."
          />
          <HorizontalScroll>
            {testimonials.map((t, i) => (
              <Reveal
                key={t.quote}
                delay={i * 120}
                className="flex min-h-[420px] w-[85vw] max-w-[440px] shrink-0 flex-col justify-between bg-surface p-10"
              >
                <p className="text-3xl leading-tight font-light">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-xl">{t.name}</p>
                  <p className="text-lg text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </Reveal>
            ))}
          </HorizontalScroll>
        </section>
        */}

        {/* Recent work */}
        <CursorBubble
          as="section"
          id="work"
          label="Explore"
          className="mx-auto max-w-[1600px] px-6 py-32 md:px-10"
        >
          <AnimatedText as="h2" className="mb-20 text-6xl font-light tracking-tight md:text-8xl" text="Recent work" />

          <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
            {work.map((project, i) => (
              <Reveal key={project.title} delay={(i % 2) * 150} className={i % 2 === 1 ? "md:mt-40" : ""}>
                <WorkCard slug={project.slug} title={project.title} subtitle={project.subtitle} tone={project.tone} />
              </Reveal>
            ))}
          </div>

          <a href="#work" className="mt-24 inline-flex items-center gap-4 text-2xl nav-link">
            view all work
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </CursorBubble>

        {/* Stats */}
        <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
          <div className="grid gap-16 border-t border-foreground/10 pt-20 md:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 120}>
                <p className="text-[clamp(6rem,14vw,12rem)] leading-none font-extralight tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-2xl text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-foreground text-background">
          <div className="mx-auto max-w-[1600px] px-6 pt-32 pb-10 md:px-10">
            <AnimatedText
              as="h2"
              className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.1] font-light tracking-tight"
              text="To build up a challenging career and to work with full dedication to achieve the organization's goal."
            />

            <Reveal className="mt-14">
              <a
                href={`mailto:${site.email}`}
                className="hidden items-center gap-4 rounded-full bg-background px-8 py-4 text-2xl text-foreground transition-transform duration-300 hover:-translate-y-1 md:inline-flex"
              >
                {site.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>

            <div className="mt-24 grid gap-12 text-xl text-background/70 md:grid-cols-3">
              <div>
                {footer.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div>
                {footer.emails.map((email) => (
                  <p key={email}>{email}</p>
                ))}
                <p>{footer.phone}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {footer.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="nav-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-24 flex flex-col justify-between gap-4 border-t border-background/15 pt-8 text-lg text-background/70 md:flex-row">
              <p>
                © {site.year} {site.name}
              </p>
              <p>All rights reserved</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
