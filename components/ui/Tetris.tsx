"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GAMES = [
  { name: "Tetris", url: "https://chvin.github.io/react-tetris/?lan=en" },
  { name: "Pac-Man", url: "https://pacman.platzh1rsch.ch/" },
  { name: "Clumsy Bird", url: "https://ellisonleao.github.io/clumsy-bird/" }
];

export default function Minigame({ onClose }: { onClose: () => void }) {
  const [game] = useState(() => GAMES[Math.floor(Math.random() * GAMES.length)]);

  // Prevent scroll when active
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md h-full max-h-[850px] border border-white/20 bg-[#060010] flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] rounded-none overflow-hidden"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20 bg-[#060010]">
          <h2 className="text-lg font-medium uppercase tracking-[0.2em] text-white/80 font-mono">{game.name}</h2>
          <button 
            onClick={onClose}
            className="border border-white/20 bg-transparent text-white/80 px-4 py-2 hover:bg-white/10 transition-colors active:translate-y-[2px] active:translate-x-[2px] font-medium uppercase text-xs tracking-wider"
          >
            Close
          </button>
        </div>

        {/* Game Iframe */}
        <div className="flex-1 w-full bg-black relative overflow-hidden">
          <iframe 
            src={game.url} 
            className="absolute inset-0 w-full h-full border-none"
            title={game.name}
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
