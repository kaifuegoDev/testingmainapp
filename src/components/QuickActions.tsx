"use client";

import React from "react";
import { Trophy, BarChart3, ShoppingBag, Gift } from "lucide-react";

interface Action {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const ACTIONS: Action[] = [
  { id: "matches", icon: <Trophy size={24} />, label: "My Matches" },
  { id: "leaderboard", icon: <BarChart3 size={24} />, label: "Leaderboard" },
  { id: "store", icon: <ShoppingBag size={24} />, label: "Store" },
  { id: "rewards", icon: <Gift size={24} />, label: "Rewards" },
];

interface QuickActionsProps {
  onActionClick?: (id: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="px-4 mt-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-50 font-sora">
        <div className="grid grid-cols-4 gap-2">
          {ACTIONS.map((action) => (
            <div 
              key={action.id} 
              onClick={() => onActionClick?.(action.id)}
              className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#003da5] flex items-center justify-center text-white mb-3 shadow-md group-hover:bg-[#002d7a] transition-colors">
                {action.icon}
              </div>
              <span className="text-[10px] md:text-xs text-slate-600 font-medium text-center leading-tight max-w-[70px]">
                {action.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
