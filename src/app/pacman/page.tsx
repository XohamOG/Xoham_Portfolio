'use client';

import React from 'react';
import Link from 'next/link';

export default function PacmanPage() {
  return (
    <main
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#07070a',
        overflow: 'hidden',
        zIndex: 999999,
      }}
    >
      {/* Floating Exit Button */}
      <Link
        href="/"
        style={{
          position: 'fixed',
          top: '14px',
          left: '20px',
          zIndex: 1000000,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '999px',
          color: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Exit arcade and return to portfolio"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Exit to Portfolio
      </Link>

      {/* Battle-tested authentic Dale Harvey Pac-Man Engine */}
      <iframe
        src="/pacman/index.html"
        title="Pac-Man Arcade Game"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="autoplay; fullscreen"
      />
    </main>
  );
}
