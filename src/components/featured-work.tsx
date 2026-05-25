"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";

function ProjectCard({ project, index }: { project: (typeof caseStudies)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        data-cursor="card"
        data-cursor-hint={project.cursorHint}
        {...(project.cursorColors ? {
          "data-cursor-fill": project.cursorColors.fill,
          "data-cursor-stroke": project.cursorColors.stroke,
        } : {})}
      >
        {/* Project name — small uppercase above image */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: project.cursorColors?.fill || "var(--teal)" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--foreground-subtle)",
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ backgroundColor: project.color }}
            />
          )}
        </div>

        {/* Service tags — bordered pills below image */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.services.slice(0, 4).map((service) => (
            <span
              key={service}
              className="rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-inter)",
                borderColor: "var(--border)",
                color: "var(--foreground-muted)",
              }}
            >
              {service}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-28 md:py-36" style={{ backgroundColor: "var(--cream)" }}>
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>
              Featured Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              The Work Speaks<span style={{ color: "var(--teal)" }}>.</span>
            </h2>
          </div>
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>
            View all <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {caseStudies.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
