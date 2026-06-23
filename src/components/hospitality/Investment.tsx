"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { LeafCluster } from "./tropical";
import ContactForm, { type FieldDef } from "@/components/ui/ContactForm";
import { API_BASE } from "@/lib/api";
import { company, hospitalityPage } from "@/data/site";

const INVESTOR_FIELDS: FieldDef[] = [
  { name: "name", label: "Full name", required: true },
  { name: "company", label: "Company / Fund" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "interest", label: "Area of interest", options: ["Equity participation", "Branded residence", "Strategic partnership", "General enquiry"] },
  { name: "ticket", label: "Indicative ticket size", options: ["Prefer not to say", "₹1–5 Cr", "₹5–25 Cr", "₹25 Cr+"] },
  { name: "message", label: "Message", textarea: true, full: true },
];

export default function Investment() {
  const inv = hospitalityPage.investment;
  return (
    <section
      id="invest"
      className="relative scroll-mt-24 overflow-hidden bg-[#06262f] py-28 md:py-36"
    >
      {/* faded island backdrop */}
      <Image
        src="/images/island-aerial2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06262f] via-[#06262f]/80 to-[#06262f]" />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-aqua/60"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 31) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <LeafCluster className="absolute -left-8 bottom-0 z-0 text-lagoon/10" />
      <LeafCluster flip className="absolute -right-8 top-2 z-0 text-aqua/10" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={inv.eyebrow} title={inv.title} intro={inv.body} align="center" />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-aqua/15 bg-aqua/10 md:grid-cols-4">
          {inv.stats.map((s) => (
            <div key={s.label} className="bg-[#06262f]/90 px-5 py-8 text-center">
              <div className="font-serif text-3xl text-aqua md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} format={s.suffix !== ""} />
              </div>
              <div className="mt-2 text-[0.72rem] uppercase leading-snug tracking-wider text-foam/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pin dark vars so this block is unaffected by the light/dark theme toggle */}
        <div
          className="mx-auto mt-16 grid max-w-5xl items-start gap-10 lg:grid-cols-2 [&_h3]:!text-foam [&_h4]:!text-foam"
          style={{
            "--color-panel":    "#11141d",
            "--color-silver":   "#c7ced6",
            "--color-mist":     "#99a1ae",
            "--ui-surface-xs":  "rgba(255,255,255,0.02)",
            "--ui-border":      "rgba(255,255,255,0.08)",
            "--ui-border-md":   "rgba(255,255,255,0.10)",
          } as React.CSSProperties}
        >
          <Reveal>
            <div>
              <h3 className="font-serif text-2xl text-foam md:text-3xl">Register your interest.</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-foam/70">
                Share a few details and our investment team will send the confidential
                deck and arrange a private walkthrough of the masterplan.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foam/80">
                {["Government-awarded under ANIIDCO", "Long concession periods up to 75 years", "Proven EPC builder with a 20-year record"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-aqua/70" />
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${company.email}?subject=Investment%20Enquiry%20%E2%80%94%20Andaman%20Resort`}
                className="mt-7 inline-block text-sm text-aqua underline-offset-4 hover:underline"
              >
                Or email us directly →
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              fields={INVESTOR_FIELDS}
              accent="lagoon"
              submitLabel="Request investor deck"
              successTitle="Thank you."
              successBody="Our investment team will reach out with the confidential deck shortly."
              endpoint={`${API_BASE}/contact-form-sheeraj-projects-investor`}
              mapPayload={(d) => ({
                name: d.name,
                email: d.email,
                phone: d.phone,
                company: d.company || undefined,
                areaOfInterest: d.interest || undefined,
                ticketSize: d.ticket || undefined,
                message: d.message || undefined,
              })}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
