"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, CheckCircle2, ChevronRight, History, Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { AdMob, RewardAdOptions, AdMobRewardItem } from '@capacitor-community/admob';

import { Capacitor } from '@capacitor/core';

interface RewardsViewProps {
  onBackAction?: () => void;
}

export default function RewardsView({ onBackAction }: RewardsViewProps) {
  const [isClaimed, setIsClaimed] = useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);

  React.useEffect(() => {
    if (Capacitor.getPlatform() !== 'web') {
      AdMob.initialize();
    }
  }, []);

  const handleClaim = async () => {
    if (isClaimed || isAdLoading) return;

    setIsAdLoading(true);

    // Mock Ad for Web
    if (Capacitor.getPlatform() === 'web') {
      console.log("Simulating Ad on Web...");
      setTimeout(() => {
        setShowClaimAnimation(true);
        setTimeout(() => {
          setIsClaimed(true);
          setShowClaimAnimation(false);
          setIsAdLoading(false);
        }, 1500);
      }, 2000);
      return;
    }

    // Real AdMob for Native
    try {
      console.log("AdMob: Initializing...");
      await AdMob.initialize();

      const options: RewardAdOptions = {
        adId: 'ca-app-pub-3940256099942544/5224354917', // Android Test ID
      };

      console.log("AdMob: Preparing Ad...");
      await AdMob.prepareRewardVideoAd(options);
      
      console.log("AdMob: Showing Ad...");
      const reward = await AdMob.showRewardVideoAd();
      
      if (reward) {
        console.log("AdMob: Reward received");
        setShowClaimAnimation(true);
        setTimeout(() => {
          setIsClaimed(true);
          setShowClaimAnimation(false);
          setIsAdLoading(false);
        }, 1500);
      } else {
        console.log("AdMob: No reward");
        setIsAdLoading(false);
      }
    } catch (error: any) {
      console.error("AdMob Error:", error);
      setIsAdLoading(false);
      alert(`Ad Error: ${error.message || "Please check your internet and try again."}`);
    }
  };

  const DAYS = [
    { day: 1, amount: 100, status: 'completed' },
    { day: 2, amount: 200, status: 'completed' },
    { day: 3, amount: 300, status: 'current' },
    { day: 4, amount: 400, status: 'upcoming' },
    { day: 5, amount: 500, status: 'upcoming' },
    { day: 6, amount: 600, status: 'upcoming' },
    { day: 7, amount: 1500, status: 'upcoming', isSpecial: true },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen font-sora">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="h-14 flex items-center px-4 relative">
          <button 
            onClick={onBackAction}
            className="w-10 h-10 flex items-center justify-center text-slate-400 active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-slate-900 font-extrabold text-[17px] tracking-tight">
              Rewards
            </h1>
          </div>
        </div>
        <div className="h-[1px] bg-slate-200/50 w-full" />
      </div>

      <div className="h-16" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-10">
        {/* Compact Centered Claim Logic */}
        <div className="w-full max-w-[260px] flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
               <Gift className="text-blue-600" size={28} />
            </div>
            {!isClaimed && (
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-sm" 
               />
            )}
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {isClaimed ? "Reward Claimed" : "Daily Bonus"}
            </h2>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
              {isClaimed ? "Next reward in 24h" : "Watch ad to get +300 Gems"}
            </p>
          </div>

          <button
            onClick={handleClaim}
            disabled={isClaimed || isAdLoading}
            className={`w-full py-2.5 rounded-xl font-bold text-[11px] tracking-widest uppercase transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isClaimed 
              ? "bg-slate-100 text-slate-400 cursor-default" 
              : isAdLoading
              ? "bg-blue-600/50 text-white cursor-wait"
              : "bg-blue-600 text-white shadow-lg shadow-blue-900/10"
            }`}
          >
            {isAdLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Loading...
              </>
            ) : isClaimed ? (
              "Claimed"
            ) : (
              "Claim Now"
            )}
          </button>
        </div>
      </div>

      {/* Claim Animation Overlay */}
      <AnimatePresence>
        {showClaimAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] border-2 border-dashed border-blue-200 rounded-full"
                />
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200 relative z-10">
                  <img src="/assets/gem.png" alt="Gem" className="w-12 h-12 animate-bounce" />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-black text-slate-900 tracking-tight">+300 Gems!</h2>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-2">Claimed Successfully</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
