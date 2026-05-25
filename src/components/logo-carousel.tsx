"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "NumberBarn",
  "Trio Flatmount",
  "Talitha & Lofty",
  "Rapid Garden",
  "ClearHello",
  "Nordstrom",
  "Shopify Plus",
  "HubSpot",
];

export function LogoCarousel() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Scroll-synced entrance — overlaps circle mask exit
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.95, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 100%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-[3] py-16"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--background)",
        transformOrigin: "center top",
      }}
    >
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.p
          ref={ref}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Trusted by growth-driven brands
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
