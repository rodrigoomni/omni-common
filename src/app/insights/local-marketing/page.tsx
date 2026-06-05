"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Footer } from "@/components/footer";

const points = [
  { title: "Google Business Profile Optimization", desc: "Dominate local search with fully optimized profiles that drive foot traffic and calls." },
  { title: "Local Citation Building", desc: "Consistent NAP data across hundreds of directories to boost local authority." },
  { title: "Geo-Targeted Campaigns", desc: "Hyper-local paid and organic strategies tailored to each market you serve." },
  { title: "Review & Reputation Management", desc: "Turn happy customers into your strongest acquisition channel with systematic review generation." },
];

export default function LocalMarketingPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>Insights</motion.p>
        <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          Local Marketing
        </motion.h1>
        <motion.p className="mt-6 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          Own your local market. From map packs to neighborhood-level targeting, we make sure your brand is the first thing people find nearby.
        </motion.p>

        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-2">
          {points.map((p, i) => (
            <motion.div key={p.title} className="rounded-2xl border p-6 transition-all hover:-translate-y-0.5" style={{ backgroundColor: "#eef7ef", borderColor: "var(--border-light)" }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
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
