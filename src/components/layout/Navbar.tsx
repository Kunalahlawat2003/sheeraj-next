"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { nav, type NavItem } from "@/data/site";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const handleHash = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setOpen(false);
    setOpenDrop(null);
    scrollToTarget(to);
  };

  const renderLink = (item: NavItem, mobile = false) => {
    const base = mobile
      ? "block py-3 text-2xl font-serif text-silver hover:text-gold transition-colors"
      : "relative text-sm text-silver/85 transition-colors hover:text-gold";
    if (item.to?.startsWith("/#")) {
      return (
        <a key={item.label} href={item.to} className={base} onClick={(e) => handleHash(e, item.to!)}>
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.label} href={item.to ?? "#"} className={base} onClick={() => setOpen(false)}>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]" : "py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <Link href="/" aria-label="Sheeraj Projects — home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-9 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  <button className="flex items-center gap-1.5 text-sm text-silver/85 transition-colors hover:text-gold">
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" className="mt-0.5 opacity-60">
                      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDrop === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="glass absolute left-1/2 top-full mt-4 w-60 -translate-x-1/2 rounded-2xl p-2"
                      >
                        {item.children.map((c) =>
                          c.to?.startsWith("/#") ? (
                            <a
                              key={c.label}
                              href={c.to}
                              onClick={(e) => handleHash(e, c.to!)}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                            >
                              <span className="text-sm text-silver group-hover:text-gold">{c.label}</span>
                              <span className="text-[0.65rem] text-mist">{c.note}</span>
                            </a>
                          ) : (
                            <Link
                              key={c.label}
                              href={c.to ?? "#"}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                            >
                              <span className="text-sm text-silver group-hover:text-gold">{c.label}</span>
                              <span className="text-[0.65rem] text-mist">{c.note}</span>
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                renderLink(item)
              )
            )}
          </div>

          <div className="hidden lg:block">
            <MagneticButton href="/#rental" className="!px-6 !py-3 text-xs">
              Rent Machinery
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`h-px w-6 bg-silver transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-silver transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-silver transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </nav>

        {/* scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
          style={{ scaleX: progress }}
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-base/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.flatMap((item) =>
                item.children
                  ? item.children.map((c) => renderLink(c, true))
                  : [renderLink(item, true)]
              )}
            </div>
            <div className="mt-10">
              <MagneticButton href="/#rental" onClick={() => setOpen(false)}>
                Rent Machinery
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
