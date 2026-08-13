"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Step = {
  letter: string;
  image: string;
  label: React.ReactNode;
};

const STEPS: Step[] = [
  {
    letter: "A",
    image: "/images/letters/a.png",
    label: (
      <>
        (Up To The Day)
        <br />
        SEO/GEO
      </>
    ),
  },
  { letter: "B", image: "/images/letters/b.png", label: "Execution Plans" },
  { letter: "C", image: "/images/letters/c.png", label: "Custom Attribution Models" },
  { letter: "D", image: "/images/letters/d.png", label: "Multi-Platform Data Synthesis" },
  { letter: "E", image: "/images/letters/e.png", label: "Beautiful Designs & Content" },
  { letter: "F", image: "/images/letters/f.png", label: "Honed PPC, CRO, LLMs" },
  { letter: "G", image: "/images/letters/g.png", label: "Senior-Level Strategy" },
];

const PLATFORMS = [
  { name: "Google", logo: "/images/ai-logos/Google.png" },
  { name: "Bing", logo: "/images/ai-logos/Bing.png" },
  { name: "ChatGPT", logo: "/images/ai-logos/ChatGPT.png" },
  { name: "Claude", logo: "/images/ai-logos/Claude.png" },
  { name: "Perplexity", logo: "/images/ai-logos/Perplexity.png" },
];

const HEADLINE_WORDS = [
  { text: "We've", accent: false },
  { text: "Helped", accent: false },
  { text: "Companies", accent: false },
  { text: "More", accent: false },
  { text: "Than", accent: false },
  { text: "5x*", accent: true },
  { text: "Revenue", accent: false },
  { text: "From", accent: false },
  { text: "Search", accent: false },
  { text: "Engines", accent: false },
];

// Timeline windows across scroll progress (0 → 1).
// Each element gets a small window; overlapping windows create the stagger.
const HEADLINE_START = 0.05;
const HEADLINE_STEP = 0.028;
const HEADLINE_WINDOW = 0.11;
const ACCENT_START = 0.22;
const ACCENT_END = 0.34;
const LINE_START = 0.32;
const LINE_END = 0.5;
const STEP_START = 0.36;
const STEP_STEP = 0.035;
const STEP_WINDOW = 0.12;
const LABEL_OFFSET = 0.06;
const HALO_START = 0.44;
const HALO_END = 0.6;
const DIALED_START = 0.6;
const DIALED_END = 0.72;
const PLATFORM_START = 0.7;
const PLATFORM_STEP = 0.025;
const PLATFORM_WINDOW = 0.09;
const CARD_START = 0.7;
const CARD_END = 0.82;
const FOOT_START = 0.86;
const FOOT_END = 0.98;

