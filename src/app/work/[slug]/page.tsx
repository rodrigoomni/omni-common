"use client";

import { use, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { caseStudies } from "@/data/case-studies";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

function MetricCard({ metric, value, index }: { metric: string; value: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="pl-6" style={{ borderLeft: "2px solid var(--teal)" }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <p className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--teal)" }}>{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>{metric}</p>
    </motion.div>
  );
}

function FullscreenViewer({ images, title, startIndex, onClose }: { images: string[]; title: string; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        aria-label="Close fullscreen"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
      </button>

      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={images[current]} alt={`${title} — ${current + 1}`} width={1920} height={1080} className="max-h-[90vh] w-auto object-contain" />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className="h-2 rounded-full transition-all duration-300" style={{ width: i === current ? "24px" : "8px", backgroundColor: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }} aria-label={`Go to image ${i + 1}`} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ImageGallery({ images, title, fallbackColor }: { images: string[]; title: string; fallbackColor: string }) {
  const [current, setCurrent] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[21/9] items-center justify-center rounded-2xl" style={{ backgroundColor: fallbackColor }}>
        <span className="text-8xl font-black" style={{ fontFamily: "var(--font-archivo)", color: "rgba(20,84,93,0.08)" }}>{title}</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full" data-cursor="image" data-cursor-hint="expand">
        <div className="overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setFullscreenIndex(current)}
            >
              <Image
                src={images[current]}
                alt={`${title} — ${current + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#262626" }}
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#262626" }}
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    backgroundColor: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white", fontFamily: "var(--font-inter)" }}>
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <FullscreenViewer
            images={images}
            title={title}
            startIndex={fullscreenIndex}
            onClose={() => setFullscreenIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return <main className="flex h-screen items-center justify-center"><p style={{ color: "var(--foreground-muted)" }}>Case study not found.</p></main>;

  const carouselImages = study.images || (study.image ? [study.image] : []);

  return (
    <main className="pt-32">
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link href="/work" className="text-sm font-semibold transition-colors hover:text-foreground" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>&larr; All Work</Link>
        </motion.div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{study.category}</motion.p>
            <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-8xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>{study.title}</motion.h1>
          </div>
          <motion.div className="flex gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <div>
              <p className="text-xs font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>Client</p>
              <p className="mt-1 text-sm font-medium" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}>{study.client}</p>
            </div>
            <div>
              <p className="text-xs font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>Year</p>
              <p className="mt-1 text-sm font-medium" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}>{study.year}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="site-container">
        <motion.div
          className="mx-6 mt-16 overflow-hidden rounded-2xl md:mx-12 lg:mx-24"
          style={{ backgroundColor: study.color, boxShadow: `6px 6px 0px 0px ${study.image && study.cursorColors ? study.cursorColors.fill : "var(--teal)"}` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          data-cursor="image"
          data-cursor-hint="expand"
        >
          <ImageGallery images={carouselImages} title={study.title} fallbackColor={study.color} />
        </motion.div>
      </div>

      <div className="site-container">
        <motion.p className="mx-auto mt-20 max-w-2xl px-6 text-center text-2xl font-bold leading-relaxed tracking-tight md:text-3xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>{study.tagline}</motion.p>

        <div className="mx-auto mt-20 max-w-4xl px-6">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Overview</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}>{study.overview}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Services</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <span key={s} className="rounded-full border px-3 py-1 text-xs font-medium" style={{ fontFamily: "var(--font-inter)", borderColor: "var(--border)", color: "var(--foreground-secondary)" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-4xl space-y-16 px-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>The Challenge</h3>
            <p className="mt-4 text-lg leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}>{study.challenge}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Our Approach</h3>
            <p className="mt-4 text-lg leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}>{study.solution}</p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-4xl px-6">
          <h3 className="mb-10 text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Results</h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {study.results.map((r, i) => <MetricCard key={r.metric} metric={r.metric} value={r.value} index={i} />)}
          </div>
        </div>

        {/* Next Project — light grey background */}
        <div className="mt-32 rounded-2xl px-6 py-24 md:px-12 lg:px-24" style={{ backgroundColor: "var(--surface)" }}>
          <NextProject currentSlug={study.slug} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const idx = caseStudies.findIndex((s) => s.slug === currentSlug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  return (
    <Link href={`/work/${next.slug}`} className="group block">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>Next Project</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tighter transition-opacity group-hover:opacity-70 md:text-6xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
        {next.title} <span style={{ color: "var(--teal)" }}>&rarr;</span>
      </h2>
    </Link>
  );
}
