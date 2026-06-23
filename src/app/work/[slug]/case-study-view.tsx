"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  caseStudies,
  type MediaBlock as MediaBlockType,
  type SnapshotBullet,
  type ApproachStat,
} from "@/data/case-studies";
import { Footer } from "@/components/footer";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";
import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────────
   Fullscreen image viewer
   ────────────────────────────────────────────────────────────────────────── */
function FullscreenViewer({
  images,
  title,
  startIndex,
  onClose,
}: {
  images: string[];
  title: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );

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
      style={{ backgroundColor: "rgba(8,18,28,0.94)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:text-white"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        aria-label="Close fullscreen"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-h-[92vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              width={2400}
              height={1350}
              className="max-h-[92vh] w-auto object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "white" }}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "white" }}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "28px" : "8px",
                backgroundColor: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Big hero-style carousel — editorial, full-bleed
   ────────────────────────────────────────────────────────────────────────── */
function HeroCarousel({
  images,
  title,
  fallbackColor,
}: {
  images: string[];
  title: string;
  fallbackColor: string;
}) {
  const [current, setCurrent] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );

  if (images.length === 0) {
    return (
      <div
        className="flex aspect-[16/9] items-center justify-center"
        style={{ backgroundColor: fallbackColor }}
      >
        <span
          className="text-8xl font-black"
          style={{ fontFamily: "var(--font-archivo)", color: "rgba(20,84,93,0.08)" }}
        >
          {title}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: fallbackColor, aspectRatio: "16 / 9" }}
        data-cursor="image"
        data-cursor-hint="expand"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setFullscreenIndex(current)}
          >
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle bottom gradient for chrome legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
          }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-105 md:flex"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#262626",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-105 md:flex"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#262626",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>

            {/* Counter — top right */}
            <div
              className="absolute right-6 top-6 z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wider backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#262626",
                fontFamily: "var(--font-inter)",
              }}
            >
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            {/* Dots — bottom center */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "32px" : "8px",
                    backgroundColor: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
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

/* ──────────────────────────────────────────────────────────────────────────────
   Inline media block — supports single/pair/grid/wide layouts
   ────────────────────────────────────────────────────────────────────────── */
function MediaBlock({ block, title }: { block: MediaBlockType; title: string }) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const layout = block.layout || "single";
  const items = block.items;

  if (items.length === 0) return null;

  const gridClass =
    layout === "pair"
      ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
      : layout === "grid"
      ? "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      : "grid grid-cols-1";

  // `wide` extends rightward past the reading column on lg+
  const wrapperClass =
    layout === "wide"
      ? "my-14 lg:mr-[calc(720px-100%)] lg:max-w-none"
      : "my-14";

  // Only real (non-placeholder) sources are fullscreen-able.
  const allSources = items
    .filter((it) => !it.placeholder && it.src)
    .map((it) => it.src as string);

  return (
    <motion.figure
      className={wrapperClass}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {block.eyebrow && (
        <p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
        >
          {block.eyebrow}
        </p>
      )}

      <div className={gridClass}>
        {items.map((item, i) => (
          <MediaItemView
            key={`${item.src ?? "ph"}-${i}`}
            item={item}
            isOnlyOne={items.length === 1}
            onClick={item.placeholder ? undefined : () => setFullscreenIndex(i)}
          />
        ))}
      </div>

      {block.caption && (
        <figcaption
          className="mt-4 text-xs italic leading-relaxed md:text-sm"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-subtle)" }}
        >
          {block.caption}
        </figcaption>
      )}

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <FullscreenViewer
            images={allSources}
            title={title}
            startIndex={fullscreenIndex}
            onClose={() => setFullscreenIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.figure>
  );
}

