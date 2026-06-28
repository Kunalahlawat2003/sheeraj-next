"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAuthToken,
  clearSession,
  authHeaders,
  ADMIN_API_BASE,
  type AdminJob,
  type Application,
} from "@/lib/adminApi";
import OverviewSection from "./OverviewSection";
import JobsSection from "./JobsSection";
import ApplicationsSection from "./ApplicationsSection";

type View = "overview" | "jobs" | "applications";

/* ─── Icons ─────────────────────────────────────────────── */
function ChartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}
function BriefcaseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function FilesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
function LogoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV: { id: View; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "overview", label: "Dashboard", Icon: ChartIcon },
  { id: "jobs", label: "Job Management", Icon: BriefcaseIcon },
  { id: "applications", label: "Applications", Icon: FilesIcon },
];

const VIEW_TITLE: Record<View, string> = {
  overview: "Dashboard Overview",
  jobs: "Job Management",
  applications: "Job Applications",
};

/* ─── Sidebar ─────────────────────────────────────────────── */
function Sidebar({
  view,
  setView,
  onLogout,
  open,
  onClose,
}: {
  view: View;
  setView: (v: View) => void;
  onLogout: () => void;
  open: boolean;
  onClose: () => void;
}) {
  const inner = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-(--ui-border) px-6 py-7">
        <div className="flex items-center gap-3">
          <Image
            src="/logo/logo1.png"
            alt="Sheeraj Projects"
            width={40}
            height={40}
            priority
            className="h-10 w-10 shrink-0 object-contain drop-shadow-[0_6px_16px_rgba(212,175,55,0.45)]"
          />
          <div className="min-w-0">
            <div className="truncate font-brand text-[1rem] tracking-[0.2em] text-silver">Sheeraj Projects</div>
            <div className="mt-0.5 text-[0.6rem] tracking-[0.22em] uppercase text-mist">Admin Portal</div>
          </div>
        </div>
        <div
          aria-hidden
          className="mt-4 h-px"
          style={{ background: "linear-gradient(90deg,rgba(212,175,55,0.5),transparent)" }}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV.map(({ id, label, Icon }, i) => {
          const active = view === id;
          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setView(id)}
              className={`relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gold/10 text-gold"
                  : "text-mist hover:bg-(--ui-surface-xs) hover:text-silver"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {label}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom: version + logout */}
      <div className="border-t border-(--ui-border) px-3 py-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-mist transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogoutIcon className="h-4.5 w-4.5 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-(--ui-border) bg-panel md:flex">
        {inner}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-base/80 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-(--ui-border) bg-panel md:hidden"
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-mist hover:text-silver"
              >
                <XIcon className="h-4 w-4" />
              </button>
              {inner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Top bar ─────────────────────────────────────────────── */
function TopBar({ view, onMenuClick }: { view: View; onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-(--ui-border) bg-panel/80 px-5 backdrop-blur-md">
      <button
        onClick={onMenuClick}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-mist hover:text-silver md:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-mist">Admin</span>
        <span className="text-mist/40">›</span>
        <span className="font-medium text-silver">{VIEW_TITLE[view]}</span>
      </div>
    </header>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const router = useRouter();
  const [view, setView] = useState<View>("overview");
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = useCallback(() => {
    clearSession();
    router.replace("/admin/login");
  }, [router]);

  const fetchJobs = useCallback(async () => {
    try {
      // Admin panel reads all jobs (active + inactive) from the base job endpoint.
      const res = await fetch(`${ADMIN_API_BASE}/sheeraj-projects/job`, {
        headers: authHeaders(),
      });
      if (res.status === 403) { logout(); return; }
      const d = await res.json();
      // API may return { data: [] } or a direct array
      setJobs(Array.isArray(d) ? d : (d.data ?? []));
    } catch {
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  }, [logout]);

  const fetchApplications = useCallback(async () => {
    try {
      // Applications admin endpoint: GET /sheeraj-projects/apply with token header
      const res = await fetch(`${ADMIN_API_BASE}/sheeraj-projects/apply`, {
        headers: authHeaders(),
      });
      if (res.status === 403) { logout(); return; }
      const d = await res.json();
      setApplications(Array.isArray(d) ? d : (d.data ?? []));
    } catch {
      setApplications([]);
    } finally {
      setLoadingApps(false);
    }
  }, [logout]);

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/admin/login");
      return;
    }
    fetchJobs();
    fetchApplications();
  }, [router, fetchJobs, fetchApplications]);

  return (
    <div className="flex min-h-dvh bg-base">
      <Sidebar
        view={view}
        setView={(v) => { setView(v); setSidebarOpen(false); }}
        onLogout={logout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <TopBar view={view} onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {view === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <OverviewSection
                  jobs={jobs}
                  applications={applications}
                  loading={loadingJobs || loadingApps}
                  onGoJobs={() => setView("jobs")}
                  onGoApps={() => setView("applications")}
                />
              </motion.div>
            )}
            {view === "jobs" && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <JobsSection jobs={jobs} setJobs={setJobs} onUnauth={logout} />
              </motion.div>
            )}
            {view === "applications" && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ApplicationsSection
                  applications={applications}
                  jobs={jobs}
                  loading={loadingApps}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
