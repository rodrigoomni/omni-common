"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

type Face = {
  src: string;
  bg: string;
  alt: string;
};

// Face + colored disc combos (matching the Figma color palette)
const FACES: Face[] = [
  { src: "/images/faces/face3.png", bg: "#CFFC68", alt: "Team member" },
  { src: "/images/faces/face5.png", bg: "#D5FA65", alt: "Team member" },
  { src: "/images/faces/face7.png", bg: "#A5FDF3", alt: "Team member" },
  { src: "/images/faces/face1.png", bg: "#FFFDEF", alt: "Team member" },
  { src: "/images/faces/face2.png", bg: "#CFFC68", alt: "Team member" },
  { src: "/images/faces/face9.png", bg: "#A5FDF3", alt: "Team member" },
  { src: "/images/faces/face6.png", bg: "#D5FA65", alt: "Team member" },
  { src: "/images/faces/face8.png", bg: "#FFFDEF", alt: "Team member" },
  { src: "/images/faces/face4.png", bg: "#D5FA65", alt: "Team member" },
];

type Stat = {
  value: string;
  valueColor: string;
  label: string;
  gradient?: boolean;
};

const STATS: Stat[] = [
  {
    value: "85",
    valueColor: "#14545d",
    label: " Cumulative Years of Experience",
  },
  {
    value: "11",
    valueColor: "#0a81b8",
    label: " Degrees Among Us",
  },
  {
    value: "Millions",
    valueColor: "",
    label: " in Revenue Grown",
    gradient: true,
  },
  {
    value: "12",
    valueColor: "#0a2b47",
    label: " Golf Handicap",
  },
];

export function RealPeople() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-24 md:px-8 md:py-32 lg:px-[60px] lg:py-[144px]"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto w-full max-w-[1364px]">
       <div className="px-4 md:px-8 lg:px-0">

        {/* Headline */}
        <div className="flex justify-center py-8">
          <motion.h2
            className="max-w-[1120px] text-center leading-[0.99] tracking-[-0.022em]"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#262626",
              fontSize: "clamp(3rem, 5.2vw, 72px)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="font-bold">We&apos;re </span>
            <motion.span
              className="inline-block bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #89EDFF 0%, #DBF227 100%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
            >
              Real People.
            </motion.span>
          </motion.h2>
        </div>
       </div>
      </div>

      {/* Ticker — full-bleed edge-to-edge */}
      <motion.div
        className="relative overflow-hidden py-11"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: EASE }}
      >
        {/* Edge fade masks — softens the entry/exit points */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 md:w-48"
          style={{
            background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 md:w-48"
          style={{
            background: "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden
        />

        <motion.div
          className="flex w-max gap-10 md:gap-[40px]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...FACES, ...FACES].map((face, i) => (
            <div
              key={i}
              className="relative flex shrink-0 items-end justify-center overflow-hidden rounded-full"
              style={{
                width: "clamp(180px, 18vw, 276px)",
                height: "clamp(180px, 18vw, 276px)",
                backgroundColor: face.bg,
              }}
            >
              <Image
                src={face.src}
                alt={face.alt}
                fill
                sizes="(min-width: 1280px) 276px, 18vw"
                className="object-cover object-bottom"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="mx-auto w-full max-w-[1364px]">
       <div className="px-4 md:px-8 lg:px-0">

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3 py-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex h-8 items-center px-[13px]"
            >
              <p
                className="whitespace-nowrap font-medium uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#888888",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  lineHeight: "16px",
                }}
              >
                {stat.gradient ? (
                  <span
                    className="bg-clip-text font-bold text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(17deg, #F38264 8%, #FCEA8A 92%)",
                    }}
                  >
                    {stat.value}
                  </span>
                ) : (
                  <span className="font-bold" style={{ color: stat.valueColor }}>
                    {stat.value}
                  </span>
                )}
                {stat.label}
              </p>
              {i < STATS.length - 1 && (
                <span
                  className="pl-3 font-medium uppercase"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#e0e0dc",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    lineHeight: "16px",
                  }}
                  aria-hidden
                >
                  /
                </span>
              )}
            </div>
          ))}
        </motion.div>

       </div>
      </div>
    </section>
  );
}
