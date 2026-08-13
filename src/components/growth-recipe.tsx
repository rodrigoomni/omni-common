"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    num: "01",
    active: true,
    line: (
      <>
        <span style={{ color: "#CFFC68", fontWeight: 800 }}>10 lbs.</span>
        <span style={{ color: "#fff", fontWeight: 400 }}> of senior, human insight</span>
      </>
    ),
  },
  {
    num: "02",
    active: false,
    line: (
      <>
        <span style={{ color: "#CFFC68", fontWeight: 800 }}>2 lbs.</span>
        <span style={{ color: "#fff", fontWeight: 400 }}> of customer behavior research</span>
      </>
    ),
  },
  {
    num: "03",
    active: false,
    line: (
      <>
        <span style={{ color: "#CFFC68", fontWeight: 800 }}>2 cups</span>
        <span style={{ color: "#fff", fontWeight: 400 }}> data triangulation</span>
      </>
    ),
  },
  {
    num: "04",
    active: false,
    line: (
      <>
        <span style={{ color: "#CFFC68", fontWeight: 800 }}>1 cup</span>
        <span style={{ color: "#fff", fontWeight: 400 }}> of AI-enhanced attribution models</span>
      </>
    ),
  },
  {
    num: "05",
    active: false,
    line: (
      <>
        <span style={{ color: "#fff", fontWeight: 400 }}>A </span>
        <span style={{ color: "#CFFC68", fontWeight: 700 }}>dash</span>
        <span style={{ color: "#fff", fontWeight: 400 }}> of secret sauce</span>
      </>
    ),
  },
];

export function GrowthRecipe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--navy)" }}
    >
      {/* Subtle square grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      {/* Mint blur — top right */}
      <div
        className="pointer-events-none absolute right-0 top-0 size-[384px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-25"
        style={{ background: "rgba(165,253,243,0.35)", filter: "blur(64px)" }}
        aria-hidden
      />

      {/* Lime blur — bottom left */}
      <div
        className="pointer-events-none absolute -left-8 bottom-1/3 size-[321px] rounded-full opacity-30"
        style={{ background: "var(--lime)", filter: "blur(250px)" }}
        aria-hidden
      />

      <div className="w-full px-6 py-24 md:px-8 md:py-32 lg:px-[60px] lg:py-[160px]">
       <div className="mx-auto w-full max-w-[1364px]">
        <div className="px-4 md:px-8 lg:px-0">
        {/* Heading */}
        <motion.h2
          className="font-bold leading-[1.05] tracking-[-0.02em] lg:text-center"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "#fff",
            fontSize: "clamp(3rem, 6.6vw, 96px)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          How do we make your plan?
        </motion.h2>

        {/* Two columns */}
        <div className="mt-12 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-center lg:gap-12">

          {/* LEFT — recipe card */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <div
              className="relative flex flex-col p-6 backdrop-blur-md md:p-8"
              style={{
                borderRadius: "16px 100px 16px 16px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Eyebrow */}
              <p
                className="relative font-bold uppercase tracking-[3px]"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--mint)",
                  fontSize: "11px",
                  lineHeight: "16px",
                }}
              >
                Recipe for &ldquo;Predictable, Scalable, Profitable Growth&rdquo;
              </p>

              {/* Numbered list */}
              <ul className="relative mt-6 flex flex-col gap-4">
                {ITEMS.map((item, i) => (
                  <motion.li
                    key={item.num}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.09, ease: EASE }}
                  >
                    {/* Number bubble */}
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full font-black"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontFamily: "var(--font-archivo)",
                        fontSize: "12px",
                        backgroundColor: item.active ? "var(--lime)" : "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: item.active ? "var(--navy)" : "rgba(255,255,255,0.85)",
                      }}
                    >
                      {item.num}
                    </div>

                    {/* Text */}
                    <p
                      className="leading-[1.2] tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-archivo)", fontSize: "clamp(16px, 1.5vw, 20px)" }}
                    >
                      {item.line}
                    </p>
                  </motion.li>
                ))}
              </ul>

              {/* Footer note */}
              <motion.div
                className="relative mt-7 flex gap-3 pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              >
                <div
                  className="mt-[7px] size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--lime)" }}
                />
                <p
                  className="text-sm leading-[1.4]"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.75)" }}
                >
                  We work on{" "}
                  <strong className="font-bold text-white">a case-by-case basis</strong> to truly
                  understand your business within your market. We unearth the data you need, we
                  develop an optimized growth plan, then we get to work.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — CTA block */}
          <motion.div
            className="flex shrink-0 flex-col lg:w-[480px] xl:w-[560px]"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <h3
              className="font-bold leading-[1.04] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--lime)",
                fontSize: "clamp(2rem, 3.9vw, 56px)",
              }}
            >
              Get a custom-made{" "}
              <br className="hidden lg:block" />
              Intelligence System.
            </h3>

            <p
              className="mt-6 leading-[1.3]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "#fff",
                fontSize: "clamp(1.5rem, 2.9vw, 40px)",
              }}
            >
              It&apos;s not a limp &ldquo;audit.&rdquo; It&apos;s not confusing analytics
              software. It&apos;s your new source of truth for ROI.
            </p>

            <div className="mt-10">
              <MagneticButton strength={0.2}>
                <Link
                  href="#lets-chat"
                  className="cta-manic relative inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "var(--lime)",
                    color: "var(--navy)",
                    padding: "16px 36px",
                    fontSize: "16px",
                    lineHeight: "24px",
                    filter: "drop-shadow(0 0 15px rgba(207,252,104,0.25))",
                  }}
                >
                  <span
                    className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                    style={{
                      boxShadow:
                        "0 0 22px rgba(207,252,104,0.7), 0 0 48px rgba(207,252,104,0.35)",
                    }}
                  />
                  <span className="relative">Get Your Growth Model</span>
                  <svg
                    className="relative"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
        </div>
       </div>
      </div>
    </section>
  );
}
