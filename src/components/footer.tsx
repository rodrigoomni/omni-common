"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { MagneticButton } from "./magnetic-button";
import globalContent from "@/content/global.json";

const { footer } = globalContent;

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <footer id="lets-chat" style={{ backgroundColor: "var(--background)" }}>
      <div className="site-container px-6 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32 lg:px-[60px] lg:pb-[100px] lg:pt-[136px]">
       <div className="px-4 md:px-8 lg:px-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-14 md:grid-cols-2 md:gap-16">
            {/* ── LEFT: pitch + contact info ── */}
            <div>
              {/* Omni Common icon */}
              <svg
                width="72"
                height="72"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <g clipPath="url(#footerClip)">
                  <path d="M43.7812 53.9677C44.685 55.6903 45.7605 57.2774 46.9889 58.7226H46.9825C46.5115 59.2903 46.0088 59.8323 45.4932 60.3419C40.7709 65.0774 34.292 68 27.1384 68C12.7231 68 1 56.1097 1 41.4968C1 26.8839 12.7231 15 27.1384 15C34.292 15 40.7709 17.9226 45.4932 22.6581H45.4996C46.0151 23.1742 46.5115 23.7097 46.9825 24.271H46.9889C43.6221 28.271 41.4646 33.2387 40.8727 38.5161C40.7709 39.471 40.7072 40.4258 40.7072 41.3871C40.6945 42.2387 40.7327 43.0839 40.8091 43.9419C40.9618 45.5548 41.2609 47.2 41.7255 48.8323C41.8274 49.2 41.9419 49.5677 42.0628 49.929C42.2983 50.6323 42.5529 51.329 42.8393 52C43.1257 52.671 43.4439 53.329 43.7812 53.9677Z" fill="#CFFC68"/>
                  <path d="M80.9999 63.7807C78.906 65.1548 76.5894 66.2323 74.0755 66.9678C64.4271 69.7742 54.4669 66.6903 47.9562 59.8129C47.7652 59.6065 47.5807 59.4 47.3897 59.1936C47.3834 59.1807 47.3706 59.1678 47.3579 59.1549C47.3388 59.1355 47.3261 59.1161 47.307 59.0968C47.1988 58.9742 47.0906 58.8516 46.9888 58.7226C50.9092 54.0903 53.2768 48.0645 53.2768 41.4968C53.2768 34.929 50.9092 28.9097 46.9888 24.2774C47.1351 24.1032 47.2943 23.9161 47.4406 23.742C47.4406 23.742 47.4449 23.7377 47.4534 23.729C47.4534 23.729 47.5106 23.671 47.5361 23.6387C47.5488 23.6258 47.5616 23.6065 47.5743 23.5936C47.6507 23.5097 47.727 23.4258 47.8034 23.3484C47.8352 23.3161 47.8607 23.2839 47.8925 23.2516C47.9625 23.1742 48.0389 23.0968 48.1089 23.0258C48.408 22.7161 48.7135 22.4129 49.0254 22.1161C49.1336 22.0129 49.2481 21.9032 49.369 21.7936C49.5982 21.5807 49.8336 21.3742 50.0755 21.1742C50.2091 21.0581 50.3428 20.9484 50.4764 20.8387C51.2147 20.2323 51.9784 19.671 52.7867 19.1549C53.4295 18.7291 54.1041 18.3484 54.7978 17.9807C54.8551 17.9484 54.9124 17.9161 54.9697 17.8839C55.5616 17.5742 56.1662 17.2903 56.7772 17.0387C57.4454 16.7613 58.12 16.5097 58.8137 16.2839C59.0811 16.1871 59.3484 16.1097 59.6157 16.0323C62.1296 15.2968 64.6562 14.9678 67.1511 15L80.9999 63.7807Z" fill="#14545D"/>
                </g>
                <defs>
                  <clipPath id="footerClip">
                    <rect width="80" height="53" fill="white" transform="translate(1 15)"/>
                  </clipPath>
                </defs>
              </svg>

              <p
                className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
              >
                {footer.eyebrow}
              </p>

              <h2
                className="mt-2 text-5xl font-bold leading-[1] tracking-tighter md:text-6xl lg:text-[72px]"
                style={{ fontFamily: "var(--font-archivo)", color: "var(--foreground)" }}
              >
                {footer.heading}
                <span style={{ color: "var(--teal)" }}>{footer.heading_accent}</span>
              </h2>

              <p
                className="mt-6 max-w-md text-base leading-[1.5]"
                style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}
              >
                {footer.description}
              </p>

              <div className="mt-12 space-y-8">
                <p
                  className="text-base font-semibold"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}
                >
                  <a href={`mailto:${footer.email}`} className="hover:underline">
                    {footer.email}
                  </a>
                </p>

                <p
                  className="text-base leading-[1.625]"
                  style={{ fontFamily: "var(--font-encode)", color: "var(--foreground)" }}
                >
                  <span className="font-bold">{footer.local_note_bold}</span>
                  <br />
                  <a
                    href="/local"
                    className="underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--teal)" }}
                  >
                    {footer.local_link_text}
                  </a>
                </p>
              </div>
            </div>

            {/* ── RIGHT: contact form ── */}
            <form
              className="flex flex-col gap-8 pt-2 md:pt-9"
              action={`mailto:${footer.email}`}
              method="post"
              encType="text/plain"
            >
              <FormField
                id="footer-name"
                label={footer.form.name_label}
                placeholder={footer.form.name_placeholder}
                value={name}
                onChange={setName}
                autoComplete="name"
              />
              <FormField
                id="footer-email"
                label={footer.form.email_label}
                placeholder={footer.form.email_placeholder}
                value={email}
                onChange={setEmail}
                type="email"
                autoComplete="email"
              />
              <FormField
                id="footer-message"
                label={footer.form.message_label}
                placeholder={footer.form.message_placeholder}
                value={message}
                onChange={setMessage}
                textarea
              />

              <div className="self-start">
                <MagneticButton strength={0.2}>
                  <button
                    type="submit"
                    className="cta-manic relative inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      fontFamily: "var(--font-inter)",
                      backgroundColor: "var(--teal)",
                      color: "#fff",
                      boxShadow: "6px 6px 0px 0px var(--lime)",
                    }}
                  >
                    <span className="relative inline-flex items-center gap-2">
                      {footer.cta_button}{" "}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M13 6l6 6-6 6"/>
                      </svg>
                    </span>
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* ── BOTTOM ROW ── */}
          <div
            className="mt-16 flex flex-col justify-between gap-4 text-xs font-medium md:flex-row md:items-center md:pt-16"
            style={{ fontFamily: "var(--font-inter)", color: "var(--foreground-subtle)" }}
          >
            <p>{footer.copyright_prefix} {new Date().getFullYear()}.</p>
            <nav aria-label="Social media" className="flex gap-8">
              <a
                href="https://x.com/omnicommon"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${footer.social_twitter} (opens in new tab)`}
                className="transition-colors hover:text-foreground"
              >
                {footer.social_twitter}
              </a>
              <a
                href="https://www.linkedin.com/company/omnicommon"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${footer.social_linkedin} (opens in new tab)`}
                className="transition-colors hover:text-foreground"
              >
                {footer.social_linkedin}
              </a>
              <a
                href="https://www.instagram.com/omnicommon"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${footer.social_instagram} (opens in new tab)`}
                className="transition-colors hover:text-foreground"
              >
                {footer.social_instagram}
              </a>
            </nav>
          </div>
        </motion.div>
       </div>
      </div>
    </footer>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
};

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  textarea = false,
}: FormFieldProps) {
  const sharedStyle = {
    fontFamily: "var(--font-encode)",
    color: "var(--foreground)",
    backgroundColor: "#F5F5F5",
    borderBottom: "1px solid var(--border)",
  } as const;

  return (
    <div className="flex flex-col gap-[10.5px]">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-inter)", color: "var(--teal)" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full resize-none px-4 pb-24 pt-3 text-lg placeholder:text-[rgba(38,38,38,0.5)] focus:outline-none focus:ring-2 focus:ring-[color:var(--teal)]/40"
          style={sharedStyle}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 pb-4 pt-3.5 text-lg placeholder:text-[rgba(38,38,38,0.5)] focus:outline-none focus:ring-2 focus:ring-[color:var(--teal)]/40"
          style={sharedStyle}
        />
      )}
    </div>
  );
}
