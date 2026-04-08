"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DoodleCircle } from "./doodle-circle";

gsap.registerPlugin(ScrollTrigger);

// Inline SVG illustrations
function GlobeIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/seo-illustration.svg" alt="" width={80} height={80} />
  );
}

function PlantIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/growth-illustration.svg" alt="" width={80} height={110} />
  );
}

function ChartIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/cmm-illustration.svg" alt="" width={80} height={72} />
  );
}

const capabilities = [
  {
    icon: GlobeIcon,
    title: "CEOs call us",
    desc: "We speak the language of growth, margins, and market share — not vanity metrics.",
    bg: "rgba(165,253,243,0.12)",
    dotColor: "var(--teal)",
  },
  {
    icon: PlantIcon,
    title: "CFOs love us",
    desc: "Every dollar is tracked, attributed, and optimized. Transparent ROI, always.",
    bg: "rgba(207,252,104,0.14)",
    dotColor: "var(--lime)",
  },
  {
    icon: ChartIcon,
    title: "CMOs want to be us",
    desc: "We architect the growth systems that in-house teams aspire to build.",
    bg: "rgba(255,253,239,0.55)",
    dotColor: "var(--foreground-subtle)",
  },
];

export function ValueProp() {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, margin: "-40px" });

  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentRevealed, setContentRevealed] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current || !circleRef.current || !contentRef.current)
        return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // From bottom-center, farthest corner is top-left/right
      const maxR = Math.hypot(vw / 2, vh) * 1.05;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      /* ═══ ENTRY PHASE (0 → 0.35) — circle grows from bottom ═══ */

      tl.fromTo(
        circleRef.current,
        { attr: { r: 0, cy: "100%" } },
        {
          attr: { r: maxR },
          duration: 0.35,
          ease: "power3.out",
        },
        0
      );

      // Content appears earlier for fast-scroll tolerance
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0.2
      );

      tl.call(() => setContentRevealed(true), [], 0.22);

      /* ═══ HOLD PHASE (0.35 → 0.65) ═══ */

      /* ═══ EXIT PHASE (0.65 → 1.0) — symmetrical to top ═══ */

      // Content leaves later for fast-scroll tolerance
      tl.to(
        contentRef.current,
        { opacity: 0, y: -40, duration: 0.12, ease: "power2.in" },
        0.78
      );

      // Circle collapses upward to top-center (mirror of entry)
      tl.to(
        circleRef.current,
        {
          attr: { r: 0, cy: "0%" },
          duration: 0.35,
          ease: "power3.in",
        },
        0.65
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── Original "Why Omni Common" section (light background) ── */}
      <section className="py-28 md:py-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div
            ref={introRef}
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

          {/* Triple Venn diagram — vertical on mobile */}
          <div className="mt-20 flex flex-col items-center md:hidden">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const zIndexes = [3, 2, 1];
              return (
                <motion.div
                  key={cap.title}
                  className="group flex flex-col items-center justify-center rounded-full text-center"
                  style={{
                    width: "min(calc(100vw - 24px), 420px)",
                    height: "min(calc(100vw - 24px), 420px)",
                    marginTop: i === 0 ? 0 : "-20px",
                    zIndex: zIndexes[i],
                    position: "relative",
                    backgroundColor: cap.bg,
                    border: "1px solid rgba(255,255,255,0.45)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="pointer-events-none absolute inset-3 rounded-full opacity-30"
                    style={{ border: `1px solid ${cap.dotColor}` }}
                  />
                  <div className="mb-3 flex items-center justify-center">
                    <Icon />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="mt-1.5 max-w-[180px] text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                  >
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: horizontal row with overlap */}
          <div
            className="relative mt-24 -mx-12 hidden items-center justify-center md:flex lg:-mx-24"
            style={{
              ["--d" as string]: "min(34vw, 620px)",
              height: "var(--d)",
            }}
          >
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const zIndexes = [3, 1, 2];
              const animOrder = i === 1 ? 0 : i === 0 ? 1 : 2;
              const leftCalc = [
                "calc(50% - var(--d) / 2 - var(--d) + 20px)",
                "calc(50% - var(--d) / 2)",
                "calc(50% - var(--d) / 2 + var(--d) - 20px)",
              ];

              return (
                <motion.div
                  key={cap.title}
                  className="group absolute flex flex-col items-center justify-center rounded-full text-center transition-all duration-500"
                  style={{
                    width: "var(--d)",
                    height: "var(--d)",
                    left: leftCalc[i],
                    zIndex: zIndexes[i],
                    backgroundColor: cap.bg,
                    border: "1px solid rgba(255,255,255,0.45)",
                    backdropFilter: "blur(18px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(18px) saturate(1.3)",
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.15 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                >
                  <div
                    className="pointer-events-none absolute inset-3 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ border: `1px solid ${cap.dotColor}` }}
                  />
                  <div className="mb-4 flex items-center justify-center">
                    <Icon />
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight lg:text-xl xl:text-2xl"
                    style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[65%] text-xs leading-relaxed lg:text-sm"
                    style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                  >
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Circle Mask scroll transition (dark environment) ── */}
      <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Clean circle mask — sharp edges, grows from bottom center */}
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          <circle
            ref={circleRef}
            cx="50%"
            cy="100%"
            r="0"
            style={{ fill: "var(--hero-dark)" }}
          />
        </svg>

        {/* Content layer */}
        <div
          ref={contentRef}
          className="relative z-10 w-full"
          style={{ opacity: 0 }}
        >
          <div className="site-container px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-3xl">
              {/* Eyebrow */}
              <motion.p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                From Our Founder
              </motion.p>

              {/* Headline — same style as site headings */}
              <motion.h2
                className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Growth by honing your spend where it&apos;s{" "}
                <span style={{ color: "var(--lime)" }}>statistically needed.</span>
              </motion.h2>

              {/* Body — same font/sizing as site body text */}
              <motion.div
                className="mt-8 space-y-5 text-base leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--mint-light)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>
                  Omni Common was initially born out of my consulting agency,
                  thoughtfully developed over time into a talented team of
                  &ldquo;make-it-grow&rdquo; experts who tackle the spend
                  that&apos;s vital for your growth.
                </p>
                <p>
                  For years, we&apos;ve worked with all types of businesses that
                  lacked things such as a growth timeline at an executive level,
                  a marketing team (or a big enough one), or simply felt like
                  they plateaued. To help them grow, we developed a unique
                  marketing mix model (MMM) approach with a foundation in
                  tactical data analysis — unifying SEO, PPC, CRO, content
                  marketing, and PR. Because a one-size-fits-all blanket
                  strategy won&apos;t work — it&apos;s all about the variables
                  you need.
                </p>
                <p>
                  Only after determining where you need growth will your
                  business start to efficiently scale up — what&apos;s the point
                  of drumming up growth that has no ROI?
                </p>
                <p>
                  I believe in this omni-channel, data-and-deliverable-driven
                  growth model so much, we built Omni Common from the ground up
                  to execute it from anywhere you are on your journey. We will
                  audit and assess, bolt on to your existing team, or simply
                  become your CMO. Whatever the data says is needed, we&apos;ll
                  show you, then get it done together.
                </p>
              </motion.div>

              {/* Signature + headshot */}
              <motion.div
                className="mt-12 flex items-end justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="block h-px w-10"
                      style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="text-2xl italic md:text-3xl"
                      style={{
                        fontFamily: "'Georgia', serif",
                        color: "#fff",
                      }}
                    >
                      Ryan Charles
                    </span>
                  </div>
                  <p
                    className="mt-1.5 pl-[52px] text-xs font-medium tracking-wide md:text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--mint-dark)",
                    }}
                  >
                    CEO and CMO, Omni Common
                  </p>
                </div>
                {/* Profile pic placeholder */}
                <div
                  className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full md:h-20 md:w-20"
                  style={{
                    border: "3px solid var(--lime)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ryan-placeholder.jpg"
                    alt="Ryan Charles"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 16 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white/10"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "#fff",
                  }}
                >
                  Let&apos;s Chat
                  <span className="text-base">&rarr;</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
