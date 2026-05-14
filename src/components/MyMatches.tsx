"use client";

import React from "react";
import { Trophy } from "lucide-react";

export default function MyMatches() {
  return (
    <div className="flex flex-col h-full bg-white font-sora min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16">
        <Trophy className="text-[#003da5] mb-4" size={48} />
        <h3 className="text-slate-700 font-semibold text-base mb-1">Coming Soon</h3>
        <p className="text-slate-400 text-sm">Tournaments are starting soon!</p>
      </div>
    </div>
  );
}
