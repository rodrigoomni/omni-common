"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const SERVICES = [
  {
    title: "Community development & brand activations",
    body: "We plan and execute real-world brand moments — from local event participation and pop-ups to partnerships with community organizations. These aren't sponsorships. They're growth strategies that generate PR, social content, and new customer relationships simultaneously.",
    tags: [
      "Event participation",
      "Brand activations",
      "Community programs",
      "Local partnerships",
      "Pop-up experiences",
    ],
  },
  {
    title: "PR & local media relations",
    body: "Every community moment is a press opportunity. We pitch local and regional media, coordinate newsjacking when relevant, and ensure every placement comes with an SEO link — so your PR spend works twice as hard.",
    tags: [
      "Media outreach",
      "Press releases",
      "Newsjacking",
      "Thought leadership",
      "Link acquisition",
    ],
  },
  {
    title: "Local SEO",
    body: "People are searching for businesses like yours near them every day. We make sure you're the answer — across every location, every relevant keyword, and every surface from Google Maps to \"best [category] near me\" results.",
    tags: [
      "Google Business optimization",
      "Local keyword targeting",
      "Location pages",
      "Citation building",
      "Review strategy",
    ],
  },
  {
    title: "Social media",
    body: "When your community development program is running, social content stops being a chore. Real events create real content. We shape that into a social strategy that builds community online and drives people through your doors.",
    tags: [
      "Content strategy",
      "Platform management",
      "Organic content",
      "Paid social",
      "Influencer outreach",
    ],
  },
  {
    title: "Email marketing & lifecycle",
    body: "Both your in-store and online customers belong in the same lifecycle marketing system. We build email and SMS programs that capture both, nurture across channels, and create repeat buyers — in your stores and on your website.",
    tags: [
      "Welcome flows",
      "Lifecycle automation",
      "SMS marketing",
      "Segmentation",
      "Re-engagement",
    ],
  },
  {
    title: "eCommerce integration",
    body: "If you have eCommerce, your stores and your website should be feeding each other — not competing. We align messaging, promotions, and attribution so customers who discover you in-store convert online, and vice versa.",
    tags: [
      "Cross-channel attribution",
      "Online-to-store",
      "Store-to-online",
      "Promotion alignment",
      "Unified analytics",
    ],
  },
];

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

function ServiceCard({
  title,
  body,
  tags,
  index,
}: {
  title: string;
  body: string;
  tags: string[];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface-raised)",
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: "var(--teal)" }}>
          <ArrowUpRight />
        </span>
        <h3
          className="text-lg font-bold tracking-tight md:text-xl"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "var(--foreground)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="mt-4 text-sm leading-relaxed md:text-[15px]"
        style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
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
              borderColor: "var(--border)",
              color: "var(--foreground-secondary)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main className="pt-28 md:pt-32">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="site-container px-6 pb-16 md:px-12 md:pb-20 lg:px-24">
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What We Do
        </motion.p>
        <motion.h1
          className="mt-4 text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "var(--foreground)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Six services.{" "}
          <span style={{ color: "var(--teal)" }}>One omnichannel system.</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Each service can stand on its own — but they're designed to compound. The
          flywheel only spins when every channel feeds the next. Most engagements
          ladder up into our{" "}
          <Link
            href="/insights/local-marketing"
            className="underline-offset-4 hover:underline"
            style={{ color: "var(--teal)" }}
          >
            Local + Omnichannel Growth
          </Link>{" "}
          program.
        </motion.p>
      </section>

      {/* ── Service grid ────────────────────────────────────────────────── */}
      <section
        className="site-container px-6 py-16 md:px-12 md:py-20 lg:px-24"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              body={s.body}
              tags={s.tags}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────────────── */}
      <section
        className="site-container px-6 py-24 md:px-12 md:py-28 lg:px-24"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Curious about a tailored program?
          </motion.p>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-5xl"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's map your growth system together.
          </motion.h2>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#fff",
                boxShadow: "3px 4px 0px 0px var(--lime)",
              }}
            >
              Let&apos;s Chat
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
