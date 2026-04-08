"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";

type ElementType = "link" | "button" | "cta" | "card" | "image" | "info" | "logo" | "numeric" | "disabled" | "default";

// Vivid moods per interaction type
const MOODS = {
  default:  { fill: "#14545D", stroke: "#CFFC68" },
  link:     { fill: "#14545D", stroke: "#A5FDF3" },
  cta:      { fill: "#0A2B47", stroke: "#CFFC68" },
  button:   { fill: "#14545D", stroke: "#CFFC68" },
  card:     { fill: "#1A5C6B", stroke: "#A5FDF3" },
  image:    { fill: "#14545D", stroke: "#CFFC68" },
  info:     { fill: "#1A5C6B", stroke: "#CFFC68" },
  logo:     { fill: "#0A2B47", stroke: "#A5FDF3" },
  numeric:  { fill: "#14545D", stroke: "#A5FDF3" },
  disabled: { fill: "#2A4A5A", stroke: "#667788" },
} as const;

const DARK_MOOD = { fill: "#A5FDF3", stroke: "#CFFC68" };
const DARK_BLUE_MOOD = { fill: "#0A2B47", stroke: "#CFFC68" };

const MESSAGES: Record<ElementType, string[]> = {
  logo: ["← home", "back to start", "go home", "main page", "start over", "home base", "return"],
  cta: ["let's go", "do it", "take action", "start now", "get started", "make it happen", "ready?"],
  button: ["press me", "click", "tap", "interact", "trigger", "engage", "submit"],
  link: ["visit →", "explore", "open", "follow", "navigate", "see more", "discover"],
  card: ["view details", "more info", "explore", "peek inside", "case study", "learn more", "dive in"],
  image: ["view", "zoom in", "full size", "see image", "preview", "expand", "gallery"],
  info: ["details", "learn more", "context", "insight", "read more", "see how", "deep dive"],
  numeric: ["solid", "nice", "strong data", "impressive", "good numbers", "quality", "notable"],
  disabled: ["not yet", "hold on", "locked", "incomplete", "check inputs", "unavailable", "blocked"],
  default: [],
};

