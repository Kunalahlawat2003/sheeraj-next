"use client";

import { motion } from "framer-motion";
import { hospitalityPage } from "@/data/site";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HospHero() {
  const rise = {
    hidden: { opacity: 0, y: 36 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease, delay: 0.2 + i * 0.12 },
    }),
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-base">
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/hospitality.mp4" type="video/mp4" />
      </video>

      {/* vignette fade into the page background at the bottom edge */}
      <div className="pointer-events-none absolute inset-0 z-1 [background:linear-gradient(to_top,var(--color-base)_0%,color-mix(in_oklab,var(--color-base)_40%,transparent)_20%,transparent_42%)]" />

      {/* content */}
      <div className="on-media container-x pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-center pt-28">
        <motion.span custom={0} variants={rise} initial="hidden" animate="show" className="inline-flex items-center gap-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.34em] text-on-media">
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-(--on-media)" />
          {hospitalityPage.hero.eyebrow}
        </motion.span>

        <motion.h1 custom={1} variants={rise} initial="hidden" animate="show" className="mt-6 max-w-4xl font-serif text-[3rem] font-medium leading-[0.98] tracking-tight text-balance filter-[drop-shadow(var(--on-media-shadow))] sm:text-7xl lg:text-[5.4rem]">
          Building Luxury{" "}
          <span className="bg-gradient-to-r from-aqua via-sand to-coral bg-clip-text italic text-transparent">
            Amid Paradise.
          </span>
        </motion.h1>

        <motion.p custom={2} variants={rise} initial="hidden" animate="show" className="mt-7 max-w-xl text-lg leading-relaxed text-on-media-muted">
          {hospitalityPage.hero.sub}
        </motion.p>

        <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToTarget("#masterplan")}
            className="btn btn-gold !bg-gradient-to-r !from-aqua !to-lagoon !text-[#06262f]"
          >
            <span className="relative z-10">Explore the Masterplan</span>
          </button>
          <button
            onClick={() => scrollToTarget("#invest")}
            className="btn btn-ghost !border-(--on-media-muted) !text-on-media"
          >
            <span className="relative z-10">Investment Opportunity</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
