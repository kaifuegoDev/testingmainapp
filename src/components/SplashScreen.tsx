"use client";

import React from "react";
import { motion } from "framer-motion";

const letters = ["Z", "i", "g", "z", "e", "c"];

// Each letter zigzags: odd index = up, even index = down
const zigzagY = (i: number) => (i % 2 === 0 ? -30 : 30);

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      {/* Zigzac Letter Animation */}
      <div className="flex items-center">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: zigzagY(i) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 12,
            }}
            className="text-5xl font-black tracking-tight text-[#003da5] font-kanit"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Underline swipe animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="h-[3px] w-28 bg-[#003da5] rounded-full mt-1"
      />

      {/* Tagline fade in */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="text-slate-400 text-xs font-medium tracking-widest uppercase mt-4"
      >
        Play · Compete · Win
      </motion.p>
    </motion.div>
  );
}
