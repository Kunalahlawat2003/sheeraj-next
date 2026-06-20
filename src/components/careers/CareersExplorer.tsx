"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAREER_API_BASE, type Job } from "@/lib/careerApi";

function Helmet({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21a12 12 0 0 1 24 0" />
      <path d="M16 9v6M11 10v5M21 10v5" />
      <path d="M3 21h26v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

export default function CareersExplorer() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All");

  useEffect(() => {
    fetch(`${CAREER_API_BASE}/sheeraj-projects/job`)
      .then((r) => r.json())
      .then((d) => setJobs((d.data ?? []).filter((j: Job) => j.status)))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.category)))];
  const types = ["All", ...Array.from(new Set(jobs.map((j) => j.workingStatus)))];

  const filtered = jobs.filter(
    (j) => (dept === "All" || j.category === dept) && (type === "All" || j.workingStatus === type)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-mist">
        Loading open roles…
      </div>
    );
  }

  return (
    <div>
      {/* filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                dept === d
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-(--ui-border) text-mist hover:border-gold/40 hover:text-silver"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {types.length > 1 && (
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="ml-auto rounded-full border border-(--ui-border) bg-(--ui-surface-xs) px-4 py-2 text-xs text-silver outline-none focus:border-gold"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-panel">
                {t === "All" ? "All types" : t}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-6 text-sm text-mist">
        {filtered.length} open {filtered.length === 1 ? "role" : "roles"}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((j) => (
            <motion.div
              key={j.JobID}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <Link
                href={`/careers/${j.JobID}`}
                data-cursor
                className="group relative block h-full overflow-hidden rounded-2xl border border-(--ui-border) bg-(--ui-surface-xs) p-7 transition-all duration-500 hover:border-gold/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(212,175,55,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.4) 1px,transparent 1px)",
                    backgroundSize: "26px 26px",
                    maskImage: "radial-gradient(circle at 85% 0%, #000, transparent 70%)",
                    opacity: 0.08,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="text-gold">
                    <Helmet />
                  </span>
                  <span className="translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
                <h3 className="relative mt-5 font-serif text-2xl tracking-tight">{j.title}</h3>
                <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-mist">{j.description}</p>
                <div className="relative mt-4 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-wider">
                  <span className="rounded-full bg-gold/10 px-2.5 py-1 text-gold">{j.category}</span>
                  <span className="rounded-full bg-(--ui-surface-md) px-2.5 py-1 text-mist">{j.jobType}</span>
                  <span className="rounded-full bg-(--ui-surface-md) px-2.5 py-1 text-mist">{j.workingStatus}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-(--ui-border) p-12 text-center text-mist">
          No roles match these filters right now — try a different department.
        </div>
      )}
    </div>
  );
}
