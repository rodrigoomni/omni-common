"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CtaPill } from "./cta-pill";
import { ConfettiSimple, type SeedShape } from "./confetti-simple";
import homeContent from "@/content/home.json";

const EASE = [0.22, 1, 0.36, 1] as const;

// Hero accent shapes — dropped into the physics sim as draggable pieces.
// Circles dominate; semicircles are restricted to sherpa or ice-blue.
const HERO_SHAPES: SeedShape[] = [
  { color: "#A5FDF3", xFrac: 0.18, shape: "circle" },
  { color: "#B7ED4B", xFrac: 0.36, shape: "circle" },
  { color: "#1A7A7A", xFrac: 0.55, shape: "semicircle" },
  { color: "#14545D", xFrac: 0.72, shape: "circle" },
  { color: "#B7ED4B", xFrac: 0.9, shape: "circle" },
];

export function Hero() {
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const { hero } = homeContent;
  // Two collision boxes: (1) eyebrow + h1 + copy, (2) CTA pill only.
  // Faces + stars have no ref — no collision, and render behind shapes.
  const textStackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const motionStyle = { opacity: contentOpacity, y: contentY, scale: contentScale };

  return (
    <section
      className="fixed inset-0 overflow-hidden"
      style={{ backgroundColor: "#0A2B47", zIndex: 0 }}
      data-theme="dark"
    >
      {/* Grid / atmosphere background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "scale(1.1)",
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* ── BEHIND LAYER: faces + stars — visually behind shapes, no collision ── */}
      <ContentLayer motionStyle={motionStyle} className="z-[1]" pointerEvents="none">
        {/* Invisible spacer: eyebrow */}
        <div className="invisible" aria-hidden>
          <Eyebrow text={hero.subheading_bold} />
        </div>
        {/* Invisible spacer: title + copy */}
        <div className="invisible" aria-hidden>
          <TitleStack line1={hero.heading_line1} line2={hero.heading_line2} />
          <CopyBlock subheading={hero.subheading} growthLine={hero.growth_line} />
        </div>
        <CtaRowShell>
          {/* Invisible spacer: pill */}
          <div className="invisible" aria-hidden>
            <CtaPill href="#lets-chat" label={hero.cta_button} />
          </div>
          <FacesBlock />
          <StarsBlock />
        </CtaRowShell>
      </ContentLayer>

      {/* Confetti canvas — sibling of the content layers, no scroll animation */}
      <ConfettiSimple
        obstacleRefs={[textStackRef, pillRef]}
        obstaclePadding={12}
        seedShapes={HERO_SHAPES}
      />

      {/* ── FRONT LAYER: eyebrow + title + copy + pill — in front of shapes, collides ── */}
      <ContentLayer motionStyle={motionStyle} className="z-[10]" pointerEvents="none">
        <div ref={textStackRef} className="pointer-events-auto flex w-fit flex-col items-center">
          <Eyebrow text={hero.subheading_bold} />
          <TitleStack line1={hero.heading_line1} line2={hero.heading_line2} />
          <CopyBlock subheading={hero.subheading} growthLine={hero.growth_line} />
        </div>
        <CtaRowShell>
          <div ref={pillRef} className="pointer-events-auto">
            <CtaPill href="#lets-chat" label={hero.cta_button} />
          </div>
          {/* Invisible spacer: faces */}
          <div className="invisible" aria-hidden>
            <FacesBlock />
          </div>
          {/* Invisible spacer: stars */}
          <div className="invisible" aria-hidden>
            <StarsBlock />
          </div>
        </CtaRowShell>
      </ContentLayer>

      {/* Shimmer sweep on load */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, delay: 1.5, ease: EASE }}
      />
    </section>
  );
}

// A layer that fills the viewport, flex-centers its child, and receives the
// shared scroll animation. Both behind + front layers use this so their layouts
// stack identically and the canvas can sit between them at a fixed z.
function ContentLayer({
  motionStyle,
  className,
  pointerEvents = "auto",
  children,
}: {
  motionStyle: { opacity: MotionValue<number>; y: MotionValue<number>; scale: MotionValue<number> };
  className?: string;
  pointerEvents?: "auto" | "none";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 ${
        pointerEvents === "none" ? "pointer-events-none" : ""
      } ${className ?? ""}`}
      style={motionStyle}
    >
      <div className="flex w-fit flex-col items-center text-center">{children}</div>
    </motion.div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <motion.p
      className="mb-4 uppercase"
      style={{
        fontFamily: "var(--font-inter)",
        fontWeight: 600,
        color: "#CFFC68",
        fontSize: "clamp(0.75rem, 1.04vw, 15px)",
        letterSpacing: "0.16em",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
    >
      {text}
    </motion.p>
  );
}

function TitleStack({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="overflow-hidden">
        <motion.h1
          className="whitespace-nowrap pb-[0.2em] font-extrabold leading-[0.95] tracking-[-0.025em]"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "rgba(255,255,255,0.95)",
            fontSize: "clamp(2rem, 8vw, 100px)",
          }}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          {line1}
        </motion.h1>
      </div>
      <div className="overflow-hidden">
        <motion.h1
          className="whitespace-nowrap pb-[0.2em] font-extrabold leading-[0.95] tracking-[-0.025em]"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "#CFFC68",
            fontSize: "clamp(2rem, 8vw, 100px)",
          }}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
        >
          {line2}
        </motion.h1>
      </div>
    </div>
  );
}

function CopyBlock({ subheading, growthLine }: { subheading: string; growthLine: string }) {
  return (
    <motion.div
      className="mt-5 flex w-full flex-col items-center gap-1 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.05, ease: EASE }}
    >
      <p
        className="leading-[1.7]"
        style={{
          fontFamily: "var(--font-encode)",
          color: "#FFFFFF",
          fontSize: "clamp(0.95rem, 1.19vw, 18px)",
        }}
      >
        {subheading}
      </p>
      <p
        className="font-bold leading-[1.7]"
        style={{
          fontFamily: "var(--font-encode)",
          color: "#FFFFFF",
          fontSize: "clamp(0.95rem, 1.19vw, 18px)",
        }}
      >
        {growthLine}
      </p>
    </motion.div>
  );
}

function CtaRowShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-5 md:mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function FacesBlock() {
  return (
    <div className="flex items-center">
      <Image
        src="/images/hero-faces.png"
        alt="Team faces"
        width={580}
        height={160}
        priority
        className="h-[52px] w-auto"
      />
    </div>
  );
}

function StarsBlock() {
  return (
    <div className="mt-3 flex flex-col items-center leading-none sm:mt-0 sm:items-start">
      <div className="flex items-center gap-[4px]" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p
        className="mt-1"
        style={{
          fontFamily: "var(--font-encode)",
          color: "#FFFFFF",
          fontSize: "15px",
          lineHeight: "24px",
        }}
      >
        Trusted by Professionals
      </p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#CFFC68" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.9 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.8l7.1-.7L12 2.5z" />
    </svg>
  );
}
