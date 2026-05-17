"use client";

import React from "react";

interface GameModesProps {
  modes: string[];
  selectedMode: number;
  onSelectAction: (index: number) => void;
}

export default function GameModes({ modes, selectedMode, onSelectAction }: GameModesProps) {
  return (
    <div className="w-full bg-white border-b border-black/[0.05] h-10 flex items-center">
      <div className="flex overflow-x-auto no-scrollbar px-4 gap-3 scroll-smooth">
        {modes.map((mode, index) => {
          const isSelected = selectedMode === index;
          
          return (
            <button
              key={mode}
              onClick={() => onSelectAction(index)}
              className={`flex-shrink-0 px-3 h-8 rounded-lg text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap font-sora border flex items-center justify-center ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "bg-black/[0.05] text-black border-transparent hover:bg-black/[0.1]"
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



