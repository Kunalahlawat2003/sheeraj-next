/* Reusable decorative tropical SVGs (currentColor-driven). */

export function PalmTree({ className = "h-40 w-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} fill="none" aria-hidden>
      {/* trunk */}
      <path
        d="M58 158c-2-40 0-72 6-96"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* fronds */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M64 62C44 50 24 50 8 62c16-6 34-4 48 6" />
        <path d="M64 62C84 50 104 50 116 64c-16-8-34-6-48 4" />
        <path d="M64 62C56 42 56 22 66 8c-2 18 0 36 4 50" />
        <path d="M64 62C40 60 22 70 12 88c14-14 32-20 50-18" />
        <path d="M64 62C88 60 106 70 114 90c-14-16-32-22-50-20" />
      </g>
      {/* coconuts */}
      <circle cx="62" cy="64" r="4" fill="currentColor" />
      <circle cx="70" cy="62" r="4" fill="currentColor" />
    </svg>
  );
}

export function Cloud({ className = "h-16 w-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="currentColor" aria-hidden>
      <path d="M40 64c-18 0-30-12-30-26S24 14 40 16c6-12 22-18 36-12s20 18 18 28c14-2 26 6 26 18s-12 18-26 18Z" />
    </svg>
  );
}

export function Bird({ className = "h-4 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" className={className} fill="none" aria-hidden>
      <path
        d="M2 14c8-10 14-10 18-2 4-8 10-8 18 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Boat({ className = "h-10 w-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="none" aria-hidden>
      <path d="M14 42h72l-10 14H24Z" fill="currentColor" />
      <path d="M50 40V8l20 26Z" fill="currentColor" opacity="0.85" />
      <path d="M50 8 30 34h20" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  );
}

/* A feathered palm frond — recognisable single leaf, good for corner decor. */
export function PalmFrond({ className = "h-40 w-24" }: { className?: string }) {
  const leaflets = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const y = 16 + t * 150;
    const len = 34 * (1 - t * 0.55);
    const x = 54 - t * 6;
    return (
      <g key={i}>
        <path d={`M${x} ${y} q-${len} -8 -${len + 6} 8`} />
        <path d={`M${x} ${y} q${len} -8 ${len + 6} 8`} />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 120 180" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <path d="M54 178C46 120 46 60 60 6" />
      {leaflets}
    </svg>
  );
}

/* A simple filled tropical leaf with a midrib. */
export function TropicalLeaf({ className = "h-28 w-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" aria-hidden>
      <path
        d="M60 8C30 22 14 60 18 104c10 16 28 26 42 28 14-2 32-12 42-28C106 60 90 22 60 8Z"
        fill="currentColor"
      />
      <path d="M60 132C56 92 58 44 60 14" stroke="#06262f" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  );
}

/* Small rounded shrub / plant. */
export function Shrub({ className = "h-12 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="26" cy="46" rx="20" ry="14" />
      <ellipse cx="52" cy="42" rx="22" ry="16" />
      <ellipse cx="40" cy="30" rx="16" ry="14" />
    </svg>
  );
}

/* Hibiscus flower. */
export function Hibiscus({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="32" cy="19" rx="9" ry="14" transform={`rotate(${a} 32 33)`} fill="currentColor" />
      ))}
      <circle cx="32" cy="33" r="4.5" fill="#ffd98a" />
      <line x1="32" y1="33" x2="32" y2="15" stroke="#ffd98a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* A leaning coconut palm with curved trunk + coconuts (island detail). */
export function CoconutPalm({ className = "h-32 w-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 200" className={className} fill="none" aria-hidden>
      {/* trunk */}
      <path d="M62 198C52 132 52 72 78 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* trunk rings */}
      <g stroke="currentColor" strokeWidth="2" opacity="0.5">
        <path d="M58 150c4 2 9 2 13 0M58 120c4 2 10 2 15 0M62 90c4 2 10 2 15 0M68 60c4 2 9 2 13 0" />
      </g>
      {/* fronds */}
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M78 22C50 6 24 8 6 26c20-6 42-2 60 10" />
        <path d="M78 22c28-16 52-12 70 8-20-10-44-12-62 0" />
        <path d="M78 22C66 0 66-2 74-18" />
        <path d="M78 22C50 20 26 34 14 58c20-18 44-24 64-22" />
        <path d="M78 22c28-2 50 12 60 38-20-20-44-26-62-24" />
      </g>
      {/* coconuts */}
      <circle cx="74" cy="26" r="5" fill="currentColor" />
      <circle cx="84" cy="24" r="5" fill="currentColor" />
      <circle cx="79" cy="33" r="5" fill="currentColor" />
    </svg>
  );
}

/* Reusable low-opacity flora cluster for section corners. Set color + opacity
   via a text-* / opacity className on the wrapper at the call site. */
export function LeafCluster({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <div className="relative h-48 w-48">
        <PalmFrond className="absolute bottom-0 left-2 h-44 w-28 -rotate-12 anim-sway-soft" />
        <TropicalLeaf className="absolute bottom-4 left-16 h-28 w-28 rotate-[18deg]" />
        <TropicalLeaf className="absolute bottom-0 left-24 h-20 w-20 rotate-[40deg]" />
      </div>
    </div>
  );
}