function HeadlineWord({
  word,
  index,
  progress,
}: {
  word: (typeof HEADLINE_WORDS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = HEADLINE_START + index * HEADLINE_STEP;
  const end = start + HEADLINE_WINDOW;

  const y = useTransform(progress, [start, end], ["115%", "0%"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  const accentScale = useTransform(progress, [ACCENT_START, ACCENT_END], [0.5, 1]);
  const accentRotate = useTransform(progress, [ACCENT_START, ACCENT_END], [-10, 0]);
  const accentY = useTransform(progress, [ACCENT_START, ACCENT_END], [36, 0]);
  const accentOpacity = useTransform(progress, [ACCENT_START, ACCENT_END], [0, 1]);

  if (word.accent) {
    return (
      <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
        <motion.span
          className="inline-block font-black"
          style={{
            color: "#14545d",
            fontSize: "clamp(2.25rem, 4.5vw, 63.52px)",
            lineHeight: 1,
            marginRight: "0.25em",
            marginLeft: "0.05em",
            scale: accentScale,
            rotate: accentRotate,
            y: accentY,
            opacity: accentOpacity,
          }}
        >
          {word.text}
        </motion.span>
      </span>
    );
  }

  return (
    <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
      <motion.span
        className="inline-block"
        style={{
          marginRight: "0.25em",
          y,
          opacity,
        }}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

function StepColumn({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
  const circleStart = STEP_START + index * STEP_STEP;
  const circleEnd = circleStart + STEP_WINDOW;
  const labelStart = circleStart + LABEL_OFFSET;
  const labelEnd = labelStart + STEP_WINDOW;

  const circleOpacity = useTransform(progress, [circleStart, circleEnd], [0, 1]);
  const circleScale = useTransform(progress, [circleStart, circleEnd], [0.55, 1]);
  const circleY = useTransform(progress, [circleStart, circleEnd], [24, 0]);

  const labelOpacity = useTransform(progress, [labelStart, labelEnd], [0, 1]);
  const labelY = useTransform(progress, [labelStart, labelEnd], [14, 0]);

  const haloOpacity = useTransform(progress, [HALO_START, HALO_END], [0, 0.7]);
  const haloScale = useTransform(progress, [HALO_START, HALO_END], [0.7, 1.2]);

  return (
    <div className="relative z-10 flex flex-1 basis-0 flex-col items-center gap-3 md:gap-6 lg:min-w-[120px] lg:gap-10">
      <motion.div
        className="relative flex size-[64px] shrink-0 items-center justify-center md:size-[80px] lg:size-[90px]"
        style={{ opacity: circleOpacity, scale: circleScale, y: circleY }}
      >
        {index === 0 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(20,84,93,0.28) 0%, transparent 70%)",
              filter: "blur(14px)",
              opacity: haloOpacity,
              scale: haloScale,
            }}
            aria-hidden
          />
        )}

        <Image
          src={step.image}
          alt={step.letter}
          width={90}
          height={90}
          className="relative size-[64px] object-contain md:size-[80px] lg:size-[90px]"
          priority={index === 0}
        />
      </motion.div>

      <motion.p
        className="text-center font-bold capitalize"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "#14545d",
          fontSize: "clamp(0.75rem, 1.5vw, 20px)",
          lineHeight: "1.25",
          letterSpacing: "-0.5px",
          maxWidth: "170px",
          opacity: labelOpacity,
          y: labelY,
        }}
      >
        {step.label}
      </motion.p>
    </div>
  );
}

function PlatformLogo({
  platform,
  index,
  progress,
}: {
  platform: (typeof PLATFORMS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = PLATFORM_START + index * PLATFORM_STEP;
  const end = start + PLATFORM_WINDOW;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);

  return (
    <motion.div
      className="relative size-[38px] shrink-0"
      style={{ opacity, y, scale }}
    >
      <Image
        src={platform.logo}
        alt={platform.name}
        fill
        sizes="38px"
        className="object-contain"
      />
    </motion.div>
  );
}

export function GrowthMultiplier() {
  const sectionRef = useRef<HTMLElement>(null);
  const [learnHovered, setLearnHovered] = useState(false);

  // Scroll-tied progress: 0 when the section top hits the bottom of the
  // viewport, 1 when the section top hits the top of the viewport.
  // Total scroll distance ≈ viewport height, so pacing scales naturally
  // with screen size — tall screens get more scroll room, short screens less.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Background wash
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.55]);
  const bgScale = useTransform(scrollYProgress, [0, 0.3], [1.05, 1]);

  // Dashed connector line
  const lineScaleX = useTransform(scrollYProgress, [LINE_START, LINE_END], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [LINE_START, LINE_START + 0.06], [0, 1]);

  // "Dialed to just the right spend." block
  const dialedOpacity = useTransform(scrollYProgress, [DIALED_START, DIALED_END], [0, 1]);
  const dialedY = useTransform(scrollYProgress, [DIALED_START, DIALED_END], [24, 0]);

  // Local business card
  const cardOpacity = useTransform(scrollYProgress, [CARD_START, CARD_END], [0, 1]);
  const cardX = useTransform(scrollYProgress, [CARD_START, CARD_END], [30, 0]);

  // Footnote
  const footOpacity = useTransform(scrollYProgress, [FOOT_START, FOOT_END], [0, 1]);
  const footY = useTransform(scrollYProgress, [FOOT_START, FOOT_END], [12, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 pb-[140px] pt-[120px] md:px-8 md:pb-[160px] md:pt-[220px] lg:px-[60px] lg:pb-[180px] lg:pt-[240px]"
      style={{
        backgroundImage: "linear-gradient(180deg, #FFFDEF 0%, #FFFFFF 100%)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/section-bg-clear.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: bgOpacity,
          scale: bgScale,
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1364px]">
       <div className="px-4 md:px-8 lg:px-0">

        {/* Headline */}
        <div className="flex justify-center pb-11 pt-8">
          <h2
            className="max-w-[980px] text-center font-bold leading-[1.27] tracking-[-0.028em]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#262626",
              fontSize: "clamp(2.5rem, 3.5vw, 48.95px)",
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <HeadlineWord
                key={i}
                word={word}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </h2>
        </div>

        {/* Timeline */}
        <div className="py-12 md:py-16">
          {/* MOBILE / TABLET — single Figma-exported asset with the S-curve
              connector + labeled letters. Kept as an image so the layout
              matches the design pixel-for-pixel. Scroll-tied opacity mirrors
              the desktop timeline reveal. */}
          <motion.div
            className="mx-2.5 flex justify-center md:-mx-3.5 lg:hidden"
            style={{ opacity: lineOpacity }}
          >
            <Image
              src="/images/letters/mobile-timeline.png"
              alt="A. (Up To The Day) SEO/GEO. B. Execution Plans. C. Custom Attribution Models. D. Multi-Platform Data Synthesis. E. Beautiful Designs & Content. F. Honed PPC, CRO, LLMs. G. Senior-Level Strategy."
              width={360}
              height={596}
              className="h-auto w-full"
              priority={false}
            />
          </motion.div>

          {/* DESKTOP — single row */}
          <div className="relative hidden lg:block">
            <motion.div
              className="pointer-events-none absolute left-[calc(100%/14)] right-[calc(100%/14)] top-[44px] h-[2px] origin-left"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #94D80A 0, #94D80A 8px, transparent 8px, transparent 18px)",
                zIndex: 0,
                scaleX: lineScaleX,
                opacity: lineOpacity,
              }}
              aria-hidden
            />
            <div className="relative flex items-start justify-center gap-x-4 xl:gap-x-8">
              {STEPS.map((step, i) => (
                <StepColumn
                  key={step.letter}
                  step={step}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dialed to + Local business row */}
        <div className="mt-8 flex flex-col items-stretch justify-between gap-10 pt-8 xl:flex-row xl:gap-8">
          {/* LEFT */}
          <motion.div
            className="flex flex-col justify-between gap-8"
            style={{ opacity: dialedOpacity, y: dialedY }}
          >
            <p
              className="font-bold leading-[1.26] tracking-[-0.035em]"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(2.625rem, 3.4vw, 46px)",
                color: "#262626",
              }}
            >
              <span style={{ fontWeight: 400 }}>Dialed to </span>
              <span style={{ color: "#94D80A" }}>just the right spend.</span>
            </p>

            {/* Platform logos */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {PLATFORMS.map((platform, i) => (
                <PlatformLogo
                  key={platform.name}
                  platform={platform}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Local Business card */}
          <motion.div
            className="mt-10 flex max-w-[520px] flex-col gap-3 md:mt-0 md:gap-4 xl:border-l xl:pl-8"
            style={{
              borderColor: "rgba(20,84,93,0.15)",
              opacity: cardOpacity,
              x: cardX,
            }}
          >
            <p
              className="font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(1.375rem, 2.2vw, 28px)",
                letterSpacing: "-1.5px",
                lineHeight: "1.2",
              }}
            >
              Local Business?
            </p>
            <p
              style={{
                fontFamily: "var(--font-encode)",
                color: "#262626",
                fontSize: "clamp(1rem, 1.4vw, 20px)",
                lineHeight: "1.52",
                letterSpacing: "-0.5px",
              }}
            >
              Install a proven Community Development-Led Growth Engine
            </p>
            <div className="pt-1 md:pt-2">
              <Link
                href="/local"
                className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 md:px-6 md:py-3"
                onMouseEnter={() => setLearnHovered(true)}
                onMouseLeave={() => setLearnHovered(false)}
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: "#124c54",
                  backgroundColor: learnHovered ? "#14545d" : "transparent",
                  color: learnHovered ? "#ffffff" : "#14545d",
                  transition:
                    "background-color 260ms ease, color 260ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1)",
                  transform: learnHovered ? "translateY(-1px)" : "translateY(0)",
                  boxShadow: learnHovered
                    ? "0 6px 16px rgba(20,84,93,0.25)"
                    : "0 0 0 rgba(0,0,0,0)",
                }}
              >
                <span className="text-sm font-semibold">Learn More</span>
                <span
                  className="text-base font-bold"
                  style={{
                    transition: "transform 300ms ease",
                    transform: learnHovered ? "translateX(3px)" : "translateX(0)",
                  }}
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footnote */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3 pt-8"
          style={{ opacity: footOpacity, y: footY }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#262626",
              fontSize: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            <span className="font-bold">*Not an exaggeration. </span>
            <Link
              href="/work"
              className="font-bold underline decoration-solid transition-opacity hover:opacity-70"
              style={{ color: "#14545d" }}
            >
              See our case studies.
            </Link>
          </p>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#14545d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </motion.div>

       </div>
      </div>
    </section>
  );
}
