"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import homeContent from "@/content/home.json";

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

const CAPABILITY_VISUALS = [
  { icon: GlobeIcon, bg: "rgba(165,253,243,0.12)", dotColor: "var(--teal)" },
  { icon: PlantIcon, bg: "rgba(207,252,104,0.14)", dotColor: "var(--lime)" },
  { icon: ChartIcon, bg: "rgba(255,253,239,0.55)", dotColor: "var(--foreground-subtle)" },
];

const capabilities = homeContent.why_omni_common.capabilities.map((cap, i) => ({
  ...CAPABILITY_VISUALS[i % CAPABILITY_VISUALS.length],
  title: cap.title,
  desc: cap.description,
}));

export function ValueProp() {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, margin: "-40px" });

  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [darkActive, setDarkActive] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current || !circleRef.current || !contentRef.current)
        return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      // Extra radius on mobile to prevent any clipping
      const maxR = Math.hypot(vw / 2, vh) * (isMobile ? 1.35 : 1.15);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom bottom",
          scrub: isMobile ? 0.5 : 1,
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

      /* ═══ EXIT (0.75 → 1.0) — gentle shrink + fade, not symmetric ═══ */

      // Content fades out softly — small drift, no dramatic upward snap
      tl.to(
        contentRef.current,
        { opacity: 0, y: -12, duration: 0.18, ease: "power1.inOut" },
        0.76
      );

      // Circle retreats back down — same direction it came from.
      // cy sinks well past the bottom edge so the top of the shape
      // descends with the scroll rather than collapsing inward.
      tl.to(
        circleRef.current,
        {
          attr: { r: maxR * 0.65, cy: "-20%" },
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.75
      );

      // Deactivate dark zone once the circle is mostly gone
      tl.call(() => setDarkActive(false), [], 0.88);
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── Circle Mask scroll transition (dark environment) ── */}
      <section ref={sectionRef} className="relative h-[calc(160vh-200px)] md:h-[calc(200vh-200px)]" style={{ zIndex: 2 }}>
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
                {homeContent.intelligence.eyebrow}
              </motion.p>

              {/* Headline */}
              <motion.h2
                className="mt-3 text-2xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {homeContent.intelligence.heading_main}{" "}
                <span style={{ color: "var(--lime)" }}>{homeContent.intelligence.heading_accent}</span>
              </motion.h2>

              {/* Body */}
              <motion.div
                className="mt-5 space-y-4 text-sm leading-relaxed md:mt-8 md:space-y-5 md:text-base"
                style={{ fontFamily: "var(--font-encode)", color: "var(--mint-light)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {homeContent.intelligence.body_paragraphs.map((p, i) => (
                  <p key={i} className={i % 2 === 1 ? "hidden md:block" : undefined}>{p}</p>
                ))}
              </motion.div>

              {/* Signature + avatar */}
              <motion.div
                className="mt-6 flex items-center gap-5 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={contentRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
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
                    alt={homeContent.intelligence.founder_name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-base font-semibold tracking-tight md:text-lg"
                    style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
                  >
                    {homeContent.intelligence.founder_name}
                  </p>
                  <p
                    className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] md:text-sm"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--mint-dark)" }}
                  >
                    {homeContent.intelligence.founder_title}
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="mt-5 md:mt-10"
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

      {/* ── "Why Omni Common" section (light background) ── */}
      <section className="py-28 md:py-36" style={{ backgroundColor: "var(--background)" }}>
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
                {homeContent.why_omni_common.eyebrow}
              </p>
              <h2
                className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight md:text-[2.75rem]"
                style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
              >
                {homeContent.why_omni_common.heading_main}{" "}
                <span style={{ color: "var(--teal)" }}>
                  {homeContent.why_omni_common.heading_accent}
                </span>
              </h2>
            </div>
            <div>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
              >
                {homeContent.why_omni_common.intro}
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
    </>
  );
}
