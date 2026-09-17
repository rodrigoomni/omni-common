"use client";

import { useEffect, useRef } from "react";

/**
 * Omni Common "What You Get" wheel — 3D glass segments with mouse-driven
 * perspective, hover pop-up (others fall to wireframe), levitation, roaming
 * specular highlight, and a floating category tag. Ported from
 * assets/oc-what-you-get-wheel-v24.html.
 */
export interface ServicesWheelProps {
  className?: string;
}

// Omni Common brand palette (mirrors CSS vars in globals.css)
const IVORY = "#FFFDEF";
const MINT = "#A5FDF3";
const LIME = "#CFFC68";
const DARK = "#0A2B47";

// Secondary accent hexes carried over from the earlier prototype — used to
// break up an otherwise all-green-and-mint wheel.
const PURPLE = "#7B84DC";
const PURPLE_LIGHT = "#B9BFF7";
const ORANGE = "#E8963F";
const ORANGE_LIGHT = "#F8C58E";
const PINK = "#E85D9A";
const PINK_LIGHT = "#F5A9C7";

// alias for the coreGlow gradient (kept for readability)
const BLUE = MINT;

type ServiceMat = {
  frost: number;
  op: number;
  refl: number;
  /**
   * Multiplies the bottom-of-gradient DARK blend (default 1). Higher values
   * push the base of the wedge deeper into shadow — makes the piece read
   * as heavier / more "gloomy" at rest, closer to how it looks on hover.
   */
  gloom?: number;
};
type Service = {
  name: string;
  measure: string;
  base: string;
  glow: string;
  sweep: number;
  r: number;
  ex: number;
  mat: ServiceMat;
};

// Recipe for "Predictable, Scalable, Profitable Growth". Slice sweep is
// roughly proportional to the recipe amount (10 lbs → biggest wedge,
// a "dash" → smallest sliver). Colors from the Omni brand palette.
const SERVICES: Service[] = [
  {
    name: "Senior insight",
    measure: "10 lbs",
    base: LIME,
    glow: LIME,
    sweep: 110,
    r: 1.06,
    ex: 4,
    // Most prominent wedge — pushed solid + deep gloom so it dominates at rest.
    mat: { frost: 0.85, op: 1.6, refl: 1.15, gloom: 1.9 },
  },
  {
    name: "Customer research",
    measure: "2 lbs",
    base: PURPLE,
    glow: PURPLE_LIGHT,
    sweep: 72,
    r: 1.02,
    ex: 5,
    mat: { frost: 0.8, op: 0.72, refl: 1.2 },
  },
  {
    name: "Data triangulation",
    measure: "2 cups",
    base: MINT,
    glow: MINT,
    sweep: 68,
    r: 1.0,
    ex: 5,
    // Second-most solid — a little less than LIME but well above the others.
    mat: { frost: 0.6, op: 1.35, refl: 1.3, gloom: 1.55 },
  },
  {
    name: "AI attribution",
    measure: "1 cup",
    base: ORANGE,
    glow: ORANGE_LIGHT,
    sweep: 55,
    r: 0.95,
    ex: 6,
    mat: { frost: 1.65, op: 0.95, refl: 0.5 },
  },
  {
    name: "Secret sauce",
    measure: "a dash",
    base: PINK,
    glow: PINK_LIGHT,
    sweep: 32,
    r: 0.92,
    ex: 8,
    // Deep gloom at the base gives it that glowing-ember, "hot" feel while
    // op stays low enough for the wedge to keep its translucency.
    mat: { frost: 0.25, op: 0.7, refl: 0.9, gloom: 2.4 },
  },
];

// geometry
const W = 1000;
const H = 700;
const CX = 500;
const CY = 258;
const RX = 250;
const RY = 140;
const IRX = 56;
const IRY = 31.5;
const DEPTH = 82;
const GAP = 1;
const START = -104;
const TAU = Math.PI * 2;
const NS = "http://www.w3.org/2000/svg";

function mix(hexA: string, hexB: string, t: number) {
  const a = hexA.replace("#", "");
  const b = hexB.replace("#", "");
  const c = (i: number) =>
    Math.round(
      parseInt(a.substr(i, 2), 16) * (1 - t) +
        parseInt(b.substr(i, 2), 16) * t,
    )
      .toString(16)
      .padStart(2, "0");
  return "#" + c(0) + c(2) + c(4);
}

function lum(h: string) {
  const n = h.replace("#", "");
  return (
    (0.2126 * parseInt(n.substr(0, 2), 16) +
      0.7152 * parseInt(n.substr(2, 2), 16) +
      0.0722 * parseInt(n.substr(4, 2), 16)) /
    255
  );
}

const rad = (d: number) => (d * Math.PI) / 180;
const f = (n: number) => n.toFixed(2);

function radii(t: number, seg: Service): [number, number] {
  return [IRX + (RX * seg.r - IRX) * t, IRY + (RY * seg.r - IRY) * t];
}

const pt = (
  a: number,
  rx: number,
  ry: number,
  dx: number,
  dy: number,
): [number, number] => [CX + dx + rx * Math.cos(a), CY + dy + ry * Math.sin(a)];

