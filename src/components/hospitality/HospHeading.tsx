import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/** Heading tuned for the tropical palette — `onLight` flips text for sand sections. */
export default function HospHeading({
  eyebrow,
  title,
  intro,
  onLight = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  onLight?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.32em] ${
              onLight ? "text-ocean" : "text-lagoon"
            } ${center ? "justify-center" : ""}`}
          >
            <span
              className={`h-px w-7 bg-gradient-to-r from-transparent ${
                onLight ? "to-ocean" : "to-lagoon"
              }`}
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`mt-5 font-serif text-4xl leading-[1.04] tracking-tight text-balance sm:text-5xl md:text-[3.3rem] ${
            onLight ? "!text-ocean-deep" : "!text-foam"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${
              onLight ? "text-ocean/75" : "text-foam/70"
            } ${center ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
