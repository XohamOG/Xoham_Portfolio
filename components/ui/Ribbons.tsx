"use client";

import { useEffect, useRef } from "react";

type Ribbon = {
  yOffset: number;
  amplitude: number;
  speed: number;
  frequency: number;
  thickness: number;
  phase: number;
};

export default function Ribbons() {
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let time = 0;

    let ribbons: Ribbon[] = [];

    const initializeRibbons = () => {
      ribbons = Array.from({ length: 7 }, (_, index) => ({
        yOffset: (height / 8) * (index + 1),
        amplitude: 14 + index * 2,
        speed: 0.35 + index * 0.05,
        frequency: 0.008 + index * 0.0014,
        thickness: 1.2 + (index % 3) * 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initializeRibbons();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      ribbons.forEach((ribbon, index) => {
        context.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const wobble = Math.sin(x * ribbon.frequency + ribbon.phase + time * ribbon.speed) * ribbon.amplitude;
          const y = ribbon.yOffset + wobble;

          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        const opacity = 0.13 + index * 0.03;
        context.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
        context.lineWidth = ribbon.thickness;
        context.stroke();
      });

      if (!prefersReducedMotion) {
        time += 0.016;
      }

      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
