"use client";

import { motion } from "motion/react";

const bubbles = [
  { label: "SEO", color: "#CFFC68", text: "#0a2b47", x: "8%", y: "18%", rotate: -5 },
  { label: "Paid Ads", color: "#A5FDF3", text: "#0a2b47", x: "78%", y: "12%", rotate: 8 },
  { label: "Analytics", color: "#F3C5FF", text: "#0a2b47", x: "85%", y: "55%", rotate: -3 },
  { label: "Branding", color: "#FAC564", text: "#0a2b47", x: "5%", y: "60%", rotate: 11 },
  { label: "Growth", color: "#CFFC68", text: "#0a2b47", x: "72%", y: "78%", rotate: -8 },
  { label: "Strategy", color: "#46D6F6", text: "#0a2b47", x: "15%", y: "82%", rotate: 5 },
  { label: "UX Design", color: "#ffffff", text: "#0a2b47", x: "88%", y: "32%", rotate: -6 },
  { label: "Automation", color: "#F38264", text: "#ffffff", x: "3%", y: "40%", rotate: 4 },
  { label: "Social Media", color: "#9AA1F2", text: "#0a2b47", x: "70%", y: "20%", rotate: -4 },
  { label: "Lead Gen", color: "#8FEEFF", text: "#0a2b47", x: "20%", y: "72%", rotate: 7 },
];

export function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={bubble.label}
          className="absolute"
          style={{ left: bubble.x, top: bubble.y }}
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{
            opacity: [0, 0.85, 0.85],
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.8 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0, 6, 0],
              rotate: [bubble.rotate, bubble.rotate + 3, bubble.rotate - 2, bubble.rotate],
            }}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="bubble pointer-events-auto"
              style={{
                backgroundColor: bubble.color,
                color: bubble.text,
              }}
            >
              {bubble.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
