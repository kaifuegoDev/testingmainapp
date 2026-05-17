"use client";

import React from "react";
import { Calendar, Target, Users, Clock, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

interface ArenaCardProps {
  id: string;
  title: string;
  prizePool: string;
  entryFee: string;
  startTime: string;
  slotsFilled: number;
  totalSlots: number;
  mode: string; 
  map: string;
  imageUrl?: string;
  status?: "UPCOMING" | "ONGOING" | "COMPLETED";
}

export default function ArenaCard({
  title = "SURVIVAL MATCH",
  prizePool = "1,20,000",
  entryFee = "Free",
  startTime = "15 MAR, 2026 • 12:00 PM",
  slotsFilled = 42,
  totalSlots = 100,
  mode = "SQUAD",
  map = "BERMUDA",
  imageUrl,
  status = "UPCOMING"
}: Partial<ArenaCardProps>) {
  
  const isFull = slotsFilled >= totalSlots;
  const isFree = entryFee.toUpperCase() === "FREE" || entryFee === "0";
  const isOngoing = status === "ONGOING";

  return (
    <div className="bg-white rounded-lg border border-black/[0.08] shadow-[0_6px_15px_rgba(0,0,0,0.08)] overflow-hidden mb-5 mx-4 flex flex-col gpu-accel">
      {/* Top Section: Image and Info */}
      <div className="p-3 flex gap-3.5">
        {/* Icon Container */}
        <div className="relative w-[76px] h-[76px] flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border border-black/[0.05] flex items-center justify-center shadow-sm">
          <Gamepad2 size={36} className="text-black/10" />
          
          {isOngoing && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border border-white" />
          )}
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="text-[13.5px] font-medium text-[#0f172a] leading-tight uppercase tracking-[0.3px] line-clamp-2 mb-1.5 font-kanit">
            {title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-black/45 font-kanit">
            <Calendar size={12} />
            <span className="text-[10px] font-medium uppercase">{startTime}</span>
          </div>
        </div>
      </div>

      {/* Metrics Section (Gray Box) */}
      <div className="mx-3 mb-3 p-2 bg-[#F9FAFB] rounded-md flex items-center justify-between border border-black/[0.02]">
        <Metric label="PRIZE POOL" value={prizePool.startsWith('₹') ? prizePool : `₹${prizePool}`} />
        <div className="w-[0.5px] h-5 bg-black/10" />
        <Metric label="ENTRY FEE" value={isFree ? "FREE" : (entryFee.startsWith('₹') ? entryFee : `₹${entryFee}`)} isFree={isFree} />
        <div className="w-[0.5px] h-5 bg-black/10" />
        <Metric label="MODE" value={mode.toUpperCase()} />
        <div className="w-[0.5px] h-5 bg-black/10" />
        <Metric label="MAP" value={map.toUpperCase()} />
      </div>

      <div className="px-3 pb-3 flex items-end gap-4">
        {/* Slots Fill Line */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[9px] font-bold tracking-tight">
            <span className="text-slate-600 uppercase font-sora">SLOTS FILLED</span>
            <span className={`font-sora font-bold ${isFull ? "text-red-500" : "text-slate-900"}`}>
              {slotsFilled}/{totalSlots}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-black/[0.02]">
            <div 
              style={{ width: `${(slotsFilled / totalSlots) * 100}%` }}
              className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-slate-900'}`}
            />
          </div>
        </div>

        <button 
          disabled={isFull}
          className={`h-[34px] px-6 font-bold text-[10px] tracking-[0.5px] rounded-md uppercase transition-all active:scale-[0.98] font-sora text-white shadow-sm whitespace-nowrap
          ${isFull 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 border border-green-600/20'}`}
        >
          {isFull ? "FULL" : "JOIN NOW"}
        </button>
      </div>
    </div>
  );
}

function Metric({ label, value, isFree }: { label: string, value: string, isFree?: boolean }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[9px] text-black/40 font-medium tracking-[0.5px] mb-1 uppercase font-sora">{label}</span>
      <span className={`text-[12px] font-semibold leading-none font-sora ${isFree ? 'text-[#22C55E]' : 'text-black'}`}>
        {value}
      </span>
    </div>
  );
}


