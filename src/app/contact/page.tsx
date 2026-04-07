"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MagneticButton } from "@/components/magnetic-button";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email";
    }
    if (!message.trim()) errs.message = "Tell us a bit about your project";
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center">
        <div className="site-container w-full max-w-4xl px-6 pt-32 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}>
              Message Received
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}>
              Thank you<span style={{ color: "var(--teal)" }}>.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }}>
              We&apos;ll get back to you within 24 hours. In the meantime, feel free to check out our case studies.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center">
      <div className="site-container w-full max-w-4xl px-6 pt-32 md:px-12 lg:px-24">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Let&apos;s Chat About You
        </motion.p>
        <motion.h1 className="mt-3 text-5xl font-bold tracking-tighter md:text-7xl" style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          Tell us about<br /><span style={{ color: "var(--teal)" }}>your goals.</span>
        </motion.h1>

        <motion.p className="mt-6 max-w-md text-sm leading-relaxed" style={{ fontFamily: "var(--font-encode)", color: "var(--foreground-muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          Don&apos;t stress, we are very nice and won&apos;t bite. Share your vision and we&apos;ll architect the growth plan.
        </motion.p>

        <motion.div className="mt-12 space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          {/* Name */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className="mt-2 block w-full border-b bg-transparent py-3 text-lg font-light outline-none transition-colors"
              style={{
                fontFamily: "var(--font-encode)",
                borderColor: touched.name && errors.name ? "#D94F4F" : "var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="Your name"
            />
            {touched.name && errors.name && (
              <motion.p
                className="mt-2 text-xs font-medium"
                style={{ fontFamily: "var(--font-inter)", color: "#D94F4F" }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className="mt-2 block w-full border-b bg-transparent py-3 text-lg font-light outline-none transition-colors"
              style={{
                fontFamily: "var(--font-encode)",
                borderColor: touched.email && errors.email ? "#D94F4F" : "var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="you@company.com"
            />
            {touched.email && errors.email && (
              <motion.p
                className="mt-2 text-xs font-medium"
                style={{ fontFamily: "var(--font-inter)", color: "#D94F4F" }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}>Tell us about your project</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => handleBlur("message")}
              className="mt-2 block w-full resize-none border-b bg-transparent py-3 text-lg font-light outline-none transition-colors"
              style={{
                fontFamily: "var(--font-encode)",
                borderColor: touched.message && errors.message ? "#D94F4F" : "var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="Budget, timeline, goals..."
            />
            {touched.message && errors.message && (
              <motion.p
                className="mt-2 text-xs font-medium"
                style={{ fontFamily: "var(--font-inter)", color: "#D94F4F" }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          <MagneticButton strength={0.15}>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
              style={{ fontFamily: "var(--font-inter)", backgroundColor: "var(--teal)", boxShadow: "6px 6px 0px 0px var(--lime)" }}
            >
              Let&apos;s Chat &rarr;
            </button>
          </MagneticButton>
        </motion.div>

        <motion.div className="mt-24 pb-16 text-xs font-medium" style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
          <p>rodrigo@omnicommon.com</p>
          <p className="mt-1">Based in the US & LatAm</p>
        </motion.div>
      </div>
    </main>
  );
}
