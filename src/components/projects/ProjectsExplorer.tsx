"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, slugify, type ProjectStatus } from "@/data/site";

const STATUS_PILL: Record<ProjectStatus, { pill: string; dot: string }> = {
  Executed: { pill: "bg-lagoon/15 text-lagoon", dot: "bg-lagoon" },
  Ongoing: { pill: "bg-gold/15 text-accent-gold-strong", dot: "animate-pulse bg-gold" },
  Awarded: { pill: "bg-coral/15 text-coral", dot: "bg-coral" },
};

function StatusPill({ status }: { status: ProjectStatus }) {
  const s = STATUS_PILL[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export default function ProjectsExplorer() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              active === c
                ? "border-gold/60 bg-gold/10 text-accent-gold"
                : "[border-color:var(--ui-border)] text-mist hover:border-gold/40 hover:text-silver"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* grid */}
      <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/projects/${slugify(p.name)}`}
                data-cursor
                className="group relative block h-full overflow-hidden rounded-3xl border [border-color:var(--ui-border)] transition-all duration-500 hover:border-gold/45"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-transparent" />
                  <div className="pointer-events-none absolute inset-3 rounded-2xl ring-1 ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-accent-gold-strong">{p.category}</span>
                    <StatusPill status={p.status} />
                  </div>
                  <h3 className="mt-3 font-serif text-2xl tracking-tight">{p.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-mist">
                    <span>{p.location}</span>
                    <span className="h-1 w-1 rounded-full bg-mist/50" />
                    <span>{p.year}</span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm text-accent-gold-strong opacity-0 transition-all duration-500 group-hover:opacity-100">
                    View project →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
