"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import home from "@/content/home.json";

const { team } = home;
const stats: { value: string; label: string; note?: string }[] = team.stats;

export function MeetTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background: "linear-gradient(170deg, #0A2B47 0%, #14545D 100%)",
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="site-container relative z-10 px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--mint)" }}
          >
            {team.eyebrow}
          </p>

          <div className="mt-6 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-20">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
              >
                {team.heading_line1}
                <br />
                {team.heading_line2}
                <span style={{ color: "var(--lime)" }}>{team.heading_accent}</span>
              </h2>
              <p
                className="mt-5 max-w-lg text-base leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.55)" }}
              >
                {team.description}
              </p>
              <div className="mt-8">
                <Link
                  href="/about/team"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white/10"
                  style={{
                    fontFamily: "var(--font-inter)",
                    borderColor: "rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  {team.cta_button}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-baseline justify-between py-6 md:py-8"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div>
                    <p
                      className="text-sm"
                      style={{ fontFamily: "var(--font-encode)", color: "rgba(255,255,255,0.45)" }}
                    >
                      {stat.label}
                    </p>
                    {stat.note && (
                      <p
                        className="mt-0.5 text-xs"
                        style={{ fontFamily: "var(--font-inter)", color: "var(--lime)", opacity: 0.7 }}
                      >
                        {stat.note}
                      </p>
                    )}
                  </div>
                  <p
                    className="text-3xl font-black tracking-tight md:text-4xl"
                    style={{ fontFamily: "var(--font-archivo)", color: "var(--lime)" }}
                  >
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
