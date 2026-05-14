"use client";

import React from "react";
import { motion } from "framer-motion";

interface GameModesProps {
  modes: string[];
  selectedMode: string;
  onSelect: (mode: string) => void;
}

export default function GameModes({ modes, selectedMode, onSelect }: GameModesProps) {
  return (
    <div className="w-full bg-white">
      <div className="flex overflow-x-auto no-scrollbar py-1 px-4 gap-2 scroll-smooth">
        {modes.map((mode) => {
          const isSelected = selectedMode === mode;
          return (
            <button
              key={mode}
              onClick={() => onSelect(mode)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap font-outfit ${
                isSelected
                  ? "bg-[#475569] text-white shadow-sm"
                  : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