function arc(
  rx: number,
  ry: number,
  a1: number,
  a2: number,
  sweepFlag: 0 | 1,
  dx: number,
  dy: number,
) {
  const [x, y] = pt(a2, rx, ry, dx, dy);
  const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
  return `A ${f(rx)} ${f(ry)} 0 ${large} ${sweepFlag} ${f(x)} ${f(y)}`;
}

function face(
  seg: Service,
  a1: number,
  a2: number,
  t0: number,
  t1: number,
  dx: number,
  dy: number,
  lift = 0,
) {
  const [irx, iry] = radii(t0, seg);
  const [orx, ory] = radii(t1, seg);
  const [ix, iy] = pt(a1, irx, iry, dx, dy + lift);
  const [ox, oy] = pt(a1, orx, ory, dx, dy + lift);
  const [ix2, iy2] = pt(a2, irx, iry, dx, dy + lift);
  return (
    `M ${f(ix)} ${f(iy)} L ${f(ox)} ${f(oy)} ` +
    arc(orx, ory, a1, a2, 1, dx, dy + lift) +
    ` L ${f(ix2)} ${f(iy2)} ` +
    arc(irx, iry, a2, a1, 0, dx, dy + lift) +
    " Z"
  );
}

function radialFace(
  seg: Service,
  a: number,
  t0: number,
  t1: number,
  dx: number,
  dy: number,
) {
  const [irx, iry] = radii(t0, seg);
  const [orx, ory] = radii(t1, seg);
  const [ix, iy] = pt(a, irx, iry, dx, dy);
  const [ox, oy] = pt(a, orx, ory, dx, dy);
  return `M ${f(ix)} ${f(iy)} L ${f(ox)} ${f(oy)} L ${f(ox)} ${f(oy + DEPTH)} L ${f(ix)} ${f(iy + DEPTH)} Z`;
}

function curvedWall(
  seg: Service,
  a1: number,
  a2: number,
  t: number,
  dx: number,
  dy: number,
  side: "front" | "back",
) {
  const [orx, ory] = radii(t, seg);
  let s = a1;
  let e = a2;
  while (s < 0) {
    s += TAU;
    e += TAU;
  }
  const wins: [number, number][] =
    side === "front"
      ? [
          [0, Math.PI],
          [TAU, TAU + Math.PI],
        ]
      : [
          [Math.PI, TAU],
          [TAU + Math.PI, 2 * TAU],
        ];
  const paths: string[] = [];
  for (const [w1, w2] of wins) {
    const cs = Math.max(s, w1);
    const ce = Math.min(e, w2);
    if (ce - cs > 0.01) {
      const [x, y] = pt(cs, orx, ory, dx, dy);
      const [bx, by] = pt(ce, orx, ory, dx, dy + DEPTH);
      paths.push(
        `M ${f(x)} ${f(y)} ` +
          arc(orx, ory, cs, ce, 1, dx, dy) +
          ` L ${f(bx)} ${f(by)} ` +
          arc(orx, ory, ce, cs, 0, dx, dy + DEPTH) +
          " Z",
      );
    }
  }
  return paths.join(" ");
}

function el(tag: string, attrs: Record<string, string | number> = {}) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  return n;
}

