"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";
import { LeafCluster, PalmFrond, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

/* ----------------------------------------------------------------------------
   Marker positions as PERCENTAGES of the master-plan image (community.plan.image),
   index-matched to community.plan.zones. Markers show ONLY their number; the
   legend maps number → name. Nudge a value to move a pin over its feature.
---------------------------------------------------------------------------- */
const PINS: { x: number; y: number }[] = [
  { x: 14, y: 10 }, // 1 — Arrival + Lobby
  { x: 42, y: 8 }, //  2 — All-Day Dining
  { x: 31, y: 21 }, // 3 — Pool / Cabana Pavilion
  { x: 60, y: 24 }, // 4 — Garden Villas
  { x: 25, y: 36 }, // 5 — Lagoon Villas
  { x: 10, y: 53 }, // 6 — Sea View Villas
  { x: 73, y: 33 }, // 7 — Presidential Villa
  { x: 66, y: 11 }, // 8 — Spa / Wellness
];

export default function Community() {
  const c = hospitalityPage.community;
  const zones = c.plan.zones;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="community"
      className="relative scroll-mt-24 overflow-hidden bg-linear-to-br from-[#063945] via-[#07313c] to-[#041c24] py-28 md:py-36"
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
            <div className="grid items-start gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:p-8 lg:grid-cols-[1.5fr_0.5fr]">
              {/* the plan — real render with number-only markers (names in legend) */}
              <div
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ocean-deep"
                style={{ aspectRatio: `${c.plan.image.width} / ${c.plan.image.height}` }}
              >
                <Image
                  src={c.plan.image}
                  alt="Master plan render of the 20-acre gated villa community"
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {PINS.map((p, i) => {
                  const on = active === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-label={`${i + 1}. ${zones[i]}`}
                      aria-pressed={on}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      {on && !reduce && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full border border-aqua"
                          initial={{ opacity: 0.7, scale: 1 }}
                          animate={{ opacity: [0.7, 0, 0.7], scale: [1, 2.2, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                      <span
                        className={`flex items-center justify-center rounded-full border font-display font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                          on
                            ? "h-8 w-8 border-foam bg-aqua text-sm text-[#06262f]"
                            : "h-7 w-7 border-aqua bg-[#06262f]/85 text-xs text-aqua hover:bg-[#06262f]"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* legend / readout */}
              <div>
                <div className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-aqua/70">
                  Zone {String(active + 1).padStart(2, "0")} / {String(zones.length).padStart(2, "0")}
                </div>
                <h4 className="mt-1 font-serif text-2xl text-foam">{zones[active]}</h4>

                <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {zones.map((z, i) => {
                    const on = active === i;
                    return (
                      <button
                        key={z}
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-pressed={on}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${
                          on
                            ? "border-aqua/50 bg-aqua/10 text-foam"
                            : "border-white/10 text-foam/70 hover:border-aqua/30 hover:text-foam"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            on ? "bg-aqua text-[#06262f]" : "bg-white/10 text-foam/70"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="leading-tight">{z}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 5 — CTA ----------------------------------------------------------- */}
        <Reveal>
          <div className="relative mt-20 overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-white/8 via-white/2 to-transparent p-10 text-center backdrop-blur-xl md:p-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-aqua/40 to-transparent" />
            <div className="anim-pulse-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-aqua/15 blur-[100px]" />
            <div
              className="anim-pulse-glow pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-lagoon/15 blur-[110px]"
              style={{ animationDelay: "-4.5s" }}
            />
            <h3 className="relative mx-auto max-w-2xl font-serif text-3xl leading-tight text-foam md:text-[2.6rem]">
              {c.cta.title}
            </h3>
            <p className="relative mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-foam/70">
              {c.cta.body}
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                href={c.cta.primary.href}
                className="!bg-gradient-to-r !from-aqua !to-lagoon !text-[#06262f]"
              >
                {c.cta.primary.label}
              </MagneticButton>
              <MagneticButton
                href={c.cta.secondary.href}
                variant="ghost"
                className="!border-white/40 !text-foam hover:!text-white"
              >
                {c.cta.secondary.label}
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
