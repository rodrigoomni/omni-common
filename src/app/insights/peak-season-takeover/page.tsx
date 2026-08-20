"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";

/* ──────────────────────────────────────────────────────────────────────────────
   Content — sourced from the Peak Season Takeover sales sheet (DTC / ecom).
   ────────────────────────────────────────────────────────────────────────── */

const HERO = {
  eyebrow: "Q4 GROWTH · 90-DAY ACCOUNT TAKEOVER",
  brand_tag: "Ecommerce & DTC",
  heading_top: "Peak Season",
  heading_accent: "Takeover.",
  description:
    "Hand us the keys in August. Walk into Black Friday with Google and Meta accounts that have already found their rhythm.",
  timeline: [
    { date: "AUG 17", label: "We take the keys", accent: "lime" as const },
    { date: "SEP–OCT", label: "Rebuild on cheaper impressions", accent: "mint" as const },
    { date: "NOV 15", label: "Accounts at full stride", accent: "mint" as const },
    { date: "NOV 27", label: "Black Friday — you execute", accent: "lime" as const },
  ],
  facts: [
    { value: "10 spots", label: "total client capacity" },
    { value: "Aug 31", label: "enrollment closes" },
    { value: "90 days", label: "full term — no opt-out" },
    { value: "$5K+/mo", label: "min ad spend" },
  ],
};

const GOAL = {
  eyebrow: "THE GOAL",
  heading: "November is for execution. Not for learning.",
  description:
    "You know Q4 is when the money moves — but that's also the worst possible time to be teaching a platform how to find your buyers. Black Friday and Cyber Monday push CPMs to two or three times baseline, so foundation work costs a fraction in September what it costs in November. We take both accounts now, rebuild the signal underneath them, and spend the volatile phase on cheaper impressions — so BFCM is execution, not panic optimization.",
  compare: [
    {
      when: "September",
      cost: "1×",
      note: "Baseline impressions. Cheap experiments, cheap mistakes, cheap learning.",
      tone: "green" as const,
    },
    {
      when: "November",
      cost: "2–3×",
      note: "Peak CPMs. Every learning experiment costs multiples. Every day of drift is a real loss.",
      tone: "warn" as const,
    },
  ],
};

const RUNWAY = {
  eyebrow: "THE 90-DAY RUNWAY",
  heading: "What's actually included.",
  description:
    "Both accounts, one operating cadence. Every phase has a purpose — and a lock — so nothing gets touched during peak that shouldn't.",
  phases: [
    {
      weeks: "WEEKS 1–2",
      title: "Take the keys",
      body:
        "Audit both accounts — wasted spend, Performance Max eating your branded traffic, ad-set fragmentation on Meta. Feed and Merchant Center health. Tracking rebuilt on both sides.",
    },
    {
      weeks: "WEEKS 3–5",
      title: "Rebuild & learn",
      body:
        "Optimization events chosen for volume and quality — optimizing to add-to-cart just teaches Meta to find people who never buy. Then a change freeze.",
    },
    {
      weeks: "WEEKS 6–9",
      title: "Stabilize & prove",
      body:
        "Prospecting pushed deliberately to fill retargeting pools while impressions are cheap. Creative tested now and backups banked. Budget moved to winners. Weekly reads.",
    },
    {
      weeks: "WEEKS 10–13",
      title: "Arm for peak",
      body:
        "Seasonality adjustments loaded ahead of the sale — and the negative adjustment scheduled for after, so spend doesn't spike. Change freeze two weeks out.",
    },
  ],
};

const PROOF = {
  eyebrow: "PROOF",
  heading: "We take over inherited accounts for a living.",
  description:
    "Corrupted conversion data, contradictory dashboards, runaway Performance Max. Fix the signal, hold the line through learning, then scale spend only as fast as the economics allow.",
  stats: [
    {
      metric: "−23%→+48%",
      body: "Year-over-year order growth on a DTC store whose orders were falling when we took the account.",
    },
    {
      metric: "$117 → $92",
      body: "CPA falling as volume rose — 227 to 496 monthly conversions, beating plan four months running.",
    },
    {
      metric: "5.71×",
      body: "ROAS on Meta at a $40.68 cost per purchase, on a ~$300 considered product.",
    },
  ],
};

