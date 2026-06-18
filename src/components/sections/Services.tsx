"use client";

import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28 md:py-36">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 40%, #000, transparent 75%)",
        }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Build"
          title={
            <>
              From corridors of <span className="text-gold-gradient">commerce</span>{" "}
              to coasts of calm.
            </>
          }
          intro="Six disciplines, one engineering culture — delivered end-to-end with our own teams and fleet."
        />

        <div className="mt-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.key}
              delay={(i % 3) * 0.07}
              className={s.span === "wide" ? "lg:col-span-2" : ""}
            >
              <TiltCard max={6} className="h-full rounded-[1.25rem]">
                <div className="card-border flex h-full min-h-[15rem] flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/10 to-transparent text-gold">
                      <Icon name={s.icon} />
                    </span>
                    <span className="font-display text-xs tracking-widest text-mist">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight">{s.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
                      {s.blurb}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
