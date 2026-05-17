"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, CheckCircle2, ChevronRight, History, Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { AdMob, RewardAdOptions, AdMobRewardItem, RewardAdPluginEvents } from '@capacitor-community/admob';
import ticketIcon from "../assets/ticket.png";

import { Capacitor } from '@capacitor/core';

interface RewardsViewProps {
  onBackAction?: () => void;
}

export default function RewardsView({ onBackAction }: RewardsViewProps) {
  const [isClaimed, setIsClaimed] = useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);

  const [ticketsRemaining, setTicketsRemaining] = useState(5);
  const [showTicketClaimAnimation, setShowTicketClaimAnimation] = useState(false);
  const [isTicketAdLoading, setIsTicketAdLoading] = useState(false);

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
        }, 2500);
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
      
      let rewardEarned = false;
      const rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
        rewardEarned = true;
      });

      const dismissListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        if (rewardEarned) {
          console.log("AdMob: Reward received and ad closed");
          setShowClaimAnimation(true);
          setTimeout(() => {
            setIsClaimed(true);
            setShowClaimAnimation(false);
            setIsAdLoading(false);
          }, 2500);
        } else {
          console.log("AdMob: No reward or closed early");
          setIsAdLoading(false);
        }
        rewardListener.remove();
        dismissListener.remove();
      });

      await AdMob.showRewardVideoAd();
    } catch (error: any) {
      console.error("AdMob Error:", error);
      setIsAdLoading(false);
      alert(`Ad Error: ${error.message || "Please check your internet and try again."}`);
    }
  };

  const handleTicketClaim = async () => {
    if (ticketsRemaining <= 0 || isTicketAdLoading) return;

    setIsTicketAdLoading(true);

    // Mock Ad for Web
    if (Capacitor.getPlatform() === 'web') {
      console.log("Simulating Ticket Ad on Web...");
      setTimeout(() => {
        setShowTicketClaimAnimation(true);
        setTimeout(() => {
          setTicketsRemaining(prev => prev - 1);
          setShowTicketClaimAnimation(false);
          setIsTicketAdLoading(false);
        }, 2500);
      }, 2000);
      return;
    }

    // Real AdMob for Native
    try {
      console.log("AdMob: Initializing Ticket Ad...");
      await AdMob.initialize();

      const options: RewardAdOptions = {
        adId: 'ca-app-pub-3940256099942544/5224354917', // Android Test ID
      };

      console.log("AdMob: Preparing Ticket Ad...");
      await AdMob.prepareRewardVideoAd(options);
      
      console.log("AdMob: Showing Ticket Ad...");
      
      let rewardEarned = false;
      const rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
        rewardEarned = true;
      });

      const dismissListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        if (rewardEarned) {
          console.log("AdMob: Ticket Reward received and ad closed");
          setShowTicketClaimAnimation(true);
          setTimeout(() => {
            setTicketsRemaining(prev => prev - 1);
            setShowTicketClaimAnimation(false);
            setIsTicketAdLoading(false);
          }, 2500);
        } else {
          console.log("AdMob: No ticket reward or closed early");
          setIsTicketAdLoading(false);
        }
        rewardListener.remove();
        dismissListener.remove();
      });

      await AdMob.showRewardVideoAd();
    } catch (error: any) {
      console.error("AdMob Error:", error);
      setIsTicketAdLoading(false);
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
      {/* Mobile Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 lg:hidden">
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

      <div className="h-16 lg:hidden" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-10 lg:mt-0 gap-10">
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
              {isClaimed ? "Next reward in 24h" : "Watch ad to get +50 Gems"}
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

        <div className="w-full max-w-[150px] h-[1px] bg-slate-200/50" />

        {/* Claim Tickets */}
        <div className="w-full max-w-[260px] flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
               <img src={ticketIcon.src} alt="Ticket" className="w-[30px] h-[30px] object-contain drop-shadow-sm" />
            </div>
            {ticketsRemaining > 0 && (
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-sm" 
               />
            )}
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {ticketsRemaining === 0 ? "Tickets Claimed" : "Claim Tickets"}
            </h2>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
              {ticketsRemaining === 0 ? "Next tickets in 24h" : `Watch ad to get +1 Ticket (${ticketsRemaining}/5)`}
            </p>
          </div>

          <button
            onClick={handleTicketClaim}
            disabled={ticketsRemaining === 0 || isTicketAdLoading}
            className={`w-full py-2.5 rounded-xl font-bold text-[11px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
              ticketsRemaining === 0 
              ? "bg-slate-100 text-slate-400 cursor-default" 
              : isTicketAdLoading
              ? "bg-emerald-600/50 text-white cursor-wait"
              : "bg-emerald-600 text-white shadow-lg shadow-emerald-900/10 active:scale-[0.98]"
            }`}
          >
            {isTicketAdLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Loading...
              </>
            ) : ticketsRemaining === 0 ? (
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-10">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-24px] border border-blue-400/30 border-dashed rounded-full"
                />
                <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative z-10">
                  <img src="/assets/gem.png" alt="Gem" className="w-14 h-14 object-contain" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                  +50 Gems!
                </h2>
                
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
                  <span className="relative text-[13px] font-extrabold text-slate-500 tracking-[0.15em] uppercase px-6 py-2">
                    Claimed Successfully
                  </span>
                </div>
              </div>

              {/* Close/Continue button could be added here if needed, but keeping it auto-dismiss for now to match current logic */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket Claim Animation Overlay */}
      <AnimatePresence>
        {showTicketClaimAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-10">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-24px] border border-emerald-400/30 border-dashed rounded-full"
                />
                <div className="w-28 h-28 bg-emerald-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative z-10">
                  <img src={ticketIcon.src} alt="Ticket" className="w-14 h-14 object-contain" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                  +1 Ticket!
                </h2>
                
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full" />
                  <span className="relative text-[13px] font-extrabold text-slate-500 tracking-[0.15em] uppercase px-6 py-2">
                    Claimed Successfully
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
