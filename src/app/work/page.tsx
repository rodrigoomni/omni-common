"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";
import { Footer } from "@/components/footer";
import { useTrioModal } from "@/components/trio-coming-soon";

export default function WorkPage() {
  const { openTrioModal } = useTrioModal();
  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Our Work
        </motion.p>
        <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          Case Studies
        </motion.h1>
        <motion.p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          Deep dives into the strategy, execution, and measurable results behind our most impactful growth campaigns.
        </motion.p>

        <div className="mt-24 space-y-0">
          {caseStudies.map((study, i) => {
            const isTrio = study.slug === "trio-flatmount";
            const cardClass =
              "group flex w-full flex-col gap-8 py-16 text-left transition-colors md:flex-row md:items-center md:gap-12";
            const cardStyle = { borderBottom: "1px solid var(--border)" as const };
            const cursorAttrs = {
              "data-cursor": "card",
              "data-cursor-hint": isTrio ? "Coming soon" : study.cursorHint,
              ...(study.cursorColors
                ? {
                    "data-cursor-fill": study.cursorColors.fill,
                    "data-cursor-stroke": study.cursorColors.stroke,
                  }
                : {}),
            };
            const inner = (
              <>
                {/* Thumbnail */}
                <div
                  className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] md:w-80"
                  style={{ backgroundColor: study.color, boxShadow: `4px 4px 0px 0px ${(study.thumbnail || study.image) && study.cursorColors ? study.cursorColors.fill : "var(--teal)"}` }}
                >
                  {study.thumbnail || study.image ? (
                    <Image
                      src={(study.thumbnail || study.image) as string}
                      alt={study.title}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-3xl font-black" style={{ fontFamily: "var(--font-archivo)", color: "rgba(10,43,71,0.1)" }}>{study.title}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>{study.category}</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
                      {study.title}
                      {isTrio && (
                        <span
                          className="ml-3 inline-block rounded-full px-3 py-1 align-middle text-[10px] font-semibold uppercase tracking-[0.2em]"
                          style={{ fontFamily: "var(--font-inter)", backgroundColor: "rgba(207,252,104,0.35)", color: "var(--teal)" }}
                        >
                          Coming soon
                        </span>
                      )}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>{study.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {study.results.slice(0, 2).map((r) => (
                        <span key={r.metric} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ fontFamily: "var(--font-inter)", backgroundColor: "rgba(20,84,93,0.06)", color: "var(--teal)" }}>
                          {r.value} {r.metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>{study.year}</span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-2" style={{ color: "var(--teal)" }}>&rarr;</span>
                  </div>
                </div>
              </>
            );
            return (
              <motion.div key={study.slug} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 * i + 0.3, ease: [0.22, 1, 0.36, 1] }}>
                {isTrio ? (
                  <button type="button" onClick={openTrioModal} className={cardClass} style={cardStyle} {...cursorAttrs}>
                    {inner}
                  </button>
                ) : (
                  <Link href={`/work/${study.slug}`} className={cardClass} style={cardStyle} {...cursorAttrs}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* And more... */}
        <motion.div
          className="mt-16 mb-24 rounded-2xl px-8 py-12 text-center md:px-16"
          style={{ backgroundColor: "var(--surface)", border: "1.5px solid var(--border-light)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>
            What you see here is a curated selection.
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight md:text-3xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
            We&apos;ve helped dozens more brands grow<span style={{ color: "var(--teal)" }}>.</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>
            From early-stage DTC brands to established enterprises, our work spans industries and scales. Reach out to hear more.
          </p>
          <Link
            href="#lets-chat"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ fontFamily: "var(--font-inter)", backgroundColor: "var(--teal)", boxShadow: "4px 4px 0px 0px var(--lime)" }}
          >
            Let&apos;s Talk <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