const FIT = {
  eyebrow: "WHO THIS IS FOR",
  heading: "Built for DTC brands where Q4 is the year.",
  points: [
    "Ecommerce & DTC brands running Google Ads, Meta, or both",
    "$5K+/mo on paid search — $10K+/mo on Meta",
    "Q4 is a meaningful share of annual revenue",
    "The account has been touched by multiple hands — you're inheriting drift",
    "You want the foundation solid before Black Friday, not during",
  ],
  not_for: [
    "You're launching from zero with no data",
    "You need someone to build creative from scratch as the primary lever",
    "You're looking for month-to-month with no commitment",
  ],
};

const PRICING = {
  eyebrow: "INVESTMENT",
  heading: "The whole first month for less than most agencies charge for a call.",
  cards: [
    {
      tag: "MONTH ONE · TAKEOVER & REBUILD",
      strike: "$5,990",
      price: "$1,980",
      priceSuffix: "",
      body:
        "Takeover & rebuild across both platforms — search + social. Management for the month is included, not billed on top.",
      highlight: true,
    },
    {
      tag: "MONTH TWO — DEC 31",
      strike: "",
      price: "$1,998",
      priceSuffix: "/mo",
      body:
        "Management continues through the end of Q4. Rate goes to $3,990/mo on Jan 1 — after you've seen your Q4 numbers.",
      highlight: false,
    },
    {
      tag: "SINGLE PLATFORM",
      strike: "",
      price: "$990",
      priceSuffix: " then $999/mo",
      body:
        "Search-only or Meta-only. Same structure, same 90-day term. Meta account takeovers require $10K+/mo in ad spend.",
      highlight: false,
    },
  ],
  addon: {
    tag: "ADD-ON · CREATIVE",
    title: "Ads, built to feed the machine",
    body:
      "Creative isn't included — on Meta it's the main lever you have. If you don't already have it, direction and specs, or our team builds the batch. Quoted on volume.",
  },
};

const SPOT_METER = {
  taken: 4,
  total: 10,
};

/* ──────────────────────────────────────────────────────────────────────────────
   Small icon components
   ────────────────────────────────────────────────────────────────────────── */

