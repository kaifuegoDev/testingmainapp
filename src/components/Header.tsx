"use client";

import React from "react";
import { Wallet, Crown, Trophy, Home, ShoppingBag, BarChart3, Gift } from "lucide-react";
import { motion } from "framer-motion";
import ticketIcon from "../assets/ticket.png";

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
  activeTab?: string;
  balance?: string;
  tickets?: string;
  onTabChange?: (tab: string) => void;
  onWalletClickAction?: () => void;
  onMenuClickAction?: () => void;
}

const ProBadge = ({ small = false }: { small?: boolean }) => (
  <span className={`absolute bottom-0 right-0 inline-flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full shadow-sm shadow-amber-300/60 border-[1.5px] border-white z-10 ${small ? 'w-[14px] h-[14px]' : 'w-[16px] h-[16px]'}`}>
    <Crown size={small ? 7 : 8} className="text-amber-900" strokeWidth={2.5} />
  </span>
);

export default function Header({ 
  userName = "Guest Player", 
  avatarUrl,
  activeTab,
  balance,
  tickets,
  onTabChange,
  onWalletClickAction,
  onMenuClickAction
}: HeaderProps) {
  const tabs = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "matches", label: "My Matches", icon: <Trophy size={18} /> },
    { id: "leaderboard", label: "Leaderboard", icon: <BarChart3 size={18} /> },
    { id: "store", label: "Store", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <header className="bg-white px-4 py-3 lg:px-10 flex items-center justify-between fixed top-0 left-0 w-full z-50 border-b border-slate-100 font-sora shadow-sm h-[72px]">
      
      {/* --- MOBILE LAYOUT --- */}
      <div className="flex lg:hidden items-center justify-between w-full">
        {/* Left: Profile */}
        <div 
          onClick={onMenuClickAction}
          className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              {avatarUrl ? (
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
              )}
            </div>
            <ProBadge small />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Welcome</span>
            <span className="text-sm font-extrabold text-slate-900 leading-tight">{userName}</span>
          </div>
        </div>

        {/* Right: Wallet */}
        <div className="flex items-center">
          <button 
            onClick={onWalletClickAction}
            className="flex items-center justify-center h-[36px] w-[36px] rounded-full bg-[#003da5] text-white active:scale-95 transition-transform shadow-md shadow-[#003da5]/20"
          >
            <Wallet size={16} />
          </button>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden lg:flex items-center justify-between w-full h-full">
        {/* Left: App Logo & Name */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-[#003da5] to-[#002b75] rounded-xl flex items-center justify-center shadow-lg shadow-[#003da5]/20">
            <Trophy size={18} className="text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-kanit tracking-tight uppercase">Zigzec</span>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-8 h-full shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex items-center gap-2.5 h-full px-1 relative transition-all duration-300 group ${
                activeTab === tab.id 
                  ? "text-[#003da5]" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {tab.icon}
              </div>
              <span className="text-[15px] font-bold tracking-tight">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[#003da5]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Wallet & Profile */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors cursor-default h-[42px] px-4 rounded-full">
            <img src="/assets/gem.png" alt="Gems" className="w-[18px] h-[18px] object-contain drop-shadow-sm" />
            <span className="text-[14px] font-extrabold text-slate-700 font-kanit tracking-tight">{balance || "634,800"}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors cursor-default h-[42px] px-4 rounded-full">
            <img src={ticketIcon.src} alt="Tickets" className="w-[18px] h-[18px] object-contain drop-shadow-sm" />
            <span className="text-[14px] font-extrabold text-slate-700 font-kanit tracking-tight">{tickets || "100"}</span>
          </div>

          <button 
            onClick={onWalletClickAction}
            className="flex items-center justify-center h-[42px] w-[42px] rounded-full bg-[#003da5] text-white hover:bg-[#002b75] transition-all active:scale-95 group shadow-md shadow-[#003da5]/20"
          >
            <Wallet size={18} className="group-hover:animate-pulse" />
          </button>

          <div 
            onClick={onMenuClickAction}
            className="flex items-center pl-4 border-l border-slate-100 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#003da5] transition-colors">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                  </div>
                )}
              </div>
              <ProBadge small={false} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
