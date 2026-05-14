"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BANNERS = [
  { id: 1, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
  { id: 2, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=800&auto=format&fit=crop" },
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
      <div className="relative w-full h-[120px] overflow-hidden rounded-xl shadow-md border border-slate-100 bg-slate-50">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={BANNERS[currentIndex].image}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 w-full h-full object-fill"
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
