import { company } from "@/data/site";

/** Sheeraj monogram seal + wordmark. `compact` renders the mark only. */
export default function Logo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        aria-hidden
        fill="none"
      >
        <defs>
          <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6e7b0" />
            <stop offset="0.5" stopColor="#d4af37" />
            <stop offset="1" stopColor="#9c7c22" />
          </linearGradient>
        </defs>
        <path
          d="M24 2 44 13v22L24 46 4 35V13Z"
          stroke="url(#lg-gold)"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M24 9 38 16.5v15L24 39 10 31.5v-15Z"
          stroke="url(#lg-gold)"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <path
          d="M29 18.5c-1.6-1.5-4-2-6-2-2.6 0-4.8 1.3-4.8 3.6 0 4.7 11 2.6 11 7.8 0 2.6-2.5 4-5.4 4-2.4 0-4.6-.8-6-2.4"
          stroke="url(#lg-gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-[0.2em] text-silver">
            SHEERAJ
          </span>
          <span className="mt-1 text-[0.55rem] font-medium tracking-[0.42em] text-gold/80">
            {company.motto.toUpperCase()}
          </span>
        </span>
      )}
    </span>
  );
}