export function ServicesWheel({ className = "" }: ServicesWheelProps) {
  const figureRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    const tag = tagRef.current;
    if (!figure || !stage || !scene || !tag) return;

    // ---- build SVG scaffold ----
    // Tight viewBox — crops the empty air around the wheel so it fills its
    // container. SVG `overflow: visible` lets hover pop-ups & the connector
    // tag still render past these bounds.
    const svg = el("svg", {
      viewBox: `140 40 720 520`,
      fill: "none",
      "aria-hidden": "true",
    }) as SVGSVGElement;
    const defs = el("defs");

    // Opacity boost — pushes each fill toward solid so the default state
    // reads heavier / less translucent. Hover still saturates further.
    const OPACITY_BOOST = 1.5;

    SERVICES.forEach((s, i) => {
      const top = el("linearGradient", {
        id: "grad" + i,
        x1: "0",
        y1: "0",
        x2: "0.35",
        y2: "1",
      });
      const L = lum(s.base);
      const M = s.mat;
      const cap = (v: number) =>
        Math.min(0.97, Math.max(0.06, v)).toFixed(2);
      top.append(
        el("stop", {
          offset: "0%",
          "stop-color": mix(s.base, IVORY, Math.min(0.9, 0.5 + 0.24 * M.frost)),
          "stop-opacity": cap((0.62 - L * 0.1) * M.op * OPACITY_BOOST),
        }),
        el("stop", {
          offset: "55%",
          "stop-color": mix(
            s.base,
            IVORY,
            Math.min(0.8, 0.26 + 0.16 * M.frost),
          ),
          "stop-opacity": cap((0.46 - L * 0.08) * M.op * OPACITY_BOOST),
        }),
        el("stop", {
          offset: "100%",
          "stop-color": mix(
            mix(s.base, IVORY, 0.12 * M.frost),
            DARK,
            Math.min(0.6, 0.2 * (M.gloom ?? 1)),
          ),
          "stop-opacity": cap((0.56 - L * 0.08) * M.op * OPACITY_BOOST),
        }),
      );
      const wall = el("linearGradient", {
        id: "wall" + i,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
      });
      wall.append(
        el("stop", {
          offset: "0%",
          "stop-color": mix(s.base, DARK, 0.3),
          "stop-opacity": cap(0.5 * M.op * OPACITY_BOOST),
        }),
        el("stop", {
          offset: "45%",
          "stop-color": mix(s.base, DARK, 0.3),
          "stop-opacity": cap(0.6 * M.op * OPACITY_BOOST),
        }),
        el("stop", {
          offset: "100%",
          "stop-color": mix(s.base, DARK, 0.55),
          "stop-opacity": cap(0.72 * M.op * OPACITY_BOOST),
        }),
      );
      defs.append(top, wall);
    });

    const coreGlow = el("radialGradient", { id: "coreGlow" });
    coreGlow.append(
      el("stop", {
        offset: "0%",
        "stop-color": IVORY,
        "stop-opacity": "0.4",
      }),
      el("stop", {
        offset: "40%",
        "stop-color": BLUE,
        "stop-opacity": "0.12",
      }),
      el("stop", { offset: "100%", "stop-color": BLUE, "stop-opacity": "0" }),
    );
    const specGrad = el("radialGradient", { id: "specGrad" });
    specGrad.append(
      el("stop", {
        offset: "0%",
        "stop-color": IVORY,
        "stop-opacity": "0.14",
      }),
      el("stop", {
        offset: "60%",
        "stop-color": IVORY,
        "stop-opacity": "0.035",
      }),
      el("stop", { offset: "100%", "stop-color": IVORY, "stop-opacity": "0" }),
    );
    const floorGrad = el("radialGradient", { id: "floorGrad" });
    floorGrad.append(
      el("stop", {
        offset: "0%",
        "stop-color": "#000000",
        "stop-opacity": "0.62",
      }),
      el("stop", {
        offset: "100%",
        "stop-color": "#000000",
        "stop-opacity": "0",
      }),
    );
    const blurA = el("filter", {
      id: "blurA",
      x: "-40%",
      y: "-40%",
      width: "180%",
      height: "180%",
    });
    blurA.appendChild(el("feGaussianBlur", { stdDeviation: "22" }));
    const blurB = el("filter", {
      id: "blurB",
      x: "-40%",
      y: "-40%",
      width: "180%",
      height: "180%",
    });
    blurB.appendChild(el("feGaussianBlur", { stdDeviation: "8" }));
    defs.append(coreGlow, specGrad, floorGrad, blurA, blurB);
    svg.appendChild(defs);

    // floor shadow
    const floor = el("ellipse", {
      class: "sw-core-glow sw-floor",
      cx: CX,
      cy: CY + DEPTH + 160,
      rx: RX * 0.84,
      ry: 42,
      fill: "url(#floorGrad)",
    });
    svg.appendChild(floor);

    // back glow through open core
    const glowBack = el("ellipse", {
      class: "sw-core-glow",
      cx: CX,
      cy: CY + DEPTH / 2,
      rx: RX * 0.85,
      ry: RY * 0.95,
      fill: "url(#coreGlow)",
    });
    svg.appendChild(glowBack);

    // segments
    const totalSweep = SERVICES.reduce((t, s) => t + s.sweep, 0);
    const scale = (360 - GAP * SERVICES.length) / totalSweep;
    let cursor = START;

    // Rich per-segment record — holds every path whose `d` depends on the
    // segment's current angles, so drag rotation can update them in place
    // without touching the DOM structure.
    type Seg = {
      g: SVGGElement;
      s: Service;
      a1_base: number;
      a2_base: number;
      mid: number;
      topSlab: SVGPathElement;
      backWall: SVGPathElement;
      leftRadial: SVGPathElement;
      rightRadial: SVGPathElement;
      frontWall: SVGPathElement;
      topEl: SVGPathElement;
      clipPath: SVGPathElement;
      lit: SVGPathElement;
      dark: SVGPathElement;
      edgeStroke: SVGPathElement;
      wireTop: SVGPathElement;
      wireBottom: SVGPathElement;
      wireLines: SVGLineElement[];
    };
    const segs: Seg[] = [];

    SERVICES.forEach((s, i) => {
      const a1_base = rad(cursor + GAP / 2);
      const a2_base = a1_base + rad(s.sweep * scale);
      cursor += s.sweep * scale + GAP;
      const a1 = a1_base;
      const a2 = a2_base;
      const m = (a1 + a2) / 2;
      const dx = s.ex * Math.cos(m);
      const dy = s.ex * (RY / RX) * Math.sin(m);

      const g = el("g", {
        class: "sw-seg sw-pre sw-intro",
        "data-i": i,
      }) as SVGGElement;
      g.style.setProperty("--ix", (Math.cos(m) * 42).toFixed(1) + "px");
      g.style.setProperty("--iy", (Math.sin(m) * 24 + 50).toFixed(1) + "px");
      const [gx, gy] = radii(0.55, s);
      g.style.transformOrigin = `${(CX + dx + gx * Math.cos(m)).toFixed(1)}px ${(CY + dy + gy * Math.sin(m)).toFixed(1)}px`;
      g.style.setProperty("--glow", s.glow);
      g.style.setProperty("--glow-soft", s.glow + "40");

      const topSlab = el("path", {
        d: face(s, a1, a2, 0, 1, dx, dy, DEPTH),
        fill: mix(s.base, DARK, 0.5),
        opacity: "0.55",
      }) as SVGPathElement;
      g.appendChild(topSlab);

      // Back inner wall — may be empty if no back-facing arc is visible;
      // we still keep the node so rotation can populate it later.
      const backWall = el("path", {
        d: curvedWall(s, a1, a2, 0, dx, dy, "back") || "",
        fill: mix(s.base, DARK, 0.45),
        opacity: "0.6",
      }) as SVGPathElement;
      g.appendChild(backWall);

      const leftRadial = el("path", {
        d: radialFace(s, a1, 0, 1, dx, dy),
        fill: `url(#wall${i})`,
      }) as SVGPathElement;
      g.appendChild(leftRadial);

      const rightRadial = el("path", {
        d: radialFace(s, a2, 0, 1, dx, dy),
        fill: `url(#wall${i})`,
      }) as SVGPathElement;
      g.appendChild(rightRadial);

      const frontWall = el("path", {
        d: curvedWall(s, a1, a2, 1, dx, dy, "front") || "",
        fill: `url(#wall${i})`,
      }) as SVGPathElement;
      g.appendChild(frontWall);

      const topEl = el("path", {
        d: face(s, a1, a2, 0, 1, dx, dy),
        fill: `url(#grad${i})`,
      }) as SVGPathElement;
      g.appendChild(topEl);

      const topD = face(s, a1, a2, 0, 1, dx, dy);
      const clip = el("clipPath", { id: "clip" + i });
      const clipPath = el("path", { d: topD }) as SVGPathElement;
      clip.appendChild(clipPath);
      defs.appendChild(clip);
      const Ls = lum(s.base);
      const Ms = s.mat;
      const glass = el("g", { "clip-path": `url(#clip${i})` });
      const st1 = el("path", {
        d: "M 90 40 L 940 240 L 880 380 L 30 180 Z",
        fill: IVORY,
        opacity: ((0.12 + (1 - Ls) * 0.08) * Ms.refl).toFixed(3),
        filter: "url(#blurA)",
      }) as SVGPathElement;
      const st2 = el("path", {
        d: "M 190 120 L 910 292 L 892 334 L 172 162 Z",
        fill: IVORY,
        opacity: ((0.17 + (1 - Ls) * 0.1) * Ms.refl).toFixed(3),
        filter: "url(#blurB)",
      }) as SVGPathElement;
      glass.append(st1, st2);
      g.appendChild(glass);

      const lit = el("path", {
        d: topD,
        fill: IVORY,
        opacity: "0.07",
      }) as SVGPathElement;
      const dark = el("path", {
        d: topD,
        fill: DARK,
        opacity: "0.05",
      }) as SVGPathElement;
      g.append(lit, dark);

      const edgeStroke = el("path", {
        d: topD,
        fill: "none",
        stroke: mix(s.base, IVORY, 0.88),
        "stroke-width": "1.1",
        "stroke-opacity": (0.55 + (1 - Ls) * 0.25).toFixed(2),
        "stroke-linejoin": "round",
      }) as SVGPathElement;
      g.appendChild(edgeStroke);

      // wireframe (shown when a sibling is hot)
      const wire = el("g", {
        class: "sw-wire",
        stroke: s.glow,
        "stroke-width": "1",
        "stroke-opacity": "0.8",
        fill: "none",
        "stroke-linejoin": "round",
      });
      const wireTop = el("path", { d: topD }) as SVGPathElement;
      const wireBottom = el("path", {
        d: face(s, a1, a2, 0, 1, dx, dy, DEPTH),
      }) as SVGPathElement;
      wire.append(wireTop, wireBottom);
      const wireLines: SVGLineElement[] = [];
      const corners: Array<[number, 0 | 1]> = [
        [a1, 0],
        [a1, 1],
        [a2, 0],
        [a2, 1],
      ];
      corners.forEach(([wa, wt]) => {
        const [wrx, wry] = radii(wt, s);
        const [wx, wy] = pt(wa, wrx, wry, dx, dy);
        const line = el("line", {
          x1: wx.toFixed(1),
          y1: wy.toFixed(1),
          x2: wx.toFixed(1),
          y2: (wy + DEPTH).toFixed(1),
        }) as SVGLineElement;
        wire.appendChild(line);
        wireLines.push(line);
      });

      // levitation group wraps solid + wire
      const solid = el("g", { class: "sw-solid" });
      while (g.firstChild) solid.appendChild(g.firstChild);
      const fg = el("g", { class: "sw-float" });
      fg.append(solid, wire);
      g.appendChild(fg);
      fg.style.setProperty("--fdur", (4.1 + i * 0.45).toFixed(2) + "s");
      fg.style.setProperty("--fdel", (-i * 1.15).toFixed(2) + "s");
      fg.style.setProperty("--famp", -(7 + (i % 3) * 2) + "px");

      g.dataset.sin = String(Math.sin(m));
      segs.push({
        g,
        s,
        a1_base,
        a2_base,
        mid: m,
        topSlab,
        backWall,
        leftRadial,
        rightRadial,
        frontWall,
        topEl,
        clipPath,
        lit,
        dark,
        edgeStroke,
        wireTop,
        wireBottom,
        wireLines,
      });
    });

    // painter's algorithm — draw back segments first
    segs
      .slice()
      .sort(
        (a, b) => Number(a.g.dataset.sin) - Number(b.g.dataset.sin),
      )
      .forEach((s) => svg.appendChild(s.g));

    const spec = el("ellipse", {
      class: "sw-spec",
      cx: CX - 60,
      cy: CY - 40,
      rx: 170,
      ry: 96,
      fill: "url(#specGrad)",
    });
    svg.appendChild(spec);

    scene.innerHTML = "";
    scene.appendChild(svg);

    // ---- drag-to-spin state ----
    // `rotation` is a running angular offset (radians) added to every
    // segment's base angle. `vel` decays each frame after release for a
    // natural spin. `isDragging` gates hover so segments don't hot/dim
    // while the user is throwing the wheel around.
    let rotation = 0;
    let vel = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMoveT = 0;
    let raf = 0;

    // Vertical drag → gentle up/down camera tilt around the horizontal
    // axis. Clamped tight (±8°) so it stays a subtle nudge rather than
    // spinning the wheel over.
    let tiltDeg = 0;
    const TILT_MAX = 8;
    const TILT_SENS = 0.06;
    const BASE_TILT = 2;

    // Return-home: 1 min after the last drag, gently ease rotation + tilt
    // back to the starting pose. Resets on every drag.
    const IDLE_MS = 60_000;
    const RETURN_MS = 1400;
    let idleTimer = 0;

    // ---- hover / hot & dim ----
    let activeIdx: number | null = null;

    function renderConnector(i: number) {
      if (!figure || !tag) return;
      const fr = figure.getBoundingClientRect();
      const sr = segs[i].topEl.getBoundingClientRect();
      const wr = stage!.getBoundingClientRect();
      const cx0 = wr.left + wr.width / 2 - fr.left;
      const cy0 = wr.top + wr.height / 2 - fr.top;
      const ax = sr.left + sr.width / 2 - fr.left;
      const ay = sr.top + sr.height / 2 - fr.top;

      // Unit ray from wheel center through the wedge's bounding-box center.
      let vx = ax - cx0;
      let vy = ay - cy0;
      const vl = Math.hypot(vx, vy) || 1;
      vx /= vl;
      vy /= vl;

      // Walk outward on that ray to the wedge's outer bounding edge, plus
      // a little padding — this is where the tag's inner edge should land.
      const bx1 = sr.left - fr.left;
      const bx2 = sr.right - fr.left;
      const by1 = sr.top - fr.top;
      const by2 = sr.bottom - fr.top;
      const tX =
        vx > 0 ? (bx2 - ax) / vx : vx < 0 ? (bx1 - ax) / vx : 1e9;
      const tY =
        vy > 0 ? (by2 - ay) / vy : vy < 0 ? (by1 - ay) / vy : 1e9;
      const out = Math.min(tX, tY) + 12;
      const endX = ax + vx * out;
      const endY = ay + vy * out;

      // Consistent radial placement: place the tag so its nearest edge sits
      // right at (endX, endY), regardless of the wedge's angle. Uses a
      // rectangle-ray intersection to find how far past the tag's center
      // to push it out on the ray (halfW/|vx| vs halfH/|vy|, min wins).
      const trect = tag.getBoundingClientRect();
      const halfW = trect.width / 2;
      const halfH = trect.height / 2;
      const rectR = Math.min(
        halfW / Math.max(0.001, Math.abs(vx)),
        halfH / Math.max(0.001, Math.abs(vy)),
      );
      const GAP_PX = 8;
      const cx = endX + vx * (rectR + GAP_PX);
      const cy = endY + vy * (rectR + GAP_PX);

      tag.style.left = "0px";
      tag.style.top = "0px";
      tag.style.transform = `translate(${(cx - halfW).toFixed(1)}px, ${(cy - halfH).toFixed(1)}px)`;
    }

    function showConnector(i: number) {
      if (!tag) return;
      activeIdx = i;
      const s = SERVICES[i];
      const c = s.glow;
      tag.style.setProperty("--sw-line", c);
      tag.style.color = c;
      // Two-line compact layout: small measure on top, bolder name below.
      tag.innerHTML =
        `<span class="sw-tag__measure">${s.measure}</span>` +
        `<span class="sw-tag__name">${s.name}</span>`;
      renderConnector(i);
      tag.classList.add("on");
    }

    function hideConnector() {
      if (!tag) return;
      activeIdx = null;
      tag.classList.remove("on");
    }

    function hot(i: number, on: boolean) {
      if (isDragging) return;
      segs[i].g.classList.toggle("hot", on);
      segs.forEach((sg, j) => {
        if (j !== i) sg.g.classList.toggle("dim", on);
      });
      if (on) showConnector(i);
      else if (activeIdx === i) hideConnector();
    }

    // ---- rebuild segment geometry on rotation change ----
    // Only rewrites `d` attributes on existing SVG nodes — no DOM creation
    // per frame, so it stays cheap even during aggressive spins.
    const rebuildSegments = () => {
      for (const sg of segs) {
        const s = sg.s;
        const a1 = sg.a1_base + rotation;
        const a2 = sg.a2_base + rotation;
        const m = (a1 + a2) / 2;
        const dx = s.ex * Math.cos(m);
        const dy = s.ex * (RY / RX) * Math.sin(m);

        const topD = face(s, a1, a2, 0, 1, dx, dy);
        const topDdepth = face(s, a1, a2, 0, 1, dx, dy, DEPTH);

        sg.topSlab.setAttribute("d", topDdepth);
        sg.backWall.setAttribute(
          "d",
          curvedWall(s, a1, a2, 0, dx, dy, "back") || "",
        );
        sg.leftRadial.setAttribute("d", radialFace(s, a1, 0, 1, dx, dy));
        sg.rightRadial.setAttribute("d", radialFace(s, a2, 0, 1, dx, dy));
        sg.frontWall.setAttribute(
          "d",
          curvedWall(s, a1, a2, 1, dx, dy, "front") || "",
        );
        sg.topEl.setAttribute("d", topD);
        sg.clipPath.setAttribute("d", topD);
        sg.lit.setAttribute("d", topD);
        sg.dark.setAttribute("d", topD);
        sg.edgeStroke.setAttribute("d", topD);
        sg.wireTop.setAttribute("d", topD);
        sg.wireBottom.setAttribute("d", topDdepth);

        const corners: Array<[number, 0 | 1]> = [
          [a1, 0],
          [a1, 1],
          [a2, 0],
          [a2, 1],
        ];
        corners.forEach(([wa, wt], k) => {
          const [wrx, wry] = radii(wt, s);
          const [wx, wy] = pt(wa, wrx, wry, dx, dy);
          sg.wireLines[k].setAttribute("x1", wx.toFixed(1));
          sg.wireLines[k].setAttribute("y1", wy.toFixed(1));
          sg.wireLines[k].setAttribute("x2", wx.toFixed(1));
          sg.wireLines[k].setAttribute("y2", (wy + DEPTH).toFixed(1));
        });

        sg.mid = m;
        sg.g.dataset.sin = String(Math.sin(m));

        const [gx, gy] = radii(0.55, s);
        sg.g.style.transformOrigin = `${(CX + dx + gx * Math.cos(m)).toFixed(1)}px ${(CY + dy + gy * Math.sin(m)).toFixed(1)}px`;
      }

      // Re-sort in painter's order so the wedge closest to the viewer
      // (highest sin) stays on top as the wheel spins.
      segs
        .slice()
        .sort((a, b) => Math.sin(a.mid) - Math.sin(b.mid))
        .forEach((sg) => svg.appendChild(sg.g));
      // Spec ellipse must stay above the segments.
      svg.appendChild(spec);

      if (activeIdx != null) renderConnector(activeIdx);
    };

    // ---- pointer drag: fling + inertia ----
    const stageEl = stage;

    const cancelInertia = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const clearIdle = () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
        idleTimer = 0;
      }
    };

    const startReturnHome = () => {
      cancelInertia();
      // Take the shortest path back — collapse any accumulated spin down
      // to the equivalent angle in [-π, π] before animating so the user
      // doesn't watch dozens of spins unwind.
      const twoPi = Math.PI * 2;
      let norm = rotation % twoPi;
      if (norm > Math.PI) norm -= twoPi;
      else if (norm < -Math.PI) norm += twoPi;
      rotation = norm;
      rebuildSegments();

      const startTime = performance.now();
      const startRot = rotation;
      const startTilt = tiltDeg;
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / RETURN_MS);
        const e = easeOutCubic(t);
        rotation = startRot * (1 - e);
        tiltDeg = startTilt * (1 - e);
        scene.style.transform = `rotateX(${(BASE_TILT + tiltDeg).toFixed(2)}deg)`;
        rebuildSegments();
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          raf = 0;
        }
      };
      raf = requestAnimationFrame(step);
    };

    const armIdle = () => {
      clearIdle();
      idleTimer = window.setTimeout(startReturnHome, IDLE_MS);
    };
    // Start counting immediately — if the user lands here and never
    // interacts, the wheel is already at rest, so this is a no-op animation.
    armIdle();

    const onDragDown = (e: PointerEvent) => {
      if (e.button != null && e.button !== 0 && e.pointerType === "mouse")
        return;
      cancelInertia();
      clearIdle();
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveT = performance.now();
      vel = 0;
      stageEl.style.cursor = "grabbing";
      try {
        stageEl.setPointerCapture(e.pointerId);
      } catch {
        /* not all browsers on all element types */
      }
      // Any hovered segment should release while spinning.
      segs.forEach((sg) => sg.g.classList.remove("hot", "dim"));
      if (activeIdx != null) hideConnector();
    };

    const onDragMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveT);
      lastMoveT = now;

      const rect = stageEl.getBoundingClientRect();
      // Horizontal: 1 full stage-width = one full spin.
      const sens = (Math.PI * 2) / Math.max(1, rect.width);
      const dtheta = dx * sens;
      rotation += dtheta;
      vel = (dtheta * 16) / dt;

      // Vertical: small clamped camera tilt for a bit of viewing freedom.
      tiltDeg = Math.max(
        -TILT_MAX,
        Math.min(TILT_MAX, tiltDeg + dy * TILT_SENS),
      );
      scene.style.transform = `rotateX(${(BASE_TILT + tiltDeg).toFixed(2)}deg)`;

      rebuildSegments();
    };

    const onDragUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      stageEl.style.cursor = "grab";
      try {
        stageEl.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }

      // Inertia. Friction 0.94 gives a satisfying slow-down (~1.5s to rest
      // from a strong flick) without spinning forever.
      if (Math.abs(vel) > 0.002) {
        const decay = () => {
          rotation += vel;
          vel *= 0.94;
          rebuildSegments();
          if (Math.abs(vel) > 0.002) {
            raf = requestAnimationFrame(decay);
          } else {
            raf = 0;
          }
        };
        raf = requestAnimationFrame(decay);
      }
      // Start the 2-min idle countdown from the moment the user let go.
      armIdle();
    };

    stageEl.addEventListener("pointerdown", onDragDown);
    stageEl.addEventListener("pointermove", onDragMove);
    stageEl.addEventListener("pointerup", onDragUp);
    stageEl.addEventListener("pointercancel", onDragUp);

    // Touch / coarse-pointer devices skip all hover interactivity. The
    // wheel still spins on drag; the color legend below carries the info
    // that the hover tag would have surfaced.
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    const listeners: Array<{
      el: SVGGElement;
      type: string;
      fn: (e: Event) => void;
    }> = [];
    if (!isTouch) {
      segs.forEach(({ g }, i) => {
        const enter = () => hot(i, true);
        const leave = () => hot(i, false);
        g.addEventListener("mouseenter", enter);
        g.addEventListener("mouseleave", leave);
        listeners.push(
          { el: g, type: "mouseenter", fn: enter },
          { el: g, type: "mouseleave", fn: leave },
        );
      });
    }

    const onResize = () => {
      if (activeIdx != null) renderConnector(activeIdx);
    };
    window.addEventListener("resize", onResize);

    // Baseline camera tilt. Vertical drag adds to this within TILT_MAX.
    scene.style.transform = `rotateX(${BASE_TILT}deg)`;

    // Bake in a consistent studio light so each piece keeps a top-highlight
    // + bottom-shadow feel now that the mouse loop is gone.
    segs.forEach((sg) => {
      sg.lit.setAttribute("opacity", "0.11");
      sg.dark.setAttribute("opacity", "0.09");
    });

    // Scroll-driven spin: each pixel of vertical scroll nudges the wheel a
    // hair in the scroll direction. Only when the wheel is on screen, so
    // idle sections of the page don't shove it. Also keeps the hover
    // connector pinned during the same handler.
    let prevScrollY =
      typeof window !== "undefined" ? window.scrollY : 0;
    let inView = false;
    const SCROLL_SPIN = 0.00055;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(figure);

    const onScroll = () => {
      if (activeIdx != null) renderConnector(activeIdx);
      const cur = window.scrollY;
      const dy = cur - prevScrollY;
      prevScrollY = cur;
      if (!inView || dy === 0) return;
      rotation += dy * SCROLL_SPIN;
      rebuildSegments();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // orchestrated intro
    const timers: number[] = [];
    requestAnimationFrame(() => {
      segs.forEach(({ g }, k) => {
        const t0 = 140 + k * 110;
        timers.push(
          window.setTimeout(() => g.classList.remove("sw-pre"), t0),
        );
        timers.push(
          window.setTimeout(() => g.classList.remove("sw-intro"), t0 + 900),
        );
      });
    });

    return () => {
      cancelInertia();
      clearIdle();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      stageEl.removeEventListener("pointerdown", onDragDown);
      stageEl.removeEventListener("pointermove", onDragMove);
      stageEl.removeEventListener("pointerup", onDragUp);
      stageEl.removeEventListener("pointercancel", onDragUp);
      listeners.forEach(({ el: e, type, fn }) =>
        e.removeEventListener(type, fn),
      );
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div ref={figureRef} className={`sw-figure relative ${className}`}>
      <div ref={stageRef} className="sw-stage mx-auto w-full">
        <div
          ref={sceneRef}
          className="sw-scene"
          role="img"
          aria-label="3D wheel of five Omni Common services around an open core"
        />
      </div>
      <div ref={tagRef} className="sw-tag" aria-hidden="true" />

      {/* Mobile legend — replaces the hover tag on touch devices. Wraps
          horizontally so the row fills the section's bottom evenly. */}
      <ul className="sw-legend" aria-label="Recipe legend">
        {SERVICES.map((s) => (
          <li key={s.name}>
            <span
              className="sw-legend__bullet"
              style={{ background: s.base }}
              aria-hidden="true"
            />
            <span className="sw-legend__measure">{s.measure}</span>
            <span className="sw-legend__name">{s.name}</span>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .sw-figure {
          width: 100%;
          text-align: center;
        }
        .sw-stage {
          perspective: 900px;
          cursor: grab;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .sw-scene {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .sw-stage :global(svg) {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }
        .sw-stage :global(.sw-seg) {
          cursor: pointer;
          transform-box: view-box;
          transition:
            transform 0.45s cubic-bezier(0.2, 1.25, 0.3, 1.02),
            filter 0.4s ease,
            opacity 0.4s ease;
          /* Mobile default — tighter, cheaper shadow so the wheel doesn't
             feel too heavy on small screens. Desktop overrides below. */
          filter: drop-shadow(0 8px 14px rgba(2, 10, 18, 0.32))
            drop-shadow(0 3px 5px rgba(0, 0, 0, 0.18))
            drop-shadow(0 0 6px var(--glow-soft));
          mix-blend-mode: normal;
        }
        @media (min-width: 768px) {
          .sw-stage :global(.sw-seg) {
            filter: drop-shadow(0 18px 32px rgba(2, 10, 18, 0.48))
              drop-shadow(0 8px 14px rgba(0, 0, 0, 0.28))
              drop-shadow(0 0 12px var(--glow-soft));
          }
        }
        /* All hover state effects live inside (hover: hover) so tap on
           touch devices never flashes the pop/dim/wireframe behavior. */
        @media (hover: hover) {
          .sw-stage :global(.sw-seg:hover),
          .sw-stage :global(.sw-seg.hot) {
            transform: translateY(-28px) scale(1.16);
            filter: drop-shadow(0 20px 26px rgba(2, 10, 18, 0.45))
              drop-shadow(0 0 22px var(--glow-soft)) saturate(1.45)
              brightness(1.14);
          }
          .sw-stage :global(.sw-seg.dim) {
            opacity: 1;
            filter: drop-shadow(0 0 8px var(--glow-soft));
          }
          .sw-stage :global(.sw-seg.dim .sw-solid) {
            opacity: 0.05;
          }
          .sw-stage :global(.sw-seg.dim .sw-wire) {
            opacity: 1;
          }
        }
        @media (hover: hover) and (min-width: 768px) {
          .sw-stage :global(.sw-seg:hover),
          .sw-stage :global(.sw-seg.hot) {
            filter: drop-shadow(0 28px 40px rgba(2, 10, 18, 0.52))
              drop-shadow(0 12px 20px rgba(0, 0, 0, 0.32))
              drop-shadow(0 0 26px var(--glow-soft)) saturate(1.45)
              brightness(1.14);
          }
        }
        .sw-stage :global(.sw-seg .sw-solid) {
          transition: opacity 0.35s ease;
        }
        .sw-stage :global(.sw-seg .sw-wire) {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        @keyframes sw-levitate {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(var(--famp, -9px));
          }
        }
        .sw-stage :global(.sw-float) {
          animation: sw-levitate var(--fdur, 4.5s) ease-in-out var(--fdel, 0s)
            infinite;
          will-change: transform;
        }
        @media (hover: hover) {
          .sw-stage :global(.sw-seg:hover .sw-float),
          .sw-stage :global(.sw-seg.hot .sw-float) {
            animation-play-state: paused;
          }
        }
        @keyframes sw-shadowBreath {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.95;
          }
          50% {
            transform: scale(0.93);
            opacity: 0.68;
          }
        }
        .sw-stage :global(.sw-floor) {
          transform-box: view-box;
          transform-origin: 500px 500px;
          animation: sw-shadowBreath 4.7s ease-in-out infinite;
          /* Multiply the ground shadow with whatever is behind the wheel so
             it composites like a real cast shadow instead of a black patch. */
          mix-blend-mode: multiply;
        }
        .sw-stage :global(.sw-core-glow),
        .sw-stage :global(.sw-spec) {
          pointer-events: none;
        }
        .sw-stage :global(.sw-seg.sw-intro) {
          transition:
            transform 0.85s cubic-bezier(0.16, 1.05, 0.3, 1.14),
            filter 0.5s ease,
            opacity 0.55s ease;
        }
        .sw-stage :global(.sw-seg.sw-pre) {
          opacity: 0;
          transform: translate(var(--ix, 0px), var(--iy, 48px));
        }
        @media (prefers-reduced-motion: reduce) {
          .sw-stage :global(.sw-float),
          .sw-stage :global(.sw-floor) {
            animation: none;
          }
          .sw-stage :global(.sw-seg) {
            transition: filter 0.35s ease;
          }
          .sw-stage :global(.sw-seg.sw-pre) {
            opacity: 1;
            transform: none;
          }
          .sw-stage :global(.sw-seg:hover),
          .sw-stage :global(.sw-seg.hot) {
            transform: none;
          }
        }
        .sw-tag {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 11;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease;
          font-family: var(--font-inter);
          text-transform: uppercase;
          color: var(--sw-line, #a5fdf3);
          padding: 8px 12px 10px;
          background: #00494e;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          line-height: 1;
          white-space: nowrap;
        }
        .sw-tag.on {
          opacity: 1;
        }
        .sw-tag :global(.sw-tag__measure),
        .sw-tag :global(.sw-tag__name) {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
        }
        /* Legend — mobile-only. Wraps as an inline cluster so the row
           evenly spans the section bottom instead of stacking vertically. */
        .sw-legend {
          list-style: none;
          margin: 24px auto 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px 16px;
          max-width: 100%;
        }
        .sw-legend li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-inter);
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.7rem;
          line-height: 1;
          white-space: nowrap;
        }
        .sw-legend__bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          display: inline-block;
        }
        .sw-legend__measure,
        .sw-legend__name {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          font-size: 0.6rem;
          color: #ffffff;
        }
        @media (min-width: 768px) {
          .sw-legend {
            display: none;
          }
        }

        /* On touch devices the hover tag never fires anyway, but hide it
           defensively so any stray hot state doesn't flash it in. */
        @media (hover: none), (pointer: coarse) {
          .sw-tag {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
