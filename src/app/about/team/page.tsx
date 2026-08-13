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
  { name: "Team Member", role: "Search Strategist", image: "/images/team/member-01.png" },
  { name: "Team Member", role: "Lifecycle Lead", image: "/images/team/member-03.png" },
  { name: "Team Member", role: "Creative Director", image: "/images/team/member-14.png" },
  { name: "Team Member", role: "Social Lead", image: "/images/team/member-05.png" },
  { name: "Team Member", role: "Content Strategist", image: "/images/team/member-06.png" },
  { name: "Team Member", role: "Paid Media", image: "/images/team/member-07.png" },
  { name: "Team Member", role: "SEO Analyst", image: "/images/team/member-08.png" },
  { name: "Team Member", role: "Email Marketing", image: "/images/team/member-09.png" },
  { name: "Team Member", role: "Video Producer", image: "/images/team/member-10.png" },
  { name: "Team Member", role: "Data Analyst", image: "/images/team/member-11.png" },
  { name: "Team Member", role: "CRO Specialist", image: "/images/team/member-12.png" },
  { name: "Team Member", role: "Digital PR", image: "/images/team/member-13.png" },
];

export default function TeamPage() {
  const foundersRef = useRef(null);
  const foundersInView = useInView(foundersRef, { once: true, margin: "-100px" });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <main style={{ backgroundColor: "var(--background)" }}>
      <section className="pt-36 pb-28 md:pt-48 md:pb-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Our Team</p>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1] tracking-tighter" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              Specialists, not <span style={{ color: "var(--teal)" }}>generalists.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 md:pb-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div ref={foundersRef} initial={{ opacity: 0, y: 40 }} animate={foundersInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Leadership</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              Founded by <span style={{ color: "var(--teal)" }}>operators.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 md:max-w-2xl md:gap-14">
            {founders.map((person, i) => (
              <motion.div key={person.name} className="flex gap-5" initial={{ opacity: 0, y: 30 }} animate={foundersInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <div className="h-[68px] w-[68px] flex-shrink-0 overflow-hidden rounded-full md:h-[80px] md:w-[80px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                </div>
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

      <section className="py-28 md:py-36">
        <div className="site-container px-6 md:px-12 lg:px-24">
          <motion.div ref={teamRef} initial={{ opacity: 0, y: 40 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>The Team</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              The people behind the <span style={{ color: "var(--teal)" }}>growth.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {team.map((person, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
                <div className="mx-auto h-[76px] w-[76px] overflow-hidden rounded-full md:h-24 md:w-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                </div>
                <p className="mt-3 text-xs font-bold tracking-tight" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>{person.name}</p>
                <p className="mt-0.5 text-[11px]" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
