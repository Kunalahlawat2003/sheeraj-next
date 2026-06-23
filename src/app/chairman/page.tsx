import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import PersonCard from "@/components/ui/PersonCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { chairmanMessage, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Message from the Chairman",
  description: "A note from our Founder & Chairman on what it means to build for the long term.",
};

export default function ChairmanPage() {
  const c = chairmanMessage;
  return (
    <>
      <PageHero
        eyebrow="From the Founder"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Chairman", href: "/chairman" }]}
        title={<>A message from the <span className="text-gold-gradient italic">Chairman.</span></>}
      />

      <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* photo card (sticky) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PersonCard person={team.chairman} />
          </div>

          {/* message */}
          <Reveal>
            <article className="max-w-2xl">
              <p className="font-serif text-xl italic leading-snug text-gold-gradient sm:text-2xl">
                “{team.chairman.message}”
              </p>
              <div className="hairline my-7 sm:my-9" />
              <div className="space-y-5 text-lg leading-relaxed text-mist sm:space-y-6">
                {c.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-gold sm:first-letter:text-6xl" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 sm:mt-10">
                <div className="font-serif text-2xl italic text-silver sm:text-3xl">{c.signature}</div>
                <div className="mt-1 text-sm uppercase tracking-[0.2em] text-mist">{c.role}</div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 sm:mt-12">
                <MagneticButton href="/about">Meet the leadership</MagneticButton>
                <MagneticButton href="/contact" variant="ghost">Contact us</MagneticButton>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
