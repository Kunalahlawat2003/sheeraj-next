"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Drifting embers / construction dust.                                       */
/* -------------------------------------------------------------------------- */
function softSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,245,210,1)");
  g.addColorStop(0.3, "rgba(233,205,124,0.7)");
  g.addColorStop(1, "rgba(233,205,124,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function Embers({ count = 850 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(softSprite, []);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 14 - 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speeds[i] = 0.25 + Math.random() * 0.9;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.5 + i) * dt * 0.06;
      if (arr[i * 3 + 1] > 11) arr[i * 3 + 1] = -4;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={0.16}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.85}
        color="#e9cd7c"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera eases toward the pointer for parallax depth.                        */
/* -------------------------------------------------------------------------- */
function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (1.4 + pointer.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.4, 9], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#06070b", 9, 30]} />
      <Embers />
      <Rig />
    </Canvas>
  );
}
