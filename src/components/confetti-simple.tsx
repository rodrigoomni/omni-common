"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "semicircle";
  opacity: number;
  settled: boolean;
  hasGlow: boolean;
  glowIntensity: number;
  frostOpacity: number;
}

export function ConfettiSimple({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const colors = ["#1A7A7A", "#A5FDF3", "#CFFC68"];

    // Physics
    const gravity = 0.15;
    const airResistance = 0.992;
    const bounceFriction = 0.35;
    const groundFriction = 0.85;
    const wallBounce = 0.3;
    const floorOffset = 10;
    const settleThreshold = 0.3;

    // Cursor push — particles react to mouse movement even without dragging
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseMoved = false;
    const cursorPushRadius = 120;
    const cursorPushStrength = 0.8;

    // Drag state
    let dragIndex = -1;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let throwVx = 0;
    let throwVy = 0;

    const isMobile = () => canvas.width < 768;

    const getRadius = () => {
      if (isMobile()) {
        return Math.min(canvas.width, canvas.height) * 0.09;
      }
      return Math.min(canvas.width, canvas.height) * 0.075;
    };

    const getCount = () => (isMobile() ? 8 : 13);

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const buildParticles = () => {
      const count = getCount();
      const radius = getRadius();
      const w = canvas.width;
      const h = canvas.height;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: radius + Math.random() * (w - radius * 2),
          y: -(Math.random() * h * 1.2 + radius),
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 1.5 + 0.5,
          radius,
          mass: 1,
          // Weighted: teal is rarer (~15%), cyan and lime split the rest
          color: (() => { const r = Math.random(); return r < 0.15 ? colors[0] : r < 0.575 ? colors[1] : colors[2]; })(),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          shape: Math.random() > 0.5 ? "circle" : "semicircle",
          opacity: 0.65 + Math.random() * 0.35,
          settled: false,
          hasGlow: Math.random() < 0.3,
          glowIntensity: 0.15 + Math.random() * 0.2,
          frostOpacity: 0.12 + Math.random() * 0.15,
        });
      }
    };

    // Clamp particle within bounds (walls + floor, no ceiling)
    const clampBounds = (p: Particle, w: number, floor: number) => {
      // Floor
      if (p.y + p.radius > floor) {
        p.y = floor - p.radius;
        if (p.vy > 0) {
          p.vy = -p.vy * bounceFriction;
          p.vx *= groundFriction;
          // Gentle rotation from ground contact proportional to horizontal velocity
          p.rotationSpeed = p.vx * 0.003;
        }
        if (Math.abs(p.vy) < settleThreshold && Math.abs(p.vx) < settleThreshold) {
          p.settled = true;
          p.vy = 0;
          p.vx = 0;
          p.rotationSpeed = 0;
        }
      }
      // Walls
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        if (p.vx < 0) p.vx = -p.vx * wallBounce;
      }
      if (p.x + p.radius > w) {
        p.x = w - p.radius;
        if (p.vx > 0) p.vx = -p.vx * wallBounce;
      }
    };

    // Particle-to-particle collision
    const resolveCollisions = (floor: number, w: number) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.radius + b.radius;

          if (dist < minDist && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minDist - dist) / 2;

            // Separate overlapping particles
            if (dragIndex === i) {
              b.x += nx * overlap * 2;
              b.y += ny * overlap * 2;
            } else if (dragIndex === j) {
              a.x -= nx * overlap * 2;
              a.y -= ny * overlap * 2;
            } else {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;
            }

            // Relative velocity along normal
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const dvDotN = dvx * nx + dvy * ny;

            if (dvDotN > 0) {
              const restitution = 0.4;
              const impulse = dvDotN * restitution;

              if (dragIndex !== i) {
                a.vx -= impulse * nx;
                a.vy -= impulse * ny;
                a.settled = false;
              }
              if (dragIndex !== j) {
                b.vx += impulse * nx;
                b.vy += impulse * ny;
                b.settled = false;
              }

              // Gentle rotation from collision — proportional to tangential velocity, not random
              const tx = -ny;
              const tangentV = dvx * tx + dvy * (-nx);
              if (dragIndex !== i) a.rotationSpeed += tangentV * 0.002;
              if (dragIndex !== j) b.rotationSpeed -= tangentV * 0.002;
            }

            // Post-collision clamp
            clampBounds(a, w, floor);
            clampBounds(b, w, floor);
          }
        }
      }
    };

    // Hit test — expanded radius for easier grabbing
    const hitTest = (mx: number, my: number): number => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const grabRadius = p.radius * 1.3;
        if (dx * dx + dy * dy <= grabRadius * grabRadius) return i;
      }
      return -1;
    };

    const getCanvasPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      const pos = getCanvasPos(e);
      const idx = hitTest(pos.x, pos.y);
      if (idx >= 0) {
        dragIndex = idx;
        const p = particles[idx];
        dragOffsetX = pos.x - p.x;
        dragOffsetY = pos.y - p.y;
        prevMouseX = pos.x;
        prevMouseY = pos.y;
        throwVx = 0;
        throwVy = 0;
        p.settled = false;
        p.vx = 0;
        p.vy = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = getCanvasPos(e);
      mouseX = pos.x;
      mouseY = pos.y;
      mouseMoved = true;

      if (dragIndex < 0) return;
      const p = particles[dragIndex];
      p.x = pos.x - dragOffsetX;
      p.y = pos.y - dragOffsetY;
      throwVx = throwVx * 0.6 + (pos.x - prevMouseX) * 0.4;
      throwVy = throwVy * 0.6 + (pos.y - prevMouseY) * 0.4;
      prevMouseX = pos.x;
      prevMouseY = pos.y;
    };

    const onMouseUp = () => {
      if (dragIndex >= 0) {
        const p = particles[dragIndex];
        p.vx = throwVx * 1.8;
        p.vy = throwVy * 1.8;
        p.settled = false;
        dragIndex = -1;
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const pos = getCanvasPos(touch);
      const idx = hitTest(pos.x, pos.y);
      if (idx >= 0) {
        e.preventDefault();
        dragIndex = idx;
        const p = particles[idx];
        dragOffsetX = pos.x - p.x;
        dragOffsetY = pos.y - p.y;
        prevMouseX = pos.x;
        prevMouseY = pos.y;
        throwVx = 0;
        throwVy = 0;
        p.settled = false;
        p.vx = 0;
        p.vy = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (dragIndex < 0) return;
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getCanvasPos(touch);
      const p = particles[dragIndex];
      p.x = pos.x - dragOffsetX;
      p.y = pos.y - dragOffsetY;
      throwVx = throwVx * 0.6 + (pos.x - prevMouseX) * 0.4;
      throwVy = throwVy * 0.6 + (pos.y - prevMouseY) * 0.4;
      prevMouseX = pos.x;
      prevMouseY = pos.y;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (dragIndex >= 0) {
        e.preventDefault();
        const p = particles[dragIndex];
        p.vx = throwVx * 1.8;
        p.vy = throwVy * 1.8;
        p.settled = false;
        dragIndex = -1;
      }
    };

    // Cursor style
    const onMouseMoveCanvas = (e: MouseEvent) => {
      if (dragIndex >= 0) {
        canvas.style.cursor = "grabbing";
        return;
      }
      const pos = getCanvasPos(e);
      canvas.style.cursor = hitTest(pos.x, pos.y) >= 0 ? "grab" : "";
    };

    resize();
    buildParticles();

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const floor = h - floorOffset;

      ctx.clearRect(0, 0, w, h);

      // Cursor push on non-dragged particles
      if (mouseMoved) {
        for (let i = 0; i < particles.length; i++) {
          if (i === dragIndex) continue;
          const p = particles[i];
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushDist = cursorPushRadius + p.radius;
          if (dist < pushDist && dist > 0.01) {
            const force = ((pushDist - dist) / pushDist) * cursorPushStrength;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force;
            p.vy += ny * force;
            p.settled = false;
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const isDragged = i === dragIndex;

        if (!p.settled && !isDragged) {
          p.vy += gravity * p.mass;
          p.vx *= airResistance;
          p.vy *= airResistance;

          p.x += p.vx;
          p.y += p.vy;

          // Rotation proportional to horizontal movement, heavily damped
          p.rotation += p.rotationSpeed;
          p.rotationSpeed *= 0.96;
          // Clamp max rotation speed to prevent spinning
          if (p.rotationSpeed > 0.04) p.rotationSpeed = 0.04;
          if (p.rotationSpeed < -0.04) p.rotationSpeed = -0.04;

          clampBounds(p, w, floor);
        }

        // Clamp dragged particle within walls + floor (no ceiling)
        if (isDragged) {
          p.x = Math.max(p.radius, Math.min(w - p.radius, p.x));
          p.y = Math.min(floor - p.radius, p.y);
        }

        // Draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Glow pass — wide soft blur, same intensity
        if (p.hasGlow) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.radius * 0.5;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.globalAlpha = p.glowIntensity * 0.35;
          ctx.fillStyle = p.color;
          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI);
            ctx.closePath();
            ctx.fill();
          }
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        // Base fill — clean, crisp color
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI);
          ctx.closePath();
          ctx.fill();
        }

        // Frosted glass overlay — skip for dark teal pieces (keep plain)
        const isTeal = p.color === colors[0];
        if (!isTeal) {
          const frostGrad = ctx.createRadialGradient(
            -p.radius * 0.25, -p.radius * 0.25, 0,
            0, 0, p.radius
          );
          frostGrad.addColorStop(0, `rgba(255,255,255,${p.frostOpacity * 0.8})`);
          frostGrad.addColorStop(0.35, `rgba(255,255,255,${p.frostOpacity * 0.15})`);
          frostGrad.addColorStop(1, "rgba(255,255,255,0)");

          ctx.globalAlpha = 1;
          ctx.fillStyle = frostGrad;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI);
            ctx.closePath();
            ctx.fill();
          }

          // Thin edge rim
          ctx.globalAlpha = p.frostOpacity * 0.35;
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 0.75;
          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius - 0.5, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.radius - 0.5, 0, Math.PI);
            ctx.closePath();
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      // Collisions after position updates
      resolveCollisions(floor, w);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousemove", onMouseMoveCanvas);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const handleResize = () => {
      const prevMobile = isMobile();
      resize();
      const nowMobile = isMobile();

      if (prevMobile !== nowMobile) {
        buildParticles();
      } else {
        const radius = getRadius();
        for (const p of particles) {
          p.radius = radius;
          if (p.settled && p.y + p.radius < canvas.height - floorOffset - 5) {
            p.settled = false;
          }
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousemove", onMouseMoveCanvas);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-[2] ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
