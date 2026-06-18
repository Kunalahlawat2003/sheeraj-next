"use client";

import dynamic from "next/dynamic";

// Heavy WebGL — client-only, lazily loaded so it never blocks first paint.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvas() {
  return <HeroScene />;
}
