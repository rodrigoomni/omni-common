"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";

/* ──────────────────────────────────────────────────────────────────────────────
   Content
   ────────────────────────────────────────────────────────────────────────── */

const HERO = {
  eyebrow: "LET'S CHAT · FOR FREE",
  heading_top: "Book a free 20-minute",
  heading_accent: "intro call.",
  description:
    "See if our service is perfect for you. No pitch deck — we'll review your account and give you real feedback whether we work together or not.",
  timeline: [
    { date: "AUG 17", label: "We take the keys", accent: "lime" as const },
    { date: "SEP–OCT", label: "Rebuild while clicks are cheaper", accent: "mint" as const },
    { date: "NOV 15", label: "Account at full stride", accent: "mint" as const },
    { date: "NOV 27", label: "Black Friday", accent: "lime" as const },
  ],
  form_title: "Reserve your call",
  form_note: "10 spots · Aug 31 enrollment closes",
  cta_label: "Book free 20-minute call",
  contact_email: "ryan@omnicommon.com",
};

const GOAL = {
  eyebrow: "THE GOAL",
  heading: "Focus on your business. We'll take care of the ad account.",
  description:
    "Work smarter, not harder. We take your account today, rebuilding the signals beneath it and working through the volatile phase early — so your holiday season is pure execution, not panic.",
};

const RUNWAY = {
  eyebrow: "WHAT YOU GET",
  heading: "The 90-day runway.",
  description:
    "Every phase has a purpose — and a lock — so nothing gets touched during peak that shouldn't.",
  phases: [
    {
      weeks: "WEEKS 1–2",
      title: "We take the keys",
      body:
        "Full audit — find wasted spend, search-term gaps, Performance Max cannibalizing your brand terms. Conversion tracking rebuilt. Get a baseline scorecard against last year's Q4.",
    },
    {
      weeks: "WEEKS 3–5",
      title: "Rebuilding & learning",
      body:
        "Campaign restructuring by margin and intent. Bid strategy matched to your actual conversion volume. Match ad copy and messaging — then a change freeze.",
    },
    {
      weeks: "WEEKS 6–9",
      title: "Stabilizing",
      body:
        "Search-term mining, negative build-out, budget moved to what's working. Retargeting audiences built and warm while impressions are still cheap. Weekly reads reported to you.",
    },
    {
      weeks: "WEEKS 10–13",
      title: "Fully optimized for peak",
      body:
        "Q4 promo calendar, promotion extensions and sale annotations live, budget increases set ahead of the ramp, backup creative banked, technical change freeze two weeks out.",
    },
  ],
  cta: { label: "Start right now", href: "#book-intro" },
};

const WHY = {
  eyebrow: "WHY OMNI COMMON",
  heading: "We take over inherited accounts for a living.",
  description:
    "Whether it's corrupted conversion data, destabilized bid strategies, or runaway Performance Max — our marketing professionals fix the signal, stabilize, then scale your ad account. It's our specialty.",
  stats_heading: "Here's what we did for businesses like yours",
  stats: [
    {
      metric: "−26.5% CPA",
      body: "Cost per acquisition on a full account takeover — with spend down 8.8% and conversions up 35% in 2025.",
    },
    {
      metric: "+118% TXN",
      body: "Increase in conversions YOY in the first 4 months, at a 21% lower CPA YOY.",
    },
    {
      metric: "$117 → $92",
      body: "CPA falling as volume rose — 227 to 496 monthly conversions, beating plan four months running.",
    },
  ],
};

const PRICING = {
  eyebrow: "INVESTMENT",
  heading: "Select the package you need — built for true ROI.",
  cards: [
    {
      tag: "PAID SEARCH TAKEOVER",
      strike: "$2,995",
      price: "$990",
      priceSuffix: "",
      body:
        "Month one — takeover & rebuild. Full audit, tracking rebuild, and account restructure. Management included, never billed on top.",
      recurring: "$999",
      recurringNote:
        "Month two onward, through December 31. Goes to $1,995/mo on January 1 — only after you've seen your Q4 numbers.",
      highlight: true,
    },
    {
      tag: "ADD-ON · META TAKEOVER",
      strike: "$2,995",
      price: "$990",
      priceSuffix: "",
      body:
        "The same professional optimization ROI, now for Meta accounts. We restructure, rebuild signal with the Conversions API, and optimize existing creative.",
      recurring: "$999",
      recurringNote:
        "Month two onward, through December 31. Goes to $1,995/mo on January 1 — only after you've seen your Q4 numbers.",
      highlight: false,
    },
  ],
};

const TERMS = {
  eyebrow: "AD ACCOUNT TERMS",
  items: [
    { value: "$5K+/mo", label: "minimum ad spend" },
    { value: "90 days", label: "full term — no opt-out" },
    { value: "10 spots", label: "total client capacity" },
    { value: "Aug 31", label: "enrollment closes" },
  ],
};

