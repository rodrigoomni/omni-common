"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ───────────────────────────────────────────────────────────────────

const icpTags = [
  "Multi-location retail",
  "Physical stores + eCommerce",
  "Franchise brands",
  "Community-driven businesses",
];

const painPoints = [
  {
    strong: "Foot traffic is flat",
    rest: " — you're spending on ads but walk-ins aren't growing with it.",
  },
  {
    strong: "eCommerce and stores aren't talking to each other",
    rest: " — your online and physical channels are running parallel, not together.",
  },
  {
    strong: "Your social content is generic",
    rest: " — stock imagery, bland captions, nothing that reflects the actual energy of your stores.",
  },
  {
    strong: "You're invisible locally",
    rest: ' — competitors who care less than you do are outranking you on "near me" searches.',
  },
  {
    strong: "Community relationships aren't converting",
    rest: " — you sponsor local events, show up at markets, but nothing ties that back to measurable growth.",
  },
];

const flywheelSteps = [
  {
    marker: "01",
    label: "Community development & brand activations",
    text: "Events, partnerships, pop-ups, and brand moments that put you in front of new customers in the real world — not just in a feed.",
  },
  {
    marker: "02",
    label: "PR & earned media",
    text: "Real-world moments generate press-worthy stories. We pitch them, place them, and make sure every placement earns an SEO backlink.",
  },
  {
    marker: "03",
    label: "Social content & brand awareness",
    text: "Activations generate the authentic content your social channels desperately need. Real people. Real moments. Actually worth sharing.",
  },
  {
    marker: "04",
    label: "Local SEO & discovery",
    text: "Brand mentions, backlinks, and Google Business optimization compound into local search authority. You show up when people look for you.",
  },
  {
    marker: "05",
    label: "Email marketing & lifecycle",
    text: "We capture in-store and online customers into email and nurture them across both channels — driving repeat visits and eCommerce purchases.",
  },
  {
    marker: "06",
    label: "Foot traffic + eCommerce growth",
    text: "The whole flywheel feeds both channels. Your physical stores and online store grow together — each one making the other stronger.",
  },
];

const channels = [
  {
    title: "Community development & brand activations",
    badge: "The spark",
    desc: "We plan and execute real-world brand moments — from local event participation and pop-ups to partnerships with community organizations. These aren't sponsorships. They're growth strategies that generate PR, social content, and new customer relationships simultaneously.",
    pills: ["Event participation", "Brand activations", "Local partnerships", "Pop-up experiences", "Community programs"],
  },
  {
    title: "PR & local media relations",
    badge: "Earned authority",
    desc: "Every community moment is a press opportunity. We pitch local and regional media, coordinate newsjacking when relevant, and ensure every placement comes with an SEO link — so your PR spend works twice as hard.",
    pills: ["Media outreach", "Press releases", "Newsjacking", "Thought leadership", "Link acquisition"],
  },
  {
    title: "Local SEO",
    badge: "Always-on discovery",
    desc: 'People are searching for businesses like yours near them every day. We make sure you\'re the answer — across every location, every relevant keyword, and every surface from Google Maps to "best [category] near me" results.',
    pills: ["Google Business optimization", "Local keyword targeting", "Location pages", "Citation building", "Review strategy"],
  },
  {
    title: "Social media",
    badge: "Community amplifier",
    desc: "When your community development program is running, social content stops being a chore. Real events create real content. We shape that into a social strategy that builds community online and drives people through your doors.",
    pills: ["Content strategy", "Platform management", "Organic content", "Paid social", "Influencer outreach"],
  },
  {
    title: "Email marketing & lifecycle",
    badge: "Repeat revenue",
    desc: "Both your in-store and online customers belong in the same lifecycle marketing system. We build email and SMS programs that capture both, nurture across channels, and create repeat buyers — in your stores and on your website.",
    pills: ["Email campaigns", "SMS marketing", "Drip automation", "Cross-channel nurture", "Loyalty programs"],
  },
  {
    title: "eCommerce integration",
    badge: "Omnichannel close",
    desc: "If you have eCommerce, your stores and your website should be feeding each other — not competing. We align messaging, promotions, and attribution so customers who discover you in-store convert online, and vice versa.",
    pills: ["Omnichannel strategy", "CRO for eCommerce", "Cross-channel attribution", "Promotional coordination"],
  },
];

