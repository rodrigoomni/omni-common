"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Footer } from "@/components/footer";

const channels = [
  {
    title: "Search", color: "var(--teal)", bg: "#eef8f9",
    services: [
      { name: "SEO", desc: "Full technical and content SEO to dominate organic rankings." },
      { name: "PPC / Paid Search", desc: "High-ROAS campaigns across Google, Bing, and emerging platforms." },
      { name: "Content Marketing", desc: "Authority-building content strategies that drive qualified traffic." },
      { name: "Digital PR", desc: "Earned media and high-authority backlinks at scale." },
      { name: "Link Building", desc: "Strategic outreach and relationship-based link acquisition." },
      { name: "AI/LLM Optimization", desc: "Optimizing your presence for AI-powered search and discovery." },
    ],
  },
  {
    title: "Lifecycle", color: "#2d7a35", bg: "#eef7ef",
    services: [
      { name: "Brand Identity", desc: "Visual systems and positioning that resonate with your market." },
      { name: "Email & Text Marketing", desc: "Automated flows and campaigns that nurture and convert." },
      { name: "Conversion Rate Optimization", desc: "Data-driven experiments to maximize every visitor." },
      { name: "Buyer's Journey Mapping", desc: "End-to-end funnel design from awareness to advocacy." },
    ],
  },
  {
    title: "Social", color: "#6b4b94", bg: "#f4eef9",
    services: [
      { name: "Content Creation", desc: "Scroll-stopping creative across every format." },
      { name: "Video Production", desc: "From concept to cut — short form, long form, and everything between." },
      { name: "Influencer Marketing", desc: "Authentic partnerships that move the needle." },
      { name: "Paid Social", desc: "Performance campaigns across Meta, TikTok, LinkedIn, and beyond." },
    ],
  },
];

function ChannelSection({ channel, index }: { channel: (typeof channels)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className="py-16" style={{ borderBottom: "1px solid var(--border)" }} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <div className="mb-10 flex items-center gap-4">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: channel.color }} />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-archivo)", color: channel.color }}>{channel.title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {channel.services.map((s) => (
          <div key={s.name} className="rounded-2xl border p-6 transition-all hover:-translate-y-0.5" style={{ backgroundColor: channel.bg, borderColor: "var(--border-light)" }}>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>Capabilities</motion.p>
        <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          Three channels.<br /><span style={{ color: "var(--teal)" }}>One growth engine.</span>
        </motion.h1>
        <motion.p className="mt-6 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          Our omni-channel approach unifies Search, Lifecycle, and Social into a cohesive system where every dollar works harder and every insight compounds.
        </motion.p>
        {channels.map((ch, i) => <ChannelSection key={ch.title} channel={ch} index={i} />)}
      </div>
      <Footer />
    </main>
  );
}
