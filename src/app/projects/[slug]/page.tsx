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

  // Assemble a single, ordered specification register from project + detail.
  // Only rows that have a value are emitted, and any fact already shown as a
  // headline field (e.g. Contract Value) is de-duplicated by label and value.
  const record: { label: string; value: string }[] = [];
  const pushUnique = (label: string, value: string | undefined) => {
    if (!value) return;
    if (record.some((r) => r.label.toLowerCase() === label.toLowerCase() || r.value === value)) return;
    record.push({ label, value });
  };
  pushUnique("Client / Authority", detail?.client);
  pushUnique("Contract Value", detail?.value);
  pushUnique("Section / Stretch", detail?.stretch);
  pushUnique("Category", project.category);
  pushUnique("Location", project.location);
  pushUnique("Status", project.status);
  pushUnique(project.status === "Executed" ? "Completed" : "Target Completion", project.year);
  for (const f of detail?.facts ?? []) pushUnique(f.label, f.value);

  const completionLabel = project.status === "Executed" ? "Completed" : "Target Completion";

  return (
    <main className="pt-28 sm:pt-32 md:pt-36">
      {/* ── Document header: breadcrumb + identifying meta + title ──────── */}
      <header className="border-b [border-color:var(--ui-border)]">
        <div className="container-x pb-12 md:pb-16">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-display text-xs tracking-wide text-mist"
            >
              <Link href="/" className="transition-colors hover:text-accent-gold-strong">
                Home
              </Link>
              <span aria-hidden className="text-faint">/</span>
              <Link href="/projects" className="transition-colors hover:text-accent-gold-strong">
                Projects
              </Link>
              <span aria-hidden className="text-faint">/</span>
              <span className="text-silver">{project.category}</span>
            </nav>
          </Reveal>

          {/* 12-column header grid: identity left, status right */}
          <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[0.7rem] uppercase tracking-[0.28em]">
                  <span className="text-accent-gold-strong">{project.category}</span>
                  <span aria-hidden className="h-3 w-px bg-[var(--ui-border-lg)]" />
                  <span className="text-mist">{project.location}</span>
                  <span aria-hidden className="h-3 w-px bg-[var(--ui-border-lg)]" />
                  <span className="text-mist">
                    {completionLabel} {project.year}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-5 max-w-4xl font-serif text-4xl font-medium leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
                  {project.name}
                </h1>
              </Reveal>
            </div>

            {/* Status — a quiet, labelled marker, not a loud badge */}
            <div className="lg:col-span-3 lg:flex lg:justify-end">
              <Reveal delay={0.14}>
                <div className="inline-flex flex-col gap-1.5 border-l-2 border-gold/55 pl-4">
                  <span className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-mist">Status</span>
                  <span className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.14em] text-silver">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${
                        project.status === "Ongoing"
                          ? "bg-gold"
                          : project.status === "Executed"
                          ? "bg-gold/60"
                          : "bg-faint"
                      }`}
                    />
                    {project.status}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Full official contract title — formal designation, set quietly */}
          {detail?.officialName && (
            <Reveal delay={0.18}>
              <div className="mt-8 max-w-4xl border-l-2 border-gold/45 pl-5">
                <div className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-mist">
                  Official Designation
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist sm:text-[1rem]">{detail.officialName}</p>
              </div>
            </Reveal>
          )}
        </div>

        {/* Contained lead plate — a framed banner, not a 100vh takeover.
            Uses the purpose-built media-scrim + text-on-media system so the
            caption is guaranteed legible in BOTH light and dark themes. */}
        <Reveal delay={0.12}>
          <div className="container-x pb-12 sm:pb-14 md:pb-20">
            <div className="media-scrim on-media relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-(--ui-border-md) md:aspect-[2.4/1]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 1344px) 100vw, 1280px"
                className="object-cover"
                style={{ objectPosition: project.coverPosition ?? "center" }}
              />
              <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-wrap items-end justify-between gap-3 p-5 md:p-7">
                <span className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-on-media">
                  {project.category} &middot; {project.location}
                </span>
                <span className="font-display text-[0.62rem] uppercase tracking-[0.22em] text-on-media-muted">
                  Ref. {slug}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      {/* ── Key-metrics strip — tasteful, restrained numbers ───────────── */}
      {detail?.facts && detail.facts.length > 0 && (
        <section className="border-b [border-color:var(--ui-border)] bg-ink">
          <div className="container-x">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {detail.facts.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.06}>
                  <div
                    className={`py-8 md:py-10 ${
                      i % 2 !== 0 ? "border-l [border-color:var(--ui-border)] pl-6" : "pr-6"
                    } ${i >= 2 ? "border-t [border-color:var(--ui-border)] sm:border-t-0" : ""} ${
                      i % 4 !== 0 ? "sm:border-l sm:[border-color:var(--ui-border)] sm:pl-8" : "sm:pr-8"
                    }`}
                  >
                    <div className="font-display text-[0.6rem] uppercase tracking-[0.24em] text-mist">{f.label}</div>
                    <div className="mt-2.5 font-serif text-2xl leading-tight text-silver md:text-[1.8rem]">
                      {f.value}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Overview (two columns) + sticky specification register ─────── */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-x-14 gap-y-10 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-16">
            {/* Overview narrative + scope of work */}
            <div className="lg:col-span-7 xl:col-span-8">
              <Reveal>
                <span className="eyebrow">Project Overview</span>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.75] text-silver sm:text-[1.18rem]">
                  {detail?.overview ?? project.blurb}
                </p>
              </Reveal>

              {detail?.scope && detail.scope.length > 0 && (
                <div className="mt-10 sm:mt-12">
                  <Reveal>
                    <h2 className="font-display text-xs font-medium uppercase tracking-[0.24em] text-accent-gold-strong">
                      Scope of Work
                    </h2>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <ul className="mt-5 max-w-2xl border-t [border-color:var(--ui-border)]">
                      {detail.scope.map((s, i) => (
                        <li key={s} className="flex items-baseline gap-5 border-b [border-color:var(--ui-border)] py-3.5">
                          <span className="font-display text-[0.7rem] tabular-nums text-accent-gold-strong">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[1rem] leading-relaxed text-silver">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              )}
            </div>

            {/* Specification register — formal definition list, sticky-feeling */}
            <div className="lg:col-span-5 xl:col-span-4">
              <Reveal delay={0.08}>
                <div className="lg:sticky lg:top-28">
                  <div className="overflow-hidden rounded-xl border border-(--ui-border-md) bg-(--ui-surface-xs)">
                    <div className="flex items-center justify-between border-b [border-color:var(--ui-border)] px-6 py-4">
                      <span className="font-display text-[0.62rem] font-medium uppercase tracking-[0.26em] text-accent-gold-strong">
                        Project Fact Sheet
                      </span>
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                    </div>
                    <dl>
                      {record.map((r, i) => (
                        <div
                          key={r.label}
                          className={`grid grid-cols-5 gap-4 px-6 py-4 ${
                            i !== record.length - 1 ? "border-b [border-color:var(--ui-border)]" : ""
                          }`}
                        >
                          <dt className="col-span-2 font-display text-[0.66rem] uppercase tracking-[0.12em] leading-snug text-mist">
                            {r.label}
                          </dt>
                          <dd className="col-span-3 text-right text-[0.95rem] font-medium leading-snug text-silver">
                            {r.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <p className="mt-4 px-1 font-display text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                    Sheeraj Projects Pvt. Ltd. &middot; EPC Contractor
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery — mosaic: one large feature tile + supporting tiles ── */}
      {detail && detail.gallery.length > 0 && (
        <section className="border-t [border-color:var(--ui-border)] bg-ink py-16 sm:py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Site Documentation</span>
                  <h2 className="mt-4 font-serif text-3xl tracking-tight text-silver md:text-4xl">From the field</h2>
                </div>
                <span className="font-display text-[0.64rem] uppercase tracking-[0.2em] text-mist">
                  {detail.gallery.length} {detail.gallery.length === 1 ? "photograph" : "photographs"}
                </span>
              </div>
            </Reveal>

            {detail.gallery.length === 2 ? (
              /* 2 images — equal side-by-side */
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {detail.gallery.map((src, i) => (
                  <Reveal key={src} delay={i * 0.08}>
                    <figure className="group relative aspect-4/3 overflow-hidden rounded-xl border border-(--ui-border-md)">
                      <Image
                        src={src}
                        alt={`${project.name} — site view ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </figure>
                  </Reveal>
                ))}
              </div>
            ) : detail.gallery.length === 3 ? (
              /* 3 images — 1 large feature left + 2 stacked right */
              <div className="mt-10 grid gap-4 sm:grid-cols-[2fr_1fr]">
                <Reveal>
                  <figure className="group relative aspect-4/3 overflow-hidden rounded-xl border border-(--ui-border-md) sm:aspect-auto sm:h-full">
                    <Image
                      src={detail.gallery[0]}
                      alt={`${project.name} — site view 1`}
                      fill
                      sizes="(max-width: 640px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </figure>
                </Reveal>
                <div className="flex flex-col gap-4">
                  {detail.gallery.slice(1).map((src, i) => (
                    <Reveal key={src} delay={(i + 1) * 0.08}>
                      <figure className="group relative aspect-4/3 overflow-hidden rounded-xl border border-(--ui-border-md)">
                        <Image
                          src={src}
                          alt={`${project.name} — site view ${i + 2}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : (
              /* 4+ images — original dense mosaic */
              <div className="mt-10 grid grid-flow-dense auto-rows-[8.5rem] grid-cols-2 gap-4 sm:auto-rows-[10rem] md:auto-rows-[12rem] md:grid-cols-4">
                {detail.gallery.map((src, i) => (
                  <Reveal
                    key={src}
                    delay={(i % 4) * 0.05}
                    className={i === 0 ? "col-span-2 row-span-2" : ""}
                  >
                    <figure className="group relative h-full w-full overflow-hidden rounded-xl border border-(--ui-border-md)">
                      <Image
                        src={src}
                        alt={`${project.name} — site view ${i + 1}`}
                        fill
                        sizes={i === 0 ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 50vw, 25vw"}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Construction timeline — ordered phase register ─────────────── */}
      {detail?.timeline && detail.timeline.length > 0 && (
        <section className="border-t [border-color:var(--ui-border)] py-16 sm:py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <span className="eyebrow">Construction Sequence</span>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight text-silver md:text-4xl">
                Phases of delivery
              </h2>
            </Reveal>

            <div className="mt-10 sm:mt-12 overflow-hidden rounded-xl border border-(--ui-border-md)">
              {detail.timeline.map((t, i) => (
                <Reveal key={t.phase} delay={i * 0.06}>
                  <div
                    className={`grid grid-cols-12 items-baseline gap-4 px-6 py-6 transition-colors hover:bg-(--ui-surface-xs) md:px-8 ${
                      i !== detail.timeline.length - 1 ? "border-b [border-color:var(--ui-border)]" : ""
                    }`}
                  >
                    <div className="col-span-12 flex items-center gap-4 sm:col-span-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/40 font-display text-xs tabular-nums text-accent-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                        Phase {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="col-span-12 font-serif text-xl leading-tight text-silver sm:col-span-4 lg:text-2xl">
                      {t.phase}
                    </h3>
                    <p className="col-span-12 text-[0.98rem] leading-relaxed text-mist sm:col-span-5">{t.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Closing CTA — restrained, official sign-off ────────────────── */}
      <section className="border-t [border-color:var(--ui-border)] bg-ink py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-(--ui-border-md) bg-(--ui-surface-xs) p-8 md:flex-row md:items-center md:p-12">
              <div className="max-w-xl">
                <span className="eyebrow">Work With Us</span>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-balance text-silver md:text-4xl">
                  Planning a project of similar scale?
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-mist">
                  Our engineering and EPC teams partner with public authorities and private clients across highways,
                  ring roads, canals and heavy civil works.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="/contact">Talk to our team</MagneticButton>
                <Link
                  href="/projects"
                  className="font-display text-sm tracking-wide text-silver transition-colors hover:text-accent-gold-strong"
                >
                  &larr; All projects
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
