"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
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
  { icon: PlantIcon, bg: "rgba(207,252,104,0.24)", dotColor: "var(--lime)" },
  { icon: ChartIcon, bg: "rgba(255,253,239,0.55)", dotColor: "var(--foreground-subtle)" },
];

type CapabilityEntry = {
  title: string;
  description: string;
  title_color?: string;
  kicker?: string;
};

const capabilities = (
  homeContent.why_omni_common.capabilities as CapabilityEntry[]
).map((cap, i) => ({
  ...CAPABILITY_VISUALS[i % CAPABILITY_VISUALS.length],
  title: cap.title,
  desc: cap.description,
  kicker: cap.kicker,
  titleColor: cap.title_color,
}));

function BoldMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [darkActive, setDarkActive] = useState(false);

  // Letter fades in as it scrolls into view from the bottom of the viewport.
  // Progress 0 = letter top at viewport bottom; progress 1 = letter top at
  // ~30% from viewport top. Opacity ramps 0 → 1 across that window.
  const { scrollYProgress: letterProgress } = useScroll({
    target: letterRef,
    offset: ["start end", "start 30%"],
  });
  const letterOpacity = useTransform(letterProgress, [0, 1], [0, 1]);

  useGSAP(
    () => {
      if (!sectionRef.current || !circleRef.current) return;

      const section = sectionRef.current;
      // Trigger off the previous section (RealPeople) so the circle starts
      // growing as its title clears the viewport top.
      const triggerEl =
        (section.parentElement?.previousElementSibling as HTMLElement | null) ??
        section;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      const maxR = Math.hypot(vw / 2, vh) * (isMobile ? 1.35 : 1.15);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: isMobile ? "top top-=120" : "top top-=280",
          endTrigger: section,
          // Fire the animation end BEFORE the sticky unpins so the receded
          // dome can hold in place while the user continues scrolling — no
          // collision with the footer, because the section still has runway
          // after this point.
          end: "top top-=200%",
          scrub: isMobile ? 0.5 : 1,
          // Progress-driven state so darkActive resets correctly whether the
          // user scrolls forward OR backward. Timeline callbacks (tl.call)
          // don't reliably fire on reverse-scrub, which was leaving the nav
          // stuck in dark-teal after scrolling back up past the letter.
          onUpdate: (self) => {
            const active = self.progress > 0.32 && self.progress < 0.9;
            setDarkActive((prev) => (prev === active ? prev : active));
          },
        },
      });

      /* ═══ ENTRY — circle grows to full cover ═══ */
      tl.fromTo(
        circleRef.current,
        { attr: { r: 0, cy: "100%" }, opacity: 1 },
        { attr: { r: maxR }, duration: 0.35, ease: "power2.out" },
        0
      );

      /* ═══ EXIT — circle recedes upward and shrinks a bit, leaving a dome
         anchored at the TOP of the viewport. It stays visible so it overlaps
         (and sits above) the top of the footer / next section as they scroll
         in from below. Inverted vertically from the entry direction. */
      tl.to(
        circleRef.current,
        {
          attr: { r: maxR * 0.65, cy: "-20%" },
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.75
      );
    },
    { scope: sectionRef }
  );

  return (
    /* ── Circle Mask scroll transition (dark environment) ──
       Only the circle SVG is fixed. The letter flows with the page — it
       enters from below with the scroll and fades in as it climbs into
       view. This gives the reading-a-letter feel rather than a stuck sheet. */
    <section
      ref={sectionRef}
      // Generous bottom padding gives the sticky container enough runway
      // to hold the receded dome in place after the animation completes,
      // then scroll fully off the top of the viewport BEFORE the footer
      // arrives from below. Otherwise, on shorter desktops the dome would
      // still be visible when the footer enters.
      className="relative pb-[150vh]"
      style={{ zIndex: 2 }}
      data-theme={darkActive ? "dark-teal" : undefined}
    >
      {/* Sticky circle container — pins to the top of the viewport while the
          section is scrolling through, then naturally scrolls up with the
          section at the end. This is how the live-site letter section behaves:
          when the outro finishes, the receded dome stays in the flow above
          the footer and scrolls off naturally as the user keeps scrolling.
          The -mb-[100vh] cancels the 100vh flow height so the letter below
          starts at the section top and can overlap the sticky area visually. */}
      <div
        className="pointer-events-none sticky top-0 -mb-[100vh] h-screen w-full"
        style={{ zIndex: 30 }}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          <circle
            ref={circleRef}
            cx="50%"
            cy="100%"
            r="0"
            style={{ fill: "var(--hero-dark)" }}
          />
        </svg>
      </div>

      {/* Letter — natural flow, scroll-tied fade in. Padded-top gives the
          entrance runway so the letter climbs into view while the sticky
          circle is pinned covering the viewport. */}
      <motion.div
        ref={letterRef}
        className="relative mx-auto max-w-3xl px-6 pt-[80vh] md:px-8"
        style={{ zIndex: 40, opacity: letterOpacity }}
      >
        <div className="w-full">
          <div className="mx-auto max-w-3xl">
              {/* Eyebrow */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
              >
                {homeContent.intelligence.eyebrow}
              </p>

              {/* Headline */}
              <h2
                className="mt-2 text-2xl font-bold leading-[1.05] tracking-tight md:mt-3 md:text-4xl"
                style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
              >
                <span className="block">{homeContent.intelligence.heading_main}</span>
                <span className="block" style={{ color: "var(--lime)" }}>{homeContent.intelligence.heading_accent}</span>
              </h2>

              {/* Body */}
              <div
                className="mt-4 space-y-2.5 text-[13px] leading-[1.5] md:mt-5 md:space-y-3 md:text-[15px] md:leading-[1.55]"
                style={{ fontFamily: "var(--font-encode)", color: "var(--mint-light)" }}
              >
                {homeContent.intelligence.body_paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    <BoldMarkdown text={p} />
                  </p>
                ))}
              </div>

              {/* Signature + avatar */}
              <div
                className="mt-5 flex items-center gap-4 md:mt-6"
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
              </div>

              {/* CTA */}
              <div className="mt-5 md:mt-10">
                <a
                  href="#lets-chat"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white/10"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "#fff",
                  }}
                >
                  {homeContent.intelligence.cta_button}
                  <span className="text-base">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
    </section>
  );
}

