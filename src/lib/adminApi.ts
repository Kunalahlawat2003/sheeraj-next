import { CAREER_API_BASE } from "./careerApi";

export const ADMIN_API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? CAREER_API_BASE;

export type AdminJob = {
  JobID: string;
  title: string;
  description: string;
  category: string;
  workingStatus: string;
  Responsibilities: string[];
  Requirements: string[];
  experienceRequired: string;
  jobType: string;
  status: boolean;
  createdAt?: string;
};

export type JobFormData = Omit<AdminJob, "JobID" | "createdAt">;

export type Application = {
  _id?: string;
  jobId: string;
  jobTitle?: string;
  name: string;
  email: string;
  phone: number | string;
  state: string;
  city: string;
  country: string;
  DOB: string;
  highestQualification: string;
  employed: boolean | string;
  notice_period?: string;
  current_ctc?: number | string;
  expected_ctc?: number | string;
  resume?: string;
  submittedOn: string;
  createdAt?: string;
};

/* ─── Auth ─────────────────────────────────────────────────────
   Storage scheme mirrors the legacy admin panel (js/admin.js):
   - localStorage.adminToken      → JWT
   - localStorage.adminUser       → serialized user object
   - sessionStorage.isAuthenticated → "true"
   - localStorage.rememberMe / username → for "Remember me" prefill
*/
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

export function setSession(
  token: string,
  user: unknown,
  remember: boolean,
  email: string
): void {
  localStorage.setItem("adminToken", token);
  if (user) localStorage.setItem("adminUser", JSON.stringify(user));
  sessionStorage.setItem("isAuthenticated", "true");
  if (remember) {
    localStorage.setItem("rememberMe", "true");
    localStorage.setItem("username", email);
  } else {
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("username");
  }
}

export function clearSession(): void {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  sessionStorage.removeItem("isAuthenticated");
}

// Returns the remembered email (for "Remember me" prefill), if any.
export function getRememberedEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("rememberMe") === "true"
    ? localStorage.getItem("username") ?? ""
    : "";
}

// API uses `token` header (not Authorization: Bearer)
export function authHeaders(): Record<string, string> {
  const t = getAuthToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (t) h["token"] = t;
  return h;
}

/* ─── Enums ────────────────────────────────────────────────── */
export const JOB_CATEGORIES = [
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "DevOps",
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
  "Project Management",
  "Business Development",
  "Marketing",
  "Human Resources",
  "Finance",
  "Operations",
] as const;

export const WORKING_STATUSES = ["Remote", "On-site", "Hybrid"] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
] as const;

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "0-1 years",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5-7 years",
  "7-10 years",
  "10+ years",
] as const;
