"use client";

import { motion } from "motion/react";

export function HeroGrid() {
  // Replicating the Figma node 5109-397: architectural grid table
  // with opacity variation across cells — some lines brighter, some dimmer
  // creating a smooth depth effect on dark teal

  // Column positions (% of viewport) — uneven widths like the reference
  const cols = [5.5, 24.5, 42, 59, 76, 94.5];
  // Row positions (% of viewport) — uneven heights
  const rows = [8, 23, 38, 55, 70, 85, 96];

  // Ethereal grid blending - more subtle opacity for ethereal feel
  // Maintain current stroke width but make lines blend better with background
  const getLineOpacity = (index: number, total: number) => {
    const base = 0.025; // Reduced from 0.045 for more subtle blending
    const variation = Math.sin((index / total) * Math.PI) * 0.015; // Reduced variation
    return base + variation;
  };

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden">
      {/* Nested/fractal grid pattern using CSS gradients */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            /* Primary main grid (16x9 ratio - matches SVG) */
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 0.8px, transparent 0.8px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 0.8px, transparent 0.8px),
            /* Secondary nested grid (32x18 - 2x subdivision) */
            linear-gradient(to right, rgba(255, 255, 255, 0.012) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.012) 0.5px, transparent 0.5px),
            /* Tertiary nested grid (64x36 - 4x subdivision) */
            linear-gradient(to right, rgba(255, 255, 255, 0.006) 0.3px, transparent 0.3px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.006) 0.3px, transparent 0.3px)
          `,
          backgroundSize: `
            calc(100% / 16) 100%,  /* Main horizontal */
            100% calc(100% / 9),   /* Main vertical */
            calc(100% / 32) 100%,  /* Secondary horizontal */
            100% calc(100% / 18),  /* Secondary vertical */
            calc(100% / 64) 100%,  /* Tertiary horizontal */
            100% calc(100% / 36)   /* Tertiary vertical */
          `,
          backgroundPosition: '0 0',
          backgroundRepeat: 'repeat',
          opacity: 0.7,
          mixBlendMode: 'screen',
        }}
      />

      {/* Processor beam animation */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(148, 216, 10, 0.2), rgba(165, 253, 243, 0.3), rgba(148, 216, 10, 0.2), transparent)',
          boxShadow: '0 0 10px rgba(148, 216, 10, 0.3), 0 0 20px rgba(165, 253, 243, 0.2)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{
          opacity: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }
        }}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </motion.div>

      <svg
        className="h-full w-full"
        viewBox="0 0 1456 816"
        preserveAspectRatio="none"
      >
        {/* Outer frame with slight opacity */}
        <motion.rect
          x="80"
          y="65"
          width="1296"
          height="718"
          rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Vertical lines with varying opacity */}
        {[80, 356, 600, 858, 1106, 1376].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="65"
            x2={x}
            y2="783"
            stroke={`rgba(255,255,255,${getLineOpacity(i, 6)})`}
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.4, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.6, delay: 0.4 + i * 0.08 },
            }}
          />
        ))}

        {/* Horizontal lines with varying opacity */}
        {[65, 188, 310, 450, 570, 690, 783].map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1="80"
            y1={y}
            x2="1376"
            y2={y}
            stroke={`rgba(255,255,255,${getLineOpacity(i, 7)})`}
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.4, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.6, delay: 0.6 + i * 0.08 },
            }}
          />
        ))}


        {/* Accent cells — slightly brighter rectangles in specific positions
            to match the opacity variation in the Figma reference
            (top-right and bottom-left areas have subtly visible fills) */}
        {[
          { x: 1106, y: 65, w: 270, h: 123, o: 0.018 },
          { x: 1106, y: 188, w: 270, h: 122, o: 0.012 },
          { x: 80, y: 310, w: 276, h: 140, o: 0.012 },
          { x: 80, y: 450, w: 276, h: 120, o: 0.008 },
          { x: 600, y: 310, w: 258, h: 140, o: 0.01 },
          { x: 858, y: 570, w: 248, h: 120, o: 0.01 },
        ].map((cell, i) => (
          <motion.rect
            key={`cell-${i}`}
            x={cell.x}
            y={cell.y}
            width={cell.w}
            height={cell.h}
            fill={`rgba(255,255,255,${cell.o})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}
