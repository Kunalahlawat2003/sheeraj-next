import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { API_BASE } from "@/lib/api";
import { company, contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Sheeraj Projects — public authorities, project partners and future guests welcome.",
};

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.42 8.85 3.42 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-2.94a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />,
  youtube:   <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />,
  facebook:  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34v7.03C18.34 21.24 22 17.08 22 12.06Z" />,
  linkedin:  <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.48h3.27V21H3.3V8.48Zm5.34 0h3.13v1.71h.05c.44-.83 1.5-1.71 3.08-1.71 3.3 0 3.91 2.17 3.91 4.99V21h-3.27v-5.93c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V21H8.64V8.48Z" />,
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
            <div className="grid items-stretch gap-5 sm:grid-cols-2">
              {contact.offices.map((o) => (
                <Reveal key={o.label} className="h-full">
                  <div className="glass h-full rounded-2xl p-5">
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
                    <a key={k} href={v} aria-label={k} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-(--ui-border-md) text-mist transition-colors hover:border-gold/60 hover:text-gold">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        {socialIcons[k]}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass overflow-hidden rounded-2xl p-6">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">Divisions</div>
                <ul className="mt-3 space-y-2 text-sm uppercase text-mist">
                  <li>Infrastructure &amp; EPC — pan-India</li>
                  <li>Island Hospitality — Andaman &amp; Nicobar</li>
                  <li>Plant &amp; Machinery rental — pan-India</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <ContactForm
              submitLabel="Send message"
              endpoint={`${API_BASE}/contact-form-sheeraj-projects`}
              recaptchaAction="contact_form"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
