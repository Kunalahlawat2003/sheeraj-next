"use client";

import Image from "next/image";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster } from "./tropical";
import { hospitalityPage } from "@/data/site";

const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

export default function Amenities() {
  const a = hospitalityPage.amenities;
  return (
    <section className="relative overflow-hidden bg-cream py-28 text-ocean-deep md:py-36">
      <LeafCluster flip className="absolute -right-8 bottom-0 z-0 text-[#0e463f]/10" />
      <LeafCluster className="absolute -left-10 top-2 z-0 h-40 scale-90 text-[#0e463f]/[0.07]" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={a.eyebrow} title={a.title} align="center" className="mb-16" />

        <div className="grid auto-rows-[13rem] grid-cols-2 gap-4 md:grid-cols-4">
          {a.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06} className={spans[i] ?? ""}>
              <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_-32px_rgba(6,38,47,0.5)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06262f]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-xl text-foam">{item.title}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-foam/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {item.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
