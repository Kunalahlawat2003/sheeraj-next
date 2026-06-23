import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { company, contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Sheeraj Projects — public authorities, project partners and future guests welcome.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        title={<>Let&apos;s build something <span className="text-gold-gradient italic">that lasts.</span></>}
        subtitle={contact.intro}
      />

      <section className="pb-16 sm:pb-24 lg:pb-28">
        <div className="container-x grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* details */}
          <div className="space-y-6 sm:space-y-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {contact.offices.map((o) => (
                <Reveal key={o.label}>
                  <div className="glass rounded-2xl p-5">
                    <div className="text-[0.7rem] uppercase tracking-wider text-gold">{o.label}</div>
                    <div className="mt-2 text-sm text-silver">{o.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl p-6">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">Reach us</div>
                <a href={`mailto:${company.email}`} className="mt-3 block text-lg text-silver transition-colors hover:text-gold">{company.email}</a>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-mist transition-colors hover:text-gold">{company.phone}</a>
                <div className="mt-5 flex gap-3">
                  {Object.entries(company.social).map(([k, v]) => (
                    <a key={k} href={v} className="flex h-10 w-10 items-center justify-center rounded-full border [border-color:var(--ui-border-md)] text-xs uppercase text-mist transition-colors hover:border-gold/60 hover:text-gold">
                      {k[0]}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass overflow-hidden rounded-2xl p-6">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">Divisions</div>
                <ul className="mt-3 space-y-2 text-sm text-mist">
                  <li>Infrastructure &amp; EPC — pan-India</li>
                  <li>Island Hospitality — Andaman &amp; Nicobar</li>
                  <li>Plant &amp; Machinery rental</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <ContactForm submitLabel="Send message" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
