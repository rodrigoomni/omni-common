"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";

/* ──────────────────────────────────────────────────────────────────────────────
   Static content (Figma — node 2029:465)
   ────────────────────────────────────────────────────────────────────────── */

const HERO = {
  eyebrow: "Local + Omnichannel Growth",
  heading_main: "Your stores exist in the real world.",
  heading_accent: "Your marketing should too.",
  description:
    "Multi-location brands don't grow from ads alone. They grow because people in the community know them, trust them, and talk about them. We build the marketing engine that makes that happen — and ties it directly to both foot traffic and eCommerce revenue.",
  tags: [
    "Multi-location retail",
    "Physical stores + eCommerce",
    "Franchise brands",
    "Community-driven businesses",
  ],
  primary_cta: { label: "Book a growth appraisal", href: "/contact" },
  secondary_cta: { label: "See case studies", href: "/work" },
};

const TOC_ITEMS: TocItem[] = [
  { id: "problem", label: "The Problem" },
  { id: "flywheel", label: "The Flywheel" },
  { id: "services", label: "What We Do" },
  { id: "process", label: "How We Work" },
];

const PROBLEM = {
  eyebrow: "The Problem",
  heading:
    "You have physical locations. That's an unfair advantage most brands are wasting.",
  description:
    "Multi-location brands sit on something most digital-only companies will never have: real-world presence, community credibility, and the ability to create in-person brand moments. The problem? Most treat their stores like liabilities in the marketing mix — running national ad spend and generic social posts while the most powerful growth lever they have goes untouched.",
  bullets: [
    {
      lead: "Foot traffic is flat",
      body: " — you're spending on ads but walk-ins aren't growing with it.",
    },
    {
      lead: "eCommerce and stores aren't talking to each other",
      body: " — your online and physical channels are running parallel, not together.",
    },
    {
      lead: "Your social content is generic",
      body: " — stock imagery, bland captions, nothing that reflects the actual energy of your stores.",
    },
    {
      lead: "You're invisible locally",
      body: ' — competitors who care less than you do are outranking you on "near me" searches.',
    },
    {
      lead: "Community relationships aren't converting",
      body: " — you sponsor local events, show up at markets, but nothing ties that back to measurable growth.",
    },
  ],
};

const FLYWHEEL = {
  eyebrow: "The Flywheel",
  heading: "Community development isn't a feel-good tactic. It's your growth flywheel.",
  description:
    "When your brand shows up meaningfully in the real world, everything else gets easier and cheaper. Local press covers you. Social content creates itself. New customers discover you organically. And your eCommerce benefits from the trust your stores have built.",
  title: "The Community Growth Flywheel",
  steps: [
    {
      title: "Community development & brand activations",
      body: "Events, partnerships, pop-ups, and brand moments that put you in front of new customers in the real world — not just in a feed.",
    },
    {
      title: "PR & earned media",
      body: "Real-world moments generate press-worthy stories. We pitch them, place them, and make sure every placement earns an SEO backlink.",
    },
    {
      title: "Social content & brand awareness",
      body: "Activations generate the authentic content your social channels desperately need. Real people. Real moments. Actually worth sharing.",
    },
    {
      title: "Local SEO & discovery",
      body: "Brand mentions, backlinks, and Google Business optimization compound into local search authority. You show up when people look for you.",
    },
    {
      title: "Email marketing & lifecycle",
      body: "We capture in-store and online customers into email and nurture them across both channels — driving repeat visits and eCommerce purchases.",
    },
    {
      title: "Foot traffic + eCommerce growth",
      body: "The whole flywheel feeds both channels. Your physical stores and online store grow together — each one making the other stronger.",
    },
  ],
};

const SERVICES = {
  eyebrow: "What We Do",
  heading_main: "Six Services.",
  heading_accent: "One Omnichannel System.",
  description:
    "When your brand shows up meaningfully in the real world, everything else gets easier and cheaper. Local press covers you. Social content creates itself. New customers discover you organically. And your eCommerce benefits from the trust your stores have built.",
  items: [
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
  ],
};

