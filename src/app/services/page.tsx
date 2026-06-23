import type { Metadata } from "next";
import Image from "next/image";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";
import { services, serviceDetail } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Highways, ring roads, canals, government EPC, heavy civil infrastructure and island hospitality — delivered end-to-end.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Build"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        title={<>From corridors of <span className="text-gold-gradient">commerce</span> to coasts of calm.</>}
        subtitle="Six disciplines, one engineering culture — delivered end-to-end with our own teams and fleet."
      >
        <MagneticButton href="/#rental">Rent machinery</MagneticButton>
        <MagneticButton href="/contact" variant="ghost">Discuss a project</MagneticButton>
      </PageHero>

      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container-x space-y-14 sm:space-y-20 md:space-y-28">
          {services.map((s, i) => {
            const detail = serviceDetail[s.key];
            const flip = i % 2 === 1;
            return (
              <div key={s.key} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                {/* media */}
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <TiltCard max={5} className="rounded-[1.75rem]">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border [border-color:var(--ui-border-md)]">
                      {detail?.image && (
                        <Image src={detail.image} alt={s.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-base/55 to-transparent" />
                      <span className="absolute left-5 top-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 [background-color:var(--ui-surface-md)] text-gold backdrop-blur">
                        <Icon name={s.icon} />
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>

                {/* copy */}
                <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                  <div>
                    <span className="eyebrow">Service {String(i + 1).padStart(2, "0")}</span>
                    <h2 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">{s.title}</h2>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-mist">{s.blurb}</p>
                    {detail?.points && (
                      <ul className="mt-6 space-y-3">
                        {detail.points.map((p) => (
                          <li key={p} className="flex items-start gap-3 text-sm text-silver/90">
                            <span className="mt-1 h-px w-6 shrink-0 bg-gold/70" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-8 md:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
            <h2 className="relative font-serif text-3xl tracking-tight md:text-4xl">Have a project in mind?</h2>
            <p className="relative mx-auto mt-4 max-w-md text-mist">Tell us the scope — we&apos;ll bring the engineering, the fleet and the discipline.</p>
            <div className="relative mt-8 flex justify-center">
              <MagneticButton href="/contact">Start the conversation</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
