"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Search",
    description: "SEO, PPC, Content Marketing, Digital PR, Link Building, and AI/LLM Optimization — we dominate every search channel.",
    tags: ["SEO", "PPC", "Content", "Digital PR", "AI Optimization"],
    accent: "var(--lime)",
  },
  {
    number: "02",
    title: "Lifecycle",
    description: "Brand Identity, Email & Text Marketing, CRO, and Buyer's Journey Mapping — turning traffic into lifetime customers.",
    tags: ["Brand Identity", "Email", "CRO", "Journey Mapping"],
    accent: "var(--mint)",
  },
  {
    number: "03",
    title: "Social",
    description: "Content Creation, Video Production, Influencer Marketing, and Paid Social — building communities that convert.",
    tags: ["Content", "Video", "Influencer", "Paid Social"],
    accent: "var(--lime)",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 md:py-36" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>
            Our Channels
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
            We Build Growth Engines
            <br />
            <span style={{ color: "var(--teal)" }}>That Scale.</span>
          </h2>
        </motion.div>

        <div className="mt-16 space-y-0">
          {services.map((service, i) => (
            <ServiceRow key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col gap-6 py-12 md:flex-row md:items-start md:gap-12 lg:gap-16"
      style={{ borderBottom: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number — big, bold, filled with accent stripe */}
      <div
        className="relative flex-shrink-0 select-none"
        data-numeric="true"
        data-cursor="numeric"
      >
        {/* Background accent bar behind the number */}
        <motion.div
          className="absolute rounded-md"
          style={{
            backgroundColor: service.accent,
            top: "18%",
            left: "-6px",
            width: "110%",
            height: "40%",
            zIndex: 0,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          className="relative block text-7xl font-black leading-none tracking-[-0.06em] md:text-8xl"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "var(--teal)",
            zIndex: 1,
          }}
        >
          {service.number}
        </span>
      </div>

      {/* Title */}
      <div className="flex-shrink-0 md:w-48 md:pt-4">
        <h3
          className="text-2xl font-bold tracking-tight md:text-3xl"
          style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description + tags */}
      <div className="flex-1 md:pt-4">
        <p
          className="max-w-md text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
        >
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-inter)",
                borderColor: "var(--teal)",
                color: "var(--teal)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
