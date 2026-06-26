"use client";

import Link from "next/link";
import Image from "next/image";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster, Hibiscus } from "./tropical";
import { hospitalityPage, projects, slugify } from "@/data/site";

export default function Expansion() {
  const e = hospitalityPage.expansion;
  const andamanProjects = projects.filter((p) => p.location === "Andaman & Nicobar Islands");

  return (
    <section className="relative overflow-hidden bg-shell py-20 text-ocean-deep sm:py-24 md:py-36">
      <LeafCluster flip className="absolute -right-8 top-2 z-0 text-lagoon/12" />
      <Hibiscus className="absolute left-[6%] bottom-16 z-0 h-9 w-9 text-coral/45 anim-bob" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={e.eyebrow} title={e.title} className="mb-12 sm:mb-16" onLight />

        <div className="grid gap-8 md:grid-cols-2">
          {e.phases.map((phase, i) => {
            const project = andamanProjects[i];
            const href = project ? `/projects/${slugify(project.name)}` : "#";

            return (
              <Reveal key={phase.year} delay={i * 0.1}>
                <Link href={href} className="group block">
                  {/* Image card */}
                  <div className="relative overflow-hidden rounded-2xl aspect-4/3">
                    {project?.image && (
                      <Image
                        src={project.image}
                        alt={phase.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: project.coverPosition ?? "center" }}
                      />
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-ocean-deep/85 via-ocean-deep/20 to-transparent" />

                    {/* Number + investment badge */}
                    <div className="absolute top-5 left-5 flex items-center gap-3">
                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md font-display text-xs font-semibold text-foam">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-2xl text-foam drop-shadow-sm">{phase.year}</span>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-foam transition-all duration-300 group-hover:bg-aqua/80 group-hover:border-aqua/50 group-hover:text-ocean-deep">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M3 13L13 3M7 3h6v6" />
                      </svg>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="mt-5 px-1">
                    <h3 className="font-serif text-xl text-ocean-deep transition-colors duration-300 group-hover:text-lagoon">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ocean/80">{phase.body}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
