import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "ERP",
  description: "The Sheeraj Projects ERP portal is coming soon.",
};

export default function ErpPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 40%, #000, transparent 70%)",
        }}
      />
      <div className="relative text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <span className="eyebrow mt-7 justify-center sm:mt-10">Internal Portal</span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:mt-5 sm:text-5xl md:text-6xl">
          ERP is <span className="text-gold-gradient italic">coming soon.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist sm:mt-6">
          Our project-controls and resource-planning portal is being built. Check
          back shortly — or reach the team in the meantime.
        </p>
        <Link
          href="/"
          className="btn btn-ghost mt-7 inline-flex sm:mt-10"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
