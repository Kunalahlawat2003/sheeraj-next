"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { AdminJob, Application } from "@/lib/adminApi";

/* ─── Animated count-up ───────────────────────────────────── */
function AnimatedNumber({ value, loading }: { value: number; loading: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (loading || !ref.current) return;
    const el = ref.current;
    const start = 0;
    const end = value;
    const dur = 900;
    const step = (end / dur) * 16;
    let cur = start;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, end);
      el.textContent = Math.round(cur).toString();
      if (cur >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value, loading]);
  return <span ref={ref}>{loading ? "—" : "0"}</span>;
}

/* ─── Stat card ───────────────────────────────────────────── */
function StatCard({
  label,
  value,
  loading,
  icon,
  accent,
  onClick,
  delay,
}: {
  label: string;
  value: number;
  loading: boolean;
  icon: React.ReactNode;
  accent: string;
  onClick?: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      {/* Accent hairline across the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {/* Corner accent bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}24, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}1f`, color: accent, boxShadow: `0 8px 24px -10px ${accent}80, inset 0 0 0 1px ${accent}33` }}
        >
          {icon}
        </div>
        {onClick && (
          <span className="text-xs text-mist opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100 -translate-x-1">
            View →
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <div className="text-3xl font-semibold tabular-nums text-silver">
          <AnimatedNumber value={value} loading={loading} />
        </div>
        <div className="mt-1 text-sm text-mist">{label}</div>
      </div>
    </motion.div>
  );
}

/* ─── Recent jobs row ─────────────────────────────────────── */
function RecentJobRow({ job, i }: { job: AdminJob; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
      className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-(--ui-surface-xs)"
    >
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{
          background: job.status ? "#22c55e" : "#9b98a8",
          boxShadow: job.status ? "0 0 0 3px rgba(34,197,94,0.16)" : "none",
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-silver">{job.title}</div>
        <div className="text-xs text-mist">{job.category} · {job.jobType}</div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider ${
          job.status ? "bg-green-500/10 text-green-400" : "bg-(--ui-surface-md) text-mist"
        }`}
      >
        {job.status ? "Active" : "Inactive"}
      </span>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function OverviewSection({
  jobs,
  applications,
  loading,
  onGoJobs,
  onGoApps,
}: {
  jobs: AdminJob[];
  applications: Application[];
  loading: boolean;
  onGoJobs: () => void;
  onGoApps: () => void;
}) {
  const activeJobs = jobs.filter((j) => j.status).length;
  const now = Date.now();
  const recentApps = applications.filter((a) => {
    const d = new Date(a.submittedOn ?? a.createdAt ?? 0).getTime();
    return now - d < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 6);

  const stats = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
      accent: "#d4af37",
      onClick: onGoJobs,
    },
    {
      label: "Active Listings",
      value: activeJobs,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      accent: "#22c55e",
      onClick: onGoJobs,
    },
    {
      label: "Total Applications",
      value: applications.length,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      accent: "#60a5fa",
      onClick: onGoApps,
    },
    {
      label: "Applications This Week",
      value: recentApps,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      accent: "#a78bfa",
      onClick: onGoApps,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero banner with home-page video background */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-(--ui-border)"
      >
        {/* Background video (same clip as the public home hero) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/homeHero2.mp4" type="video/mp4" />
        </video>

        {/* Dark sheet for legibility + gold vignette */}
        <div className="absolute inset-0 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 120% at 100% 0%, rgba(212,175,55,0.22), transparent 55%)",
          }}
        />
        {/* Bottom scrim for grounding */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
        />

        {/* Content */}
        <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow text-gold">Admin Portal · Careers</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              Live
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl"
          >
            Welcome back to{" "}
            <span className="text-gold-gradient italic">Sheeraj Projects.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
          >
            Manage job listings and review applications from one place. Here&apos;s a
            summary of your portal activity.
          </motion.p>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            loading={loading}
            icon={s.icon}
            accent={s.accent}
            onClick={s.onClick}
            delay={0.1 + i * 0.07}
          />
        ))}
      </div>

      {/* Recent jobs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="glass relative overflow-hidden rounded-2xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
        />
        <div className="flex items-center justify-between border-b border-(--ui-border) px-6 py-4">
          <div>
            <div className="text-sm font-medium text-silver">Recent Job Listings</div>
            <div className="mt-0.5 text-xs text-mist">Latest posted positions</div>
          </div>
          <button
            onClick={onGoJobs}
            className="text-xs text-gold transition-colors hover:underline"
          >
            Manage all →
          </button>
        </div>
        <div className="divide-y divide-(--ui-border)">
          {loading ? (
            <div className="px-6 py-8 text-center text-sm text-mist">Loading…</div>
          ) : recentJobs.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-mist">No jobs posted yet.</div>
          ) : (
            <div className="px-2 py-2">
              {recentJobs.map((job, i) => (
                <RecentJobRow key={job.JobID} job={job} i={i} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
