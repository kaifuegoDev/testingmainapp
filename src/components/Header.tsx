"use client";

import React from "react";
import { Wallet } from "lucide-react";

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
  onWalletClickAction?: () => void;
  onMenuClickAction?: () => void;
}

export default function Header({ 
  userName = "Guest Player", 
  avatarUrl,
  onWalletClickAction,
  onMenuClickAction
}: HeaderProps) {
  return (
    <header className="bg-white px-4 py-3 flex items-center justify-between fixed w-full top-0 left-0 z-50 border-b border-slate-50 font-sora">
      <div 
        onClick={onMenuClickAction}
        className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
      >
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-emerald-200 transition-colors">
          {avatarUrl ? (
            <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          )}
        </div>
        
        {/* Welcome Text */}
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-500 leading-none mb-1">
            Welcome back,
          </span>
          <span className="text-[15px] font-semibold text-slate-900 leading-none font-kanit">
            {userName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Wallet Button */}
        <button 
          onClick={onWalletClickAction}
          className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors active:scale-90"
        >
          <Wallet size={20} />
        </button>
      </div>
    </header>
  );
}
