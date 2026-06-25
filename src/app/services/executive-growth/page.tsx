"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { HeroGrid } from "@/components/hero-grid";
import { ConfettiSimple } from "@/components/confetti-simple";
import { MagneticButton } from "@/components/magnetic-button";
import { Marquee } from "@/components/marquee";
import { ValueProp } from "@/components/value-prop";
import { Footer } from "@/components/footer";

// ── Shared helpers ──────────────────────────────────────────────────────────

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PropositionCard({
  title,
  body,
  tags,
  index,
  dark = false,
}: {
  title: string;
  body: string;
  tags: string[];
  index: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.1)" : "var(--border)",
        backgroundColor: dark ? "rgba(255,255,255,0.04)" : "var(--surface-raised)",
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: dark ? "var(--mint)" : "var(--teal)" }}>
          <ArrowUpRight />
        </span>
        <h3
          className="text-lg font-bold tracking-tight md:text-xl"
          style={{
            fontFamily: "var(--font-archivo)",
            color: dark ? "#fff" : "var(--foreground)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="mt-4 text-sm leading-relaxed md:text-[15px]"
        style={{
          fontFamily: "var(--font-encode)",
          color: dark ? "rgba(255,255,255,0.6)" : "var(--foreground-muted)",
        }}
      >
        {body}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide"
            style={{
              fontFamily: "var(--font-inter)",
              borderColor: dark ? "rgba(165,253,243,0.35)" : "var(--border)",
              color: dark ? "var(--mint)" : "var(--foreground-secondary)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── 1. Hero ─────────────────────────────────────────────────────────────────

function ExecutiveGrowthHero() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section
      className="fixed inset-0 flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#0A2B47", zIndex: 0 }}
      data-theme="dark"
    >
      <HeroGrid />
      <ConfettiSimple />

      <motion.div
        className="relative z-10 w-full px-6 text-center md:px-12"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        <div>
          <motion.h1
            className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-archivo)", color: "rgba(255,255,255,0.95)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Grow your brand(s),
          </motion.h1>
        </div>
        <div>
          <motion.h1
            className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--lime)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            according to plan.
          </motion.h1>
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base font-normal leading-relaxed md:text-lg"
          style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.55)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          Omnichannel growth without limits — executive-level strategy and execution
          for e-commerce, SaaS, and marketplace brands that are done guessing.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="/contact"
              className="cta-manic group relative inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold transition-all"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--lime)",
                color: "#0A2B47",
                boxShadow: "0 0 30px rgba(207,252,104,0.2)",
              }}
            >
              <span
                className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                style={{
                  boxShadow:
                    "0 0 20px rgba(207,252,104,0.5), 0 0 40px rgba(207,252,104,0.3), 0 0 60px rgba(207,252,104,0.15)",
                }}
              />
              <span className="relative">Get Your Growth Model</span>
              <span className="relative inline-block transition-transform group-hover:translate-x-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Shimmer sweep on load */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
}

// ── 2. Differentiator (1+1=3) ───────────────────────────────────────────────

const PILLARS = [
  {
    metric: "360°",
    title: "Intelligence First",
    desc: "Before we spend a dollar, we know exactly what's driving your revenue and where you're leaking it. AI-assisted audit across every platform you run.",
  },
  {
    metric: "3×",
    title: "Compounding Channels",
    desc: "SEO feeds paid. Paid amplifies content. Content earns links. Every channel we run compounds the others — that's why combined always beats siloed.",
  },
  {
    metric: "0",
    title: "Senior-Led Always",
    desc: "No hand-offs. No juniors running your account while the pitch team disappears. The strategist who builds your model executes it.",
  },
];

function DifferentiatorBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Decorative accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-6 select-none font-black leading-none"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "clamp(5rem,14vw,10rem)",
          color: "var(--lime)",
          opacity: 0.07,
          lineHeight: 1,
        }}
      >
        1+1=3
      </span>

      <div ref={ref} className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            Our Differentiation
          </p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-bold md:text-5xl"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--foreground)",
              letterSpacing: "-0.03em",
            }}
          >
            The whole is greater
            <br />
            <span style={{ color: "var(--teal)" }}>than the sum of its parts.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="flex flex-col"
              style={{ borderLeft: "3px solid var(--teal)", paddingLeft: "1.5rem" }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Embossed metric — lime accent bar + emboss */}
              <div className="relative w-max select-none">
                <motion.div
                  className="absolute rounded-md"
                  style={{
                    backgroundColor: "var(--lime)",
                    top: "18%",
                    left: "-6px",
                    width: "110%",
                    height: "40%",
                    zIndex: 0,
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <span
                  className="relative block font-black leading-none"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "clamp(3.5rem,6.5vw,5rem)",
                    color: "rgba(225, 255, 130, 0.95)",
                    WebkitTextStroke: "1.5px rgba(26, 122, 122, 0.45)",
                    filter:
                      "drop-shadow(5px 6px 8px rgba(26, 122, 122, 0.25)) drop-shadow(-2px -2px 3px rgba(255,255,255,0.85))",
                    letterSpacing: "-0.05em",
                    zIndex: 1,
                  }}
                >
                  {pillar.metric}
                </span>
              </div>

              <h3
                className="mt-5 text-lg font-bold tracking-tight md:text-xl"
                style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
              >
                {pillar.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Credibility bar */}
        <motion.div
          className="mt-16 flex flex-wrap items-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            "E-commerce · $5M–$50M",
            "SaaS · $5M–$50M",
            "Marketplace Brands",
          ].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{
                fontFamily: "var(--font-inter)",
                borderColor: "var(--border)",
                color: "var(--foreground-muted)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--teal)" }}
              />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 4. Pain Points ──────────────────────────────────────────────────────────

