"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   FAQ Section
   ═══════════════════════════════════════════════ */

const faqs = [
  {
    question: "What sets Omni Common apart from consultancy and digital marketing agencies?",
    answer:
      "Unlike traditional agencies, we don't just execute campaigns — we architect growth systems. Our marketing mix model (MMM) approach combines the strategic depth of a consultancy with the execution power of an agency, all driven by tactical data analysis. We become your Chief Marketing Organization, not just another vendor.",
  },
  {
    question: "How do I decide which thing to do?",
    answer:
      "It depends on where you are in your growth journey. If you need clarity, start with an Audit & Assess. If you have a team but need specialized firepower, our Bolt-On model fills the gaps. If you want full strategic ownership from roadmap to execution, we become your CMO. We'll help you figure out the right fit on a discovery call — no pressure, just data-driven advice.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Our engagements are custom-scoped based on your business size, growth stage, and the channels that will move the needle. We don't do cookie-cutter packages. After a discovery session, we'll present a clear proposal tied to projected ROI — so you know exactly what you're investing in and what to expect in return.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span
          className="pr-4 text-sm font-medium md:text-base"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}
        >
          {faq.question}
        </span>
        <motion.span
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-lg"
          style={{ color: "var(--foreground-muted)" }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 pr-10 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="site-container px-6 md:px-12 lg:px-24">
        {/* Centered heading — serif italic like original */}
        <motion.h2
          ref={ref}
          className="mb-14 text-center text-2xl font-bold tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Accordion — centered, max-width */}
        <div className="mx-auto max-w-3xl" style={{ borderTop: "1px solid var(--border)" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════ */

export function InfoSections() {
  return <FAQSection />;
}
