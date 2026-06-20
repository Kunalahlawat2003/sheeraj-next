"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAREER_API_BASE } from "@/lib/careerApi";

const EDUCATION_OPTIONS = [
  "High School / 12th",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Other",
];

const NOTICE_OPTIONS = [
  "Immediately available",
  "15 days",
  "30 days",
  "45 days",
  "60 days",
  "90 days",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  country: string;
  DOB: string;
  highestQualification: string;
  employed: boolean;
  notice_period: string;
  current_ctc: string;
  expected_ctc: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  country: "",
  DOB: "",
  highestQualification: "",
  employed: false,
  notice_period: "",
  current_ctc: "",
  expected_ctc: "",
};

type Errors = Partial<Record<keyof FormState | "resume", string>>;

const inputCls = (err?: string) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm bg-(--ui-surface-xs) text-silver outline-none transition-colors placeholder:text-mist/40 focus:border-gold ${
    err ? "border-red-500/60" : "border-(--ui-border)"
  }`;

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1 block text-xs text-mist">
      {children}
      {required && <span className="ml-0.5 text-gold">*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden text-xs text-red-400"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ApplyModal({
  jobTitle,
  jobId,
}: {
  jobTitle: string;
  jobId: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{7,15}$/.test(form.phone))
      e.phone = "Valid phone number required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.DOB) e.DOB = "Required";
    if (!form.highestQualification) e.highestQualification = "Required";
    if (!resume) e.resume = "Please upload your resume (PDF)";
    else if (resume.type !== "application/pdf") e.resume = "Only PDF files are accepted";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("country", form.country);
      fd.append("state", form.state);
      fd.append("city", form.city);
      fd.append("DOB", form.DOB);
      fd.append("highestQualification", form.highestQualification);
      fd.append("jobId", jobId);
      fd.append("resume", resume!);
      fd.append("employed", form.employed ? "yes" : "no");
      if (form.notice_period) fd.append("notice_period", form.notice_period);
      if (form.current_ctc) fd.append("current_ctc", form.current_ctc);
      if (form.expected_ctc) fd.append("expected_ctc", form.expected_ctc);

      const res = await fetch(`${CAREER_API_BASE}/sheeraj-projects/apply`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { message?: string }).message ?? `Error ${res.status}`);
      }
      setSent(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setSent(false);
    setForm(EMPTY);
    setResume(null);
    setErrors({});
    setApiError("");
    setOpen(true);
  }

  return (
    <>
      <button onClick={handleOpen} className="btn btn-gold w-full">
        <span className="relative z-10">Apply for this role</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-base/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-(--ui-surface-xs) p-6 shadow-2xl"
            >
              {/* header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">
                    Apply now
                  </div>
                  <div className="mt-1 font-serif text-xl">{jobTitle}</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--ui-border-md) text-mist transition-colors hover:border-gold/60 hover:text-gold"
                >
                  ✕
                </button>
              </div>

              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <svg
                    className="h-14 w-14 text-gold"
                    viewBox="0 0 52 52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="26" cy="26" r="24" />
                    <path d="M14 27l8 8 16-17" />
                  </svg>
                  <p className="mt-5 font-serif text-xl">Application received.</p>
                  <p className="mt-2 text-sm text-mist">
                    Thank you for applying — we&apos;ll review and reach out if there&apos;s a match.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 text-sm text-gold hover:underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  {/* Row 1: Name | Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label required>Name</Label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputCls(errors.name)}
                      />
                      <FieldError msg={errors.name} />
                    </div>
                    <div>
                      <Label required>Phone</Label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => { if (/^\d*$/.test(e.target.value)) set("phone", e.target.value); }}
                        placeholder="10-digit mobile"
                        className={inputCls(errors.phone)}
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                  </div>

                  {/* Row 2: Email | Resume */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label required>Email</Label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputCls(errors.email)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div>
                      <Label required>Resume (PDF only)</Label>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          setResume(e.target.files?.[0] ?? null);
                          setErrors((prev) => ({ ...prev, resume: undefined }));
                        }}
                        className={`w-full rounded-xl border px-3 py-2 text-sm bg-(--ui-surface-xs) text-silver outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-gold/10 file:px-3 file:py-1 file:text-xs file:text-gold transition-colors hover:border-gold/40 ${
                          errors.resume ? "border-red-500/60" : "border-(--ui-border)"
                        }`}
                      />
                      <FieldError msg={errors.resume} />
                    </div>
                  </div>

                  {/* Row 3: State | City | Country */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label required>State</Label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        className={inputCls(errors.state)}
                      />
                      <FieldError msg={errors.state} />
                    </div>
                    <div>
                      <Label required>City</Label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        className={inputCls(errors.city)}
                      />
                      <FieldError msg={errors.city} />
                    </div>
                    <div>
                      <Label required>Country</Label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => set("country", e.target.value)}
                        className={inputCls(errors.country)}
                      />
                      <FieldError msg={errors.country} />
                    </div>
                  </div>

                  {/* Row 4: Date of Birth | Highest Education */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label required>Date of Birth</Label>
                      <input
                        type="date"
                        value={form.DOB}
                        onChange={(e) => set("DOB", e.target.value)}
                        className={inputCls(errors.DOB)}
                      />
                      <FieldError msg={errors.DOB} />
                    </div>
                    <div>
                      <Label required>Highest Education</Label>
                      <select
                        value={form.highestQualification}
                        onChange={(e) => set("highestQualification", e.target.value)}
                        className={`${inputCls(errors.highestQualification)} bg-(--ui-surface-xs)`}
                      >
                        <option value="">Select</option>
                        {EDUCATION_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <FieldError msg={errors.highestQualification} />
                    </div>
                  </div>

                  {/* Row 5: Employed checkbox */}
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.employed}
                      onChange={(e) => set("employed", e.target.checked)}
                      className="h-4 w-4 accent-gold rounded"
                    />
                    <span className="text-sm text-silver">Are you currently employed?</span>
                  </label>

                  {/* Row 6: Notice Period | Current CTC | Expected CTC — only when employed */}
                  <AnimatePresence>
                    {form.employed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <Label>Notice Period</Label>
                            <select
                              value={form.notice_period}
                              onChange={(e) => set("notice_period", e.target.value)}
                              className={`${inputCls()} bg-(--ui-surface-xs)`}
                            >
                              <option value="">Select</option>
                              {NOTICE_OPTIONS.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label>Current CTC (in INR)</Label>
                            <input
                              type="number"
                              value={form.current_ctc}
                              onChange={(e) => set("current_ctc", e.target.value)}
                              placeholder="e.g. 600000"
                              className={inputCls()}
                            />
                          </div>
                          <div>
                            <Label>Expected CTC (in INR)</Label>
                            <input
                              type="number"
                              value={form.expected_ctc}
                              onChange={(e) => set("expected_ctc", e.target.value)}
                              placeholder="e.g. 800000"
                              className={inputCls()}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {apiError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {apiError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold w-full disabled:opacity-60"
                  >
                    <span className="relative z-10">
                      {loading ? "Submitting…" : "Submit application"}
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
