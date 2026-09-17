"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { CtaPill } from "./cta-pill";
import { ServicesWheel } from "./services-wheel";

const EASE = [0.22, 1, 0.36, 1] as const;

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

      <div className="w-full px-3 py-14 md:px-6 md:py-32 lg:px-[60px] lg:py-[160px]">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-[32px]">
            {/* Chart — desktop: left column dominant. Mobile: below the copy
                and now uses the tighter section padding so it fills more of
                the viewport. */}
            <motion.div
              className="order-2 w-full flex-1 lg:order-1 lg:flex-[1.7] lg:-ml-12 xl:-ml-16"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <ServicesWheel />
            </motion.div>

            {/* Copy — desktop: right. Mobile: on top of the chart. */}
            <motion.div
              className="order-1 flex w-full flex-col items-start lg:order-2 lg:flex-1"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <p
                className="font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--lime)",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  lineHeight: "16px",
                }}
              >
                How do we make your plan?
              </p>

              <h2
                className="mt-6 font-bold capitalize leading-[1.05] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#ffffff",
                  fontSize: "clamp(2.25rem, 3.3vw, 50px)",
                }}
              >
                Get a custom-made
                <br />
                Intelligence System.
              </h2>

              <p
                className="mt-5 max-w-[440px] leading-[1.45]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "clamp(14px, 1.05vw, 17px)",
                }}
              >
                It&rsquo;s not a limp &ldquo;audit.&rdquo; It&rsquo;s not confusing
                analytics software. It&rsquo;s your new source of truth for ROI.
              </p>

              <div className="mt-10">
                <CtaPill
                  href="#lets-chat"
                  label="Let's Talk"
                  pillColor="#CFFC68"
                  textColor="#0A2B47"
                  badgeColor="#0A2B47"
                  arrowColor="#FFFFFF"
                  borderColor="#FFFFFF"
                  shadowColor="#FFFFFF"
                  glowColor="rgba(207,252,104,0.2)"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
