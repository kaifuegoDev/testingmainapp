"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Crown } from "lucide-react";

const TIMEFRAMES = [
  { id: "alltime", label: "ALL-TIME" },
  { id: "monthly", label: "MONTHLY" },
  { id: "weekly", label: "WEEKLY" },
];

const PodiumUser = ({ 
  name, 
  username, 
  amount, 
  rank, 
  avatarSize,
  isPro,
}: { 
  name: string; 
  username: string; 
  amount: string; 
  rank: number; 
  avatarSize: number;
  isPro?: boolean;
}) => {
  const isFirst = rank === 1;
  const hasAvatar = rank % 3 !== 0;
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: avatarSize, height: avatarSize }}>
        <div 
          style={{ width: avatarSize, height: avatarSize }}
          className="rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-md"
        >
          {hasAvatar ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User size={avatarSize * 0.6} className="text-slate-300" />
          )}
        </div>
        {isPro && <ProBadge />}
      </div>
      <div className="mt-3 flex flex-col items-center antialiased">
        <span className={`text-slate-800 font-semibold leading-tight font-kanit ${isFirst ? 'text-sm' : 'text-xs'}`}>
          {name}
        </span>
        <span className="text-slate-600 text-[10px] font-medium">
          {username}
        </span>
        <span className="text-emerald-600 font-bold text-xs mt-1 font-kanit">
          {amount}
        </span>
      </div>
    </div>
  );
};

const ProBadge = ({ small = false }: { small?: boolean }) => (
  <span className={`absolute bottom-0 right-0 inline-flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full shadow-sm shadow-amber-300/60 border-[1.5px] border-white z-10 ${small ? 'w-[14px] h-[14px]' : 'w-[18px] h-[18px]'}`}>
    <Crown size={small ? 7 : 9} className="text-amber-900" strokeWidth={2.5} />
  </span>
);

const LeaderboardItem = ({ 
    rank, 
    name, 
    username, 
    amount, 
    isUser,
    isPro,
}: { 
    rank: number; 
    name: string; 
    username: string; 
    amount: string; 
    isUser?: boolean;
    isPro?: boolean;
}) => {
  const hasAvatar = isUser || rank % 2 === 0;
  const avatarUrl = isUser 
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <div className={`px-4 py-3 flex items-center justify-between ${isUser ? 'bg-slate-100/90 backdrop-blur-sm' : 'bg-white'}`}>
      <div className="flex items-center gap-3">
        <span className="w-10 text-center text-[13px] font-bold text-slate-400 font-sora tracking-tight">
            #{rank}
        </span>
        <div className="relative w-11 h-11 flex-shrink-0">
          <div className={`w-11 h-11 rounded-full overflow-hidden flex items-center justify-center text-slate-400 border ${isUser ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100'}`}>
            {hasAvatar ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={22} />
            )}
          </div>
          {isPro && <ProBadge small />}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-slate-800 leading-none mb-1 font-sora">
            {name}
          </span>
          <span className="text-[11px] font-medium text-slate-600">
            {username}
          </span>
        </div>
      </div>
      <span className="text-emerald-600 font-extrabold text-[14px] font-sora tracking-tight">
        {amount}
      </span>
    </div>
  );
};

