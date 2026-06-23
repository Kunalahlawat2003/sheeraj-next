"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutHighlights, chairman, media, stats } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24 md:py-36">
      <div className="container-x grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
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
            intro="For a decade, we have engineered the heavy highways, vital waterways, and ring roads that connect mainland India and its islands. Today, we bring that exact same engineering precision to crafting premium destinations that redefine modern hospitality."
          />

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-10">
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
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-sm)] sm:grid-cols-4 lg:mt-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink/80 px-4 py-5 sm:px-5 sm:py-6">
                <div className="font-serif text-2xl text-gold-gradient sm:text-3xl">
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border [border-color:var(--ui-border-md)]">
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

            {/* floating quote */}
            <div className="glass anim-float absolute -bottom-8 -left-4 max-w-[16rem] rounded-2xl p-5 sm:-left-10 sm:max-w-xs sm:p-6">
              <p className="font-serif text-base italic leading-snug text-silver sm:text-lg">
                “{chairman.shortQuote}”
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
