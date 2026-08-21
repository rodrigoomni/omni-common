"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { caseStudies } from "@/data/case-studies";

type Section = {
  title: string;
  links: { href: string; label: string }[];
};

const sections: Section[] = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/about/team", label: "Team" },
      { href: "/work", label: "Case Studies" },
    ],
  },
  {
    title: "Case Studies",
    links: caseStudies.map((s) => ({
      href: `/work/${s.slug}`,
      label: s.title,
    })),
  },
  {
    title: "Insights",
    links: [
      { href: "/insights/local-marketing", label: "Local Marketing" },
      { href: "/insights/peak-season-takeover", label: "Peak Season Takeover" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <main
        className="relative min-h-screen overflow-hidden pt-32 md:pt-40"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="site-container px-6 pb-24 md:px-8 md:pb-32 lg:px-[60px]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
            >
              Sitemap
            </p>
            <h1
              className="mt-3 text-5xl font-bold leading-[1] tracking-tighter md:text-6xl lg:text-[72px]"
              style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
            >
              Everything, in one place<span style={{ color: "var(--teal)" }}>.</span>
            </h1>
            <p
              className="mt-6 max-w-xl text-base leading-[1.5]"
              style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}
            >
              A quick index of every page on omnicommon.com.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
                >
                  {section.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-lg font-semibold transition-opacity hover:opacity-70"
                        style={{
                          fontFamily: "var(--font-archivo)",
                          color: "var(--foreground)",
                        }}
                      >
                        <span>{link.label}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          <path d="M5 12h14" />
                          <path d="M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
