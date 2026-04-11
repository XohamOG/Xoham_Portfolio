"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function ParticlesBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const createDots = (): Dot[] =>
      Array.from({ length: 36 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() > 0.6 ? 2 : 1,
      }));

    let dots: Dot[] = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      dots = createDots();
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      context.fillStyle = "rgba(0, 0, 0, 0.22)";
      dots.forEach((dot) => {
        context.fillRect(dot.x, dot.y, dot.size, dot.size);
      });

      if (!reduceMotion) {
        dots = dots.map((dot) => {
          const nextX = dot.x + dot.vx;
          const nextY = dot.y + dot.vy;

          return {
            ...dot,
            x: nextX <= 0 || nextX >= width ? dot.x - dot.vx : nextX,
            y: nextY <= 0 || nextY >= height ? dot.y - dot.vy : nextY,
            vx: nextX <= 0 || nextX >= width ? dot.vx * -1 : dot.vx,
            vy: nextY <= 0 || nextY >= height ? dot.vy * -1 : dot.vy,
          };
        });
      }

      animationId = window.requestAnimationFrame(drawFrame);
    };

    resize();
    drawFrame();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      aria-hidden="true"
    />
  );
}
