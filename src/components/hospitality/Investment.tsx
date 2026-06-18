"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { LeafCluster } from "./tropical";
import { company, hospitalityPage } from "@/data/site";

export default function Investment() {
  const inv = hospitalityPage.investment;
  return (
    <section
      id="invest"
      className="relative scroll-mt-24 overflow-hidden bg-[#06262f] py-28 md:py-36"
    >
      {/* faded island backdrop */}
      <Image
        src="/images/island-aerial.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06262f] via-[#06262f]/80 to-[#06262f]" />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-aqua/60"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 31) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <LeafCluster className="absolute -left-8 bottom-0 z-0 text-lagoon/10" />
      <LeafCluster flip className="absolute -right-8 top-2 z-0 text-aqua/10" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={inv.eyebrow} title={inv.title} intro={inv.body} align="center" />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-aqua/15 bg-aqua/10 md:grid-cols-4">
          {inv.stats.map((s) => (
            <div key={s.label} className="bg-[#06262f]/90 px-5 py-8 text-center">
              <div className="font-serif text-3xl text-aqua md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} format={s.suffix !== ""} />
              </div>
              <div className="mt-2 text-[0.72rem] uppercase leading-snug tracking-wider text-foam/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${company.email}?subject=Investment%20Enquiry%20%E2%80%94%20Andaman%20Resort`} className="btn btn-gold !bg-gradient-to-r !from-aqua !to-lagoon !text-[#06262f]">
              <span className="relative z-10">Request the investor deck</span>
            </a>
            <a href="/#contact" className="btn btn-ghost !border-foam/40 !text-foam">
              <span className="relative z-10">Talk to our team</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