function ImageBox({
  src,
  alt,
  aspectRatio = "16/10",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio, backgroundColor: "rgba(20,84,93,0.04)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function ImagePlaceholder({
  label,
  aspectRatio = "16/10",
  variant = "light",
  accent,
}: {
  label: string;
  aspectRatio?: string;
  variant?: "light" | "dark" | "tinted";
  accent?: string;
}) {
  const bgMap = {
    light: { bg: "rgba(20,84,93,0.04)", border: "rgba(20,84,93,0.18)", text: "var(--teal)" },
    dark: { bg: "rgba(10,43,71,0.85)", border: "rgba(255,255,255,0.18)", text: "rgba(255,255,255,0.55)" },
    tinted: { bg: "rgba(207,252,104,0.12)", border: "rgba(20,84,93,0.25)", text: "var(--teal)" },
  };
  const colors = bgMap[variant];
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl"
      style={{
        aspectRatio,
        backgroundColor: colors.bg,
        border: `1.5px dashed ${colors.border}`,
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 14px, ${
          accent ? accent + "0d" : "rgba(20,84,93,0.025)"
        } 14px, ${accent ? accent + "0d" : "rgba(20,84,93,0.025)"} 28px)`,
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: colors.text, opacity: 0.5 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)", color: colors.text, opacity: 0.85 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

const PAIN_POINTS = [
  {
    title: "Spend Misalignment",
    body: "Running paid channels but can't tell if your LTV:CAC is healthy or which campaigns are driving real profit.",
    tags: ["PPC", "Google Ads", "Meta", "Attribution"],
    stat: "73%",
    statLabel: "of paid budgets misallocated at audit",
    image: "/images/pain-points/spend.png",
    imageAlt: "Dashboard showing misaligned paid spend",
  },
  {
    title: "Declining Organic Search",
    body: "Traffic is dropping while technical debt piles up and AI results push you further down the page.",
    tags: ["Technical SEO", "GEO", "Content"],
    stat: "−42%",
    statLabel: "avg. organic decline post-AI rollout",
    imageLabel: "Illustration: SERP / AI Overview",
  },
  {
    title: "No Clear Attribution",
    body: "Multiple agencies, siloed data, and nobody can tell you what's actually driving revenue.",
    tags: ["GA4", "Multi-Touch", "Revenue"],
    image: "/images/pain-points/data.png",
    imageAlt: "Tangled multi-source attribution data",
  },
  {
    title: "Rising Customer Acquisition Cost",
    body: "Every channel is getting more expensive and nothing is compounding. You need them working together.",
    tags: ["CRO", "UX", "Paid + SEO Overlap"],
    image: "/images/pain-points/cac.png",
    imageAlt: "Rising customer acquisition cost",
  },
  {
    title: "Stalled Growth Curve",
    body: "You've hit a plateau. The tactics that got you here won't get you to the next stage.",
    tags: ["Growth Strategy", "Channel Mix"],
    image: "/images/pain-points/plateau.png",
    imageAlt: "Stalled growth plateau curve",
  },
  {
    title: "Junior-Heavy Execution",
    body: "You pitched with a senior team, then got handed off to someone who just started. We don't do that.",
    tags: ["Senior Strategists", "Direct Access"],
    quote: "“Who's actually running this account again?”",
  },
];

function PainPointsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const cardBase =
    "group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 md:p-7 transition-transform duration-500 hover:-translate-y-1";
  const borderStyle = { borderColor: "var(--border)" };

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      {/* Subtle ambient grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,84,93,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,84,93,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      <div className="relative site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--lime)" }}
              />
              Sound Familiar?
            </p>
            <h2
              className="mt-3 text-3xl font-bold md:text-5xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
              }}
            >
              Pain points we
              <br />
              <span style={{ color: "var(--teal)" }}>solve every day.</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed md:text-right"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          >
            You don&apos;t need more services. You need one system that makes all of
            them work together — and a senior team that actually runs it.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {/* Card A — Hero featured card, span-8 */}
          <motion.div
            className={cardBase + " md:col-span-8 md:row-span-2"}
            style={borderStyle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageBox
              src={PAIN_POINTS[0].image!}
              alt={PAIN_POINTS[0].imageAlt!}
              aspectRatio="16/9"
            />
            <div className="mt-6 flex items-start gap-3">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              >
                01 · Spend
              </span>
            </div>
            <h3
              className="mt-2 text-2xl font-bold tracking-tight md:text-3xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              {PAIN_POINTS[0].title}
            </h3>
            <p
              className="mt-3 max-w-xl text-sm leading-relaxed md:text-base"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-muted)",
              }}
            >
              {PAIN_POINTS[0].body}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "clamp(2rem,3.5vw,2.75rem)",
                    color: "var(--teal)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {PAIN_POINTS[0].stat}
                </span>
                <span
                  className="text-xs leading-snug"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  {PAIN_POINTS[0].statLabel}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PAIN_POINTS[0].tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "var(--border)",
                    color: "var(--foreground-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card B — Stat callout, span-4 */}
          <motion.div
            className={cardBase + " md:col-span-4"}
            style={{
              ...borderStyle,
              backgroundColor: "var(--navy)",
              borderColor: "transparent",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
            >
              02 · Search
            </span>
            <span
              className="mt-4 block font-black leading-none"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(3.5rem,7vw,5rem)",
                color: "var(--lime)",
                letterSpacing: "-0.05em",
              }}
            >
              {PAIN_POINTS[1].stat}
            </span>
            <p
              className="mt-2 text-xs uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {PAIN_POINTS[1].statLabel}
            </p>

            <h3
              className="mt-6 text-xl font-bold tracking-tight md:text-2xl"
              style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
            >
              {PAIN_POINTS[1].title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {PAIN_POINTS[1].body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PAIN_POINTS[1].tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(165,253,243,0.35)",
                    color: "var(--mint)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card C — Attribution: image left, text right, span-4 */}
          <motion.div
            className={cardBase + " md:col-span-4"}
            style={borderStyle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageBox
              src={PAIN_POINTS[2].image!}
              alt={PAIN_POINTS[2].imageAlt!}
              aspectRatio="4/3"
            />
            <span
              className="mt-5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              03 · Data
            </span>
            <h3
              className="mt-2 text-xl font-bold tracking-tight md:text-2xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              {PAIN_POINTS[2].title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              {PAIN_POINTS[2].body}
            </p>
          </motion.div>

          {/* Card D — Full-width horizontal feature card, span-12 */}
          <motion.div
            className={cardBase + " md:col-span-12"}
            style={borderStyle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              <div className="md:w-1/2 md:flex-shrink-0 lg:w-2/5">
                <ImageBox
                  src={PAIN_POINTS[3].image!}
                  alt={PAIN_POINTS[3].imageAlt!}
                  aspectRatio="16/9"
                />
              </div>
              <div className="flex-1">
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
                >
                  04 · CAC
                </span>
                <h3
                  className="mt-2 text-2xl font-bold tracking-tight md:text-3xl"
                  style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                >
                  {PAIN_POINTS[3].title}
                </h3>
                <p
                  className="mt-3 max-w-xl text-sm leading-relaxed md:text-base"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  {PAIN_POINTS[3].body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {PAIN_POINTS[3].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide"
                      style={{
                        fontFamily: "var(--font-inter)",
                        borderColor: "var(--border)",
                        color: "var(--foreground-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card F — Quote-style card (left), span-7 */}
          <motion.div
            className={cardBase + " md:col-span-7 md:justify-center"}
            style={{
              ...borderStyle,
              backgroundColor: "var(--cream)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              06 · Team
            </span>
            <p
              className="mt-4 font-bold leading-tight"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(1.5rem,3vw,2.25rem)",
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
              }}
            >
              {PAIN_POINTS[5].quote}
            </p>
            <h3
              className="mt-6 text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--teal)" }}
            >
              {PAIN_POINTS[5].title}
            </h3>
            <p
              className="mt-2 max-w-md text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              {PAIN_POINTS[5].body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PAIN_POINTS[5].tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(20,84,93,0.25)",
                    color: "var(--teal)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card E — Stalled growth: illustration on top (right), span-5 */}
          <motion.div
            className={cardBase + " md:col-span-5"}
            style={borderStyle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageBox
              src={PAIN_POINTS[4].image!}
              alt={PAIN_POINTS[4].imageAlt!}
              aspectRatio="2/1"
            />
            <span
              className="mt-5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              05 · Plateau
            </span>
            <h3
              className="mt-2 text-xl font-bold tracking-tight md:text-2xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              {PAIN_POINTS[4].title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              {PAIN_POINTS[4].body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 5. Approach (ivory / cream) ─────────────────────────────────────────────

const STEP_VISUAL = {
  accent: "var(--lime)",
  textColor: "rgba(225, 255, 130, 0.95)",
  strokeColor: "rgba(26, 122, 122, 0.45)",
} as const;

const APPROACH_STEPS = [
  {
    number: "01",
    ...STEP_VISUAL,
    title: "Intelligence Engine",
    description:
      "We pull data from GA4, Search Console, Ads, Shopify, Meta, Klaviyo, and HubSpot — then build one clear picture. AI-assisted analysis, interpreted by senior strategists.",
    tags: ["Data Audit", "AI Analysis", "Gap Mapping"],
  },
  {
    number: "02",
    ...STEP_VISUAL,
    title: "Growth Strategy",
    description:
      "Senior strategists map your exact channel mix, budget allocation, and 90-day growth plan — all tied to projected ROI.",
    tags: ["Channel Mix", "Budget Allocation", "90-Day Roadmap"],
  },
  {
    number: "03",
    ...STEP_VISUAL,
    title: "Omnichannel Execution",
    description:
      "We run all channels under one strategy so they compound, not compete. Every tactic feeds the next.",
    tags: ["SEO", "PPC", "Content", "CRO", "Digital PR"],
  },
  {
    number: "04",
    ...STEP_VISUAL,
    title: "Attribution & Compounding",
    description:
      "Continuous measurement, reinvestment into what works, and a growth system that keeps accelerating quarter over quarter.",
    tags: ["Attribution", "ROI Tracking", "Optimization"],
  },
];

function ApproachStepRow({
  step,
  index,
}: {
  step: (typeof APPROACH_STEPS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col gap-6 py-12 md:flex-row md:items-start md:gap-12 lg:gap-16"
      style={{ borderBottom: "1px solid rgba(10,43,71,0.10)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Big number — embossed with accent bar behind */}
      <div className="relative w-max flex-shrink-0 select-none">
        {/* Accent bar behind the number */}
        <motion.div
          className="absolute rounded-md"
          style={{
            backgroundColor: step.accent,
            top: "18%",
            left: "-6px",
            width: "110%",
            height: "40%",
            zIndex: 0,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          className="relative block font-black leading-none"
          style={{
            fontSize: "clamp(7.5rem, 15vw, 11rem)",
            fontFamily: "var(--font-archivo)",
            color: step.textColor,
            WebkitTextStroke: `1.5px ${step.strokeColor}`,
            filter:
              "drop-shadow(6px 8px 10px rgba(26, 122, 122, 0.25)) drop-shadow(-2px -2px 4px rgba(255,255,255,0.85))",
            zIndex: 1,
            letterSpacing: "-0.06em",
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Title */}
      <div className="flex-shrink-0 md:w-52 md:pt-4">
        <h3
          className="text-2xl font-bold tracking-tight md:text-3xl"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
        >
          {step.title}
        </h3>
      </div>

      {/* Description + tags */}
      <div className="flex-1 md:pt-4">
        <p
          className="max-w-md text-sm leading-relaxed md:text-base"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
        >
          {step.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-inter)",
                borderColor: "var(--teal)",
                color: "var(--teal)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-28 md:py-36"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            How We Work
          </p>
          <h2
            className="mt-3 text-3xl font-bold md:text-5xl"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--foreground)",
              letterSpacing: "-0.03em",
            }}
          >
            Strategy meets
            <br />
            <span style={{ color: "var(--teal)" }}>execution.</span>
          </h2>
        </motion.div>

        <div>
          {APPROACH_STEPS.map((step, i) => (
            <ApproachStepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6. Services — Tabbed Showcase ───────────────────────────────────────────

type ServiceEntry = {
  short: string;
  title: string;
  body: string;
  tags: string[];
  deliverables: string[];
  metric: { value: string; label: string };
  image?: string;
  imageAlt?: string;
  imageLabel?: string;
};

const SERVICES_LIST: ServiceEntry[] = [
  {
    short: "Intelligence",
    title: "Intelligence Engine & Attribution",
    body: "Your growth audit and attribution model. We pull data from every platform — GA4, Search Console, Ads, Shopify, Meta, Klaviyo, HubSpot — and build one clear picture of what's driving revenue and what isn't.",
    tags: ["GA4", "Search Console", "Ads", "Shopify", "Multi-Touch"],
    deliverables: [
      "Full-funnel data audit across every platform",
      "AI-assisted attribution model",
      "Channel gap analysis & prioritization",
      "Quarterly reporting cadence",
    ],
    metric: { value: "1", label: "unified source of truth" },
    image: "/images/services/intelligence.jpg",
    imageAlt: "Monitor displaying business data and financial metrics",
  },
  {
    short: "SEO & GEO",
    title: "SEO & Generative Engine Optimization",
    body: "Technical SEO, content strategy, link building, and AI/LLM visibility — designed to own organic search on Google and emerging AI search surfaces like ChatGPT, Gemini, and Perplexity.",
    tags: ["Technical SEO", "Content", "Digital PR", "Link Building", "GEO"],
    deliverables: [
      "Technical site audit + fix roadmap",
      "Content strategy aligned to commercial intent",
      "Digital PR + high-authority link acquisition",
      "LLM/AI search visibility optimization",
    ],
    metric: { value: "3×", label: "avg. organic growth in 12mo" },
    image: "/images/services/seo.png",
    imageAlt: "SEO and GEO search visibility",
  },
  {
    short: "Paid Media",
    title: "Paid Media (PPC)",
    body: "Google Ads, Meta, paid social — managed under one strategy so every dollar spent is informed by what organic, content, and CRO are already learning. No siloed teams, no wasted budget.",
    tags: ["Google Ads", "Meta Ads", "Paid Social", "Budget Optimization"],
    deliverables: [
      "Channel-level budget allocation tied to LTV:CAC",
      "Cross-channel campaign architecture",
      "Creative testing framework",
      "Weekly performance reviews",
    ],
    metric: { value: "−38%", label: "blended CAC reduction" },
    image: "/images/services/paid-media.avif",
    imageAlt: "Paid media performance dashboard",
  },
  {
    short: "CRO & UX",
    title: "Conversion Rate Optimization",
    body: "UX analysis, landing page optimization, and funnel improvements that make every traffic source more profitable. The fastest lever in your growth stack — and the most ignored.",
    tags: ["CRO", "UX Optimization", "A/B Testing", "Funnel Analysis"],
    deliverables: [
      "Full funnel audit & friction mapping",
      "Landing page test roadmap",
      "Continuous A/B testing program",
      "UX recommendations tied to revenue impact",
    ],
    metric: { value: "+27%", label: "avg. lift in conversion rate" },
    imageLabel: "Mockup: A/B test comparison",
  },
  {
    short: "Content & PR",
    title: "Content Marketing & Digital PR",
    body: "Original content strategy, editorial calendars, and digital PR campaigns that earn high-authority links and drive qualified traffic. Built to compound with SEO and Paid.",
    tags: ["Content Strategy", "Editorial", "Digital PR", "Link Acquisition"],
    deliverables: [
      "Editorial calendar tied to commercial keywords",
      "Original research + thought leadership",
      "Digital PR & media outreach",
      "Newsjacking & reactive PR",
    ],
    metric: { value: "DA+", label: "earned link authority every quarter" },
    imageLabel: "Photo: editorial / press feature",
  },
  {
    short: "Strategy",
    title: "Growth Strategy & Consulting",
    body: "For teams that want senior thinking without full execution. We build the model, map the channels, and advise your in-house team on how to win — without the agency lock-in.",
    tags: ["Strategy", "Channel Mix", "Roadmap", "Advisor"],
    deliverables: [
      "90-day growth roadmap",
      "Channel mix recommendation",
      "Team structure & vendor advice",
      "Monthly strategy advisory calls",
    ],
    metric: { value: "1:1", label: "senior strategist access" },
    imageLabel: "Photo: strategy whiteboard / planning",
  },
];

function ServicesGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SERVICES_LIST[activeIdx];

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Decorative ambient gradient */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[60%] w-[60%] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(165,253,243,0.15), transparent 60%)",
        }}
      />

      <div className="relative site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--lime)" }}
              />
              What We Deliver
            </p>
            <h2
              className="mt-3 text-3xl font-bold md:text-5xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
              }}
            >
              Six services.
              <br />
              <span style={{ color: "var(--teal)" }}>One growth system.</span>
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              Each service stands on its own. They&apos;re designed to compound — the flywheel
              only spins when every channel feeds the next.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-60"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            See all service details
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>

        {/* Tab bar */}
        <div
          className="hide-scrollbar -mx-6 mb-8 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          role="tablist"
        >
          {SERVICES_LIST.map((s, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={s.short}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(i)}
                className="relative flex-shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: isActive ? "var(--teal)" : "var(--border)",
                  backgroundColor: isActive ? "var(--teal)" : "transparent",
                  color: isActive ? "#fff" : "var(--foreground-secondary)",
                }}
              >
                <span
                  className="mr-2 text-[10px] font-bold opacity-70"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.short}
              </button>
            );
          })}
        </div>

        {/* Active content panel */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 md:items-center">
          {/* Left — image placeholder with floating service number */}
          <div className="relative md:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx + "-img"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {active.image ? (
                  <ImageBox
                    src={active.image}
                    alt={active.imageAlt ?? active.title}
                    aspectRatio="4/5"
                  />
                ) : (
                  <ImagePlaceholder
                    label={active.imageLabel ?? active.title}
                    aspectRatio="4/5"
                    variant="tinted"
                    accent="#14545D"
                  />
                )}
                {/* Floating number badge */}
                <div
                  className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg md:h-20 md:w-20"
                  style={{
                    backgroundColor: "var(--navy)",
                    color: "var(--lime)",
                    fontFamily: "var(--font-archivo)",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(activeIdx + 1).padStart(2, "0")}
                </div>

                {/* Floating metric callout */}
                <div
                  className="absolute -bottom-4 -right-4 max-w-[55%] rounded-2xl border bg-white p-4 shadow-lg"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-black leading-none"
                      style={{
                        fontFamily: "var(--font-archivo)",
                        fontSize: "clamp(1.75rem,3vw,2.5rem)",
                        color: "var(--teal)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {active.metric.value}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[11px] leading-snug"
                    style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                  >
                    {active.metric.label}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — service detail */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx + "-content"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="text-2xl font-bold tracking-tight md:text-4xl"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {active.title}
                </h3>
                <p
                  className="mt-4 text-base leading-relaxed md:text-lg"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "var(--foreground-secondary)",
                  }}
                >
                  {active.body}
                </p>

                <div className="mt-8">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
                  >
                    What you get
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {active.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: "var(--lime)",
                            color: "var(--navy)",
                          }}
                        >
                          <CheckIcon />
                        </span>
                        <span
                          className="text-sm leading-snug"
                          style={{
                            fontFamily: "var(--font-encode)",
                            color: "var(--foreground-secondary)",
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-inter)",
                        borderColor: "var(--teal)",
                        color: "var(--teal)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

// ── 7. Growth Programs ──────────────────────────────────────────────────────

const PROGRAMS = [
  {
    topColor: "var(--teal)",
    title: "Intelligence + Strategy",
    badge: null,
    tagline: "Start with clarity.",
    desc: "The full data audit and channel roadmap that shows you exactly where your growth is — and where it isn't.",
    features: [
      "Full-funnel data audit",
      "Multi-channel gap analysis",
      "90-day growth roadmap",
      "Prioritized investment plan",
    ],
  },
  {
    topColor: "var(--lime)",
    title: "Full Growth System",
    badge: "Most Popular",
    tagline: "We run everything, together.",
    desc: "SEO, paid, content, CRO — all running under one integrated strategy, compounding as they go.",
    features: [
      "Everything in Intelligence + Strategy",
      "Channel execution (SEO / PPC / Content / CRO)",
      "Monthly attribution reporting",
      "Dedicated senior strategist",
    ],
  },
  {
    topColor: "var(--teal)",
    title: "Executive Growth Retainer",
    badge: null,
    tagline: "For brands that move fast.",
    desc: "Direct access, weekly cadence, and priority execution for companies that can't afford to wait.",
    features: [
      "Everything in Full Growth System",
      "Weekly strategy calls",
      "Direct Slack access",
      "Quarterly growth reviews",
      "Priority execution queue",
    ],
  },
];

function GrowthProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-28 md:py-36"
      style={{
        backgroundColor: "var(--cream)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            Custom Growth Programs
          </p>
          <h2
            className="mt-3 text-3xl font-bold md:text-5xl"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--foreground)",
              letterSpacing: "-0.03em",
            }}
          >
            Built around your business.
            <br />
            <span style={{ color: "var(--teal)" }}>Not a cookie-cutter package.</span>
          </h2>
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          >
            Every engagement is scoped to your stage, your channels, and what will
            actually move the needle. After a discovery call, you&apos;ll have a clear
            proposal tied to projected ROI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              className="relative flex flex-col rounded-2xl bg-white p-7 md:p-8"
              style={{
                borderTop: `3px solid ${program.topColor}`,
                boxShadow: program.badge
                  ? "0 8px 32px rgba(20,84,93,0.1), 0 2px 8px rgba(0,0,0,0.04)"
                  : "0 2px 12px rgba(0,0,0,0.04)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {program.badge && (
                <span
                  className="mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "var(--lime)",
                    color: "#0A2B47",
                  }}
                >
                  {program.badge}
                </span>
              )}

              <h3
                className="text-xl font-bold tracking-tight md:text-2xl"
                style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
              >
                {program.title}
              </h3>
              <p
                className="mt-1 text-sm font-semibold"
                style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              >
                {program.tagline}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
              >
                {program.desc}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "var(--teal)" }}
                    >
                      <CheckIcon />
                    </span>
                    <span
                      className="text-sm leading-snug"
                      style={{
                        fontFamily: "var(--font-encode)",
                        color: "var(--foreground-secondary)",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              >
                Talk to us about this
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 8. Track Record (editorial stats) ───────────────────────────────────────

function Sparkline({ color = "var(--teal)" }: { color?: string }) {
  // Simple ascending sparkline SVG
  return (
    <svg
      viewBox="0 0 200 60"
      className="h-10 w-full md:h-14"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,52 L20,48 L40,46 L60,40 L80,38 L100,30 L120,26 L140,18 L160,14 L180,8 L200,4 L200,60 L0,60 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0,52 L20,48 L40,46 L60,40 L80,38 L100,30 L120,26 L140,18 L160,14 L180,8 L200,4"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots */}
      {[
        [0, 52],
        [60, 40],
        [120, 26],
        [200, 4],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={color} />
      ))}
    </svg>
  );
}

function TrackRecordSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Decorative ambient blob */}
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "rgba(207,252,104,0.6)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: "rgba(165,253,243,0.6)" }}
      />

      <div className="relative site-container px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--lime)" }}
              />
              Track Record
            </p>
            <h2
              className="mt-3 text-3xl font-bold md:text-5xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
              }}
            >
              Senior team.
              <br />
              <span style={{ color: "var(--teal)" }}>Outsized results.</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed md:text-right"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          >
            No fluff metrics. Every number below comes from real engagements with
            real e-commerce, SaaS, and marketplace clients.
          </p>
        </motion.div>

        {/* Bento stats */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {/* Featured: Revenue — span 7 */}
          <motion.div
            className="relative flex flex-col overflow-hidden rounded-2xl p-8 md:col-span-7 md:p-10"
            style={{ backgroundColor: "var(--navy)" }}
            data-theme="dark"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Inner grain glow */}
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-25 blur-3xl"
              style={{ backgroundColor: "var(--lime)" }}
            />
            <div className="relative flex items-center justify-between">
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
              >
                Revenue Generated
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: "rgba(207,252,104,0.4)",
                  color: "var(--lime)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--lime)" }}
                />
                Compounding
              </span>
            </div>

            <span
              className="relative mt-6 block font-black leading-none"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(4.5rem,10vw,8rem)",
                color: "var(--lime)",
                letterSpacing: "-0.05em",
              }}
            >
              $120M+
            </span>
            <p
              className="relative mt-4 max-w-md text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              In revenue grown for clients across e-commerce, SaaS, and marketplace
              brands — through search-led, channel-compounding systems.
            </p>

            <div className="relative mt-6">
              <Sparkline color="#CFFC68" />
            </div>
          </motion.div>

          {/* Years — span 5 */}
          <motion.div
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 md:col-span-5 md:p-10"
            style={{
              backgroundColor: "var(--cream)",
              borderColor: "var(--border)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              Experience
            </span>

            <div className="my-6 flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "clamp(4.5rem,9vw,7rem)",
                    color: "var(--navy)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  40+
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
                >
                  yrs
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
              >
                Combined senior-level expertise across our team.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["SEO", "Paid", "Content", "CRO", "GEO", "Attribution"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(20,84,93,0.25)",
                    color: "var(--teal)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Senior-led — span 5 */}
          <motion.div
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 md:col-span-5 md:p-10"
            style={{
              backgroundColor: "rgba(207,252,104,0.18)",
              borderColor: "rgba(207,252,104,0.5)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              Team Structure
            </span>

            <div className="my-6 flex items-baseline gap-4">
              <span
                className="relative font-black leading-none"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontSize: "clamp(4.5rem,9vw,7rem)",
                  color: "var(--navy)",
                  letterSpacing: "-0.05em",
                }}
              >
                0
                <span
                  className="absolute left-0 right-0 top-1/2 h-1.5 -rotate-12 rounded-full"
                  style={{ backgroundColor: "var(--teal)" }}
                />
              </span>
              <div>
                <p
                  className="text-base font-bold leading-tight"
                  style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                >
                  Junior account
                  <br />
                  managers
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              Senior-led, always. The strategist who pitches your account is the one
              who runs it — every week, every quarter.
            </p>
          </motion.div>

          {/* Senior cadence — span 7 */}
          <motion.div
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 md:col-span-7 md:p-10"
            style={{
              backgroundColor: "var(--surface-raised)",
              borderColor: "var(--border)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              >
                How we engage
              </span>
              <h3
                className="mt-3 text-2xl font-bold tracking-tight md:text-3xl"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                Senior strategists.
                <br />
                Weekly cadence.
              </h3>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "1:1", label: "Senior access" },
                { value: "<48h", label: "Avg response" },
                { value: "90d", label: "Strategy cycle" },
                { value: "100%", label: "Direct channel" },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    className="block font-black leading-none"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      fontSize: "clamp(1.75rem,3vw,2.5rem)",
                      color: "var(--teal)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="mt-1 block text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 9. Ready to Scale CTA (dramatic dark closer) ────────────────────────────

function ReadyToScaleCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}
      data-theme="dark"
    >
      {/* Architectural grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Soft glow accents */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "rgba(207,252,104,0.35)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: "rgba(165,253,243,0.35)" }}
      />

      {/* Floating decorative dots */}
      <motion.span
        className="pointer-events-none absolute left-[12%] top-[28%] block h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--lime)" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute right-[14%] top-[40%] block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: "var(--mint)" }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.span
        className="pointer-events-none absolute left-[20%] bottom-[24%] block h-2 w-2 rounded-full"
        style={{ backgroundColor: "var(--mint)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.span
        className="pointer-events-none absolute right-[18%] bottom-[30%] block h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--lime)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative site-container px-6 py-28 md:px-12 md:py-40 lg:px-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          {/* Left — copy + CTA */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--lime)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--lime)" }}
              />
              Ready to Scale?
            </p>

            <h2
              className="mt-4 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
              }}
            >
              Most companies leave
              <br />
              <span style={{ color: "var(--lime)" }}>growth on the table.</span>
            </h2>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              We&apos;ll show you exactly how much — and build the system to capture it.
              Get an intelligence audit in your inbox in 14 days, no commitment.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton strength={0.2}>
                <a
                  href="/contact"
                  className="cta-manic group relative inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-semibold transition-all"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "var(--lime)",
                    color: "#0A2B47",
                    boxShadow: "0 0 30px rgba(207,252,104,0.25)",
                  }}
                >
                  <span className="relative">Get Your Growth Model</span>
                  <span className="relative inline-block transition-transform group-hover:translate-x-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </MagneticButton>

              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                See client work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right — "what happens next" card */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-2xl border p-6 backdrop-blur-md md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
              >
                What happens next
              </p>

              <ol className="mt-6 space-y-5">
                {[
                  {
                    step: "01",
                    title: "Discovery call",
                    desc: "30 minutes with a senior strategist — no decks, no sales script.",
                  },
                  {
                    step: "02",
                    title: "Intelligence audit",
                    desc: "We pull your data and map your growth gaps within 14 days.",
                  },
                  {
                    step: "03",
                    title: "Proposal + roadmap",
                    desc: "Clear scope, projected ROI, and the channels we'd run together.",
                  },
                ].map((item, i) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-black"
                      style={{
                        fontFamily: "var(--font-archivo)",
                        backgroundColor: i === 0 ? "var(--lime)" : "rgba(255,255,255,0.08)",
                        color: i === 0 ? "var(--navy)" : "rgba(255,255,255,0.85)",
                        border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <h4
                        className="text-sm font-bold tracking-tight md:text-base"
                        style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-encode)",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div
                className="mt-7 flex items-center gap-3 border-t pt-5"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--lime)" }}
                />
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Taking on 4 new partners this quarter.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ExecutiveGrowthPage() {
  return (
    <main>
      <ExecutiveGrowthHero />
      {/* Spacer to account for fixed hero */}
      <div className="h-screen" />
      {/* Content scrolls over the fixed hero */}
      <div className="relative z-10 bg-background">
        <Marquee />
        <DifferentiatorBlock />
        <ValueProp />
        <PainPointsSection />
        <ApproachSection />
        <ServicesGridSection />
        <GrowthProgramsSection />
        <TrackRecordSection />
        <ReadyToScaleCTA />
        <Footer />
      </div>
    </main>
  );
}
