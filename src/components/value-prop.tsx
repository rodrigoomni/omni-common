"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import homeContent from "@/content/home.json";

gsap.registerPlugin(ScrollTrigger);

// Icon renderers for the two capability circles.
// Sizes are ~25% smaller than the raw Figma spec so the content stack sits
// comfortably inside each shape's narrower interior around the concave edge.
type IconKey = "growth" | "seo";
const ICONS: Record<IconKey, { src: string; w: number; h: number }> = {
  growth: { src: "/images/growth-illustration.svg", w: 110, h: 152 },
  seo: { src: "/images/seo-illustration.svg", w: 140, h: 96 },
};

// Badge presets — sit above each circle as external "chapter" labels.
// Gradient + shadow tints come straight from the Figma spec so the two badges
// sit in the same visual family but each anchor to their circle's brand color.
type BadgeVariant = "green" | "blue";
const BADGE_STYLES: Record<
  BadgeVariant,
  { background: string; boxShadow: string }
> = {
  green: {
    background:
      "linear-gradient(65.7deg, rgba(223, 255, 149, 0.35) 10%, rgba(255, 255, 255, 0.85) 60%)",
    boxShadow: "0 12px 20px -4px rgba(113, 245, 245, 0.32)",
  },
  blue: {
    background:
      "linear-gradient(56.3deg, rgba(255, 253, 239, 0.9) 40%, rgba(64, 189, 166, 0.12) 130%)",
    boxShadow: "0 12px 20px 0 rgba(113, 245, 245, 0.32)",
  },
};

type CapabilityEntry = {
  title: string;
  description: string;
  title_color?: string;
  kicker?: string;
  badge_label?: string;
  badge_color?: string;
  circle?: "green" | "blue";
  icon?: IconKey;
};

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

// ── Circle content — the copy stack that sits centered inside each SVG shape.
// Kept as its own component so the desktop composition and the mobile stack
// can share the exact same typography spec straight from the Figma node.
// Desktop uses container-query width units (`cqw`) so every fixed dimension
// scales together with the composition's 1636px design coordinate system.
function CircleContent({
  capability,
  scale = 1,
  useCssScale = false,
}: {
  capability: CapabilityEntry;
  scale?: number;
  useCssScale?: boolean;
}) {
  const icon = ICONS[capability.icon ?? "growth"];
  // 1636px design width == 100cqw, so 1px design == (100/1636)cqw ≈ 0.0611cqw.
  const s = (px: number) =>
    useCssScale ? `${(px * 100) / 1636}cqw` : `${px * scale}px`;
  const titleWords = capability.title.split(" ");
  const displayTitle =
    titleWords.length > 2
      ? capability.title.replace(/^(\S+)\s(.+)$/, "$1\n$2")
      : capability.title;
  return (
    <div className="flex w-full flex-col items-center gap-0 text-center">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon.src}
          alt=""
          width={icon.w}
          height={icon.h}
          style={{ width: s(icon.w), height: s(icon.h) }}
        />
      </div>
      <h3
        className="w-full whitespace-pre-line font-bold uppercase"
        style={{
          fontFamily: "var(--font-archivo)",
          color: capability.title_color ?? "var(--foreground)",
          fontSize: s(28),
          lineHeight: s(36),
          letterSpacing: "0.17px",
          marginTop: s(20),
        }}
      >
        {displayTitle}
      </h3>
      <p
        className="uppercase"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          color: "#14545D",
          fontSize: s(12),
          lineHeight: s(16),
          letterSpacing: "3px",
          marginTop: s(16),
        }}
      >
        {capability.kicker}
      </p>
      <p
        className="w-full"
        style={{
          fontFamily: "var(--font-encode)",
          color: "#262626",
          fontSize: s(18),
          lineHeight: s(29),
          marginTop: s(20),
        }}
      >
        <BoldMarkdown text={capability.description} />
      </p>
    </div>
  );
}

