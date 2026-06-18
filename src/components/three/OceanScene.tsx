"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RIPPLES = 12;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec3 uRipples[${RIPPLES}];
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vHeight;

  float waveH(vec2 p){
    float t = uTime;
    float h = 0.0;
    // gentle idle swells — kept low so the surface is calm until disturbed
    h += sin(p.x * 0.45 + t * 0.8) * 0.060;
    h += sin(p.y * 0.40 - t * 0.7) * 0.050;
    h += sin((p.x + p.y) * 0.26 + t * 0.55) * 0.035;
    h += sin((p.x * 0.85 - p.y * 0.5) + t * 1.0) * 0.020;
    return h;
  }
  float rippleH(vec2 p){
    float t = uTime;
    float h = 0.0;
    for(int i = 0; i < ${RIPPLES}; i++){
      vec3 rp = uRipples[i];
      float age = t - rp.z;
      if(age < 0.0 || age > 7.0) continue;
      float d = distance(p, rp.xy);
      float front = d - age * 2.0;
      // wide, soft, slowly-decaying ring — clearly visible on hover, smooth
      float env = exp(-age * 0.6) * smoothstep(3.4, 0.0, abs(front));
      h += sin(front * 2.1) * 0.24 * env;
    }
    return h;
  }
  float totalH(vec2 p){ return waveH(p) + rippleH(p); }

  void main(){
    vec3 pos = position;
    float e = 0.1;
    float hC = totalH(pos.xy);
    float hX = totalH(pos.xy + vec2(e, 0.0));
    float hY = totalH(pos.xy + vec2(0.0, e));
    pos.z += hC;
    vHeight = hC;
    vec3 nLocal = normalize(vec3((hC - hX) / e, (hC - hY) / e, 1.0));
    vNormal = normalize(normalMatrix * nLocal);
    vec4 world = modelMatrix * vec4(pos, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;
  uniform vec3 uFoam;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyColor;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vHeight;

  void main(){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    float dist = clamp((-vWorldPos.z) / 42.0, 0.0, 1.0);

    // depth-based water colour: bright turquoise near -> deep teal far
    vec3 base = mix(uColorShallow, uColorDeep, smoothstep(0.0, 0.62, dist));
    base = mix(base, uColorShallow, smoothstep(0.04, 0.16, vHeight));
    base = mix(base, uFoam, smoothstep(0.16, 0.26, vHeight));

    // sky reflection
    vec3 col = mix(base, uSkyColor, fres * 0.5);

    // sun reflection: broad warm sheen + sharp glints + tiny sparkles
    vec3 R = reflect(-L, N);
    float rv = max(dot(R, V), 0.0);
    float glow = pow(rv, 14.0) * 0.18;
    float spec = pow(rv, 220.0) * 1.3;
    float sparkle = pow(rv, 900.0) * 1.6;
    col += uSunColor * (glow + spec + sparkle);

    // horizon haze
    col = mix(col, uSkyColor, smoothstep(0.5, 1.0, dist));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Ocean() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const time = useRef(0);
  const lastSpawn = useRef(0);
  const writeIdx = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRipples: {
        value: Array.from({ length: RIPPLES }, () => new THREE.Vector3(0, 0, -100)),
      },
      uColorDeep: { value: new THREE.Color("#063743") },
      uColorShallow: { value: new THREE.Color("#22b9c8") },
      uFoam: { value: new THREE.Color("#eaf7f4") },
      uSunDir: { value: new THREE.Vector3(0.0, 0.32, -1.0).normalize() },
      uSunColor: { value: new THREE.Color("#ffe6b0") },
      uSkyColor: { value: new THREE.Color("#d2eff2") },
    }),
    []
  );

  useFrame((_, dt) => {
    time.current += dt;
    if (mat.current) mat.current.uniforms.uTime.value = time.current;
  });

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    const t = time.current;
    if (t - lastSpawn.current < 0.08) return;
    lastSpawn.current = t;
    const arr = uniforms.uRipples.value;
    arr[writeIdx.current % RIPPLES].set(e.point.x, -e.point.z, t);
    writeIdx.current++;
  };

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} onPointerMove={onMove}>
      <planeGeometry args={[100, 100, 150, 150]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.03;
    camera.position.y += (2.4 + pointer.y * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.1, -9);
  });
  return null;
}

export default function OceanScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.4, 7], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#cdeef2", 16, 46]} />
      <Ocean />
      <Rig />
    </Canvas>
  );
}
