"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import OceanCanvas from "@/components/three/OceanCanvas";
import { Bird, Cloud, PalmTree, CoconutPalm, Shrub } from "./tropical";
import { hospitalityPage } from "@/data/site";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HospHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const cloudX = useTransform(sx, [-1, 1], [-30, 30]);
  const islandX = useTransform(sx, [-1, 1], [18, -18]);
  const islandY = useTransform(sy, [-1, 1], [6, -6]);
  const sunX = useTransform(sx, [-1, 1], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const rise = {
    hidden: { opacity: 0, y: 36 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease, delay: 0.2 + i * 0.12 },
    }),
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* sky */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#7ec9e0] via-[#bfe7ef] to-[#f6e6c8]" />

      {/* sun */}
      <motion.div
        style={{ x: sunX }}
        className="pointer-events-none absolute left-1/2 top-[28%] z-[2] -translate-x-1/2"
      >
        <div className="relative h-44 w-44">
          {/* atmospheric halo */}
          <div
            className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,228,165,0.5) 0%, rgba(255,205,130,0.14) 32%, transparent 62%)",
            }}
          />
          {/* sun rays */}
          <div
            className="anim-spin-slow absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-40"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(255,226,150,0.65) 0deg 2.5deg, transparent 2.5deg 11deg)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 30%, #000 43%, transparent 66%)",
              maskImage:
                "radial-gradient(circle, transparent 30%, #000 43%, transparent 66%)",
            }}
          />
          {/* core */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #fffbf2 0%, #ffeaba 38%, #ffcf85 57%, rgba(255,207,133,0) 72%)",
              animation: "sun-shimmer 6s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>

      {/* clouds */}
      <motion.div style={{ x: cloudX }} className="pointer-events-none absolute inset-0 z-[1] text-white/85">
        <div className="absolute left-[8%] top-[14%]" style={{ animation: "cloud-drift 60s linear infinite" }}>
          <Cloud className="h-14 w-44 opacity-80" />
        </div>
        <div className="absolute left-[55%] top-[8%]" style={{ animation: "cloud-drift 90s linear infinite" }}>
          <Cloud className="h-20 w-64 opacity-70" />
        </div>
        <div className="absolute left-[30%] top-[24%]" style={{ animation: "cloud-drift 75s linear infinite" }}>
          <Cloud className="h-10 w-32 opacity-60" />
        </div>
      </motion.div>

      {/* birds */}
      <div className="pointer-events-none absolute inset-0 z-[2] text-ocean-deep/50">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${18 + i * 5}%` }}
            initial={{ x: "-10vw" }}
            animate={{ x: "110vw" }}
            transition={{ duration: 26 + i * 8, repeat: Infinity, delay: i * 6, ease: "linear" }}
          >
            <Bird className="h-3 w-6" />
          </motion.div>
        ))}
      </div>

      {/* ocean (interactive ripples) */}
      <div className="absolute inset-0 z-[3]">
        <OceanCanvas />
      </div>

      {/* island at the horizon — layered terrain, palms, shrubs, jetty, build site */}
      <motion.div
        style={{ x: islandX, y: islandY }}
        className="pointer-events-none absolute left-1/2 top-[34%] z-[4] w-[48rem] max-w-[96vw] -translate-x-1/2"
      >
        <div className="relative h-48 w-full">
          {/* distant island for depth */}
          <div className="absolute bottom-[44%] left-[3%] opacity-70">
            <svg viewBox="0 0 200 70" className="h-11 w-40 text-[#15564d]" aria-hidden>
              <path d="M4 64C40 30 160 30 196 64Z" fill="currentColor" />
            </svg>
            <PalmTree className="absolute -top-4 left-12 h-7 w-7 text-[#15564d]" />
          </div>

          {/* main island */}
          <svg viewBox="0 0 760 220" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0 left-0 h-48 w-full" fill="none" aria-hidden>
            <path d="M30 176C240 122 520 122 730 176C520 206 240 206 30 176Z" fill="#e9d6a4" opacity="0.9" />
            <path d="M70 178C210 100 350 74 430 74C540 74 630 116 700 178C520 158 230 158 70 178Z" fill="#0c3b39" />
            <path d="M360 100C400 62 470 62 520 100C470 88 410 88 360 100Z" fill="#0e463f" />
            <path d="M30 186C260 158 520 158 730 186L730 220L30 220Z" fill="#06302c" />
          </svg>

          {/* jetty into the lagoon */}
          <svg viewBox="0 0 120 90" className="absolute bottom-[1%] left-[15%] h-16 w-24 text-[#082b28]" fill="none" aria-hidden>
            <path d="M30 6h60M34 22h52M40 38h40M48 54h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 6 36 60M80 6 84 60" stroke="currentColor" strokeWidth="3" />
          </svg>

          {/* flora */}
          <CoconutPalm className="absolute bottom-[34%] left-[24%] h-28 w-24 text-[#0c3b39] anim-sway-soft" />
          <PalmTree className="absolute bottom-[36%] left-[36%] h-20 w-20 text-[#0e463f] anim-sway" />
          <div className="absolute bottom-[33%] left-[60%] -scale-x-100">
            <CoconutPalm className="h-24 w-20 text-[#0a3531] anim-sway-soft" />
          </div>
          <PalmTree className="absolute bottom-[35%] left-[71%] h-16 w-16 text-[#0c3b39] anim-sway" />
          <Shrub className="absolute bottom-[31%] left-[32%] h-7 w-10 text-[#103f38]" />
          <Shrub className="absolute bottom-[30%] left-[66%] h-6 w-9 text-[#0d3a33]" />

          {/* under-construction villa */}
          <svg viewBox="0 0 120 80" className="absolute bottom-[34%] left-[47%] h-14 w-20" fill="none" aria-hidden>
            <rect x="22" y="40" width="56" height="30" rx="2" fill="#efe5cf" opacity="0.92" />
            <path d="M14 40 50 18 86 40" stroke="#8a5a3c" strokeWidth="3" fill="none" />
            <path d="M50 18V40M32 29v11M68 29v11" stroke="#8a5a3c" strokeWidth="2" />
            <path d="M86 22v52M96 30v44M86 36h10M86 52h10" stroke="#9aa6a0" strokeWidth="2" />
          </svg>

          {/* crane */}
          <svg viewBox="0 0 130 130" className="absolute bottom-[33%] left-[55%] h-28 w-28 text-[#0a2f2c]" fill="none" aria-hidden>
            <path d="M44 124V20M44 20l60 12M44 20 32 27M44 40l34 6M70 32V60M70 60h-7M70 60h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <rect x="38" y="122" width="14" height="6" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* readability scrim */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#06262f]/70 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-[#06262f]/45 to-transparent" />

      {/* content */}
      <div className="container-x pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-center pt-28">
        <motion.span custom={0} variants={rise} initial="hidden" animate="show" className="inline-flex items-center gap-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.34em] text-foam">
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-foam" />
          {hospitalityPage.hero.eyebrow}
        </motion.span>

        <motion.h1 custom={1} variants={rise} initial="hidden" animate="show" className="mt-6 max-w-4xl font-serif text-[3rem] font-medium leading-[0.98] tracking-tight text-foam text-balance drop-shadow-[0_2px_30px_rgba(6,38,47,0.5)] sm:text-7xl lg:text-[5.4rem]">
          Building Luxury{" "}
          <span className="bg-gradient-to-r from-aqua via-sand to-coral bg-clip-text italic text-transparent">
            Amid Paradise.
          </span>
        </motion.h1>

        <motion.p custom={2} variants={rise} initial="hidden" animate="show" className="mt-7 max-w-xl text-lg leading-relaxed text-foam/85">
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
            className="btn btn-ghost !border-foam/40 !text-foam"
          >
            <span className="relative z-10">Investment Opportunity</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foam/60"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-aqua" />
          Move your cursor across the water
        </motion.p>
      </div>
    </section>
  );
}
