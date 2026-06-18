"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutHighlights, chairman, media, stats } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* left — copy */}
        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title={
              <>
                Two identities.
                <br />
                <span className="text-gold-gradient italic">One standard</span> of
                building.
              </>
            }
            intro="For over fifteen years we have engineered the roads, canals and bridges that connect India — and today we bring that same precision to crafting destinations that inspire it."
          />

          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {aboutHighlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.06}>
                <li className="flex items-start gap-3 text-sm text-silver/85">
                  <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  {h}
                </li>
              </Reveal>
            ))}
          </ul>

          {/* stats */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/80 px-5 py-6">
                <div className="font-serif text-3xl text-gold-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[0.72rem] uppercase leading-snug tracking-wider text-mist">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right — image + chairman quote */}
        <Reveal delay={0.1}>
          <div className="relative">
            <TiltCard max={5} className="overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={media.aboutImage}
                  alt="Sheeraj engineering at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
              </div>
            </TiltCard>

            {/* floating chairman quote */}
            <div className="glass anim-float absolute -bottom-8 -left-4 max-w-xs rounded-2xl p-6 sm:-left-10">
              <p className="font-serif text-lg italic leading-snug text-silver">
                “{chairman.shortQuote}”
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-silver">{chairman.name}</div>
                  <div className="text-xs text-mist">{chairman.role}</div>
                </div>
                <MagneticButton
                  href="/#contact"
                  variant="ghost"
                  className="!px-4 !py-2 text-[0.7rem]"
                  strength={0.3}
                >
                  Chairman&apos;s Message
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
