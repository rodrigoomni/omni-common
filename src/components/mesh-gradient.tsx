"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 scaledUv = vec2(uv.x * aspect, uv.y);

    vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);
    float dist = length(scaledUv - mouse);
    float mouseInfluence = smoothstep(0.9, 0.0, dist) * 0.25;

    float t = uTime * 0.08;

    // Layered cloud noise
    float n1 = snoise(scaledUv * 1.2 + vec2(t, t * 0.6)) * 0.5;
    float n2 = snoise(scaledUv * 2.4 - vec2(t * 0.4, t * 0.3)) * 0.3;
    float n3 = snoise(scaledUv * 4.5 + vec2(t * 0.2, -t * 0.5)) * 0.15;
    float n4 = snoise(scaledUv * 8.0 + vec2(-t * 0.15, t * 0.25)) * 0.05;
    float noise = n1 + n2 + n3 + n4 + mouseInfluence;

    // Deep teal palette matching reference image
    vec3 darkTeal   = vec3(0.043, 0.153, 0.196);  // #0b2732 - darkest
    vec3 deepTeal   = vec3(0.055, 0.180, 0.227);  // #0e2e3a - base
    vec3 midTeal    = vec3(0.067, 0.212, 0.263);  // #113643 - mid
    vec3 lightTeal  = vec3(0.082, 0.251, 0.310);  // #15404f - lightest cloud
    vec3 glowTeal   = vec3(0.078, 0.329, 0.365);  // brand teal for glow

    float blend = noise * 0.5 + 0.5;

    // Cloud layers blending through dark teals
    vec3 color = mix(deepTeal, darkTeal, smoothstep(0.0, 0.25, blend));
    color = mix(color, midTeal, smoothstep(0.25, 0.5, blend));
    color = mix(color, lightTeal, smoothstep(0.5, 0.75, blend));
    color = mix(color, deepTeal, smoothstep(0.75, 1.0, blend));

    // Mouse glow — subtle teal luminance
    color = mix(color, glowTeal * 0.6, mouseInfluence * 0.5);

    // Subtle edge darkening
    float vig = 1.0 - smoothstep(0.5, 1.6, length(uv - 0.5) * 1.3);
    color = mix(darkTeal * 0.85, color, vig * 0.7 + 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    const targetX = (pointer.x + 1) / 2;
    const targetY = (pointer.y + 1) / 2;
    uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05;
    uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
      >
        <GradientPlane />
      </Canvas>
    </div>
  );
}
