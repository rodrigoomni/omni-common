"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <main
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Background accent blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--lime)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl"
        >
          {/* 404 number */}
          <p
            className="text-[120px] font-black leading-none tracking-tighter md:text-[180px]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "var(--teal)",
              opacity: 0.12,
              lineHeight: 1,
            }}
            aria-hidden
          >
            404
          </p>

          {/* Eyebrow */}
          <p
            className="-mt-6 text-xs font-semibold uppercase tracking-[0.25em] md:-mt-10"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            Page not found
          </p>

          {/* Heading */}
          <h1
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
          >
            This page took
            <br />
            <span style={{ color: "var(--teal)" }}>a wrong turn.</span>
          </h1>

          {/* Body */}
          <p
            className="mx-auto mt-6 max-w-md text-base leading-relaxed"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          >
            The link you followed may be broken or the page may have moved.
            Let&apos;s get you back on track.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#fff",
                boxShadow: "6px 6px 0px 0px var(--lime)",
              }}
            >
              Back to home
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href="/#lets-chat"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--teal)",
                borderColor: "var(--teal)",
              }}
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </main>

      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </>
  );
}