export function WhyItWorks() {
  const introRef = useRef(null);
  const wygRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(introRef, { once: true, margin: "-40px" });
  // Triggers as soon as the WYG title stack peeks into the viewport bottom.
  // Line animation is replayable (fires every time the block re-enters view);
  // text reveal fires only once so the copy stays stable on re-scroll.
  const wygInView = useInView(wygRef, { margin: "0px 0px -40px 0px" });
  const wygInViewOnce = useInView(wygRef, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section
      className="py-28 md:py-36"
      style={{ background: "linear-gradient(to bottom, #FFFDEF 0%, #FFFFFF 100%)" }}
    >
      <div className="site-container px-6 md:px-12 lg:px-24">
        <div
          ref={introRef}
          className="flex flex-col items-center gap-10 text-center md:gap-12"
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "#14545D" }}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.why_omni_common.eyebrow}
          </motion.p>
          <h2
            className="flex flex-col gap-2 leading-[0.97] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#262626",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            {homeContent.why_omni_common.heading_lines.map((line, i) => {
              const lineBase = 0.12 + i * 0.28;
              return (
                <span key={i} className="block font-normal">
                  <motion.span
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: lineBase, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.prefix}
                  </motion.span>
                  <motion.span
                    className="inline-block font-bold"
                    style={{ color: line.highlight_1_color }}
                    initial={{ opacity: 0, y: 22, scale: 0.92 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.55, delay: lineBase + 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {line.highlight_1}
                  </motion.span>
                  <motion.span
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: lineBase + 0.16, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.connector}
                  </motion.span>
                  <motion.span
                    className="inline-block font-bold"
                    style={{ color: line.highlight_2_color }}
                    initial={{ opacity: 0, y: 22, scale: 0.92 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.55, delay: lineBase + 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {line.highlight_2}
                  </motion.span>
                </span>
              );
            })}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.18 + homeContent.why_omni_common.heading_lines.length * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={homeContent.why_omni_common.cta_href}
              className="group inline-flex items-center gap-2 rounded-full border border-[#124C54] bg-transparent px-[25px] py-[13px] text-[#14545D] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#14545D] hover:text-white"
            >
              <span
                className="font-semibold leading-[1.428]"
                style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
              >
                {homeContent.why_omni_common.cta_label}
              </span>
              <span
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: 1.5,
                }}
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Triple Venn diagram — vertical on mobile / tablet */}
        <div className="mt-20 flex flex-col items-center lg:hidden">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const zIndexes = [3, 2, 1];
            return (
              <motion.div
                key={cap.title}
                className="group flex flex-col items-center justify-center rounded-full text-center"
                style={{
                  width: "min(calc(100vw - 48px), 640px)",
                  height: "min(calc(100vw - 48px), 640px)",
                  marginTop: i === 0 ? 0 : "-32px",
                  zIndex: zIndexes[i],
                  position: "relative",
                  backgroundColor: cap.bg,
                  border: "1px solid rgba(255,255,255,0.45)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 1.1,
                  delay: 0.55 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="pointer-events-none absolute inset-3 rounded-full opacity-30"
                  style={{ border: `1px solid ${cap.dotColor}` }}
                />
                <motion.div
                  className="flex flex-col items-center px-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {cap.kicker ? (
                    <>
                      <div className="mb-3 flex items-center justify-center">
                        <Icon />
                      </div>
                      <h3
                        className="text-center font-bold capitalize"
                        style={{
                          fontFamily: "var(--font-archivo)",
                          color: cap.titleColor ?? "var(--foreground)",
                          fontSize: "22px",
                          lineHeight: "1.2",
                          letterSpacing: "0.17px",
                        }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="uppercase"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 500,
                          color: "#14545D",
                          fontSize: "11px",
                          lineHeight: "14px",
                          letterSpacing: "2.5px",
                          marginTop: "10px",
                        }}
                      >
                        {cap.kicker}
                      </p>
                      <p
                        className="text-center"
                        style={{
                          fontFamily: "var(--font-encode)",
                          color: "#262626",
                          fontSize: "13px",
                          lineHeight: "20px",
                          maxWidth: "260px",
                          marginTop: "18px",
                        }}
                      >
                        <BoldMarkdown text={cap.desc} />
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: horizontal row with overlap — adapts to capability count */}
        <div
          className="relative z-10 mt-24 mx-auto hidden items-center justify-center lg:flex"
          style={{
            maxWidth: capabilities.length === 2 ? "2225px" : undefined,
            // Diameter tuned so two overlapping circles reach 2225px combined
            // at max (2 * 1152.5 - 80 overlap = 2225), with a 64px gutter to
            // the screen edge below that cap.
            ["--d" as string]:
              capabilities.length === 2
                ? "min(calc(50vw - 24px), 1152.5px)"
                : "min(34vw, 620px)",
            height: "var(--d)",
          }}
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const count = capabilities.length;

            // Layered z-index per count — front circle is the most visually
            // dominant one in the row.
            const zIndex =
              count === 2 ? (i === 0 ? 2 : 1) : [3, 1, 2][i] ?? 1;

            // Two-circle layout: a true Venn overlap, centered horizontally.
            // Three-circle layout: original left/center/right with overlap.
            const left =
              count === 2
                ? i === 0
                  ? "calc(50% - var(--d) + 40px)"
                  : "calc(50% - 40px)"
                : [
                    "calc(50% - var(--d) / 2 - var(--d) + 20px)",
                    "calc(50% - var(--d) / 2)",
                    "calc(50% - var(--d) / 2 + var(--d) - 20px)",
                  ][i];

            return (
              <motion.div
                key={cap.title}
                className="group absolute flex flex-col items-center justify-center rounded-full text-center transition-all duration-500"
                style={{
                  width: "var(--d)",
                  height: "var(--d)",
                  left,
                  zIndex,
                  backgroundColor: cap.bg,
                  border: "1px solid rgba(255,255,255,0.45)",
                  backdropFilter: "blur(18px) saturate(1.3)",
                  WebkitBackdropFilter: "blur(18px) saturate(1.3)",
                }}
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.55 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.04, zIndex: 10 }}
              >
                <div
                  className="pointer-events-none absolute inset-3 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                  style={{ border: `1px solid ${cap.dotColor}` }}
                />
                <motion.div
                  className="flex flex-col items-center px-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {cap.kicker ? (
                    <>
                      <div className="mb-4 flex origin-center scale-[1.15] items-center justify-center">
                        <Icon />
                      </div>
                      <h3
                        className="text-center font-bold capitalize"
                        style={{
                          fontFamily: "var(--font-archivo)",
                          color: cap.titleColor ?? "var(--foreground)",
                          fontSize: "27px",
                          lineHeight: "1.15",
                          letterSpacing: "0.17px",
                        }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="uppercase"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 500,
                          color: "#14545D",
                          fontSize: "12px",
                          lineHeight: "16px",
                          letterSpacing: "3px",
                          marginTop: "9.5px",
                        }}
                      >
                        {cap.kicker}
                      </p>
                      <p
                        className="text-center"
                        style={{
                          fontFamily: "var(--font-encode)",
                          color: "#262626",
                          fontSize: "16px",
                          lineHeight: "26px",
                          maxWidth: "360px",
                          marginTop: "24px",
                        }}
                      >
                        <BoldMarkdown text={cap.desc} />
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex origin-center scale-[1.15] items-center justify-center">
                        <Icon />
                      </div>
                      <h3
                        className="text-lg font-bold tracking-tight lg:text-xl xl:text-2xl"
                        style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="mt-2 max-w-[60%] text-xs leading-relaxed lg:text-sm"
                        style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                      >
                        {cap.desc}
                      </p>
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* What You Get — closing block below the circles */}
        <div
          ref={wygRef}
          className="relative mt-24 flex flex-col items-center text-center lg:mt-32"
        >
          {/* Absolutely-positioned dashed connector — triggered when the
              What You Get stack peeks into view. The line is anchored high
              (roughly the middle of the composition) and grows downward from
              its top toward the title. Hidden on smaller screens where the
              vertical stack makes it meaningless. */}
          <div
            className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 flex-col items-center lg:flex"
            style={{ bottom: "calc(100% + 12px)" }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                width: "1.5px",
                height: "clamp(320px, 48vh, 480px)",
                background:
                  "repeating-linear-gradient(to bottom, #C4C4C4 0, #C4C4C4 10px, transparent 10px, transparent 18px)",
                transformOrigin: "top center",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: wygInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              style={{
                marginTop: "6px",
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#C4C4C4",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: wygInView ? 1 : 0,
                scale: wygInView ? 1 : 0.5,
              }}
              transition={{ duration: 0.4, delay: wygInView ? 0.75 : 0, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.h3
            className="font-bold capitalize"
            style={{
              fontFamily: "var(--font-archivo)",
              color: homeContent.why_omni_common.what_you_get.title_color,
              fontSize: "32px",
              lineHeight: "1.2",
              letterSpacing: "0.17px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={wygInViewOnce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.why_omni_common.what_you_get.title}
          </motion.h3>
          <motion.p
            className="uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              color: "#14545D",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "3px",
              marginTop: "9px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={wygInViewOnce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.why_omni_common.what_you_get.kicker}
          </motion.p>
          <motion.p
            className="text-center"
            style={{
              fontFamily: "var(--font-encode)",
              color: "#262626",
              fontSize: "16px",
              lineHeight: "24px",
              maxWidth: "367px",
              marginTop: "16px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={wygInViewOnce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.why_omni_common.what_you_get.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
