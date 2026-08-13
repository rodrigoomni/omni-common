"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";
import { useTrioModal } from "@/components/trio-coming-soon";
import homeContent from "@/content/home.json";

const HEADER_EASE = [0.22, 1, 0.36, 1] as const;

function CaseStudyCard({
  project,
  index,
  heightClass,
}: {
  project: (typeof caseStudies)[0];
  index: number;
  heightClass: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const delay = 0.1 + index * 0.12;
  const { openTrioModal } = useTrioModal();
  const isTrio = project.slug === "trio-flatmount";
  const shellClass = "group flex w-full flex-col gap-3 text-left";
  const cursorAttrs = {
    "data-cursor": "card",
    "data-cursor-hint": isTrio ? "Coming soon" : project.cursorHint,
    ...(project.cursorColors
      ? {
          "data-cursor-fill": project.cursorColors.fill,
          "data-cursor-stroke": project.cursorColors.stroke,
        }
      : {}),
  } as const;

  const inner = (
    <>
        {/* Image frame — clip-path curtain reveal on enter, hover overlay reveals title */}
        <motion.div
          className={`relative w-full overflow-hidden rounded-[12px] ${heightClass}`}
          style={{ backgroundColor: "#8D8D8D" }}
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 1.1, delay: delay + 0.05, ease: HEADER_EASE }}
        >
          {(project.thumbnail || project.image) && (
            <Image
              src={(project.thumbnail || project.image) as string}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              // Rapid Garden thumbnail is a UI mockup that gets clipped by
              // object-cover — contain-center it so the interface stays whole.
              className="object-cover object-center grayscale-0 transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale"
            />
          )}

          {/* Hover overlay — dark scrim + title anchored bottom-left */}
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-start opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            style={{ backgroundColor: "rgba(20, 84, 93, 0.72)" }}
          >
            <div className="translate-y-3 p-6 text-left transition-transform duration-500 ease-out group-hover:translate-y-0 md:p-8 lg:p-10">
              <p
                className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-archivo)", color: "#fff" }}
              >
                {(() => {
                  // Slug-specific two-line stacking; strip any trailing period
                  // to prevent doubling with the lime accent dot below.
                  const lines =
                    project.slug === "lofty-coffee"
                      ? ["Lofty", "Coffee"]
                      : [project.title.replace(/\.$/, "")];
                  return lines.map((line, i) =>
                    i < lines.length - 1 ? (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ) : (
                      <span key={i}>
                        {line}
                        <span style={{ color: "var(--lime)" }}>.</span>
                      </span>
                    ),
                  );
                })()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tags row — previous iteration styling */}
        <motion.div
          className="flex flex-wrap items-center gap-x-2 gap-y-2"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.55, ease: HEADER_EASE }}
        >
          {project.services.slice(0, 4).map((service) => (
            <span
              key={service}
              className="whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-inter)",
                borderColor: "var(--border)",
                color: "var(--foreground-muted)",
              }}
            >
              {service}
            </span>
          ))}
          {isTrio && (
            <span
              className="whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(207,252,104,0.35)",
                color: "var(--teal)",
              }}
            >
              Coming soon
            </span>
          )}
        </motion.div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: HEADER_EASE }}
    >
      {isTrio ? (
        <button type="button" onClick={openTrioModal} className={shellClass} {...cursorAttrs}>
          {inner}
        </button>
      ) : (
        <Link href={`/work/${project.slug}`} className={shellClass} {...cursorAttrs}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

export function FeaturedWork() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  // New Figma arrangement:
  //   Row 1 — NumberBarn (hero, full width)
  //   Row 2 — TRIO Flatmount (wide left) + Rapid Garden (narrow right)
  //   Row 3 — Lofty (narrow left) + Talitha (wide right)
  const bySlug = Object.fromEntries(caseStudies.map((s) => [s.slug, s]));
  const hero = bySlug["numberbarn"];
  const row2Wide = bySlug["trio-flatmount"];
  const row2Narrow = bySlug["rapid-garden"];
  const row3Narrow = bySlug["lofty-coffee"];
  const row3Wide = bySlug["talitha"];

  return (
    <section
      className="relative px-6 py-24 md:px-8 md:py-32 lg:px-[60px] lg:py-[120px]"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="site-container">
        {/* Header row */}
        <div
          ref={headerRef}
          className="mb-14 flex flex-col items-start gap-8 lg:mb-20"
        >
          <motion.h2
            className="text-[3rem] font-bold leading-[1.05] tracking-[-0.03em] lg:whitespace-nowrap lg:text-[64px] xl:text-[72px]"
            style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: HEADER_EASE }}
          >
            <span>{homeContent.featured_work.heading_main}</span>{" "}
            <motion.span
              className="inline-block"
              style={{ color: "var(--sherpa)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: HEADER_EASE }}
            >
              {homeContent.featured_work.heading_accent}
            </motion.span>
          </motion.h2>

        </div>

        {/* Card stack — Figma arrangement (3 rows, 5 cards) */}
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          {/* Row 1 — hero (NumberBarn) */}
          <CaseStudyCard
            project={hero}
            index={0}
            heightClass="aspect-[4/3] lg:aspect-auto lg:h-[720px]"
          />

          {/* Row 2 — wide left (TRIO) + narrow right (Rapid Garden) */}
          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
            <div className="w-full lg:w-[54%]">
              <CaseStudyCard
                project={row2Wide}
                index={1}
                heightClass="aspect-[4/3] lg:aspect-auto lg:h-[480px]"
              />
            </div>
            <div className="w-full lg:w-[42%]">
              <CaseStudyCard
                project={row2Narrow}
                index={2}
                heightClass="aspect-[4/3] lg:aspect-auto lg:h-[480px]"
              />
            </div>
          </div>

          {/* Row 3 — narrow left (Lofty) + wide right (Talitha) */}
          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
            <div className="w-full lg:w-[42%]">
              <CaseStudyCard
                project={row3Narrow}
                index={3}
                heightClass="aspect-[4/3] lg:aspect-auto lg:h-[480px]"
              />
            </div>
            <div className="w-full lg:w-[54%]">
              <CaseStudyCard
                project={row3Wide}
                index={4}
                heightClass="aspect-[4/3] lg:aspect-auto lg:h-[480px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
