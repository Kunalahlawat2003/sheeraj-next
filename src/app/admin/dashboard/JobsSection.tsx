"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ADMIN_API_BASE,
  authHeaders,
  type AdminJob,
  type JobFormData,
  JOB_CATEGORIES,
  WORKING_STATUSES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from "@/lib/adminApi";

/* ─── Types ───────────────────────────────────────────────── */
type FormState = JobFormData & { _id?: string };

const EMPTY: FormState = {
  title: "",
  description: "",
  category: "",
  workingStatus: "On-site",
  jobType: "Full-time",
  experienceRequired: "Fresher",
  Responsibilities: [""],
  Requirements: [""],
  status: true,
};

/* ─── Helpers ─────────────────────────────────────────────── */
function inputCls(err?: boolean) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm bg-(--ui-surface-xs) text-silver outline-none transition-colors placeholder:text-mist/35 focus:border-gold/60 ${
    err ? "border-red-500/50" : "border-(--ui-border)"
  }`;
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-xs text-mist">
      {children}
      {required && <span className="ml-0.5 text-gold">*</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls()} bg-(--ui-surface-xs)`}
      >
        {!options.includes(value as never) && value === "" && (
          <option value="" disabled className="bg-panel">Select…</option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="bg-panel">{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Dynamic list field ──────────────────────────────────── */
function ListField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  function update(i: number, v: string) {
    const next = [...items];
    next[i] = v;
    onChange(next);
  }
  function add() { onChange([...items, ""]); }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 overflow-hidden"
            >
              <input
                type="text"
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={`${label} ${i + 1}`}
                className={inputCls()}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={items.length === 1}
                className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl border border-(--ui-border) text-mist transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-30"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="14" y2="14" />
                  <line x1="14" y1="2" x2="2" y2="14" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 text-xs text-gold hover:underline"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
          Add item
        </button>
      </div>
    </div>
  );
}

/* ─── Job form panel (slide-over) ─────────────────────────── */
function JobPanel({
  form,
  setForm,
  onClose,
  onSave,
  saving,
  saveError,
  isEdit,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  saveError: string;
  isEdit: boolean;
}) {
  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-base/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-(--ui-border) bg-panel shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--ui-border) px-6 py-5">
          <div>
            <div className="eyebrow text-gold">{isEdit ? "Edit job" : "New job"}</div>
            <div className="mt-0.5 font-serif text-lg text-silver">
              {isEdit ? form.title || "Untitled" : "Create a listing"}
            </div>
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

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <Label required>Job Title</Label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className={inputCls(!form.title.trim())}
              />
            </div>

            {/* Description */}
            <div>
              <Label required>Description</Label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Brief description of the role…"
                className={`${inputCls(!form.description.trim())} resize-none`}
              />
            </div>

            {/* Category */}
            <div>
              <Label required>Category</Label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={`${inputCls(!form.category)} bg-(--ui-surface-xs)`}
              >
                <option value="" disabled className="bg-panel">Select category…</option>
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-panel">{c}</option>
                ))}
              </select>
            </div>

            {/* Job Type | Working Mode */}
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Job Type"
                value={form.jobType}
                onChange={(v) => set("jobType", v)}
                options={JOB_TYPES}
                required
              />
              <SelectField
                label="Working Mode"
                value={form.workingStatus}
                onChange={(v) => set("workingStatus", v)}
                options={WORKING_STATUSES}
                required
              />
            </div>

            {/* Experience */}
            <SelectField
              label="Experience Required"
              value={form.experienceRequired}
              onChange={(v) => set("experienceRequired", v)}
              options={EXPERIENCE_LEVELS}
              required
            />

            {/* Responsibilities */}
            <ListField
              label="Responsibilities"
              items={form.Responsibilities}
              onChange={(v) => set("Responsibilities", v)}
            />

            {/* Requirements */}
            <ListField
              label="Requirements"
              items={form.Requirements}
              onChange={(v) => set("Requirements", v)}
            />

            {/* Active toggle */}
            <div className="flex items-center justify-between rounded-xl border border-(--ui-border) px-4 py-3">
              <div>
                <div className="text-sm font-medium text-silver">Active listing</div>
                <div className="text-xs text-mist">Visible to applicants on the website</div>
              </div>
              <button
                type="button"
                onClick={() => set("status", !form.status)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  form.status ? "bg-gold" : "bg-(--ui-border)"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform ${
                    form.status ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {saveError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {saveError}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-(--ui-border) px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-(--ui-border) py-2.5 text-sm text-mist transition-colors hover:border-gold/30 hover:text-silver"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="btn btn-gold flex-1 disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {saving && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create job"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Job card ────────────────────────────────────────────── */
function JobCard({
  job,
  i,
  onEdit,
  onToggle,
}: {
  job: AdminJob;
  i: number;
  onEdit: () => void;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 rounded-2xl border border-(--ui-border) bg-(--ui-surface-xs) p-5 transition-all hover:border-gold/20 sm:flex-row sm:items-center"
    >
      <div
        className="mt-0.5 h-2 w-2 shrink-0 rounded-full sm:mt-0"
        style={{ background: job.status ? "#22c55e" : "#6a6776" }}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-silver">{job.title}</div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-gold">
            {job.category}
          </span>
          <span className="rounded-full bg-(--ui-surface-md) px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-mist">
            {job.jobType}
          </span>
          <span className="rounded-full bg-(--ui-surface-md) px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-mist">
            {job.workingStatus}
          </span>
          <span className="rounded-full bg-(--ui-surface-md) px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-mist">
            {job.experienceRequired}
          </span>
        </div>
        <div className="mt-1.5 text-xs text-mist">ID: {job.JobID}</div>
      </div>

      <span
        className={`shrink-0 self-start rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-wider sm:self-auto ${
          job.status ? "bg-green-500/10 text-green-400" : "bg-(--ui-surface-md) text-mist"
        }`}
      >
        {job.status ? "Active" : "Inactive"}
      </span>

      <div className="flex shrink-0 gap-2">
        <button
          onClick={onToggle}
          title={job.status ? "Deactivate" : "Activate"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--ui-border) text-mist transition-colors hover:border-gold/40 hover:text-gold"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18.36 6.64A9 9 0 1 1 5.64 5.64" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
        <button
          onClick={onEdit}
          title="Edit"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--ui-border) text-mist transition-colors hover:border-gold/40 hover:text-gold"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Jobs Section ────────────────────────────────────────── */
export default function JobsSection({
  jobs,
  setJobs,
  onUnauth,
}: {
  jobs: AdminJob[];
  setJobs: React.Dispatch<React.SetStateAction<AdminJob[]>>;
  onUnauth: () => void;
}) {
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editJob, setEditJob] = useState<AdminJob | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const filtered = jobs.filter((j) => {
    return (
      filterStatus === "all" ||
      (filterStatus === "active" && j.status) ||
      (filterStatus === "inactive" && !j.status)
    );
  });

  function openCreate() {
    setEditJob(null);
    setForm(EMPTY);
    setSaveError("");
    setPanelOpen(true);
  }

  function openEdit(job: AdminJob) {
    setEditJob(job);
    setForm({
      title: job.title,
      description: job.description,
      category: job.category,
      workingStatus: job.workingStatus,
      jobType: job.jobType,
      experienceRequired: job.experienceRequired,
      Responsibilities: job.Responsibilities.length ? [...job.Responsibilities] : [""],
      Requirements: job.Requirements.length ? [...job.Requirements] : [""],
      status: job.status,
    });
    setSaveError("");
    setPanelOpen(true);
  }

  const handleSave = useCallback(async () => {
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      setSaveError("Title, description, and category are required.");
      return;
    }
    setSaving(true);
    setSaveError("");
    const payload = {
      ...form,
      Responsibilities: form.Responsibilities.filter(Boolean),
      Requirements: form.Requirements.filter(Boolean),
    };

    try {
      if (editJob) {
        // Update: PUT /sheeraj-projects/job/:JobID
        const res = await fetch(`${ADMIN_API_BASE}/sheeraj-projects/job/${editJob.JobID}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
        if (res.status === 403) { onUnauth(); return; }
        const d = (await res.json()) as { success?: boolean; message?: string; data?: AdminJob };
        if (!res.ok) throw new Error(d.message ?? `Error ${res.status}`);
        // Prefer the server's returned object; fall back to local merge.
        const updated = d.data ?? { ...editJob, ...payload };
        setJobs((prev) => prev.map((j) => (j.JobID === editJob.JobID ? updated : j)));
      } else {
        // Create: POST /sheeraj-projects/job — returns { message, JobID }
        const res = await fetch(`${ADMIN_API_BASE}/sheeraj-projects/job`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
        if (res.status === 403) { onUnauth(); return; }
        const d = (await res.json()) as { success?: boolean; message?: string; data?: AdminJob };
        if (!res.ok) throw new Error(d.message ?? `Error ${res.status}`);
        // Prefer the server's returned object (includes the generated JobID).
        const newJob: AdminJob = d.data ?? {
          JobID: `SPL-?`,
          ...payload,
        };
        setJobs((prev) => [newJob, ...prev]);
      }
      setPanelOpen(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [form, editJob, setJobs, onUnauth]);

  async function handleToggle(job: AdminJob) {
    const newStatus = !job.status;
    // Optimistic update
    setJobs((prev) => prev.map((j) => (j.JobID === job.JobID ? { ...j, status: newStatus } : j)));
    try {
      // PUT requires ALL fields — it replaces the full document
      const res = await fetch(`${ADMIN_API_BASE}/sheeraj-projects/job/${job.JobID}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ ...job, status: newStatus }),
      });
      if (res.status === 403) { onUnauth(); return; }
      if (!res.ok) {
        // Roll back on failure
        setJobs((prev) => prev.map((j) => (j.JobID === job.JobID ? { ...j, status: job.status } : j)));
      }
    } catch {
      setJobs((prev) => prev.map((j) => (j.JobID === job.JobID ? { ...j, status: job.status } : j)));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-serif text-2xl text-silver">Job Listings</h1>
          <p className="mt-1 text-sm text-mist">
            {jobs.length} total · {jobs.filter((j) => j.status).length} active
          </p>
        </div>
        <button onClick={openCreate} className="btn btn-gold self-start sm:self-auto">
          <span className="relative z-10 flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="14" />
              <line x1="2" y1="8" x2="14" y2="8" />
            </svg>
            New Job
          </span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        <div className="flex gap-1 rounded-xl border border-(--ui-border) p-1">
          {(["all", "active", "inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                filterStatus === s ? "bg-gold/15 text-gold" : "text-mist hover:text-silver"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-(--ui-border) p-12 text-center text-sm text-mist"
            >
              No jobs match the current filter.
            </motion.div>
          ) : (
            filtered.map((job, i) => (
              <JobCard
                key={job.JobID}
                job={job}
                i={i}
                onEdit={() => openEdit(job)}
                onToggle={() => handleToggle(job)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {panelOpen && (
          <JobPanel
            form={form}
            setForm={setForm}
            onClose={() => setPanelOpen(false)}
            onSave={handleSave}
            saving={saving}
            saveError={saveError}
            isEdit={!!editJob}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
