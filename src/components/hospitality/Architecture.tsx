"use client";

import Image from "next/image";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { LeafCluster, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Architecture() {
  const a = hospitalityPage.architecture;
  return (
    <section className="relative overflow-hidden bg-shell py-28 text-ocean-deep md:py-36">
      {/* tropical decor */}
      <LeafCluster className="absolute -left-8 top-4 z-0 text-[#0e463f]/10" />
      <Hibiscus className="absolute right-[8%] top-24 z-0 h-10 w-10 text-coral/50 anim-bob" />
      <Hibiscus className="absolute right-[14%] top-40 z-0 h-7 w-7 text-lagoon/40" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={a.eyebrow} title={a.title} intro={a.intro} onLight className="mb-16" />

        <div className="grid gap-6 md:grid-cols-3">
          {a.items.map((item, i) => {
            const contain = item.fit === "contain";
            return (
            <Reveal key={item.title} delay={i * 0.08}>
              <TiltCard max={6} className="h-full rounded-[1.5rem]">
                <div className="group relative h-[26rem] overflow-hidden rounded-[1.5rem] bg-ocean-deep shadow-[0_30px_60px_-35px_rgba(6,38,47,0.55)]">
                  {/* Contained images (site plans / aerials): a blurred copy fills
                      the frame so the FULL photo shows with no hard letterbox bars. */}
                  {contain && (
                    <Image
                      src={item.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width:768px) 100vw, 30vw"
                      className="scale-125 object-cover opacity-50 blur-2xl"
                    />
                  )}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 30vw"
                    className={
                      contain
                        ? "object-contain"
                        : "object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06262f]/85 via-[#06262f]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-2xl text-foam">{item.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-foam/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
