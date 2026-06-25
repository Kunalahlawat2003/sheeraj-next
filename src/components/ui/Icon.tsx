import type { IconName } from "@/data/site";

/** Bespoke thin-line icon set — no external icon dependency. */
export default function Icon({
  name,
  className = "h-7 w-7",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "highway":
      return (
        <svg {...common}>
          <path d="M7 28 13 4M25 28 19 4" />
          <path d="M16 7v3M16 14v3M16 21v3" strokeDasharray="0.1 0" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="4.5" />
          <path d="M16 6v4M16 22v4M6 16h4M22 16h4" />
        </svg>
      );
    case "canal":
      return (
        <svg {...common}>
          <path d="M5 11l3 3 3-3M5 18l3 3 3-3" opacity="0" />
          <path d="M4 12c2.5 2 5.5 2 8 0s5.5-2 8 0 5.5 2 8 0" />
          <path d="M4 19c2.5 2 5.5 2 8 0s5.5-2 8 0 5.5 2 8 0" />
          <path d="M6 26c2 1.6 4.5 1.6 6.5 0" opacity=".6" />
        </svg>
      );
    case "landmark":
      return (
        <svg {...common}>
          <path d="M4 12 16 5l12 7" />
          <path d="M6 12v11M12 12v11M20 12v11M26 12v11" />
          <path d="M4 27h24" />
        </svg>
      );
    case "crane":
      return (
        <svg {...common}>
          <path d="M9 28V5l16 3M9 5l16 3" />
          <path d="M9 11l9 1.7M19 8.5V18M19 18h-3M19 18h3" />
          <path d="M6 28h8" />
        </svg>
      );
    case "palm":
      return (
        <svg {...common}>
          <path d="M16 28c0-7 0-12 1-16" />
          <path d="M17 12c-3-3-7-3-10-1M17 12c3-3 7-3 10-1M17 12c-1-3-1-7 0-9M17 12c-4 0-8 2-10 5M17 12c4 0 8 2 10 5" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M26 6C12 6 6 14 6 26c12 0 20-6 20-20Z" />
          <path d="M6 26C12 20 18 14 26 6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="6" />
          <path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7l11-4Z" />
          <path d="M11 16l3.5 3.5L22 12" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M3 13c2.2 2 4.6 2 6.8 0s4.6-2 6.8 0 4.6 2 6.8 0" />
          <path d="M3 19c2.2 2 4.6 2 6.8 0s4.6-2 6.8 0 4.6 2 6.8 0" />
          <path d="M3 25c2.2 2 4.6 2 6.8 0s4.6-2 6.8 0 4.6 2 6.8 0" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...common}>
          <path d="M16 4c5 6 8 10 8 14a8 8 0 1 1-16 0c0-4 3-8 8-14Z" />
          <path d="M12 19a4 4 0 0 0 4 4" />
        </svg>
      );
    case "fish":
      return (
        <svg {...common}>
          <path d="M4 16c4-6 12-7 18 0-6 7-14 6-18 0Z" />
          <path d="M22 16c2-1.5 4-2 6-1.5-1 1.5-1 2 0 3.5-2 .5-4 0-6-2Z" />
          <circle cx="11" cy="14.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case "anchor":
      return (
        <svg {...common}>
          <circle cx="16" cy="7" r="3" />
          <path d="M16 10v17M9 16H7c0 6 4 11 9 11s9-5 9-11h-2" />
          <path d="M11 16h10" />
        </svg>
      );
    case "flower":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 13c-1-3-1-6 0-8 1 2 1 5 0 8M16 19c1 3 1 6 0 8-1-2-1-5 0-8M13 16c-3-1-6-1-8 0 2 1 5 1 8 0M19 16c3-1 6-1 8 0-2 1-5 1-8 0" />
        </svg>
      );
    case "pool":
      return (
        <svg {...common}>
          <path d="M4 22c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0 4-1.6 6 0" />
          <path d="M4 27c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0 4-1.6 6 0" />
          <path d="M11 18V6M21 18V6M11 9h10M11 13h10" />
        </svg>
      );
    case "real-estate":
      return (
        <svg {...common}>
          <path d="M4 18l12-12 12 12" />
          <path d="M8 18v9h16v-9" />
          <path d="M13 27v-6h6v6" />
          <path d="M10 19h4v4h-4z" />
        </svg>
      );
    default:
      return null;
  }
}
