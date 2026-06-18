"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { projects, type Project } from "@/data/site";

function StatusPill({ status }: { status: Project["status"] }) {
  const ongoing = status === "Ongoing";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider ${
        ongoing ? "bg-gold/15 text-gold" : "bg-white/10 text-silver"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          ongoing ? "animate-pulse bg-gold" : "bg-silver"
        }`}
      />
      {status}
    </span>
  );
}

function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  return (
    <a
      href="/#projects"
      data-cursor
      className="group relative block h-full overflow-hidden rounded-3xl border border-white/8 transition-all duration-500 hover:border-gold/45"
    >
      <div className={`relative ${featured ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes={featured ? "(max-width:1024px) 100vw, 55vw" : "(max-width:1024px) 100vw, 30vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        {/* gradient + outline */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
        <div className="pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
      </div>

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">
            {p.category}
          </span>
          <StatusPill status={p.status} />
        </div>
        <h3 className={`mt-3 font-serif tracking-tight ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {p.name}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-mist">
          <span>{p.location}</span>
          <span className="h-1 w-1 rounded-full bg-mist/50" />
          <span>{p.year}</span>
        </div>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-silver/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
          {p.blurb}
        </p>
      </div>
    </a>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Built to <span className="text-gold-gradient">outlast</span> us.
              </>
            }
          />
          <Reveal>
            <MagneticButton href="/#contact" variant="ghost">
              Start a project
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2">
            <ProjectCard p={featured} featured />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
