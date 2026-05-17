"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const, repeat: Infinity, repeatType: "reverse" as const },
        opacity: { duration: 0.1 }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
          className="overflow-visible relative z-10"
        >
          {/* Continuous Black Zigzag/Scribble */}
          <motion.path
            d="M 20 20 L 85 10 L 10 40 L 90 30 L 15 60 L 85 50 L 20 80 L 80 70 L 30 100 L 70 90"
            fill="transparent"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

