"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import homeContent from "@/content/home.json";
import { CtaPill } from "./cta-pill";

gsap.registerPlugin(ScrollTrigger);
const { opening_pitch: copy } = homeContent;

export function OpeningPitch() {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const brandCardRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const scrollCaretRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const lines = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
      ].filter(Boolean) as HTMLElement[];

      // ── Immersive narrative: each phrase travels from below the viewport
      //    up to center, holds, then continues up and out the top. Adjacent
      //    phrases overlap in time so as one is climbing out the top, the
      //    next is already climbing in from the bottom — no opacity fade,
      //    the motion itself does the reveal/exit.
      if (narrativeRef.current && lines.length) {
        const enterY = () => window.innerHeight * 0.9;
        const exitY = () => -window.innerHeight * 0.9;

        gsap.set(lines, { y: enterY, opacity: 1, force3D: true });
        // First phrase starts at its natural centered position — the sticky
        // container carries it into view as the section scrolls up, so it's
        // already visible (no huge white gap) before the pin engages.
        gsap.set(lines[0], { y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: narrativeRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // Timing per phrase, in timeline units:
        //   enter 0.35 → hold 0.4 → exit 0.75 → total lifespan 1.5
        //   next phrase starts entering 0.75 after the current one, so its
        //   enter window overlaps with the current phrase's slower drift out.
        const SPACING = 0.75;
        const ENTER = 0.35;
        const HOLD = 0.4;
        const EXIT = 0.75;

        lines.forEach((line, i) => {
          const isLast = i === lines.length - 1;
          const t0 = i * SPACING;

          tl.to(
            line,
            {
              y: 0,
              duration: ENTER,
              ease: "power2.out",
            },
            t0,
          );

          if (!isLast) {
            tl.to(
              line,
              {
                y: exitY,
                duration: EXIT,
                ease: "power2.inOut",
              },
              t0 + ENTER + HOLD,
            );
          }
        });

        // Extend the timeline so the last phrase ("We will.") has time to
        // sit at center before the pin releases and the brand card scrolls in.
        tl.to({}, { duration: 0.6 });

        // Scroll caret: continuous downward bounce while visible.
        if (scrollCaretRef.current) {
          gsap.to(scrollCaretRef.current, {
            y: 5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            duration: 0.9,
          });
        }

        // Scroll hint: fade in as the section pins, fade out before it releases.
        if (scrollHintRef.current) {
          gsap.fromTo(
            scrollHintRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: narrativeRef.current,
                start: "top 60%",
                end: "top top",
                scrub: 0.3,
              },
            },
          );
          gsap.to(scrollHintRef.current, {
            opacity: 0,
            ease: "power2.in",
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: "bottom 40%",
              end: "bottom bottom",
              scrub: 0.3,
            },
          });
        }
      }

      // ── Brand card reveal — the "answer" after the narrative. Card lifts
      //    and gently scales in, then logo, tagline, and CTA stagger on top
      //    so it feels like the brand is being uncovered piece by piece.
      if (brandCardRef.current) {
        gsap.set(brandCardRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          transformOrigin: "center top",
        });
        gsap.set(brandRef.current, {
          opacity: 0,
          y: 26,
          scale: 0.9,
          transformOrigin: "center center",
        });
        gsap.set(taglineRef.current, { opacity: 0, y: 18 });
        gsap.set(ctaRef.current, { opacity: 0, y: 18, scale: 0.94 });

        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: brandCardRef.current,
            start: "top 78%",
            once: true,
          },
        });

        revealTl
          .to(brandCardRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          })
          .to(
            brandRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.75",
          )
          .to(
            taglineRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.4)",
            },
            "-=0.3",
          );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E0E0DC" }}
    >
      {/* ── Immersive narrative — pinned sentence sequence ── */}
      <div
        ref={narrativeRef}
        className="relative w-full"
        style={{ height: "460vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Each phrase lives inside a full-viewport flex container so it
              stays perfectly centered while GSAP translates the wrapper. */}
          <div
            ref={line1Ref}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-8"
            style={{ willChange: "transform" }}
          >
            <h2
              className="w-full max-w-[1200px] whitespace-normal text-center font-bold leading-[1.12] tracking-[-0.023em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(1.875rem, 4vw, 56px)",
              }}
            >
              Your business{" "}
              <span style={{ color: "#888888" }}>isn&rsquo;t growing</span> fast
              enough.
            </h2>
          </div>

          <div
            ref={line2Ref}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-8"
            style={{ willChange: "transform" }}
          >
            <h2
              className="w-full max-w-[1200px] whitespace-normal text-center font-bold leading-[1.08] tracking-[-0.027em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(2rem, 4.2vw, 60px)",
              }}
            >
              You&rsquo;re about to spend real money.
            </h2>
          </div>

          <div
            ref={line3Ref}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-8"
            style={{ willChange: "transform" }}
          >
            <h2
              className="w-full max-w-[1200px] whitespace-normal text-center font-bold leading-[1.08] tracking-[-0.027em] md:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#262626",
                fontSize: "clamp(1.85rem, 4.2vw, 60px)",
              }}
            >
              Nobody will tell you how much will come back.
            </h2>
          </div>

          <div
            ref={line4Ref}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-8"
            style={{ willChange: "transform" }}
          >
            <h2
              className="w-full max-w-[1200px] whitespace-nowrap text-center font-bold leading-[1.05] tracking-[-0.023em]"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#14545D",
                fontSize: "clamp(3.25rem, 6.4vw, 92px)",
              }}
            >
              We will.
            </h2>
          </div>

        </div>
      </div>

      {/* Discreet scroll indicator — fixed to viewport bottom, only visible
          while the narrative section is in play. */}
      <div
        ref={scrollHintRef}
        className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 opacity-0 md:bottom-8"
        aria-hidden
      >
        <span
          className="text-[10px] font-medium uppercase text-[#8f8f8f]"
          style={{
            fontFamily: "var(--font-inter)",
            letterSpacing: "0.28em",
          }}
        >
          Scroll
        </span>
        <svg
          ref={scrollCaretRef}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#8f8f8f"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Brand card — subtle white panel with logo, tagline & CTA ── */}
      <div className="w-full px-6 pb-[160px] pt-[40px] md:px-8 md:pb-[200px] md:pt-[60px] lg:px-[60px]">
        <div className="relative mx-auto w-full max-w-[1520px]">
          <div
            ref={brandCardRef}
            className="relative rounded-[24px] border border-[#E7E7E7] px-6 pb-[100px] pt-[140px] md:px-10 md:pb-[150px] md:pt-[250px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.64) 0%, rgba(235,235,235,0) 100%)",
              boxShadow: "0 19px 116px -24px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex flex-col items-center gap-[60px] md:gap-[118px]">
              <div className="flex flex-col items-center gap-8 py-6 md:py-20">
                <div ref={brandRef} className="w-full max-w-[264px] md:max-w-[472px]">
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
                  className="text-center font-bold leading-[1.32] tracking-[-0.063em]"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "clamp(1.125rem, 1.66vw, 24px)",
                  }}
                >
                  <span style={{ color: "#262626" }}>{copy.tagline_black}</span>{" "}
                  <span style={{ color: "#14545D" }}>{copy.tagline_teal}</span>{" "}
                  <span className="font-black" style={{ color: "#94D80A" }}>
                    {copy.tagline_green}
                  </span>
                </p>
              </div>

              <div ref={ctaRef}>
                <CtaPill
                  href="#lets-chat"
                  label="Let's Talk"
                  pillColor="#FFFFFF"
                  textColor="#14545D"
                  badgeColor="#CFFC68"
                  arrowColor="#14545D"
                  borderColor="rgba(20,84,93,0.16)"
                  shadowColor="#14545D"
                  glowColor="rgba(207,252,104,0.2)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