function MediaItemView({
  item,
  isOnlyOne,
  onClick,
}: {
  item: {
    src?: string;
    alt?: string;
    caption?: string;
    bg?: string;
    placeholder?: boolean;
    aspect?: string;
  };
  isOnlyOne: boolean;
  onClick?: () => void;
}) {
  const aspect = item.aspect || (isOnlyOne ? "16 / 10" : "4 / 3");

  // Placeholder box — no image, no fullscreen, subtle grey block with hint label.
  if (item.placeholder || !item.src) {
    return (
      <div className="flex flex-col">
        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-xl"
          style={{
            backgroundColor: item.bg || "#E5E5E0",
            aspectRatio: aspect,
            border: "1px dashed var(--border)",
          }}
          aria-label={item.alt || "Image placeholder"}
        >
          <div className="flex flex-col items-center gap-2 opacity-60">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--foreground-subtle)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
            >
              {item.alt || "Image to come"}
            </span>
          </div>
        </div>
        {item.caption && (
          <p
            className="mt-3 text-xs italic leading-relaxed"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-subtle)" }}
          >
            {item.caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onClick}
        className="group relative block w-full overflow-hidden rounded-xl text-left"
        style={{
          backgroundColor: item.bg || "var(--surface)",
          aspectRatio: aspect,
          border: "1px solid var(--border)",
        }}
        data-cursor="image"
        data-cursor-hint="expand"
        aria-label={item.alt || "Expand image"}
      >
        <Image
          src={item.src}
          alt={item.alt || ""}
          fill
          sizes={isOnlyOne ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 768px) 360px, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </button>
      {item.caption && (
        <p
          className="mt-3 text-xs italic leading-relaxed"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-subtle)" }}
        >
          {item.caption}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Metric card (results grid)
   ────────────────────────────────────────────────────────────────────────── */
function MetricCard({
  metric,
  value,
  index,
}: {
  metric: string;
  value: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="border-l pl-6"
      style={{ borderColor: "var(--teal)", borderLeftWidth: "2px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="text-3xl font-bold tracking-tight md:text-4xl"
        style={{ fontFamily: "var(--font-archivo)", color: "var(--teal)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
      >
        {metric}
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Snapshot stat card (used inside the Snapshot section grid)
   ────────────────────────────────────────────────────────────────────────── */
const STAT_CARD_COLORS = [
  "#14545D", // teal
  "#B5470C", // terracotta
  "#5A35B0", // purple
  "#0F6B4D", // forest green
  "#C4375A", // rose
  "#1E6B9E", // ocean blue
];

function SnapshotStatCard({ bullet, index }: { bullet: SnapshotBullet; index: number }) {
  const accent = STAT_CARD_COLORS[index % STAT_CARD_COLORS.length];

  // Back-compat: render legacy `highlight + text` as a single inline row if value isn't set.
  if (!bullet.value && (bullet.highlight || bullet.text)) {
    return (
      <motion.li
        className="flex flex-col gap-1 border-l-2 pl-5 md:flex-row md:items-baseline md:gap-3"
        style={{ borderColor: accent }}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {bullet.highlight && (
          <span
            className="shrink-0 text-base font-bold md:text-lg"
            style={{
              fontFamily: "var(--font-archivo)",
              color: accent,
              letterSpacing: "-0.01em",
            }}
          >
            {bullet.highlight}
          </span>
        )}
        {bullet.text && (
          <span
            className="text-base leading-relaxed"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
          >
            — {bullet.text}
          </span>
        )}
      </motion.li>
    );
  }

  return (
    <motion.div
      className="relative flex flex-col rounded-xl border p-5 md:p-6"
      style={{
        borderColor: `${accent}26`,
        backgroundColor: `${accent}08`,
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="absolute left-0 top-6 h-8 w-1 rounded-r-full"
        style={{ backgroundColor: accent }}
      />
      <p
        className="font-black leading-[0.95] tracking-tighter"
        style={{
          fontFamily: "var(--font-archivo)",
          color: accent,
          fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        {bullet.value}
      </p>
      {bullet.label && (
        <p
          className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)", color: accent }}
        >
          {bullet.label}
        </p>
      )}
      {bullet.detail && (
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
        >
          {bullet.detail}
        </p>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Approach subsection trailing stat chip
   ────────────────────────────────────────────────────────────────────────── */
function ApproachStatChip({ stat }: { stat: ApproachStat }) {
  return (
    <motion.div
      className="mt-6 inline-flex items-baseline gap-3 rounded-md py-2 pl-4 pr-5"
      style={{
        backgroundColor: "rgba(207, 252, 104, 0.18)",
        borderLeft: "3px solid var(--teal)",
      }}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="font-bold leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "var(--teal)",
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {stat.value}
      </span>
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-secondary)" }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

/* TableOfContents lives in `@/components/table-of-contents` (shared by case
   studies and the local marketing page). Import TocItem from there too. */

/* ──────────────────────────────────────────────────────────────────────────────
   Section header (used inside content column)
   ────────────────────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, heading }: { eyebrow?: string; heading: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-2xl font-bold tracking-tight md:text-4xl"
        style={{
          fontFamily: "var(--font-archivo)",
          color: "var(--foreground)",
          letterSpacing: "-0.02em",
        }}
      >
        {heading}
      </h2>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Main view
   ────────────────────────────────────────────────────────────────────────── */
export default function CaseStudyView({ slug }: { slug: string }) {
  const study = caseStudies.find((s) => s.slug === slug);

  const carouselImages = useMemo(() => {
    if (!study) return [];
    return study.images && study.images.length > 0
      ? study.images
      : study.image
      ? [study.image]
      : [];
  }, [study]);

  // Build TOC items based on which sections actually exist
  const tocItems = useMemo<TocItem[]>(() => {
    if (!study) return [];
    const items: TocItem[] = [];
    if (study.snapshot) items.push({ id: "snapshot", label: "Snapshot" });
    if (study.background) items.push({ id: "background", label: "Background" });
    if (study.approach) items.push({ id: "approach", label: "Approach" });
    // Fallbacks for simple case studies
    if (!study.background && study.overview) items.push({ id: "overview", label: "Overview" });
    if (!study.approach && (study.challenge || study.solution)) {
      items.push({ id: "challenge", label: "The Challenge" });
    }
    items.push({ id: "results", label: "Results" });
    if (study.opportunity) items.push({ id: "opportunity", label: "What's Next" });
    return items;
  }, [study]);

  if (!study) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p style={{ color: "var(--foreground-muted)" }}>Case study not found.</p>
      </main>
    );
  }

  return (
    <main className="pt-28 md:pt-32">
      {/* ── Top: breadcrumb */}
      <div className="site-container px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:opacity-70"
            style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M11 18l-6-6 6-6" />
            </svg>
            All Work
          </Link>
        </motion.div>
      </div>

      {/* ── Hero: title + subtitle */}
      <section className="site-container px-6 pb-12 md:px-12 md:pb-16 lg:px-24">
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {study.category} · {study.year}
        </motion.p>

        <motion.h1
          className="mt-4 text-5xl font-bold tracking-tighter md:text-7xl lg:text-[8.5rem] lg:leading-[0.95]"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "var(--foreground)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {study.title}
        </motion.h1>

        {study.subtitle && (
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {study.subtitle}
          </motion.p>
        )}
      </section>

      {/* ── Big hero image carousel — full bleed within site-container */}
      <motion.div
        className="site-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroCarousel
          images={carouselImages}
          title={study.title}
          fallbackColor={study.color}
        />
      </motion.div>

      {/* ── Meta strip below carousel */}
      {study.meta && study.meta.length > 0 && (
        <section
          className="site-container px-6 md:px-12 lg:px-24"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <motion.dl
            className="grid grid-cols-2 gap-y-6 py-10 md:grid-cols-4 md:py-12 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {study.meta.map((item) => (
              <div key={item.label} className="pr-4">
                <dt
                  className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
                >
                  {item.label}
                </dt>
                <dd
                  className="mt-2 text-sm leading-snug"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </section>
      )}

      {/* ── Content with sticky TOC */}
      <section className="site-container px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-24">
          {/* Left: Sticky TOC */}
          <TableOfContents items={tocItems} />

          {/* Right: Content column */}
          <div className="max-w-[720px]">
            {/* Inline TOC — mobile only, before the first section */}
            <div className="mb-14 lg:hidden">
              <TableOfContents items={tocItems} variant="inline" />
            </div>

            {/* Snapshot */}
            {study.snapshot && (
              <section id="snapshot" className="scroll-mt-32">
                <SectionHeader eyebrow="01 — Snapshot" heading="The wins at a glance." />
                <p
                  className="text-lg leading-relaxed md:text-xl"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
                >
                  {study.snapshot.intro}
                </p>

                <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {study.snapshot.bullets.map((bullet, i) => (
                    <SnapshotStatCard key={i} bullet={bullet} index={i} />
                  ))}
                </div>

                {study.snapshot.media && (
                  <MediaBlock block={study.snapshot.media} title={study.title} />
                )}
              </section>
            )}

            {/* Background */}
            {study.background ? (
              <section id="background" className="mt-28 scroll-mt-32">
                <SectionHeader eyebrow="02 — Background" heading={study.background.heading} />
                <div className="space-y-6">
                  {study.background.paragraphs.map((p, i) => (
                    <RichParagraph key={i} text={p} />
                  ))}
                </div>
                {study.background.media && (
                  <MediaBlock block={study.background.media} title={study.title} />
                )}
              </section>
            ) : (
              <section id="overview" className="mt-28 scroll-mt-32">
                <SectionHeader eyebrow="01 — Overview" heading={study.tagline} />
                <RichParagraph text={study.overview} />
              </section>
            )}

            {/* Approach */}
            {study.approach ? (
              <section id="approach" className="mt-28 scroll-mt-32">
                <SectionHeader eyebrow="03 — Approach" heading={study.approach.heading} />
                <RichParagraph text={study.approach.intro} />

                {study.approach.media && (
                  <MediaBlock block={study.approach.media} title={study.title} />
                )}

                <div className="mt-14 space-y-12">
                  {study.approach.sections.map((section, i) => (
                    <ApproachSubsection
                      key={section.title}
                      section={section}
                      index={i}
                      title={study.title}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <section id="challenge" className="mt-28 scroll-mt-32">
                <SectionHeader eyebrow="02 — The Challenge" heading="What we walked into." />
                <RichParagraph text={study.challenge} />
                <div className="mt-12">
                  <h3
                    className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
                  >
                    Our Approach
                  </h3>
                  <RichParagraph text={study.solution} />
                </div>
              </section>
            )}

            {/* Results */}
            <section id="results" className="mt-28 scroll-mt-32">
              <SectionHeader
                eyebrow={study.approach ? "04 — Results" : "03 — Results"}
                heading={study.resultsSection?.heading || "What the numbers say."}
              />
              {study.resultsSection?.body && <RichParagraph text={study.resultsSection.body} />}

              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
                {study.results.map((r, i) => (
                  <MetricCard key={r.metric} metric={r.metric} value={r.value} index={i} />
                ))}
              </div>

              {study.resultsSection?.media && (
                <MediaBlock block={study.resultsSection.media} title={study.title} />
              )}
            </section>

            {/* Opportunity ahead */}
            {study.opportunity && (
              <section id="opportunity" className="mt-28 scroll-mt-32">
                <SectionHeader eyebrow="05 — What's Next" heading={study.opportunity.heading} />
                <ul className="space-y-4">
                  {study.opportunity.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-4 text-base leading-relaxed md:text-lg"
                      style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span
                        className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--lime)" }}
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
                <p
                  className="mt-10 text-lg leading-relaxed md:text-xl"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "var(--foreground)",
                    fontStyle: "italic",
                  }}
                >
                  {study.opportunity.closer}
                </p>

                {study.opportunity.media && (
                  <MediaBlock block={study.opportunity.media} title={study.title} />
                )}
              </section>
            )}

            {/* Services tags */}
            <section className="mt-28">
              <h3
                className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
              >
                Services delivered
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium"
                    style={{
                      fontFamily: "var(--font-inter)",
                      borderColor: "var(--border)",
                      color: "var(--foreground-secondary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Footnote */}
            {study.footnote && (
              <p
                className="mt-20 border-t pt-8 text-xs leading-relaxed"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-subtle)",
                  borderColor: "var(--border)",
                  fontStyle: "italic",
                }}
              >
                {study.footnote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Next Project */}
      <div className="site-container px-6 md:px-12 lg:px-24">
        <div
          className="rounded-2xl px-8 py-20 md:px-16 md:py-28"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <NextProject currentSlug={study.slug} />
        </div>
      </div>

      <Footer />
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Reusable content blocks
   ────────────────────────────────────────────────────────────────────────── */
function RichParagraph({ text }: { text: string }) {
  return (
    <motion.p
      className="text-base leading-[1.75] md:text-[17px] md:leading-[1.7]"
      style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  );
}

function ApproachSubsection({
  section,
  index,
  title,
}: {
  section: { title: string; body: string; media?: MediaBlockType; stat?: ApproachStat };
  index: number;
  title: string;
}) {
  return (
    <motion.div
      className="border-t pt-8"
      style={{ borderColor: "var(--border)" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-baseline gap-4">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.25em]"
          style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="text-xl font-bold tracking-tight md:text-2xl"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "var(--foreground)",
            letterSpacing: "-0.015em",
          }}
        >
          {section.title}
        </h3>
      </div>
      <p
        className="mt-4 text-base leading-[1.75] md:text-[17px] md:leading-[1.7]"
        style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-secondary)" }}
      >
        {section.body}
      </p>
      {section.stat && <ApproachStatChip stat={section.stat} />}
      {section.media && <MediaBlock block={section.media} title={title} />}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Next project block
   ────────────────────────────────────────────────────────────────────────── */
function NextProject({ currentSlug }: { currentSlug: string }) {
  const idx = caseStudies.findIndex((s) => s.slug === currentSlug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  return (
    <Link href={`/work/${next.slug}`} className="group block">
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.28em]"
        style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
      >
        Next Project
      </p>
      <h2
        className="mt-3 text-4xl font-bold tracking-tighter transition-opacity group-hover:opacity-70 md:text-6xl"
        style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
      >
        {next.title}{" "}
        <span style={{ color: "var(--teal)" }} className="inline-block transition-transform group-hover:translate-x-2">
          &rarr;
        </span>
      </h2>
      {next.tagline && (
        <p
          className="mt-4 max-w-xl text-base leading-relaxed"
          style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
        >
          {next.tagline}
        </p>
      )}
    </Link>
  );
}