export default function Leaderboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("alltime");

  const getTopRankers = () => {
    switch(activeTimeframe) {
      case 'monthly':
        return [
          { name: "Nova", username: "@nova_gg", amount: "₹18,200", rank: 2, size: 56, isPro: true },
          { name: "Xenon", username: "@xenon_pro", amount: "₹22,500", rank: 1, size: 76, isPro: true },
          { name: "Zord", username: "@zord_op", amount: "₹15,700", rank: 3, size: 56, isPro: false },
        ];
      case 'alltime':
        return [
          { name: "Zord", username: "@zord_op", amount: "₹1,45,000", rank: 2, size: 56, isPro: false },
          { name: "Aryan", username: "@aryan_king", amount: "₹1,82,000", rank: 1, size: 76, isPro: true },
          { name: "Xenon", username: "@xenon_pro", amount: "₹1,20,000", rank: 3, size: 56, isPro: true },
        ];
      default: // weekly
        return [
          { name: "Xenon", username: "@xenon_pro", amount: "₹4,700", rank: 2, size: 56, isPro: true },
          { name: "Zord", username: "@zord_op", amount: "₹5,500", rank: 1, size: 76, isPro: false },
          { name: "Nova", username: "@nova_gg", amount: "₹3,700", rank: 3, size: 56, isPro: false },
        ];
    }
  };

  const topRankers = useMemo(() => getTopRankers(), [activeTimeframe]);

  const listItems = useMemo(() => {
    return Array.from({ length: 97 }, (_, i) => {
      const playerNames = ["Aryan", "Rohan", "Karan", "Rahul", "Vikas", "Amit", "Suresh", "Deepak", "Nikhil", "Sanjay", "Priya", "Mohit", "Ravi", "Sachin", "Aakash", "Tushar", "Varun", "Gaurav", "Harsh", "Ishaan", "Jay", "Kunal", "Lokesh", "Manish", "Nakul", "Om", "Piyush", "Qasim", "Ritesh", "Shubham"];
      const name = playerNames[i % playerNames.length];
      
      const multiplier = activeTimeframe === 'alltime' ? 50 : activeTimeframe === 'monthly' ? 5 : 1;
      const baseAmount = Math.floor(Math.random() * 3000 + 500);
      const numericAmount = baseAmount * multiplier;
      
      const isPro = i % 3 === 0; // every 3rd player is PRO (~33%)
      return {
        name: name,
        username: `@${name.toLowerCase()}`,
        amount: numericAmount,
        amountDisplay: `₹${numericAmount.toLocaleString()}`,
        isUser: false,
        isPro,
      };
    }).sort((a, b) => b.amount - a.amount)
      .map((item, i) => ({ ...item, rank: i + 4 }));
  }, [activeTimeframe]);

  return (
    <div className="flex flex-col min-h-full bg-white font-sora relative gpu-accel">
      {/* Premium Header - Sticky */}
      <div className="bg-white px-6 lg:px-12 pt-5 pb-8 sticky top-0 z-10 border-b border-slate-100 shadow-sm">
        {/* Timeframe Filter Tabs */}
        <div className="bg-slate-100 p-1 rounded-full flex items-center w-full mb-6">
          {TIMEFRAMES.map((tab) => {
            const isActive = activeTimeframe === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTimeframe(tab.id)}
                className={`relative flex-1 py-1.5 text-[10px] font-bold tracking-wider transition-colors duration-200 z-10 ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              >
                <span className="relative z-20 uppercase">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="leaderboardTimeframe"
                    className="absolute inset-0 bg-slate-900 rounded-full z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-end justify-between px-2">
          {/* Rank 2 */}
          <PodiumUser {...topRankers[0]} avatarSize={topRankers[0].size} />
          
          {/* Rank 1 */}
          <PodiumUser {...topRankers[1]} avatarSize={topRankers[1].size} />
          
          {/* Rank 3 */}
          <PodiumUser {...topRankers[2]} avatarSize={topRankers[2].size} />
        </div>
      </div>

      {/* List - Scrollable */}
      <div className="flex-1 overflow-y-auto mt-2 overscroll-none">
        {listItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <LeaderboardItem 
              rank={item.rank}
              name={item.name}
              username={item.username}
              amount={item.amountDisplay}
              isUser={item.rank === 7}
              isPro={item.isPro}
            />
            {idx < listItems.length - 1 && (
              <div className="mx-4 border-b border-slate-100" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Sticky "You" Row */}
      <div className="sticky bottom-0 bg-slate-100/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] z-20">
        <LeaderboardItem 
          rank={7} 
          name="Yashpal Chouhan" 
          username="@yashpal_op" 
          amount="₹128" 
          isUser={true} 
        />
      </div>
    </div>
  );
}
