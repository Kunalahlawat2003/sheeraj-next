"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Application, AdminJob } from "@/lib/adminApi";

/* ─── Detail drawer ───────────────────────────────────────── */
function DetailDrawer({
  app,
  jobTitle,
  onClose,
}: {
  app: Application;
  jobTitle: string;
  onClose: () => void;
}) {
  const employed =
    typeof app.employed === "boolean"
      ? app.employed ? "Currently employed" : "Not employed"
      : (app.employed === "yes" || app.employed === "true") ? "Currently employed" : "Not employed";

  const formatCTC = (v?: number | string) => {
    if (v === undefined || v === null || v === "") return undefined;
    const s = String(v);
    // Value may already be formatted (e.g. "8 LPA") or a bare number.
    return /lpa|₹|lakh/i.test(s) ? s : `₹${s} LPA`;
  };

  const rows: [string, string | undefined][] = [
    ["Email", app.email],
    ["Phone", String(app.phone)],
    ["Location", [app.city, app.state, app.country].filter(Boolean).join(", ")],
    ["Date of Birth", app.DOB ? new Date(app.DOB).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : undefined],
    ["Education", app.highestQualification],
    ["Employment", employed],
    ["Notice Period", app.notice_period],
    ["Current CTC", formatCTC(app.current_ctc)],
    ["Expected CTC", formatCTC(app.expected_ctc)],
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-base/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-(--ui-border) bg-panel shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-(--ui-border) px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="eyebrow text-gold">Application</div>
              <div className="mt-0.5 font-serif text-lg text-silver">{app.name}</div>
              <div className="mt-1 text-sm text-mist">Applied for: {jobTitle}</div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-(--ui-border) text-mist transition-colors hover:border-gold/40 hover:text-gold"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-3.5">
            {rows.map(([label, value]) =>
              value ? (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-36 shrink-0 pt-px text-xs text-mist">{label}</div>
                  <div className="text-sm text-silver">{value}</div>
                </div>
              ) : null
            )}

            {/* Application ID */}
            {app._id && (
              <div className="flex items-start gap-3">
                <div className="w-36 shrink-0 pt-px text-xs text-mist">Application ID</div>
                <div className="break-all font-mono text-xs text-mist/60">{app._id}</div>
              </div>
            )}

            {/* Submitted on */}
            <div className="flex items-start gap-3">
              <div className="w-36 shrink-0 pt-px text-xs text-mist">Submitted on</div>
              <div className="text-sm text-silver">
                {new Date(app.submittedOn ?? app.createdAt ?? "").toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Resume link */}
          {app.resume && (
            <a
              href={app.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm text-gold transition-colors hover:bg-gold/15"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
              </svg>
              View Resume (PDF)
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
}

/* ─── Application card ────────────────────────────────────── */
function AppCard({
  app,
  jobTitle,
  i,
  onClick,
}: {
  app: Application;
  jobTitle: string;
  i: number;
  onClick: () => void;
}) {
  const date = new Date(app.submittedOn ?? app.createdAt ?? "").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.035, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-(--ui-border) bg-(--ui-surface-xs) p-5 text-left transition-all duration-200 hover:border-gold/25 hover:shadow-md"
    >
      {/* Avatar initials */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase"
        style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}
      >
        {app.name.charAt(0)}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-silver">{app.name}</div>
        <div className="mt-0.5 truncate text-sm text-mist">
          {app.email}
          {app.city ? ` · ${app.city}, ${app.country ?? ""}` : ""}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-gold">
            {jobTitle}
          </span>
          <span className="rounded-full bg-(--ui-surface-md) px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-mist">
            {app.highestQualification}
          </span>
          {app.resume && (
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-green-400">
              Resume ✓
            </span>
          )}
        </div>
      </div>

      {/* Date + arrow */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs text-mist">{date}</span>
        <span className="translate-x-1 text-gold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">→</span>
      </div>
    </motion.button>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function ApplicationsSection({
  applications,
  jobs,
  loading,
}: {
  applications: Application[];
  jobs: AdminJob[];
  loading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);

  // Map JobID → title for display (use jobTitle from response if available)
  const jobMap = Object.fromEntries(jobs.map((j) => [j.JobID, j.title]));

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      String(a.phone).includes(q) ||
      (a.city ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-2xl text-silver">Job Applications</h1>
        <p className="mt-1 text-sm text-mist">
          {applications.length} total application{applications.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or city…"
            className="w-full rounded-xl border border-(--ui-border) bg-(--ui-surface-xs) py-2.5 pl-10 pr-4 text-sm text-silver outline-none transition-colors placeholder:text-mist/35 focus:border-gold/50"
          />
        </div>
      </motion.div>

      <div className="text-xs text-mist">
        Showing {filtered.length} of {applications.length}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="rounded-2xl border border-(--ui-border) p-12 text-center text-sm text-mist">
          Loading applications…
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-(--ui-border) p-12 text-center text-sm text-mist"
        >
          {applications.length === 0
            ? "No applications received yet."
            : "No applications match the current filter."}
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((app, i) => {
              const key = app._id ?? String(i);
              const resolvedTitle = app.jobTitle ?? jobMap[app.jobId] ?? app.jobId;
              return (
                <AppCard
                  key={key}
                  app={app}
                  jobTitle={resolvedTitle}
                  i={i}
                  onClick={() => setSelected(app)}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <DetailDrawer
            app={selected}
            jobTitle={selected.jobTitle ?? jobMap[selected.jobId] ?? selected.jobId}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
