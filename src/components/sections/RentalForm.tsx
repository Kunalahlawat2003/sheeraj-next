"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { machinery } from "@/data/site";

type Form = {
  machinery: string;
  model: string;
  quantity: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = {
  machinery: machinery[0].items[0],
  model: "",
  quantity: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  textarea,
  required,
  maxLength,
}: {
  label: string;
  name: keyof Form;
  value: string;
  onChange: (k: keyof Form, v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  maxLength?: number;
}) {
  const base =
    "peer w-full rounded-xl border [background-color:var(--ui-surface-xs)] px-4 pt-6 pb-2 text-sm text-silver outline-none transition-all placeholder-transparent focus:[background-color:var(--ui-surface-sm)]";
  const ring = error
    ? "border-red-500/60 focus:border-red-400"
    : "[border-color:var(--ui-border-md)] focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]";

  const handleChange = (raw: string) => {
    if (type === "tel") {
      const digits = raw.replace(/\D/g, "");
      onChange(name, maxLength ? digits.slice(0, maxLength) : digits);
    } else {
      onChange(name, raw);
    }
  };

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`${base} ${ring} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={label}
          value={value}
          maxLength={maxLength}
          onChange={(e) => handleChange(e.target.value)}
          className={`${base} ${ring}`}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-[0.7rem] uppercase tracking-wider text-mist transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold"
      >
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 pl-1 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function RentalFormInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const update = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.email.trim()) e.email = "An email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That email doesn't look right.";
    if (!form.phone.trim()) e.phone = "A phone number is required.";
    else if (form.phone.length < 10) e.phone = "Enter a valid 10-digit number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: { preventDefault(): void }) => {
    ev.preventDefault();
    if (!validate() || !executeRecaptcha) return;

    setLoading(true);
    setApiError(null);

    try {
      const recaptchaToken = await executeRecaptcha("machinery_inquiry");

      const res = await fetch("/api/machinery-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machinery: form.machinery,
          model: form.model || undefined,
          quantity: form.quantity ? parseInt(form.quantity, 10) : undefined,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || undefined,
          message: form.message || undefined,
          recaptchaToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Something went wrong.");
      }

      setSent(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rental" className="relative scroll-mt-24 py-20 sm:py-24 md:py-28 lg:py-36">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="eyebrow">Plant &amp; Machinery</span>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Rent from India&apos;s most{" "}
            <span className="text-gold-gradient italic">capable fleet.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
            Excavators, cranes, pavers, batching plants and more — operator-ready
            and site-tested. Tell us what you need and we&apos;ll get back within
            one business day.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-silver/80">
            {["Operator + maintenance included", "Flexible short & long term", "Pan-India mobilisation"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-gold/60" />
                  {t}
                </li>
              )
            )}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-7 md:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <motion.svg
                    viewBox="0 0 52 52"
                    className="h-20 w-20"
                    initial="hidden"
                    animate="show"
                  >
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="2"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M16 27l7 7 13-14"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    />
                  </motion.svg>
                  <h3 className="mt-6 font-serif text-2xl">Request received.</h3>
                  <p className="mt-3 max-w-xs text-sm text-mist">
                    Thank you, {form.name.split(" ")[0] || "there"}. Our plant team
                    will reach out about the {form.machinery.toLowerCase()} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setForm(empty);
                      setSent(false);
                    }}
                    className="mt-7 text-sm text-accent-gold-strong underline-offset-4 hover:underline"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block pl-1 text-[0.7rem] uppercase tracking-wider text-accent-gold-strong">
                      Machinery
                    </label>
                    <div className="relative">
                      <select
                        value={form.machinery}
                        onChange={(e) => update("machinery", e.target.value)}
                        className="w-full appearance-none rounded-xl border border-(--ui-border-md) bg-(--ui-surface-xs) px-4 py-3.5 pr-10 text-sm text-silver outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]"
                      >
                        {machinery.map(({ group, items }) => (
                          <optgroup key={group} label={group}>
                            {items.map((m) => (
                              <option key={m} value={m} className="bg-ink">
                                {m}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/70">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <Field label="Model / Spec" name="model" value={form.model} onChange={update} />
                  <Field label="Quantity" name="quantity" type="number" value={form.quantity} onChange={update} />
                  <Field label="Company" name="company" value={form.company} onChange={update} />
                  <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} required />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} required maxLength={10} />
                  <div className="sm:col-span-2">
                    <Field label="Message" name="message" value={form.message} onChange={update} textarea />
                  </div>

                  <AnimatePresence>
                    {apiError && (
                      <motion.p
                        key="api-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:col-span-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
                      >
                        {apiError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="sm:col-span-2 mt-2">
                    <MagneticButton
                      type="submit"
                      className="w-full justify-center"
                      disabled={loading}
                    >
                      {loading ? "Sending…" : "Request a quote"}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function RentalForm() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      <RentalFormInner />
    </GoogleReCaptchaProvider>
  );
}
