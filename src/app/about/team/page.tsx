"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Footer } from "@/components/footer";

const founders = [
  {
    name: "Ryan Charles",
    role: "Co-Founder & CEO",
    image: "/images/ryan-charles.png",
    bio: "Former growth lead scaling DTC and B2B brands across paid and organic. Built Omni Common to fix the fragmented agency model.",
  },
  {
    name: "Daniel",
    role: "Co-Founder",
    image: "/images/team/member-04.png",
    bio: "Operator and strategist with deep roots in lifecycle marketing, data systems, and omni-channel execution.",
  },
];

const team = [
  { name: "Abby", role: "Client Success Manager", image: "/images/team/Abby.webp" },
  { name: "Joel", role: "Search Marketing Lead", image: "/images/team/Joel.webp" },
  { name: "Maria", role: "Social Lead", image: "/images/team/Maria.webp" },
  { name: "Max", role: "Sr. Product Designer", image: "/images/team/Max.webp" },
  { name: "Ale", role: "Social Media Director", image: "/images/team/Ale.webp" },
  { name: "Mariana", role: "Admin & Content Specialist", image: "/images/team/Mariana.webp" },
  { name: "Rebecca", role: "Digital PR Outreach", image: "/images/team/Rebecca.webp" },
  { name: "Paul", role: "Video Production Lead", image: "/images/team/paul.webp" },
  { name: "Alan", role: "Art Director & Content Strategist", image: "/images/team/Alan.webp" },
  { name: "Rodrigo", role: "Sr. CRO Architect", image: "/images/team/Rodrigo.webp" },
  { name: "Stefy", role: "Human Resources Manager", image: "/images/team/Stefy.webp" },
  { name: "Shahnawaz", role: "Web Development", image: "/images/team/Shahnawaz.webp" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamPage() {
  const foundersRef = useRef(null);
  const foundersInView = useInView(foundersRef, { once: true, margin: "-80px" });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

  return (
    <main style={{ backgroundColor: "var(--background)" }}>
      {/* ── Hero ── */}
      <section className="pt-36 pb-28 md:pt-48 md:pb-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Our Team
          </motion.p>
          <motion.h1
            className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1] tracking-tighter"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Specialists, not{" "}
            <motion.span
              style={{ color: "var(--teal)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              generalists.
            </motion.span>
          </motion.h1>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="pb-10 md:pb-14">
        <div className="site-container px-6 md:px-12 lg:px-24" ref={foundersRef}>
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={foundersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            Leadership
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={foundersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Founded by <span style={{ color: "var(--teal)" }}>operators.</span>
          </motion.h2>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 md:max-w-2xl md:gap-14">
            {founders.map((person, i) => (
              <motion.div
                key={person.name}
                className="flex gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={foundersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.14, ease }}
              >
                <motion.div
                  className="h-[68px] w-[68px] flex-shrink-0 overflow-hidden rounded-full md:h-[80px] md:w-[80px]"
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={foundersInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.14, ease }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                </motion.div>
                <div>
                  <h3 className="text-base font-bold tracking-tight" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>{person.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>{person.role}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Team ── */}
      <section className="pt-10 pb-28 md:pt-14 md:pb-36">
        <div className="site-container px-6 md:px-12 lg:px-24" ref={teamRef}>
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            The Team
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            The people behind the <span style={{ color: "var(--teal)" }}>growth.</span>
          </motion.h2>

          <div className="mt-16 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {team.map((person, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.055, ease }}
              >
                <motion.div
                  className="mx-auto h-[76px] w-[76px] overflow-hidden rounded-full md:h-24 md:w-24"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={teamInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + i * 0.055,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                </motion.div>
                <motion.p
                  className="mt-3 text-xs font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
                  initial={{ opacity: 0 }}
                  animate={teamInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.055, ease }}
                >
                  {person.name}
                </motion.p>
                <motion.p
                  className="mt-0.5 text-[11px]"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
                  initial={{ opacity: 0 }}
                  animate={teamInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.36 + i * 0.055, ease }}
                >
                  {person.role}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
