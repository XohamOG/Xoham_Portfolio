"use client";

import React, { useState } from "react";
import CursorWave, { WaveShape, ColorMode } from "./CursorWave";

export default function WaveDemo() {
  const [shape, setShape] = useState<WaveShape>("mixed");
  const [colorMode, setColorMode] = useState<ColorMode>("multicolor");
  const [ambient, setAmbient] = useState(true);

  return (
    <CursorWave
      shape={shape}
      colorMode={colorMode}
      cellSize={42}
      influenceRadiusVmin={24}
      attackTime={0.2}
      releaseTime={0.58}
      idleScale={0.11}
      minPeakScale={0.75}
      maxPeakScale={1.6}
      burstSpeed={820}
      burstThickness={120}
      backgroundColor="#060608"
      idleAlpha={0.24}
      ambientWave={ambient}
      waveSpin={0.06}
      displacementFactor={0.09}
    >
      {/* Top Bar HUD */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.72rem",
          letterSpacing: "0.22em",
          color: "rgba(235, 241, 246, 0.65)",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#00e599",
              boxShadow: "0 0 12px #00e599",
            }}
          />
          <span style={{ color: "#ebf1f6", fontWeight: 700, letterSpacing: "0.25em" }}>
            SOHAM // XOHAM
          </span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <span style={{ color: "rgba(235, 241, 246, 0.75)" }}>
            KINETIC SHAPE FIELD
          </span>
          <span style={{ color: "rgba(235, 241, 246, 0.4)" }}>
            [ ALL SHAPES // ■ ◆ ● ▲ ✦ ⬡ + ○ ]
          </span>
        </div>
      </header>

      {/* Centerpiece Minimal Callout */}
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          maxWidth: "720px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.68rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#00d2ff",
            border: "1px solid rgba(0, 210, 255, 0.35)",
            padding: "0.4rem 1.1rem",
            borderRadius: "999px",
            backgroundColor: "rgba(0, 210, 255, 0.08)",
            boxShadow: "0 0 20px rgba(0, 210, 255, 0.15)",
          }}
        >
          MULTICOLOR KINETIC GRID ACTIVE
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            lineHeight: 1.05,
            textShadow: "0 0 50px rgba(0, 210, 255, 0.25), 0 0 100px rgba(255, 115, 36, 0.15)",
          }}
        >
          Kinetic Shape Field
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "clamp(0.9rem, 1.4vw, 1.08rem)",
            lineHeight: 1.6,
            color: "rgba(235, 241, 246, 0.7)",
            maxWidth: "540px",
          }}
        >
          Squares, diamonds, circles, directional triangles, stars, hexagons, crosses, and rings
          in a vibrant spectrum of colors. Hover to energize the matrix or click to trigger shockwaves.
        </p>
      </div>

      {/* Bottom Controls Bar */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.2rem",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.68rem",
          letterSpacing: "0.18em",
          color: "rgba(235, 241, 246, 0.6)",
          textTransform: "uppercase",
        }}
      >
        {/* Shape selector with all shapes */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          <span style={{ marginRight: "0.2rem", color: "rgba(235, 241, 246, 0.45)" }}>
            SHAPE:
          </span>
          {[
            { id: "mixed", label: "All Mixed (■ ◆ ● ▲ ✦ ⬡ + ○)" },
            { id: "square", label: "Squares (■)" },
            { id: "diamond", label: "Diamonds (◆)" },
            { id: "circle", label: "Circles (●)" },
            { id: "triangle", label: "Triangles (▲)" },
            { id: "star", label: "Stars (✦)" },
            { id: "hexagon", label: "Hexagons (⬡)" },
            { id: "cross", label: "Crosses (+)" },
            { id: "ring", label: "Rings (○)" },
          ].map(({ id, label }) => {
            const isSelected = shape === id;
            return (
              <button
                key={id}
                onClick={() => setShape(id as WaveShape)}
                style={{
                  pointerEvents: "auto",
                  cursor: "pointer",
                  padding: "0.32rem 0.65rem",
                  borderRadius: "6px",
                  border: isSelected
                    ? "1px solid #00d2ff"
                    : "1px solid rgba(235, 241, 246, 0.14)",
                  backgroundColor: isSelected
                    ? "rgba(0, 210, 255, 0.18)"
                    : "rgba(255, 255, 255, 0.03)",
                  color: isSelected ? "#00d2ff" : "rgba(235, 241, 246, 0.75)",
                  boxShadow: isSelected ? "0 0 12px rgba(0, 210, 255, 0.25)" : "none",
                  transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Color Mode & Ambient toggles */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() =>
              setColorMode((prev) =>
                prev === "multicolor" ? "monochrome" : "multicolor"
              )
            }
            style={{
              pointerEvents: "auto",
              cursor: "pointer",
              padding: "0.35rem 0.85rem",
              borderRadius: "6px",
              border:
                colorMode === "multicolor"
                  ? "1px solid #ff7324"
                  : "1px solid rgba(235, 241, 246, 0.14)",
              backgroundColor:
                colorMode === "multicolor"
                  ? "rgba(255, 115, 36, 0.15)"
                  : "rgba(255, 255, 255, 0.03)",
              color: colorMode === "multicolor" ? "#ff7324" : "rgba(235, 241, 246, 0.6)",
              boxShadow:
                colorMode === "multicolor"
                  ? "0 0 12px rgba(255, 115, 36, 0.25)"
                  : "none",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            COLOR: {colorMode === "multicolor" ? "MULTICOLOR SPECTRUM" : "MONOCHROME"}
          </button>

          <button
            onClick={() => setAmbient((prev) => !prev)}
            style={{
              pointerEvents: "auto",
              cursor: "pointer",
              padding: "0.35rem 0.85rem",
              borderRadius: "6px",
              border: ambient
                ? "1px solid #00e599"
                : "1px solid rgba(235, 241, 246, 0.14)",
              backgroundColor: ambient
                ? "rgba(0, 229, 153, 0.12)"
                : "rgba(255, 255, 255, 0.03)",
              color: ambient ? "#00e599" : "rgba(235, 241, 246, 0.5)",
              boxShadow: ambient ? "0 0 12px rgba(0, 229, 153, 0.2)" : "none",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            AMBIENT: {ambient ? "ON" : "OFF"}
          </button>

          <span style={{ color: "rgba(235, 241, 246, 0.35)" }}>
            [ CLICK TO BURST ]
          </span>
        </div>
      </footer>
    </CursorWave>
  );
}
