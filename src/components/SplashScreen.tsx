"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-[#003da5] rounded-3xl flex items-center justify-center shadow-xl">
          <Trophy className="text-white" size={48} strokeWidth={2.5} />
        </div>
      </motion.div>
    </motion.div>
  );
}
