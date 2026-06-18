"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { hospitalityPage } from "@/data/site";

export default function ResortBuild() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const c = hospitalityPage.construction;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const targets = [".rb-pile", ".rb-deck", ".rb-villa", ".rb-roof", ".rb-pool-water", ".rb-palm", ".rb-light", ".rb-glow"];

      if (reduce) {
        gsap.set(targets, { scaleX: 1, scaleY: 1, opacity: 1 });
        gsap.set(q(".rb-stage")[c.phases.length - 1], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      tl.to({}, { duration: 4 }, 0); // anchor total timeline length

      // 01 — piles rise
      tl.fromTo(".rb-pile", { scaleY: 0 }, { scaleY: 1, stagger: 0.08, duration: 1 }, 0.15);

      // 02 — deck spans, villas + roofs rise, crane lowers
      tl.fromTo(".rb-deck", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 1.1);
      tl.fromTo(".rb-villa", { scaleY: 0 }, { scaleY: 1, stagger: 0.12, duration: 1 }, 1.3);
      tl.fromTo(".rb-roof", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, stagger: 0.12, duration: 0.6 }, 1.7);
      tl.fromTo(".rb-hook", { y: -60 }, { y: 0, duration: 1, ease: "power1.inOut", yoyo: true, repeat: 1 }, 1.1);

      // 03 — pool fills, palms grow
      tl.fromTo(".rb-pool-water", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 2.2);
      tl.fromTo(".rb-palm", { scaleY: 0 }, { scaleY: 1, stagger: 0.12, duration: 0.8 }, 2.3);

      // 04 — lights + warm glow
      tl.fromTo(".rb-glow", { opacity: 0 }, { opacity: 1, duration: 1 }, 3);
      tl.fromTo(".rb-light", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, transformOrigin: "center" }, 3.1);

      const stages = q(".rb-stage");
      stages.forEach((el: Element, i: number) => {
        tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, i * 1);
        if (i < stages.length - 1) tl.to(el, { opacity: 0, y: -24, duration: 0.4 }, i * 1 + 0.7);
      });

      ScrollTrigger.refresh();
    }, pin);

    return () => ctx.revert();
  }, [c.phases.length]);

  return (
    <section ref={wrap} id="construction" className="relative bg-[#04222a]" style={{ height: "360vh" }}>
      <div ref={pin} className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x pt-24">
          <span className="inline-flex items-center gap-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.32em] text-lagoon">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-lagoon" />
            {c.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foam md:text-5xl">
            Watch paradise <span className="bg-gradient-to-r from-aqua via-sand to-coral bg-clip-text italic text-transparent">being built.</span>
          </h2>
        </div>

        <div className="relative flex flex-1 items-center">
          <div className="container-x grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            {/* stage readout */}
            <div className="relative h-44">
              {c.phases.map((p) => (
                <div key={p.no} className="rb-stage absolute inset-0 opacity-0">
                  <div className="font-serif text-7xl text-aqua/10">{p.no}</div>
                  <h3 className="-mt-8 font-serif text-3xl text-foam">{p.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foam/65">{p.body}</p>
                </div>
              ))}
            </div>

            {/* SVG build scene */}
            <div className="relative">
              <svg viewBox="0 0 600 360" className="w-full" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="rb-sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0c5566" />
                    <stop offset="1" stopColor="#04222a" />
                  </linearGradient>
                  <radialGradient id="rb-warm">
                    <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="rb-struct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f3ead6" />
                    <stop offset="1" stopColor="#c9b48a" />
                  </linearGradient>
                </defs>

                {/* warm glow (turns on at the end) */}
                <ellipse className="rb-glow" cx="330" cy="150" rx="240" ry="120" fill="url(#rb-warm)" opacity="0" />

                {/* sea */}
                <rect x="0" y="232" width="600" height="128" fill="url(#rb-sea)" />
                <path d="M0 236c60 8 120 8 180 0s120-8 180 0 120 8 240 0" stroke="rgba(95,211,196,0.3)" strokeWidth="2" fill="none" />

                {/* beach / sand */}
                <path d="M0 232c70-6 130 4 150 18 0 40 0 80 0 110H0Z" fill="#d9c79c" opacity="0.85" />

                {/* infinity pool on the sand */}
                <rect x="30" y="186" width="96" height="34" rx="4" fill="#0a3f4a" />
                <rect className="rb-pool-water" x="32" y="188" width="92" height="30" rx="3" fill="#2bb6c4" style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />

                {/* overwater piles */}
                {[210, 260, 310, 360, 410, 460].map((x) => (
                  <rect key={x} className="rb-pile" x={x - 3} y="150" width="6" height="86" rx="2" fill="#7d6a4a" style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />
                ))}

                {/* overwater deck */}
                <rect className="rb-deck" x="190" y="146" width="300" height="10" rx="2" fill="url(#rb-struct)" style={{ transformBox: "fill-box", transformOrigin: "left" }} />

                {/* villas */}
                {[230, 320, 410].map((x) => (
                  <g key={x}>
                    <rect className="rb-villa" x={x} y="106" width="56" height="40" rx="3" fill="url(#rb-struct)" style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />
                    <path className="rb-roof" d={`M${x - 6} 106 L${x + 28} 86 L${x + 62} 106 Z`} fill="#8a5a3c" style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />
                  </g>
                ))}

                {/* windows / lights */}
                {[244, 268, 334, 358, 424, 448].map((x) => (
                  <circle key={x} className="rb-light" cx={x} cy="126" r="3.5" fill="#ffd98a" opacity="0" />
                ))}
                {[230, 290, 350, 410, 470].map((x) => (
                  <circle key={`d-${x}`} className="rb-light" cx={x} cy="151" r="2" fill="#ffe3a6" opacity="0" />
                ))}

                {/* palms on the beach */}
                {[70, 110, 145].map((x, i) => (
                  <g key={x} className="rb-palm" style={{ transformBox: "fill-box", transformOrigin: "bottom" }}>
                    <path d={`M${x} 232c-1-24 0-40 4-54`} stroke="#3a5d2a" strokeWidth="3" strokeLinecap="round" />
                    <path d={`M${x + 4} 178c-8-7-18-7-26-2M${x + 4} 178c8-7 18-7 26-2M${x + 4} 178c-2-8-2-16 0-22`} stroke="#4a7a32" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </g>
                ))}

                {/* crane */}
                <g stroke="#6b7a82" strokeWidth="3" fill="none" strokeLinecap="round">
                  <path d="M540 236V70" />
                  <path d="M540 70h-44M540 70l30 8M540 82l-36-3" />
                  <path className="rb-hook" d="M504 70v22" />
                </g>
                <rect className="rb-hook" x="498" y="92" width="14" height="8" rx="1" fill="url(#rb-struct)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
