"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Footer } from "@/components/footer";

const PuzzleCube = dynamic(
  () => import("@/components/puzzle-cube").then((m) => m.PuzzleCube),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        {/* Hero area — text + cube side by side */}
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-0">
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About Omni Common
            </motion.p>
            <motion.h1
              className="mt-3 max-w-xl text-4xl font-bold leading-tight tracking-tighter md:text-6xl"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "var(--foreground)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Every piece of your{" "}
              <span style={{ color: "var(--teal)" }}>growth puzzle.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-encode)",
                color: "var(--foreground-secondary)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              We take a marketing mix model approach, using tactical data
              analysis rather than one-size-fits-all strategies to unify organic
              and paid channels into one growth engine.
            </motion.p>
          </div>

          {/* Interactive 3D Puzzle Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <PuzzleCube />
          </motion.div>
        </div>

        {/* Body copy */}
        <motion.div
          className="mt-16 grid max-w-4xl gap-16 md:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-secondary)",
            }}
          >
            Omni Common is the first ever executive growth marketing agency built
            for businesses ready to scale. We take a marketing mix model (MMM)
            approach, using tactical data analysis rather than one-size-fits-all
            strategies to unify organic and paid channels.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-secondary)",
            }}
          >
            Whether we audit and assess, bolt-on to your existing team, or
            become your CMO — we architect growth systems that deliver measurable
            ROI. Our omni-channel philosophy means every dollar works harder
            across Search, Lifecycle, and Social.
          </p>
        </motion.div>

        {/* How We Engage */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p
            className="mb-12 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            How We Engage
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Audit & Assess",
                body: "We start by understanding where you are. A deep-dive into your channels, data, and growth blockers.",
                color: "var(--teal)",
                bg: "#eef8f9",
              },
              {
                title: "Bolt-On Team",
                body: "Extend your existing marketing team with specialized operators across search, lifecycle, and social.",
                color: "#2d7a35",
                bg: "#eef7ef",
              },
              {
                title: "Become Your CMO",
                body: "Full strategic ownership. We become your Chief Marketing Organization — from roadmap to execution.",
                color: "#6b4b94",
                bg: "#f4eef9",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: v.bg,
                  borderLeft: `3px solid ${v.color}`,
                }}
              >
                <h3
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: v.color,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mt-32" />
      <Footer />
    </main>
  );
}
