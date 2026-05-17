"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, Copy, Share2, 
  Wallet, Users, CheckCircle2,
  Gift, Trophy, ChevronRight, Search,
  History as HistoryIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReferEarnViewProps {
  onBackAction: () => void;
}

export default function ReferEarnView({ onBackAction }: ReferEarnViewProps) {
  const [referralCode] = useState("ZIGZEC77");
  const [copied, setCopied] = useState(false);
  const [showReferralList, setShowReferralList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const referrals = React.useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: ["Rohan Sharma", "Aryan Khan", "Priya Patel", "Sahil Verma", "Neha Gupta", "Vikram Singh", "Anjali Rao", "Deepak Kumar"][i % 8] + (i > 7 ? ` ${Math.floor(i/8)}` : ""),
    username: `@user_${i + 100}`,
    status: i % 3 === 0 ? "Pending" : "Joined",
    amount: i % 3 === 0 ? "Pending" : "₹5",
    isSuccess: i % 3 !== 0,
    date: i < 5 ? "Just now" : i < 15 ? "2h ago" : i < 30 ? "5h ago" : i < 50 ? "8h ago" : i < 75 ? "Yesterday" : "2d ago",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 40}`
  })), []);

  const filteredReferrals = React.useMemo(() => referrals.filter(ref => {
    const matchesSearch = ref.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ref.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "joined" && ref.isSuccess) || 
                      (activeTab === "pending" && !ref.isSuccess);
    
    return matchesSearch && matchesTab;
  }), [referrals, searchQuery, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-white z-[120] flex flex-col font-sora overflow-hidden gpu-accel">
      {/* Header — Back button and Referrals History Icon (Clean) */}
      <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <button 
          onClick={onBackAction} 
          className="p-2 text-white active:scale-90 transition-transform pointer-events-auto"
        >
          <ArrowLeft size={24} />
        </button>

        <button 
          onClick={() => setShowReferralList(true)}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform pointer-events-auto"
        >
          <Users size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-none">
        
        {/* Brand Blue Gradient Banner */}
        <div className="pt-16 pb-12 px-6 bg-gradient-to-br from-[#003da5] via-[#004dc7] to-[#0066ee] relative overflow-hidden flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-white mb-6 mt-4 max-w-[200px] leading-tight font-kanit tracking-tight">
              Earn ₹5 for each New Friend!
            </h2>

          {/* Friends Illustration */}
          <div className="flex items-end justify-center gap-2 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white/50 overflow-hidden shadow-lg">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="friend" />
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-200 border-4 border-white overflow-hidden shadow-xl -mt-4 relative">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="friend" />
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white/50 overflow-hidden shadow-lg">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lily" alt="friend" />
            </div>
            
            {/* Floating Coins - Gold/Yellow */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -left-4 top-0">
               <div className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-200 shadow-sm shadow-yellow-500/20" />
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute -right-2 top-4">
               <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-200 shadow-sm shadow-yellow-500/20" />
            </motion.div>
          </div>

          {/* Background Decorative Circles */}
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Info Card — Matching your app's card style */}
        <div className="px-5 -mt-6 relative z-10">
          <div className="bg-white rounded-xl p-4 shadow-xl shadow-slate-200/40 border border-slate-50 flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Wallet className="text-[#003da5]" size={24} />
             </div>
             <div className="flex-1">
                <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                  Share your referral code and invite your friends. You both earn <span className="text-emerald-600 font-bold tracking-tight">₹ 5</span> when they play their first paid match.
                </p>
             </div>
          </div>
        </div>

        {/* Timeline Section — Brand Blue Theme */}
        <div className="mt-10 px-5 flex flex-col items-center">
          <div className="flex items-center w-full justify-between px-4 relative">
             {/* Connecting Line */}
             <div className="absolute top-5 left-12 right-12 h-[1px] bg-slate-100" />
             
             {[
               { icon: <Users size={24} className="text-[#003da5]" />, label: "Invite friends to sign up" },
               { icon: <Gift size={24} className="text-[#003da5]" />, label: "They register with your code" },
               { icon: <CheckCircle2 size={24} className="text-[#003da5]" />, label: "They play 1st paid match & both earn ₹5" }
             ].map((step, i) => (
               <div key={i} className="flex flex-col items-center gap-3 w-24 relative z-10">
                 <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-md">
                   {step.icon}
                 </div>
                 <span className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-tight leading-tight">
                   {step.label}
                 </span>
               </div>
             ))}
          </div>
        </div>

        {/* Referral Code Box — Clickable for better UX */}
        <div className="mt-12 px-6 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-3">Your Referral Code</span>
          <button 
            onClick={handleCopy}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-10 relative overflow-hidden group active:scale-95 transition-all"
          >
             <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                   <span className="text-xl font-bold text-slate-900 tracking-widest font-sora uppercase">{referralCode}</span>
                   <div className={`transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                   </div>
                </div>
             </div>
             
             {/* Subtle hover/active effect */}
             <div className="absolute inset-0 bg-blue-500/0 group-active:bg-blue-500/5 transition-colors" />
          </button>
        </div>

        {/* Action Button — Matching Leaderboard Black Style */}
        <div className="mt-10 px-6 flex flex-col items-center">
          <button className="w-full bg-slate-900 hover:bg-black text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.98] transition-all tracking-wider text-[11px] uppercase">
            <Share2 size={18} />
            REFER NOW
          </button>
        </div>

        <div className="h-10" />
      </div>

      {/* Referral History Overlay */}
      <AnimatePresence>
        {showReferralList && (
           <motion.div
             initial={{ x: "100%" }}
             animate={{ x: 0 }}
             exit={{ x: "100%" }}
             transition={{ type: "spring", damping: 30, stiffness: 300 }}
             className="fixed inset-0 bg-white z-[130] flex flex-col font-sora"
           >
              <div className="bg-white border-b border-slate-100 px-4 h-20 flex items-center justify-between sticky top-0 z-20 relative">
                 <button 
                   onClick={() => setShowReferralList(false)} 
                   className="p-2 text-slate-800 active:scale-90 transition-all relative z-30"
                 >
                    <ArrowLeft size={24} />
                 </button>
                 
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight font-sora">My Referrals</h3>
                 </div>

                 {/* Spacer to balance flex-between */}
                 <div className="w-10" />
              </div>

              {/* FIXED HEADER CONTENT: Earnings, Search, Filters */}
              <div className="bg-white shrink-0 z-10 shadow-sm">
                 {/* Search Bar Section */}
                 <div className="px-4 pt-4 pb-4">
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003da5] transition-colors" size={18} />
                       <input 
                         type="text"
                         placeholder="Search friends..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400"
                       />
                    </div>
                 </div>

                 {/* Filters Section — EXACT Leaderboard Segmented Pill Style */}
                 <div className="px-4 pb-4 border-b border-slate-50">
                    <div className="bg-slate-50/80 p-1 rounded-full flex items-center">
                       {[
                         { id: "all", label: "All" },
                         { id: "pending", label: "Pending" }
                       ].map((tab) => (
                         <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                             activeTab === tab.id 
                             ? 'bg-slate-900 text-white shadow-sm' 
                             : 'text-slate-400 hover:text-slate-600'
                           }`}
                         >
                           {tab.label}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              {/* SCROLLABLE LIST */}
              <div className="flex-1 overflow-y-auto overscroll-none pb-20">
                 <div className="flex flex-col">
                    {filteredReferrals.length > 0 ? filteredReferrals.map((ref, i) => (
                      <div key={i}>
                        <div className="px-4 py-4 flex items-center justify-between active:bg-slate-50 transition-colors">
                           <div className="flex items-center gap-4">
                              {/* Position Number like Leaderboard */}
                              <span className="text-[12px] font-bold text-slate-300 w-5">
                                 {(i + 1).toString().padStart(2, '0')}
                              </span>

                              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ref.name}`} alt="user" className="w-full h-full object-cover" />
                              </div>

                              <div className="flex flex-col min-w-0">
                                 <span className="text-[13.5px] font-bold text-slate-800 leading-none mb-1 font-sora truncate">{ref.name}</span>
                                 <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[11px] font-medium text-slate-400 truncate">{ref.username}</span>
                                    <span className="w-[3px] h-[3px] rounded-full bg-slate-300 shrink-0" />
                                    <span className="text-[9px] font-medium text-slate-400 uppercase whitespace-nowrap">{ref.date}</span>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="flex flex-col items-end shrink-0 pl-2">
                              <span className={`font-bold font-sora ${
                                ref.isSuccess 
                                ? 'text-[14px] text-emerald-600' 
                                : 'text-[10px] text-slate-400'
                              }`}>
                                 {ref.amount}
                              </span>
                           </div>
                        </div>
                        <div className="mx-4 border-b border-slate-50" />
                      </div>
                    )) : (
                      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <Search size={28} className="opacity-20" />
                         </div>
                         <p className="text-[12px] font-medium">No records found</p>
                      </div>
                    )}
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
