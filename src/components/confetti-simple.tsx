"use client";

import { useEffect, useRef, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  invMass: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "semicircle";
  opacity: number;
  settled: boolean;
  hasGlow: boolean;
  glowIntensity: number;
  frostOpacity: number;
  solid: boolean;
  popping: boolean;
  popStart: number;
}

export interface SeedShape {
  color: string;
  /** Optional starting x as a fraction of canvas width (0–1) */
  xFrac?: number;
  /** Optional shape override — default "circle" */
  shape?: "circle" | "semicircle";
}

export function ConfettiSimple({
  className = "",
  obstacleRef,
  obstacleRefs,
  obstaclePadding = 8,
  seedShapes,
}: {
  className?: string;
  /** Single DOM obstacle rect that particles will bounce off. */
  obstacleRef?: RefObject<HTMLElement | null>;
  /** Multiple obstacle rects. Merged with `obstacleRef` if both are provided. */
  obstacleRefs?: Array<RefObject<HTMLElement | null>>;
  /** Extra pixels of hitbox padding around each obstacle. */
  obstaclePadding?: number;
  /** Extra heavy shapes to seed into the simulation (large, solid-fill, draggable). */
  seedShapes?: SeedShape[];
}) {
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
    const groundFriction = 0.85;
    const wallBounce = 0.35;
    const floorBounce = 0.5;
    const floorOffset = 10;
    const settleThreshold = 0.35;
    const restitution = 0.5; // particle-particle
    const obstacleRestitution = 0.55;
    const substeps = 2; // physics substeps per frame — improves stability + collision accuracy
    const maxVel = 40; // hard cap to prevent tunneling on wild throws

    // Drag state
    let dragIndex = -1;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let throwVx = 0;
    let throwVy = 0;

    const isMobile = () => canvas.width < 768;
    const isSmallDesktop = () => canvas.width >= 768 && canvas.width < 1280;

    const getRadius = () => {
      const base = Math.min(canvas.width, canvas.height);
      if (isMobile()) return base * 0.09;
      // Small desktop: 15% smaller than large desktop
      if (isSmallDesktop()) return base * 0.075 * 0.85;
      return base * 0.075;
    };

    const getCount = () => (isMobile() ? 8 : 7);

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

      // Seed shapes — same size as random confetti so everything reads consistently
      if (seedShapes && seedShapes.length) {
        for (const s of seedShapes) {
          particles.push({
            x: (s.xFrac ?? Math.random()) * (w - radius * 2) + radius,
            y: -(Math.random() * h * 0.6 + radius * 2),
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 1.2 + 0.5,
            radius,
            mass: 1,
            invMass: 1,
            color: s.color,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.012,
            shape: s.shape ?? "circle",
            opacity: 1,
            settled: false,
            hasGlow: true,
            // Varied "gloom" — some subtle, some vivid
            glowIntensity: 0.15 + Math.random() * 0.65,
            frostOpacity: 0,
            solid: true,
            popping: false,
            popStart: 0,
          });
        }
      }

      for (let i = 0; i < count; i++) {
        // Circles dominate — semicircles are the accent
        const shape: "circle" | "semicircle" = Math.random() < 0.7 ? "circle" : "semicircle";
        // Semicircles are almost always sherpa (teal); rare ice-blue for accent.
        // Circles use the full weighted palette.
        let color: string;
        if (shape === "semicircle") {
          color = Math.random() < 0.92 ? colors[0] : colors[1];
        } else {
          // Circles: sherpa is rare, cyan and lime share the rest
          const r = Math.random();
          color = r < 0.07 ? colors[0] : r < 0.535 ? colors[1] : colors[2];
        }
        particles.push({
          x: radius + Math.random() * (w - radius * 2),
          y: -(Math.random() * h * 1.2 + radius),
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 1.5 + 0.5,
          radius,
          mass: 1,
          invMass: 1,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          shape,
          opacity: 1,
          settled: false,
          hasGlow: true,
          // Varied "gloom" — every piece glows, intensity varies dramatically
          glowIntensity: 0.15 + Math.random() * 0.7,
          frostOpacity: 0.12 + Math.random() * 0.15,
          solid: false,
          popping: false,
          popStart: 0,
        });
      }
    };

    /**
     * Support function: max extent of a particle in world-space direction (nx, ny) from its center.
     * For a full circle this is always the radius. For a semicircle (half-disc with flat edge along
     * the local x-axis, curved half at local +y), the extent shrinks toward the flat side —
     * so collisions match the visible shape.
     */
    const support = (p: Particle, nx: number, ny: number): number => {
      if (p.shape === "circle") return p.radius;
      const cos = Math.cos(p.rotation);
      const sin = Math.sin(p.rotation);
      // Rotate world direction into local frame (undo p.rotation)
      const lx = nx * cos + ny * sin;
      const ly = -nx * sin + ny * cos;
      if (ly >= 0) return p.radius;
      // Clamp minimum so the support never collapses to 0 — prevents jitter/singularity
      // when a semicircle's flat side aligns exactly with the contact normal.
      const minR = p.radius * 0.2;
      return Math.max(p.radius * Math.abs(lx), minR);
    };

    /** Point-in-particle test (for grab hit-testing). */
    const containsPoint = (p: Particle, px: number, py: number): boolean => {
      const dx = px - p.x;
      const dy = py - p.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > p.radius * p.radius) return false;
      if (p.shape === "circle") return true;
      const cos = Math.cos(p.rotation);
      const sin = Math.sin(p.rotation);
      const ly = -dx * sin + dy * cos;
      return ly >= 0;
    };

    // Multiple rectangular obstacles in canvas-local coords (recomputed per frame).
    type Rect = { left: number; top: number; right: number; bottom: number };
    let obstacles: Rect[] = [];

    const collectRefs = (): Array<RefObject<HTMLElement | null>> => {
      const list: Array<RefObject<HTMLElement | null>> = [];
      if (obstacleRef) list.push(obstacleRef);
      if (obstacleRefs) list.push(...obstacleRefs);
      return list;
    };

    const updateObstacles = () => {
      // Skip on mobile — content doesn't collide with particles on small screens.
      // Also skip once the user has scrolled at all — collisions come back only when
      // the hero is fully in view (scrollY === 0).
      if (isMobile() || scrollY > 0) {
        obstacles = [];
        return;
      }
      const refs = collectRefs();
      if (refs.length === 0) {
        obstacles = [];
        return;
      }
      const cRect = canvas.getBoundingClientRect();
      obstacles = [];
      for (const ref of refs) {
        const el = ref.current;
        if (!el) continue;
        const oRect = el.getBoundingClientRect();
        obstacles.push({
          left: oRect.left - cRect.left - obstaclePadding,
          top: oRect.top - cRect.top - obstaclePadding,
          right: oRect.right - cRect.left + obstaclePadding,
          bottom: oRect.bottom - cRect.top + obstaclePadding,
        });
      }
    };

    // Push particle out of a single rectangular obstacle along axis of minimum penetration.
    const resolveRect = (p: Particle, rect: Rect) => {
      const { left, top, right, bottom } = rect;
      const cx = Math.max(left, Math.min(p.x, right));
      const cy = Math.max(top, Math.min(p.y, bottom));
      const dx = p.x - cx;
      const dy = p.y - cy;
      const distSq = dx * dx + dy * dy;
      // Quick bounding-sphere reject
      if (distSq > p.radius * p.radius) return;

      const inside = distSq < 0.0001;
      let nx: number;
      let ny: number;
      let dist: number;

      if (inside) {
        const distLeft = p.x - left;
        const distRight = right - p.x;
        const distTop = p.y - top;
        const distBottom = bottom - p.y;
        const minDist = Math.min(distLeft, distRight, distTop, distBottom);
        if (minDist === distLeft) { nx = -1; ny = 0; dist = -distLeft; }
        else if (minDist === distRight) { nx = 1; ny = 0; dist = -distRight; }
        else if (minDist === distTop) { nx = 0; ny = -1; dist = -distTop; }
        else { nx = 0; ny = 1; dist = -distBottom; }
      } else {
        dist = Math.sqrt(distSq);
        nx = dx / dist;
        ny = dy / dist;
      }

      const sup = support(p, nx, ny);
      const penetration = sup - dist;
      if (penetration <= 0) return;

      p.x += nx * penetration;
      p.y += ny * penetration;

      const vDotN = p.vx * nx + p.vy * ny;
      if (vDotN < 0) {
        p.vx -= (1 + obstacleRestitution) * vDotN * nx;
        p.vy -= (1 + obstacleRestitution) * vDotN * ny;
        // No tangential friction — the obstacle surface is intentionally slippery so
        // shapes don't stack on top of the title stack.
        p.settled = false;
      }

      // Slip push: when a shape lands on the top of the obstacle (contact normal
      // pointing upward), nudge it horizontally toward the nearer edge so it
      // slides off instead of resting. Tuned mild.
      if (ny < -0.5) {
        const rectCenterX = (left + right) / 2;
        const halfWidth = (right - left) / 2;
        const offset = p.x - rectCenterX;
        const slipDir = halfWidth > 0 ? offset / halfWidth : 0;
        p.vx += slipDir * 0.175;
        p.settled = false;
      }
    };

    // Resolve a particle against every active rectangular obstacle
    const resolveObstacle = (p: Particle) => {
      for (let i = 0; i < obstacles.length; i++) resolveRect(p, obstacles[i]);
    };

    // Clamp particle within bounds (walls + floor, no ceiling)
    const clampBounds = (p: Particle, w: number, floor: number, scrollV: number = 0) => {
      // Floor
      const supDown = support(p, 0, 1);
      if (p.y + supDown > floor) {
        p.y = floor - supDown;

        if (scrollV > 0) {
          const randomBounce = 0.6 + Math.random() * 1.2;
          p.vy = -scrollV * 0.4 * randomBounce;
          p.vx += (Math.random() - 0.5) * scrollV * 0.25;
          p.rotationSpeed += (Math.random() - 0.5) * 0.06;
          p.settled = false;
        } else if (p.vy > 0) {
          p.vy = -p.vy * floorBounce;
          p.vx *= groundFriction;
          p.rotationSpeed = p.vx * 0.003;
        }

        if (Math.abs(p.vy) < settleThreshold && Math.abs(p.vx) < settleThreshold && scrollV <= 0) {
          p.settled = true;
          p.vy = 0;
          p.vx = 0;
          // Hard-zero rotation on settle — prevents semicircle support values from drifting
          // between frames and causing perpetual re-collision jitter.
          p.rotationSpeed = 0;
        } else {
          p.settled = false;
        }
      }
      // Walls
      const supLeft = support(p, -1, 0);
      if (p.x - supLeft < 0) {
        p.x = supLeft;
        if (p.vx < 0) p.vx = -p.vx * wallBounce;
      }
      const supRight = support(p, 1, 0);
      if (p.x + supRight > w) {
        p.x = w - supRight;
        if (p.vx > 0) p.vx = -p.vx * wallBounce;
      }
    };

    // Particle-to-particle collision — mass-weighted impulse.
    // Uses the support function so semicircles collide only where they actually exist.
    const resolveCollisions = (floor: number, w: number, scrollV: number = 0) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Cheap reject on bounding-sphere sum
          if (dist >= a.radius + b.radius || dist <= 0.01) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          // True combined extent along the separating direction (respects semicircle shape)
          const minDist = support(a, nx, ny) + support(b, -nx, -ny);

          if (dist < minDist) {
            const overlap = minDist - dist;
            const aDragged = dragIndex === i;
            const bDragged = dragIndex === j;

            // Slop: allow a small residual overlap so shapes can subtly nest
            // together instead of resting on a razor-thin contact line.
            const slop = minDist * 0.08;
            const correction = Math.max(0, overlap - slop);

            // Positional correction weighted by inverse mass — dragged item is treated as infinite mass
            if (aDragged) {
              b.x += nx * correction;
              b.y += ny * correction;
            } else if (bDragged) {
              a.x -= nx * correction;
              a.y -= ny * correction;
            } else {
              const total = a.invMass + b.invMass;
              const aShare = a.invMass / total;
              const bShare = b.invMass / total;
              a.x -= nx * correction * aShare;
              a.y -= ny * correction * aShare;
              b.x += nx * correction * bShare;
              b.y += ny * correction * bShare;
            }

            const dvx = b.vx - a.vx;
            const dvy = b.vy - a.vy;
            const dvDotN = dvx * nx + dvy * ny;

            if (dvDotN < 0) {
              const invMassA = aDragged ? 0 : a.invMass;
              const invMassB = bDragged ? 0 : b.invMass;
              const invMassSum = invMassA + invMassB;
              if (invMassSum > 0) {
                const j_ = -(1 + restitution) * dvDotN / invMassSum;
                const impX = j_ * nx;
                const impY = j_ * ny;
                if (!aDragged) {
                  a.vx -= impX * invMassA;
                  a.vy -= impY * invMassA;
                  a.settled = false;
                }
                if (!bDragged) {
                  b.vx += impX * invMassB;
                  b.vy += impY * invMassB;
                  b.settled = false;
                }
                // Rotation from tangential component
                const tx = -ny;
                const ty = nx;
                const dvt = dvx * tx + dvy * ty;
                if (!aDragged) a.rotationSpeed += dvt * 0.002 * a.invMass;
                if (!bDragged) b.rotationSpeed -= dvt * 0.002 * b.invMass;
              }
            }

            clampBounds(a, w, floor, scrollV);
            clampBounds(b, w, floor, scrollV);
            resolveObstacle(a);
            resolveObstacle(b);
          }
        }
      }
    };

    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hit test — accurate point-in-shape (semicircles only grab in the visible half),
    // with a small extra grow to keep small confetti easy to catch.
    const hitTest = (mx: number, my: number): number => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (containsPoint(p, mx, my)) return i;
      }
      // Second pass with a slight bounding-circle margin for touch/mouse ergonomics
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const grab = p.radius * 1.15;
        if (dx * dx + dy * dy <= grab * grab) {
          // For semicircles, only accept if we're on the visible side
          if (p.shape === "semicircle") {
            const cos = Math.cos(p.rotation);
            const sin = Math.sin(p.rotation);
            const ly = -dx * sin + dy * cos;
            if (ly < 0) continue;
          }
          return i;
        }
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
      if (dragIndex < 0) return;
      const pos = getCanvasPos(e);
      const p = particles[dragIndex];
      p.x = pos.x - dragOffsetX;
      p.y = pos.y - dragOffsetY;
      throwVx = throwVx * 0.6 + (pos.x - prevMouseX) * 0.4;
      throwVy = throwVy * 0.6 + (pos.y - prevMouseY) * 0.4;
      prevMouseX = pos.x;
      prevMouseY = pos.y;
    };

    const releaseDragged = () => {
      if (dragIndex < 0) return;
      const p = particles[dragIndex];
      // Cap throw velocity to prevent tunneling
      let vx = throwVx * 1.8;
      let vy = throwVy * 1.8;
      const speed = Math.hypot(vx, vy);
      if (speed > maxVel) {
        vx = (vx / speed) * maxVel;
        vy = (vy / speed) * maxVel;
      }
      p.vx = vx;
      p.vy = vy;
      // Angular impulse from the fling — heavier things spin less
      p.rotationSpeed += (vx * 0.006 - vy * 0.006) * p.invMass;
      p.settled = false;
      dragIndex = -1;
    };

    const onMouseUp = () => releaseDragged();

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
        releaseDragged();
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

    const stepPhysics = (w: number, floor: number, scrollV: number, dt: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const isDragged = i === dragIndex;

        if (!p.settled && !isDragged) {
          p.vy += gravity * dt;
          const drag = Math.pow(airResistance, dt);
          p.vx *= drag;
          p.vy *= drag;

          // Clamp velocity magnitude to avoid tunneling
          const spd = Math.hypot(p.vx, p.vy);
          if (spd > maxVel) {
            p.vx = (p.vx / spd) * maxVel;
            p.vy = (p.vy / spd) * maxVel;
          }

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          p.rotation += p.rotationSpeed * dt;
          p.rotationSpeed *= Math.pow(0.96, dt);
          if (p.rotationSpeed > 0.05) p.rotationSpeed = 0.05;
          if (p.rotationSpeed < -0.05) p.rotationSpeed = -0.05;

          clampBounds(p, w, floor, scrollV);
          resolveObstacle(p);
        } else if (p.settled) {
          // Use the true downward extent — critical for semicircles, otherwise
          // this branch would snap them up by ~R every frame and cause a visible jump.
          const restSup = support(p, 0, 1);
          if (p.y + restSup > floor) {
            p.y = floor - restSup;
            if (scrollV > 0) {
               p.settled = false;
               const randomBounce = 0.6 + Math.random() * 1.2;
               p.vy = -scrollV * 0.4 * randomBounce;
               p.vx += (Math.random() - 0.5) * scrollV * 0.25;
               p.rotationSpeed += (Math.random() - 0.5) * 0.06;
            }
          }
          if (obstacles.length) {
            const before = { x: p.x, y: p.y };
            resolveObstacle(p);
            if (p.x !== before.x || p.y !== before.y) {
              p.settled = false;
              p.vy = -1;
            }
          }
        }

        if (isDragged) {
          p.x = Math.max(support(p, -1, 0), Math.min(w - support(p, 1, 0), p.x));
          p.y = Math.min(floor - support(p, 0, 1), p.y);
        }
      }

      resolveCollisions(floor, w, scrollV);
    };

    // Pop cycle: one shape pops per interval; when all are gone, respawn full batch.
    // Cycle only starts after an initial grace period so the hero can breathe.
    // Timing tuned so the full pop-through of a batch spans ≥15 minutes.
    const popStartDelayMs = 120_000; // 2 min grace before first pop
    const popIntervalMs = 80_000; // ~80s between pops → 12 shapes × 80s ≈ 16 min per cycle
    const popDurationMs = 500; // faster, snappier pop
    const respawnDelayMs = 1200;
    const pageLoadAt = performance.now();
    let nextPopAt = pageLoadAt + popStartDelayMs;
    let respawnAt = 0;

    const tickPopCycle = (now: number) => {
      // Don't do anything before the cycle begins
      if (now < pageLoadAt + popStartDelayMs) return;

      // Remove particles whose pop animation finished
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.popping && now - p.popStart >= popDurationMs) {
          particles.splice(i, 1);
          if (dragIndex === i) dragIndex = -1;
          else if (dragIndex > i) dragIndex--;
        }
      }

      // If everything is gone, schedule a respawn
      if (particles.length === 0) {
        if (respawnAt === 0) respawnAt = now + respawnDelayMs;
        if (now >= respawnAt) {
          buildParticles();
          respawnAt = 0;
          nextPopAt = now + popIntervalMs;
        }
        return;
      }

      // Mark the next particle to start popping
      if (now >= nextPopAt) {
        const candidates: number[] = [];
        for (let i = 0; i < particles.length; i++) {
          if (!particles[i].popping && i !== dragIndex) candidates.push(i);
        }
        if (candidates.length > 0) {
          const target = candidates[Math.floor(Math.random() * candidates.length)];
          particles[target].popping = true;
          particles[target].popStart = now;
          particles[target].settled = false;
          // Very subtle nudge — the pop itself carries the personality now
          particles[target].vy -= 0.3;
          particles[target].vx += (Math.random() - 0.5) * 0.25;
          particles[target].rotationSpeed += (Math.random() - 0.5) * 0.03;
        }
        nextPopAt = now + popIntervalMs;
      }
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const scrollV = scrollY - lastScrollY;
      lastScrollY = scrollY;
      const floor = h - floorOffset - scrollY;

      tickPopCycle(performance.now());
      updateObstacles();

      // Substep physics for stability + accurate collision under fast motion
      const dt = 1 / substeps;
      for (let s = 0; s < substeps; s++) {
        stepPhysics(w, floor, scrollV / substeps, dt);
      }

      ctx.clearRect(0, 0, w, h);

      const drawNow = performance.now();

      const drawParticle = (p: Particle) => {
        // Pop animation — two-phase, toned-down:
        //   Anticipation (0-15%): small squash up to 1.08
        //   Burst (15-100%): quick shrink + fade
        let popScale = 1;
        let popAlpha = 1;
        let ringRadius = 0;
        let ringAlpha = 0;
        if (p.popping) {
          const t = Math.min(1, (drawNow - p.popStart) / popDurationMs);
          const anticipationEnd = 0.15;
          if (t < anticipationEnd) {
            const u = t / anticipationEnd;
            const e = 1 - Math.pow(1 - u, 2);
            popScale = 1 + 0.08 * e;
            popAlpha = 1;
          } else {
            const u = (t - anticipationEnd) / (1 - anticipationEnd);
            const e = 1 - Math.pow(1 - u, 2.4);
            popScale = 1.08 - (1.08 - 0.1) * e;
            popAlpha = 1 - Math.pow(u, 1.4);
          }
          ringRadius = p.radius * (1 + t * 0.9);
          ringAlpha = (1 - t) * 0.28;
        }

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.popping && ringAlpha > 0.01) {
          ctx.globalAlpha = ringAlpha;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(0.75, p.radius * 0.045 * (1 - Math.min(1, (drawNow - p.popStart) / popDurationMs)));
          ctx.beginPath();
          ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.rotate(p.rotation);
        if (popScale !== 1) ctx.scale(popScale, popScale);

        const tracePath = () => {
          ctx.beginPath();
          if (p.shape === "circle") {
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          } else {
            ctx.arc(0, 0, p.radius, 0, Math.PI);
            ctx.closePath();
          }
        };

        if (p.hasGlow) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.radius * 0.5;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.globalAlpha = p.glowIntensity * 0.35 * popAlpha;
          ctx.fillStyle = p.color;
          tracePath();
          ctx.fill();
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = p.opacity * popAlpha;
        ctx.fillStyle = p.color;
        tracePath();
        ctx.fill();

        const isTeal = p.color === colors[0];
        if (!p.solid && !isTeal) {
          const frostGrad = ctx.createRadialGradient(
            -p.radius * 0.25, -p.radius * 0.25, 0,
            0, 0, p.radius
          );
          frostGrad.addColorStop(0, `rgba(255,255,255,${p.frostOpacity * 0.8})`);
          frostGrad.addColorStop(0.35, `rgba(255,255,255,${p.frostOpacity * 0.15})`);
          frostGrad.addColorStop(1, "rgba(255,255,255,0)");

          ctx.globalAlpha = popAlpha;
          ctx.fillStyle = frostGrad;
          tracePath();
          ctx.fill();

          ctx.globalAlpha = p.frostOpacity * 0.35 * popAlpha;
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          if (p.shape === "circle") {
            ctx.arc(0, 0, p.radius - 0.5, 0, Math.PI * 2);
          } else {
            ctx.arc(0, 0, p.radius - 0.5, 0, Math.PI);
            ctx.closePath();
          }
          ctx.stroke();
        }

        ctx.restore();
      };

      for (let i = 0; i < particles.length; i++) {
        drawParticle(particles[i]);
      }

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
        // All particles now share the same size, so update everyone
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
      window.removeEventListener("scroll", onScroll);
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
