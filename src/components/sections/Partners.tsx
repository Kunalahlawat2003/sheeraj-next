"use client";

import Marquee from "@/components/ui/Marquee";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/data/site";

function Chip({ name }: { name: string }) {
  return (
    <span className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)] px-7 py-4 transition-all duration-300 hover:scale-110 hover:border-gold/40 hover:[background-color:var(--ui-surface-md)]">
      <span className="h-2 w-2 rounded-full bg-gold/60 transition-colors group-hover:bg-gold" />
      <span className="font-display text-lg tracking-wide text-silver/80 transition-colors group-hover:text-silver">
        {name}
      </span>
    </span>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="relative scroll-mt-24 py-28 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trusted By"
          title={
            <>
              A network that <span className="text-gold-gradient">delivers.</span>
            </>
          }
          intro="Public authorities, suppliers, and design partners who build alongside us."
          align="center"
          className="mb-16"
        />
      </div>

      <div className="flex flex-col gap-5">
        <Marquee speed={42}>
          {partners.map((p) => (
            <Chip key={p} name={p} />
          ))}
        </Marquee>
        <Marquee speed={50} reverse>
          {[...partners].reverse().map((p) => (
            <Chip key={p} name={p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
