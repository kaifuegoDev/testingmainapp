"use client";

import React from "react";
import { Calendar, Trophy, Target, Users } from "lucide-react";
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
  const fillPercentage = (slotsFilled / totalSlots) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-black/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-4 mx-1"
    >
      {/* Top Section: Image and Info */}
      <div className="p-3 flex gap-3.5">
        {/* Image */}
        <div className="relative w-[76px] h-[76px] flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-black/5">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black/10">
              <Target size={36} />
            </div>
          )}
          {status === "ONGOING" && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse border-2 border-white" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="text-[14px] font-bold text-[#0f172a] leading-snug uppercase tracking-tight line-clamp-2 mb-1.5 font-kanit">
            {title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-500 font-outfit">
            <Calendar size={11} className="opacity-60" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{startTime}</span>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mx-3 px-2 py-2.5 bg-[#f8fafc] rounded-md flex items-center justify-between border border-slate-100">
        <Metric label="PRIZE POOL" value={prizePool.startsWith('₹') ? prizePool : `₹${prizePool}`} />
        <div className="w-[0.5px] h-5 bg-slate-200" />
        <Metric label="ENTRY FEE" value={isFree ? "FREE" : (entryFee.startsWith('₹') ? entryFee : `₹${entryFee}`)} isFree={isFree} />
        <div className="w-[0.5px] h-5 bg-slate-200" />
        <Metric label="MODE" value={mode.toUpperCase()} />
        <div className="w-[0.5px] h-5 bg-slate-200" />
        <Metric label="MAP" value={map.toUpperCase()} />
      </div>

      {/* Slots & Join Row */}
      <div className="p-3 flex items-center gap-4 mt-0.5">
        {/* Progress Section */}
        <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-0.5 font-outfit">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Slots</span>
                <span className="text-[10px] font-bold text-slate-800 tracking-tighter">
                  {slotsFilled}<span className="text-slate-300 font-medium">/{totalSlots}</span>
                </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                />
            </div>
        </div>

        {/* Join Button */}
        <div className="flex-shrink-0">
            <button 
                className={`h-[36px] px-7 font-semibold text-[11px] rounded-md tracking-[0.5px] uppercase transition-all shadow-sm font-kanit
                ${isFull ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-[#0f172a] text-white hover:bg-black active:scale-95'}`}
            >
                {isFull ? 'FULL' : 'JOIN NOW'}
            </button>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ label, value, isFree }: { label: string, value: string, isFree?: boolean }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[8px] text-slate-400 font-bold tracking-[1px] mb-1 uppercase font-outfit">{label}</span>
      <span className={`text-[12px] font-bold leading-none tracking-tight font-kanit ${isFree ? 'text-emerald-500' : 'text-slate-800'}`}>
        {value}
      </span>
    </div>
  );
}
