"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/components/footer";

/* ──────────────────────────────────────────────────────────────────────────────
   Content — mirrors the "Peak Season Takeover" one-pager sales sheet
   ────────────────────────────────────────────────────────────────────────────── */

const HERO = {
  eyebrow: "Service Offer · 90-Day Account Takeover",
  heading_line1: "Peak Season",
  heading_line2: "Takeover",
  description:
    "Hand us the keys in August. Walk into Black Friday with a paid search account that has already found its rhythm.",
  cta: { label: "Book a 20-minute intro call", href: "#lets-chat" },
};

const TIMELINE = [
  { date: "Aug 17", label: "We take the keys" },
  { date: "Sep–Oct", label: "Rebuild while clicks are cheaper" },
  { date: "Nov 15", label: "Account at full stride" },
  { date: "Nov 27", label: "Black Friday", highlight: true },
];

const GOAL = {
  label: "The Goal",
  body:
    "Foundation work costs a fraction in September what it costs in November, when peak-season bid prices run 20% to 40% above baseline. We take the account now, rebuild the signal underneath it, and get through the volatile phase early so November is execution, not panic optimization.",
};

const RUNWAY = {
  eyebrow: "What's Included · The 90-Day Runway",
  phases: [
    {
      title: "Weeks 1–2 · Take the keys",
      body:
        "Full audit — wasted spend, search-term and negative gaps, Performance Max cannibalizing your brand terms. Conversion tracking rebuilt. Baseline scorecard against last year's Q4.",
    },
    {
      title: "Weeks 3–5 · Rebuild & learn",
      body:
        "Campaign restructure by margin and intent. Bid strategy matched to your actual conversion volume. Ad copy and message match — then a change freeze.",
    },
    {
      title: "Weeks 6–9 · Stabilize & prove",
      body:
        "Search-term mining, negative build-out, budget moved to what's working. Retargeting audiences built and warm while impressions are still cheap. Weekly reads.",
    },
    {
      title: "Weeks 10–13 · Arm for peak",
      body:
        "Q4 promo calendar, promotion extensions and sale annotations live, budget increases set ahead of the ramp, backup creative banked, technical change freeze two weeks out.",
    },
  ],
};

const HOW_IT_WORKS = {
  eyebrow: "How It Works",
  lead_bold: "Why Omni Common.",
  lead:
    " We take over inherited accounts for a living — corrupted conversion data, destabilized bid strategies, runaway Performance Max. Fix the signal, hold the line through learning, then scale.",
  stats: [
    {
      value: "−26.5% CPA",
      caption:
        "Cost per acquisition on a full account takeover — with spend down 8.8% & conversions up 35%",
    },
    {
      value: "+118% TXN",
      caption:
        "increase in conversions YOY in the first 4 months… at a 21% lower CPA YOY",
    },
    {
      value: "$117→$92",
      caption:
        "CPA falling as volume rose — 227 to 496 monthly conversions, beating plan four months running",
    },
  ],
};

const INVESTMENT = {
  primary: {
    eyebrow: "Investment · Paid Search",
    was: "$2,995",
    price: "$990",
    body:
      "Month one — takeover & rebuild. Full audit, tracking rebuild and account restructure. Management included, not billed on top.",
  },
  ongoing: {
    price: "$999",
    unit: "/mo",
    body:
      "Month two onward, through December 31. Goes to $1,995/mo on January 1 — after you've seen your Q4 numbers.",
  },
  addon: {
    eyebrow: "Add-On · Paid Social",
    title: "Meta account takeover",
    body:
      "Same structure and terms. We restructure, rebuild signal with the Conversions API, and optimize existing creative. $990, then $999/mo.",
  },
};

const TERMS = [
  { value: "$5K+/mo", label: "minimum ad spend" },
  { value: "90 days", label: "full term — no opt-out" },
  { value: "10 spots", label: "total client capacity" },
  { value: "Aug 31", label: "enrollment closes" },
];

const CLOSING = {
  heading: "Book a 20-minute intro call",
  body: "We'll look at the account together and tell you whether this is right for you.",
  email: "ryan@omnicommon.com",
  cta: { label: "Book the call", href: "#lets-chat" },
};

/* ──────────────────────────────────────────────────────────────────────────────
   Primitives
   ────────────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Small caps label. Renders as an <h2> for the page's real section headings so
 *  the document outline is correct, and as a <p> for in-card labels. */
