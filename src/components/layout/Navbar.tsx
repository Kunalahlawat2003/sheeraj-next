"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { company, nav, type NavItem } from "@/data/site";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  // The transparent header overlays a full-bleed (now tinted) media hero on these
  // routes — use media-adaptive text there until the glass header kicks in on scroll.
  const overHero = !scrolled && (pathname === "/" || pathname === "/hospitality");
  // Hamburger bars: media-adaptive over the hero, but plain once the menu overlay is open.
  const barBg = overHero && !open ? "bg-(--on-media)" : "bg-silver";

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
    if (pathname === "/") {
      scrollToTarget(to);
    } else {
      sessionStorage.setItem("scrollTarget", to);
      router.push("/");
    }
  };

  // After navigating to home, scroll to the stored section once Lenis is ready.
  useEffect(() => {
    if (pathname !== "/") return;
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");
    const timer = setTimeout(() => scrollToTarget(target), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  // A nav route is active when the current path matches it — or is nested
  // beneath it, so /projects/[slug] still lights up the "Projects" tab.
  // In-page hash links (/#…) are not treated as a distinct active route.
  const isActive = (to?: string) => {
    if (!to || to.startsWith("/#")) return false;
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const renderLink = (item: NavItem, mobile = false) => {
    const active = isActive(item.to);
    const base = mobile
      ? `block py-3 text-2xl font-serif transition-colors ${
          active ? "text-gold" : "text-silver hover:text-gold"
        }`
      : `relative text-sm transition-colors ${
          active ? "text-gold" : `hover:text-gold ${overHero ? "text-on-media" : "text-silver/85"}`
        }`;
    const label = (
      <>
        <span className="inline-flex items-center gap-1.5">
          {item.label}
          {item.tag && (
            <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-gold">
              {item.tag}
            </span>
          )}
        </span>
        {!mobile && active && (
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full bg-gold"
          />
        )}
      </>
    );
    if (item.to?.startsWith("/#")) {
      return (
        <a key={item.label} href={item.to} className={base} onClick={(e) => handleHash(e, item.to!)}>
          {label}
        </a>
      );
    }
    return (
      <Link key={item.label} href={item.to ?? "#"} className={base} onClick={() => setOpen(false)}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong pb-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]" : "pb-5"
        }`}
        style={{ paddingTop: `calc(${scrolled ? "0.75rem" : "1.25rem"} + env(safe-area-inset-top, 0px))` }}
      >
        <nav className="container-x flex items-center justify-between">
          <Link
            href="/"
            aria-label="SHEERAJ Projects — home"
            className="inline-flex items-center gap-2.5"
          >
            <Logo variant="seal" size={40} priority />
            <span className="flex flex-col leading-none">
              <span
                className={`font-brand text-base font-semibold uppercase tracking-[0.12em] transition-colors sm:text-lg ${
                  overHero ? "text-on-media" : "text-silver"
                }`}
              >
                {company.name}
              </span>
              <span className="mt-1 font-serif text-[0.72rem] italic lowercase tracking-wide text-gold">
                {company.motto}
              </span>
            </span>
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
                  <button
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      item.children.some((c) => isActive(c.to))
                        ? "text-gold"
                        : `hover:text-gold ${overHero ? "text-on-media" : "text-silver/85"}`
                    }`}
                  >
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
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-(--ui-surface-xs)"
                            >
                              <span className={`text-sm group-hover:text-gold ${isActive(c.to) ? "text-gold" : "text-silver"}`}>{c.label}</span>
                              <span className="text-[0.65rem] text-mist">{c.note}</span>
                            </a>
                          ) : (
                            <Link
                              key={c.label}
                              href={c.to ?? "#"}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-(--ui-surface-xs)"
                            >
                              <span className={`text-sm group-hover:text-gold ${isActive(c.to) ? "text-gold" : "text-silver"}`}>{c.label}</span>
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

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <MagneticButton href="/contact" className="px-6! py-3! text-xs">
              Contact
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`h-px w-6 ${barBg} transition-all ${open ? "translate-y-1.75 rotate-45" : ""}`} />
            <span className={`h-px w-6 ${barBg} transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 ${barBg} transition-all ${open ? "-translate-y-1.75 -rotate-45" : ""}`} />
          </button>
        </nav>

        {/* scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-linear-to-r from-gold-deep via-gold to-gold-soft"
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
            <div className="mt-10 flex items-center gap-4">
              <MagneticButton href="/contact" onClick={() => setOpen(false)}>
                Contact
              </MagneticButton>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
