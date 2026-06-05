"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import home from "@/content/home.json";

const { who_its_for } = home;

const audienceAccents = ["var(--lime)", "var(--mint)", "var(--teal)"];

const audiences = who_its_for.audiences.map((aud, i) => ({
  label: aud.label,
  range: aud.range,
  desc: aud.description,
  accent: audienceAccents[i % audienceAccents.length],
}));

export function WhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: "var(--cream)" }}>
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:items-start"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left — sticky headline */}
          <div className="md:sticky md:top-32">
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              {who_its_for.eyebrow}
            </p>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight md:text-[2.75rem] md:leading-[1.1]"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              {who_its_for.heading_main}
              <span style={{ color: "var(--teal)" }}>{who_its_for.heading_accent}</span>
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              {who_its_for.description}
            </p>

            {/* Local marketing nod */}
            <div className="mt-8 rounded-lg border px-5 py-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-raised)" }}>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
              >
                {who_its_for.local_note}{" "}
                <Link
                  href="/local"
                  className="font-semibold underline transition-colors"
                  style={{ color: "var(--teal)" }}
                >
                  {who_its_for.local_link_text}
                </Link>
              </p>
            </div>
          </div>

          {/* Right — audience rows */}
          <div className="space-y-0" style={{ borderTop: "1px solid var(--border)" }}>
            {audiences.map((aud, i) => (
              <motion.div
                key={aud.label}
                className="group py-8 md:py-10"
                style={{ borderBottom: "1px solid var(--border)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: aud.accent }}
                      />
                      <h3
                        className="text-xl font-bold tracking-tight md:text-2xl"
                        style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                      >
                        {aud.label}
                      </h3>
                    </div>
                    <p
                      className="mt-2 max-w-sm text-sm leading-relaxed md:text-base"
                      style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
                    >
                      {aud.desc}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold"
                    style={{
                      fontFamily: "var(--font-inter)",
                      borderColor: "var(--border)",
                      color: "var(--foreground-subtle)",
                    }}
                  >
                    {aud.range}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
