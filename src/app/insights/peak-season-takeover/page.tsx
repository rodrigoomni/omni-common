"use client";

import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/magnetic-button";

/* ──────────────────────────────────────────────────────────────────────────────
   Content
   ────────────────────────────────────────────────────────────────────────── */

const HERO = {
  eyebrow: "LET'S CHAT · FOR FREE",
  heading_lead: "Chat About Your Account",
  heading_accent: "Takeover",
  description:
    "See if our service is perfect for you. No pitch deck — we'll review your account and give you real feedback whether we work together or not.",
  timeline: [
    { date: "AUG 17", label: "We take the keys", emphasized: false },
    { date: "SEP–OCT", label: "Rebuild while clicks are cheaper", emphasized: false },
    { date: "NOV 15", label: "Account at full stride", emphasized: false },
    { date: "NOV 27", label: "Black Friday", emphasized: true },
  ],
  form_title: "Reserve your call",
  cta_label: "Let's Get Going",
  contact_email: "ryan@omnicommon.com",
};

const GOAL = {
  eyebrow: "THE GOAL",
  heading_lead: "Focus on your business.",
  heading_accent: "We'll take care of the ad account.",
  description:
    "Work smarter, not harder. We take your account today, rebuilding the signals beneath it and working through the volatile phase early — so your holiday season is pure execution, not panic.",
};

const RUNWAY = {
  eyebrow: "WHAT YOU GET",
  heading: "The 90-day runway.",
  description:
    "Every phase has a purpose — and a lock — so nothing gets touched during peak that shouldn't.",
  phases: [
    {
      weeks: "WEEKS 1–2",
      title: "We take the keys",
      body:
        "Full audit — find wasted spend, search-term gaps, Performance Max cannibalizing your brand terms. Conversion tracking rebuilt. Get a baseline scorecard against last year's Q4.",
    },
    {
      weeks: "WEEKS 3–5",
      title: "Rebuilding & learning",
      body:
        "Campaign restructuring by margin and intent. Bid strategy matched to your actual conversion volume. Match ad copy and messaging — then a change freeze.",
    },
    {
      weeks: "WEEKS 6–9",
      title: "Stabilizing",
      body:
        "Search-term mining, negative build-out, budget moved to what's working. Retargeting audiences built and warm while impressions are still cheap. Weekly reads reported to you.",
    },
    {
      weeks: "WEEKS 10–13",
      title: "Fully optimized for peak",
      body:
        "Q4 promo calendar, promotion extensions and sale annotations live, budget increases set ahead of the ramp, backup creative banked, technical change freeze two weeks out.",
    },
  ],
  cta: { label: "Start right now", href: "#book-intro" },
};

const WHY = {
  eyebrow: "WHY OMNI COMMON",
  heading_lead: "We take over ",
  heading_accent: "inherited accounts",
  heading_tail: " for a living.",
  description:
    "Whether it's corrupted conversion data, destabilized bid strategies, or runaway Performance Max — our marketing professionals fix the signal, stabilize, then scale your ad account. It's our specialty.",
  stats_heading: "Here's what we did for businesses like yours",
  stats: [
    {
      parts: [
        { text: "−" },
        { count: 26.5, decimals: 1 },
        { text: "% CPA" },
      ],
      body: "Cost per acquisition on a full account takeover — with spend down 8.8% and conversions up 35% in 2025.",
    },
    {
      parts: [
        { text: "+" },
        { count: 118, decimals: 0 },
        { text: "% TXN" },
      ],
      body: "Increase in conversions YOY in the first 4 months, at a 21% lower CPA YOY.",
    },
    {
      parts: [
        { text: "$" },
        { count: 117, decimals: 0 },
        { text: " → $" },
        { count: 92, decimals: 0 },
      ],
      body: "CPA falling as volume rose — 227 to 496 monthly conversions, beating plan four months running.",
    },
  ] as {
    parts: ({ text: string } | { count: number; decimals: number })[];
    body: string;
  }[],
};

const PRICING = {
  eyebrow: "INVESTMENT",
  heading: "Select the package you need — built for true ROI.",
  cards: [
    {
      tag: "PAID SEARCH TAKEOVER",
      strike: "$2,995",
      price: "$990",
      priceSuffix: "",
      body:
        "Month one — takeover & rebuild. Full audit, tracking rebuild, and account restructure. Management included, never billed on top.",
      recurring: "$999",
      recurringNote:
        "Month two onward, through December 31. Goes to $1,995/mo on January 1 — only after you've seen your Q4 numbers.",
      highlight: true,
    },
    {
      tag: "ADD-ON · META TAKEOVER",
      strike: "$2,995",
      price: "$990",
      priceSuffix: "",
      body:
        "The same professional optimization ROI, now for Meta accounts. We restructure, rebuild signal with the Conversions API, and optimize existing creative.",
      recurring: "$999",
      recurringNote:
        "Month two onward, through December 31. Goes to $1,995/mo on January 1 — only after you've seen your Q4 numbers.",
      highlight: false,
    },
  ],
};