// ── External badge — the "chapter" pill that anchors above each circle.
// Rendered as a plain div so its position and gradient can travel with the
// circle it belongs to, without depending on the SVG's blur artifacts.
// Sizes multiply the CSS `--s` scale variable set on the composition wrapper
// so the badge shrinks in lockstep with the circles at narrower viewports.
function CircleBadge({
  label,
  color,
  variant,
  useCssScale = false,
}: {
  label: string;
  color: string;
  variant: BadgeVariant;
  useCssScale?: boolean;
}) {
  // 1636px design container == 100cqw when the parent has container-type: inline-size.
  const s = (px: number) =>
    useCssScale ? `${(px * 100) / 1636}cqw` : `${px}px`;
  return (
    <div
      className="flex items-center justify-center rounded-[8px] border border-[#E7E7E7]"
      style={{
        height: s(100),
        minWidth: s(variant === "blue" ? 298 : 278),
        padding: `0 ${s(44)}`,
        ...BADGE_STYLES[variant],
      }}
    >
      <p
        className="capitalize"
        style={{
          fontFamily: "var(--font-archivo)",
          fontWeight: variant === "blue" ? 600 : 700,
          color,
          fontSize: s(32),
          lineHeight: s(36),
          letterSpacing: "0.17px",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── Liquid-glass badge — the "chapter" pill that overlays each circle's
// baked-in badge slot. True HTML backdrop-filter (browsers can only apply
// backdrop-filter to HTML/CSS boxes; the same effect via SVG foreignObject
// doesn't survive being loaded through an <img> tag). Dimensions come from
// the Figma spec and are expressed in `cqw` units so the frame stays pixel-
// aligned to the composition SVG at every viewport width.
function LiquidGlassBadge({
  label,
  color,
  leftCqw,
  topCqw,
  widthCqw,
  heightCqw,
  animate,
  delay = 0,
  shadowTint,
}: {
  label: string;
  color: string;
  leftCqw: number;
  topCqw: number;
  widthCqw: number;
  heightCqw: number;
  animate: boolean;
  delay?: number;
  shadowTint: string;
}) {
  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        left: `${leftCqw}cqw`,
        top: `${topCqw}cqw`,
        width: `${widthCqw}cqw`,
        height: `${heightCqw}cqw`,
        borderRadius: "0.489cqw",
        // Liquid-glass fill: subtle diagonal white gradient over a real backdrop blur.
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.28) 100%)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.55)",
        // Inset highlight along the top edge + soft outer glow tinted with the brand color.
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 0.734cqw 1.468cqw -0.245cqw ${shadowTint}`,
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top-half highlight sheen — sells the "wet" glass look. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 55%)",
        }}
        aria-hidden
      />
      <div className="relative flex h-full w-full items-center justify-center">
        <span
          className="capitalize"
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 700,
            color,
            fontSize: "1.956cqw",
            lineHeight: 1,
            letterSpacing: "0.17px",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function WhyItWorks() {
  const introRef = useRef(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const wygRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(introRef, { once: true, margin: "-40px" });
  const circlesInView = useInView(circlesRef, { once: true, margin: "-80px" });
  const bentoInView = useInView(bentoRef, { once: true, margin: "-60px" });
  // Triggers as soon as the WYG hemisphere peeks into the viewport bottom.
  // Line animation is replayable (fires every time the block re-enters view);
  // text reveal fires only once so the copy stays stable on re-scroll.
  const wygInView = useInView(wygRef, { margin: "0px 0px -120px 0px" });
  const wygInViewOnce = useInView(wygRef, { once: true, margin: "0px 0px -40px 0px" });

  const caps = homeContent.why_omni_common.capabilities as CapabilityEntry[];
  // Match Figma order: LEFT = Growth Intelligence (green), RIGHT = Search Led (blue).
  const leftCap = caps.find((c) => c.circle === "green") ?? caps[0];
  const rightCap = caps.find((c) => c.circle === "blue") ?? caps[1];
  const wyg = homeContent.why_omni_common.what_you_get;

  return (
    <section
      className="relative overflow-hidden px-6 pt-24 pb-28 md:px-12 md:pt-28 md:pb-36 lg:px-16 lg:pt-[100px] lg:pb-44"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FFFDEF 100%)" }}
    >
      {/* Decorative arc ornament — bottom-right corner, partially off-canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[40px] -right-[60px] h-[160px] w-[280px] md:-bottom-[50px] md:-right-[80px] md:h-[200px] md:w-[360px] lg:-bottom-[60px] lg:-right-[100px] lg:h-[260px] lg:w-[460px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/shapes-ornament.png"
          alt=""
          title=""
          className="h-full w-full object-contain"
        />
      </div>
      {/* Title block — constrained to reading width */}
      <div className="site-container">
        {/* ── Title stack ── */}
        <div
          ref={introRef}
          className="flex flex-col items-center gap-6 text-center md:gap-8"
        >
          <motion.p
            className="uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              color: "#14545D",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "3px",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {homeContent.why_omni_common.eyebrow}
          </motion.p>
          <h2
            className="flex flex-col items-center gap-3 leading-[1.02] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#262626",
              fontSize: "clamp(2rem, 4.35vw, 56px)",
            }}
          >
            {homeContent.why_omni_common.heading_lines.map((line, i) => {
              const lineBase = 0.12 + i * 0.24;
              return (
                <span key={i} className="block font-semibold">
                  <motion.span
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: lineBase, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.prefix}
                  </motion.span>
                  <motion.span
                    className="inline-block font-semibold"
                    style={{ color: line.highlight_1_color }}
                    initial={{ opacity: 0, y: 22, scale: 0.94 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.55, delay: lineBase + 0.08, ease: [0.34, 1.4, 0.64, 1] }}
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
                    className="inline-block font-semibold"
                    style={{ color: line.highlight_2_color }}
                    initial={{ opacity: 0, y: 22, scale: 0.94 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.55, delay: lineBase + 0.22, ease: [0.34, 1.4, 0.64, 1] }}
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
      </div>

      {/* ── Composed circles — desktop (lg+) ──
          composition.svg (from ContainerMAN) supplies the whole scene:
          shapes, badges, illustrations, copy. On top we overlay real
          liquid-glass badges — HTML divs with a genuine backdrop-filter
          blur — because SVG's foreignObject blur doesn't render when the
          asset is loaded through an <img> tag. Positioned in `cqw` units
          derived from the SVG's 1636×954 coordinate system, so they track
          the baked-in badge slots at any width. */}
      <div
        ref={circlesRef}
        className="relative mx-auto mt-16 hidden xl:block"
        style={{
          width: "min(100%, 2300px)",
          aspectRatio: "1636/954",
          containerType: "inline-size",
        }}
      >
        <motion.img
          src="/images/circles/composition.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 0.96, y: 32 }}
          animate={circlesInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* WHAT WE DO — liquid-glass frame */}
        <LiquidGlassBadge
          label={leftCap.badge_label ?? "What We Do"}
          color={leftCap.badge_color ?? "#94D80A"}
          // Baked-in slot: (33, 103.07) design px, 278×100
          leftCqw={2.017}
          topCqw={6.301}
          widthCqw={16.993}
          heightCqw={6.113}
          animate={circlesInView}
          delay={0.4}
          // Softer glow — 50% of the previous tint (0.35 → 0.175).
          shadowTint="rgba(148, 216, 10, 0.175)"
        />

        {/* HOW IT WORKS — liquid-glass frame */}
        <LiquidGlassBadge
          label={rightCap.badge_label ?? "How It Works"}
          color={rightCap.badge_color ?? "#04A8B4"}
          // Baked-in slot: (1320, 98.07) design px, 298×100
          leftCqw={80.685}
          topCqw={5.995}
          widthCqw={18.216}
          heightCqw={6.113}
          animate={circlesInView}
          delay={0.5}
          // Softer glow — 50% of the previous tint (0.35 → 0.175).
          shadowTint="rgba(4, 168, 180, 0.175)"
        />

        {/* Accessible copy — visually hidden, exposed to assistive tech. */}
        <div className="sr-only">
          {[leftCap, rightCap].map((cap) => (
            <section key={cap.title}>
              <p>{cap.badge_label}</p>
              <h3>{cap.title}</h3>
              <p>{cap.kicker}</p>
              <p>{cap.description.replace(/\*\*/g, "")}</p>
            </section>
          ))}
        </div>
      </div>

      {/* Mobile stack + hemisphere — back inside the .site-container cap so
          they follow the site's normal reading width. */}
      <div className="site-container">
        {/* ── Mobile composition — pre-composed vertical Venn from
            composition-mobile.svg (Container2s.svg). Shapes, badges,
            illustrations, and copy are all baked into the asset. Real copy
            still lives in an sr-only block for accessibility. ── */}
        <motion.div
          ref={bentoRef}
          className="relative mx-auto mt-16 flex w-full justify-center xl:hidden"
          style={{ maxWidth: "min(calc(100vw - 48px), 560px)" }}
          initial={{ opacity: 0, y: 40, scale: 0.93 }}
          animate={bentoInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/circles/composition-mobile.svg"
            alt=""
            className="h-auto w-full"
            aria-hidden
          />
          <div className="sr-only">
            {[leftCap, rightCap].map((cap) => (
              <section key={cap.title}>
                <p>{cap.badge_label}</p>
                <h3>{cap.title}</h3>
                <p>{cap.kicker}</p>
                <p>{cap.description.replace(/\*\*/g, "")}</p>
              </section>
            ))}
          </div>
        </motion.div>

        {/* ── What You Get — hemisphere with dashed connector above ── */}
        <div
          ref={wygRef}
          className="relative mt-12 flex flex-col items-center pt-14 pb-20 md:pt-14 md:pb-24 xl:pt-0 xl:pb-32"
        >
          {/* Dashed connector — desktop only; grows downward when the
              hemisphere peeks into view, echoing the Figma line detail. */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-full flex-col items-center xl:flex"
            style={{ paddingBottom: "10px" }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                width: "1px",
                height: "clamp(150px, 21vh, 270px)",
                background:
                  "repeating-linear-gradient(to bottom, #C4C4C4 0, #C4C4C4 8px, transparent 8px, transparent 18px)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 65%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 65%)",
                transformOrigin: "top center",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: wygInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#C4C4C4",
                marginTop: "3px",
                flexShrink: 0,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: wygInView ? 1 : 0, scale: wygInView ? 1 : 0 }}
              transition={{ duration: 0.35, delay: 0.75, ease: [0.34, 1.4, 0.64, 1] }}
            />
          </div>

          {/* Hemisphere — MOBILE
              HTML hemisphere matching the desktop shape but smaller title. */}
          <motion.div
            className="relative flex w-full flex-col items-center justify-end overflow-hidden px-6 xl:hidden"
            style={{
              maxWidth: "min(calc(100vw - 48px), 560px)",
              aspectRatio: "752/399",
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
              background:
                "linear-gradient(to bottom, rgba(196, 181, 253, 0.42) 0%, rgba(255, 255, 255, 0.42) 100%)",
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 56,
                scale: 0.95,
                transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] },
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            initial="hidden"
            animate={wygInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col items-center gap-2 pb-5 text-center">
              <h3
                className="bg-clip-text text-transparent capitalize text-[22px] min-[430px]:text-[26px] md:text-[30px]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 600,
                  lineHeight: "1.23",
                  letterSpacing: "0.17px",
                  backgroundImage:
                    "linear-gradient(44.84deg, #9AA1F2 8.4%, #0A2B47 91.6%)",
                }}
              >
                {wyg.title}
              </h3>
              <p
                className="uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#14545D",
                  fontSize: "9px",
                  lineHeight: "13px",
                  letterSpacing: "3px",
                }}
              >
                {wyg.kicker}
              </p>
              <p
                className="text-center"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "#262626",
                  fontSize: "12px",
                  lineHeight: "18px",
                  maxWidth: "260px",
                }}
              >
                {wyg.description}
              </p>
            </div>
          </motion.div>

          {/* Hemisphere — DESKTOP
              Stadium shape rendered as an HTML div with the purple → white
              gradient; real text sits inside so it can scale with the layout
              and stay accessible. */}
          <motion.div
            className="relative hidden w-full max-w-[600px] flex-col items-center justify-end overflow-hidden px-8 xl:flex"
            style={{
              aspectRatio: "752/399",
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
              background:
                "linear-gradient(to bottom, rgba(196, 181, 253, 0.42) 0%, rgba(255, 255, 255, 0.42) 100%)",
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 56,
                scale: 0.95,
                transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] },
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            initial="hidden"
            animate={wygInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col items-center gap-4 pb-8 text-center">
              <motion.h3
                className="bg-clip-text text-transparent capitalize"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3vw, 36px)",
                  lineHeight: "1.23",
                  letterSpacing: "0.17px",
                  backgroundImage:
                    "linear-gradient(44.84deg, #9AA1F2 8.4%, #0A2B47 91.6%)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={wygInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: wygInView ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {wyg.title}
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
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={wygInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: wygInView ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {wyg.kicker}
              </motion.p>
              <motion.p
                className="text-center"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "#262626",
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "420px",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={wygInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: wygInView ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {wyg.description}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
