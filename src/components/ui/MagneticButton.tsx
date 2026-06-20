"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "ghost";
  className?: string;
  strength?: number;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Magnetic button: the label springs toward the cursor while the shell
 * lifts + sweeps a sheen on hover. Routes hash links through Lenis.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "gold",
  className = "",
  strength = 0.4,
  ariaLabel,
  type = "button",
  disabled,
}: Props) {
  const shellRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const inner = innerRef.current;
    if (!shell || !inner) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const qx = gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = shell.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * strength);
      qy((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      qx(0);
      qy(0);
    };

    shell.addEventListener("mousemove", onMove);
    shell.addEventListener("mouseleave", onLeave);
    return () => {
      shell.removeEventListener("mousemove", onMove);
      shell.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const cls = `btn ${variant === "gold" ? "btn-gold" : "btn-ghost"} ${className}`;
  const inner = (
    <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  const isHash = href?.startsWith("#") || href?.startsWith("/#");

  if (href && isHash) {
    return (
      <a
        ref={shellRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget(href!);
          onClick?.();
        }}
      >
        {inner}
      </a>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        ref={shellRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={shellRef as React.RefObject<HTMLButtonElement>}
      type={type}
      aria-label={ariaLabel}
      className={cls}
      disabled={disabled}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
