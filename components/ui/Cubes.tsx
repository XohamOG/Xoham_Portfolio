"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

type CubesProps = {
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: {
    enter: number;
    leave: number;
  };
  cellGap?: number | { row?: number; col?: number };
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
};

export default function Cubes({
  gridSize = 10,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = "power3.out",
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = "1px solid #fff",
  faceColor = "#060010",
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = "#fff",
  rippleSpeed = 2,
}: CubesProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);
  const cubeElementsRef = useRef<HTMLElement[]>([]);
  const cubeFacesMapRef = useRef<Map<HTMLElement, HTMLElement[]>>(new Map());
  const allFacesRef = useRef<HTMLElement[]>([]);
  const lastTiltRef = useRef<{ row: number; col: number }>({
    row: Number.NaN,
    col: Number.NaN,
  });
  const autoAnimateTickRef = useRef(0);

  const colGap =
    typeof cellGap === "number"
      ? `${cellGap}px`
      : cellGap?.col !== undefined
        ? `${cellGap.col}px`
        : "5%";
  const rowGap =
    typeof cellGap === "number"
      ? `${cellGap}px`
      : cellGap?.row !== undefined
        ? `${cellGap.row}px`
        : "5%";

  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  const hydrateSceneRefs = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }

    const cubes = Array.from(scene.querySelectorAll<HTMLElement>(".cube"));
    cubeElementsRef.current = cubes;
    cubeFacesMapRef.current = new Map(
      cubes.map((cube) => [
        cube,
        Array.from(cube.querySelectorAll<HTMLElement>(".cube-face")),
      ]),
    );
    allFacesRef.current = cubes.flatMap(
      (cube) => cubeFacesMapRef.current.get(cube) ?? [],
    );
  }, []);

  const tiltAt = useCallback(
    (rowCenter: number, colCenter: number) => {
      const cubes = cubeElementsRef.current;
      if (cubes.length === 0) {
        return;
      }

      if (
        Number.isFinite(lastTiltRef.current.row) &&
        Math.hypot(
          rowCenter - lastTiltRef.current.row,
          colCenter - lastTiltRef.current.col,
        ) < 0.08
      ) {
        return;
      }

      lastTiltRef.current = { row: rowCenter, col: colCenter };

      cubes.forEach((cube) => {
        const r = Number(cube.dataset.row);
        const c = Number(cube.dataset.col);
        const dist = Math.hypot(r - rowCenter, c - colCenter);

        if (dist <= radius) {
          const pct = 1 - dist / radius;
          const angle = pct * maxAngle;
          gsap.to(cube, {
            duration: enterDur,
            ease: easing,
            overwrite: true,
            rotateX: -angle,
            rotateY: angle,
          });
          return;
        }

        gsap.to(cube, {
          duration: leaveDur,
          ease: "power3.out",
          overwrite: true,
          rotateX: 0,
          rotateY: 0,
        });
      });
    },
    [radius, maxAngle, enterDur, leaveDur, easing],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!sceneRef.current) {
        return;
      }

      userActiveRef.current = true;
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const colCenter = (event.clientX - rect.left) / cellW;
      const rowCenter = (event.clientY - rect.top) / cellH;

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = window.setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt],
  );

  const resetAll = useCallback(() => {
    const cubes = cubeElementsRef.current;
    if (cubes.length === 0) {
      return;
    }

    lastTiltRef.current = { row: Number.NaN, col: Number.NaN };

    cubes.forEach((cube) => {
      gsap.to(cube, {
        duration: leaveDur,
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
      });
    });
  }, [leaveDur]);

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!sceneRef.current) {
        return;
      }

      event.preventDefault();
      userActiveRef.current = true;
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const touch = event.touches[0];
      const colCenter = (touch.clientX - rect.left) / cellW;
      const rowCenter = (touch.clientY - rect.top) / cellH;

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = window.setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt],
  );

  const onTouchEnd = useCallback(() => {
    resetAll();
  }, [resetAll]);

  const triggerRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (!rippleOnClick || !sceneRef.current) {
        return;
      }

      if (cubeElementsRef.current.length === 0) {
        hydrateSceneRefs();
      }

      const cubes = cubeElementsRef.current;
      const allFaces = allFacesRef.current;
      if (cubes.length === 0 || allFaces.length === 0) {
        return;
      }

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const colHit = Math.floor((clientX - rect.left) / cellW);
      const rowHit = Math.floor((clientY - rect.top) / cellH);

      const baseRingDelay = 0.15;
      const baseAnimDur = 0.3;
      const baseHold = 0.6;
      const safeRippleSpeed = Math.max(0.1, rippleSpeed);

      const spreadDelay = baseRingDelay / safeRippleSpeed;
      const animDuration = baseAnimDur / safeRippleSpeed;
      const holdTime = baseHold / safeRippleSpeed;

      const rings: Record<number, HTMLElement[]> = {};

      gsap.killTweensOf(allFaces);
      gsap.set(allFaces, { backgroundColor: faceColor });

      cubes.forEach((cube) => {
        const r = Number(cube.dataset.row);
        const c = Number(cube.dataset.col);
        const dist = Math.hypot(r - rowHit, c - colHit);
        const ring = Math.round(dist);

        if (!rings[ring]) {
          rings[ring] = [];
        }

        rings[ring].push(cube);
      });

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((ring) => {
          const delay = ring * spreadDelay;
          const faces = rings[ring].flatMap(
            (cube) => cubeFacesMapRef.current.get(cube) ?? [],
          );
          if (faces.length === 0) {
            return;
          }

          gsap.to(faces, {
            backgroundColor: rippleColor,
            duration: animDuration,
            delay,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(faces, {
            backgroundColor: faceColor,
            duration: animDuration,
            delay: delay + animDuration + holdTime,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
    },
    [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed, hydrateSceneRefs],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      triggerRipple(event.clientX, event.clientY);
    },
    [triggerRipple],
  );

  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      userActiveRef.current = true;

      const touch = event.touches[0];
      if (touch) {
        triggerRipple(touch.clientX, touch.clientY);
      }
    },
    [triggerRipple],
  );

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) {
      return;
    }

    if (cubeElementsRef.current.length === 0) {
      hydrateSceneRefs();
    }

    simPosRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    simTargetRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };

    const speed = 0.11;
    const minFrameDelta = 1000 / 24;

    const loop = (timestamp: number) => {
      if (
        !userActiveRef.current &&
        timestamp - autoAnimateTickRef.current >= minFrameDelta
      ) {
        autoAnimateTickRef.current = timestamp;
        const pos = simPosRef.current;
        const target = simTargetRef.current;

        pos.x += (target.x - pos.x) * speed;
        pos.y += (target.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);

        if (Math.hypot(pos.x - target.x, pos.y - target.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
          };
        }
      }

      simRAFRef.current = window.requestAnimationFrame(loop);
    };

    autoAnimateTickRef.current = 0;
    simRAFRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (simRAFRef.current != null) {
        window.cancelAnimationFrame(simRAFRef.current);
      }
    };
  }, [autoAnimate, gridSize, hydrateSceneRefs, tiltAt]);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) {
      return;
    }

    hydrateSceneRefs();

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", resetAll);
    element.addEventListener("pointerdown", onPointerDown);

    element.addEventListener("touchmove", onTouchMove, { passive: false });
    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", resetAll);
      element.removeEventListener("pointerdown", onPointerDown);

      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", onTouchEnd);

      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (idleTimerRef.current != null) {
        window.clearTimeout(idleTimerRef.current);
      }

      cubeElementsRef.current = [];
      cubeFacesMapRef.current.clear();
      allFacesRef.current = [];
    };
  }, [
    hydrateSceneRefs,
    onPointerMove,
    onPointerDown,
    resetAll,
    onTouchMove,
    onTouchStart,
    onTouchEnd,
  ]);

  const cells = Array.from({ length: gridSize });

  const sceneStyle: CSSProperties = {
    gridTemplateColumns: cubeSize
      ? `repeat(${gridSize}, ${cubeSize}px)`
      : `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: cubeSize
      ? `repeat(${gridSize}, ${cubeSize}px)`
      : `repeat(${gridSize}, 1fr)`,
    columnGap: colGap,
    rowGap,
  };

  const wrapperStyle: CSSProperties = {
    ["--cube-face-border" as string]: borderStyle,
    ["--cube-face-bg" as string]: faceColor,
    ["--cube-face-shadow" as string]:
      shadow === true ? "0 0 6px rgba(0,0,0,.5)" : shadow || "none",
    ...(cubeSize
      ? {
          width: `${gridSize * cubeSize}px`,
          height: `${gridSize * cubeSize}px`,
        }
      : {}),
  };

  return (
    <div className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {cells.map((_, rowIndex) =>
          cells.map((__, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cube"
              data-row={rowIndex}
              data-col={colIndex}
            >
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
