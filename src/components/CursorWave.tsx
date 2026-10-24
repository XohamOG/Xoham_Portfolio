"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./CursorWave.module.css";

export type WaveShape =
  | "mixed"
  | "square"
  | "diamond"
  | "circle"
  | "triangle"
  | "star"
  | "hexagon"
  | "cross"
  | "ring"
  | "dot";

export type ColorMode = "multicolor" | "monochrome";

export const DEFAULT_VIBRANT_PALETTE = [
  "#007BA7", // Cerulean Blue
  "#FF2D95", // Neon Rose
  "#ff7324", // Vibrant Coral Orange
  "#00e599", // Neon Emerald Green
  "#a855f7", // Vivid Purple / Violet
  "#fbbf24", // Golden Amber Yellow
  "#6366f1", // Periwinkle Indigo
  "#38bdf8", // Sky Blue
  "#cbd5e1", // Clean Silver Slate
  "#f97316", // Bright Tangerine
];

export interface CursorWaveProps {
  /** Pixel spacing between grid cell centers */
  cellSize?: number;
  /** Radius of cursor influence as percentage of min(viewport width, height) */
  influenceRadiusVmin?: number;
  /** Time constant in seconds for the swell-up ease (attack) */
  attackTime?: number;
  /** Time constant in seconds for the relax-down ease (release) */
  releaseTime?: number;
  /** Resting scale applied to shapes when cursor is away */
  idleScale?: number;
  /** Minimum scale bound on hover */
  minPeakScale?: number;
  /** Maximum scale bound on hover */
  maxPeakScale?: number;
  /** Click-burst expansion speed in pixels/second */
  burstSpeed?: number;
  /** Click-burst ring thickness in pixels */
  burstThickness?: number;
  /** Shape to render at each grid point ("mixed" combines all possible shapes) */
  shape?: WaveShape;
  /** Background canvas color */
  backgroundColor?: string;
  /** Color mode: "multicolor" (vibrant spectrum per cell) or "monochrome" */
  colorMode?: ColorMode;
  /** Palette of colors assigned across grid points in multicolor mode */
  palette?: string[];
  /** Color of resting dots/shapes when in monochrome mode */
  dotColor?: string;
  /** Radiant color when energized in monochrome mode */
  activeColor?: string;
  /** Resting alpha opacity of dots/shapes (0 to 1) */
  idleAlpha?: number;
  /** Whether to enable continuous ambient breathing wave */
  ambientWave?: boolean;
  /** Dynamic rotation spin amount when wave crests over shapes (radians) */
  waveSpin?: number;
  /** Radial displacement push factor (0 = strictly on grid, 1 = full push) */
  displacementFactor?: number;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional child elements placed over the interactive background */
  children?: React.ReactNode;
}

interface Burst {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  thickness: number;
  opacity: number;
}

// All supported individual shapes
export enum ShapeKind {
  SQUARE = 0,
  DIAMOND = 1,
  CIRCLE = 2,
  TRIANGLE_UP = 3,
  TRIANGLE_DOWN = 4,
  TRIANGLE_RIGHT = 5,
  TRIANGLE_LEFT = 6,
  HEXAGON = 7,
  STAR = 8,
  CROSS = 9,
  RING = 10,
}

// 32-bit Murmur-style 2D integer hash for uniform pseudo-random distributions
function hash2d(x: number, y: number, seed: number = 0): number {
  let h = Math.imul((x + seed) | 0, 0xcc9e2d51) ^ Math.imul((y + seed * 37) | 0, 0x1b873593);
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Utility to parse CSS hex or rgba colors into [r, g, b, a]
function parseColorToRgba(color: string): [number, number, number, number] {
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const num = parseInt(hex.slice(0, 6), 16);
    const alpha = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, alpha];
  }

  const rgbaMatch = color.match(
    /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/
  );
  if (rgbaMatch) {
    return [
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10),
      rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    ];
  }

  return [235, 241, 246, 0.2];
}

