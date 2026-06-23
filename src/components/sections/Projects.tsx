"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { projects, slugify, type Project, type ProjectStatus } from "@/data/site";

type Accent = {
  text: string;
  dot: string;
  pill: string;
  ring: string;
  border: string;
};

/* Full literal class strings so Tailwind can detect them (no dynamic interpolation). */
const ACCENTS: Record<ProjectStatus, Accent> = {
  Executed: {
    text: "text-lagoon",
    dot: "bg-lagoon",
    pill: "bg-lagoon/15 text-lagoon",
    ring: "group-hover:ring-lagoon/40",
    border: "hover:border-lagoon/50",
  },
  Ongoing: {
    text: "text-accent-gold-strong",
    dot: "bg-gold",
    pill: "bg-gold/15 text-accent-gold-strong",
    ring: "group-hover:ring-gold/40",
    border: "hover:border-gold/50",
  },
  Awarded: {
    text: "text-coral",
    dot: "bg-coral",
    pill: "bg-coral/15 text-coral",
    ring: "group-hover:ring-coral/40",
    border: "hover:border-coral/50",
  },
};

const GROUPS: { status: ProjectStatus; label: string; grid: string; aspect: string; sizes: string }[] = [
  { status: "Executed", label: "Executed", grid: "sm:grid-cols-2", aspect: "aspect-16/10", sizes: "(max-width:640px) 100vw, (min-width:1344px) 672px, 50vw" },
  { status: "Ongoing", label: "Ongoing", grid: "sm:grid-cols-2 lg:grid-cols-3", aspect: "aspect-4/3", sizes: "(max-width:640px) 100vw, (max-width:1024px) 50vw, (min-width:1344px) 448px, 33vw" },
  // narrow 4-col cards → portrait at lg so the long titles have room
  { status: "Awarded", label: "Awarded", grid: "sm:grid-cols-2 lg:grid-cols-4", aspect: "aspect-4/3 lg:aspect-3/4", sizes: "(max-width:640px) 100vw, (max-width:1024px) 50vw, (min-width:1344px) 336px, 25vw" },
];

function StatusPill({ status }: { status: ProjectStatus }) {
  const a = ACCENTS[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-wider ${a.pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot} ${status === "Ongoing" ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}

function ProjectCard({ p, aspect, sizes }: { p: Project; aspect: string; sizes: string }) {
  const a = ACCENTS[p.status];
  return (
    <a
      href={`/projects/${slugify(p.name)}`}
      data-cursor
      className={`group relative block h-full overflow-hidden rounded-3xl border border-(--ui-border) bg-(--ui-surface-xs) transition-all duration-500 ${a.border}`}
    >
      <div className={`relative ${aspect}`}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
        />
        {/* fade for text legibility (works in both themes — fades to page color) */}
        <div className="absolute inset-0 bg-linear-to-t from-base via-base/45 to-transparent" />
        <div className={`pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-transparent transition-all duration-500 ${a.ring}`} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`text-[0.68rem] uppercase tracking-[0.2em] ${a.text}`}>{p.category}</span>
          <StatusPill status={p.status} />
        </div>
        <h3 className="mt-2.5 font-serif text-xl tracking-tight md:text-2xl">{p.name}</h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-mist">
          <span>{p.location}</span>
          <span className="h-1 w-1 rounded-full bg-mist/50" />
          <span>{p.year}</span>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Built to <span className="text-gold-gradient">outlast</span> us.
              </>
            }
          />
          <Reveal>
            <MagneticButton href="/projects" variant="ghost">
              View all projects
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          {GROUPS.map((group) => {
            const items = projects.filter((p) => p.status === group.status);
            if (items.length === 0) return null;
            const a = ACCENTS[group.status];
            const count = String(items.length).padStart(2, "0");
            return (
              <div key={group.status}>
                {/* group header */}
                <Reveal>
                  <div className="mb-7 flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${a.dot} ${group.status === "Ongoing" ? "animate-pulse" : ""}`} />
                      <h3 className="font-display text-sm font-medium uppercase tracking-[0.28em] text-silver">
                        {group.label}
                      </h3>
                    </div>
                    <span className="h-px flex-1 bg-(--ui-border)" />
                    <span className={`font-serif text-lg ${a.text}`}>{count}</span>
                  </div>
                </Reveal>

                {/* cards */}
                <div className={`grid grid-cols-1 gap-5 ${group.grid}`}>
                  {items.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.06}>
                      <ProjectCard p={p} aspect={group.aspect} sizes={group.sizes} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
