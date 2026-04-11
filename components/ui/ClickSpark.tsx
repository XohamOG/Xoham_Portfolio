"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type SparkEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  themeAwareColor?: boolean;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: SparkEasing;
  extraScale?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  disableOnMobile?: boolean;
};

export default function ClickSpark({
  sparkColor = "#1f7cff",
  themeAwareColor = false,
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children,
  className = "",
  style,
  disableOnMobile = false,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const isDisabled = disableOnMobile && isMobile;
  const activeSparkColor = themeAwareColor ? (isDarkTheme ? "#ffffff" : "#111218") : sparkColor;

  useEffect(() => {
    if (!themeAwareColor) {
      return;
    }

    const rootElement = document.documentElement;

    const syncTheme = () => {
      setIsDarkTheme(rootElement.getAttribute("data-theme") === "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, [themeAwareColor]);

  useEffect(() => {
    if (!disableOnMobile) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, [disableOnMobile]);

  useEffect(() => {
    if (isDisabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    let resizeTimeout: number | undefined;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);
    resizeCanvas();

    return () => {
      observer.disconnect();
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, [isDisabled]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameRef.current = null;
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = activeSparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationFrameRef.current = window.requestAnimationFrame(draw);
      } else {
        animationFrameRef.current = null;
      }
    },
    [activeSparkColor, duration, easeFunc, extraScale, sparkRadius, sparkSize],
  );

  useEffect(() => {
    if (!isDisabled) {
      return;
    }

    sparksRef.current = [];

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isDisabled]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
      x,
      y,
      angle: (2 * Math.PI * index) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);

    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(draw);
    }
  };

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99,
        }}
      />
      {children}
    </div>
  );
}
