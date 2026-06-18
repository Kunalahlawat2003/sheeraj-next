"use client";

import dynamic from "next/dynamic";

const OceanScene = dynamic(() => import("./OceanScene"), {
  ssr: false,
  loading: () => null,
});

export default function OceanCanvas() {
  return <OceanScene />;
}
