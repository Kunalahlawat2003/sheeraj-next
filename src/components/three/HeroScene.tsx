"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Glowing topographic wave-grid — the land being shaped / roads forming.     */
/* -------------------------------------------------------------------------- */
const vertex = /* glsl */ `
  uniform float uTime;
  varying float vElev;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float e = sin(p.x * 0.35 + uTime * 0.55) * 0.6
            + sin(p.y * 0.50 + uTime * 0.40) * 0.5
            + sin((p.x + p.y) * 0.20 - uTime * 0.30) * 0.8;
    p.z += e;
    vElev = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying float vElev;
  varying vec2 vUv;
  void main() {
    float d = distance(vUv, vec2(0.5));
    float edge = smoothstep(0.5, 0.08, d);
    float pulse = 0.6 + 0.4 * sin(uTime * 0.8 + vElev * 1.6);
    float a = edge * (0.22 + 0.4 * smoothstep(-1.0, 1.6, vElev)) * pulse;
    vec3 col = uColor * (0.7 + 0.55 * vElev);
    gl_FragColor = vec4(col, a);
  }
`;

function WaveGrid() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#d4af37") },
    }),
    []
  );
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[64, 64, 130, 130]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

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
      <WaveGrid />
      <Embers />
      <Rig />
    </Canvas>
  );
}