const PROCESS = {
  eyebrow: "How We Work",
  heading_main: "Strategy First.",
  heading_accent: "Real-World Execution Second.",
  heading_tail: "Numbers Always.",
  steps: [
    {
      title: "Community & market audit",
      body: "We assess your current local presence, review your Google Business profiles across all locations, audit your social content, and map the community opportunities you're not taking advantage of.",
    },
    {
      title: "Build the community calendar",
      body: "We create a 90-day community development plan — specific events, partnerships, and activations mapped to your markets. Every initiative is connected to a measurable growth outcome: foot traffic, local search rankings, email signups, or eCommerce conversions.",
    },
    {
      title: "Activate the flywheel",
      body: "We execute — handling community development, PR pitching, social content production, local SEO, and email setup in parallel. Everything is coordinated so each activity feeds the next.",
    },
    {
      title: "Measure & compound",
      body: "We report on what actually matters: foot traffic, local search rankings, eCommerce revenue, email growth, and community reach. As the flywheel builds momentum, we shift effort to what's compounding fastest.",
    },
  ],
};

const CLOSING = {
  eyebrow: "Are you ready to start your journey with us?",
  heading: "We've helped dozens more brands grow.",
  description:
    "From early-stage DTC brands to established enterprises, our work spans industries and scales. Reach out to hear more.",
  cta: { label: "Let's Chat", href: "/contact" },
};

