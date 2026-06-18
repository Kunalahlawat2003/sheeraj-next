"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { hospitalityPage } from "@/data/site";

/* all villas sit on the island */
const VILLAS = [110, 210, 310];
const GROUND = 206;
const WALL_W = 50;
const WALL_H = 42;

const LAMPS = [160, 260];
const PALMS = [62, 158, 262, 360];
const STARS: [number, number, number][] = [
  [40, 40, 1], [92, 60, 1.2], [150, 30, 1], [210, 66, 1], [262, 44, 1.1],
  [332, 74, 1], [392, 30, 1.2], [444, 56, 1], [498, 36, 1], [548, 64, 1.2],
  [180, 50, 0.9], [420, 90, 0.9], [120, 86, 1],
];

const ob = { transformBox: "fill-box" as const, transformOrigin: "bottom" };
const ol = { transformBox: "fill-box" as const, transformOrigin: "left" };
const oc = { transformBox: "fill-box" as const, transformOrigin: "center" };

export default function ResortBuild() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const c = hospitalityPage.construction;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      if (reduce) {
        gsap.set(
          [".rb-island", ".rb-island-green", ".rb-found", ".rb-wall", ".rb-roof",
           ".rb-pool-water", ".rb-palm", ".rb-lamp", ".rb-jetty", ".rb-boat", ".rb-light", ".rb-glow", ".rb-star"],
          { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }
        );
        gsap.set([".rb-crane", ".rb-hook"], { opacity: 0 });
        gsap.set(q(".rb-stage")[c.phases.length - 1], { opacity: 1, y: 0 });
        return;
      }

      // ambient life (independent of scroll)
      gsap.to(".rb-bird", { y: "-=5", repeat: -1, yoyo: true, duration: 1.8, ease: "sine.inOut", stagger: 0.25 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      tl.to({}, { duration: 4 }, 0); // anchor total length
      tl.fromTo(".rb-star", { opacity: 0 }, { opacity: 1, stagger: 0.02, duration: 2 }, 0);

      // 01 — Reclaim & Foundation: the island and pads arrive
      tl.fromTo(".rb-island", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.1);
      tl.fromTo(".rb-found", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }, 0.6);

      // 02 — Structure & Villas: walls rise, roofs drop from the crane and combine
      tl.fromTo(".rb-wall", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }, 1.05);
      tl.fromTo(".rb-hook", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power1.inOut" }, 1.2);
      tl.fromTo(".rb-roof", { y: -60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 }, 1.6);

      // 03 — Water & Landscape
      tl.fromTo(".rb-island-green", { scaleY: 0 }, { scaleY: 1, stagger: 0.12, duration: 0.8 }, 2.05);
      tl.fromTo(".rb-pool-water", { scaleY: 0 }, { scaleY: 1, duration: 0.9 }, 2.2);
      tl.fromTo(".rb-jetty", { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, 2.3);
      tl.fromTo(".rb-palm", { y: -28, scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.1, duration: 0.8 }, 2.35);
      tl.fromTo(".rb-lamp", { scaleY: 0 }, { scaleY: 1, stagger: 0.08, duration: 0.7 }, 2.5);
      tl.fromTo(".rb-boat", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power1.out" }, 2.6);

      // 04 — The Reveal: lights on, glow, crane lifts away
      tl.fromTo(".rb-glow", { opacity: 0 }, { opacity: 1, duration: 1 }, 3);
      tl.fromTo(".rb-light", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.04, duration: 0.5 }, 3.1);
      tl.to(".rb-hook", { opacity: 0, duration: 0.4 }, 3);
      tl.to(".rb-crane", { opacity: 0, duration: 0.6 }, 3);

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
      <div ref={pin} className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="container-x pt-24">
          <span className="inline-flex items-center gap-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.32em] text-lagoon">
            <span className="h-px w-7 bg-linear-to-r from-transparent to-lagoon" />
            {c.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foam md:text-5xl">
            Watch paradise{" "}
            <span className="bg-linear-to-r from-aqua via-sand to-coral bg-clip-text italic text-transparent">
              being built.
            </span>
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

            {/* island build scene */}
            <div className="relative drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
              <svg viewBox="0 0 600 380" className="w-full overflow-visible rounded-2xl" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="rb-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0c2e3b" />
                    <stop offset="0.45" stopColor="#2a5f66" />
                    <stop offset="0.78" stopColor="#e0a06b" />
                    <stop offset="1" stopColor="#f4c98a" />
                  </linearGradient>
                  <linearGradient id="rb-sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2c8088" />
                    <stop offset="1" stopColor="#04222a" />
                  </linearGradient>
                  <linearGradient id="rb-horizon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffce8e" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#ffce8e" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="rb-sun">
                    <stop offset="0" stopColor="#fff3d6" />
                    <stop offset="0.5" stopColor="#ffd98a" />
                    <stop offset="1" stopColor="#ff9e5e" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="rb-warm">
                    <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="rb-struct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f5ecd8" />
                    <stop offset="1" stopColor="#cdb78c" />
                  </linearGradient>
                  <linearGradient id="rb-thatch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c08a52" />
                    <stop offset="1" stopColor="#8a5a3c" />
                  </linearGradient>
                  <linearGradient id="rb-sand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ecd9a6" />
                    <stop offset="1" stopColor="#c6a86a" />
                  </linearGradient>
                  <filter id="rb-bloom" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2.4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── Sky ── */}
                <rect width="600" height="212" fill="url(#rb-sky)" />

                {STARS.map(([x, y, r], i) => (
                  <circle key={i} className="rb-star" cx={x} cy={y} r={r} fill="#fff" opacity="0" />
                ))}

                {/* sun */}
                <circle cx="430" cy="118" r="58" fill="url(#rb-sun)" />
                <circle cx="430" cy="118" r="26" fill="#fff1cf" filter="url(#rb-bloom)" />

                {/* clouds */}
                <g fill="#fbf3e4">
                  <path opacity="0.7" style={{ animation: "cloud-drift 80s linear infinite" }} d="M70 70c-12 0-20-8-20-17s9-16 19-14c4-8 15-12 24-8s13 12 12 19c9-1 17 4 17 12s-8 12-17 12Z" />
                  <path opacity="0.5" style={{ animation: "cloud-drift 110s linear infinite" }} d="M300 50c-9 0-16-6-16-13s7-12 14-11c3-6 11-9 18-6s10 9 9 14c7-1 13 3 13 9s-6 9-13 9Z" />
                </g>

                {/* birds */}
                <g className="rb-bird" stroke="#0c2e3b" strokeWidth="2" strokeLinecap="round" opacity="0.55">
                  <path d="M150 92c5-6 9-6 12-1 3-5 7-5 12 1" />
                  <path d="M182 80c4-5 7-5 9-1 2-4 6-4 10 1" />
                  <path d="M120 104c4-5 7-5 10-1 2-4 6-4 9 1" />
                </g>

                {/* distant island silhouettes (depth) */}
                <path d="M470 206c30-14 80-14 130 0Z" fill="#0e3a3f" opacity="0.5" />

                {/* sunset haze near the horizon */}
                <ellipse cx="430" cy="208" rx="220" ry="34" fill="url(#rb-warm)" />

                {/* ── Sea ── */}
                <rect y="208" width="600" height="172" fill="url(#rb-sea)" />
                <rect y="208" width="600" height="30" fill="url(#rb-horizon)" />
                <path d="M0 246c60 6 120 6 180 0s120-6 180 0 120 6 240 0" stroke="rgba(95,211,196,0.22)" strokeWidth="1.5" fill="none" />
                <path d="M0 286c70 5 140 5 210 0s140-5 210 0 140 5 180 0" stroke="rgba(95,211,196,0.13)" strokeWidth="1.2" fill="none" />
                <path d="M0 330c80 4 160 4 240 0s160-4 240 0 160 4 120 0" stroke="rgba(95,211,196,0.08)" strokeWidth="1" fill="none" />

                {/* warm glow over the resort — reveal */}
                <ellipse className="rb-glow" cx="230" cy="180" rx="280" ry="130" fill="url(#rb-warm)" opacity="0" />

                {/* ── Island ── */}
                <g className="rb-island">
                  <path d="M46 250 Q110 198 230 194 Q350 198 404 234 Q396 266 230 272 Q92 266 46 250Z" fill="url(#rb-sand)" />
                  <path className="rb-island-green" d="M88 238 Q150 204 232 202 Q318 204 360 232 Q312 248 230 250 Q130 248 88 238Z" fill="#245038" style={ob} />
                  <path className="rb-island-green" d="M118 232 Q170 208 234 207 Q300 209 332 228 Q290 240 230 242 Q160 240 118 232Z" fill="#3a7a4a" opacity="0.6" style={ob} />
                  <path d="M48 252 Q112 206 230 200 Q350 206 402 234" stroke="#f1e2b4" strokeWidth="1.6" fill="none" opacity="0.5" />

                  {/* infinity pool */}
                  <rect x="70" y="214" width="78" height="24" rx="3" fill="#073340" />
                  <rect className="rb-pool-water" x="72" y="216" width="74" height="20" rx="2" fill="#2bb6c4" style={ob} />
                  <path d="M74 220 q18 3 36 0 t36 0" stroke="#bdeef0" strokeWidth="1" fill="none" opacity="0.5" />
                </g>

                {/* villa foundation pads */}
                {VILLAS.map((x) => (
                  <rect key={x} className="rb-found" x={x - 27} y={GROUND - 3} width="54" height="6" rx="2" fill="#b8a882" />
                ))}

                {/* ── Villa walls (with door + windows) ── */}
                {VILLAS.map((x) => (
                  <g key={x} className="rb-wall">
                    <rect x={x - WALL_W / 2} y={GROUND - WALL_H} width={WALL_W} height={WALL_H} rx="2.5" fill="url(#rb-struct)" />
                    <rect x={x - 6} y={GROUND - 19} width="12" height="19" rx="1.5" fill="#5e4630" />
                    <rect x={x - 17} y={GROUND - 31} width="11" height="12" rx="1.5" fill="#3a4a4a" />
                    <rect x={x + 6} y={GROUND - 31} width="11" height="12" rx="1.5" fill="#3a4a4a" />
                  </g>
                ))}

                {/* ── Roofs ── */}
                {VILLAS.map((x) => (
                  <path key={x} className="rb-roof" d={`M${x - WALL_W / 2 - 7} ${GROUND - WALL_H} L${x} ${GROUND - WALL_H - 23} L${x + WALL_W / 2 + 7} ${GROUND - WALL_H}Z`} fill="url(#rb-thatch)" />
                ))}

                {/* ── Window lights (reveal) ── */}
                <g filter="url(#rb-bloom)">
                  {VILLAS.flatMap((x) =>
                    [x - 11.5, x + 11.5].map((wx) => (
                      <circle key={`l-${x}-${wx}`} className="rb-light" cx={wx} cy={GROUND - 25} r="5" fill="#ffd98a" opacity="0" style={oc} />
                    ))
                  )}
                </g>

                {/* ── Pathway lamp posts ── */}
                {LAMPS.map((x) => (
                  <g key={`lamp-${x}`}>
                    <g className="rb-lamp" style={ob}>
                      <line x1={x} y1={GROUND} x2={x} y2={GROUND - 30} stroke="#5c6a62" strokeWidth="2.6" strokeLinecap="round" />
                      <path d={`M${x} ${GROUND - 29} q0-4 6-4`} stroke="#5c6a62" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                      <circle cx={x + 6} cy={GROUND - 32} r="3" fill="#3b423d" />
                    </g>
                    <circle className="rb-light" cx={x + 6} cy={GROUND - 32} r="2.6" fill="#ffe6ad" opacity="0" style={oc} />
                    <circle className="rb-light" cx={x + 6} cy={GROUND - 32} r="7" fill="#ffd98a" opacity="0" filter="url(#rb-bloom)" style={oc} />
                  </g>
                ))}

                {/* ── Palms ── */}
                {PALMS.map((x, i) => (
                  <g key={x} className="rb-palm" style={ob}>
                    <path d={`M${x} 232 c-1-26 1-44 ${i % 2 ? 5 : -4}-60`} stroke="#3a5d2a" strokeWidth="3.2" strokeLinecap="round" />
                    <path
                      d={`M${x + (i % 2 ? 4 : -3)} 172 c-10-7-20-7-28-1 M${x + (i % 2 ? 4 : -3)} 172 c10-7 20-7 28-1 M${x + (i % 2 ? 4 : -3)} 172 c-3-10-2-19 1-25 M${x + (i % 2 ? 4 : -3)} 172 c-13-3-24 2-31 11 M${x + (i % 2 ? 4 : -3)} 172 c13-3 24 2 31 11`}
                      stroke="#4a7a32" strokeWidth="2.6" strokeLinecap="round" fill="none"
                    />
                  </g>
                ))}

                {/* ── Jetty into the lagoon ── */}
                <g className="rb-jetty" style={ol}>
                  <rect x="398" y="240" width="78" height="6" rx="2" fill="#a08060" />
                  {[412, 436, 460].map((x) => (
                    <line key={x} x1={x} y1="246" x2={x - 2} y2="262" stroke="#7d6a4a" strokeWidth="2.6" strokeLinecap="round" />
                  ))}
                </g>

                {/* ── Sailing boat ── */}
                <g className="rb-boat" opacity="0">
                  <path d="M486 318h44l-8 12h-28Z" fill="#e9ddc4" />
                  <path d="M506 318v-26l18 24Z" fill="#fbf3e4" />
                  <path d="M506 292 492 316h14Z" fill="#d9c79c" />
                  <line x1="506" y1="318" x2="506" y2="290" stroke="#7d6a4a" strokeWidth="2" />
                </g>

                {/* ── Construction crane ── */}
                <g className="rb-crane" stroke="#6b7a82" strokeWidth="3" fill="none" strokeLinecap="round">
                  <path d="M372 250V66" />
                  <path d="M372 66h-150M372 66l28 8M372 80l-150-4" />
                  <path className="rb-hook" d="M300 70v26" opacity="0" />
                </g>
                <rect className="rb-hook" x="294" y="96" width="14" height="8" rx="1" fill="url(#rb-struct)" opacity="0" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
