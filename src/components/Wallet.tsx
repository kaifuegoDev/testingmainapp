"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ReceiptText, ChevronDown, Plus, Minus, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Wallet({ onBackAction }: { onBackAction: () => void }) {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");

  const balances = {
    total: 2450,
    winnings: 1200,
    deposit: 1000,
    bonus: 250,
    tickets: 100,
  };

  const renderDeposit = () => (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-500 ml-1">
          Amount to Add
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min ₹10"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {["50", "100", "200", "500"].map((preset) => (
          <button
            key={preset}
            onClick={() => setAmount(preset)}
            className="bg-white hover:bg-slate-50 py-2 rounded-lg text-xs font-semibold text-slate-600 transition-colors border border-slate-200"
          >
            +₹{preset}
          </button>
        ))}
      </div>

      <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-[15px] tracking-wide">
        Add Money
      </button>
    </div>
  );

  const renderWithdraw = () => (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Withdraw Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">₹</span>
            <input
              type="number"
              placeholder="Min ₹100"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 ml-1">
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
              placeholder="e.g. name@upi"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>


      <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-[15px] tracking-wide">
        Withdraw
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center lg:p-4">
      {/* Backdrop for Desktop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBackAction}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm hidden lg:block"
      />

      {/* Main Container */}
      <motion.div 
        layout
        initial={{ y: isDesktop ? "100%" : 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: isDesktop ? "100%" : 0, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full h-full lg:h-fit lg:max-w-[420px] bg-white flex flex-col font-sora lg:rounded-2xl lg:shadow-2xl overflow-hidden"
      >
        <header className="px-5 py-4 flex items-center justify-between border-b border-slate-50">
          <button onClick={onBackAction} className="p-2.5 hover:bg-slate-50 rounded-full transition-colors text-slate-800">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Wallet</h1>
          <button className="p-2.5 hover:bg-slate-50 rounded-full transition-colors text-slate-800">
            <ReceiptText size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 lg:max-h-[80vh]">
          {/* Nav Toggle */}
          <div className="bg-slate-100 p-1.5 rounded-full flex items-center w-full">
            <button
              onClick={() => setActiveTab("deposit")}
              className={`w-1/2 py-2.5 text-sm font-bold rounded-full transition-all text-center ${
                activeTab === "deposit" ? "bg-slate-800 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`w-1/2 py-2.5 text-sm font-bold rounded-full transition-all text-center ${
                activeTab === "withdraw" ? "bg-slate-800 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Withdraw
            </button>
          </div>

          {/* Balance Card */}
          <div className="space-y-4">
            <div 
              onClick={() => activeTab === "deposit" && setShowBreakdown(!showBreakdown)}
              className={`flex items-center justify-between p-1 ${activeTab === "deposit" ? "cursor-pointer" : ""}`}
            >
              <span className="text-sm font-semibold text-slate-500">
                {activeTab === "deposit" ? "Total Balance" : "Winning Balance"}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                  ₹{activeTab === "deposit" ? balances.total : balances.winnings}
                </span>
                {activeTab === "deposit" && (
                  <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} className="text-emerald-500">
                    <ChevronDown size={20} />
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
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 shadow-inner">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-400">Winnings</span>
                      <span className="font-bold text-slate-800">₹{balances.winnings}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-400">Deposit</span>
                      <span className="font-bold text-slate-800">₹{balances.deposit}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-400">Bonus</span>
                      <span className="font-bold text-slate-800">₹{balances.bonus}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-400">Tickets</span>
                      <span className="font-bold text-slate-800">{balances.tickets}</span>
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
      </motion.div>
    </div>
  );
}
