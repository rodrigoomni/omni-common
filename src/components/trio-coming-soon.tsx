"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";

type TrioModalCtx = {
  openTrioModal: () => void;
  closeTrioModal: () => void;
};

const TrioModalContext = createContext<TrioModalCtx | null>(null);

export function useTrioModal(): TrioModalCtx {
  const ctx = useContext(TrioModalContext);
  if (!ctx) {
    throw new Error("useTrioModal must be used within <TrioModalProvider>");
  }
  return ctx;
}

export function TrioModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openTrioModal = useCallback(() => setOpen(true), []);
  const closeTrioModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrioModal();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeTrioModal]);

  return (
    <TrioModalContext.Provider value={{ openTrioModal, closeTrioModal }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 cursor-default"
              style={{
                backgroundColor: "rgba(10,43,71,0.55)",
                backdropFilter: "blur(6px)",
              }}
              onClick={closeTrioModal}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="trio-modal-title"
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-background p-8 md:p-10"
              style={{
                boxShadow:
                  "6px 8px 0 0 var(--lime), 0 30px 60px rgba(10,43,71,0.25)",
                border: "1.5px solid var(--border-light)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={closeTrioModal}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{
                  backgroundColor: "rgba(20,84,93,0.08)",
                  color: "var(--teal)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>

              <p
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--teal)",
                }}
              >
                Work in progress
              </p>
              <h3
                id="trio-modal-title"
                className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
                style={{
                  fontFamily: "var(--font-archivo)",
                  color: "var(--foreground)",
                }}
              >
                TRIO Flatmount is{" "}
                <span style={{ color: "var(--teal)" }}>still cooking.</span>
              </h3>
              <p
                className="mt-5 text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-encode)",
                  color: "var(--foreground-muted)",
                }}
              >
                Our team is finalizing the numbers and polishing the copy on
                this one. We&rsquo;d rather ship it right than ship it fast
                &mdash; check back soon for the full case study.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={closeTrioModal}
                  className="cta-manic relative rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "var(--teal)",
                    boxShadow: "3px 4px 0 0 var(--lime)",
                  }}
                >
                  Got it
                </button>
                <a
                  href="#lets-chat"
                  onClick={closeTrioModal}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--teal)",
                    border: "1.5px solid rgba(20,84,93,0.2)",
                  }}
                >
                  Talk to us in the meantime
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TrioModalContext.Provider>
  );
}
