"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { MagneticButton } from "./magnetic-button";
import global from "@/content/global.json";

const { nav } = global;

const links: {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}[] = [
  { href: "/", label: nav.home_label },
  {
    href: "/services",
    label: nav.services_label,
    children: [
      { href: "/services", label: "All Services" },
      { href: "/insights/local-marketing", label: nav.services_submenu.local_marketing },
    ],
  },
  { href: "/work", label: nav.work_label },
  {
    href: "/about",
    label: nav.about_label,
    children: [
      { href: "/work", label: nav.about_submenu.clients },
      { href: "/about/team", label: nav.about_submenu.team },
    ],
  },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [bgTheme, setBgTheme] = useState<"navy" | "teal" | "light">(pathname === "/" ? "navy" : "light");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);

    if (typeof window !== "undefined") {
      const elements = document.elementsFromPoint(window.innerWidth / 2, 30);
      const targetElement = elements.find(el => !el.closest('header'));

      if (targetElement) {
        const tealEl = targetElement.closest('[data-theme="dark-teal"]');
        const darkEl = targetElement.closest('[data-theme="dark"]');

        if (tealEl) {
          setBgTheme("teal");
        } else if (darkEl) {
          setBgTheme("navy");
        } else {
          setBgTheme("light");
        }
      } else {
        setBgTheme("light");
      }
    }
  });

  const isHomepage = pathname === "/";
  const isHero = isHomepage && !scrolled;
  const isDark = isHomepage && isHero ? true : bgTheme !== "light";

  const handleHover = (idx: number, e: React.MouseEvent<HTMLElement>) => {
    setHoveredIdx(idx);
    const el = e.currentTarget;
    const nav = navRef.current;
    if (el && nav) {
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    }
  };

  const openDropdown = (idx: number) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdownIdx(idx);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdownIdx(null), 150);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 z-[100] w-full transition-all duration-500 ease-out"
      style={{
        backgroundColor: isHero
          ? "transparent"
          : bgTheme === "teal"
            ? "rgba(20,84,93,0.97)"
            : bgTheme === "navy"
              ? "rgba(10,43,71,0.98)"
              : "rgba(255,255,255,0.98)",
        borderBottom: isHero
          ? "1px solid transparent"
          : isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <nav
        className="site-container flex items-center justify-between px-8 md:px-12 transition-all duration-500 ease-out"
        style={{
          paddingTop: isHero ? "20px" : "12px",
          paddingBottom: isHero ? "20px" : "12px",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-500"
            style={{ width: isHero ? "30px" : "26px", height: isHero ? "30px" : "26px" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect width="82" height="82" fill="transparent" rx="12" />
            <g clipPath="url(#navClip)">
              <path d="M43.7812 53.9677C44.685 55.6903 45.7605 57.2774 46.9889 58.7226H46.9825C46.5115 59.2903 46.0088 59.8323 45.4932 60.3419C40.7709 65.0774 34.292 68 27.1384 68C12.7231 68 1 56.1097 1 41.4968C1 26.8839 12.7231 15 27.1384 15C34.292 15 40.7709 17.9226 45.4932 22.6581H45.4996C46.0151 23.1742 46.5115 23.7097 46.9825 24.271H46.9889C43.6221 28.271 41.4646 33.2387 40.8727 38.5161C40.7709 39.471 40.7072 40.4258 40.7072 41.3871C40.6945 42.2387 40.7327 43.0839 40.8091 43.9419C40.9618 45.5548 41.2609 47.2 41.7255 48.8323C41.8274 49.2 41.9419 49.5677 42.0628 49.929C42.2983 50.6323 42.5529 51.329 42.8393 52C43.1257 52.671 43.4439 53.329 43.7812 53.9677Z" fill="#CFFC68"/>
              <path d="M80.9999 63.7807C78.906 65.1548 76.5894 66.2323 74.0755 66.9678C64.4271 69.7742 54.4669 66.6903 47.9562 59.8129C47.7652 59.6065 47.5807 59.4 47.3897 59.1936C47.3834 59.1807 47.3706 59.1678 47.3579 59.1549C47.3388 59.1355 47.3261 59.1161 47.307 59.0968C47.1988 58.9742 47.0906 58.8516 46.9888 58.7226C50.9092 54.0903 53.2768 48.0645 53.2768 41.4968C53.2768 34.929 50.9092 28.9097 46.9888 24.2774C47.1351 24.1032 47.2943 23.9161 47.4406 23.742C47.4406 23.742 47.4449 23.7377 47.4534 23.729C47.4534 23.729 47.5106 23.671 47.5361 23.6387C47.5488 23.6258 47.5616 23.6065 47.5743 23.5936C47.6507 23.5097 47.727 23.4258 47.8034 23.3484C47.8352 23.3161 47.8607 23.2839 47.8925 23.2516C47.9625 23.1742 48.0389 23.0968 48.1089 23.0258C48.408 22.7161 48.7135 22.4129 49.0254 22.1161C49.1336 22.0129 49.2481 21.9032 49.369 21.7936C49.5982 21.5807 49.8336 21.3742 50.0755 21.1742C50.2091 21.0581 50.3428 20.9484 50.4764 20.8387C51.2147 20.2323 51.9784 19.671 52.7867 19.1549C53.4295 18.7291 54.1041 18.3484 54.7978 17.9807C54.8551 17.9484 54.9124 17.9161 54.9697 17.8839C55.5616 17.5742 56.1662 17.2903 56.7772 17.0387C57.4454 16.7613 58.12 16.5097 58.8137 16.2839C59.0811 16.1871 59.3484 16.1097 59.6157 16.0323C62.1296 15.2968 64.6562 14.9678 67.1511 15L80.9999 63.7807Z" fill="#14545D"/>
            </g>
            <defs>
              <clipPath id="navClip">
                <rect width="80" height="53" fill="white" transform="translate(1 15)"/>
              </clipPath>
            </defs>
          </motion.svg>
          <motion.span
            className="font-bold tracking-tight transition-all duration-500"
            style={{
              fontFamily: "var(--font-archivo)",
              color: menuOpen
                ? "var(--foreground)"
                : isDark
                  ? "rgba(255,255,255,0.95)"
                  : "var(--foreground)",
              fontSize: isHero ? "20px" : "18px",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {nav.logo_text}
          </motion.span>
        </Link>

        {/* Desktop nav links with sliding pill */}
        <div className="hidden items-center gap-1 md:flex">
          <div
            ref={navRef}
            className="relative flex items-center gap-1 rounded-full px-1 py-1 transition-colors duration-500"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.03)",
            }}
            onMouseLeave={() => {
              setHoveredIdx(null);
              closeDropdown();
            }}
          >
            {/* Animated hover pill */}
            <motion.div
              className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(20,84,93,0.08)",
              }}
              initial={false}
              animate={{
                left: hoveredIdx !== null ? pillStyle.left : 0,
                width: hoveredIdx !== null ? pillStyle.width : 0,
                opacity: hoveredIdx !== null ? 1 : 0,
              }}
              transition={{ type: "spring", damping: 28, stiffness: 400, mass: 0.5 }}
            />

            {links.map((link, i) => (
              <motion.div
                key={link.label}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {link.children ? (
                  /* Dropdown trigger */
                  <div
                    onMouseEnter={(e) => {
                      handleHover(i, e);
                      openDropdown(i);
                    }}
                  >
                    <Link
                      href={link.href}
                      className="relative z-10 flex items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color:
                          hoveredIdx === i
                            ? isDark
                              ? "rgba(255,255,255,1)"
                              : "var(--teal)"
                            : isDark
                              ? "rgba(255,255,255,0.65)"
                              : "var(--foreground-muted)",
                      }}
                    >
                      {link.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className="transition-transform duration-200"
                        style={{
                          transform: openDropdownIdx === i ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdownIdx === i && (
                        <motion.div
                          className="absolute left-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl py-1"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(10,43,71,0.95)"
                              : "rgba(255,255,255,0.98)",
                            border: isDark
                              ? "1px solid rgba(255,255,255,0.1)"
                              : "1px solid rgba(0,0,0,0.08)",
                            boxShadow: isDark
                              ? "0 6px 20px rgba(0, 0, 0, 0.18)"
                              : "0 6px 20px rgba(15, 23, 42, 0.08)",
                            backdropFilter: "blur(12px)",
                          }}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={() => openDropdown(i)}
                          onMouseLeave={closeDropdown}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-medium transition-colors duration-150"
                              style={{
                                fontFamily: "var(--font-inter)",
                                color: isDark
                                  ? "rgba(255,255,255,0.7)"
                                  : "var(--foreground-muted)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = isDark
                                  ? "rgba(255,255,255,1)"
                                  : "var(--teal)";
                                e.currentTarget.style.backgroundColor = isDark
                                  ? "rgba(255,255,255,0.06)"
                                  : "rgba(20,84,93,0.04)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = isDark
                                  ? "rgba(255,255,255,0.7)"
                                  : "var(--foreground-muted)";
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular link */
                  <Link
                    href={link.href}
                    className="relative z-10 block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color:
                        hoveredIdx === i
                          ? isDark
                            ? "rgba(255,255,255,1)"
                            : "var(--teal)"
                          : isDark
                            ? "rgba(255,255,255,0.65)"
                            : "var(--foreground-muted)",
                    }}
                    onMouseEnter={(e) => handleHover(i, e)}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="ml-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="cta-manic relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-500"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: isDark ? "var(--lime)" : "var(--teal)",
                  color: isDark ? "#0A2B47" : "#fff",
                  boxShadow: isDark
                    ? "none"
                    : "3px 4px 0px 0px var(--lime)",
                }}
              >
                <span
                  className="cta-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200"
                  style={{
                    boxShadow:
                      "0 0 15px rgba(20,84,93,0.4), 0 0 30px rgba(207,252,104,0.2)",
                  }}
                />
                <span className="relative">{nav.cta_button}</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-[110] flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-0.5 w-6 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: menuOpen
                ? "var(--teal)"
                : isDark
                  ? "rgba(255,255,255,0.9)"
                  : "var(--foreground)",
            }}
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 4 : 0,
            }}
          />
          <motion.span
            className="block h-0.5 w-6 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: menuOpen
                ? "var(--teal)"
                : isDark
                  ? "rgba(255,255,255,0.9)"
                  : "var(--foreground)",
            }}
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -4 : 0,
            }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <motion.div
        className="fixed inset-0 z-[105] flex items-center justify-center bg-background md:hidden"
        initial={false}
        animate={{
          clipPath: menuOpen
            ? "circle(150% at 95% 5%)"
            : "circle(0% at 95% 5%)",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link, i) =>
            link.children ? (
              <motion.div
                key={link.label}
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  menuOpen
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.15 * i + 0.2 },
                      }
                    : { opacity: 0, y: 30 }
                }
              >
                <Link
                  href={link.href}
                  className="text-5xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "var(--foreground)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                <div className="flex flex-col items-center gap-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-lg font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "var(--foreground-muted)",
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  menuOpen
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.15 * i + 0.2 },
                      }
                    : { opacity: 0, y: 30 }
                }
              >
                <Link
                  href={link.href}
                  className="text-5xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-archivo)",
                    color: "var(--foreground)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/menu-ornament.png"
          alt=""
          className="pointer-events-none absolute -bottom-8 -right-8 w-72 select-none"
          style={{ opacity: 0.92 }}
        />
      </motion.div>
    </motion.header>
  );
}
