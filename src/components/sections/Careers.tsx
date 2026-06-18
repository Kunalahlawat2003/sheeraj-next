"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { careers, company } from "@/data/site";

function Helmet({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21a12 12 0 0 1 24 0" />
      <path d="M16 9v6M11 10v5M21 10v5" />
      <path d="M3 21h26v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

export default function Careers() {
  return (
    <section id="careers" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Build With Us"
            title={
              <>
                Engineer your <span className="text-gold-gradient">next chapter.</span>
              </>
            }
            intro={careers.intro}
          />
          <Reveal>
            <MagneticButton href={`mailto:${company.careersEmail}`} variant="ghost">
              {company.careersEmail}
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {careers.openings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 2) * 0.08}>
              <a
                href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(
                  "Application — " + o.title
                )}`}
                data-cursor
                className="group relative block overflow-hidden rounded-2xl border border-white/8 bg-ink/60 p-7 transition-all duration-500 hover:border-gold/40"
              >
                {/* blueprint grid reveal */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(212,175,55,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.5) 1px,transparent 1px)",
                    backgroundSize: "26px 26px",
                    maskImage: "radial-gradient(circle at 80% 0%, #000, transparent 70%)",
                    opacity: 0.08,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="text-gold">
                    <Helmet />
                  </span>
                  <span className="translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
                <h3 className="relative mt-6 font-serif text-2xl tracking-tight">
                  {o.title}
                </h3>
                <div className="relative mt-3 flex items-center gap-3 text-xs text-mist">
                  <span>{o.location}</span>
                  <span className="h-1 w-1 rounded-full bg-mist/50" />
                  <span>{o.type}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
