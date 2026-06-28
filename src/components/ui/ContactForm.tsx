"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import MagneticButton from "./MagneticButton";

export type FieldDef = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
  full?: boolean;
  freeText?: boolean;
  allowCustom?: boolean;
};

const DEFAULT_FIELDS: FieldDef[] = [
  { name: "name", label: "Your name", required: true },
  { name: "company", label: "Company / Organisation" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "message", label: "Message", textarea: true, full: true },
];

function CustomSelect({
  options,
  value,
  onChange,
  accentRing,
  accentText,
  allowCustom = false,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  accentRing: string;
  accentText: string;
  allowCustom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (isCustom) inputRef.current?.focus();
  }, [isCustom]);

  const selected = value || options[0];
  const containerCls = `flex w-full items-center rounded-xl border border-(--ui-border) bg-(--ui-surface-xs) transition-all ${accentRing}`;
  const chevron = (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );

  return (
    <div ref={ref} className="relative">
      {/* trigger — swaps between button and text input */}
      {isCustom ? (
        <div className={containerCls}>
          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. ₹10–15 Cr"
            value={customText}
            onChange={(e) => { setCustomText(e.target.value); onChange(e.target.value); }}
            className="flex-1 bg-transparent px-4 py-3.5 text-sm text-silver outline-none placeholder-silver/40"
          />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`flex shrink-0 items-center justify-center border-l border-(--ui-border) px-3 py-3.5 transition-transform duration-200 ${accentText} ${open ? "rotate-180" : ""}`}
          >
            {chevron}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${containerCls} justify-between px-4 py-3.5 text-sm text-silver`}
        >
          <span>{selected}</span>
          <span className={`transition-transform duration-200 ${accentText} ${open ? "rotate-180" : ""}`}>
            {chevron}
          </span>
        </button>
      )}

      {/* dropdown panel — always in the tree so open state always works */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-(--ui-border-md) bg-(--color-panel,#11141d) py-1 shadow-2xl backdrop-blur-xl"
          >
            {options.map((o) => {
              const active = o === selected;
              return (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => { onChange(o); setIsCustom(false); setCustomText(""); setOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? `${accentText} bg-white/5`
                        : "text-silver hover:bg-white/4 hover:text-white"
                    }`}
                  >
                    {o}
                    {active && !isCustom && (
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8l4 4 6-7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
            {allowCustom && (
              <li>
                <button
                  type="button"
                  onClick={() => { setIsCustom(true); setOpen(false); }}
                  className={`flex w-full items-center gap-2 border-t border-(--ui-border) px-4 py-2.5 text-sm text-mist transition-colors hover:bg-white/4 hover:text-silver`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 2.5a1.5 1.5 0 0 1 2.12 2.12L5.5 12.24l-2.83.71.71-2.83L11 2.5Z" />
                  </svg>
                  Enter custom amount
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  def,
  value,
  onChange,
  error,
  accentRing,
  accentText,
}: {
  def: FieldDef;
  value: string;
  onChange: (k: string, v: string) => void;
  error?: string;
  accentRing: string;
  accentText: string;
}) {
  const base =
    "peer w-full rounded-xl border [background-color:var(--ui-surface-xs)] px-4 pt-6 pb-2 text-sm text-silver outline-none transition-all placeholder-transparent";
  const ring = error
    ? "border-red-500/60 focus:border-red-400"
    : `[border-color:var(--ui-border)] ${accentRing}`;

  if (def.options) {
    if (def.freeText) {
      const listId = `${def.name}-list`;
      return (
        <div className={def.full ? "sm:col-span-2" : ""}>
          <label className={`mb-1.5 block pl-1 text-[0.7rem] uppercase tracking-wider ${accentText}`}>
            {def.label}
          </label>
          <input
            list={listId}
            type="text"
            placeholder="Type or choose a range…"
            value={value}
            onChange={(e) => onChange(def.name, e.target.value)}
            className={`w-full rounded-xl border border-(--ui-border) bg-(--ui-surface-xs) px-4 py-3.5 text-sm text-silver outline-none transition-all placeholder-silver/40 ${accentRing}`}
          />
          <datalist id={listId}>
            {def.options.map((o) => <option key={o} value={o} />)}
          </datalist>
        </div>
      );
    }
    return (
      <div className={def.full ? "sm:col-span-2" : ""}>
        <label className={`mb-1.5 block pl-1 text-[0.7rem] uppercase tracking-wider ${accentText}`}>
          {def.label}
        </label>
        <CustomSelect
          options={def.options}
          value={value}
          onChange={(v) => onChange(def.name, v)}
          accentRing={accentRing}
          accentText={accentText}
          allowCustom={def.allowCustom}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${def.full ? "sm:col-span-2" : ""}`}>
      {def.textarea ? (
        <textarea
          id={def.name}
          rows={4}
          placeholder={def.label}
          value={value}
          onChange={(e) => onChange(def.name, e.target.value)}
          className={`${base} ${ring} resize-none`}
        />
      ) : (
        <input
          id={def.name}
          type={def.type ?? "text"}
          placeholder={def.label}
          value={value}
          onChange={(e) => onChange(def.name, e.target.value)}
          className={`${base} ${ring}`}
        />
      )}
      <label
        htmlFor={def.name}
        className="pointer-events-none absolute left-4 top-2 text-[0.7rem] uppercase tracking-wider text-mist transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-wider"
      >
        {def.label}
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

type ContactFormProps = {
  fields?: FieldDef[];
  accent?: "gold" | "lagoon";
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  /** When set, the form POSTs JSON here. Without it, the form just shows the
   *  success state (used by the general contact forms that have no backend yet). */
  endpoint?: string;
  /** Maps the raw field state to the backend's expected JSON keys. */
  mapPayload?: (data: Record<string, string>) => Record<string, unknown>;
  /** reCAPTCHA v3 action name (e.g. "contact_form"). When set together with an
   *  endpoint, the form generates a token on submit and includes it in the
   *  payload as `recaptchaToken`. Setting this also wraps the form in a
   *  GoogleReCaptchaProvider (see the default export below). */
  recaptchaAction?: string;
};

function ContactFormInner({
  fields = DEFAULT_FIELDS,
  accent = "gold",
  submitLabel = "Send message",
  successTitle = "Message received.",
  successBody = "Thank you — our team will be in touch within one business day.",
  endpoint,
  mapPayload,
  recaptchaAction,
}: ContactFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [data, setData] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.options ? f.options[0] : ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const accentRing =
    accent === "lagoon"
      ? "focus:border-lagoon focus:shadow-[0_0_0_3px_rgba(52,185,171,0.18)]"
      : "focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]";
  const accentText = accent === "lagoon" ? "text-lagoon" : "text-gold";
  const strokeColor = accent === "lagoon" ? "#34b9ab" : "#d4af37";

  const update = (k: string, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    if (apiError) setApiError(null);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    fields.forEach((f) => {
      const val = (data[f.name] ?? "").trim();
      if (f.required && !val) e[f.name] = `${f.label} is required.`;
      else if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        e[f.name] = "That email doesn't look right.";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // No backend wired for this form — keep the existing optimistic success.
    if (!endpoint) {
      setSent(true);
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      const payload: Record<string, unknown> = mapPayload ? mapPayload(data) : { ...data };

      // reCAPTCHA v3: generate a token for this action and attach it.
      if (recaptchaAction) {
        if (!executeRecaptcha) {
          throw new Error(
            "Security verification is still loading. Please try again in a moment."
          );
        }
        payload.recaptchaToken = await executeRecaptcha(recaptchaAction);
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-7 md:p-9">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${
          accent === "lagoon" ? "bg-lagoon/10" : "bg-gold/10"
        }`}
      />
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-96 flex-col items-center justify-center text-center"
          >
            <motion.svg viewBox="0 0 52 52" className="h-20 w-20" initial="h" animate="s">
              <motion.circle cx="26" cy="26" r="24" fill="none" stroke={strokeColor} strokeWidth="2" variants={{ h: { pathLength: 0 }, s: { pathLength: 1 } }} transition={{ duration: 0.7 }} />
              <motion.path d="M16 27l7 7 13-14" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" variants={{ h: { pathLength: 0 }, s: { pathLength: 1 } }} transition={{ duration: 0.5, delay: 0.5 }} />
            </motion.svg>
            <h3 className="mt-6 font-serif text-2xl">{successTitle}</h3>
            <p className="mt-3 max-w-xs text-sm text-mist">{successBody}</p>
            <button
              onClick={() => {
                setData(Object.fromEntries(fields.map((f) => [f.name, f.options ? f.options[0] : ""])));
                setSent(false);
              }}
              className={`mt-7 text-sm underline-offset-4 hover:underline ${accentText}`}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <Field key={f.name} def={f} value={data[f.name] ?? ""} onChange={update} error={errors[f.name]} accentRing={accentRing} accentText={accentText} />
            ))}

            <AnimatePresence>
              {apiError && (
                <motion.p
                  key="api-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 sm:col-span-2"
                >
                  {apiError}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-2 sm:col-span-2">
              <MagneticButton
                type="submit"
                disabled={loading}
                className={`w-full justify-center ${accent === "lagoon" ? "bg-linear-to-r! from-aqua! to-lagoon! text-ocean-deep!" : ""}`}
              >
                {loading ? "Sending…" : submitLabel}
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm(props: ContactFormProps) {
  // Only load reCAPTCHA (and its provider) when an action is requested, so the
  // forms that don't need it — e.g. the hospitality investment form — stay
  // script-free and keep their existing behaviour.
  if (props.recaptchaAction) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
        <ContactFormInner {...props} />
      </GoogleReCaptchaProvider>
    );
  }
  return <ContactFormInner {...props} />;
}
