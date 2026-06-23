"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HospHeading from "./HospHeading";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster, PalmFrond } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Masterplan() {
  const m = hospitalityPage.masterplan;
  const [active, setActive] = useState(0);
  const zone = m.zones[active];

  return (
    <section
      id="masterplan"
      className="relative scroll-mt-24 overflow-hidden bg-linear-to-b from-ocean-deep via-[#072e38] to-ocean-deep py-20 md:py-28 lg:py-36"
    >
      {/* tropical decor */}
      <LeafCluster flip className="absolute -right-6 top-6 z-0 text-lagoon/10" />
      <PalmFrond className="absolute -left-6 bottom-0 z-0 h-56 w-36 rotate-[18deg] text-aqua/10 anim-sway-soft" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={m.eyebrow} title={m.title} intro={m.intro} align="center" className="mb-16" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* interactive island map */}
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-aqua/15" style={{ backgroundImage: "url('/images/oneIsland.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
              {/* reef ring + lagoon */}
              <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
                <ellipse cx="400" cy="320" rx="320" ry="220" stroke="rgba(95,211,196,0.25)" strokeWidth="2" strokeDasharray="6 10" />
                <ellipse cx="400" cy="320" rx="250" ry="165" fill="rgba(52,185,171,0.10)" />
                {/* a path/road through the island */}
                <path d="M210 470c120-30 230-120 360-150" stroke="rgba(255,222,150,0.25)" strokeWidth="2" strokeDasharray="3 8" />
              </svg>

            </div>
          </Reveal>

          {/* detail + list */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-aqua/15 bg-white/[0.03] p-7"
              >
                <span className="text-aqua">
                  <Icon name={zone.icon} className="h-8 w-8" />
                </span>
                <div className="mt-4 font-display text-xs tracking-widest text-foam/70">
                  ZONE {String(active + 1).padStart(2, "0")} / {String(m.zones.length).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-serif text-3xl text-foam">{zone.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foam/70">{zone.blurb}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap gap-2">
              {m.zones.map((z, i) => (
                <button
                  key={z.name}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                    active === i
                      ? "border-aqua/60 bg-aqua/10 text-aqua"
                      : "border-foam/15 text-foam/75 hover:border-aqua/40 hover:text-foam"
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