const TERMS = {
  eyebrow: "AD ACCOUNT TERMS",
  items: [
    {
      parts: [{ text: "$" }, { count: 5, decimals: 0 }, { text: "K+/mo" }],
      label: "minimum ad spend",
    },
    {
      parts: [{ count: 90, decimals: 0 }, { text: " days" }],
      label: "full term — no opt-out",
    },
    {
      parts: [{ count: 10, decimals: 0 }, { text: " spots" }],
      label: "total client capacity",
    },
    {
      parts: [{ text: "Aug " }, { count: 31, decimals: 0 }],
      label: "enrollment closes",
    },
  ] as {
    parts: ({ text: string } | { count: number; decimals: number })[];
    label: string;
  }[],
};

/* ──────────────────────────────────────────────────────────────────────────────
   Utilities
   ────────────────────────────────────────────────────────────────────────── */

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function trackLead(source: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      form_name: "peak-season-lead",
      campaign: "peak-season-takeover",
      source,
    });
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   Icons
   ────────────────────────────────────────────────────────────────────────── */

function Check({ color = "var(--teal)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12L10 18L20 6" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default function PeakSeasonTakeoverPage() {
  return (
    <main>
      <Hero />
      {/* Spacer to account for the fixed hero */}
      <div className="h-screen" />
      {/* Content layer scrolls over the fixed hero */}
      <div className="relative z-10">
        <GoalSection />
        <RunwaySection />
        <WhySection />
        <PricingSection />
        <TermsSection />
        <Footer
          theme="green"
          hideLocalNote
          hideWebsiteLink
          formName="peak-season-lead"
          formSource="footer"
          content={{
            eyebrow: "Want to see your growth model?",
            heading: "Let's Chat!",
            heading_accent: " (For Free!)",
            heading_accent_scale: 0.7,
            heading_accent_block: true,
            description_html:
              "Book a <strong>FREE 20-minute intro call</strong> to see if our service is perfect for you.",
            cta_button: "Book Free 20-Minute Call",
          }}
        />
      </div>
    </main>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */

type ShapeConfig = {
  src: string;
  widthClamp: string;
  align: "left" | "right";
  edgeOffset: number;
  bottomInsetRatio: number;
  collisionRadiusRatio?: number;
  spawnDelay?: number;
};

const HERO_SHAPES: ShapeConfig[] = [
  {
    src: "/images/peak-season/shape-wedge.svg",
    widthClamp: "clamp(260px, 24vw, 400px)",
    align: "right",
    edgeOffset: 40,
    bottomInsetRatio: 0.05,
    collisionRadiusRatio: 0.4,
  },
  {
    src: "/images/peak-season/shape-circles.svg",
    widthClamp: "clamp(160px, 14vw, 240px)",
    align: "left",
    edgeOffset: 60,
    bottomInsetRatio: 0.06,
    collisionRadiusRatio: 0.42,
    spawnDelay: 180,
  },
];

function PhysicsShapes({ shapes }: { shapes: ShapeConfig[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Physics constants — matched to home-hero (ConfettiSimple)
    const gravity = 0.15;
    const airResistance = 0.992;
    const groundFriction = 0.85;
    const wallBounce = 0.3;
    const floorOffset = 0;
    const settleThreshold = 0.3;
    const throwMultiplier = 1.8;
    const restitution = 0.4;

    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    type ShapeState = {
      cfg: ShapeConfig;
      el: HTMLImageElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      settled: boolean;
      initialized: boolean;
      dragging: boolean;
      dragOffsetX: number;
      dragOffsetY: number;
      prevMx: number;
      prevMy: number;
      throwVx: number;
      throwVy: number;
    };

    const states: ShapeState[] = [];
    shapes.forEach((cfg, i) => {
      const el = imageRefs.current[i];
      if (!el) return;
      states.push({
        cfg,
        el,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotation: 0,
        rotationSpeed: 0,
        settled: true,
        initialized: false,
        dragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
        prevMx: 0,
        prevMy: 0,
        throwVx: 0,
        throwVy: 0,
      });
    });

    const applyTransform = (s: ShapeState) => {
      s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotation}rad)`;
    };

    const spawn = (s: ShapeState, retries = 0) => {
      const rect = wrapper.getBoundingClientRect();
      const sw = s.el.offsetWidth;
      const sh = s.el.offsetHeight;
      if (!sw || !sh || rect.width === 0) {
        if (retries < 30) {
          requestAnimationFrame(() => spawn(s, retries + 1));
        }
        return;
      }
      s.x =
        s.cfg.align === "right"
          ? rect.width - sw - s.cfg.edgeOffset
          : s.cfg.edgeOffset;
      s.y = -sh - 40;
      s.vx = (Math.random() - 0.5) * 2;
      s.vy = Math.random() * 1.5 + 0.5;
      s.rotation = (Math.random() - 0.5) * 0.4;
      s.rotationSpeed = (Math.random() - 0.5) * 0.02;
      s.settled = false;
      s.initialized = true;
      applyTransform(s);
    };

    const spawnTimers: number[] = [];
    states.forEach((s) => {
      const kick = () => {
        const delay = s.cfg.spawnDelay ?? 0;
        if (delay > 0) {
          spawnTimers.push(window.setTimeout(() => spawn(s), delay));
        } else {
          spawn(s);
        }
      };
      if (s.el.complete && s.el.naturalWidth > 0) kick();
      else s.el.addEventListener("load", kick, { once: true });
    });

    // Circle-approximation collision resolution (mirrors ConfettiSimple)
    const resolveCollisions = (w: number, h: number, scrollV: number) => {
      for (let i = 0; i < states.length; i++) {
        for (let j = i + 1; j < states.length; j++) {
          const a = states[i];
          const b = states[j];
          if (!a.initialized || !b.initialized) continue;
          const aw = a.el.offsetWidth;
          const ah = a.el.offsetHeight;
          const bw = b.el.offsetWidth;
          const bh = b.el.offsetHeight;
          const ar = aw * (a.cfg.collisionRadiusRatio ?? 0.4);
          const br = bw * (b.cfg.collisionRadiusRatio ?? 0.4);
          const acx = a.x + aw / 2;
          const acy = a.y + ah / 2;
          const bcx = b.x + bw / 2;
          const bcy = b.y + bh / 2;
          const dx = bcx - acx;
          const dy = bcy - acy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ar + br;
          if (dist >= minDist || dist <= 0.01) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (minDist - dist) / 2;

          if (a.dragging) {
            b.x += nx * overlap * 2;
            b.y += ny * overlap * 2;
          } else if (b.dragging) {
            a.x -= nx * overlap * 2;
            a.y -= ny * overlap * 2;
          } else {
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
          }

          const dvx = a.vx - b.vx;
          const dvy = a.vy - b.vy;
          const dvDotN = dvx * nx + dvy * ny;

          if (dvDotN > 0) {
            const impulse = dvDotN * restitution;
            if (!a.dragging) {
              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              a.settled = false;
            }
            if (!b.dragging) {
              b.vx += impulse * nx;
              b.vy += impulse * ny;
              b.settled = false;
            }
            const tx = -ny;
            const tangentV = dvx * tx + dvy * (-nx);
            if (!a.dragging) a.rotationSpeed += tangentV * 0.002;
            if (!b.dragging) b.rotationSpeed -= tangentV * 0.002;
          }

          // Post-collision floor/wall clamp (floor rises with page scroll)
          for (const s of [a, b]) {
            const sw = s.el.offsetWidth;
            const sh = s.el.offsetHeight;
            const effSh = sh * (1 - s.cfg.bottomInsetRatio);
            const floor = h - floorOffset - effSh - scrollY;
            if (s.x < 0) {
              s.x = 0;
              if (s.vx < 0) s.vx = -s.vx * wallBounce;
            }
            if (s.x + sw > w) {
              s.x = w - sw;
              if (s.vx > 0) s.vx = -s.vx * wallBounce;
            }
            if (s.y > floor) {
              s.y = floor;
              if (scrollV > 0 && !s.dragging) {
                const randomBounce = 0.6 + Math.random() * 1.2;
                s.vy = -scrollV * 0.4 * randomBounce;
                s.vx += (Math.random() - 0.5) * scrollV * 0.25;
                s.rotationSpeed += (Math.random() - 0.5) * 0.06;
                s.settled = false;
              } else if (s.vy > 0) {
                s.vy = -s.vy * (0.45 + Math.random() * 0.3);
                s.vx *= groundFriction;
              }
            }
          }
        }
      }
    };

    let animId = 0;
    const animate = () => {
      const rect = wrapper.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const scrollV = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Position update pass — floor rises with page scroll
      for (const s of states) {
        if (!s.initialized) continue;
        const sw = s.el.offsetWidth;
        const sh = s.el.offsetHeight;
        const effSh = sh * (1 - s.cfg.bottomInsetRatio);
        const floor = h - floorOffset - effSh - scrollY;

        if (!s.dragging && !s.settled) {
          s.vy += gravity;
          s.vx *= airResistance;
          s.vy *= airResistance;
          s.x += s.vx;
          s.y += s.vy;

          if (s.y > floor) {
            s.y = floor;

            if (scrollV > 0) {
              // Scroll-bounce — rising floor kicks the shape
              const randomBounce = 0.6 + Math.random() * 1.2;
              s.vy = -scrollV * 0.4 * randomBounce;
              s.vx += (Math.random() - 0.5) * scrollV * 0.25;
              s.rotationSpeed += (Math.random() - 0.5) * 0.06;
              s.settled = false;
            } else if (s.vy > 0) {
              const bounce = 0.45 + Math.random() * 0.3;
              s.vy = -s.vy * bounce;
              s.vx *= groundFriction;
              s.rotationSpeed = s.vx * 0.003;
            }

            if (
              scrollV <= 0 &&
              Math.abs(s.vy) < settleThreshold &&
              Math.abs(s.vx) < settleThreshold
            ) {
              s.settled = true;
              s.vx = 0;
              s.vy = 0;
              s.rotationSpeed = 0;
            } else {
              s.settled = false;
            }
          }
          if (s.x < 0) {
            s.x = 0;
            if (s.vx < 0) s.vx = -s.vx * wallBounce;
          }
          if (s.x + sw > w) {
            s.x = w - sw;
            if (s.vx > 0) s.vx = -s.vx * wallBounce;
          }

          s.rotation += s.rotationSpeed;
          s.rotationSpeed *= 0.96;
          if (s.rotationSpeed > 0.04) s.rotationSpeed = 0.04;
          if (s.rotationSpeed < -0.04) s.rotationSpeed = -0.04;
        } else if (s.settled) {
          // If the floor rises under a settled shape, ride it and kick when scrolling down
          if (s.y > floor) {
            s.y = floor;
            if (scrollV > 0) {
              s.settled = false;
              const randomBounce = 0.6 + Math.random() * 1.2;
              s.vy = -scrollV * 0.4 * randomBounce;
              s.vx += (Math.random() - 0.5) * scrollV * 0.25;
              s.rotationSpeed += (Math.random() - 0.5) * 0.06;
            }
          }
        }

        if (s.dragging) {
          if (s.x < 0) s.x = 0;
          if (s.x + sw > w) s.x = w - sw;
          if (s.y > floor) s.y = floor;
        }
      }

      // Collision resolution pass
      resolveCollisions(w, h, scrollV);

      // Apply transforms
      for (const s of states) {
        if (!s.initialized) continue;
        applyTransform(s);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const getPos = (clientX: number, clientY: number) => {
      const rect = wrapper.getBoundingClientRect();
      return { mx: clientX - rect.left, my: clientY - rect.top };
    };

    const findHit = (mx: number, my: number): ShapeState | null => {
      // Prefer topmost (last drawn), which is the last in states array
      for (let i = states.length - 1; i >= 0; i--) {
        const s = states[i];
        if (!s.initialized) continue;
        if (
          mx >= s.x &&
          mx <= s.x + s.el.offsetWidth &&
          my >= s.y &&
          my <= s.y + s.el.offsetHeight
        ) {
          return s;
        }
      }
      return null;
    };

    const beginDrag = (s: ShapeState, mx: number, my: number) => {
      s.dragging = true;
      s.settled = false;
      s.dragOffsetX = mx - s.x;
      s.dragOffsetY = my - s.y;
      s.prevMx = mx;
      s.prevMy = my;
      s.throwVx = 0;
      s.throwVy = 0;
      s.vx = 0;
      s.vy = 0;
      s.el.style.cursor = "grabbing";
    };

    const updateDrag = (s: ShapeState, mx: number, my: number) => {
      s.x = mx - s.dragOffsetX;
      s.y = my - s.dragOffsetY;
      s.throwVx = s.throwVx * 0.6 + (mx - s.prevMx) * 0.4;
      s.throwVy = s.throwVy * 0.6 + (my - s.prevMy) * 0.4;
      s.prevMx = mx;
      s.prevMy = my;
    };

    const endDrag = (s: ShapeState) => {
      s.dragging = false;
      s.vx = s.throwVx * throwMultiplier;
      s.vy = s.throwVy * throwMultiplier;
      s.settled = false;
      s.el.style.cursor = "grab";
    };

    let activeDrag: ShapeState | null = null;

    const onMouseDown = (e: MouseEvent) => {
      const { mx, my } = getPos(e.clientX, e.clientY);
      const hit = findHit(mx, my);
      if (!hit) return;
      activeDrag = hit;
      beginDrag(hit, mx, my);
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!activeDrag) return;
      const { mx, my } = getPos(e.clientX, e.clientY);
      updateDrag(activeDrag, mx, my);
    };
    const onMouseUp = () => {
      if (!activeDrag) return;
      endDrag(activeDrag);
      activeDrag = null;
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      const { mx, my } = getPos(t.clientX, t.clientY);
      const hit = findHit(mx, my);
      if (!hit) return;
      e.preventDefault();
      activeDrag = hit;
      beginDrag(hit, mx, my);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!activeDrag) return;
      e.preventDefault();
      const t = e.touches[0];
      const { mx, my } = getPos(t.clientX, t.clientY);
      updateDrag(activeDrag, mx, my);
    };
    const onTouchEnd = () => {
      if (!activeDrag) return;
      endDrag(activeDrag);
      activeDrag = null;
    };

    wrapper.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    wrapper.addEventListener("touchstart", onTouchStart, { passive: false });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
    wrapper.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      const rect = wrapper.getBoundingClientRect();
      for (const s of states) {
        if (!s.initialized) continue;
        const sw = s.el.offsetWidth;
        const sh = s.el.offsetHeight;
        if (s.x + sw > rect.width) s.x = rect.width - sw;
        if (s.x < 0) s.x = 0;
        const effSh = sh * (1 - s.cfg.bottomInsetRatio);
        if (s.y + effSh > rect.height - floorOffset - scrollY) {
          s.y = rect.height - floorOffset - effSh - scrollY;
        }
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      spawnTimers.forEach((t) => window.clearTimeout(t));
      wrapper.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shapes]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
      style={{ zIndex: 1 }}
    >
      {shapes.map((s, i) => (
        <img
          key={i}
          ref={(el) => {
            imageRefs.current[i] = el;
          }}
          src={s.src}
          alt=""
          draggable={false}
          className="pointer-events-auto absolute left-0 top-0 select-none"
          style={{
            width: s.widthClamp,
            height: "auto",
            cursor: "grab",
            touchAction: "none",
            willChange: "transform",
            transform: "translate3d(-9999px, -9999px, 0)",
          }}
        />
      ))}
    </div>
  );
}

function SpotsLeftNote() {
  const [spots, setSpots] = useState(10);
  useEffect(() => {
    if (spots <= 2) return;
    const id = window.setTimeout(() => setSpots((s) => s - 1), 5 * 60 * 1000);
    return () => window.clearTimeout(id);
  }, [spots]);
  return (
    <span>
      <span className="tabular-nums">{spots}</span> spots left
    </span>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <section
      id="book-intro"
      data-theme="dark"
      className="fixed inset-0 flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-28 pb-16 md:pt-32"
      style={{
        backgroundColor: "#0A2B47",
        backgroundImage: "url('/images/peak-season-hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}
    >
      <PhysicsShapes shapes={HERO_SHAPES} />

      <motion.div
        className="site-container relative z-10 w-full px-6 md:px-12 lg:px-24"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Two-column layout: headline / stack */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          {/* LEFT — headline */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="mb-6 text-[11px] font-semibold uppercase lg:mb-8"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#CFFC68",
                letterSpacing: "0.24em",
              }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {HERO.eyebrow}
            </motion.p>
            <motion.h1
              className="font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#FFFDEF",
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.75rem, 6.2vw, 6.25rem)",
                lineHeight: 0.96,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {HERO.heading_lead}
              <br aria-hidden />
              <span style={{ color: "#CFFC68" }}>{HERO.heading_accent}</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[46ch] text-lg leading-[1.55] md:text-xl md:leading-[1.5]"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,253,239,0.85)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
            >
              {HERO.description}
            </motion.p>
          </div>

          {/* RIGHT — polished stack: compact countdown + 2-field form */}
          <motion.aside
            className="relative flex flex-col overflow-hidden rounded-3xl"
            style={{
              backgroundColor: "rgba(255,253,239,0.04)",
              border: "1px solid rgba(255,253,239,0.12)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Form */}
            <div className="px-6 pt-6 pb-6 md:px-7 md:pt-7 md:pb-7">
              <div
                className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#A5FDF3",
                  letterSpacing: "0.2em",
                }}
              >
                <span className="inline-block h-1 w-1 rounded-full bg-[#A5FDF3]" />
                {HERO.form_title}
              </div>
              <HeroForm />
              <div
                className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px]"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(255,253,239,0.6)",
                }}
              >
                <span>
                  <SpotsLeftNote /> · Aug 31 enrollment closes
                </span>
                <a
                  href={`mailto:${HERO.contact_email}?subject=Peak%20Season%20Takeover`}
                  className="font-semibold no-underline transition-opacity hover:opacity-80"
                  style={{ color: "#CFFC68" }}
                >
                  {HERO.contact_email}
                </a>
              </div>
            </div>

            {/* Countdown */}
            <div className="border-t px-6 pt-6 pb-6 md:px-7 md:pt-7 md:pb-7" style={{ borderColor: "rgba(255,253,239,0.1)" }}>
              <div
                className="mb-4 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#A5FDF3",
                  letterSpacing: "0.2em",
                }}
              >
                THE COUNTDOWN
              </div>
              <ul className="relative flex flex-col gap-4">
                {/* Vertical thread */}
                <span
                  aria-hidden="true"
                  className="absolute left-[23px] top-[24px] bottom-[24px] w-px"
                  style={{ backgroundColor: "#A5FDF3" }}
                />
                {HERO.timeline.map((step, i) => (
                  <motion.li
                    key={step.date}
                    className="relative flex items-start gap-3.5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.32 + i * 0.06 }}
                  >
                    <span className="relative z-10 block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/countdown/0${i + 1}.png`}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div
                        className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: step.emphasized ? "#A5FDF3" : "#FFFDEF",
                        }}
                      >
                        {step.date}
                      </div>
                      <div
                        className="mt-0.5 text-sm leading-snug"
                        style={{
                          fontFamily: "var(--font-encode)",
                          color: "rgba(255,253,239,0.9)",
                        }}
                      >
                        {step.label}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}

/* ── HERO FORM (2 fields) ─────────────────────────────────────────────────── */

function HeroForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!name.trim() || !email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": "peak-season-lead",
          "bot-field": botField,
          name,
          email,
          source: "hero",
        }),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      setStatus("success");
      trackLead("hero");
    } catch (err) {
      console.error("Hero lead form error", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-xl p-4 text-sm"
        style={{
          fontFamily: "var(--font-encode)",
          backgroundColor: "rgba(207,252,104,0.14)",
          color: "#CFFC68",
          border: "1px solid rgba(207,252,104,0.3)",
        }}
      >
        Got it — we&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <form
      name="peak-season-lead"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="form-name" value="peak-season-lead" />
      <input type="hidden" name="source" value="hero" />
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out:
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </label>
      </p>

      <HeroInput
        id="hero-name"
        name="name"
        placeholder="Full name"
        value={name}
        onChange={setName}
        autoComplete="name"
        required
      />
      <HeroInput
        id="hero-email"
        name="email"
        type="email"
        placeholder="you@brand.com"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative mt-1 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        style={{
          fontFamily: "var(--font-inter)",
          backgroundColor: "#CFFC68",
          color: "#0A2B47",
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 24px rgba(207,252,104,0.55), 0 0 48px rgba(207,252,104,0.25)",
          }}
        />
        <span className="relative">
          {status === "submitting" ? "Sending…" : HERO.cta_label}
        </span>
        <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">
          <Arrow />
        </span>
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="text-xs"
          style={{ fontFamily: "var(--font-encode)", color: "#FF8FA3" }}
        >
          Please enter your name and email.
        </p>
      )}
    </form>
  );
}