function Check({ color = "var(--teal)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12L10 18L20 6"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function X({ color = "#B00020" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Encode form data (matches footer pattern)
   ────────────────────────────────────────────────────────────────────────── */

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/* ──────────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default function PeakSeasonTakeoverPage() {
  return (
    <main>
      <Hero />
      <GoalSection />
      <RunwaySection />
      <ProofSection />
      <FitSection />
      <PricingSection />
      <LeadFormSection />
      <StickyMobileCta />
      <Footer />
    </main>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      style={{
        backgroundColor: "#0A2B47",
        backgroundImage: [
          "radial-gradient(60% 45% at 85% 15%, rgba(207, 252, 104, 0.14) 0%, rgba(207, 252, 104, 0) 60%)",
          "radial-gradient(50% 40% at 10% 85%, rgba(165, 253, 243, 0.12) 0%, rgba(165, 253, 243, 0) 60%)",
        ].join(", "),
      }}
    >
      {/* Decorative dotted grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,253,239,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at 50% 60%, black 30%, transparent 75%)",
        }}
      />

      {/* Big background circle motif (echoes sales sheet) */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute right-[-140px] top-[80px] hidden md:block"
        width="360"
        height="360"
        viewBox="0 0 100 100"
        style={{ y }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#CFFC68" strokeOpacity="0.28" strokeDasharray="3 5" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#A5FDF3" strokeOpacity="0.28" strokeDasharray="2 6" strokeWidth="0.5" />
      </motion.svg>

      <div className="site-container relative px-6 md:px-12 lg:px-24">
        {/* Top tag row */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "rgba(207,252,104,0.14)",
              color: "#CFFC68",
              border: "1px solid rgba(207,252,104,0.35)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#CFFC68]" />
            {HERO.eyebrow}
          </motion.span>
          <motion.span
            className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,253,239,0.85)",
              border: "1px solid rgba(255,253,239,0.15)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
          >
            {HERO.brand_tag}
          </motion.span>
        </div>

        {/* Headline + right column */}
        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
          <div>
            <motion.h1
              className="font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#FFFDEF",
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.75rem, 6vw, 5.75rem)",
                lineHeight: 0.98,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO.heading_top}
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 62%, #CFFC68 62%, #CFFC68 92%, transparent 92%)",
                  padding: "0 0.06em",
                }}
              >
                {HERO.heading_accent}
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[48ch] text-lg leading-[1.55] md:text-xl md:leading-[1.5]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,253,239,0.82)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
            >
              {HERO.description}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
            >
              <MagneticButton strength={0.18}>
                <Link
                  href="#book-intro"
                  className="cta-manic relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "#CFFC68",
                    color: "#0A2B47",
                    boxShadow: "5px 6px 0px 0px rgba(20,84,93,0.9)",
                  }}
                >
                  <span
                    className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(207,252,104,0.55), 0 0 40px rgba(207,252,104,0.25)",
                    }}
                  />
                  <span className="relative">Book my intro call</span>
                  <Arrow />
                </Link>
              </MagneticButton>
              <Link
                href="#the-runway"
                className="inline-flex items-center gap-2 text-base font-semibold transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-inter)", color: "#A5FDF3" }}
              >
                See the 90-day plan
                <span aria-hidden="true">↓</span>
              </Link>
            </motion.div>

            {/* Scarcity meter */}
            <motion.div
              className="mt-10 max-w-[440px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              <div
                className="flex items-baseline justify-between text-[11px] font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.14em",
                  color: "rgba(255,253,239,0.7)",
                }}
              >
                <span>Spots claimed · updated weekly</span>
                <span style={{ color: "#CFFC68" }}>
                  {SPOT_METER.taken} of {SPOT_METER.total}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #CFFC68 0%, #A5FDF3 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(SPOT_METER.taken / SPOT_METER.total) * 100}%` }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </div>

          {/* Timeline card */}
          <motion.aside
            className="rounded-2xl p-5 md:p-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase"
              style={{ fontFamily: "var(--font-inter)", color: "#CFFC68", letterSpacing: "0.2em" }}
            >
              <span className="inline-block h-1 w-1 rounded-full bg-[#CFFC68]" />
              THE COUNTDOWN
            </div>
            <ul className="relative flex flex-col gap-5">
              {/* Vertical thread — from center of first badge to center of last */}
              <span
                aria-hidden="true"
                className="absolute left-[17px] top-[18px] bottom-[18px] w-px"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(207,252,104,0.55) 0%, rgba(165,253,243,0.35) 100%)",
                }}
              />
              {HERO.timeline.map((step, i) => (
                <motion.li
                  key={step.date}
                  className="relative flex items-start gap-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  <span
                    className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "#0A2B47",
                      backgroundColor: step.accent === "lime" ? "#CFFC68" : "#A5FDF3",
                      boxShadow: "0 0 0 4px #0A2B47",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: step.accent === "lime" ? "#CFFC68" : "#A5FDF3",
                      }}
                    >
                      {step.date}
                    </div>
                    <div
                      className="mt-1 text-sm leading-snug"
                      style={{
                        fontFamily: "var(--font-encode)",
                        color: "rgba(255,253,239,0.9)",
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>

        {/* Fact strip */}
        <motion.div
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-8 md:mt-16 md:grid-cols-4 md:pt-10"
          style={{ borderColor: "rgba(255,253,239,0.12)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {HERO.facts.map((fact, i) => (
            <div key={fact.label} className={i < HERO.facts.length - 1 ? "md:border-r md:pr-6" : ""} style={{ borderColor: "rgba(255,253,239,0.12)" }}>
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#FFFDEF",
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {fact.value}
              </div>
              <div
                className="mt-2 text-[11px] font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(165,253,243,0.85)",
                  letterSpacing: "0.14em",
                }}
              >
                {fact.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── GOAL / WHY NOW ───────────────────────────────────────────────────────── */

function GoalSection() {
  return (
    <section
      id="the-goal"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFDEF",
        backgroundImage:
          "radial-gradient(80% 60% at 100% 0%, rgba(207,252,104,0.14) 0%, rgba(207,252,104,0) 65%)",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
          <div>
            <motion.p
              className="text-[11px] font-semibold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--teal)",
                letterSpacing: "0.28em",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
            >
              {GOAL.eyebrow}
            </motion.p>
            <motion.h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#0A2B47",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {GOAL.heading}
            </motion.h2>
            <motion.p
              className="mt-6 text-base leading-[1.65] md:text-lg md:leading-[1.6]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-secondary)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              {GOAL.description}
            </motion.p>
          </div>

          {/* CPM cheap vs expensive visual */}
          <div className="grid gap-4 self-center">
            {GOAL.compare.map((row, i) => {
              const isWarn = row.tone === "warn";
              return (
                <motion.div
                  key={row.when}
                  className="relative overflow-hidden rounded-2xl p-6 md:p-7"
                  style={{
                    backgroundColor: isWarn ? "#0A2B47" : "#FFFFFF",
                    border: isWarn ? "1px solid rgba(255,255,255,0.08)" : "1px solid #FCEA8A",
                    boxShadow: isWarn ? "0 20px 40px rgba(10,43,71,0.15)" : "0 12px 30px rgba(15,23,42,0.06)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div
                      className="text-[11px] font-bold uppercase"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: isWarn ? "#A5FDF3" : "var(--teal)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {row.when}
                    </div>
                    <div
                      className="font-bold"
                      style={{
                        fontFamily: "var(--font-archivo)",
                        color: isWarn ? "#CFFC68" : "#0A2B47",
                        fontSize: "clamp(2.4rem, 4.4vw, 3.5rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {row.cost}
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-[1.55] md:text-[15px]"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: isWarn ? "rgba(255,253,239,0.82)" : "var(--foreground-secondary)",
                    }}
                  >
                    {row.note}
                  </p>
                  {!isWarn && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(207,252,104,0.6) 0%, rgba(207,252,104,0) 65%)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 90-DAY RUNWAY ────────────────────────────────────────────────────────── */

function RunwaySection() {
  return (
    <section
      id="the-runway"
      className="relative"
      style={{
        backgroundColor: "#F7F5EA",
        borderTop: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="max-w-[720px]">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {RUNWAY.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {RUNWAY.heading}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-[58ch] text-base leading-[1.6] md:text-lg"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-secondary)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {RUNWAY.description}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {RUNWAY.phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl p-6 md:p-7"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--teal)",
                    letterSpacing: "0.22em",
                  }}
                >
                  {phase.weeks}
                </span>
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "rgba(10,43,71,0.15)",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="mt-3 text-2xl font-bold md:text-[26px]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#0A2B47",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {phase.title}
              </h3>
              <p
                className="mt-3 text-[15px] leading-[1.6]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-secondary)",
                }}
              >
                {phase.body}
              </p>

              {/* Bottom accent */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{
                  backgroundImage: "linear-gradient(90deg, #CFFC68 0%, #A5FDF3 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROOF ────────────────────────────────────────────────────────────────── */

function ProofSection() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A2B47" }}
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(50% 60% at 80% 20%, rgba(207,252,104,0.08) 0%, rgba(207,252,104,0) 60%)",
            "radial-gradient(45% 55% at 15% 80%, rgba(165,253,243,0.08) 0%, rgba(165,253,243,0) 60%)",
          ].join(", "),
        }}
      />

      <div className="site-container relative px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="max-w-[720px]">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "#CFFC68",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {PROOF.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#FFFDEF",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {PROOF.heading}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-[1.6] md:text-lg"
            style={{
              fontFamily: "var(--font-encode)",
              color: "rgba(255,253,239,0.75)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {PROOF.description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROOF.stats.map((stat, i) => (
            <motion.div
              key={stat.metric}
              className="flex flex-col rounded-2xl p-7 md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,253,239,0.1)",
                backdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#CFFC68",
                  fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.metric}
              </div>
              <p
                className="mt-5 text-sm leading-[1.55] md:text-[15px]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "rgba(255,253,239,0.85)",
                }}
              >
                {stat.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-[13px]"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(165,253,243,0.85)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span>Case study details available on request →</span>
          <Link
            href="/work"
            className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-75"
            style={{ color: "#CFFC68" }}
          >
            See all case studies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FIT / WHO IT'S FOR ───────────────────────────────────────────────────── */

function FitSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="max-w-[720px]">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {FIT.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {FIT.heading}
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(207,252,104,0.35)",
                color: "#3E5710",
                letterSpacing: "0.16em",
              }}
            >
              A perfect fit if
            </div>
            <ul className="flex flex-col gap-4">
              {FIT.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(207,252,104,0.4)" }}
                  >
                    <Check color="#0A2B47" />
                  </span>
                  <p
                    className="text-base leading-[1.5] md:text-[17px]"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "var(--foreground)",
                    }}
                  >
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(176,0,32,0.08)",
                color: "#8B1A1A",
                letterSpacing: "0.16em",
              }}
            >
              Not the right fit if
            </div>
            <ul className="flex flex-col gap-4">
              {FIT.not_for.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(176,0,32,0.08)" }}
                  >
                    <X color="#8B1A1A" />
                  </span>
                  <p
                    className="text-base leading-[1.5] md:text-[17px]"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "var(--foreground-secondary)",
                    }}
                  >
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ──────────────────────────────────────────────────────────────── */

function PricingSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "#FFFDEF",
        backgroundImage:
          "radial-gradient(70% 60% at 0% 0%, rgba(165,253,243,0.18) 0%, rgba(165,253,243,0) 65%)",
        borderTop: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-[820px] text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {PRICING.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {PRICING.heading}
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRICING.cards.map((card, i) => (
            <motion.div
              key={card.tag}
              className="relative flex flex-col rounded-2xl p-7 md:p-8"
              style={{
                backgroundColor: card.highlight ? "#CFFC68" : "#FFFFFF",
                border: card.highlight ? "1px solid #B8E85A" : "1px solid #FCEA8A",
                boxShadow: card.highlight
                  ? "0 20px 40px rgba(207,252,104,0.35)"
                  : "0 8px 24px rgba(15,23,42,0.06)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {card.highlight && (
                <div
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "#0A2B47",
                    color: "#CFFC68",
                    letterSpacing: "0.2em",
                  }}
                >
                  Best value
                </div>
              )}
              <div
                className="text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: card.highlight ? "#0A2B47" : "var(--teal)",
                  letterSpacing: "0.2em",
                }}
              >
                {card.tag}
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                {card.strike && (
                  <span
                    className="text-lg line-through"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      color: card.highlight ? "#3E5710" : "#8A8A8A",
                    }}
                  >
                    {card.strike}
                  </span>
                )}
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "#0A2B47",
                    fontSize: "clamp(2.25rem, 3.6vw, 3rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {card.price}
                </span>
                {card.priceSuffix && (
                  <span
                    className="text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                    }}
                  >
                    {card.priceSuffix}
                  </span>
                )}
              </div>
              <p
                className="mt-4 text-[14.5px] leading-[1.55]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Add-on */}
        <motion.div
          className="mt-8 rounded-2xl p-6 md:p-7"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px dashed #FCEA8A",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <div
                className="text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--teal)",
                  letterSpacing: "0.2em",
                }}
              >
                {PRICING.addon.tag}
              </div>
              <div
                className="mt-1 text-xl font-bold md:text-[22px]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#0A2B47",
                  letterSpacing: "-0.01em",
                }}
              >
                {PRICING.addon.title}
              </div>
            </div>
            <p
              className="max-w-[500px] text-[14.5px] leading-[1.55]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-secondary)",
              }}
            >
              {PRICING.addon.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── LEAD FORM ────────────────────────────────────────────────────────────── */

function LeadFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [spend, setSpend] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [q4Goal, setQ4Goal] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const togglePlatform = (p: string) => {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!name.trim() || !email.trim() || !company.trim()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": "peak-season-lead",
          "bot-field": botField,
          name,
          email,
          company,
          website,
          monthly_ad_spend: spend,
          platforms: platforms.join(", "),
          q4_goal: q4Goal,
        }),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      setStatus("success");
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_name: "peak-season-lead",
          campaign: "peak-season-takeover",
        });
      }
    } catch (err) {
      console.error("Peak Season lead form error", err);
      setStatus("error");
    }
  };

  const isSuccess = status === "success";

  return (
    <section
      id="book-intro"
      data-theme="dark-teal"
      className="relative overflow-hidden scroll-mt-24"
      style={{ backgroundColor: "#14545D" }}
    >
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(60% 50% at 100% 100%, rgba(207,252,104,0.15) 0%, rgba(207,252,104,0) 65%)",
            "radial-gradient(50% 50% at 0% 0%, rgba(165,253,243,0.14) 0%, rgba(165,253,243,0) 65%)",
          ].join(", "),
        }}
      />

      <div className="site-container relative px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-24">
          {/* Left column — pitch */}
          <div className="md:pt-4">
            <motion.p
              className="text-[11px] font-semibold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#CFFC68",
                letterSpacing: "0.28em",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
            >
              CLAIM A SPOT
            </motion.p>
            <motion.h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#FFFDEF",
                fontSize: "clamp(2rem, 4.2vw, 3.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9 }}
            >
              Let&apos;s see if this
              <br />
              is right for you.
            </motion.h2>
            <motion.p
              className="mt-6 max-w-[42ch] text-base leading-[1.6] md:text-lg"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,253,239,0.85)",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              A 20-minute intro call — no pitch deck. We&apos;ll look at your account, ask a few sharp questions, and tell you whether the runway makes sense.
            </motion.p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "You keep everything we share, whether we work together or not",
                "We review your account before the call — you get real feedback",
                "If we&apos;re not the right fit, we&apos;ll say so",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(207,252,104,0.2)" }}
                  >
                    <Check color="#CFFC68" />
                  </span>
                  <p
                    className="text-[15px] leading-[1.5]"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "rgba(255,253,239,0.9)",
                    }}
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm" style={{ color: "rgba(165,253,243,0.85)", fontFamily: "var(--font-inter)" }}>
              <span>Prefer email?</span>
              <a
                href="mailto:ryan@omnicommon.com?subject=Peak%20Season%20Takeover"
                className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
                style={{ color: "#CFFC68" }}
              >
                ryan@omnicommon.com
              </a>
            </div>
          </div>

          {/* Right column — form card */}
          <motion.div
            className="relative rounded-3xl p-6 md:p-8"
            style={{
              backgroundColor: "#FFFDEF",
              boxShadow: "0 30px 60px rgba(10,43,71,0.35)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner tag */}
            <div
              className="absolute -top-3 right-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "#0A2B47",
                color: "#CFFC68",
                letterSpacing: "0.2em",
              }}
            >
              90-second form
            </div>

            {isSuccess ? (
              <SuccessState />
            ) : (
              <form
                name="peak-season-lead"
                method="POST"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="form-name" value="peak-season-lead" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don&apos;t fill this out:
                    <input
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </label>
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <LeadField
                    id="psl-name"
                    name="name"
                    label="Full name"
                    placeholder="Your name"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                    required
                  />
                  <LeadField
                    id="psl-email"
                    name="email"
                    label="Work email"
                    placeholder="you@brand.com"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <LeadField
                    id="psl-company"
                    name="company"
                    label="Brand / company"
                    placeholder="Company name"
                    value={company}
                    onChange={setCompany}
                    autoComplete="organization"
                    required
                  />
                  <LeadField
                    id="psl-website"
                    name="website"
                    label="Website"
                    placeholder="brand.com"
                    value={website}
                    onChange={setWebsite}
                    autoComplete="url"
                  />
                </div>

                <div>
                  <label
                    htmlFor="psl-spend"
                    className="mb-2 block text-[11px] font-bold uppercase"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--teal)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    Monthly ad spend
                  </label>
                  <select
                    id="psl-spend"
                    name="monthly_ad_spend"
                    value={spend}
                    onChange={(e) => setSpend(e.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[color:var(--teal)]/40"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "var(--foreground)",
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0DAB5",
                    }}
                  >
                    <option value="">Select a range</option>
                    <option value="under-5k">Under $5K/mo</option>
                    <option value="5k-10k">$5K – $10K/mo</option>
                    <option value="10k-25k">$10K – $25K/mo</option>
                    <option value="25k-50k">$25K – $50K/mo</option>
                    <option value="50k-100k">$50K – $100K/mo</option>
                    <option value="100k-plus">$100K+/mo</option>
                  </select>
                </div>

                <div>
                  <span
                    className="mb-2 block text-[11px] font-bold uppercase"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--teal)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    Which platforms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "google", label: "Google Ads" },
                      { key: "meta", label: "Meta" },
                      { key: "both", label: "Both" },
                    ].map((p) => {
                      const active = platforms.includes(p.key);
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => togglePlatform(p.key)}
                          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all"
                          style={{
                            fontFamily: "var(--font-inter)",
                            backgroundColor: active ? "#0A2B47" : "#FFFFFF",
                            color: active ? "#CFFC68" : "var(--teal)",
                            borderColor: active ? "#0A2B47" : "#E0DAB5",
                          }}
                        >
                          {active && <Check color="#CFFC68" />}
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="psl-q4"
                    className="mb-2 block text-[11px] font-bold uppercase"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--teal)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    What&apos;s your #1 Q4 concern?
                  </label>
                  <textarea
                    id="psl-q4"
                    name="q4_goal"
                    value={q4Goal}
                    onChange={(e) => setQ4Goal(e.target.value)}
                    rows={3}
                    placeholder="e.g. Performance Max is cannibalizing brand, CPMs already climbing, tracking is a mess…"
                    className="w-full resize-none rounded-lg border px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[color:var(--teal)]/40"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "var(--foreground)",
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0DAB5",
                    }}
                  />
                </div>

                <MagneticButton strength={0.15}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cta-manic relative flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      fontFamily: "var(--font-inter)",
                      backgroundColor: "#0A2B47",
                      color: "#CFFC68",
                      boxShadow: "5px 6px 0px 0px #CFFC68",
                    }}
                  >
                    <span className="relative">
                      {status === "submitting" ? "Sending…" : "Book my intro call"}
                    </span>
                    <Arrow />
                  </button>
                </MagneticButton>

                <div role="status" aria-live="polite" className="min-h-[1.25rem]">
                  {status === "error" && (
                    <p
                      className="text-sm"
                      style={{ fontFamily: "var(--font-encode)", color: "#B00020" }}
                    >
                      Please fill in name, email, and company. If the issue persists, email{" "}
                      <a href="mailto:ryan@omnicommon.com" className="underline">
                        ryan@omnicommon.com
                      </a>
                      .
                    </p>
                  )}
                </div>

                <p
                  className="text-center text-xs"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  We&apos;ll reply within one business day. No lists, no spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 py-8 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(207,252,104,0.35)" }}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 220 }}
      >
        <Check color="#0A2B47" />
      </motion.div>
      <h3
        className="text-2xl font-bold"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "#0A2B47",
          letterSpacing: "-0.02em",
        }}
      >
        Got it — talk soon.
      </h3>
      <p
        className="max-w-sm text-[15px] leading-[1.55]"
        style={{
          fontFamily: "var(--font-encode)",
          color: "var(--foreground-secondary)",
        }}
      >
        We&apos;ll review your account and reply within one business day with a couple of times for the call.
      </p>
    </motion.div>
  );
}

type LeadFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function LeadField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: LeadFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-bold uppercase"
        style={{
          fontFamily: "var(--font-inter)",
          color: "var(--teal)",
          letterSpacing: "0.16em",
        }}
      >
        {label} {required && <span style={{ color: "#B00020" }}>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border px-4 py-3 text-[15px] placeholder:text-[rgba(38,38,38,0.4)] focus:outline-none focus:ring-2 focus:ring-[color:var(--teal)]/40"
        style={{
          fontFamily: "var(--font-encode)",
          color: "var(--foreground)",
          backgroundColor: "#FFFFFF",
          borderColor: "#E0DAB5",
        }}
      />
    </div>
  );
}

/* ── STICKY MOBILE CTA ────────────────────────────────────────────────────── */

function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] border-t px-4 pb-4 pt-3 md:hidden"
      style={{
        backgroundColor: "rgba(255,253,239,0.98)",
        borderColor: "rgba(15,23,42,0.08)",
        boxShadow: "0 -8px 24px rgba(15,23,42,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Link
        href="#book-intro"
        className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold"
        style={{
          fontFamily: "var(--font-inter)",
          backgroundColor: "#0A2B47",
          color: "#CFFC68",
          boxShadow: "3px 4px 0px 0px #CFFC68",
        }}
      >
        Book my intro call
        <Arrow />
      </Link>
    </div>
  );
}
