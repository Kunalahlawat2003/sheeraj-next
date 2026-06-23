"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up from 0 → value the first time it scrolls into view. */
export default function Counter({
  value,
  suffix = "",
  duration = 1600,
  format = true,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  // Preserve fractional precision (e.g. 7.59) through the count-up animation.
  const decimals = Number.isInteger(value) ? 0 : value.toString().split(".")[1].length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(p < 1 ? Number((value * eased).toFixed(decimals)) : value);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, decimals]);

  return (
    <span ref={ref}>
      {format
        ? display.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : display}
      {suffix}
    </span>
  );
}
