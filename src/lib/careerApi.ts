// Sheeraj Projects — Career API client config.
//
// The API docs (AGENTS.md) show `http://localhost:3000` only as a *local dev*
// example for the backend. The frontend must never call localhost in a deployed
// build — that address resolves to the visitor's own machine, not our server, so
// every job listing and application would fail in production. We always point at
// the deployed backend instead. Override via `NEXT_PUBLIC_CAREER_API_BASE` in
// `.env` (project root, not /src) if the backend domain ever changes.
export const CAREER_API_BASE =
  process.env.NEXT_PUBLIC_CAREER_API_BASE ??
  "https://sheerajcodeworks-backend.onrender.com";

export type Job = {
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
