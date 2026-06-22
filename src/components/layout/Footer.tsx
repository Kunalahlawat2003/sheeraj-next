"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { scrollToTarget } from "@/components/providers/SmoothScroll";
import { company } from "@/data/site";

const quickLinks = [
  { label: "Home", to: "/#top" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Andaman Projects", to: "/hospitality" },
  { label: "Rental Services", to: "/#rental" },
  { label: "Partners", to: "/#partners" },
  { label: "Contact Us", to: "/contact" },
];

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.42 8.85 3.42 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-2.94a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
  ),
  youtube: (
    <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
  ),
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34v7.03C18.34 21.24 22 17.08 22 12.06Z" />
  ),
  linkedin: (
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.48h3.27V21H3.3V8.48Zm5.34 0h3.13v1.71h.05c.44-.83 1.5-1.71 3.08-1.71 3.3 0 3.91 2.17 3.91 4.99V21h-3.27v-5.93c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V21H8.64V8.48Z" />
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  // On the home page, intercept the in-page anchors and smooth-scroll up from
  // the footer to the section instead of jumping. From any other page, let the
  // Link navigate to home (the hash takes it to the section on arrival).
  const handleQuickLink = (e: React.MouseEvent, to: string) => {
    if (to.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      scrollToTarget(to);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t [border-color:var(--ui-border)] bg-ink pt-20">
      <div className="container-x relative">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* brand + socials */}
          <div className="flex items-center gap-5">
            <Logo
              variant="seal"
              size={160}
              className="h-20 w-20 shrink-0 md:h-32 md:w-32"
            />
            <div>
              <h3 className="max-w-xs font-brand text-2xl font-medium leading-tight tracking-wide text-accent-gold md:text-3xl">
                {company.legalName.toUpperCase()}
              </h3>
              <div className="mt-6 flex gap-3">
              {Object.entries(company.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  aria-label={key}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border [border-color:var(--ui-border-md)] text-mist transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                    {socialIcons[key]}
                  </svg>
                </a>
              ))}
              </div>
            </div>
          </div>

          {/* right group: quick links + contact, centered */}
          <div className="flex flex-col gap-12 text-center sm:flex-row sm:justify-center sm:gap-16 lg:gap-20">
          {/* quick links */}
          <div>
            <h4 className="font-serif text-xl tracking-wide text-accent-gold">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    onClick={(e) => handleQuickLink(e, l.to)}
                    className="text-sm text-silver/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-serif text-xl tracking-wide text-accent-gold">Contact Us</h4>
            <ul className="mx-auto mt-5 flex max-w-xs flex-col items-center gap-3 text-left text-sm text-silver/75">
              <li className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <span>Address: {company.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold">
                  <path d="M6.62 10.79a15.5 15.5 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
                </svg>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-gold">
                  Phone: {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold">
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7L4.5 6.5h15L12 11Zm0 2.2L4 8.2V18h16V8.2l-8 5Z" />
                </svg>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-gold">
                  Email: {company.email}
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="flex flex-col items-center gap-2 py-8 text-center text-xs text-mist">
          <p>
            © {company.legalName} {year}. All Rights Reserved.
          </p>
          <p>
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-accent-gold transition-colors hover:text-gold"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="text-accent-gold transition-colors hover:text-gold"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
