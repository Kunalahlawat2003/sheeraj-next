import type { Metadata, Viewport } from "next";
import { Inter, Sora, Fraunces, Cinzel } from "next/font/google";
import "./globals.css";

import SiteChrome from "@/components/layout/SiteChrome";
import { company } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${company.domain}`),
  title: {
    default: `${company.legalName} — Infrastructure & Island Hospitality`,
    template: `%s · ${company.name}`,
  },
  description: company.theme,
  openGraph: {
    title: company.legalName,
    description: company.theme,
    type: "website",
  },
  // Favicon is provided by the App Router file convention: src/app/icon.png (logo1).
};

// The iOS status-bar / Dynamic Island colour:
//   - We ship a STATIC theme-color (the light navbar panel) here so it is present in
//     the server-rendered HTML from the first byte. In-app browsers (Google/Chrome
//     webviews) read theme-color at initial load and, when it is absent, fall back to
//     sampling the page's top pixels — which on the home route is the hero sky, giving
//     a mismatched blue-grey status bar. A static value fixes that on first paint.
//   - The boot script below then UPGRADES it to the dark panel for dark-mode visitors
//     (our dark mode is class-based, not prefers-color-scheme, so it can't be a static
//     media-query array). Worst case in a webview that ignores the late JS, a dark-mode
//     user sees the light panel — a minor tint mismatch, far better than the hero sky.
//
// We deliberately do NOT set viewportFit: "cover". With the default fit, iOS keeps the
// layout viewport below the safe area (Dynamic Island / notch), so the fixed navbar sits
// beneath the island instead of riding up underneath it. This mirrors the plain behaviour
// of the reference site and avoids WebKit's safe-area + backdrop-filter bug.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#e9e4d9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${fraunces.variable} ${cinzel.variable}`}
    >
      {/* Apply the persisted theme AND paint the iOS Dynamic Island / status-bar
          meta to the matching navbar panel colour — both before first paint, so
          neither flashes. Hexes mirror --color-panel in globals.css (light/dark). */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem('theme')==='dark';if(d)document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.setAttribute('name','theme-color');document.head.appendChild(m);}m.setAttribute('content',d?'#11141d':'#e9e4d9');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="grain min-h-dvh antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
