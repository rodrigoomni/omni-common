"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "./magnetic-button";
import { ConfettiSimple } from "./confetti-simple";
import homeContent from "@/content/home.json";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const { hero } = homeContent;

  return (
    <section
      className="fixed inset-0 flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A2B47", zIndex: 0 }}
      data-theme="dark"
    >
      {/* Zoomed background image */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "scale(1.1)",
        }}
        aria-hidden
      />
      <ConfettiSimple />

      <motion.div
        className="relative z-10 flex w-full flex-col items-center px-12 text-center"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* ── Title stack ── */}
        <div className="flex w-full flex-col items-center">
          <div className="overflow-hidden pb-[0.12em]">
            <motion.h1
              className="whitespace-nowrap font-extrabold leading-[0.95] tracking-[-0.025em]"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "rgba(255,255,255,0.95)",
                fontSize: "clamp(2.5rem, 6.33vw, 91.2px)",
              }}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            >
              {hero.heading_line1}
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-[0.12em]">
            <motion.h1
              className="whitespace-nowrap font-extrabold leading-[0.95] tracking-[-0.025em]"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#CFFC68",
                fontSize: "clamp(2.75rem, 7.5vw, 108px)",
              }}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.38, ease: EASE }}
            >
              {hero.heading_line2}
            </motion.h1>
          </div>
        </div>

        {/* ── Copy block ── */}
        <motion.div
          className="mt-4 flex w-full max-w-[600px] flex-col items-center gap-3 pt-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: EASE }}
        >
          <p
            className="font-bold leading-[1.107]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#FFFFFF",
              fontSize: "clamp(1.125rem, 1.74vw, 25.1px)",
            }}
          >
            {hero.subheading_bold}
          </p>
          <p
            className="leading-[1.625]"
            style={{
              fontFamily: "var(--font-encode)",
              color: "#FFFFFF",
              fontSize: "clamp(0.95rem, 1.19vw, 17.1px)",
            }}
          >
            {hero.subheading}
          </p>
          <p
            className="mt-4 font-bold leading-[1.625]"
            style={{
              fontFamily: "var(--font-encode)",
              color: "#FFFFFF",
              fontSize: "clamp(0.95rem, 1.19vw, 17.1px)",
            }}
          >
            {hero.growth_line}
          </p>
        </motion.div>

        {/* ── CTA row ── */}
        <motion.div
          className="mt-8 flex w-full items-center justify-center gap-5 pt-[37.99px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="#lets-chat"
              className="cta-manic group relative inline-flex items-center gap-[12.75px] rounded-full py-[8.5px] pl-[23.4px] pr-[8.5px] active:scale-95"
              style={{
                backgroundColor: "#CFFC68",
                filter: "drop-shadow(0 0 15.9px rgba(207,252,104,0.2))",
              }}
            >
              <span
                className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                style={{
                  boxShadow: "0 0 22px rgba(207,252,104,0.7), 0 0 48px rgba(207,252,104,0.35)",
                }}
              />
              <span
                className="relative capitalize"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  color: "#0A2B47",
                  fontSize: "20px",
                  lineHeight: "24.23px",
                }}
              >
                {hero.cta_button}
              </span>
              <Image
                src="/images/hero-cta-avatars.png"
                alt=""
                width={154}
                height={81}
                priority
                aria-hidden
                className="relative h-[45px] w-auto"
              />
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
        transition={{ duration: 2, delay: 1.5, ease: EASE }}
      />
    </section>
  );
}
