"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import HospHeading from "./HospHeading";
import { PalmTree, PalmFrond, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Vision() {
  const v = hospitalityPage.vision;
  return (
    <section className="relative overflow-hidden bg-cream py-28 text-ocean-deep md:py-36">
      {/* faint palm watermark */}
      <div className="pointer-events-none absolute -right-10 top-10 z-0 text-ocean-deep/[0.05]">
        <PalmTree className="h-80 w-80" />
      </div>
      <PalmFrond className="pointer-events-none absolute -left-6 bottom-0 z-0 h-56 w-36 rotate-[15deg] text-[#0e463f]/10 anim-sway-soft" />
      <Hibiscus className="pointer-events-none absolute left-[42%] top-16 z-0 h-8 w-8 text-coral/40 anim-bob" />

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <HospHeading eyebrow={v.eyebrow} title={v.title} intro={v.body} onLight />
          <ul className="mt-9 space-y-4">
            {v.points.map((p, i) => (
              <Reveal key={p} delay={i * 0.07}>
                <li className="flex items-start gap-3 text-[0.95rem] text-ocean/85">
                  <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-lagoon/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(6,38,47,0.5)]">
              <Image
                src={v.image}
                alt="Aerial view of the island estate"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* floating tag */}
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white/80 px-6 py-4 backdrop-blur shadow-xl sm:-left-8">
              <div className="font-serif text-3xl text-ocean-deep">31.18<span className="text-lagoon">ac</span></div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ocean/80">Pristine island estate</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
