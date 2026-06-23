"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { buildSequence } from "@/data/site";

export default function BuildSequence() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      if (reduce) {
        gsap.set(
          [".bs-pylon", ".bs-deck", ".bs-dash", ".bs-glow", ".bs-beamfill"],
          { scaleX: 1, scaleY: 1, opacity: 1 }
        );
        gsap.set(q(".bs-stage")[buildSequence.length - 1], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // progress beam
      tl.fromTo(".bs-beamfill", { scaleY: 0 }, { scaleY: 1, duration: 4 }, 0);

      // 01 — pylons rise
      tl.fromTo(
        ".bs-pylon",
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.15, duration: 1 },
        0.2
      );
      // 02 — deck spans
      tl.fromTo(".bs-deck", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 1.2);
      // 03 — road dashes draw + concrete fill
      tl.fromTo(
        ".bs-dash",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, stagger: 0.06, duration: 1 },
        2.2
      );
      // 04 — it comes alive (warm glow + lights)
      tl.fromTo(".bs-glow", { opacity: 0 }, { opacity: 1, duration: 1 }, 3);
      tl.fromTo(
        ".bs-light",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6 },
        3.2
      );

      // stage text crossfade
      const stages = q(".bs-stage");
      stages.forEach((el: Element, i: number) => {
        tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, i * 1);
        if (i < stages.length - 1)
          tl.to(el, { opacity: 0, y: -24, duration: 0.4 }, i * 1 + 0.7);
      });
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      id="process"
      className="relative bg-ink"
      style={{ height: "360vh" }}
    >
      <div
        ref={pin}
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"
      >
        {/* heading */}
        <div className="container-x pt-16 sm:pt-20 lg:pt-24">
          <span className="eyebrow">The Process</span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Watch it{" "}
            <span className="text-gold-gradient italic">build itself.</span>
          </h2>
        </div>

        {/* scene */}
        <div className="relative flex flex-1 items-center">
          <div className="container-x grid w-full items-center gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            {/* stage readout */}
            <div className="relative h-40 sm:h-44">
              {buildSequence.map((s) => (
                <div
                  key={s.no}
                  className="bs-stage absolute inset-0 opacity-0"
                >
                  <div className="font-serif text-6xl [color:var(--ui-ghost)] sm:text-7xl">{s.no}</div>
                  <h3 className="-mt-6 font-serif text-2xl text-silver sm:-mt-8 sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            {/* SVG construction scene */}
            <div className="relative">
              <svg
                viewBox="0 0 600 360"
                className="w-full"
                fill="none"
                aria-hidden
              >
                {/* warm glow that turns on at the end */}
                <ellipse
                  className="bs-glow"
                  cx="300"
                  cy="120"
                  rx="240"
                  ry="120"
                  fill="url(#bs-warm)"
                  opacity="0"
                />
                <defs>
                  <radialGradient id="bs-warm">
                    <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bs-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e9cd7c" />
                    <stop offset="1" stopColor="#9c7c22" />
                  </linearGradient>
                </defs>

                {/* ground */}
                <line x1="20" y1="300" x2="580" y2="300" stroke="#c6bfb0" strokeWidth="2" />

                {/* pylons */}
                {[140, 300, 460].map((x) => (
                  <rect
                    key={x}
                    className="bs-pylon"
                    x={x - 7}
                    y="150"
                    width="14"
                    height="150"
                    rx="3"
                    fill="url(#bs-gold)"
                    style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                  />
                ))}

                {/* deck */}
                <rect
                  className="bs-deck"
                  x="100"
                  y="150"
                  width="400"
                  height="16"
                  rx="3"
                  fill="#9b98a8"
                  opacity="0.9"
                  style={{ transformBox: "fill-box", transformOrigin: "left" }}
                />

                {/* road dashes */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect
                    key={i}
                    className="bs-dash"
                    x={120 + i * 40}
                    y="157"
                    width="22"
                    height="3"
                    rx="1.5"
                    fill="#06070b"
                    style={{ transformBox: "fill-box", transformOrigin: "left" }}
                  />
                ))}

                {/* lights coming on */}
                {[140, 300, 460].map((x) => (
                  <circle
                    key={`l-${x}`}
                    className="bs-light"
                    cx={x}
                    cy="142"
                    r="5"
                    fill="#ffd98a"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                ))}
              </svg>

              {/* vertical progress beam */}
              <div className="absolute -left-5 top-0 hidden h-full w-px [background-color:var(--ui-ghost)] lg:block">
                <div
                  className="bs-beamfill h-full w-full origin-top bg-gradient-to-b from-gold-soft to-gold-deep"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
