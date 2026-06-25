import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import PersonCard from "@/components/ui/PersonCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { aboutHighlights, chairmanAddress, company, stats, team } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Two identities, one standard of building — the people and principles behind Sheeraj Projects.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        title={
          <>
            Two identities. <span className="text-gold-gradient italic">One standard</span> of building.
          </>
        }
        subtitle={`Since ${company.established}, we have engineered the roads, canals and bridges that connect India — and today we bring that same precision to crafting destinations that inspire it.`}
        image="/images/aboutMain.jpg"
      >
        <MagneticButton href="/projects">View our projects</MagneticButton>
      </PageHero>

      {/* story + stats */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container-x grid items-center gap-10 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border [border-color:var(--ui-border-md)]">
              <Image src="/images/aboutMain.jpg" alt="Sheeraj engineering" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={<>Built for <span className="text-gold-gradient">generation</span> to come.</>}
              intro="What began with four-lane highways has evolved into a multi-disciplinary EPC company and hospitality developer shaping some of the most pristine island destinations. Through every project, our commitment remains the same: to build to a standard, not just a deadline."
            />
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {aboutHighlights.map((h, i) => (
                <Reveal key={h} delay={i * 0.06}>
                  <li className="flex items-start gap-3 text-sm text-mist">
                    <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                    {h}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-sm)] sm:grid-cols-4 lg:mt-10">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-5 sm:px-5 sm:py-6 lg:px-3 lg:py-5 xl:px-4 xl:py-6 2xl:px-5 bg-(--ui-surface-xs)">
                  <div className="font-serif text-2xl text-gold-gradient sm:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[0.72rem] uppercase leading-snug tracking-wider text-mist">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* leadership */}
      <section className="bg-ink py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership"
            title={<>The people behind the <span className="text-gold-gradient">promise.</span></>}
            intro="Engineers, operators and stewards who hold every project to the same exacting standard."
            align="center"
            className="mb-10 sm:mb-12 lg:mb-14"
          />

          {/* chairman — compact card; the long message scrolls inside, then the page */}
          <Reveal>
            <div className="glass overflow-hidden rounded-[1.75rem] p-5 md:p-8">
              <div className="grid gap-6 md:grid-cols-[0.36fr_1.64fr] md:gap-10">
                {/* portrait */}
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border [border-color:var(--ui-border-md)]">
                    <Image
                      src={team.chairman.photo}
                      alt={team.chairman.name}
                      fill
                      priority
                      sizes="(max-width:768px) 100vw, 26vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-base/50 to-transparent" />
                  </div>
                  <div className="mt-4">
                    <span className="eyebrow">{team.chairman.role}</span>
                    <h3 className="mt-2 font-serif tracking-tight text-xl md:text-sm lg:text-lg xl:text-xl">
                      {team.chairman.name}
                    </h3>
                    <div className="mt-4 h-px w-14 bg-linear-to-r from-gold to-transparent" />
                  </div>
                </div>

                {/* message — scrolls internally first, then chains to the page */}
                <div
                  data-lenis-prevent
                  className="chairman-scroll max-h-88 overflow-y-auto pr-3 md:max-h-104 md:pr-4"
                >
                  {chairmanAddress.before.map((p, i) => (
                    <p
                      key={`b-${i}`}
                      className={`leading-relaxed text-mist md:text-lg md:leading-loose ${
                        i > 0 ? "mt-5" : ""
                      }`}
                    >
                      {p}
                    </p>
                  ))}

                  <figure className="my-7 border-l-2 border-gold/60 pl-5">
                    <figcaption className="eyebrow mb-2">{chairmanAddress.quoteLeadIn}</figcaption>
                    <blockquote className="font-serif text-lg italic leading-relaxed text-gold-gradient md:text-xl md:leading-relaxed">
                      “{chairmanAddress.quote}”
                    </blockquote>
                  </figure>

                  {chairmanAddress.after.map((p, i) => (
                    <p
                      key={`a-${i}`}
                      className="mt-5 leading-relaxed text-mist md:text-lg md:leading-loose"
                    >
                      {p}
                    </p>
                  ))}

                </div>
              </div>
            </div>
          </Reveal>

          {/* managing director — Ankit Pannu (same card + tilt animation as directors) */}
          <Reveal className="mt-6">
            <PersonCard
              person={{
                name: "Mr. Ankit Pannu",
                role: "Managing Director",
                photo: "/images/boardMember/ankitSir.png",
                message:
                  "At SHEERAJ Projects, our commitment is to deliver excellence through quality construction, innovation, and timely project execution. We strive to build lasting value for our clients while contributing to the growth of modern infrastructure.",
              }}
              featured
              size="md"
            />
          </Reveal>

          {/* directors — alternate image side: first director's image on the left */}
          {team.directors.map((d, i) => (
            <Reveal key={d.name} className="mt-6" delay={i * 0.05}>
              <PersonCard person={d} featured size="md" reverse={i % 2 === 0} />
            </Reveal>
          ))}

          {/* COO — shorter than director cards */}
          <Reveal className="mt-6">
            <PersonCard person={team.coo} featured size="sm" reverse />
          </Reveal>

          {/* Auditor — shortest card, below COO */}
          <Reveal className="mt-6">
            <PersonCard person={team.ca} featured size="xs" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-8 sm:py-14 md:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
            <h2 className="relative font-serif text-3xl tracking-tight md:text-5xl">
              Let&apos;s build something <span className="text-gold-gradient italic">that lasts.</span>
            </h2>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">Get in touch</MagneticButton>
              <Link href="/careers" className="btn btn-ghost">Explore careers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
