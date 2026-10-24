"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./Cyber2048.module.css";

type Board = number[][];

const GRID_SIZE = 4;

const createEmptyBoard = (): Board => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// Sound Synthesizer via Web Audio API (zero audio file dependencies)
class SoundFX {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playMove() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  }

  playMerge(val: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const now = this.ctx.currentTime;
      const baseFreq = 440;
      const step = Math.min(10, Math.log2(val));
      const freq = baseFreq * Math.pow(1.05946, step * 2);
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio unsupported
    }
  }

  playGameOver() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio unsupported
    }
  }
}

export default function Cyber2048() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Undo support (1 step)
  const [prevBoard, setPrevBoard] = useState<Board | null>(null);
  const [prevScore, setPrevScore] = useState<number>(0);

  const soundRef = useRef<SoundFX | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize SoundFX
  useEffect(() => {
    soundRef.current = new SoundFX();
    const storedBest = localStorage.getItem("cyber2048_best");
    if (storedBest) {
      setBestScore(parseInt(storedBest, 10) || 0);
    }
    const storedSound = localStorage.getItem("cyber2048_sound");
    if (storedSound !== null) {
      setSoundEnabled(storedSound === "true");
    }
  }, []);

  // Helper: Get random empty cell
  const getEmptyCells = (b: Board): [number, number][] => {
    const empty: [number, number][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (b[r][c] === 0) empty.push([r, c]);
      }
    }
    return empty;
  };

  // Helper: Spawn random tile (90% 2, 10% 4)
  const spawnTile = (b: Board): Board => {
    const empty = getEmptyCells(b);
    if (empty.length === 0) return b;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = b.map((row) => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  };

  // Check if any move is possible
  const canMove = (b: Board): boolean => {
    if (getEmptyCells(b).length > 0) return true;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const val = b[r][c];
        if (r < GRID_SIZE - 1 && b[r + 1][c] === val) return true;
        if (c < GRID_SIZE - 1 && b[r][c + 1] === val) return true;
      }
    }
    return false;
  };

  // Start new game
  const restartGame = useCallback(() => {
    let newBoard = createEmptyBoard();
    newBoard = spawnTile(newBoard);
    newBoard = spawnTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setKeepPlaying(false);
    setPrevBoard(null);
    setPrevScore(0);
  }, []);

  useEffect(() => {
    restartGame();
  }, [restartGame]);

  // Slide & Merge a single row
  const slideRow = (row: number[]) => {
    let filtered = row.filter((v) => v !== 0);
    let pointsGained = 0;
    let merged = false;
    let highestMerged = 0;

    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        pointsGained += filtered[i];
        if (filtered[i] > highestMerged) highestMerged = filtered[i];
        filtered[i + 1] = 0;
        merged = true;
      }
    }

    filtered = filtered.filter((v) => v !== 0);
    while (filtered.length < GRID_SIZE) {
      filtered.push(0);
    }

    return { row: filtered, pointsGained, merged, highestMerged };
  };

  // Matrix Transpose
  const transpose = (m: Board): Board =>
    m[0].map((_, c) => m.map((r) => r[c]));

  // Core Move Handler
  const makeMove = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameOver) return;

      let currentBoard = board.map((r) => [...r]);
      let totalGained = 0;
      let anyMerged = false;
      let topMerge = 0;

      if (direction === "LEFT") {
        for (let r = 0; r < GRID_SIZE; r++) {
          const res = slideRow(currentBoard[r]);
          currentBoard[r] = res.row;
          totalGained += res.pointsGained;
          if (res.merged) anyMerged = true;
          if (res.highestMerged > topMerge) topMerge = res.highestMerged;
        }
      } else if (direction === "RIGHT") {
        for (let r = 0; r < GRID_SIZE; r++) {
          const reversed = [...currentBoard[r]].reverse();
          const res = slideRow(reversed);
          currentBoard[r] = res.row.reverse();
          totalGained += res.pointsGained;
          if (res.merged) anyMerged = true;
          if (res.highestMerged > topMerge) topMerge = res.highestMerged;
        }
      } else if (direction === "UP") {
        let transposed = transpose(currentBoard);
        for (let r = 0; r < GRID_SIZE; r++) {
          const res = slideRow(transposed[r]);
          transposed[r] = res.row;
          totalGained += res.pointsGained;
          if (res.merged) anyMerged = true;
          if (res.highestMerged > topMerge) topMerge = res.highestMerged;
        }
        currentBoard = transpose(transposed);
      } else if (direction === "DOWN") {
        let transposed = transpose(currentBoard);
        for (let r = 0; r < GRID_SIZE; r++) {
          const reversed = [...transposed[r]].reverse();
          const res = slideRow(reversed);
          transposed[r] = res.row.reverse();
          totalGained += res.pointsGained;
          if (res.merged) anyMerged = true;
          if (res.highestMerged > topMerge) topMerge = res.highestMerged;
        }
        currentBoard = transpose(transposed);
      }

      // Check if board changed
      const changed = JSON.stringify(currentBoard) !== JSON.stringify(board);
      if (!changed) return;

      // Save previous state for undo
      setPrevBoard(board);
      setPrevScore(score);

      // Spawn tile
      const nextBoard = spawnTile(currentBoard);
      const newScore = score + totalGained;
      setBoard(nextBoard);
      setScore(newScore);

      // Best score update
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("cyber2048_best", String(newScore));
      }

      // Audio & Haptics
      if (soundEnabled && soundRef.current) {
        if (anyMerged) {
          soundRef.current.playMerge(topMerge || 4);
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(15);
          }
        } else {
          soundRef.current.playMove();
        }
      }

      // Check 2048 Victory
      if (!gameWon && !keepPlaying) {
        const has2048 = nextBoard.some((row) => row.some((val) => val === 2048));
        if (has2048) {
          setGameWon(true);
        }
      }

      // Check Game Over
      if (!canMove(nextBoard)) {
        setGameOver(true);
        if (soundEnabled && soundRef.current) {
          soundRef.current.playGameOver();
        }
      }
    },
    [board, score, bestScore, gameOver, gameWon, keepPlaying, soundEnabled]
  );

  // Undo move
  const handleUndo = () => {
    if (!prevBoard) return;
    setBoard(prevBoard);
    setScore(prevScore);
    setPrevBoard(null);
    setGameOver(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        makeMove("UP");
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        makeMove("DOWN");
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        makeMove("LEFT");
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        makeMove("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [makeMove]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const minDist = 26;
    if (Math.hypot(dx, dy) < minDist) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) makeMove("RIGHT");
      else makeMove("LEFT");
    } else {
      if (dy > 0) makeMove("DOWN");
      else makeMove("UP");
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("cyber2048_sound", String(next));
      return next;
    });
  };

  const getTileClass = (val: number) => {
    if (val === 0) return "";
    if (val <= 2048) {
      return styles[`tile-${val}`] || styles["tile-super"];
    }
    return styles["tile-super"];
  };

  return (
    <main className={styles.container}>
      <div className={styles.ambientGlowTop} aria-hidden="true" />

      {/* Top Bar: Exit button & Sound toggle */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.exitBtn} aria-label="Exit to portfolio">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Portfolio</span>
        </Link>

        <button
          onClick={toggleSound}
          className={styles.soundBtn}
          title={soundEnabled ? "Mute sound" : "Unmute sound"}
          aria-label="Toggle sound"
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>

      {/* Header Block: Title & Scores */}
      <div className={styles.headerBlock}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>CYBER 2048</h1>
          <span className={styles.subtitle}>Mobile Arcade // Touch Edition</span>
        </div>

        <div className={styles.scoreGroup}>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{score}</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Best</span>
            <span className={styles.scoreValue}>{bestScore}</span>
          </div>
        </div>
      </div>

      {/* 4x4 Grid Board */}
      <div
        className={styles.boardWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.grid}>
          {board.map((row, r) =>
            row.map((val, c) => (
              <div key={`${r}-${c}`} className={styles.cell}>
                {val > 0 && (
                  <div className={`${styles.tile} ${getTileClass(val)}`}>
                    {val}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className={styles.overlay}>
            <h2 className={styles.overlayTitle}>CORE DEPLETED</h2>
            <p className={styles.overlayScore}>Final Score: {score}</p>
            <button onClick={restartGame} className={styles.restartBtn}>
              Play Again
            </button>
          </div>
        )}

        {/* 2048 Victory Overlay */}
        {gameWon && (
          <div className={styles.overlay}>
            <h2 className={styles.overlayTitle} style={{ color: "#FF2D95" }}>
              2048 ACHIEVED!
            </h2>
            <p className={styles.overlayScore}>Legendary Energy Core Unlocked</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setGameWon(false)}
                className={styles.restartBtn}
                style={{ background: "#1e293b" }}
              >
                Keep Going
              </button>
              <button onClick={restartGame} className={styles.restartBtn}>
                Restart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Actions & Gesture Hint */}
      <div className={styles.bottomSection}>
        <div className={styles.actionRow}>
          <button onClick={restartGame} className={styles.newGameBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
            </svg>
            <span>Reset</span>
          </button>

          <button
            onClick={handleUndo}
            disabled={!prevBoard}
            className={styles.undoBtn}
            title="Undo last move"
          >
            <span>↩ Undo</span>
          </button>
        </div>

        <p className={styles.gestureHint}>
          Swipe in any direction to fuse quantum cores
        </p>
      </div>
    </main>
  );
}
