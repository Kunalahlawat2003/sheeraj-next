import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { projects, projectDetails, slugify } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: slugify(p.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.name) === slug);
  return { title: project ? project.name : "Project", description: project?.blurb };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.name) === slug);
  const detail = projectDetails[slug];
  if (!project) notFound();

  return (
    <>
      {/* hero */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden pt-32">
        <Image src={project.image} alt={project.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/65 to-base/30" />
        <div className="container-x relative z-10 pb-14">
          <nav className="mb-6 flex items-center gap-2 text-xs text-silver/80">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="text-mist">/</span>
            <Link href="/projects" className="hover:text-gold">Projects</Link>
            <span className="text-mist">/</span>
            <span className="text-silver">{project.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-[0.72rem] uppercase tracking-[0.25em] text-gold">{project.category}</span>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-gold">{project.status}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.04] tracking-tight sm:text-6xl">{project.name}</h1>

          {detail && (
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-sm)] sm:grid-cols-4">
              {detail.facts.map((f) => (
                <div key={f.label} className="px-5 py-5 [background-color:var(--ui-surface-xs)]">
                  <div className="text-[0.65rem] uppercase tracking-wider text-mist">{f.label}</div>
                  <div className="mt-1.5 font-serif text-lg text-silver">{f.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* overview + scope */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div>
              <span className="eyebrow">Overview</span>
              <p className="mt-5 text-xl leading-relaxed text-silver/90">{detail?.overview ?? project.blurb}</p>
            </div>
          </Reveal>
          {detail && (
            <Reveal delay={0.08}>
              <div className="glass rounded-3xl p-7">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">Scope of work</div>
                <ul className="mt-5 space-y-3">
                  {detail.scope.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-silver/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* gallery */}
      {detail && (
        <section className="pb-20 md:pb-28">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {detail.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 4) * 0.06} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                  <div className="group relative h-full min-h-[12rem] overflow-hidden rounded-2xl border [border-color:var(--ui-border)]">
                    <Image src={src} alt={`${project.name} ${i + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* timeline */}
      {detail && (
        <section className="bg-ink py-20 md:py-28">
          <div className="container-x">
            <span className="eyebrow">Construction timeline</span>
            <div className="relative mt-10 grid gap-8 md:grid-cols-3">
              <div className="pointer-events-none absolute left-0 top-5 hidden h-px w-full bg-gradient-to-r from-gold/20 via-gold/50 to-transparent md:block" />
              {detail.timeline.map((t, i) => (
                <Reveal key={t.phase} delay={i * 0.1}>
                  <div className="relative">
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink font-display text-xs text-gold">0{i + 1}</span>
                    <div className="mt-5 font-serif text-xl">{t.phase}</div>
                    <p className="mt-2 text-sm text-mist">{t.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Planning something similar?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact">Talk to our team</MagneticButton>
            <Link href="/projects" className="btn btn-ghost">← All projects</Link>
          </div>
        </div>
      </section>
    </>
  );
}
