"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Tracks mouse position normalized to -1..1
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return mouse;
}

// Brand colors
const TEAL = "#14545D";
const LIME = "#CFFC68";
const MINT = "#A5FDF3";
const NAVY = "#0A2B47";
const CREAM = "#FFFDEF";

// Custom toon material with thick outlines — Borderlands cel-shaded look
class OutlineMaterial extends THREE.ShaderMaterial {
  constructor(color: string, outlineColor: string = NAVY) {
    const col = new THREE.Color(color);
    super({
      uniforms: {
        baseColor: { value: col },
        outlineColor: { value: new THREE.Color(outlineColor) },
        lightDir: { value: new THREE.Vector3(0.5, 0.8, 0.6).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        uniform vec3 lightDir;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          // Cel-shading: 3 discrete light bands
          float NdotL = dot(vNormal, lightDir);
          float intensity;
          if (NdotL > 0.6) intensity = 1.0;
          else if (NdotL > 0.2) intensity = 0.7;
          else if (NdotL > -0.1) intensity = 0.45;
          else intensity = 0.25;

          vec3 color = baseColor * intensity;

          // Rim highlight for extra pop
          float rim = 1.0 - max(dot(vViewDir, vNormal), 0.0);
          rim = smoothstep(0.55, 0.7, rim);
          color += vec3(1.0) * rim * 0.15;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }
}

// Outline pass — renders a slightly scaled-up back-face version
function Outline({
  children,
  thickness = 0.04,
  color = NAVY,
}: {
  children: React.ReactNode;
  thickness?: number;
  color?: string;
}) {
  return <>{children}</>;
}

// Puzzle piece with cel-shaded look and thick black outlines
function PuzzlePiece({
  position,
  color,
  indentColor,
}: {
  position: [number, number, number];
  color: string;
  indentColor: string;
}) {
  const mainMat = useMemo(() => new OutlineMaterial(color), [color]);
  const indentMat = useMemo(() => new OutlineMaterial(indentColor), [indentColor]);
  const outlineMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: NAVY,
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <group position={position}>
      {/* Main block */}
      <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.1} smoothness={4}>
        <primitive object={mainMat} attach="material" />
      </RoundedBox>
      {/* Outline shell */}
      <RoundedBox args={[0.98, 0.98, 0.98]} radius={0.1} smoothness={4}>
        <primitive object={outlineMat} attach="material" />
      </RoundedBox>

      {/* Circular knob on front face */}
      <group position={[0, 0, 0.47]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
          <primitive object={indentMat} attach="material" />
        </mesh>
        {/* Knob outline */}
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.14, 24]} />
          <primitive object={outlineMat} attach="material" />
        </mesh>
      </group>

      {/* Circular socket indent on right face */}
      <group position={[0.47, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.18, 0.03, 8, 24]} />
          <primitive object={indentMat} attach="material" />
        </mesh>
      </group>

      {/* Circular knob on top face */}
      <group position={[0, 0.47, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.14, 24]} />
          <primitive object={mainMat} attach="material" />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 24]} />
          <primitive object={outlineMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

function CubeScene({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Cursor follow
    targetRotation.current.y = mouse.x * 0.35;
    targetRotation.current.x = -mouse.y * 0.25;

    // Idle bobbing
    const time = Date.now() * 0.0003;
    const idleY = Math.sin(time) * 0.12;
    const idleX = Math.cos(time * 0.7) * 0.08;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y + idleY + Math.PI * 0.25,
      0.035
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x + idleX + Math.PI * 0.18,
      0.035
    );
  });

  return (
    <group ref={groupRef} scale={1.7}>
      {/* 2x2x2 puzzle arrangement */}
      <PuzzlePiece position={[-0.5, -0.5, 0.5]} color={TEAL} indentColor={MINT} />
      <PuzzlePiece position={[0.5, -0.5, 0.5]} color={MINT} indentColor={TEAL} />
      <PuzzlePiece position={[-0.5, 0.5, 0.5]} color={LIME} indentColor={TEAL} />
      <PuzzlePiece position={[0.5, 0.5, 0.5]} color={TEAL} indentColor={LIME} />
      <PuzzlePiece position={[-0.5, -0.5, -0.5]} color={LIME} indentColor={MINT} />
      <PuzzlePiece position={[0.5, -0.5, -0.5]} color={TEAL} indentColor={LIME} />
      <PuzzlePiece position={[-0.5, 0.5, -0.5]} color={MINT} indentColor={TEAL} />
      <PuzzlePiece position={[0.5, 0.5, -0.5]} color={TEAL} indentColor={MINT} />
    </group>
  );
}

export function PuzzleCube() {
  const mouse = useMousePosition();

  return (
    <div className="h-[550px] w-full md:h-[650px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Flat, directional lighting for cel-shaded look */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-3, -1, 3]} intensity={0.3} color={MINT} />
        <CubeScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
