"use client";

import Image from "next/image";
import HospHeading from "./HospHeading";
import Marquee from "@/components/ui/Marquee";
import { LeafCluster } from "./tropical";
import { hospitalityPage } from "@/data/site";

function Shot({ src }: { src: string }) {
  return (
    <div className="relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-foam/10 md:h-72 md:w-[26rem]">
      <Image src={src} alt="Island resort imagery" fill sizes="26rem" className="object-cover transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04222a]/40 to-transparent" />
    </div>
  );
}

export default function Gallery() {
  const imgs = hospitalityPage.gallery;
  const half = Math.ceil(imgs.length / 2);
  return (
    <section className="relative overflow-hidden bg-[#04222a] py-28 md:py-32">
      <LeafCluster className="absolute -left-8 top-2 z-0 text-aqua/10" />
      <LeafCluster flip className="absolute -right-8 top-2 z-0 text-lagoon/10" />

      <div className="container-x relative z-10">
        <HospHeading
          eyebrow="Interactive Gallery"
          title={<>A glimpse of the <span className="bg-gradient-to-r from-aqua to-coral bg-clip-text text-transparent">life ahead.</span></>}
          align="center"
          className="mb-16"
        />
      </div>
      <div className="flex flex-col gap-5">
        <Marquee speed={55}>
          {imgs.slice(0, half).map((s, i) => (
            <Shot key={i} src={s} />
          ))}
        </Marquee>
        <Marquee speed={62} reverse>
          {imgs.slice(half).map((s, i) => (
            <Shot key={i} src={s} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
