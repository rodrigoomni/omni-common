"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Search",
    description: "SEO, PPC, Content Marketing, Digital PR, Link Building, and AI/LLM Optimization — we dominate every search channel.",
    tags: ["SEO", "PPC", "Content", "Digital PR", "AI Optimization"],
    accent: "var(--mint)",
    glassBg: "rgba(165,253,243,0.35)",
    textColor: "rgba(235, 255, 253, 0.95)", // almost whitish light blue/mint
    strokeColor: "rgba(26, 122, 122, 0.4)", // teal stroke for contrast
  },
  {
    number: "02",
    title: "Lifecycle",
    description: "Brand Identity, Email & Text Marketing, CRO, and Buyer's Journey Mapping — turning traffic into lifetime customers.",
    tags: ["Brand Identity", "Email", "CRO", "Journey Mapping"],
    accent: "var(--lime)",
    glassBg: "rgba(207,252,104,0.35)",
    textColor: "rgba(225, 255, 130, 0.95)", // light saturated lime
    strokeColor: "rgba(26, 122, 122, 0.4)", // teal stroke for contrast
  },
  {
    number: "03",
    title: "Social",
    description: "Content Creation, Video Production, Influencer Marketing, and Paid Social — building communities that convert.",
    tags: ["Content", "Video", "Influencer", "Paid Social"],
    accent: "var(--lime)",
    glassBg: "rgba(255,253,239,0.7)",
    textColor: "rgba(26, 122, 122, 0.85)", // teal
    strokeColor: "rgba(255, 255, 255, 0.6)", // white stroke
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

        {/* Bottom statement */}
        <StatementBlock />
      </div>
    </section>
  );
}

function StatementBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      data-theme="dark"
      className="relative mt-20 overflow-hidden px-8 py-14 text-center md:px-16 md:py-16"
      style={{
        background: "linear-gradient(135deg, #0f1f2e 0%, #14545D 50%, #0A2B47 100%)",
        borderRadius: "2px 24px 2px 24px",
        border: "0.5px solid rgba(165, 253, 243, 0.15)",
        boxShadow: "inset 0 1px 0 0 rgba(165, 253, 243, 0.08), inset 0 -1px 0 0 rgba(0,0,0,0.2)",
        transformOrigin: "bottom center",
      }}
      initial={{ opacity: 0, scale: 0.95, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.2 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--mint)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: "var(--lime)" }}
      />
      <motion.div
        className="absolute top-0 left-8 right-8 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(207,252,104,0.3), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <p
        className="relative mx-auto max-w-2xl text-lg font-medium leading-relaxed md:text-xl"
        style={{
          fontFamily: "var(--font-encode)",
          color: "rgba(255,255,255,0.82)",
          letterSpacing: "-0.01em",
        }}
      >
        &ldquo;If your company has hit a plateau, struggles with fragmented
        marketing efforts, or is unsure how to scale efficiently —
        <span className="font-bold" style={{ color: "#fff" }}> you just found your growth partner.</span>&rdquo;
      </p>
    </motion.div>
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
        className="relative flex-shrink-0 select-none w-max md:w-auto"
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
          className="relative block font-black leading-none tracking-[-0.06em]"
          style={{
            fontSize: "clamp(7.5rem, 15vw, 11rem)",
            fontFamily: "var(--font-archivo)",
            color: service.textColor,
            WebkitTextStroke: `1.5px ${service.strokeColor}`,
            filter: "drop-shadow(6px 8px 10px rgba(26, 122, 122, 0.25)) drop-shadow(-2px -2px 4px rgba(255,255,255,0.8))",
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
