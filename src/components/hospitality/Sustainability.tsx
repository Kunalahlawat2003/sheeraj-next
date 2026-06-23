"use client";

import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Icon from "@/components/ui/Icon";
import { PalmFrond } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Sustainability() {
  const s = hospitalityPage.sustainability;
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-ocean-deep via-[#0a3a36] to-[#1a2f33] py-20 sm:py-24 md:py-36">
      {/* sunset wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-coral/40 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-coral/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-lagoon/10 blur-[120px]" />
      <PalmFrond className="absolute -left-4 bottom-0 z-0 h-60 w-40 rotate-20 text-lagoon/10 anim-sway-soft" />
      <PalmFrond className="absolute -right-4 top-10 z-0 h-56 w-36 rotate-[-20deg] -scale-x-100 text-aqua/10 anim-sway" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} align="center" className="mb-16" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.07}>
              <TiltCard max={6} className="h-full rounded-3xl">
                <div className="card-border h-full p-7 bg-[#0b0d14]">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-lagoon/30 bg-linear-to-b from-lagoon/15 to-transparent text-aqua">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-foam">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foam/65">{item.blurb}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
