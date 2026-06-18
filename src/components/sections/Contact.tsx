"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { company, contact } from "@/data/site";

function Pin({ x, y, label, delay = 0 }: { x: string; y: string; label: string; delay?: number }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <motion.span
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30"
        animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeOut" }}
      />
      <span className="relative block h-3 w-3 rounded-full bg-gold shadow-[0_0_14px_4px_rgba(212,175,55,0.6)]" />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-base/70 px-2.5 py-1 text-[0.65rem] text-silver backdrop-blur">
        {label}
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-36">
      {/* gradient + particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-lagoon/8 blur-[120px]" />
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/50"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ y: [0, -24, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Get In Touch"
            title={
              <>
                Let&apos;s build something{" "}
                <span className="text-gold-gradient italic">that lasts.</span>
              </>
            }
            intro={contact.intro}
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {contact.offices.map((o) => (
              <Reveal key={o.label}>
                <div className="glass rounded-2xl p-5">
                  <div className="text-[0.7rem] uppercase tracking-wider text-gold">
                    {o.label}
                  </div>
                  <div className="mt-2 text-sm text-silver">{o.value}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href={`mailto:${company.email}`}>
                {company.email}
              </MagneticButton>
              <MagneticButton href="/#rental" variant="ghost">
                Rent machinery
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* stylised map */}
        <Reveal delay={0.1}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b12]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage: "radial-gradient(circle at 50% 50%, #000, transparent 75%)",
              }}
            />
            {/* connecting line */}
            <svg className="absolute inset-0 h-full w-full" fill="none">
              <line
                x1="38%" y1="42%" x2="72%" y2="68%"
                stroke="url(#cgrad)" strokeWidth="1.5" strokeDasharray="4 5"
              />
              <defs>
                <linearGradient id="cgrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d4af37" />
                  <stop offset="1" stopColor="#34b9ab" />
                </linearGradient>
              </defs>
            </svg>
            <Pin x="38%" y="42%" label="Head Office" />
            <Pin x="72%" y="68%" label="Andaman & Nicobar" delay={1.2} />

            <div className="absolute bottom-5 left-5 font-display text-[0.65rem] uppercase tracking-[0.3em] text-mist">
              India · Bay of Bengal
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
