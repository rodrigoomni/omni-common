"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import homeContent from "@/content/home.json";

gsap.registerPlugin(ScrollTrigger);
const { opening_pitch: copy } = homeContent;

/**
 * Splits a string into per-word inline spans marked `.reveal-word`,
 * each starting at low opacity for scroll-driven fill-in.
 */
function RevealWords({
  text,
  color,
  className,
}: {
  text: string;
  color?: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className={`reveal-word inline-block ${className ?? ""}`}
          style={{
            opacity: 0.14,
            color,
            whiteSpace: "pre",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function OpeningPitch() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyStackRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2aRef = useRef<HTMLHeadingElement>(null);
  const line2bRef = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const brandBlockRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wireReveal = (
        el: HTMLElement | null,
        endOffset = "top 62%",
      ) => {
        if (!el) return;
        const words = el.querySelectorAll(".reveal-word");
        if (!words.length) return;
        gsap.to(words, {
          opacity: 1,
          ease: "power2.out",
          stagger: { each: 0.022, from: "start" },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: endOffset,
            scrub: 0.12,
          },
        });
      };

      wireReveal(line1Ref.current);
      wireReveal(line2aRef.current);
      wireReveal(line2bRef.current);
      wireReveal(line3Ref.current);

      // Brand + CTA: quick rise + fade
      [brandRef.current, ctaRef.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 72%",
              scrub: 0.12,
            },
          },
        );
      });

      // Copy stack outro — sentences fade + lift one-by-one as the brand logo
      // approaches. Mobile uses an earlier trigger window; desktop cascades
      // over a longer runway.
      if (copyStackRef.current && brandRef.current) {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const lines = [
          line1Ref.current,
          line2aRef.current,
          line2bRef.current,
          line3Ref.current,
        ].filter(Boolean) as HTMLElement[];

        const firstStart = isMobile ? 130 : 95;
        const stepPct = isMobile ? 18 : 12;
        const windowPct = isMobile ? 30 : 22;

        lines.forEach((line, i) => {
          const startPct = firstStart - i * stepPct;
          const endPct = startPct - windowPct;
          gsap.to(line, {
            opacity: 0,
            y: -30,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: brandRef.current,
              start: `top ${startPct}%`,
              end: `top ${endPct}%`,
              scrub: 0.3,
            },
          });
        });
      }

      // Brand block outro — hold the logo in place, then fade only as it
      // scrolls off the top of the viewport.
      if (brandBlockRef.current) {
        gsap.to(brandBlockRef.current, {
          opacity: 0,
          y: -60,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: brandBlockRef.current,
            start: "top 15%",
            end: "top -40%",
            scrub: 0.4,
          },
        });
      }

      // Tagline — snap in, then reveal words fast
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top 90%",
              end: "top 78%",
              scrub: 0.12,
            },
          },
        );
        const taglineWords = taglineRef.current.querySelectorAll(".reveal-word");
        gsap.to(taglineWords, {
          opacity: 1,
          ease: "power2.out",
          stagger: { each: 0.02, from: "start" },
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 82%",
            end: "top 62%",
            scrub: 0.12,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 pb-[200px] pt-[80px] md:px-8 md:pb-[200px] md:pt-[101px] lg:px-[60px] lg:pb-[250px]"
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #E0E0DC",
      }}
    >
      {/* ── Copy stack ── */}
      <div ref={copyStackRef} className="mx-auto w-full max-w-[1364px]">
        <div className="flex w-full flex-col items-center gap-8 px-4 md:px-8 lg:px-0">
          {/* Line 1 — 44px */}
          <div className="flex w-full items-start justify-start py-8 md:py-11">
            <h2
              ref={line1Ref}
              className="whitespace-normal font-bold leading-[1.145] tracking-[-0.023em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(1.875rem, 3.05vw, 44px)",
              }}
            >
              <RevealWords text={copy.line1_start.trim()} />{" "}
              <RevealWords text={copy.line1_muted} color="#888888" />{" "}
              <RevealWords text={copy.line1_end.trim()} />
            </h2>
          </div>

          {/* Lines 2a + 2b — 56px */}
          <div className="flex w-full flex-col items-start justify-start gap-8 py-8 md:py-11">
            <h2
              ref={line2aRef}
              className="whitespace-normal font-bold leading-[1.05] tracking-[-0.027em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(2rem, 3.31vw, 47.6px)",
              }}
            >
              <RevealWords text={copy.line2a} />
            </h2>
            <h2
              ref={line2bRef}
              className="whitespace-normal font-bold leading-[1.05] tracking-[-0.027em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(2rem, 3.31vw, 47.6px)",
              }}
            >
              <RevealWords text={copy.line2b} />
            </h2>
          </div>

          {/* Line 3 — "We will." 64px teal */}
          <div className="flex w-full items-start justify-start py-8 md:py-11">
            <h2
              ref={line3Ref}
              className="whitespace-nowrap font-bold leading-[1.05] tracking-[-0.023em]"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#14545D",
                fontSize: "clamp(3rem, 5vw, 64px)",
              }}
            >
              <RevealWords text={copy.line3} />
            </h2>
          </div>
        </div>
      </div>

      {/* ── Brand block ── */}
      <div className="mx-auto w-full max-w-[1364px]">
        <div className="flex w-full flex-col items-center px-4 pt-40 md:px-8 md:pt-40 lg:px-0 lg:pt-[200px]">
          <div
            ref={brandBlockRef}
            className="flex w-full flex-col items-center gap-12"
            style={{ zIndex: 1 }}
          >
            <div className="flex w-full flex-col items-center gap-6 pt-12 md:pt-20">
              <div ref={brandRef} className="w-full max-w-[395px]">
                <Image
                  src="/images/logo-omni-xl.svg"
                  alt="Omni Common"
                  width={534}
                  height={165}
                  priority={false}
                  className="h-auto w-full"
                />
              </div>

              <p
                ref={taglineRef}
                className="text-center font-bold leading-[1.32] tracking-[-0.025em]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  fontSize: "clamp(1.25rem, 1.87vw, 27px)",
                }}
              >
                <RevealWords text={copy.tagline_black} color="#262626" />
                <br aria-hidden className="md:hidden" />
                <span className="hidden md:inline"> </span>
                <RevealWords text={copy.tagline_teal} color="#14545D" />
                <br aria-hidden className="md:hidden" />
                <span className="hidden md:inline"> </span>
                <span className="font-black">
                  <RevealWords text={copy.tagline_green} color="#94D80A" />
                </span>
              </p>
            </div>

            <div ref={ctaRef}>
              <Link
                href="#lets-chat"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D1D1D1] bg-white px-[25px] py-[13px] text-[#454545] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#0A2B47] hover:bg-[#0A2B47] hover:text-white"
              >
                <span
                  className="font-semibold leading-[1.428]"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
                >
                  {copy.cta_label}
                </span>
                <span
                  className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 1.5,
                  }}
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
