"use client";

import React from "react";
import { 
  User, Wallet, Trophy, 
  Gamepad2, HeadphonesIcon, Share2, ShieldAlert,
  LogOut, ChevronRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppDrawerProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onNavigateAction: (tab: string) => void;
  onWalletClickAction?: () => void;
  onLogoutAction?: () => void;
}
export default function AppDrawer({ 
  isOpen,
  onCloseAction, 
  onNavigateAction, 
  onWalletClickAction,
  onLogoutAction 
}: AppDrawerProps) {
  const user = {
    name: "Anshul Gamer",
    username: "@anshulgg",
    played: 24,
    wins: 8,
    earned: 1200,
  };

  const menuItems = [
    { id: "account", label: "Account", icon: <User size={20} strokeWidth={1.8} /> },
    { id: "gameinfo", label: "Game Info", icon: <Info size={20} strokeWidth={1.8} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={20} strokeWidth={1.8} />, isWallet: true },
    { id: "banlist", label: "Ban List", icon: <ShieldAlert size={20} strokeWidth={1.8} /> },
    { id: "matches", label: "My Matches", icon: <Gamepad2 size={20} strokeWidth={1.8} /> },
    { id: "support", label: "Support", icon: <HeadphonesIcon size={20} strokeWidth={1.8} /> },
    { id: "refer", label: "Refer & Earn", icon: <Share2 size={20} strokeWidth={1.8} /> },
  ];

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            className="fixed inset-0 bg-black/30 z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[110] flex flex-col font-sora"
      >
        {/* Header — White, centered */}
        <div className="bg-white border-b border-slate-50 px-6 pt-14 pb-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 overflow-hidden mb-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-[17px] font-semibold text-slate-800 leading-tight tracking-tight">
            {user.name}
          </h2>
          <p className="text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">{user.username}</p>

          {/* Stats */}
          <div className="mt-5 w-full border border-slate-100 rounded-xl flex items-center">
            <div className="flex-1 flex flex-col items-center py-3">
              <span className="text-[11px] font-semibold text-slate-500">Played</span>
              <span className="text-[15px] font-semibold text-slate-800">{user.played}</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex-1 flex flex-col items-center py-3">
              <span className="text-[11px] font-semibold text-slate-500">Wins</span>
              <span className="text-[15px] font-semibold text-slate-800">{user.wins}</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex-1 flex flex-col items-center py-3">
              <span className="text-[11px] font-semibold text-slate-500">Earned</span>
              <span className="text-[15px] font-semibold text-emerald-600">₹{user.earned}</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.isWallet && onWalletClickAction) {
                  onWalletClickAction();
                } else {
                  onNavigateAction(item.id);
                }
                onCloseAction();
              }}
              className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 group-hover:text-slate-700 transition-colors">
                  {item.icon}
                </span>
                <span className="text-[15px] font-medium text-slate-800">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          ))}

          {/* Divider */}
          <div className="mx-5 my-2 h-px bg-slate-50" />

          {/* Logout */}
          <button 
            onClick={() => {
              if (onLogoutAction) onLogoutAction();
              onCloseAction();
            }}
            className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-red-50 transition-colors group"
          >
            <LogOut size={20} strokeWidth={1.8} className="text-red-500" />
            <span className="text-[15px] font-medium text-red-500">Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-50 text-center">
          <span className="text-xs text-slate-400">Version 1.0.4</span>
        </div>
      </motion.div>
    </>
  );
}
