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
  const introSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(introRef, { once: true, margin: "-40px" });

  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [darkActive, setDarkActive] = useState(false);

  // Outro animation for the intro section — fades/scales as circle approaches
  useGSAP(
    () => {
      if (!introSectionRef.current || !sectionRef.current) return;

      gsap.to(introSectionRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -60,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          end: "top 40%",
          scrub: 1,
        },
      });
    },
    { scope: introSectionRef }
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !circleRef.current || !contentRef.current)
        return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // From bottom-center, farthest corner is top-left/right
      const maxR = Math.hypot(vw / 2, vh) * 1.15;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* ═══ ENTRY (0 → 0.25) — circle grows from bottom ═══ */

      tl.fromTo(
        circleRef.current,
        { attr: { r: 0, cy: "100%" } },
        {
          attr: { r: maxR },
          duration: 0.25,
          ease: "power2.out",
        },
        0
      );

      // Content appears during circle growth
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.12
      );

      tl.call(() => setContentRevealed(true), [], 0.14);

      // Mark dark zone active only after circle fully covers viewport
      tl.call(() => setDarkActive(true), [], 0.28);

      /* ═══ HOLD (0.25 → 0.75) ═══ */

      /* ═══ EXIT (0.75 → 1.0) — symmetrical to top ═══ */

      // Deactivate dark zone as exit begins
      tl.call(() => setDarkActive(false), [], 0.75);

      tl.to(
        contentRef.current,
        { opacity: 0, y: -30, duration: 0.1, ease: "power2.in" },
        0.82
      );

      // Circle collapses upward to top-center (mirror of entry)
      tl.to(
        circleRef.current,
        {
          attr: { r: 0, cy: "0%" },
          duration: 0.25,
          ease: "power2.in",
        },
        0.75
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── Original "Why Omni Common" section (light background) ── */}
      <section ref={introSectionRef} className="relative z-[1] py-28 md:py-36" style={{ transformOrigin: "center bottom", backgroundColor: "var(--background)" }}>
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
                <div
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
                >
                  <div
                    className="pointer-events-none absolute inset-3 rounded-full opacity-30"
                    style={{ border: `1px solid ${cap.dotColor}` }}
                  />
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
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
                </div>
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
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                >
                  <div
                    className="pointer-events-none absolute inset-3 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ border: `1px solid ${cap.dotColor}` }}
                  />
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Circle Mask scroll transition (dark environment) ── */}
      <section ref={sectionRef} className="relative z-[2]" style={{ height: "200vh" }}>
      <div className="sticky top-0 flex h-screen items-center" data-theme={darkActive ? "dark-teal" : undefined}>
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

              {/* Signature + avatar */}
              <motion.div
                className="mt-12 flex items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Profile photo */}
                <div
                  className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full md:h-16 md:w-16"
                  style={{
                    border: "2px solid var(--lime)",
                    backgroundColor: "rgba(207,252,104,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ryan-charles.png"
                    alt="Ryan Charles"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-base font-semibold tracking-tight md:text-lg"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      color: "#fff",
                    }}
                  >
                    Ryan Charles
                  </p>
                  <p
                    className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] md:text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--mint-dark)",
                    }}
                  >
                    CEO &amp; CMO, Omni Common
                  </p>
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
