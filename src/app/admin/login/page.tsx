"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ADMIN_API_BASE, setSession, getRememberedEmail } from "@/lib/adminApi";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="5" y="14" width="22" height="14" rx="2.5" />
      <path d="M10 14V10a6 6 0 0 1 12 0v4" />
      <circle cx="16" cy="21" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function KeyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 8-8M16 7l2.5 2.5M14 9l2 2" />
    </svg>
  );
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill the email if "Remember me" was used previously.
  useEffect(() => {
    const saved = getRememberedEmail();
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Client-side validation (mirrors legacy panel).
    if (!email.trim() || email.trim().length < 3) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${ADMIN_API_BASE}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      // Parse as text first, then attempt JSON (handles non-JSON error bodies).
      const raw = await res.text();
      let data: { token?: string; user?: unknown; message?: string; error?: string } = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch { /* non-JSON */ }
      if (!res.ok) throw new Error(data.message ?? data.error ?? `Authentication failed (${res.status})`);
      if (!data.token) throw new Error(data.message ?? "No token received from server.");
      setSession(data.token, data.user, remember, email);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh bg-base">

      {/* ── Left: cinematic video panel (desktop only) ───────────── */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/homeHero2.mp4" type="video/mp4" />
        </video>

        {/* Tints: dark sheet + gold vignette + right-edge fade into form */}
        <div className="absolute inset-0 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 0% 0%, rgba(212,175,55,0.28), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-40"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-base))" }}
        />

        {/* Panel content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-brand text-lg tracking-[0.3em] text-white"
          >
            SHEERAJ PROJECTS
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow text-gold">Admin Portal</div>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-white">
              Building Tomorrow&apos;s{" "}
              <span className="text-gold-gradient italic">Infrastructure.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Manage job listings and review applications from a single, secure command center.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[0.7rem] tracking-wide text-white/45"
          >
            SHEERAJ Projects Private Limited — Internal Use Only
          </motion.div>
        </div>
      </div>

      {/* ── Right: form ──────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-5 py-10 lg:w-1/2">

        {/* Subtle grid + glow behind the form */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,175,55,0.08), transparent 65%)",
          }}
        />

        {/* Floating orbs */}
        {([
          { x: "20%", y: "18%", size: 5, dur: 3.5 },
          { x: "80%", y: "24%", size: 4, dur: 4.2 },
          { x: "85%", y: "72%", size: 6, dur: 3.1 },
          { x: "15%", y: "78%", size: 3, dur: 5.0 },
        ] as const).map((orb, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-gold/25"
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm"
        >
          {/* Glass card shell */}
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-9 shadow-[0_30px_90px_-32px_rgba(138,109,30,0.45)] sm:px-9">
            {/* Gold hairline along the top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent"
            />
            {/* Soft gold bloom behind the lock badge */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
            />

            {/* Brand header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="relative mb-9 text-center"
            >
              <div
                className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)]"
                style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.28),rgba(212,175,55,0.05))" }}
              >
                <span
                  aria-hidden
                  className="anim-pulse-glow pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gold/40"
                />
                <LockIcon />
              </div>
              <h1 className="font-brand text-2xl tracking-[0.22em] text-silver">
                Welcome <span className="text-gold-gradient">back</span>
              </h1>
              <div className="mx-auto mt-3 h-px w-12 bg-linear-to-r from-transparent via-gold/50 to-transparent" />
              <p className="mt-3 text-sm text-mist">Sign in to the Sheeraj Projects admin portal</p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-mist">Email address</label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist transition-colors group-focus-within:text-gold">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sheerajprojects.com"
                  className="w-full rounded-xl border border-(--ui-border) bg-(--ui-surface-xs) py-3 pl-10 pr-4 text-sm text-silver outline-none transition-all placeholder:text-mist/30 hover:border-(--ui-border-md) focus:border-gold/60 focus:bg-(--ui-surface-sm) focus:ring-2 focus:ring-gold/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-mist">Password</label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist transition-colors group-focus-within:text-gold">
                  <KeyIcon />
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full rounded-xl border border-(--ui-border) bg-(--ui-surface-xs) py-3 pl-10 pr-11 text-sm text-silver outline-none transition-all placeholder:text-mist/30 hover:border-(--ui-border-md) focus:border-gold/60 focus:bg-(--ui-surface-sm) focus:ring-2 focus:ring-gold/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mist transition-colors hover:text-gold"
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex cursor-pointer items-center gap-3 select-none">
              <button
                type="button"
                onClick={() => setRemember((r) => !r)}
                aria-pressed={remember}
                className={`relative flex h-4 w-4 items-center justify-center rounded border transition-all ${
                  remember ? "border-gold bg-gold/20" : "border-(--ui-border)"
                }`}
              >
                <AnimatePresence>
                  {remember && (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="h-2.5 w-2.5 text-gold"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M2 6l3 3 5-5" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
              <span className="text-sm text-mist">Keep me signed in</span>
            </label>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold w-full disabled:opacity-60"
            >
              {loading ? (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in…
                </span>
              ) : (
                <span className="relative z-10">Sign in to Admin</span>
              )}
            </button>
            </motion.form>
          </div>

          {/* Mobile-only footer (desktop shows it on the video panel) */}
          <p className="mt-8 text-center text-xs text-mist/35 lg:hidden">
            SHEERAJ Projects Private Limited — Internal Use Only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
