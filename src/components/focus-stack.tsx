"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import { useRef } from "react";

type Sentence = {
  before: string;
  accent: string;
  after: string;
};

const SENTENCES: Sentence[] = [
  { before: "Your business ", accent: "isn't growing", after: " fast enough." },
  { before: "You're about to spend ", accent: "real money", after: "." },
  { before: "", accent: "Nobody", after: " will tell you how much will come back." },
  { before: "", accent: "We will", after: "." },
];

const FOCUS_SPRING = { damping: 26, stiffness: 300, mass: 0.55 };
const ENTRY_SPRING = { damping: 28, stiffness: 180, mass: 0.7 };

// Concrete hex values so motion can interpolate colors smoothly.
const LIME = "#B8E85A"; // matches --lime-dark
const MUTED = "#8a8a8a"; // matches --foreground-subtle

const ROW_HEIGHT_PX = 112;
const ROW_GAP_PX = 6;

function FocusLine({
  sentence,
  index,
  active,
  entry,
  reduced,
}: {
  sentence: Sentence;
  index: number;
  active: MotionValue<number>;
  entry: MotionValue<number>;
  reduced: boolean;
}) {
  // ── Focus (post-entry, driven by active index) ─────────────────────────
  const distance = useTransform(active, (a) => Math.abs(a - index));

  // Non-linear falloff — near-neighbors get modest treatment, far ones get
  // hammered. Sells the "receding into depth" feel of a 3D carousel.
  const focusOpacity = useTransform(distance, [0, 0.5, 1, 2, 3], [1, 0.42, 0.18, 0.07, 0.04]);
  const blurPx = useTransform(distance, [0, 0.5, 1, 2, 3], [0, 4, 14, 24, 32]);
  const scale = useTransform(distance, [0, 0.5, 1, 2, 3], [1.1, 0.85, 0.65, 0.52, 0.45]);
  const translateZ = useTransform(distance, [0, 0.5, 1, 2, 3], [60, 0, -110, -240, -340]);

  const softFocusOpacity = useSpring(focusOpacity, FOCUS_SPRING);
  const softBlur = useSpring(blurPx, FOCUS_SPRING);
  const softScale = useSpring(scale, FOCUS_SPRING);
  const softTranslateZ = useSpring(translateZ, FOCUS_SPRING);

  const filter = useTransform(softBlur, (b) => `blur(${b}px)`);

  // Accent color interpolates smoothly through motion's built-in color mixer.
  // Because `distance` is spring-smoothed the color follows physically, no lag.
  const accentColor = useTransform(distance, [0, 0.6, 1.2], [LIME, MUTED, MUTED]);

  // ── Entry (pre-pin, driven by the section entering the viewport) ───────
  // Each sentence enters slightly after the previous — a soft stagger.
  const entryStart = 0.2 + index * 0.09;
  const entryEnd = entryStart + 0.45;

  const entryY = useTransform(entry, [entryStart, entryEnd], [90, 0], { clamp: true });
  const entryOpacityMask = useTransform(entry, [entryStart, entryEnd], [0, 1], { clamp: true });

  const softEntryY = useSpring(entryY, ENTRY_SPRING);
  const softEntryMask = useSpring(entryOpacityMask, ENTRY_SPRING);

  // ── Compose entry × focus so both animations play through the same pass ──
  const finalOpacity = useTransform(
    [softEntryMask, softFocusOpacity] as MotionValue<number>[],
    ([e, f]) => (e as number) * (f as number)
  );

  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: `${ROW_HEIGHT_PX}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.p
        className="text-center font-bold"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "var(--foreground)",
          fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          opacity: reduced ? 1 : finalOpacity,
          filter: reduced ? "none" : filter,
          scale: reduced ? 1 : softScale,
          y: reduced ? 0 : softEntryY,
          z: reduced ? 0 : softTranslateZ,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        }}
      >
        {sentence.before}
        <motion.span style={{ color: reduced ? LIME : accentColor }}>
          {sentence.accent}
        </motion.span>
        {sentence.after}
      </motion.p>
    </div>
  );
}

export function FocusStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const N = SENTENCES.length;

  // Pin-phase progress (0 → 1 while section is pinned to viewport)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Pre-pin entry progress: 0 when section top hits viewport bottom,
  // 1 when section top hits viewport top (moment of pin).
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Discrete step: each sentence owns 1/N of the pinned scroll range.
  const activeTarget = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    return Math.max(0, Math.min(N - 1, Math.floor(clamped * N)));
  });
  const active = useSpring(activeTarget, FOCUS_SPRING);

  const stackHeight = N * ROW_HEIGHT_PX + (N - 1) * ROW_GAP_PX;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${N * 100 + 50}vh`, backgroundColor: "var(--background)" }}
      aria-label="Growth challenges"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="relative flex w-full max-w-4xl items-center justify-center px-6 md:px-12"
          style={{
            height: `${stackHeight}px`,
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="flex w-full flex-col"
            style={{
              gap: `${ROW_GAP_PX}px`,
              transformStyle: "preserve-3d",
            }}
          >
            {SENTENCES.map((s, i) => (
              <FocusLine
                key={i}
                sentence={s}
                index={i}
                active={active}
                entry={entryProgress}
                reduced={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:flex md:gap-2"
        >
          {SENTENCES.map((_, i) => (
            <Pip key={i} index={i} active={active} reduced={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pip({
  index,
  active,
  reduced,
}: {
  index: number;
  active: MotionValue<number>;
  reduced: boolean;
}) {
  const distance = useTransform(active, (a) => Math.abs(a - index));
  const opacity = useTransform(distance, [0, 0.5, 1], [1, 0.5, 0.25]);
  const width = useTransform(distance, [0, 0.5, 1], [22, 12, 6]);

  return (
    <motion.span
      className="block h-[3px] rounded-full"
      style={{
        backgroundColor: "var(--teal)",
        opacity: reduced ? (index === 0 ? 1 : 0.25) : opacity,
        width: reduced ? 6 : width,
      }}
    />
  );
}
