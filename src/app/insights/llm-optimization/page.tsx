"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Footer } from "@/components/footer";

const points = [
  { title: "AI Search Visibility", desc: "Optimize your brand's presence across ChatGPT, Perplexity, Gemini, and other AI-powered discovery platforms." },
  { title: "Structured Data for LLMs", desc: "Schema and content architecture that helps large language models accurately reference and recommend your brand." },
  { title: "Brand Mention Monitoring", desc: "Track how AI models represent your brand and proactively shape the narrative." },
  { title: "Answer Engine Optimization", desc: "Position your content as the definitive source that AI assistants cite and surface to users." },
];

export default function LLMOptimizationPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>Insights</motion.p>
        <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          LLM Optimization
        </motion.h1>
        <motion.p className="mt-6 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          The next frontier of search is AI-driven. We ensure your brand shows up — accurately and favorably — when large language models answer questions in your space.
        </motion.p>

        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-2">
          {points.map((p, i) => (
            <motion.div key={p.title} className="rounded-2xl border p-6 transition-all hover:-translate-y-0.5" style={{ backgroundColor: "#f4eef9", borderColor: "var(--border-light)" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-24"><Footer /></div>
    </main>
  );
}
