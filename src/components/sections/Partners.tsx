"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners, bankers } from "@/data/site";

function LogoCard({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-20 w-36 items-center justify-center rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-24 sm:w-44 sm:p-5">
      {logo ? (
        <div className="relative h-full w-full">
          <Image
            src={logo}
            alt={name}
            fill
            sizes="(max-width:640px) 144px, 176px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center font-display text-[1rem] font-semibold tracking-wide text-zinc-800">
          {name}
        </span>
      )}
    </div>
  );
}

function BankerCard({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-24 w-44 items-center justify-center rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-28 sm:w-52 md:h-32 md:w-60">
      {logo ? (
        <div className="relative h-full w-full">
          <Image
            src={logo}
            alt={name}
            fill
            sizes="(max-width:640px) 176px, (max-width:768px) 208px, 240px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center font-display text-[1rem] font-semibold tracking-wide text-zinc-800">
          {name}
        </span>
      )}
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
            <LogoCard key={p.name} name={p.name} logo={p.logo} />
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
            <BankerCard key={b.name} name={b.name} logo={b.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