function HeroInput({
  id,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      autoComplete={autoComplete}
      className="w-full rounded-lg border px-4 py-3 text-[15px] transition focus:outline-none"
      style={{
        fontFamily: "var(--font-encode)",
        color: "#FFFDEF",
        backgroundColor: "rgba(255,253,239,0.06)",
        borderColor: "rgba(255,253,239,0.18)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#CFFC68";
        e.currentTarget.style.backgroundColor = "rgba(255,253,239,0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,253,239,0.18)";
        e.currentTarget.style.backgroundColor = "rgba(255,253,239,0.06)";
      }}
    />
  );
}

/* ── GOAL ─────────────────────────────────────────────────────────────────── */

function GoalSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFDEF",
        backgroundImage:
          "radial-gradient(70% 60% at 100% 0%, rgba(207,252,104,0.14) 0%, rgba(207,252,104,0) 65%)",
      }}
    >
      {/* Decorative overlapping rings — top-right corner, partially off-canvas.
          Three breakpoints: mobile (small), tablet (much smaller / pushed off),
          desktop (medium, corner-relegated). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60px] -right-[60px] h-[138px] w-[240px] md:-top-[70px] md:-right-[100px] md:h-[115px] md:w-[200px] lg:-top-[56px] lg:-right-[90px] lg:h-[241px] lg:w-[420px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/peak-season-shapes.png"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-[820px] text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {GOAL.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2.25rem, 3.4vw, 2.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {GOAL.heading_lead}{" "}
            <br className="hidden md:inline" aria-hidden />
            <span style={{ color: "#14545D" }}>{GOAL.heading_accent}</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-[62ch] text-base leading-[1.65] md:text-lg md:leading-[1.6]"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-secondary)",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {GOAL.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── 90-DAY RUNWAY ────────────────────────────────────────────────────────── */

function RunwaySection() {
  return (
    <section
      id="the-runway"
      className="relative py-4"
      style={{
        background: "linear-gradient(to bottom, #FFFDEF 0%, #FFFFFF 100%)",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="max-w-[720px] lg:max-w-none">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {RUNWAY.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2.5rem, 5.4vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            The{" "}
            <span
              className="inline-block"
              style={{
                backgroundColor: "#CFFC68",
                color: "#14545D",
                padding: "0 0.18em",
                borderRadius: "0.12em",
                lineHeight: 1.05,
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              90-day
            </span>{" "}
            runway.
          </motion.h2>
          <motion.p
            className="mt-4 max-w-[58ch] text-base leading-[1.6] md:text-lg lg:max-w-none lg:whitespace-nowrap"
            style={{
              fontFamily: "var(--font-encode)",
              color: "var(--foreground-secondary)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {RUNWAY.description}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {RUNWAY.phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl p-6 md:p-7"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.06)",
                boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--teal)",
                    letterSpacing: "0.22em",
                  }}
                >
                  {phase.weeks}
                </span>
                <span
                  className="font-bold text-[color:rgba(10,43,71,0.15)] transition-colors duration-300 group-hover:text-[#CFFC68]"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="mt-3 text-2xl font-bold md:text-[26px]"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#0A2B47",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {phase.title}
              </h3>
              <p
                className="mt-3 text-[15px] leading-[1.6]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-secondary)",
                }}
              >
                {phase.body}
              </p>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{
                  backgroundImage: "linear-gradient(90deg, #CFFC68 0%, #A5FDF3 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MagneticButton strength={0.15}>
            <Link
              href={RUNWAY.cta.href}
              className="cta-manic relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#FFFDEF",
                boxShadow: "5px 6px 0px 0px #CFFC68",
              }}
            >
              <span className="relative">{RUNWAY.cta.label}</span>
              <Arrow />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ── WHY OMNI COMMON ──────────────────────────────────────────────────────── */

function AnimatedNumber({
  to,
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
    </span>
  );
}

function WhySection() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A2B47" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(50% 60% at 80% 20%, rgba(207,252,104,0.08) 0%, rgba(207,252,104,0) 60%)",
            "radial-gradient(45% 55% at 15% 80%, rgba(165,253,243,0.08) 0%, rgba(165,253,243,0) 60%)",
          ].join(", "),
        }}
      />

      <div className="site-container relative px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-[720px]">
            <motion.p
              className="text-[11px] font-semibold uppercase"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#CFFC68",
                letterSpacing: "0.28em",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
            >
              {WHY.eyebrow}
            </motion.p>
            <motion.h2
              className="mt-4 font-bold"
              style={{
                fontFamily: "var(--font-archivo)",
                color: "#FFFDEF",
                fontSize: "clamp(2.5rem, 5.4vw, 4.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9 }}
            >
              {WHY.heading_lead}
              <span style={{ color: "#CFFC68" }}>{WHY.heading_accent}</span>
              {WHY.heading_tail}
            </motion.h2>
            <motion.p
              className="mt-4 text-base leading-[1.6] md:text-lg"
              style={{
                fontFamily: "var(--font-encode)",
                color: "rgba(255,253,239,0.8)",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              {WHY.description}
            </motion.p>
          </div>
          <motion.div
            className="lg:mt-2 lg:shrink-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#FFFDEF",
                borderColor: "rgba(255,253,239,0.35)",
                backgroundColor: "rgba(255,253,239,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#CFFC68";
                e.currentTarget.style.color = "#CFFC68";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,253,239,0.35)";
                e.currentTarget.style.color = "#FFFDEF";
              }}
            >
              See our case studies
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <Arrow />
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.h3
          className="mt-16 text-lg font-semibold"
          style={{
            fontFamily: "var(--font-archivo)",
            color: "rgba(165,253,243,0.9)",
            letterSpacing: "-0.01em",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
        >
          {WHY.stats_heading}
        </motion.h3>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {WHY.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col rounded-2xl p-7 md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,253,239,0.1)",
                backdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#A5FDF3",
                  fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.parts.map((part, j) =>
                  "text" in part ? (
                    <span key={j}>{part.text}</span>
                  ) : (
                    <AnimatedNumber
                      key={j}
                      to={part.count}
                      decimals={part.decimals}
                    />
                  )
                )}
              </div>
              <p
                className="mt-5 text-sm leading-[1.55] md:text-[15px]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "rgba(255,253,239,0.85)",
                }}
              >
                {stat.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ──────────────────────────────────────────────────────────────── */

function PricingSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFDEF",
        backgroundImage: "url('/images/peak-season/pricing-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="site-container px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-[820px] text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {PRICING.eyebrow}
          </motion.p>
          <motion.h2
            className="mt-4 font-bold"
            style={{
              fontFamily: "var(--font-archivo)",
              color: "#0A2B47",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9 }}
          >
            {PRICING.heading}
          </motion.h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1000px] gap-6 md:grid-cols-2">
          {PRICING.cards.map((card, i) => (
            <motion.div
              key={card.tag}
              className="relative flex flex-col rounded-2xl p-7 md:p-8"
              style={{
                backgroundColor: card.highlight ? "#CFFC68" : "#FFFFFF",
                border: card.highlight ? "1px solid #B8E85A" : "1px solid #FCEA8A",
                boxShadow: card.highlight
                  ? "0 20px 40px rgba(207,252,104,0.35)"
                  : "0 8px 24px rgba(15,23,42,0.06)",
                transformPerspective: 1000,
              }}
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.9,
                rotate: i % 2 === 0 ? -3 : 3,
              }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 1,
                delay: 0.15 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.015,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {card.highlight && (
                <div
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "#0A2B47",
                    color: "#CFFC68",
                    letterSpacing: "0.2em",
                  }}
                >
                  Core offer
                </div>
              )}
              <div
                className="text-[10px] font-bold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: card.highlight ? "#0A2B47" : "var(--teal)",
                  letterSpacing: "0.2em",
                }}
              >
                {card.tag}
              </div>

              {/* Month one price */}
              <div className="mt-5 flex items-baseline gap-3">
                {card.strike && (
                  <span
                    className="text-lg line-through"
                    style={{
                      fontFamily: "var(--font-archivo)",
                      color: card.highlight ? "#3E5710" : "#8A8A8A",
                    }}
                  >
                    {card.strike}
                  </span>
                )}
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "#0A2B47",
                    fontSize: "clamp(2.5rem, 4vw, 3.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {card.price}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                  }}
                >
                  month one
                </span>
              </div>
              <p
                className="mt-3 text-[14.5px] leading-[1.55]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                }}
              >
                {card.body}
              </p>

              {/* Divider */}
              <div
                className="my-5 h-px"
                style={{
                  backgroundColor: card.highlight ? "rgba(10,43,71,0.15)" : "rgba(10,43,71,0.08)",
                }}
              />

              {/* Ongoing */}
              <div className="flex items-baseline gap-2">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "#0A2B47",
                    fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.recurring}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: card.highlight ? "#0A2B47" : "var(--foreground-secondary)",
                  }}
                >
                  /mo · month two onward
                </span>
              </div>
              <p
                className="mt-2 text-[13.5px] leading-[1.55]"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: card.highlight ? "rgba(10,43,71,0.85)" : "var(--foreground-muted)",
                }}
              >
                {card.recurringNote}
              </p>

              {/* Card CTA */}
              <Link
                href="#book-intro"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: card.highlight ? "#0A2B47" : "var(--teal)",
                  color: card.highlight ? "#CFFC68" : "#FFFDEF",
                  boxShadow: card.highlight
                    ? "4px 4px 0px 0px rgba(10,43,71,0.15)"
                    : "4px 4px 0px 0px #CFFC68",
                }}
              >
                Book my call
                <Arrow />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TERMS ────────────────────────────────────────────────────────────────── */

function TermsSection() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="site-container px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto max-w-[820px] text-center">
          <motion.p
            className="text-[11px] font-semibold uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--teal)",
              letterSpacing: "0.28em",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            {TERMS.eyebrow}
          </motion.p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-12 md:grid-cols-4">
          {TERMS.items.map((item, i) => (
            <motion.div
              key={item.label}
              className={
                "text-center " +
                (i < TERMS.items.length - 1 ? "md:border-r" : "")
              }
              style={{ borderColor: "rgba(15,23,42,0.08)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "#0A2B47",
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.parts.map((part, j) =>
                  "text" in part ? (
                    <span key={j}>{part.text}</span>
                  ) : (
                    <AnimatedNumber
                      key={j}
                      to={part.count}
                      decimals={part.decimals}
                    />
                  )
                )}
              </div>
              <div
                className="mt-2 text-[11px] font-semibold uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--foreground-muted)",
                  letterSpacing: "0.14em",
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