/* ──────────────────────────────────────────────────────────────────────────────
   Reusable blocks
   ────────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  heading,
  headingMain,
  headingAccent,
  headingTail,
}: {
  eyebrow: string;
  heading?: string;
  headingMain?: string;
  headingAccent?: string;
  headingTail?: string;
}) {
  return (
    <div className="mb-8">
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
        style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-3xl font-bold tracking-tight md:text-[40px] md:leading-[1.05]"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "var(--foreground)",
          letterSpacing: "-0.029em",
        }}
      >
        {heading ? (
          heading
        ) : (
          <>
            {headingMain}{" "}
            {headingAccent && (
              <span style={{ color: "var(--teal)" }}>{headingAccent}</span>
            )}
            {headingTail && (
              <>
                <br />
                {headingTail}
              </>
            )}
          </>
        )}
      </h2>
    </div>
  );
}

/** Decorative pink wavy swoosh used for problem bullets (matches Figma). */
function BulletCurl() {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 9 C 3 3, 6 3, 8 9 S 13 15, 15 9 S 20 3, 20.5 6"
        stroke="#E89AAE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

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

function ProblemBulletRow({
  lead,
  body,
  index,
}: {
  lead: string;
  body: string;
  index: number;
}) {
  return (
    <motion.li
      className="flex items-start gap-3 pr-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center">
        <BulletCurl />
      </span>
      <p
        className="text-base leading-[1.625] md:text-[17px]"
        style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
      >
        <span className="font-bold" style={{ color: "var(--foreground)" }}>
          {lead}
        </span>
        {body}
      </p>
    </motion.li>
  );
}

function FlywheelStepRow({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      className="grid grid-cols-[50px_1fr] items-start gap-x-1 pr-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="text-xl font-bold leading-6"
        style={{ fontFamily: "var(--font-archivo)", color: "#262626" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h4
          className="text-[18px] font-bold leading-[26px]"
          style={{ fontFamily: "var(--font-archivo)", color: "#262626" }}
        >
          {title}
        </h4>
        <p
          className="text-base leading-[26px]"
          style={{ fontFamily: "var(--font-encode)", color: "#3d3d3d" }}
        >
          {body}
        </p>
      </div>
    </motion.div>
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
      className="flex flex-col gap-4 pb-2 pt-2"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "var(--teal)" }} className="shrink-0">
          <ArrowUpRight />
        </span>
        <h3
          className="text-[18px] font-bold leading-[26px] capitalize"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--teal)" }}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-sm leading-[21.84px]"
        style={{ fontFamily: "var(--font-encode)", color: "#454545" }}
      >
        {body}
      </p>
      <div className="mt-auto flex flex-wrap items-start gap-x-[7.7px] gap-y-2 pt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border px-[12.48px] py-[4px] text-[10.5px] font-semibold uppercase tracking-[0.054em]"
            style={{
              fontFamily: "var(--font-inter)",
              borderColor: "#888",
              color: "#888",
              lineHeight: "15.36px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProcessStepRow({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const stepImage = `/images/process-step-${String(index + 1).padStart(2, "0")}.png`;
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[75px_minmax(0,1fr)] items-start gap-x-6 gap-y-3 border-b py-10 md:grid-cols-[150px_184px_minmax(0,1fr)] md:gap-x-[44px] md:pb-[41px] md:pt-12"
      style={{ borderColor: "#d1d1d1" }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="row-span-2 md:row-span-1 md:w-[150px]">
        <Image
          src={stepImage}
          alt={`Step ${String(index + 1).padStart(2, "0")}`}
          width={400}
          height={300}
          className="h-auto w-full max-w-[90px] md:max-w-none"
          priority={index < 2}
        />
      </div>
      <div className="md:py-4 md:w-[184px]">
        <h3
          className="text-xl font-bold capitalize md:text-[26px] md:leading-[normal]"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "#262626",
            letterSpacing: "-0.028em",
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="col-span-2 text-sm leading-[21.84px] md:col-span-1 md:py-4"
        style={{ fontFamily: "var(--font-encode)", color: "#454545" }}
      >
        {body}
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default function LocalMarketingPage() {
  return (
    <main className="pt-28 md:pt-32">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #ffffff 45%, #FFFDEF 100%)",
        }}
      >
        <div className="site-container relative px-6 pb-32 pt-4 md:px-12 md:pb-40 md:pt-6 lg:px-24 lg:pb-48">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            className="mt-4 text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl xl:text-[6.5rem] lg:leading-[1.02]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--foreground)",
              letterSpacing: "-0.04em",
              maxWidth: "22ch",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO.heading_main}{" "}
            <span style={{ color: "var(--teal)" }}>{HERO.heading_accent}</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO.description}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {HERO.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1.5 text-xs font-medium"
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: "var(--border)",
                  color: "var(--foreground-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href={HERO.primary_cta.href}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#fff",
                boxShadow: "3px 4px 0px 0px var(--lime)",
              }}
            >
              {HERO.primary_cta.label}
              <span aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Link>
            <Link
              href={HERO.secondary_cta.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-inter)", color: "var(--foreground)" }}
            >
              {HERO.secondary_cta.label} <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {/* Hero illustration — bottom right, smaller */}
          <motion.div
            className="pointer-events-none absolute right-4 bottom-6 w-[140px] sm:right-8 sm:w-[180px] md:right-12 md:bottom-10 md:w-[220px] lg:right-24 lg:bottom-14 lg:w-[260px]"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <Image
              src="/images/local-marketing-hero.png"
              alt=""
              width={420}
              height={340}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Content with sticky TOC ─────────────────────────────────────── */}
      <section
        className="site-container px-6 py-16 md:px-12 md:py-20 lg:px-24"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-24">
          {/* Sticky TOC (desktop) */}
          <TableOfContents
            items={TOC_ITEMS}
            variant="sticky"
            ariaLabel="Local marketing contents"
            ctaText="Unleash hyper-local activation and address every aspect of channel marketing."
          />

          {/* Content column */}
          <div className="max-w-[760px]">
            {/* Inline TOC (mobile) */}
            <div className="mb-14 lg:hidden">
              <TableOfContents
                items={TOC_ITEMS}
                variant="inline"
                ariaLabel="Local marketing contents"
              />
            </div>

            {/* The Problem */}
            <section id="problem" className="scroll-mt-32">
              <SectionHeader eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />
              <p
                className="text-base leading-[1.75] md:text-[17px] md:leading-[1.7]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-secondary)",
                }}
              >
                {PROBLEM.description}
              </p>

              <ul className="mt-12 flex flex-col gap-4">
                {PROBLEM.bullets.map((b, i) => (
                  <ProblemBulletRow key={i} lead={b.lead} body={b.body} index={i} />
                ))}
              </ul>
            </section>

            {/* The Flywheel */}
            <section id="flywheel" className="mt-28 scroll-mt-32">
              <SectionHeader eyebrow={FLYWHEEL.eyebrow} heading={FLYWHEEL.heading} />
              <p
                className="text-base leading-[1.625] md:text-[17px] md:leading-[1.7]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "#3d3d3d",
                }}
              >
                {FLYWHEEL.description}
              </p>

              {/* Flywheel card — white bg, teal header, layered ambient shadow */}
              <div
                className="mt-12 overflow-hidden rounded-lg border bg-white"
                style={{
                  borderColor: "rgba(15, 23, 42, 0.06)",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                }}
              >
                <div
                  className="px-7 py-6"
                  style={{ backgroundColor: "var(--teal)" }}
                >
                  <h3
                    className="text-[22px] font-bold leading-6"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      color: "#fff",
                    }}
                  >
                    {FLYWHEEL.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-8 px-7 py-9">
                  {FLYWHEEL.steps.map((step, i) => (
                    <FlywheelStepRow
                      key={step.title}
                      index={i}
                      title={step.title}
                      body={step.body}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* What We Do — flat 2-col layout with dividers */}
            <section id="services" className="mt-28 scroll-mt-32">
              <SectionHeader
                eyebrow={SERVICES.eyebrow}
                headingMain={SERVICES.heading_main}
                headingAccent={SERVICES.heading_accent}
              />
              <p
                className="text-base leading-[1.625] md:text-[17px] md:leading-[1.7]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "#3d3d3d",
                }}
              >
                {SERVICES.description}
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2">
                {SERVICES.items.map((item, i) => {
                  const isFirstRow = i < 2;
                  const isLeftCol = i % 2 === 0;
                  return (
                    <div
                      key={item.title}
                      className="pb-10 pt-10 md:pb-[40px] md:pt-[40px]"
                      style={{
                        borderBottom:
                          i >= SERVICES.items.length - (SERVICES.items.length % 2 === 0 ? 2 : 1)
                            ? "none"
                            : "1px solid #d1d1d1",
                        borderTop: isFirstRow ? "1px solid #d1d1d1" : "none",
                        paddingRight: isLeftCol ? "0" : "0",
                        paddingLeft: isLeftCol ? "0" : "40px",
                      }}
                    >
                      <ServiceCard
                        title={item.title}
                        body={item.body}
                        tags={item.tags}
                        index={i}
                      />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* How We Work — illustrated numbers, 3-col layout */}
            <section id="process" className="mt-28 scroll-mt-32">
              <SectionHeader
                eyebrow={PROCESS.eyebrow}
                headingMain={PROCESS.heading_main}
                headingAccent={PROCESS.heading_accent}
                headingTail={PROCESS.heading_tail}
              />

              <div className="mt-8">
                {PROCESS.steps.map((step, i) => (
                  <ProcessStepRow
                    key={step.title}
                    index={i}
                    title={step.title}
                    body={step.body}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section
        className="relative"
        style={{
          backgroundColor: "rgba(255, 253, 239, 0.6)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="site-container px-6 py-24 md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {CLOSING.eyebrow}
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
            {CLOSING.heading}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-muted)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {CLOSING.description}
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href={CLOSING.cta.href}
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#fff",
                boxShadow: "3px 4px 0px 0px var(--lime)",
              }}
            >
              {CLOSING.cta.label}
            </Link>
          </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