const howSteps = [
  {
    num: "01",
    title: "Community & market audit",
    desc: "We assess your current local presence, review your Google Business profiles across all locations, audit your social content, and map the community opportunities you're not taking advantage of.",
  },
  {
    num: "02",
    title: "Build the community calendar",
    desc: "We create a 90-day community development plan — specific events, partnerships, and activations mapped to your markets. Every initiative is connected to a measurable growth outcome: foot traffic, local search rankings, email signups, or eCommerce conversions.",
  },
  {
    num: "03",
    title: "Activate the flywheel",
    desc: "We execute — handling community development, PR pitching, social content production, local SEO, and email setup in parallel. Everything is coordinated so each activity feeds the next.",
  },
  {
    num: "04",
    title: "Measure & compound",
    desc: "We report on what actually matters: foot traffic, local search rankings, eCommerce revenue, email growth, and community reach. As the flywheel builds momentum, we shift effort to what's compounding fastest.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChannelCard({ ch, index, inView }: { ch: (typeof channels)[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      className="rounded-2xl border p-6 transition-all hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(20,84,93,0.03)",
        borderColor: "var(--border-light)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          className="text-lg font-bold leading-snug tracking-tight"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
        >
          {ch.title}
        </h3>
        <span
          className="mt-0.5 flex-shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: "rgba(20,84,93,0.08)",
            color: "var(--teal)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {ch.badge}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
      >
        {ch.desc}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {ch.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-inter)",
              borderColor: "var(--teal)",
              color: "var(--teal)",
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function HowStep({ step, index, inView }: { step: (typeof howSteps)[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      className="group relative flex flex-col gap-6 py-12 md:flex-row md:items-start md:gap-12 lg:gap-16"
      style={{ borderBottom: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
    >
      {/* Big number */}
      <div className="relative w-max flex-shrink-0 select-none">
        <motion.div
          className="absolute rounded-md"
          style={{
            backgroundColor: "var(--teal)",
            top: "18%",
            left: "-6px",
            width: "110%",
            height: "40%",
            zIndex: 0,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: EASE }}
        />
        <span
          className="relative block font-black leading-none tracking-[-0.06em]"
          style={{
            fontSize: "clamp(5rem, 12vw, 8rem)",
            fontFamily: "var(--font-archivo)",
            color: "rgba(20,84,93,0.12)",
            WebkitTextStroke: "1.5px rgba(20,84,93,0.25)",
            zIndex: 1,
          }}
        >
          {step.num}
        </span>
      </div>

      {/* Title */}
      <div className="flex-shrink-0 md:w-52 md:pt-3">
        <h3
          className="text-2xl font-bold tracking-tight md:text-3xl"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
        >
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <div className="flex-1 md:pt-3">
        <p
          className="max-w-md text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LocalMarketingPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const flywheelRef = useRef(null);
  const flywheelInView = useInView(flywheelRef, { once: true, margin: "-80px" });
  const channelsRef = useRef(null);
  const channelsInView = useInView(channelsRef, { once: true, margin: "-80px" });
  const howRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: "-80px" });

  return (
    <main style={{ backgroundColor: "var(--background)" }}>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-28 md:pt-48 md:pb-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              Local + Omnichannel Growth
            </p>

            <h1
              className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              Your stores exist
              <br />
              <span style={{ color: "var(--teal)" }}>in the real world.</span>
              <br />
              Your marketing should too.
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              Multi-location brands don&apos;t grow from ads alone. They grow because people in the
              community know them, trust them, and talk about them. We build the marketing engine
              that makes that happen — and ties it directly to both foot traffic and eCommerce
              revenue.
            </p>

            {/* ICP tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {icpTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "var(--border)",
                    color: "var(--foreground-subtle)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "var(--teal)",
                  boxShadow: "4px 4px 0px 0px var(--lime)",
                }}
              >
                Book a growth appraisal ↗
              </Link>
              <Link
                href="/work"
                className="text-sm font-semibold transition-colors hover:underline"
                style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-muted)" }}
              >
                See case studies →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-36"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={problemRef}
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              The Problem
            </p>
            <h2
              className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              You have physical locations. That&apos;s an unfair advantage{" "}
              <span style={{ color: "var(--teal)" }}>most brands are wasting.</span>
            </h2>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              Multi-location brands sit on something most digital-only companies will never have:
              real-world presence, community credibility, and the ability to create in-person brand
              moments. The problem? Most treat their stores like liabilities in the marketing mix —
              running national ad spend and generic social posts while the most powerful growth lever
              they have goes untouched.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 max-w-3xl rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--border-light)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5"
                style={{
                  borderBottom: i < painPoints.length - 1 ? "1px solid var(--border-light)" : "none",
                  backgroundColor: "var(--background)",
                }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-sm font-bold"
                  style={{ color: "var(--teal)", fontFamily: "var(--font-inter)" }}
                >
                  —
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                >
                  <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>
                    {item.strong}
                  </strong>
                  {item.rest}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FLYWHEEL ────────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-36"
        style={{ backgroundColor: "var(--cream)", borderTop: "1px solid var(--border)" }}
      >
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={flywheelRef}
            initial={{ opacity: 0, y: 40 }}
            animate={flywheelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              The Flywheel
            </p>
            <h2
              className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              Community development isn&apos;t a feel-good tactic.{" "}
              <span style={{ color: "var(--teal)" }}>It&apos;s your growth flywheel.</span>
            </h2>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              When your brand shows up meaningfully in the real world, everything else gets easier
              and cheaper. Local press covers you. Social content creates itself. New customers
              discover you organically. And your eCommerce benefits from the trust your stores have
              built.
            </p>
          </motion.div>

          <motion.div
            className="mt-14 max-w-3xl rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={flywheelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5"
              style={{
                backgroundColor: "var(--foreground)",
              }}
            >
              <p
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: "var(--font-archivo)", color: "var(--background)" }}
              >
                The Community Growth Flywheel
              </p>
              <p
                className="mt-1 text-sm"
                style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.55)" }}
              >
                Each stage feeds the next — compounding over time
              </p>
            </div>

            {/* Steps */}
            {flywheelSteps.map((step, i) => (
              <div
                key={i}
                className="flex gap-5 px-6 py-5"
                style={{
                  borderTop: "1px solid var(--border-light)",
                  backgroundColor: "var(--background)",
                }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-sm font-bold tabular-nums"
                  style={{ color: "var(--teal)", fontFamily: "var(--font-inter)", minWidth: "2rem" }}
                >
                  {step.marker}
                </span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHANNELS ────────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-36"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={channelsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={channelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              What We Do
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              Six services.{" "}
              <span style={{ color: "var(--teal)" }}>One omnichannel system.</span>
            </h2>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              Every service is designed to feed the others. Together they form a single growth
              system — not a collection of separate tactics.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {channels.map((ch, i) => (
              <ChannelCard key={ch.title} ch={ch} index={i} inView={channelsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ─────────────────────────────────────────────────── */}
      <section
        className="py-28 md:py-36"
        style={{ backgroundColor: "var(--cream)", borderTop: "1px solid var(--border)" }}
      >
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={howRef}
            initial={{ opacity: 0, y: 40 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              How We Work
            </p>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              Strategy first.{" "}
              <span style={{ color: "var(--teal)" }}>
                Real-world execution second.
              </span>
              <br />
              Numbers always.
            </h2>
          </motion.div>

          <div className="mt-4">
            {howSteps.map((step, i) => (
              <HowStep key={step.num} step={step} index={i} inView={howInView} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
