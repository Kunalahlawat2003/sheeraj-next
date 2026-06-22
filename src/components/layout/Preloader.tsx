"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { company } from "@/data/site";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 350 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          (window as unknown as { __loaded?: boolean }).__loaded = true;
          window.dispatchEvent(new Event("sheeraj:loaded"));
        }, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5"
          >
            <Logo variant="seal" size={56} />
            <span className="flex flex-col leading-none">
              <span className="font-brand text-lg font-semibold uppercase tracking-[0.12em] text-silver sm:text-xl">
                {company.name}
              </span>
              <span className="mt-1 font-serif text-[0.8rem] italic lowercase tracking-wide text-gold">
                {company.motto}
              </span>
            </span>
          </motion.div>

          <div className="mt-10 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-deep to-gold-soft"
              style={{ width: `${count}%` }}
            />
          </div>

          <div className="mt-4 font-display text-xs tracking-[0.4em] text-mist">
            {count.toString().padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
