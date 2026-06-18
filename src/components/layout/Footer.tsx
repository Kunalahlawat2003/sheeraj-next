import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { company, nav } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink pt-20">
      {/* watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[22vw] font-medium leading-none text-white/[0.018]"
      >
        SHEERAJ
      </div>

      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              {company.theme}
            </p>
            <p className="mt-6 text-sm text-silver/80">{company.email}</p>
            <p className="text-sm text-silver/80">{company.phone}</p>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-gold/80">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {nav
                .filter((n) => !n.children)
                .map((n) => (
                  <li key={n.label}>
                    <Link href={n.to ?? "#"} className="text-sm text-silver/75 transition-colors hover:text-gold">
                      {n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/erp" className="text-sm text-silver/75 transition-colors hover:text-gold">
                  ERP <span className="text-mist">· soon</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-gold/80">
              Divisions
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-silver/75">
              <li>Highways &amp; Expressways</li>
              <li>Canals &amp; Irrigation</li>
              <li>Government &amp; EPC</li>
              <li>Island Hospitality</li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-mist md:flex-row">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] text-gold/70">{company.motto.toUpperCase()}</p>
        </div>
      </div>
    </footer>
  );
}
