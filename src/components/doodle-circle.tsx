"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

type DoodleStyle = "circle" | "underline" | "scribble";

interface DoodleCircleProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  className?: string;
  /** Doodle shape style */
  style?: DoodleStyle;
  /** Which path variant (1-3) */
  variant?: 1 | 2 | 3;
  /** Min interval between appearances in ms */
  intervalMin?: number;
  /** Max interval between appearances in ms */
  intervalMax?: number;
  /** How long the doodle stays visible in ms */
  duration?: number;
}

// Hand-drawn circle paths
const circlePaths = [
  "M 8 50 C 8 20, 30 4, 55 4 C 80 4, 98 18, 98 45 C 98 72, 82 96, 52 96 C 22 96, 6 78, 8 50 Z",
  "M 10 48 C 12 18, 35 2, 54 3 C 76 5, 96 22, 95 50 C 94 76, 74 97, 48 96 C 20 95, 5 74, 10 48 Z",
  "M 6 52 C 4 22, 28 2, 52 3 C 78 4, 97 20, 96 48 C 95 78, 76 98, 50 97 C 24 96, 8 80, 6 52 Z",
];

// Underline paths — wobbly single lines beneath text
const underlinePaths = [
  "M 2 5 C 15 2, 35 8, 50 4 C 65 0, 85 7, 98 5",
  "M 2 4 Q 25 8, 50 3 Q 75 -1, 98 5",
  "M 3 6 C 20 1, 40 7, 55 3 C 70 -1, 90 6, 97 4",
];

// Scribble paths — quick messy scratch marks
const scribblePaths = [
  "M 5 6 C 20 1, 40 9, 55 3 C 70 -2, 85 8, 95 4 M 8 8 C 25 3, 50 10, 75 4 C 88 1, 95 7, 97 6",
  "M 3 5 Q 30 -1, 50 6 Q 70 12, 97 4 M 5 7 Q 35 2, 60 8 Q 80 12, 95 5",
  "M 4 4 C 30 8, 55 1, 80 6 C 90 8, 96 3, 98 5 M 6 7 C 25 4, 50 9, 75 5 C 90 2, 97 7, 98 6",
];

function getPathConfig(style: DoodleStyle, variant: number) {
  switch (style) {
    case "underline":
      return {
        path: underlinePaths[(variant - 1) % underlinePaths.length],
        viewBox: "0 0 100 10",
        position: { bottom: "-6px", left: "-2%", width: "104%", height: "clamp(10px, 0.6em, 18px)" } as const,
      };
    case "scribble":
      return {
        path: scribblePaths[(variant - 1) % scribblePaths.length],
        viewBox: "0 0 100 14",
        position: { bottom: "-4px", left: "-2%", width: "104%", height: "clamp(8px, 0.5em, 14px)" } as const,
      };
    case "circle":
    default:
      return {
        path: circlePaths[(variant - 1) % circlePaths.length],
        viewBox: "0 0 100 100",
        position: { top: "-12%", left: "-8%", width: "116%", height: "124%" } as const,
      };
  }
}

export function DoodleCircle({
  children,
  color = "var(--lime)",
  strokeWidth = 2.5,
  delay = 0,
  className = "",
  style: doodleStyle = "circle",
  variant = 1,
  intervalMin = 8000,
  intervalMax = 16000,
  duration = 1400,
}: DoodleCircleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [visible, setVisible] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [activeStyle, setActiveStyle] = useState<DoodleStyle>(doodleStyle);
  const [activeVariant, setActiveVariant] = useState(variant);

  const triggerDoodle = useCallback(() => {
    // Randomly pick a new style and variant each time
    const styles: DoodleStyle[] = ["circle", "underline", "scribble"];
    setActiveStyle(styles[Math.floor(Math.random() * styles.length)]);
    setActiveVariant((Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3);
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), duration);
    return hideTimer;
  }, [duration]);

  // First appearance when scrolled into view
  useEffect(() => {
    if (!isInView || hasPlayedOnce) return;
    const timer = setTimeout(() => {
      setHasPlayedOnce(true);
      triggerDoodle();
    }, (delay + 0.5) * 1000);
    return () => clearTimeout(timer);
  }, [isInView, hasPlayedOnce, delay, triggerDoodle]);

  // Recurring appearances — long random intervals
  useEffect(() => {
    if (!isInView || !hasPlayedOnce) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const scheduleNext = () => {
      const interval = intervalMin + Math.random() * (intervalMax - intervalMin);
      return setTimeout(() => {
        const hideTimer = triggerDoodle();
        const nextTimer = scheduleNext();
        timers.push(hideTimer, nextTimer);
      }, interval);
    };

    const first = scheduleNext();
    timers.push(first);
    return () => timers.forEach(clearTimeout);
  }, [isInView, hasPlayedOnce, intervalMin, intervalMax, triggerDoodle]);

  const { path, viewBox, position } = getPathConfig(activeStyle, activeVariant);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Doodle renders behind the text */}
      <AnimatePresence>
        {visible && (
          <motion.svg
            className="pointer-events-none absolute"
            style={{ ...position, zIndex: 0 }}
            viewBox={viewBox}
            preserveAspectRatio="none"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 } }}
          >
            <motion.path
              d={path}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{
                pathLength: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      {/* Text on top */}
      <span className="relative" style={{ zIndex: 1 }}>{children}</span>
    </span>
  );
}
