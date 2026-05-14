"use client";

import React, { useState } from "react";
import { ArrowLeft, ReceiptText, ChevronDown, Plus, Minus, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Wallet({ onBackAction }: { onBackAction: () => void }) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");

  const balances = {
    total: 2450,
    winnings: 1200,
    deposit: 1000,
    bonus: 250,
  };

  const renderDeposit = () => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Amount to Add
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min ₹10"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-8 pr-4 text-sm font-bold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {["50", "100", "200", "500"].map((preset) => (
          <button
            key={preset}
            onClick={() => setAmount(preset)}
            className="bg-white hover:bg-slate-50 py-2 rounded-md text-xs font-bold text-slate-600 transition-colors border border-slate-100"
          >
            +₹{preset}
          </button>
        ))}
      </div>

      <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-sm">
        <Plus size={16} />
        Add Money
      </button>
    </motion.div>
  );

  const renderWithdraw = () => (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Withdraw Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
            <input
              type="number"
              placeholder="Min ₹100"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-8 pr-4 text-sm font-bold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            UPI ID
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <CreditCard size={14} />
            </span>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. name@upi, @paytm"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-sm font-bold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>


      <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg shadow-md shadow-slate-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-sm">
        <Minus size={16} />
        Withdraw
      </button>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col font-sora">
      <header className="px-4 py-3 flex items-center justify-between border-b border-slate-50">
        <button onClick={onBackAction} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-800">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Wallet</h1>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-800">
          <ReceiptText size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Nav Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg flex items-center">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "deposit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "withdraw" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Balance Card */}
        <div className="space-y-3">
          <div 
            onClick={() => activeTab === "deposit" && setShowBreakdown(!showBreakdown)}
            className={`flex items-center justify-between ${activeTab === "deposit" ? "cursor-pointer" : ""}`}
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {activeTab === "deposit" ? "Total Balance" : "Winning Balance"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-emerald-500 font-kanit">
                ₹{activeTab === "deposit" ? balances.total : balances.winnings}
              </span>
              {activeTab === "deposit" && (
                <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} className="text-emerald-500">
                  <ChevronDown size={18} />
                </motion.div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {activeTab === "deposit" && showBreakdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Winnings</span>
                    <span className="font-bold text-slate-800">₹{balances.winnings}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Deposit</span>
                    <span className="font-bold text-slate-800">₹{balances.deposit}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Bonus</span>
                    <span className="font-bold text-slate-800">₹{balances.bonus}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-2">
          {activeTab === "deposit" ? renderDeposit() : renderWithdraw()}
        </div>
      </div>
    </div>
  );
}
