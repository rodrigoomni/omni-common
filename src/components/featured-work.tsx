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
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ boxShadow: `6px 6px 0px 0px ${project.image && project.cursorColors ? project.cursorColors.fill : "var(--teal)"}` }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundColor: project.color }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black" style={{ fontFamily: "var(--font-archivo)", color: "rgba(10,43,71,0.12)" }}>
                  {project.title}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              {project.title}
            </h3>
            <p className="mt-1 text-sm" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>
              {project.category}
            </p>
          </div>
          <span className="mt-1 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--teal)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </span>
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
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              Case Studies
            </h2>
          </div>
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>
            View all <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </Link>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {caseStudies.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* And more... card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Link
            href="/work"
            className="group flex items-center justify-between rounded-2xl px-8 py-8 transition-all duration-300 hover:-translate-y-1 md:px-12"
            style={{ backgroundColor: "var(--surface-raised)", border: "1.5px solid var(--border-light)", boxShadow: "4px 4px 0px 0px var(--teal)" }}
            data-cursor="cta"
            data-cursor-hint="see all work"
          >
            <div>
              <p className="text-sm font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>
                These are just a few highlights.
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight md:text-2xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
                We have more stories to share<span style={{ color: "var(--teal)" }}>.</span>
              </p>
            </div>
            <span className="flex-shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-2" style={{ color: "var(--teal)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
