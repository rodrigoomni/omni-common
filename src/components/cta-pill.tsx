"use client";

import { MagneticButton } from "./magnetic-button";

export interface CtaPillProps {
  href: string;
  label: string;
  /** Pill fill color */
  pillColor?: string;
  /** Pill text color */
  textColor?: string;
  /** Circular badge (right notch) background color */
  badgeColor?: string;
  /** Arrow icon color inside the badge */
  arrowColor?: string;
  /** Pill border color */
  borderColor?: string;
  /** Hard drop-shadow color (offset 5px 5px 0) */
  shadowColor?: string;
  /** Optional soft glow color around the badge */
  glowColor?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Reusable CTA pill: a lime-style pill with an attached circular arrow badge.
 * Color knobs let it be reskinned for other sections (e.g. dark on light, etc.).
 */
export function CtaPill({
  href,
  label,
  pillColor = "#CFFC68",
  textColor = "#0A2B47",
  badgeColor = "#0A2B47",
  arrowColor = "#FFFFFF",
  borderColor = "#FFFFFF",
  shadowColor = "#FFFFFF",
  glowColor = "rgba(207,252,104,0.35)",
  className = "",
  onClick,
}: CtaPillProps) {
  return (
    <MagneticButton strength={0.2}>
      <a
        href={href}
        onClick={onClick}
        className={`cta-pill group relative inline-flex items-center gap-[4px] rounded-full p-[4px] active:scale-[0.97] transition-transform ${className}`}
        style={{
          backgroundColor: pillColor,
          border: `1px solid ${borderColor}`,
          boxShadow: `5px 5px 0 0 ${shadowColor}`,
        }}
      >
        <span
          className="flex items-center justify-center pl-[24px] pr-[8px]"
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 500,
            color: textColor,
            fontSize: "20px",
            lineHeight: "20px",
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </span>
        <span
          className="cta-pill__badge relative flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[45deg]"
          style={{
            backgroundColor: badgeColor,
            filter: `drop-shadow(0 0 15.9px ${glowColor})`,
          }}
          aria-hidden
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke={arrowColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </MagneticButton>
  );
}
