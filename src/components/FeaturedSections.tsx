"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FeaturedSections() {
  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Box 1 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#003da5] to-[#0056e0] rounded-2xl shadow-lg shadow-blue-900/10 h-44 flex flex-col justify-between cursor-pointer"
        >
        </motion.div>

        {/* Box 2 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-2xl shadow-lg shadow-slate-900/10 h-44 flex flex-col justify-between cursor-pointer"
        >
        </motion.div>
      </div>
    </div>
  );
}
