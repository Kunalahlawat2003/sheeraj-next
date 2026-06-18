"use client";

import { useEffect, useRef } from "react";

/**
 * Premium custom cursor: a soft gold glow + a precise ring + center dot.
 * The ring lerp-follows the pointer; it grows and the dot vanishes over
 * interactive elements. Disabled entirely on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const glow = glowRef.current!;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const el = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      const next = !!el;
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle("is-active", hovering);
        glow.classList.toggle("is-active", hovering);
      }
    };

    const render = () => {
      const speed = reduce ? 1 : 0.18;
      ringPos.x += (target.x - ringPos.x) * speed;
      ringPos.y += (target.y - ringPos.y) * speed;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      glow.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={glowRef}
        className="cursor-glow fixed left-0 top-0 h-64 w-64 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.16), transparent 60%)",
          transition: "opacity .3s ease",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 h-9 w-9 rounded-full border opacity-0"
        style={{
          borderColor: "rgba(212,175,55,0.85)",
          transition: "opacity .3s ease, width .25s ease, height .25s ease",
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold opacity-0"
        style={{ transition: "opacity .3s ease, transform .05s linear" }}
      />
      <style>{`
        .cursor-ring.is-active { width: 4rem; height: 4rem; border-color: rgba(233,205,124,0.9); background: rgba(212,175,55,0.06); }
        .cursor-glow.is-active { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
