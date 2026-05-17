"use client";

import React, { useState } from "react";
import { Trophy, Clock, PlayCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "upcoming", label: "UPCOMING", icon: Clock },
  { id: "ongoing", label: "ONGOING", icon: PlayCircle },
  { id: "finished", label: "FINISHED", icon: CheckCircle2 },
];

export default function MyMatches() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col bg-white min-h-full font-sora">
      {/* Sticky Header with Integrated Tabs */}
      <div className="sticky top-0 bg-white z-50 shadow-sm border-b border-slate-50 lg:border-none lg:shadow-none">
        <div className="h-14 lg:h-8 flex items-center justify-center lg:hidden">
          <h1 className="text-slate-900 font-extrabold text-[17px] tracking-tight font-kanit">
            My Matches
          </h1>
        </div>
        
        <div className="px-4 pt-2 pb-4 lg:pt-5 lg:px-8">
          <div className="bg-slate-100 p-1 rounded-full flex items-center w-full max-w-md mx-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-1.5 lg:py-2.5 text-[10px] lg:text-[12px] font-bold tracking-wider transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                >
                  <span className="relative z-20 uppercase">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-slate-900 rounded-full z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area - Perfectly Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center -mt-20"
          >
            <div className="mb-4">
              {activeTab === "upcoming" && <Clock className="text-slate-300" size={40} strokeWidth={1.5} />}
              {activeTab === "ongoing" && <PlayCircle className="text-slate-300" size={40} strokeWidth={1.5} />}
              {activeTab === "finished" && <Trophy className="text-slate-300" size={40} strokeWidth={1.5} />}
            </div>
            
            <h3 className="text-slate-600 font-bold text-sm mb-1 tracking-tight">
              {activeTab === "upcoming" && "No Upcoming Matches"}
              {activeTab === "ongoing" && "No Matches Live"}
              {activeTab === "finished" && "No Completed Matches"}
            </h3>
            
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-[200px]">
              {activeTab === "upcoming" && "Join a tournament to see it here."}
              {activeTab === "ongoing" && "Currently no matches are in progress."}
              {activeTab === "finished" && "Your match history is empty."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
