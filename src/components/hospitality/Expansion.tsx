"use client";

import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Expansion() {
  const e = hospitalityPage.expansion;
  return (
    <section className="relative overflow-hidden bg-shell py-28 text-ocean-deep md:py-36">
      <LeafCluster flip className="absolute -right-8 top-2 z-0 text-lagoon/12" />
      <Hibiscus className="absolute left-[6%] bottom-16 z-0 h-9 w-9 text-coral/45 anim-bob" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={e.eyebrow} title={e.title} className="mb-16" onLight />

        <div className="relative grid gap-10 md:grid-cols-4">
          {/* connector line */}
          <div className="pointer-events-none absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-lagoon/20 via-lagoon/50 to-coral/40 md:block" />

          {e.phases.map((p, i) => (
            <Reveal key={p.year} delay={i * 0.1}>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-lagoon/40 bg-shell font-display text-xs font-semibold text-lagoon">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-2xl text-ocean-deep">{p.year}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl text-ocean-deep">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ocean/70">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
