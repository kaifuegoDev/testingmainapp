"use client";

import React from "react";
import { Home, Trophy, ShoppingBag, BarChart3, Wallet, User, Gift, Users, Crown, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  setActiveTabAction: (tab: string) => void;
  onNavigateAction: (tab: string) => void;
  onLogoutAction: () => void;
}

const SidebarItem = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? "bg-[#003da5] text-white shadow-lg shadow-[#003da5]/20" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"}`}>
        {icon}
      </div>
      <span className="font-medium text-sm font-sora">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </button>
  );
};

export default function Sidebar({ 
  activeTab, 
  setActiveTabAction,
  onNavigateAction,
  onLogoutAction
}: SidebarProps) {
  const mainTabs = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "matches", label: "My Matches", icon: <Trophy size={20} /> },
    { id: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={20} /> },
    { id: "store", label: "Store", icon: <ShoppingBag size={20} /> },
  ];

  const secondaryTabs = [
    { id: "account", label: "Account", icon: <User size={20} /> },
    { id: "rewards", label: "Rewards", icon: <Gift size={20} /> },
    { id: "refer", label: "Refer & Earn", icon: <Users size={20} /> },
    { id: "premium", label: "Premium", icon: <Crown size={20} /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-white border-r border-slate-100 fixed left-0 top-0 z-[60]">
      {/* Logo Section */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003da5] rounded-xl flex items-center justify-center shadow-lg shadow-[#003da5]/20">
            <Trophy size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 font-kanit tracking-tight leading-none">
              ZIGZEC
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              Gaming Arena
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-4 py-2 space-y-8 overflow-y-auto">
        {/* Main Menu */}
        <div>
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Main Menu
          </p>
          <div className="space-y-1">
            {mainTabs.map((tab) => (
              <SidebarItem
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTabAction(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Explore Menu */}
        <div>
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Account & More
          </p>
          <div className="space-y-1">
            {secondaryTabs.map((tab) => (
              <SidebarItem
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={false} // These are overlays in mobile, can be views in desktop but for now let's keep navigation consistent
                onClick={() => onNavigateAction(tab.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-50">
        <button 
          onClick={onLogoutAction}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm font-sora">Logout</span>
        </button>
      </div>
    </aside>
  );
}
