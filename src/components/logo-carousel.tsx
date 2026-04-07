"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const clients = [
  "Skincare Junkie",
  "NumberBarn",
  "Talitha & Lofty",
  "Trio Flatmount",
  "ClearHello",
  "Nordstrom",
  "Shopify Plus",
  "HubSpot",
];

export function LogoCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p
          ref={ref}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Trusted by brands ready to scale
        </motion.p>
      </div>

      {/* Infinite scroll ticker */}
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-[scroll_30s_linear_infinite]">
          {[...clients, ...clients, ...clients].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-8 flex h-12 flex-shrink-0 items-center justify-center md:mx-12"
            >
              <span
                className="whitespace-nowrap text-base font-semibold tracking-tight md:text-lg"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "var(--foreground-subtle)",
                  opacity: 0.6,
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
