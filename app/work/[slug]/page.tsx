import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedText } from "@/components/animated-text";
import { Reveal } from "@/components/reveal";
import { ScrollWords } from "@/components/scroll-words";
import { SiteHeader } from "@/components/site-header";
import { site, work } from "@/lib/content";

export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = work.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = work[index];
  const next = work[(index + 1) % work.length];

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Title */}
        <section className="mx-auto max-w-[1600px] px-6 pt-40 md:px-10">
          <Reveal>
            <Link href="/#work" className="mb-10 inline-block rounded-full bg-surface px-5 py-2 text-lg nav-link">
              ← back to work
            </Link>
          </Reveal>
          <h1 className="text-[clamp(3.25rem,9vw,9.5rem)] leading-[0.95] font-extralight tracking-[-0.035em]">
            <AnimatedText as="span" className="block" text={project.title} delay={150} stagger={60} />
          </h1>
        </section>

        {/* Tags and description */}
        <section className="mx-auto grid max-w-[1600px] gap-16 px-6 pt-20 pb-24 md:grid-cols-2 md:px-10">
          <Reveal>
            <p className="text-xl text-muted">Tech Stack:</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-foreground/25 bg-surface px-6 py-3 text-xl font-light whitespace-nowrap"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xl text-muted">Industries:</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {project.industries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-full border border-foreground/25 bg-surface px-6 py-3 text-xl font-light whitespace-nowrap"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-2xl leading-snug text-muted">{project.description}</p>
          </Reveal>
        </section>

        {/* Cover */}
        <section className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <div className={`aspect-[16/9] bg-gradient-to-br ${project.tone}`} />
          </Reveal>
        </section>

        {/* Statement, scroll-driven */}
        <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
          <ScrollWords
            text={project.outcome}
            className="max-w-6xl text-[clamp(2.25rem,5vw,5rem)] leading-[1.05] font-light tracking-[-0.02em]"
          />
        </section>

        {/* Next project */}
        <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
          <Reveal>
            <Link href={`/work/${next.slug}`} className="group block">
              <p className="text-lg text-muted">Next project</p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,8rem)] leading-[0.95] font-extralight tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-4">
                {next.title}
              </h2>
              <p className="mt-4 text-2xl text-muted">{next.subtitle}</p>
            </Link>
          </Reveal>
        </section>

        {/* Contact */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-[1600px] px-6 pt-32 pb-10 md:px-10">
            <AnimatedText
              as="h2"
              className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.1] font-light tracking-tight"
              text="To build up a challenging career and to work with full dedication to achieve the organization's goal."
            />
            <Reveal className="mt-14">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-4 rounded-full bg-background px-8 py-4 text-2xl text-foreground transition-transform duration-300 hover:-translate-y-1"
              >
                {site.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
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
