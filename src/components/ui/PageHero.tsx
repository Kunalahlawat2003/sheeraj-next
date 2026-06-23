"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  breadcrumb,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  const center = align === "center";
  const v = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.85, ease, delay: 0.1 + i * 0.12 } }),
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-44 md:pb-24">
      {/* background */}
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/40" />
        </div>
      )}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-lagoon/10 blur-[120px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ui-dot) 1px,transparent 1px),linear-gradient(90deg,var(--ui-dot) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 0%, #000, transparent 70%)",
        }}
      />

      <div className={`container-x relative ${center ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}`}>
        {breadcrumb && (
          <motion.nav custom={0} variants={v} initial="hidden" animate="show" className={`mb-6 flex items-center gap-2 text-xs text-mist ${center ? "justify-center" : ""}`}>
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-faint">/</span>}
                <Link href={b.href} className="transition-colors hover:text-gold">{b.label}</Link>
              </span>
            ))}
          </motion.nav>
        )}
        {eyebrow && (
          <motion.span custom={1} variants={v} initial="hidden" animate="show" className={`eyebrow ${center ? "justify-center" : ""}`}>
            {eyebrow}
          </motion.span>
        )}
        <motion.h1 custom={2} variants={v} initial="hidden" animate="show" className="mt-5 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-balance sm:text-6xl sm:leading-[1.02] md:text-7xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p custom={3} variants={v} initial="hidden" animate="show" className={`mt-5 max-w-2xl text-base leading-relaxed text-mist sm:mt-6 sm:text-lg ${center ? "mx-auto" : ""}`}>
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div custom={4} variants={v} initial="hidden" animate="show" className={`mt-9 flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
