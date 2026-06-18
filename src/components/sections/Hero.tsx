"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { company } from "@/data/site";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ((window as unknown as { __loaded?: boolean }).__loaded) {
      setReady(true);
      return;
    }
    const onLoad = () => setReady(true);
    window.addEventListener("sheeraj:loaded", onLoad);
    const fallback = setTimeout(() => setReady(true), 2400);
    return () => {
      window.removeEventListener("sheeraj:loaded", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  const show = ready ? "show" : "hidden";
  const v = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease, delay: 0.15 * i },
    }),
  };

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-base">
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/homeHero2.mp4" type="video/mp4" />
      </video>

      {/* vignette fade into the page background at the bottom edge */}
      <div className="absolute inset-0 [background:linear-gradient(to_top,var(--color-base)_0%,color-mix(in_oklab,var(--color-base)_40%,transparent)_20%,transparent_42%)]" />

      {/* content */}
      <div className="on-media container-x relative z-10 flex min-h-[100svh] flex-col justify-center pt-28">
        <motion.span
          custom={0}
          variants={v}
          initial="hidden"
          animate={show}
          className="eyebrow"
        >
          {company.legalName} · Est. {company.established}
        </motion.span>

        <motion.h1
          custom={1}
          variants={v}
          initial="hidden"
          animate={show}
          className="mt-6 max-w-5xl font-serif text-[3.1rem] font-medium leading-[0.98] tracking-tight text-balance filter-[drop-shadow(var(--on-media-shadow))] sm:text-7xl lg:text-[5.6rem]"
        >
          Building Tomorrow&apos;s{" "}
          <span className="text-gold-gradient italic">Infrastructure.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={v}
          initial="hidden"
          animate={show}
          className="mt-7 max-w-xl text-lg leading-relaxed text-on-media-muted"
        >
          Engineering highways, waterways, ring roads — and future destinations
          across India and the islands.
        </motion.p>

        <motion.div
          custom={3}
          variants={v}
          initial="hidden"
          animate={show}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/#projects">Explore Projects</MagneticButton>
          <MagneticButton href="/#hospitality" variant="ghost">
            Discover Hospitality
          </MagneticButton>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-display text-[0.6rem] uppercase tracking-[0.4em] text-mist">
          Scroll
        </span>
        <span className="flex h-10 w-6 justify-center rounded-full border [border-color:var(--ui-border-lg)] pt-2">
          <span className="h-2 w-px bg-gold [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}
