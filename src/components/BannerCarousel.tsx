"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BANNERS = [
  { id: 1, color: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" },
  { id: 2, color: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)" },
  { id: 3, color: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 mt-0.5 flex flex-col gap-2">
      {/* Slider Container */}
      <div className="relative w-full h-32 md:h-40 overflow-hidden rounded-xl shadow-md border border-slate-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ background: BANNERS[currentIndex].color }}
            className="absolute inset-0 w-full h-full"
          />
        </AnimatePresence>
      </div>

      {/* Indicators (Now below the slider) */}
      <div className="flex justify-center gap-1.5">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-6 bg-slate-400" 
                : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