export default function CursorWave({
  cellSize = 42,
  influenceRadiusVmin = 24,
  attackTime = 0.1,
  releaseTime = 0.18,
  idleScale = 0.11,
  minPeakScale = 0.8,
  maxPeakScale = 1.65,
  burstSpeed = 750,
  burstThickness = 90,
  shape = "mixed",
  backgroundColor = "#0a0a0a",
  colorMode = "multicolor",
  palette = DEFAULT_VIBRANT_PALETTE,
  dotColor = "rgba(235, 241, 246, 0.2)",
  activeColor = "#ffb119",
  idleAlpha = 0.24,
  ambientWave = true,
  waveSpin = 0.06,
  displacementFactor = 0.09,
  className = "",
  children,
}: CursorWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Active click shockwaves
  const burstsRef = useRef<Burst[]>([]);

  // Mouse tracking
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: boolean;
    lastMoveTime: number;
    prevClientX: number;
    prevClientY: number;
    movementEnergy: number;
  }>({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    lastMoveTime: 0,
    prevClientX: -9999,
    prevClientY: -9999,
    movementEnergy: 0,
  });

  // Typed buffers for 60-120fps performance
  const cellsRef = useRef<{
    cols: number;
    rows: number;
    count: number;
    x: Float32Array;
    y: Float32Array;
    currentScale: Float32Array;
    targetScale: Float32Array;
    dispX: Float32Array;
    dispY: Float32Array;
    shapeKind: Uint8Array;
    colorR: Uint8Array;
    colorG: Uint8Array;
    colorB: Uint8Array;
  }>({
    cols: 0,
    rows: 0,
    count: 0,
    x: new Float32Array(0),
    y: new Float32Array(0),
    currentScale: new Float32Array(0),
    targetScale: new Float32Array(0),
    dispX: new Float32Array(0),
    dispY: new Float32Array(0),
    shapeKind: new Uint8Array(0),
    colorR: new Uint8Array(0),
    colorG: new Uint8Array(0),
    colorB: new Uint8Array(0),
  });

  // Populate grid points with uniform shape and color distribution
  const setupGrid = useCallback(
    (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;
      dimensionsRef.current = { width, height };

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const count = cols * rows;

      const x = new Float32Array(count);
      const y = new Float32Array(count);
      const currentScale = new Float32Array(count);
      const targetScale = new Float32Array(count);
      const dispX = new Float32Array(count);
      const dispY = new Float32Array(count);
      const shapeKind = new Uint8Array(count);
      const colorR = new Uint8Array(count);
      const colorG = new Uint8Array(count);
      const colorB = new Uint8Array(count);

      // Pre-parse the palette
      const parsedPalette = (palette.length > 0 ? palette : DEFAULT_VIBRANT_PALETTE).map(
        (hex) => parseColorToRgba(hex)
      );

      // Centered offset to keep grid symmetrical
      const offsetX = (width - (cols - 1) * cellSize) / 2;
      const offsetY = (height - (rows - 1) * cellSize) / 2;

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          x[idx] = offsetX + c * cellSize;
          y[idx] = offsetY + r * cellSize;
          currentScale[idx] = idleScale;
          targetScale[idx] = idleScale;
          dispX[idx] = 0;
          dispY[idx] = 0;

          // 1. Assign Shape Type:
          if (shape === "mixed") {
            const sVal = hash2d(c, r, 42);
            shapeKind[idx] = Math.floor(sVal * 11);
          } else if (shape === "square") {
            shapeKind[idx] = ShapeKind.SQUARE;
          } else if (shape === "diamond") {
            shapeKind[idx] = ShapeKind.DIAMOND;
          } else if (shape === "circle" || shape === "dot") {
            shapeKind[idx] = ShapeKind.CIRCLE;
          } else if (shape === "triangle") {
            const tVal = hash2d(c, r, 77);
            const dir = Math.floor(tVal * 4);
            shapeKind[idx] = ShapeKind.TRIANGLE_UP + dir;
          } else if (shape === "star") {
            shapeKind[idx] = ShapeKind.STAR;
          } else if (shape === "hexagon") {
            shapeKind[idx] = ShapeKind.HEXAGON;
          } else if (shape === "cross") {
            shapeKind[idx] = ShapeKind.CROSS;
          } else if (shape === "ring") {
            shapeKind[idx] = ShapeKind.RING;
          } else {
            shapeKind[idx] = ShapeKind.SQUARE;
          }

          // 2. Assign Color from Palette using 2D uniform hash
          const colorVal = hash2d(c, r, 999);
          const colorIdx = Math.floor(colorVal * parsedPalette.length) % parsedPalette.length;
          const [cr, cg, cb] = parsedPalette[colorIdx];
          colorR[idx] = cr;
          colorG[idx] = cg;
          colorB[idx] = cb;

          idx++;
        }
      }

      cellsRef.current = {
        cols,
        rows,
        count,
        x,
        y,
        currentScale,
        targetScale,
        dispX,
        dispY,
        shapeKind,
        colorR,
        colorG,
        colorB,
      };
    },
    [cellSize, idleScale, shape, palette]
  );

  // Instantly re-populate grid on prop changes
  useEffect(() => {
    if (dimensionsRef.current.width > 0 && dimensionsRef.current.height > 0) {
      setupGrid(dimensionsRef.current.width, dimensionsRef.current.height);
    }
  }, [setupGrid]);

  // Smooth wave ripple burst that travels across the grid
  const triggerBurst = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Distance to farthest corner of the viewport
      const maxDist = Math.hypot(
        Math.max(x, rect.width - x),
        Math.max(y, rect.height - y)
      );

      burstsRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: maxDist * 1.05,
        speed: burstSpeed,
        thickness: burstThickness,
        opacity: 1,
      });
    },
    [burstSpeed, burstThickness]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const [monoIdleR, monoIdleG, monoIdleB] = parseColorToRgba(dotColor);
    const [monoActiveR, monoActiveG, monoActiveB] = parseColorToRgba(activeColor);

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      setupGrid(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const now = performance.now();
      const mouse = mouseRef.current;

      if (mouse.prevClientX > -1000) {
        const dx = e.clientX - mouse.prevClientX;
        const dy = e.clientY - mouse.prevClientY;
        const dist = Math.hypot(dx, dy);
        // Measure movement speed & pump energy
        const impulse = Math.min(1.4, dist / 8);
        mouse.movementEnergy = Math.min(1.4, mouse.movementEnergy + impulse * 0.55);
      } else {
        mouse.movementEnergy = 0.9;
      }

      mouse.targetX = currentX;
      mouse.targetY = currentY;
      mouse.prevClientX = e.clientX;
      mouse.prevClientY = e.clientY;
      mouse.active = true;
      mouse.lastMoveTime = now;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.movementEnergy = 0;
      mouseRef.current.prevClientX = -9999;
      mouseRef.current.prevClientY = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      // Don't trigger background wave effect when clicking navbar or interactive navigation controls
      const target = e.target as HTMLElement | null;
      if (target && target.closest("nav, header, [data-no-wave], .gooey-nav")) {
        return;
      }
      triggerBurst(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        const now = performance.now();
        const mouse = mouseRef.current;

        if (mouse.prevClientX > -1000) {
          const dx = touch.clientX - mouse.prevClientX;
          const dy = touch.clientY - mouse.prevClientY;
          const dist = Math.hypot(dx, dy);
          const impulse = Math.min(1.4, dist / 8);
          mouse.movementEnergy = Math.min(1.4, mouse.movementEnergy + impulse * 0.55);
        } else {
          mouse.movementEnergy = 0.9;
        }

        mouse.targetX = currentX;
        mouse.targetY = currentY;
        mouse.prevClientX = touch.clientX;
        mouse.prevClientY = touch.clientY;
        mouse.active = true;
        mouse.lastMoveTime = now;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      mouseRef.current.movementEnergy = 0;
      mouseRef.current.prevClientX = -9999;
      mouseRef.current.prevClientY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Main animation loop
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const minDim = Math.min(width, height);
      const influenceRadius = (influenceRadiusVmin / 100) * minDim;

      // Smooth mouse coordinate inertia
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * (1 - Math.exp(-dt * 20));
        mouse.y += (mouse.targetY - mouse.y) * (1 - Math.exp(-dt * 20));
      } else {
        mouse.x += (-9999 - mouse.x) * (1 - Math.exp(-dt * 8));
        mouse.y += (-9999 - mouse.y) * (1 - Math.exp(-dt * 8));
      }

      // Snappy decay when cursor stops moving (> 16ms since last move)
      const timeSinceMove = currentTime - mouse.lastMoveTime;
      if (timeSinceMove > 16) {
        mouse.movementEnergy *= Math.exp(-dt * 22);
        if (mouse.movementEnergy < 0.008) {
          mouse.movementEnergy = 0;
        }
      }

      // Update shockwave bursts with smooth linear-to-edge fade
      const bursts = burstsRef.current;
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        burst.radius += burst.speed * dt;
        const progress = burst.radius / burst.maxRadius;
        burst.opacity = Math.max(0, 1 - progress);
        if (burst.radius >= burst.maxRadius) {
          bursts.splice(b, 1);
        }
      }

      // Clear Canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const cells = cellsRef.current;
      const count = cells.count;
      const timeSec = currentTime * 0.001;

      // Subtle base size tailored for non-intrusive portfolio background
      const baseElementSize = cellSize * 0.36;

      for (let i = 0; i < count; i++) {
        const cx = cells.x[i];
        const cy = cells.y[i];

        // 1. Ambient undulating ripple
        let ambientMod = 0;
        if (ambientWave) {
          ambientMod =
            Math.sin(timeSec * 1.5 + cx * 0.008 + cy * 0.006) *
            Math.cos(timeSec * 1.1 - cx * 0.006 + cy * 0.007) *
            0.08;
        }

        // 2. Cursor Proximity Wave: ONLY active while moving!
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const distSq = dx * dx + dy * dy;
        let cursorInfluence = 0;
        let dispTargetX = 0;
        let dispTargetY = 0;

        if (distSq < influenceRadius * influenceRadius && mouse.movementEnergy > 0.001) {
          const dist = Math.sqrt(distSq);
          const ratio = 1 - dist / influenceRadius;
          // Smooth cosine curve amplified by movement energy
          const proximity = Math.sin((ratio * Math.PI) / 2);
          cursorInfluence = proximity * Math.min(1.3, mouse.movementEnergy);

          // Increased physical wave displacement: pushes shapes outward in a liquid wake
          const pushAmount = cursorInfluence * (cellSize * displacementFactor);
          if (dist > 0.001) {
            dispTargetX = (dx / dist) * pushAmount;
            dispTargetY = (dy / dist) * pushAmount;
          }
        }

        // 3. Traveling ripple wave (increased wave impact effect)
        let burstInfluence = 0;
        for (let b = 0; b < bursts.length; b++) {
          const burst = bursts[b];
          const bdx = cx - burst.x;
          const bdy = cy - burst.y;
          const bdist = Math.hypot(bdx, bdy);
          const diff = Math.abs(bdist - burst.radius);

          if (diff < burst.thickness) {
            const normDiff = diff / burst.thickness;
            // Cosine bell curve peaking at the wave crest
            const pulse = Math.cos((normDiff * Math.PI) / 2);
            const waveEnergy = pulse * burst.opacity * 1.25;
            burstInfluence += waveEnergy;

            // Liquid wave push outward
            if (bdist > 0.001) {
              const wavePush = waveEnergy * (cellSize * 0.32);
              dispTargetX += (bdx / bdist) * wavePush;
              dispTargetY += (bdy / bdist) * wavePush;
            }
          }
        }

        // Combined energy with higher headroom for dramatic wave impact
        const totalEnergy = Math.min(cursorInfluence + burstInfluence, 2.2);
        const targetScale =
          idleScale +
          ambientMod +
          totalEnergy * (maxPeakScale - idleScale);

        // Smooth attack & release easing
        const isSwelling = targetScale > cells.currentScale[i];
        const timeConstant = isSwelling ? attackTime : releaseTime;
        const lerpFactor = 1 - Math.exp(-dt / Math.max(timeConstant, 0.01));

        cells.currentScale[i] +=
          (targetScale - cells.currentScale[i]) * lerpFactor;
        cells.dispX[i] += (dispTargetX - cells.dispX[i]) * lerpFactor;
        cells.dispY[i] += (dispTargetY - cells.dispY[i]) * lerpFactor;

        const curScale = Math.max(0.05, cells.currentScale[i]);
        const drawX = cx + cells.dispX[i];
        const drawY = cy + cells.dispY[i];

        // 4. Color, Alpha, and Glow Computation
        const normalizedScale = Math.min(
          Math.max(0, (curScale - idleScale) / (maxPeakScale - idleScale)),
          1
        );

        let r = cells.colorR[i];
        let g = cells.colorG[i];
        let b = cells.colorB[i];

        if (colorMode === "monochrome") {
          r = Math.round(monoIdleR + (monoActiveR - monoIdleR) * normalizedScale);
          g = Math.round(monoIdleG + (monoActiveG - monoIdleG) * normalizedScale);
          b = Math.round(monoIdleB + (monoActiveB - monoIdleB) * normalizedScale);
        }

        // Alpha scales softly from resting idle to vibrant hover
        const alpha = Math.min(
          idleAlpha + (0.95 - idleAlpha) * normalizedScale,
          0.96
        );

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        // Soft, refined glow for portfolio backdrop
        if (normalizedScale > 0.22) {
          ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowBlur = normalizedScale * 8;
        } else {
          ctx.shadowBlur = 0;
        }

        // 5. Render Shape
        const size = baseElementSize * curScale;
        const sKind = cells.shapeKind[i];

        ctx.save();
        ctx.translate(drawX, drawY);
        if (waveSpin !== 0) {
          ctx.rotate(normalizedScale * waveSpin);
        }

        switch (sKind) {
          case ShapeKind.SQUARE: {
            const half = size / 2;
            const corner = Math.min(size * 0.08, 1.8);
            if (typeof ctx.roundRect === "function" && corner > 0.5) {
              ctx.beginPath();
              ctx.roundRect(-half, -half, size, size, corner);
              ctx.fill();
            } else {
              ctx.fillRect(-half, -half, size, size);
            }
            break;
          }
          case ShapeKind.DIAMOND: {
            const radius = size * 0.52;
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.lineTo(radius, 0);
            ctx.lineTo(0, radius);
            ctx.lineTo(-radius, 0);
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.CIRCLE: {
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          case ShapeKind.TRIANGLE_UP: {
            const radius = size * 0.54;
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.lineTo(radius * 0.866, radius * 0.5);
            ctx.lineTo(-radius * 0.866, radius * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.TRIANGLE_DOWN: {
            const radius = size * 0.54;
            ctx.beginPath();
            ctx.moveTo(0, radius);
            ctx.lineTo(radius * 0.866, -radius * 0.5);
            ctx.lineTo(-radius * 0.866, -radius * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.TRIANGLE_RIGHT: {
            const radius = size * 0.54;
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(-radius * 0.5, radius * 0.866);
            ctx.lineTo(-radius * 0.5, -radius * 0.866);
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.TRIANGLE_LEFT: {
            const radius = size * 0.54;
            ctx.beginPath();
            ctx.moveTo(-radius, 0);
            ctx.lineTo(radius * 0.5, radius * 0.866);
            ctx.lineTo(radius * 0.5, -radius * 0.866);
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.HEXAGON: {
            const radius = size * 0.5;
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
              const angle = (a * Math.PI) / 3;
              const hx = radius * Math.cos(angle);
              const hy = radius * Math.sin(angle);
              if (a === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.STAR: {
            const outerR = size * 0.54;
            const innerR = size * 0.22;
            ctx.beginPath();
            for (let s = 0; s < 8; s++) {
              const angle = (s * Math.PI) / 4 - Math.PI / 2;
              const rad = s % 2 === 0 ? outerR : innerR;
              const sx = rad * Math.cos(angle);
              const sy = rad * Math.sin(angle);
              if (s === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.fill();
            break;
          }
          case ShapeKind.CROSS: {
            const half = size / 2;
            const thick = Math.max(1.8, size * 0.24);
            const halfThick = thick / 2;
            ctx.fillRect(-half, -halfThick, size, thick);
            ctx.fillRect(-halfThick, -half, thick, size);
            break;
          }
          case ShapeKind.RING: {
            const outerRadius = size * 0.46;
            const innerRadius = Math.max(1, outerRadius * 0.54);
            ctx.beginPath();
            ctx.arc(0, 0, outerRadius, 0, Math.PI * 2, false);
            ctx.arc(0, 0, innerRadius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            break;
          }
          default: {
            ctx.fillRect(-size / 2, -size / 2, size, size);
            break;
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    influenceRadiusVmin,
    attackTime,
    releaseTime,
    idleScale,
    minPeakScale,
    maxPeakScale,
    backgroundColor,
    colorMode,
    dotColor,
    activeColor,
    idleAlpha,
    ambientWave,
    waveSpin,
    displacementFactor,
    setupGrid,
    triggerBurst,
    cellSize,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${styles.canvasContainer} ${className}`}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className={styles.waveCanvas} />
      {children && <div className={styles.contentWrapper}>{children}</div>}
    </div>
  );
}
