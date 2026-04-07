"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Fixed size as percentage of canvas width - all shapes same size
  sizePercent: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  settled: boolean;
  density: number; // Density affects mass calculation
  bounciness: number; // Restitution coefficient for collisions
  friction: number;
  // shape variant - only circles and symmetric semi-circles
  shape: "circle" | "semi-circle";
  // For semi-circles: orientation (0 = up, 0.5 = down, etc.)
  orientation: number;
}

// Use only the specified color palette with weighted distribution
// #FFFDEF appears significantly less often than the other two colors
const getRandomColor = () => {
  const rand = Math.random();
  // Weighted distribution: 15% white, 42.5% mint, 42.5% lime
  if (rand < 0.15) return "#FFFDEF";    // 15% chance
  if (rand < 0.575) return "#A5FDF3";   // 42.5% chance
  return "#CFFC68";                     // 42.5% chance
};

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, canvasWidth: number) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;

  // Calculate actual size based on canvas width percentage
  const actualSize = canvasWidth * p.sizePercent;
  
  ctx.fillStyle = p.color;
  
  if (p.shape === "circle") {
    // Circle shape - symmetric
    ctx.beginPath();
    ctx.ellipse(0, 0, actualSize / 2, actualSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Optional subtle outline
    ctx.strokeStyle = p.color;
    ctx.lineWidth = Math.max(1, actualSize * 0.02);
    ctx.beginPath();
    ctx.ellipse(0, 0, actualSize / 2, actualSize / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Symmetric semi-circle shape
    ctx.beginPath();
    // Draw a symmetric semi-circle starting from orientation angle
    ctx.ellipse(0, 0, actualSize / 2, actualSize / 2, 0, p.orientation * Math.PI, (p.orientation + 1) * Math.PI);
    ctx.closePath();
    ctx.fill();
    
    // Add subtle outline for definition
    ctx.strokeStyle = p.color;
    ctx.lineWidth = Math.max(1, actualSize * 0.02);
    ctx.beginPath();
    ctx.ellipse(0, 0, actualSize / 2, actualSize / 2, 0, p.orientation * Math.PI, (p.orientation + 1) * Math.PI);
    ctx.stroke();
    
    // Add a subtle line to emphasize the semi-circle shape
    ctx.strokeStyle = p.color;
    ctx.lineWidth = Math.max(1, actualSize * 0.01);
    ctx.beginPath();
    // Line from center to edge through the cut
    const lineX = Math.cos(p.orientation * Math.PI) * (actualSize / 2);
    const lineY = Math.sin(p.orientation * Math.PI) * (actualSize / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(lineX, lineY);
    ctx.stroke();
  }

  ctx.restore();
}

export function Confetti({
  count = 16,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const mouseStateRef = useRef({ isMouseDown: false, downStartTime: 0 });

  const initParticles = useCallback(
    (w: number, h: number) => {
      const particles: Particle[] = [];
      const shapes: Particle["shape"][] = ["circle", "semi-circle"];
      
      // Store canvas size for percentage calculations
      canvasSizeRef.current = { width: w, height: h };
      
      // All particles share the same size - 6% of canvas width
      const UNIFORM_SIZE_PERCENT = 0.06; // 6% of canvas width

      for (let i = 0; i < count; i++) {
        // For semi-circles, choose symmetric orientations (0 = up, 0.5 = down, etc.)
        const orientation = Math.floor(Math.random() * 2) * 0.5; // 0 or 0.5
        
        // Density and bounciness variations - bouncy, playful heavy balloons
        const density = 0.8 + Math.random() * 0.4; // 0.8-1.2 (like heavy balloons)
        const bounciness = 0.6 + Math.random() * 0.3; // 0.6-0.9 (bouncy, playful)
        
        particles.push({
          // Spread across width, start above the canvas
          x: Math.random() * w,
          y: -h * 0.5 - Math.random() * h * 0.3, // Start higher for bigger particles
          vx: (Math.random() - 0.5) * 1.2, // Slower horizontal movement
          vy: 0.3 + Math.random() * 0.8, // Slower fall for bigger particles
          sizePercent: UNIFORM_SIZE_PERCENT, // All shapes same size
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          color: getRandomColor(),
          // Full opacity
          opacity: 0.9 + Math.random() * 0.1, // 0.9-1.0
          settled: false,
          density, // Affects how particles interact with cursor force
          bounciness, // Restitution coefficient for collisions
          friction: 0.985 + Math.random() * 0.01, // 0.985-0.995
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          orientation,
        });
      }
      return particles;
    },
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Update canvas size reference
      canvasSizeRef.current = { width: rect.width, height: rect.height };

      if (!initializedRef.current) {
        particlesRef.current = initParticles(rect.width, rect.height);
        initializedRef.current = true;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouse);

    const GRAVITY = 0.1; // Base gravity strength
    const CURSOR_RADIUS_PERCENT = 0.15; // 15% of canvas width
    const CURSOR_FORCE_BASE = 1.5; // Base cursor force

    const handleMouseDown = () => {
      mouseStateRef.current.isMouseDown = true;
      mouseStateRef.current.downStartTime = Date.now();
    };

    const handleMouseUp = () => {
      mouseStateRef.current.isMouseDown = false;
    };

    // Add mouse down/up listeners
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const loop = () => {
      try {
        const w = canvas.width;
        const h = canvas.height;
        
        // Skip if canvas is not properly sized
        if (w <= 0 || h <= 0) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        
        ctx.clearRect(0, 0, w, h);

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        
        // Calculate cursor radius based on canvas width
        const cursorRadius = Math.max(w * CURSOR_RADIUS_PERCENT, 1);
        
        // Apply gravity only when mouse is held down
        // Gravity strength increases slightly with hold duration
        const gravityStrength = mouseStateRef.current.isMouseDown ? GRAVITY : 0;
        const holdDuration = mouseStateRef.current.isMouseDown ? 
          (Date.now() - mouseStateRef.current.downStartTime) / 1000 : 0;
        const gravityMultiplier = 1 + Math.min(holdDuration * 0.5, 2); // Up to 3x gravity after 4 seconds

        const particles = particlesRef.current;
        if (!particles || particles.length === 0) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        for (const p of particles) {
          // Calculate actual size for collision detection
          const actualSize = w * p.sizePercent;
          
          // Apply gravity only when mouse is held down, scaled by density
          if (gravityStrength > 0) {
            p.vy += gravityStrength * gravityMultiplier * p.density;
          }

          // Cursor interaction - force scales with density
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < cursorRadius * cursorRadius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Force is reduced for denser particles (harder to move)
            const densityFactor = 1.5 - (p.density * 0.4); // 1.1 to 1.3 range
            const force = ((cursorRadius - dist) / cursorRadius) * CURSOR_FORCE_BASE * densityFactor;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force;
            p.vy += ny * force * 0.4; // Less vertical push
            p.settled = false;
            // Add subtle spin when pushed - less spin for denser particles
            p.rotationSpeed += (Math.random() - 0.5) * 0.008 * (1.2 - p.density);
          }

          // Apply velocity
          p.x += p.vx;
          p.y += p.vy;

          // Friction - denser particles have slightly less air friction
          const airFriction = p.friction * (0.99 + (p.density * 0.01));
          p.vx *= airFriction;
          p.vy *= airFriction;

          // Rotation - slower rotation for denser particles
          p.rotation += p.rotationSpeed * (1.1 - p.density * 0.2);
          p.rotationSpeed *= 0.995 + (p.density * 0.002); // 0.995-0.997

          // Floor collision - using actual size with bounciness factor
          const floor = h - actualSize / 2;
          if (p.y > floor) {
            p.y = floor;
            // Use particle's bounciness property for restitution
            p.vy = -Math.abs(p.vy) * p.bounciness;
            if (Math.abs(p.vy) < 0.2) {
              p.vy = 0;
              p.settled = true;
            }
            // Floor friction - denser particles slide less
            const floorFriction = 0.9 - (p.density * 0.05); // 0.85-0.9
            p.vx *= floorFriction;
            p.rotationSpeed *= 0.8 + (p.bounciness * 0.1); // 0.85-0.88
          }

          // Wall collision with bounciness
          if (p.x < actualSize / 2) {
            p.x = actualSize / 2;
            p.vx = Math.abs(p.vx) * p.bounciness * 0.6;
          }
          if (p.x > w - actualSize / 2) {
            p.x = w - actualSize / 2;
            p.vx = -Math.abs(p.vx) * p.bounciness * 0.6;
          }

          drawParticle(ctx, p, w);
        }
      } catch (error) {
        console.error('Error in confetti animation loop:', error);
        // Stop the animation on error to prevent infinite crash loops
        cancelAnimationFrame(rafRef.current);
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[2] ${className}`}
    />
  );
}