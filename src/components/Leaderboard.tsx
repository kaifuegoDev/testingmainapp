"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const PodiumUser = ({ 
  name, 
  username, 
  amount, 
  rank, 
  avatarSize 
}: { 
  name: string; 
  username: string; 
  amount: string; 
  rank: number; 
  avatarSize: number;
}) => {
  const isFirst = rank === 1;
  const hasAvatar = rank % 3 !== 0; // 1st and 2nd have avatars, 3rd doesn't
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: rank * 0.1 }}
      className="flex flex-col items-center"
    >
      <div 
        style={{ width: avatarSize, height: avatarSize }}
        className="rounded-full bg-white/20 border-2 border-white/10 flex items-center justify-center relative overflow-hidden shadow-xl"
      >
        {hasAvatar ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User size={avatarSize * 0.6} className="text-white/30" />
        )}
      </div>
      <div className="mt-3 flex flex-col items-center">
        <span className={`text-white font-semibold leading-tight font-kanit ${isFirst ? 'text-sm' : 'text-xs'}`}>
          {name}
        </span>
        <span className="text-white/60 text-[10px] font-medium">
          {username}
        </span>
        <span className="text-emerald-400 font-bold text-xs mt-1 font-kanit">
          {amount}
        </span>
      </div>
    </motion.div>
  );
};

const LeaderboardItem = ({ 
    rank, 
    name, 
    username, 
    amount, 
    isUser 
}: { 
    rank: number; 
    name: string; 
    username: string; 
    amount: string; 
    isUser?: boolean;
}) => {
  const hasAvatar = isUser || rank % 2 === 0; // User always has avatar, others every 2nd rank
  const avatarUrl = isUser 
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return (
    <div className={`px-4 py-3 flex items-center justify-between ${isUser ? 'bg-slate-100/90 backdrop-blur-sm' : 'bg-white'}`}>
      <div className="flex items-center gap-3">
        <span className="w-10 text-center text-base font-bold text-slate-400 font-kanit">
            #{rank}
        </span>
        <div className={`w-11 h-11 rounded-full overflow-hidden flex items-center justify-center text-slate-400 border ${isUser ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100'}`}>
          {hasAvatar ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User size={22} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-slate-800 leading-none mb-1 font-sora">
            {name}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {username}
          </span>
        </div>
      </div>
      <span className="text-emerald-500 font-bold text-base font-kanit">
        {amount}
      </span>
    </div>
  );
};

export default function Leaderboard() {
  const topRankers = [
    { name: "Xenon", username: "@xenon_pro", amount: "₹4,700", rank: 2, size: 56 },
    { name: "Zord", username: "@zord_op", amount: "₹5,500", rank: 1, size: 76 },
    { name: "Nova", username: "@nova_gg", amount: "₹3,700", rank: 3, size: 56 },
  ];

  const listItems = Array.from({ length: 97 }, (_, i) => {
    const rank = i + 4;
    const playerNames = ["Aryan", "Rohan", "Karan", "Rahul", "Vikas", "Amit", "Suresh", "Deepak", "Nikhil", "Sanjay", "Priya", "Mohit", "Ravi", "Sachin", "Aakash", "Tushar", "Varun", "Gaurav", "Harsh", "Ishaan", "Jay", "Kunal", "Lokesh", "Manish", "Nakul", "Om", "Piyush", "Qasim", "Ritesh", "Shubham"];
    const name = playerNames[i % playerNames.length];
    return {
      name: name,
      username: `@${name.toLowerCase()}`,
      amount: `₹${Math.floor(Math.random() * 3000 + 500)}`,
      rank: rank,
      isUser: rank === 7
    };
  });

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] bg-white font-sora overflow-hidden relative">
      {/* Premium Header - Sticky */}
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] rounded-b-[32px] px-6 pt-5 pb-6 sticky top-0 z-10">
        <h2 className="text-center text-white/70 text-[10px] font-bold tracking-[3px] uppercase mb-5 font-kanit">
          Top Rankers
        </h2>
        
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
      <div className="flex-1 overflow-y-auto mt-2">
        {listItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <LeaderboardItem {...item} />
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
