"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Crown, Check, Zap, Shield, Gift, HeadphonesIcon, Award, Gamepad2 } from "lucide-react";

interface PremiumViewProps {
  onBackAction: () => void;
}

export default function PremiumView({ onBackAction }: PremiumViewProps) {
  return (
    <div className="flex flex-col h-[100dvh] bg-white font-sora">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Hero Section */}
        <div className="pt-12 pb-6 px-4 text-center bg-gradient-to-b from-slate-900 to-slate-800 rounded-b-[2rem] text-white relative">
          <button 
            onClick={onBackAction}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20 active:scale-95 transition-all"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <div className="w-12 h-12 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
            <Crown size={24} className="text-slate-900" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-1.5">Upgrade to Premium</h2>
          <p className="text-slate-300 text-[12px] leading-relaxed max-w-[240px] mx-auto">
            Unlock exclusive tournaments, ad free experience, and fast withdrawals.
          </p>
        </div>

        {/* Plans */}
        <div className="px-4 mt-4 space-y-3">
          {/* Free Plan */}
          <div className="border-2 border-slate-100 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
              Current
            </div>
            <h3 className="text-[15px] font-bold text-slate-800">Basic</h3>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-800">Free</span>
            </div>
            
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Check size={10} className="text-slate-600" />
                </div>
                <span className="text-[12px] font-medium text-slate-600">Daily Playing Limit: 10</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Check size={10} className="text-slate-600" />
                </div>
                <span className="text-[12px] font-medium text-slate-600">2 Daily Free Matches</span>
              </div>
              <div className="flex items-center gap-2.5 opacity-40">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <X size={10} className="text-slate-400" />
                </div>
                <span className="text-[12px] font-medium text-slate-600 line-through">Ad Free Experience</span>
              </div>
              <div className="flex items-center gap-2.5 opacity-40">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <X size={10} className="text-slate-400" />
                </div>
                <span className="text-[12px] font-medium text-slate-600 line-through">Fast Withdrawals</span>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-amber-400 rounded-xl p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 to-white shadow-lg shadow-amber-500/10">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
              Recommended
            </div>
            <h3 className="text-[15px] font-bold text-amber-600 flex items-center gap-1.5">
              Pro <Crown size={14} strokeWidth={2.5} />
            </h3>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-800">₹29</span>
              <span className="text-[11px] font-semibold text-slate-500">/month</span>
            </div>
            
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Zap size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">Unlimited Playing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Gamepad2 size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">5 Daily Free Matches</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Award size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">Exclusive Pro Badge</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Gift size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">More Rewards</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Shield size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">Ad Free Experience</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <Zap size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">Fast Withdrawals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <HeadphonesIcon size={10} className="text-amber-600" />
                </div>
                <span className="text-[12px] font-semibold text-slate-700">Priority Support</span>
              </div>
            </div>
            
            <button className="w-full mt-5 bg-gradient-to-r from-slate-900 to-slate-800 text-amber-400 font-bold py-2.5 rounded-lg shadow-sm active:scale-95 transition-transform uppercase tracking-wide text-[12px]">
              Subscribe for ₹29
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