/* ──────────────────────────────────────────────────────────────────────────────
   Utilities
   ────────────────────────────────────────────────────────────────────────── */

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function trackLead(source: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      form_name: "peak-season-lead",
      campaign: "peak-season-takeover",
      source,
    });
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   Icons
   ────────────────────────────────────────────────────────────────────────── */

function Check({ color = "var(--teal)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12L10 18L20 6" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
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
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default function PeakSeasonTakeoverPage() {
  return (
    <main>
      <Hero />
      <GoalSection />
      <RunwaySection />
      <WhySection />
      <PricingSection />
      <TermsSection />
      <StickyMobileCta />
      <Footer theme="green" />
    </main>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="book-intro"
      data-theme="dark"
      className="relative flex min-h-[96vh] scroll-mt-24 items-center overflow-hidden pt-28 pb-16 md:pt-32"
      style={{
        backgroundColor: "#0A2B47",
        backgroundImage: "url('/images/peak-season-hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="site-container relative w-full px-6 md:px-12 lg:px-24">
        {/* Eyebrow */}
        <motion.p
          className="text-[11px] font-semibold uppercase"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#CFFC68",
            letterSpacing: "0.24em",
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {HERO.eyebrow}
        </motion.p>

        {/* Two-column layout: headline / stack */}
        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
          {/* LEFT — headline */}
          <div className="flex flex-col justify-center">
            <motion.h1
              className="font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#FFFDEF",
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.75rem, 6.2vw, 6.25rem)",
                lineHeight: 0.96,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO.heading_top}{" "}
              <span style={{ color: "#CFFC68" }}>{HERO.heading_accent}</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[46ch] text-lg leading-[1.55] md:text-xl md:leading-[1.5]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,253,239,0.85)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
            >
              {HERO.description}
            </motion.p>
          </div>

          {/* RIGHT — polished stack: compact countdown + 2-field form */}
          <motion.aside
            className="relative flex flex-col overflow-hidden rounded-3xl"
            style={{
              backgroundColor: "rgba(255,253,239,0.04)",
              border: "1px solid rgba(255,253,239,0.12)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Form */}
            <div className="px-6 pt-6 pb-6 md:px-7 md:pt-7 md:pb-7">
              <div
                className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#CFFC68",
                  letterSpacing: "0.2em",
                }}
              >
                <span className="inline-block h-1 w-1 rounded-full bg-[#CFFC68]" />
                {HERO.form_title}
              </div>
              <HeroForm />
              <div
                className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px]"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(255,253,239,0.6)",
                }}
              >
                <span>{HERO.form_note}</span>
                <a
                  href={`mailto:${HERO.contact_email}?subject=Peak%20Season%20Takeover`}
                  className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
                  style={{ color: "#CFFC68" }}
                >
                  {HERO.contact_email}
                </a>
              </div>
            </div>

            {/* Countdown */}
            <div className="border-t px-6 pt-6 pb-6 md:px-7 md:pt-7 md:pb-7" style={{ borderColor: "rgba(255,253,239,0.1)" }}>
              <div
                className="mb-4 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#A5FDF3",
                  letterSpacing: "0.2em",
                }}
              >
                THE COUNTDOWN
              </div>
              <ul className="relative flex flex-col gap-4">
                {/* Vertical thread */}
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
                    className="relative flex items-start gap-3.5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.32 + i * 0.06 }}
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
                        className="mt-0.5 text-sm leading-snug"
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
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ── HERO FORM (2 fields) ─────────────────────────────────────────────────── */

function HeroForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!name.trim() || !email.trim()) {
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
          source: "hero",
        }),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      setStatus("success");
      trackLead("hero");
    } catch (err) {
      console.error("Hero lead form error", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-xl p-4 text-sm"
        style={{
          fontFamily: "var(--font-encode)",
          backgroundColor: "rgba(207,252,104,0.14)",
          color: "#CFFC68",
          border: "1px solid rgba(207,252,104,0.3)",
        }}
      >
        Got it — we&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <form
      name="peak-season-lead"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="form-name" value="peak-season-lead" />
      <input type="hidden" name="source" value="hero" />
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

      <HeroInput
        id="hero-name"
        name="name"
        placeholder="Full name"
        value={name}
        onChange={setName}
        autoComplete="name"
        required
      />
      <HeroInput
        id="hero-email"
        name="email"
        type="email"
        placeholder="you@brand.com"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative mt-1 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        style={{
          fontFamily: "var(--font-inter)",
          backgroundColor: "#CFFC68",
          color: "#0A2B47",
          boxShadow: "4px 5px 0px 0px rgba(20,84,93,0.9)",
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 24px rgba(207,252,104,0.55), 0 0 48px rgba(207,252,104,0.25)",
          }}
        />
        <span className="relative">
          {status === "submitting" ? "Sending…" : "Book free 20-minute call"}
        </span>
        <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">
          <Arrow />
        </span>
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="text-xs"
          style={{ fontFamily: "var(--font-encode)", color: "#FF8FA3" }}
        >
          Please enter your name and email.
        </p>
      )}
    </form>
  );
}

