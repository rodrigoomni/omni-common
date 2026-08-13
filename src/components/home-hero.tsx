"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { HeroGrid } from "@/components/hero-grid";
import { ConfettiSimple } from "@/components/confetti-simple";
import { MagneticButton } from "@/components/magnetic-button";

export function HomeHero() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section
      className="fixed inset-0 flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#0A2B47", zIndex: 0 }}
      data-theme="dark"
    >
      <HeroGrid />
      <ConfettiSimple />

      <motion.div
        className="relative z-10 w-full px-6 text-center md:px-12"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        <div>
          <motion.h1
            className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-archivo)", color: "rgba(255,255,255,0.95)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Grow your brand(s),
          </motion.h1>
        </div>
        <div>
          <motion.h1
            className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--lime)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            according to plan.
          </motion.h1>
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base font-normal leading-relaxed md:text-lg"
          style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.55)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          Omnichannel growth without limits — executive-level strategy and execution
          for e-commerce, SaaS, and marketplace brands that are done guessing.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="#lets-chat"
              className="cta-manic group relative inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold transition-all"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--lime)",
                color: "#0A2B47",
                boxShadow: "0 0 30px rgba(207,252,104,0.2)",
              }}
            >
              <span
                className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                style={{
                  boxShadow:
                    "0 0 20px rgba(207,252,104,0.5), 0 0 40px rgba(207,252,104,0.3), 0 0 60px rgba(207,252,104,0.15)",
                }}
              />
              <span className="relative">Get Your Growth Model</span>
              <span className="relative inline-block transition-transform group-hover:translate-x-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Shimmer sweep on load */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
}
