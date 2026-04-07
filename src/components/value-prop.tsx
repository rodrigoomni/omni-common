"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { DoodleCircle } from "./doodle-circle";

// Inline SVG illustrations
function GlobeIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="22" fill="#A5FDF3" opacity="0.3" />
      <circle cx="28" cy="28" r="18" stroke="var(--teal)" strokeWidth="2" fill="none" />
      <ellipse cx="28" cy="28" rx="10" ry="18" stroke="var(--teal)" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="28" x2="46" y2="28" stroke="var(--teal)" strokeWidth="1.5" />
      <path d="M14 18 Q28 22 42 18" stroke="var(--teal)" strokeWidth="1.2" fill="none" />
      <path d="M14 38 Q28 34 42 38" stroke="var(--teal)" strokeWidth="1.2" fill="none" />
      <circle cx="40" cy="14" r="2.5" fill="var(--lime)" />
      <circle cx="42" cy="12" r="1.2" fill="var(--lime)" opacity="0.6" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="19" y="38" width="18" height="12" rx="3" fill="var(--teal)" />
      <rect x="17" y="36" width="22" height="4" rx="2" fill="var(--teal)" />
      <line x1="28" y1="36" x2="28" y2="22" stroke="#14545D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 28 C22 22 16 24 16 18 C22 18 26 22 28 28Z" fill="var(--lime)" />
      <path d="M28 24 C34 18 40 20 40 14 C34 14 30 18 28 24Z" fill="var(--lime)" />
      <path d="M28 32 C34 28 38 30 38 26 C34 26 30 28 28 32Z" fill="#A5FDF3" />
      <circle cx="20" cy="14" r="1.5" fill="var(--lime)" opacity="0.7" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M16 40 L16 22 L22 28" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 40 L28 16 L34 22" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 40 L40 10 L46 16" stroke="#A5FDF3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="44" x2="50" y2="44" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="18" r="2" fill="var(--lime)" />
      <circle cx="40" cy="6" r="2.5" fill="var(--lime)" />
      <circle cx="42" cy="4" r="1.2" fill="var(--lime)" opacity="0.5" />
    </svg>
  );
}

const capabilities = [
  {
    icon: GlobeIcon,
    title: "CEOs call us",
    desc: "We speak the language of growth, margins, and market share — not vanity metrics.",
    bg: "rgba(165,253,243,0.15)",
    dotColor: "var(--teal)",
  },
  {
    icon: PlantIcon,
    title: "CFOs love us",
    desc: "Every dollar is tracked, attributed, and optimized. Transparent ROI, always.",
    bg: "rgba(207,252,104,0.2)",
    dotColor: "var(--lime)",
  },
  {
    icon: ChartIcon,
    title: "CMOs want to be us",
    desc: "We architect the growth systems that in-house teams aspire to build.",
    bg: "rgba(20,84,93,0.06)",
    dotColor: "var(--foreground-subtle)",
  },
];

export function ValueProp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 md:py-36">
      <div className="site-container px-6 md:px-12 lg:px-24">
        {/* Two-column intro — original layout */}
        <motion.div
          ref={ref}
          className="grid gap-12 md:grid-cols-2 md:items-end md:gap-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              Why Omni Common
            </p>
            <h2
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight md:text-[2.75rem]"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              We Are Your{" "}
              <span style={{ color: "var(--teal)" }}>
                Chief Marketing{" "}
                <DoodleCircle color="var(--lime)" strokeWidth={2.5} delay={0.4} style="scribble" variant={2}>
                  Organization.
                </DoodleCircle>
              </span>
            </h2>
          </div>
          <div>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
            >
              We don&apos;t just run campaigns — we architect growth systems using a
              marketing mix model (MMM) approach and tactical data analysis to
              unify organic and paid channels into one cohesive engine.
            </p>
          </div>
        </motion.div>

        {/* Three cards — new rounded design with illustrations */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                className="group relative overflow-hidden rounded-[28px] px-8 pb-10 pt-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: cap.bg,
                  border: "1.5px solid var(--border-light)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Corner dot */}
                <div
                  className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cap.dotColor, opacity: 0.5 }}
                />
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                  <Icon />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                >
                  {cap.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                >
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-20 rounded-2xl px-8 py-12 text-center md:px-16"
          style={{ backgroundColor: "var(--teal)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-xl"
            style={{ fontFamily: "var(--font-encode)" }}
          >
            &ldquo;If your company has hit a plateau, struggles with fragmented
            marketing efforts, or is unsure how to scale efficiently —
            <span className="font-bold text-white"> you just found your growth partner.</span>&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