function HeroInput({
  id,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      autoComplete={autoComplete}
      className="w-full rounded-lg border px-4 py-3 text-[15px] transition focus:outline-none"
      style={{
        fontFamily: "var(--font-encode)",
        color: "#FFFDEF",
        backgroundColor: "rgba(255,253,239,0.06)",
        borderColor: "rgba(255,253,239,0.18)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#CFFC68";
        e.currentTarget.style.backgroundColor = "rgba(255,253,239,0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,253,239,0.18)";
        e.currentTarget.style.backgroundColor = "rgba(255,253,239,0.06)";
      }}
    />
  );
}

/* ── GOAL ─────────────────────────────────────────────────────────────────── */

function GoalSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFDEF",
        backgroundImage:
          "radial-gradient(70% 60% at 100% 0%, rgba(207,252,104,0.14) 0%, rgba(207,252,104,0) 65%)",
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
            {GOAL.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {GOAL.heading}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-[62ch] text-base leading-[1.65] md:text-lg md:leading-[1.6]"
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
      </div>
    </section>
  );
}

/* ── 90-DAY RUNWAY ────────────────────────────────────────────────────────── */

function RunwaySection() {
  return (
    <section
      id="the-runway"
      className="relative py-4"
      style={{
        background: "linear-gradient(to bottom, #FFFDEF 0%, #FFFFFF 100%)",
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

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MagneticButton strength={0.15}>
            <Link
              href={RUNWAY.cta.href}
              className="cta-manic relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#FFFDEF",
                boxShadow: "5px 6px 0px 0px #CFFC68",
              }}
            >
              <span className="relative">{RUNWAY.cta.label}</span>
              <Arrow />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ── WHY OMNI COMMON ──────────────────────────────────────────────────────── */

function WhySection() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A2B47" }}
    >
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
            {WHY.eyebrow}
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
            {WHY.heading}
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-[1.6] md:text-lg"
            style={{
              fontFamily: "var(--font-encode)",
              color: "rgba(255,253,239,0.8)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {WHY.description}
          </motion.p>
        </div>

        <motion.h3
          className="mt-16 text-lg font-semibold"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "rgba(165,253,243,0.9)",
            letterSpacing: "-0.01em",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
        >
          {WHY.stats_heading}
        </motion.h3>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {WHY.stats.map((stat, i) => (
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

        <div className="mx-auto mt-14 grid max-w-[1000px] gap-6 md:grid-cols-2">
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
                  Core offer
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

              {/* Month one price */}
              <div className="mt-5 flex items-baseline gap-3">
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
                    fontSize: "clamp(2.5rem, 4vw, 3.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {card.price}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                  }}
                >
                  month one
                </span>
              </div>
              <p
                className="mt-3 text-[14.5px] leading-[1.55]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                }}
              >
                {card.body}
              </p>

              {/* Divider */}
              <div
                className="my-5 h-px"
                style={{
                  backgroundColor: card.highlight ? "rgba(10,43,71,0.15)" : "rgba(10,43,71,0.08)",
                }}
              />

              {/* Ongoing */}
              <div className="flex items-baseline gap-2">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "#0A2B47",
                    fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.recurring}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                  }}
                >
                  /mo · month two onward
                </span>
              </div>
              <p
                className="mt-2 text-[13.5px] leading-[1.55]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: card.highlight ? "rgba(10,43,71,0.85)" : "var(--foreground-muted)",
                }}
              >
                {card.recurringNote}
              </p>

              {/* Card CTA */}
              <Link
                href="#book-intro"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: card.highlight ? "#0A2B47" : "var(--teal)",
                  color: card.highlight ? "#CFFC68" : "#FFFDEF",
                  boxShadow: card.highlight
                    ? "4px 4px 0px 0px rgba(10,43,71,0.15)"
                    : "4px 4px 0px 0px #CFFC68",
                }}
              >
                Book my call
                <Arrow />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TERMS ────────────────────────────────────────────────────────────────── */

function TermsSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="site-container px-6 py-16 md:px-12 md:py-20 lg:px-24">
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
            {TERMS.eyebrow}
          </motion.p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-12 md:grid-cols-4">
          {TERMS.items.map((item, i) => (
            <motion.div
              key={item.label}
              className={
                "text-center " +
                (i < TERMS.items.length - 1 ? "md:border-r" : "")
              }
              style={{ borderColor: "rgba(15,23,42,0.08)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#0A2B47",
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.value}
              </div>
              <div
                className="mt-2 text-[11px] font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--foreground-muted)",
                  letterSpacing: "0.14em",
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
        Book free 20-minute call
        <Arrow />
      </Link>
    </div>
  );
}
