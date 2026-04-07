"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

// Small inline SVG shapes — playful, colorful doodle-style icons
function ShapeIcon({ shape, color }: { shape: string; color: string }) {
  const size = 16;
  switch (shape) {
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill={color} />
        </svg>
      );
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <circle cx="10" cy="10" r="7" fill={color} />
        </svg>
      );
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 17C10 17 3 12 3 7.5C3 5 5 3 7 3C8.5 3 9.5 4 10 5C10.5 4 11.5 3 13 3C15 3 17 5 17 7.5C17 12 10 17 10 17Z" fill={color} />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 2L18 10L10 18L2 10L10 2Z" fill={color} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 3L18 17H2L10 3Z" fill={color} />
        </svg>
      );
    case "squiggle":
      return (
        <svg width={size + 2} height={size} viewBox="0 0 22 20" fill="none" className="inline-block">
          <path d="M2 10C4 5 8 5 10 10C12 15 16 15 18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "bolt":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M11 2L5 11H10L9 18L15 9H10L11 2Z" fill={color} />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 4V16M4 10H16" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "halfmoon":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M12 3C9 3 5 6 5 10C5 14 9 17 12 17C9 15 8 12 8 10C8 8 9 5 12 3Z" fill={color} />
        </svg>
      );
    case "drop":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 3C10 3 5 9 5 13C5 16 7 18 10 18C13 18 15 16 15 13C15 9 10 3 10 3Z" fill={color} />
        </svg>
      );
    case "semicircle":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M3 14C3 8 6 4 10 4C14 4 17 8 17 14" fill={color} />
        </svg>
      );
    case "spark":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <path d="M10 2L11.5 8L18 10L11.5 12L10 18L8.5 12L2 10L8.5 8L10 2Z" fill={color} />
        </svg>
      );
    case "bars":
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <rect x="3" y="10" width="4" height="8" rx="1" fill={color} />
          <rect x="8" y="6" width="4" height="12" rx="1" fill={color} />
          <rect x="13" y="3" width="4" height="15" rx="1" fill={color} />
        </svg>
      );
    case "eye":
      return (
        <svg width={size + 2} height={size} viewBox="0 0 22 20" fill="none" className="inline-block">
          <path d="M2 10C5 5 9 4 11 4C13 4 17 5 20 10C17 15 13 16 11 16C9 16 5 15 2 10Z" fill={color} />
          <circle cx="11" cy="10" r="3" fill="white" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="inline-block">
          <circle cx="10" cy="10" r="6" fill={color} />
        </svg>
      );
  }
}

const services: { label: string; shape: string; color: string }[] = [
  { label: "Content",       shape: "squiggle",   color: "#CFFC68" },
  { label: "Social Media",  shape: "heart",      color: "#FF7EB3" },
  { label: "Paid Ads",      shape: "bolt",       color: "#FFB347" },
  { label: "Analytics",     shape: "bars",       color: "#A5FDF3" },
  { label: "PR",            shape: "diamond",    color: "#7CC6FE" },
  { label: "Lead Gen",      shape: "triangle",   color: "#FF6B6B" },
  { label: "Automation",    shape: "spark",      color: "#C4B5FD" },
  { label: "Partnerships",  shape: "circle",     color: "#34D399" },
  { label: "UX Design",     shape: "halfmoon",   color: "#FCD34D" },
  { label: "Innovation",    shape: "star",       color: "#CFFC68" },
  { label: "Optimization",  shape: "eye",        color: "#A5FDF3" },
  { label: "SEO",           shape: "cross",      color: "#FB923C" },
  { label: "Branding",      shape: "drop",       color: "#F472B6" },
  { label: "Strategy",      shape: "semicircle", color: "#14545D" },
];

export function Marquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref}>
      {/* Scrolling ticker */}
      <div className="overflow-hidden py-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...services, ...services].map((item, i) => (
            <span
              key={i}
              className="mx-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
            >
              <ShapeIcon shape={item.shape} color={item.color} />
              {item.label}
              <span className="ml-3" style={{ color: "var(--border)" }}>
                /
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
