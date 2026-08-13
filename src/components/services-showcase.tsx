"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_IDLE_MS = 1500;

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  num: string;
  tab: string;
  heading_accent: string;
  heading_rest: string;
  description: string;
  footer: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    tab: "Intelligence",
    heading_accent: "Attribution Modeling",
    heading_rest: " that tells you where your growth comes from",
    description:
      "Your growth audit and attribution model. We pull data from every platform — GA4, Search Console, Ads, Shopify, Meta, Klaviyo, HubSpot — and build one clear picture of what's driving revenue, and what isn't.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/1.png",
  },
  {
    num: "02",
    tab: "SEO & GEO",
    heading_accent: "SEO & GEO optimization",
    heading_rest: " that builds bridges to you",
    description:
      "In the old days, it was about adding “near me” to the top of your website. Today, our business-tested SEO & GEO models are bleeding-edge: total web and product optimization, customer research, and direct access to our SEO engineers gets you seen exactly where your audience is looking, including through AI.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/2.png",
  },
  {
    num: "03",
    tab: "Digital PR",
    heading_accent: "Digital PR",
    heading_rest: " gets you seen, heard, and linked to",
    description:
      "Elevate your brand. Omni Common employs professional journalists, data scientists, illustrators, spokespeople and more for producing and promoting original data analysis on topical areas in your field. We have an indisputable track record of amplifying brands, getting them recognized and linked to on a national level.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/3.png",
  },
  {
    num: "04",
    tab: "Branded Web Design",
    heading_accent: "Branded Web Design",
    heading_rest: " means design-thinking by professional designers",
    description:
      "Nationally recognized and local businesses alike need good branding. It’s a critical trust signal. Regardless if your branding is fully developed, professionally documented, or even consistent, our in-house design team gets it where it needs to be… or slots in seamlessly with your style guide.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/4.png",
  },
  {
    num: "05",
    tab: "Content Marketing",
    heading_accent: "Content Marketing",
    heading_rest: " for leaving your unique mark",
    description:
      "Call it “blogging”, “vlogging”, or whatever you like. We call it sewing the seeds that get you seen, respected, and loved, even in the furthest outreaches of the marketing funnel. That’s why we have in-house capabilities for producing, writing, developing, and SEO-optimizing fully original content that ranks high in search results, and stands out in a crowd.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/5.png",
  },
  {
    num: "06",
    tab: "Paid Media",
    heading_accent: "Paid Media",
    heading_rest: " is an essential conversion tool we understand",
    description:
      "Wherever there is pay-to-play marketing, there’s a chance to improve conversion rate. It’s one of our specialties. We’ve mastered the art of auditing existing Paid Media campaigns to produce highly-insightful reports with actionable items, and can also create original, high-converting Paid Media across various business categories: ecommerce, B2B, SaaS, and much more.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/6.png",
  },
  {
    num: "07",
    tab: "Emails",
    heading_accent: "Email Flows",
    heading_rest: " that convert, look gorgeous, and leave no customer behind",
    description:
      "Meet your users wherever they’re at, right when they need it, and exactly how they like it. We crunch the numbers to create optimized email flows that get your customers to take action (with zero cut corners on original writing and branding).",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/7.png",
  },
  {
    num: "08",
    tab: "Video & Graphics",
    heading_accent: "Video & Graphics",
    heading_rest: " that bring you to the next level",
    description:
      "Our design team features teammates with a robust set of talents, including top-of-field videography and industry-leading graphic design. We collaborate with your team to perfectly reproduce your design aesthetic, or we can dream it up and make it happen together.",
    footer: "It all works together to get you true, profitable ROI.",
    image: "/images/services/7.png",
  },
];

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isVisible = useInView(sectionRef, { margin: "-20%" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = SERVICES[activeIdx];

  // Auto-advance every 8s, unless paused or offscreen
  useEffect(() => {
    if (isPaused || !isVisible) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SERVICES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isPaused, isVisible]);

  // Reset the countdown whenever the user manually picks a tab
  const selectTab = (i: number) => {
    setActiveIdx(i);
  };

  // Pause when the user is actively moving the mouse inside the section.
  // Resume automatically after 1.5s of no movement so a resting cursor doesn't lock the carousel.
  const handleMouseMove = () => {
    if (!isPaused) setIsPaused(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_AFTER_IDLE_MS);
  };

  const handleMouseLeave = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full scroll-mt-24 px-6 pb-10 pt-24 md:px-8 md:py-32 lg:px-[60px] lg:py-[144px]"
      style={{ backgroundColor: "#ffffff" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto w-full max-w-[1364px]">
       <div className="px-4 md:px-8 lg:px-0">

        {/* Header row */}
        <div
          className="flex flex-col items-start gap-8 pb-2 lg:border-b lg:pb-11"
          style={{ borderColor: "#bbbbbb" }}
        >
          <motion.div
            className="flex flex-col gap-6 lg:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="font-semibold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--teal)",
                fontSize: "12px",
                letterSpacing: "3px",
                lineHeight: "16px",
              }}
            >
              Our Services
            </p>
            <h2
              className="font-bold leading-[1.17] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(2.5rem, 3.4vw, 48px)",
              }}
            >
              <span style={{ color: "var(--foreground)" }}>How Does Omni Common Grow Your Brand?</span>
              <br />
              <span style={{ color: "var(--teal)" }}>By doing whatever it takes.</span>
            </h2>
          </motion.div>

        </div>

        {/* Tabs — horizontally scrollable until desktop, wraps on desktop */}
        <motion.div
          className="mt-8 flex flex-wrap items-start gap-2 pb-6 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {SERVICES.map((s, i) => {
            const isActive = i === activeIdx;
            const isHovered = hoveredIdx === i && !isActive;

            const bg = isActive ? "var(--teal)" : "transparent";
            const border = isActive
              ? "var(--teal)"
              : isHovered
                ? "var(--teal)"
                : "#e0e0dc";
            const textColor = isActive
              ? "#ffffff"
              : isHovered
                ? "var(--teal)"
                : "#3d3d3d";

            return (
              <button
                key={s.num}
                onClick={() => selectTab(i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="inline-flex h-[42px] shrink-0 items-center gap-[15px] rounded-full border px-[21px]"
                style={{
                  backgroundColor: bg,
                  borderColor: border,
                  color: textColor,
                  transition:
                    "background-color 220ms ease, border-color 220ms ease, color 220ms ease",
                }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    lineHeight: "14.29px",
                    opacity: 0.7,
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="whitespace-nowrap font-semibold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  {s.tab}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Content area — swaps on tab change.
            Below lg: stacked. lg → xl: side-by-side with the image capped at
            40% of the grid width so the text column keeps breathing room on
            smaller desktops. xl+: image can grow to 735px. */}
        <div className="mt-10 grid gap-14 md:gap-10 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:items-stretch lg:gap-10 lg:min-h-[560px] xl:grid-cols-[minmax(0,1fr)_minmax(0,735px)] xl:gap-[80px] xl:min-h-[802px] 2xl:gap-[120px]">

          {/* LEFT — heading + description + footer quote */}
          <div className="relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex flex-col gap-6"
              >
                <h3
                  className="font-bold leading-[1] tracking-[-0.02em]"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "clamp(1.75rem, 2.9vw, 40px)",
                  }}
                >
                  <span style={{ color: "var(--teal)" }}>{active.heading_accent}</span>
                  <span style={{ color: "var(--foreground)", fontWeight: 400 }}>
                    {active.heading_rest}
                  </span>
                </h3>
                <p
                  className="leading-[1.62]"
                  style={{
                    fontFamily: "var(--font-encode)",
                    color: "#3d3d3d",
                    fontSize: "18px",
                  }}
                >
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Footer quote — sits at the bottom of the content area on desktop */}
            <p
              className="mt-10 max-w-[340px] self-end text-right font-bold leading-[1.1] tracking-[-0.04em] xl:absolute xl:bottom-0 xl:right-0 xl:mt-0"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#6d6d6d",
                fontSize: "clamp(1.25rem, 1.9vw, 28px)",
              }}
            >
              {active.footer}
            </p>
          </div>

          {/* RIGHT — asymmetric image with floating number badge */}
          <div className="relative shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.num}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "735/803",
                  borderRadius: "40% 12px 45% 12px",
                  backgroundColor: "#e0e0dc",
                }}
              >
                <Image
                  src={active.image}
                  alt={active.tab}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 735px, (min-width: 1024px) 40vw, 100vw"
                  priority={activeIdx === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Number badge — sits inside the image top-left on mobile,
                overflows outside on desktop */}
            <motion.div
              key={`badge-${active.num}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="absolute left-[24px] top-[18px] flex size-[66px] items-center justify-center overflow-hidden rounded-[13px] lg:left-[-30px] lg:top-[14%] lg:size-[88px] lg:rounded-2xl"
              style={{
                backgroundColor: "var(--navy)",
                boxShadow: "0 12px 32px rgba(10,43,71,0.35)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(216deg, rgba(10,43,71,0.51) 8%, rgba(255,255,255,0) 106%)",
                }}
              />
              <span
                className="relative font-black tracking-[-1.3px]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#ffffff",
                  fontSize: "clamp(20px, 2.3vw, 32.7px)",
                  lineHeight: "1",
                }}
              >
                {active.num}
              </span>
            </motion.div>
          </div>
        </div>

       </div>
      </div>
    </section>
  );
}
