"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Editorial table of contents — used by the case study template and the
 * local marketing page. `sticky` renders the desktop sidebar (hidden on
 * mobile); `inline` renders as an inline block (hidden on desktop) for
 * use at the top of the content column.
 */
export function TableOfContents({
  items,
  ctaText = "Want a growth system like this in your business?",
  variant = "sticky",
  ariaLabel = "Page contents",
}: {
  items: TocItem[];
  ctaText?: string;
  variant?: "sticky" | "inline";
  ariaLabel?: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    if (lenis) {
      lenis.scrollTo(target, { offset: -120, duration: 1.2 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const wrapperClass = variant === "inline" ? "lg:hidden" : "hidden lg:block";

  return (
    <nav aria-label={ariaLabel} className={wrapperClass}>
      <div className={variant === "sticky" ? "sticky top-32" : ""}>
        {/* Heading row */}
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          <div
            className="border-b py-3"
            style={{ borderColor: "#d1d1d1" }}
          >
            <h2
              className="text-[18px] font-bold leading-6 tracking-tight"
              style={{ fontFamily: "var(--font-archivo)", color: "#262626" }}
            >
              Table of Contents
            </h2>
          </div>
        </div>

        {/* TOC items */}
        <ul>
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li
                key={item.id}
                className="border-b"
                style={{ borderColor: "#d1d1d1" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="block py-3 transition-colors"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "15px",
                    lineHeight: "22px",
                    color: isActive ? "var(--teal)" : "#262626",
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA block — desktop sticky only */}
        {variant === "sticky" && (
          <div className="pb-4 pr-12 pt-8">
            <p
              className="text-[20px] font-bold leading-[1.2] tracking-tight"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--teal)" }}
            >
              {ctaText}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--teal)",
                color: "#fff",
                boxShadow: "3px 4px 0px 0px var(--lime)",
                lineHeight: "20px",
              }}
            >
              Let&apos;s Chat
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