const MESSAGE_COOLDOWN = 600;

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [tagText, setTagText] = useState("");
  const [tagColors, setTagColors] = useState<{ bg: string; fg: string } | null>(null);
  const [mood, setMood] = useState<{ fill: string; stroke: string }>(MOODS.default);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationVal = useMotionValue(0);

  const lastHoverTarget = useRef<HTMLElement | null>(null);
  const lastMessageTime = useRef(0);
  const hoverCount = useRef(0);
  const baseMoodRef = useRef<{ fill: string; stroke: string }>(MOODS.default);

  const getElementType = useCallback((element: HTMLElement): ElementType => {
    const cursorType = element.getAttribute("data-cursor");
    if (cursorType === "link") return "link";
    if (cursorType === "button") return "button";
    if (cursorType === "cta") return "cta";
    if (cursorType === "card") return "card";
    if (cursorType === "image") return "image";
    if (cursorType === "info") return "info";
    if (cursorType === "logo") return "logo";
    if (cursorType === "numeric") return "numeric";
    if (cursorType === "disabled") return "disabled";
    if (cursorType === "none") return "default";

    if (element.closest("[data-cursor='pointer']")) return "link";

    if (element.hasAttribute("disabled") ||
        element.closest("[disabled]") ||
        element.closest("[aria-disabled='true']") ||
        element.closest(".disabled") ||
        element.closest("[class*='disabled']")) return "disabled";

    if (element.closest("[class*='logo']") ||
        element.closest("[data-logo]") ||
        element.closest(".logo") ||
        element.closest("[class*='brand']") ||
        element.closest(".site-logo")) return "logo";

    if (element.closest("[class*='stat']") ||
        element.closest("[class*='metric']") ||
        element.closest("[class*='number']") ||
        element.closest("[class*='counter']") ||
        element.closest("[class*='figure']") ||
        element.closest("[data-numeric]")) return "numeric";

    if (element.closest(".cta-manic") ||
        element.closest(".magnetic-button") ||
        element.closest("[class*='cta']") ||
        element.closest("[class*='btn']")) return "cta";

    if (element.tagName === "BUTTON" || element.closest("button")) return "button";
    if (element.tagName === "A" || element.closest("a")) return "link";

    if (element.closest(".card") ||
        element.closest("[class*='card']") ||
        element.closest("[class*='case-study']")) return "card";

    if (element.tagName === "IMG" || element.closest("img")) return "image";

    return "default";
  }, []);

  const getMessage = useCallback((type: ElementType, element: HTMLElement): string => {
    // Check for contextual hint from data attribute first
    const hint = element.closest("[data-cursor-hint]")?.getAttribute("data-cursor-hint");
    if (hint) return hint;

    const pool = MESSAGES[type];
    if (!pool || pool.length === 0) return "";
    return pool[hoverCount.current % pool.length];
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setWiggle(false);
    idleTimer.current = setTimeout(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 1500);
    }, 3500);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      resetIdleTimer();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], .cta-manic, .magnetic-button, .card, [class*='card']") as HTMLElement | null;
      const anchorEl = interactive || target;

      const now = Date.now();
      if (anchorEl === lastHoverTarget.current && now - lastMessageTime.current < MESSAGE_COOLDOWN) {
        return;
      }

      const elementType = getElementType(target);
      if (elementType === "default") {
        setHovered(false);
        lastHoverTarget.current = null;
        return;
      }

      const isNewElement = anchorEl !== lastHoverTarget.current;
      lastHoverTarget.current = anchorEl;

      setHovered(true);
      setMood(MOODS[elementType]);

      // Check for custom tag colors (brand-specific)
      const cursorFillEl = anchorEl.closest("[data-cursor-fill]");
      if (cursorFillEl) {
        const customBg = cursorFillEl.getAttribute("data-cursor-fill");
        const customFg = cursorFillEl.getAttribute("data-cursor-stroke");
        if (customBg && customFg) {
          setTagColors({ bg: customBg, fg: customFg });
        } else {
          setTagColors(null);
        }
      } else {
        setTagColors(null);
      }

      if (isNewElement || now - lastMessageTime.current >= MESSAGE_COOLDOWN) {
        setTagText(getMessage(elementType, target));
        hoverCount.current++;
        lastMessageTime.current = now;
      }

      if (isNewElement) {
        animate(rotationVal, [0, -12, 6, -3, 0], { duration: 0.45, ease: "easeOut" });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement | null;

      if (relatedTarget && lastHoverTarget.current) {
        if (lastHoverTarget.current.contains(relatedTarget)) return;
      }

      const elementType = getElementType(target);
      if (elementType !== "default") {
        setHovered(false);
        lastHoverTarget.current = null;
        setMood(baseMoodRef.current);
        setTagColors(null);
        animate(rotationVal, [0, 5, -2, 0], { duration: 0.3, ease: "easeOut" });
      }
    };

    const down = () => {
      setClicking(true);
      animate(rotationVal, [0, -6, 3, 0], { duration: 0.12, ease: "easeOut" });
    };
    const up = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const sections = document.querySelectorAll("section, [data-section]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hovered) {
              const bg = getComputedStyle(entry.target).backgroundColor;
              if (bg) {
                let newMood;
                if (bg.includes("10, 43, 71")) newMood = DARK_BLUE_MOOD;
                else if (bg.includes("20, 84, 93")) newMood = DARK_MOOD;
                else newMood = MOODS.default;
                baseMoodRef.current = newMood;
                setMood(newMood);
              }
            }
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(section);
      observers.push(obs);
    });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      observers.forEach((o) => o.disconnect());
    };
  }, [cursorX, cursorY, resetIdleTimer, rotationVal, getElementType, getMessage, hovered]);

  if (isTouch) return null;

  return (
    <>
      {/* Main pointer */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001]"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicking ? 0.85 : hovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      >
        <motion.svg
          width="24"
          height="30"
          viewBox="0 0 26 32"
          fill="none"
          style={{ marginLeft: "-1px", marginTop: "-1px", rotate: rotationVal }}
        >
          <motion.path
            d="M 2 1 L 2 26 L 7.5 20.5 L 13.5 31 L 17.5 29 L 11.5 18.5 L 20 18.5 Z"
            fill="none"
            className="transition-colors duration-300"
            stroke={mood.stroke}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="3 0"
            animate={{
              strokeDashoffset: [0, -80],
              strokeWidth: [2.2, 2.6, 2.2],
            }}
            transition={{
              strokeDashoffset: { duration: 8, repeat: Infinity, ease: "linear" },
              strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <path
            d="M 2 1 L 2 26 L 7.5 20.5 L 13.5 31 L 17.5 29 L 11.5 18.5 L 20 18.5 Z"
            className="transition-colors duration-300"
            fill={mood.fill}
            stroke="none"
          />
        </motion.svg>

        {/* Tag — fixed offset from cursor, no spring delay */}
        <motion.div
          className="absolute left-6 top-7"
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.7,
            y: hovered ? 0 : 4,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <div
            className="whitespace-nowrap rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider transition-colors duration-200"
            style={{
              backgroundColor: tagColors?.bg ?? "rgba(20,84,93,0.9)",
              color: tagColors?.fg ?? "#fff",
            }}
          >
            {tagText}
          </div>
        </motion.div>

        {/* Idle wiggle sparkles */}
        {wiggle && (
          <>
            <motion.svg
              className="absolute" width="14" height="8" viewBox="0 0 14 8"
              style={{ top: -6, left: 14 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.path
                d="M 1 4 Q 3 1, 5 4 Q 7 7, 9 4 Q 11 1, 13 4"
                fill="none" stroke={mood.stroke} strokeWidth="1.2" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.svg>
            <motion.svg
              className="absolute" width="10" height="10" viewBox="0 0 10 10"
              style={{ top: -3, left: -4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.path
                d="M 5 1 Q 7 3, 5 5 Q 3 7, 5 9"
                fill="none" stroke={mood.fill} strokeWidth="1" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              />
            </motion.svg>
            <motion.svg
              className="absolute" width="8" height="8" viewBox="0 0 8 8"
              style={{ top: -8, left: 8 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 90] }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            >
              <line x1="4" y1="0" x2="4" y2="8" stroke={mood.stroke} strokeWidth="1" strokeLinecap="round" />
              <line x1="0" y1="4" x2="8" y2="4" stroke={mood.stroke} strokeWidth="1" strokeLinecap="round" />
            </motion.svg>
          </>
        )}
      </motion.div>
    </>
  );
}
