"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll driven by GSAP's ticker, kept in sync with ScrollTrigger.
 * Disabled when the user prefers reduced motion (native scroll takes over).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });

    // Expose for in-page anchor navigation (Navbar / CTAs).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Smooth-scroll to an element / hash, falling back to native when Lenis is off. */
export function scrollToTarget(target: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = target.startsWith("#")
    ? document.querySelector(target)
    : document.querySelector(`#${target.replace(/^\/#/, "")}`);
  if (lenis && el) {
    lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.4 });
  } else if (el) {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
