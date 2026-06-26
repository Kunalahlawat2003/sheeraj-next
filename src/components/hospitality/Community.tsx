"use client";

import Image from "next/image";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { LeafCluster, PalmFrond, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Community() {
  const c = hospitalityPage.community;
  const zones = c.plan.zones;

  return (
    <section
      id="community"
      className="relative scroll-mt-24 overflow-hidden bg-linear-to-br from-[#063945] via-[#07313c] to-[#041c24] py-16 sm:py-20 md:py-28 lg:py-36"
    >
      {/* layered radial wash for depth (kept on-palette: lagoon → aqua over ocean) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(20,140,150,0.18),transparent_55%),radial-gradient(110%_90%_at_85%_100%,rgba(45,200,210,0.12),transparent_60%)]" />
      {/* ambient glows + tropical decor */}
      <div className="anim-pulse-glow pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-lagoon/20 blur-[120px]" />
      <div
        className="anim-pulse-glow pointer-events-none absolute -right-28 bottom-24 h-72 w-72 rounded-full bg-aqua/15 blur-[120px]"
        style={{ animationDelay: "-4.5s" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/30 to-transparent" />
      <LeafCluster className="absolute -left-8 bottom-0 z-0 text-lagoon/10" />
      <PalmFrond className="absolute -right-4 top-10 z-0 h-56 w-36 -scale-x-100 rotate-[-18deg] text-aqua/10 anim-sway-soft" />
      <Hibiscus className="absolute right-[10%] top-24 z-0 h-8 w-8 text-coral/40 anim-bob" />

      <div className="container-x relative z-10">
        {/* 1 — Section header ------------------------------------------------ */}
        <HospHeading
          eyebrow={c.eyebrow}
          title={c.title}
          intro={c.intro}
          align="center"
          className="mb-16"
        />

        {/* 2 — Two-column: aerial masterplan + copy -------------------------- */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left — aerial community image */}
          <Reveal>
            <div
              className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-ocean-deep shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]"
              style={{ aspectRatio: `${c.image.width} / ${c.image.height}` }}
            >
              {/* Box sizes from its column width and keeps the image's own ratio,
                  so it never overflows the column regardless of the copy height. */}
              <Image
                src={c.image}
                alt="Aerial masterplan view of the 20-acre gated villa community"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/10 to-transparent" />
              {/* inner sheen ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-aqua/0 transition-all duration-500 group-hover:ring-aqua/25" />
              {/* floating area tag */}
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1">
                <div className="font-serif text-2xl text-foam">
                  20<span className="ml-0.5 text-[1rem] text-aqua">acres</span>
                </div>
                <div className="mt-0.5 text-[0.66rem] uppercase tracking-[0.18em] text-foam/70">
                  Gated villa community
                </div>
              </div>
            </div>
          </Reveal>

          {/* right — heading + body + feature list */}
          <div>
            <Reveal>
              <h3 className="font-serif text-3xl leading-[1.1] text-foam md:text-[2.6rem]">
                {c.bodyTitle}
              </h3>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-foam/70">{c.body}</p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.features.map((f, i) => (
                <Reveal key={f} delay={0.05 + (i % 2) * 0.05}>
                  <div className="group/feat flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/40 hover:bg-white/8 hover:shadow-[0_14px_34px_-22px_rgba(45,200,210,0.55)]">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua transition-colors duration-300 group-hover/feat:bg-aqua group-hover/feat:text-ocean-deep">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8.5l3.2 3.2L13 5" />
                      </svg>
                    </span>
                    <span className="text-sm text-foam/85">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* 3 — Statistics row (glassmorphism) -------------------------------- */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-center shadow-[0_24px_60px_-34px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-aqua/40 hover:bg-white/8 hover:shadow-[0_34px_70px_-30px_rgba(45,200,210,0.35)]">
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
                {/* top accent line, revealed on hover */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-aqua/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="anim-text-shimmer relative bg-linear-to-r from-foam via-aqua to-lagoon bg-clip-text font-serif text-4xl text-transparent md:text-5xl">
                  {s.display ? (
                    s.display
                  ) : (
                    <>
                      <Counter value={s.value} suffix={s.suffix} format={false} />
                      {s.unit && (
                        <span className="ml-1 text-xl text-foam/80 md:text-2xl">{s.unit}</span>
                      )}
                    </>
                  )}
                </div>
                <div className="relative mt-3 text-[0.72rem] uppercase leading-snug tracking-[0.16em] text-foam/55">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4 — Community layout preview (illustrated site plan) -------------- */}
        <div id="community-plan" className="mt-24 scroll-mt-24">
          <HospHeading eyebrow={c.plan.eyebrow} title={c.plan.title} align="center" className="mb-12" />

          <Reveal>
            <div className="grid items-stretch gap-6 rounded-4xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:gap-8 md:p-8 lg:grid-cols-[1.55fr_1fr]">
              {/* the plan — cinematic looping fly-through, fills its column */}
              <div className="group relative min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-ocean-deep lg:min-h-full">
                <video
                  src="/videos/community.mp4"
                  poster={c.plan.image.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Aerial fly-through of the 20-acre gated villa community master plan"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                {/* depth grade + inner ring so the frame reads as premium media */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ocean-deep/75 via-transparent to-ocean-deep/10" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-aqua/15" />
                {/* floating caption tag, echoing the aerial image above */}
                <div className="absolute bottom-4 left-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-xl">
                  <div className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-foam/70">
                    {c.plan.eyebrow}
                  </div>
                  <div className="mt-0.5 font-serif text-lg text-foam">{c.plan.title}</div>
                </div>
              </div>

              {/* legend — zone labels, clean and un-numbered */}
              <div className="flex flex-col justify-center">
                <div className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-aqua/70">
                  Master Plan Zones
                </div>
                <h4 className="mt-1 font-serif text-2xl text-foam">{zones.length} curated zones</h4>

                <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-1">
                  {zones.map((z, i) => (
                    <div
                      key={z}
                      className="group/zone flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 px-3.5 py-2.5 text-left text-sm text-foam/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/40 hover:bg-aqua/8 hover:text-foam"
                    >
                      <span
                        aria-hidden
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-[0.65rem] font-semibold text-aqua transition-all duration-300 group-hover/zone:bg-aqua group-hover/zone:text-ocean-deep"
                      >
                        {i + 1}
                      </span>
                      <span className="leading-tight">{z}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
