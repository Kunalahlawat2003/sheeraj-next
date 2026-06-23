"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { partners, bankers } from "@/data/site";

function LogoCard({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-36 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-24 sm:w-44 sm:px-6">
      {/* swap this span for <img src="/logo/partners/<file>.png" alt={name} /> when logos are added */}
      <span className="text-center font-display text-[1rem] font-semibold tracking-wide text-zinc-800">
        {name}
      </span>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="relative scroll-mt-24 py-16 sm:py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Fleet Partners"
          title={
            <>
              A fleet that <span className="text-gold-gradient">delivers.</span>
            </>
          }
          intro="Equipment, logistics, and supply partners who keep every site moving."
          align="center"
          className="mb-12 sm:mb-16"
        />
      </div>

      <div className="container-x">
        <div className="flex flex-wrap justify-center gap-5">
          {partners.map((p) => (
            <LogoCard key={p} name={p} />
          ))}
        </div>
      </div>

      <div className="container-x mt-16 sm:mt-24 md:mt-32">
        <SectionHeading
          eyebrow="Our Bankers"
          title={
            <>
              Financial strength that <span className="text-gold-gradient">backs us.</span>
            </>
          }
          intro="Leading institutions that fund and underwrite our infrastructure at scale."
          align="center"
          className="mb-12 sm:mb-16"
        />
      </div>

      <div className="container-x">
        <div className="flex flex-wrap justify-center gap-5">
          {bankers.map((b) => (
            <LogoCard key={b} name={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
