"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { hospitality } from "@/data/site";

export default function HospitalityPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const tealOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.55, 0.7]);

  return (
    <section
      id="hospitality"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* dark→tropical wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-base via-ink to-[#04181c]" />
      <motion.div
        style={{ opacity: tealOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-lagoon/20 to-coral/15"
      />

      <div className="container-x relative grid items-center gap-10 py-20 sm:py-24 md:gap-12 md:py-28 lg:grid-cols-2 lg:py-36">
        {/* copy */}
        <div className="relative z-10">
          <Reveal>
            <span className="eyebrow text-accent-teal before:bg-linear-to-r before:from-transparent before:to-(--accent-teal)">
              We Also Build Destinations
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-tight text-balance sm:text-5xl md:text-[3.4rem]">
              Building Luxury{" "}
              <span className="text-tropical-gradient italic">
                Amidst Paradise.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/80 md:text-lg">
              {hospitality.intro}
            </p>
          </Reveal>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {hospitality.features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.06}>
                <div className="glass flex items-start gap-3 rounded-2xl p-4">
                  <span className="mt-0.5 text-lagoon">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-silver">{f.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-mist">
                      {f.blurb}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <MagneticButton
                href="/hospitality"
                className="!bg-gradient-to-r !from-lagoon !to-[#1d9c8f] !text-[#06181a]"
              >
                Explore Hospitality Vision
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* visual */}
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
              <Image
                src={hospitality.image}
                alt="Andaman island development"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#04181c] via-transparent to-transparent" />

            {/* sun glare */}
            <div className="anim-float absolute right-10 top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,225,160,0.9),transparent_65%)] blur-md" />

            {/* swaying palm fronds */}
            <motion.svg
              viewBox="0 0 120 120"
              className="absolute -left-2 bottom-0 h-44 w-44 text-[#0e3b34]"
              style={{ transformOrigin: "bottom left" }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              fill="currentColor"
            >
              <path d="M30 120c0-40 2-70 14-95-18 8-30 24-34 44 8-6 18-9 28-9-16 6-28 18-34 33 9-6 19-9 30-9-14 8-24 20-28 41Z" />
            </motion.svg>

            {/* location tag */}
            <div className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs text-foam drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              <span className="mr-2 text-lagoon">◈</span>
              {hospitality.location}
            </div>
          </div>
        </Reveal>
      </div>

      {/* drifting wave divider */}
      <div className="relative h-20 overflow-hidden">
        <div
          className="absolute bottom-0 h-20 w-[200%]"
          style={{ animation: "marquee 18s linear infinite" }}
        >
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-full w-1/2 inline-block" fill="none">
            <path
              d="M0 40c150 30 300-30 450-10s250 40 400 20 250-40 350-20v60H0Z"
              fill="rgba(52,185,171,0.18)"
            />
          </svg>
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-full w-1/2 inline-block" fill="none">
            <path
              d="M0 40c150 30 300-30 450-10s250 40 400 20 250-40 350-20v60H0Z"
              fill="rgba(52,185,171,0.18)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
