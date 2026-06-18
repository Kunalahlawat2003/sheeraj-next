"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { machinery } from "@/data/site";

type Form = {
  machinery: string;
  model: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = {
  machinery: machinery[0],
  model: "",
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
}: {
  label: string;
  name: keyof Form;
  value: string;
  onChange: (k: keyof Form, v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "peer w-full rounded-xl border bg-white/[0.03] px-4 pt-6 pb-2 text-sm text-silver outline-none transition-all placeholder-transparent focus:bg-white/[0.05]";
  const ring = error
    ? "border-red-500/60 focus:border-red-400"
    : "border-white/10 focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${base} ${ring} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${base} ${ring}`}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-[0.7rem] uppercase tracking-wider text-mist transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold"
      >
        {label}
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

export default function RentalForm() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <section id="rental" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="eyebrow">Plant &amp; Machinery</span>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
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
          <div className="glass relative overflow-hidden rounded-3xl p-7 md:p-9">
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
                    className="mt-7 text-sm text-gold underline-offset-4 hover:underline"
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
                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block pl-1 text-[0.7rem] uppercase tracking-wider text-gold">
                      Machinery
                    </label>
                    <select
                      value={form.machinery}
                      onChange={(e) => update("machinery", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-silver outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]"
                    >
                      {machinery.map((m) => (
                        <option key={m} value={m} className="bg-ink">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field label="Model / Spec" name="model" value={form.model} onChange={update} />
                  <Field label="Company" name="company" value={form.company} onChange={update} />
                  <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} />
                  <div className="sm:col-span-2">
                    <Field label="Message" name="message" value={form.message} onChange={update} textarea />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <MagneticButton type="submit" className="w-full justify-center">
                      Request a quote
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
