"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import home from "@/content/home.json";

gsap.registerPlugin(ScrollTrigger);

const { tension } = home;

export function TensionProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" });

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax the background slightly
      gsap.to(sectionRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative overflow-hidden py-32 md:py-44"
      style={{
        background: "linear-gradient(165deg, #0A2B47 0%, #14545D 55%, #0f3a42 100%)",
      }}
    >
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Glow accents */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--mint)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-8 blur-3xl"
        style={{ backgroundColor: "var(--lime)" }}
      />

      <div className="site-container relative z-10 px-6 md:px-12 lg:px-24">
        {/* Eyebrow */}
        <motion.p
          ref={headlineRef}
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {tension.eyebrow}
        </motion.p>

        {/* Large headline */}
        <motion.h2
          className="mt-6 max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight md:text-[3.25rem]"
          style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {tension.heading_main}{" "}
          <span style={{ color: "var(--mint)", opacity: 0.6 }}>
            {tension.heading_accent}
          </span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {tension.subheading}
        </motion.p>

        {/* Pain point questions — large italic pull-quotes */}
        <div className="mt-16 space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {tension.questions.map((q, i) => (
            <motion.div
              key={q}
              className="flex items-baseline gap-4 py-6 md:gap-6 md:py-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className="flex-shrink-0 text-sm font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-inter)", color: "var(--lime)", opacity: 0.7 }}
              >
                0{i + 1}
              </span>
              <p
                className="text-lg font-medium italic tracking-tight md:text-2xl"
                style={{ fontFamily: "var(--font-archivo)", color: "rgba(255,255,255,0.85)" }}
              >
                &ldquo;{q}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closer */}
        <motion.p
          className="mt-10 text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--lime)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {tension.closer}
        </motion.p>
      </div>
    </section>
  );
}
