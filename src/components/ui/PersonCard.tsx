"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Person } from "@/data/site";

const SIZES = {
  lg: {
    pad: "p-6 md:p-10",
    colsDefault: "md:grid-cols-[1.6fr_0.4fr]",
    colsReverse: "md:grid-cols-[0.4fr_1.6fr]",
    portrait: "aspect-[3/4]",
    name: "text-3xl md:text-5xl",
    msg: "text-lg md:text-xl",
  },
  md: {
    pad: "p-5 md:p-8",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4]",
    name: "text-2xl md:text-3xl",
    msg: "text-base md:text-lg",
  },
  // Same width, text and padding as the director cards, but a shorter card:
  // the portrait keeps its width and gets a capped (shorter) height on desktop,
  // which pulls the overall card height down while the message stays legible.
  sm: {
    pad: "p-5 md:p-8",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4] md:aspect-auto md:h-52",
    name: "text-2xl md:text-3xl",
    msg: "text-base md:text-lg",
  },
  xs: {
    pad: "p-4 md:p-6",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4] md:aspect-auto md:h-40",
    name: "text-xl md:text-2xl",
    msg: "text-base md:text-lg",
  },
} as const;

export default function PersonCard({
  person,
  featured = false,
  reverse = false,
  size = "lg",
}: {
  person: Person;
  featured?: boolean;
  reverse?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
}) {
  if (featured) {
    const s = SIZES[size];
    return (
      <TiltCard max={4} className="rounded-[1.75rem]">
        <div className={`glass overflow-hidden rounded-[1.75rem] ${s.pad}`}>
          <div
            className={`grid gap-6 md:gap-10 ${reverse ? s.colsReverse : s.colsDefault}`}
          >
            {/* message */}
            <div
              className={`order-2 flex flex-col justify-center ${reverse ? "md:order-2" : "md:order-1"}`}
            >
              <span className="eyebrow">{person.role}</span>
              <h3 className={`mt-3 font-serif tracking-tight ${s.name}`}>{person.name}</h3>
              <p className={`mt-5 font-serif italic leading-relaxed text-silver md:leading-loose ${s.msg}`}>
                “{person.message}”
              </p>
              <div className="mt-6 h-px w-16 bg-linear-to-r from-gold to-transparent" />
            </div>

            {/* contained portrait */}
            <div className={`order-1 ${reverse ? "md:order-1" : "md:order-2"}`}>
              <div className={`relative ${s.portrait} overflow-hidden rounded-2xl border [border-color:var(--ui-border-md)]`}>
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width:768px) 100vw, 22rem"
                  className={size === "xs" ? "object-contain object-center" : "object-cover object-top"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-base/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard max={7} className="h-full rounded-2xl">
      <div className="group h-full overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{person.role}</div>
            <h3 className="mt-1 font-serif text-xl tracking-tight">{person.name}</h3>
          </div>
        </div>
        <p className="p-5 text-sm leading-relaxed text-mist">“{person.message}”</p>
      </div>
    </TiltCard>
  );
}