function Eyebrow({
  children,
  color = "var(--teal)",
  className = "",
  as: Tag = "p",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  as?: "p" | "h2";
}) {
  return (
    <Tag
      className={`text-[11.5px] font-semibold uppercase ${className}`}
      style={{
        fontFamily: "var(--font-inter)",
        color,
        letterSpacing: "2.88px",
        lineHeight: "15.36px",
      }}
    >
      {children}
    </Tag>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5 11.5 4.5M11.5 4.5H5.75M11.5 4.5v5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────────── */

export default function PeakSeasonView() {
  return (
    <main className="pt-28 md:pt-32" style={{ backgroundColor: "var(--cream)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="site-container relative px-6 pb-20 pt-6 md:px-12 md:pb-24 md:pt-10 lg:px-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-16">
            {/* Left — headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Eyebrow>{HERO.eyebrow}</Eyebrow>
              </motion.div>

              <motion.h1
                className="mt-5"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 900,
                  color: "var(--navy)",
                  letterSpacing: "-0.035em",
                  fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
                  lineHeight: 0.98,
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <span className="block">{HERO.heading_line1}</span>
                <span
                  className="inline-block"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, var(--lime) 0%, var(--lime) 44%, transparent 44%)",
                    paddingRight: "0.06em",
                  }}
                >
                  {HERO.heading_line2}
                </span>
              </motion.h1>

              <motion.p
                className="mt-7 text-lg md:text-xl"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-secondary)",
                  lineHeight: 1.55,
                  maxWidth: "36ch",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                {HERO.description}
              </motion.p>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link
                  href={HERO.cta.href}
                  className="inline-flex items-center gap-2 rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "var(--navy)",
                    color: "#fff",
                    padding: "20px 40px",
                    boxShadow: "6px 6px 0px 0px var(--lime)",
                    lineHeight: "24px",
                  }}
                >
                  {HERO.cta.label}
                  <ArrowUpRight />
                </Link>
              </motion.div>
            </div>

            {/* Right — timeline card */}
            <motion.div
              className="rounded-3xl p-7 md:p-8"
              style={{ backgroundColor: "var(--navy)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <ul className="flex flex-col gap-5">
                {TIMELINE.map((item) => (
                  <li
                    key={item.date}
                    className="grid grid-cols-[86px_minmax(0,1fr)] items-baseline gap-4"
                  >
                    <span
                      className="text-[13px] font-bold uppercase"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: item.highlight ? "var(--lime)" : "var(--mint)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.date}
                    </span>
                    <span
                      className="text-[15px]"
                      style={{
                        fontFamily: "var(--font-encode)",
                        color: "#fff",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The Goal ─────────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-20 md:px-12 md:pb-24 lg:px-24">
        <motion.div
          className="rounded-2xl px-7 py-8 md:px-10 md:py-10"
          style={{ backgroundColor: "#E8EEF1" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="grid gap-4 md:grid-cols-[110px_minmax(0,1fr)] md:gap-8">
            <Eyebrow as="h2" className="md:pt-1.5">
              {GOAL.label}
            </Eyebrow>
            <p
              className="text-base md:text-lg"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-secondary)",
                lineHeight: 1.65,
              }}
            >
              {GOAL.body}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── What's Included ──────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-20 md:px-12 md:pb-24 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow as="h2">{RUNWAY.eyebrow}</Eyebrow>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
          {RUNWAY.phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className="rounded-2xl border bg-white p-7 md:p-8"
              style={{ borderColor: "#F0E9C8" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "var(--navy)",
                  letterSpacing: "-0.01em",
                }}
              >
                {phase.title}
              </h3>
              <p
                className="mt-3 text-[15px]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-muted)",
                  lineHeight: 1.65,
                }}
              >
                {phase.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-20 md:px-12 md:pb-24 lg:px-24">
        <motion.div
          className="rounded-3xl px-7 py-9 md:px-10 md:py-11"
          style={{ backgroundColor: "var(--navy)" }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Eyebrow as="h2" color="var(--lime)">
            {HOW_IT_WORKS.eyebrow}
          </Eyebrow>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-12">
            <p
              className="text-[15px]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: "#fff", fontWeight: 700 }}>
                {HOW_IT_WORKS.lead_bold}
              </strong>
              {HOW_IT_WORKS.lead}
            </p>

            <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {HOW_IT_WORKS.stats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  className="text-center sm:text-center"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-archivo)",
                      fontWeight: 900,
                      color: "var(--lime)",
                      letterSpacing: "-0.03em",
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      lineHeight: 1.05,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mx-auto mt-2 text-[13px]"
                    style={{
                      fontFamily: "var(--font-encode)",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.5,
                      maxWidth: "26ch",
                    }}
                  >
                    {stat.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Investment ───────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-16 md:px-12 md:pb-20 lg:px-24">
        <div className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          {/* Month one — lime */}
          <motion.div
            className="rounded-2xl p-7 md:p-8"
            style={{ backgroundColor: "var(--lime)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Eyebrow as="h2">{INVESTMENT.primary.eyebrow}</Eyebrow>
            <p className="mt-5 flex items-baseline gap-3">
              <span
                className="text-xl line-through"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 700,
                  color: "rgba(10,43,71,0.45)",
                }}
              >
                {INVESTMENT.primary.was}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 900,
                  color: "var(--navy)",
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(2.5rem, 4.4vw, 3.25rem)",
                  lineHeight: 1,
                }}
              >
                {INVESTMENT.primary.price}
              </span>
            </p>
            <p
              className="mt-4 text-[15px]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "#1F3A2E",
                lineHeight: 1.6,
              }}
            >
              {INVESTMENT.primary.body}
            </p>
          </motion.div>

          {/* Month two onward — white */}
          <motion.div
            className="rounded-2xl border bg-white p-7 md:p-8"
            style={{ borderColor: "#F0E9C8" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          >
            <p className="flex items-baseline">
              <span
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 900,
                  color: "var(--navy)",
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(2.5rem, 4.4vw, 3.25rem)",
                  lineHeight: 1,
                }}
              >
                {INVESTMENT.ongoing.price}
              </span>
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 700,
                  color: "var(--foreground-muted)",
                }}
              >
                {INVESTMENT.ongoing.unit}
              </span>
            </p>
            <p
              className="mt-4 text-[15px]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-muted)",
                lineHeight: 1.65,
              }}
            >
              {INVESTMENT.ongoing.body}
            </p>
          </motion.div>

          {/* Add-on — white */}
          <motion.div
            className="rounded-2xl border bg-white p-7 md:p-8"
            style={{ borderColor: "#F0E9C8" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          >
            <Eyebrow>{INVESTMENT.addon.eyebrow}</Eyebrow>
            <h3
              className="mt-3 text-lg font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--navy)",
                letterSpacing: "-0.01em",
              }}
            >
              {INVESTMENT.addon.title}
            </h3>
            <p
              className="mt-3 text-[15px]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-muted)",
                lineHeight: 1.65,
              }}
            >
              {INVESTMENT.addon.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Terms strip ──────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-20 md:px-12 md:pb-24 lg:px-24">
        <motion.dl
          className="grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:flex-wrap md:items-baseline md:gap-x-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {TERMS.map((term) => (
            <div key={term.value} className="flex flex-wrap items-baseline gap-2">
              <dt
                className="text-xl font-bold md:text-2xl"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "var(--navy)",
                  letterSpacing: "-0.02em",
                }}
              >
                {term.value}
              </dt>
              <dd
                className="text-[13px]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-muted)",
                }}
              >
                {term.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-24 md:px-12 md:pb-28 lg:px-24">
        <motion.div
          className="flex flex-col gap-7 rounded-3xl px-7 py-9 md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
          style={{ backgroundColor: "var(--navy)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div>
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {CLOSING.heading}
              <span style={{ color: "var(--lime)" }}>.</span>
            </h2>
            <p
              className="mt-2 text-[15px]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.6,
              }}
            >
              {CLOSING.body}
            </p>
            <a
              href={`mailto:${CLOSING.email}`}
              className="mt-3 inline-block text-[15px] font-semibold transition-opacity hover:opacity-75"
              style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
            >
              {CLOSING.email}
            </a>
          </div>

          <Link
            href={CLOSING.cta.href}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5 md:self-auto"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "var(--lime)",
              color: "var(--navy)",
              padding: "18px 36px",
              lineHeight: "24px",
            }}
          >
            {CLOSING.cta.label}
            <ArrowUpRight />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
