"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

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

const TEAL = "#14545D";
const LIME = "#CFFC68";
const MINT = "#A5FDF3";

// Frosty translucent physical material — glass-like with matte frost
function useSolidMaterial(color: string) {
  return useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.5,
      side: THREE.FrontSide,
    });
  }, [color]);
}

function useOutlineMaterial() {
  return useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );
}

function PuzzlePiece({
  position,
  color,
  indentColor,
}: {
  position: [number, number, number];
  color: string;
  indentColor: string;
}) {
  const mainMat = useSolidMaterial(color);
  const indentMat = useSolidMaterial(indentColor);
  const outlineMat = useOutlineMaterial();

  return (
    <group position={position}>
      <RoundedBox args={[0.9, 0.9, 0.9]} radius={0.1} smoothness={4}>
        <primitive object={mainMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[0.96, 0.96, 0.96]} radius={0.1} smoothness={4}>
        <primitive object={outlineMat} attach="material" />
      </RoundedBox>

      {/* Front knob */}
      <group position={[0, 0, 0.46]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 24]} />
          <primitive object={indentMat} attach="material" />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
          <primitive object={outlineMat} attach="material" />
        </mesh>
      </group>

      {/* Right face socket ring */}
      <group position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.16, 0.025, 8, 24]} />
          <primitive object={indentMat} attach="material" />
        </mesh>
      </group>

      {/* Top knob */}
      <group position={[0, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
          <primitive object={mainMat} attach="material" />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.14, 24]} />
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

    targetRotation.current.y = mouse.x * 0.35;
    targetRotation.current.x = -mouse.y * 0.25;

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
    <group ref={groupRef} scale={1.1}>
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
    <div className="h-[450px] w-full md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-4, -2, 4]} intensity={0.4} color={MINT} />
        <pointLight position={[0, 3, 2]} intensity={0.3} color={LIME} distance={8} />
        <CubeScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
