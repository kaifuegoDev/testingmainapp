"use client";

import React from "react";
import { Home, Trophy, ShoppingBag, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center flex-1 py-2 relative"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 1,
          color: isActive ? "#003da5" : "#94a3b8",
        }}
        className="mb-1"
      >
        {icon}
      </motion.div>
      <span
        className={`text-[10px] font-semibold ${
          isActive ? "text-[#003da5]" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default function BottomNavbar({
  activeTab,
  setActiveTabAction,
}: {
  activeTab: string;
  setActiveTabAction: (tab: string) => void;
}) {
  const tabs = [
    { id: "home", label: "Home", icon: <Home size={22} /> },
    { id: "matches", label: "My Matches", icon: <Trophy size={22} /> },
    { id: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={22} /> },
    { id: "store", label: "Store", icon: <ShoppingBag size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 pb-safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
      <div className="max-w-md mx-auto flex items-center h-16">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTabAction(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}
