// Sheeraj Projects — shared backend base URL.
//
// Same deployed backend the careers flow uses (see careerApi.ts). The docs show
// `http://localhost:5000` only as a *local dev* example; a deployed build must
// never call localhost — that resolves to the visitor's own machine. CORS for
// this site's origin is already configured on the backend. Override the host
// via `NEXT_PUBLIC_API_BASE_URL` in `.env` (project root, not /src).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://sheerajcodeworks-backend.onrender.com";
