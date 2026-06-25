import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CareersExplorer from "@/components/careers/CareersExplorer";
import { careers } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build things that last — open roles across infrastructure and island hospitality at Sheeraj Projects.",
};

const perks = [
  "Work on landmark infrastructure and hospitality projects",
  "Mentorship from seasoned engineers and project leaders",
  "Clear growth paths and on-site learning",
  "A safety-first, people-first culture",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Build With Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]}
        title={<>Engineer your <span className="text-gold-gradient italic">next chapter.</span></>}
        subtitle={careers.intro}
      />

      {/* perks */}
      <section className="pb-8">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p} delay={i * 0.06}>
              <div className="h-full rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)] p-5">
                <div className="font-display text-xs text-gold">0{i + 1}</div>
                <p className="mt-3 text-sm leading-relaxed text-mist">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* openings */}
      <section className="py-12 sm:py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 md:mb-10">
            <span className="eyebrow">Open Roles</span>
            <h2 className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl md:text-4xl">Find your place on the team.</h2>
          </div>
          <CareersExplorer />
        </div>
      </section>
    </>
  );
}
