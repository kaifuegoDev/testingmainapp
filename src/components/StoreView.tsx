"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, History, X, Check, ArrowRight, Wallet as WalletIcon } from 'lucide-react';

interface Voucher {
  id: string;
  provider: string;
  value: string;
  stock: number;
  price: number;
  bgColor: string;
  logoColor: string;
  image: string;
}

const VOUCHERS: Voucher[] = [
  // Google Play Group
  { id: '1', provider: 'GOOGLE PLAY', value: '₹25', stock: 0, price: 2500, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png' },
  { id: '3', provider: 'GOOGLE PLAY', value: '₹50', stock: 95, price: 5000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png' },
  { id: '5', provider: 'GOOGLE PLAY', value: '₹100', stock: 72, price: 10000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png' },
  { id: '7', provider: 'GOOGLE PLAY', value: '₹250', stock: 42, price: 25000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png' },
  
  // Flipkart Group
  { id: '2', provider: 'FLIPKART', value: '₹25', stock: 0, price: 2500, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png' },
  { id: '4', provider: 'FLIPKART', value: '₹50', stock: 88, price: 5000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png' },
  { id: '6', provider: 'FLIPKART', value: '₹100', stock: 55, price: 10000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png' },
  { id: '8', provider: 'FLIPKART', value: '₹250', stock: 38, price: 25000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png' },
];

const StoreView: React.FC = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const handleRedeem = () => {
    setIsRedeeming(true);
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      setRedeemSuccess(true);
      setTimeout(() => {
        setRedeemSuccess(false);
        setSelectedVoucher(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen font-sora">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 border-b border-slate-100 bg-white z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
          <img src="/assets/gem.png" alt="Gems" className="w-5 h-5 object-contain" />
          <span className="text-[14px] font-bold text-slate-900 leading-none tracking-tight">634,800</span>
        </div>
        

        
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
          <History size={22} />
        </button>
      </div>

      {/* Spacer for Fixed Header */}
      <div className="h-16" />

      <div className="p-4 space-y-6 pb-24">


        {/* Redeem Vouchers Label */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-slate-800 font-bold text-[12px] tracking-tight uppercase flex items-center gap-2">
              Redeem Vouchers
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">6 items available</span>
          </div>
          
          {/* Vouchers Grid */}
          <div className="grid grid-cols-2 gap-4">
            {VOUCHERS.map((voucher, index) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => voucher.stock > 0 && setSelectedVoucher(voucher)}
                className={`group relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all ${voucher.stock > 0 ? 'active:scale-[0.98] cursor-pointer hover:border-slate-300' : 'opacity-60 grayscale cursor-not-allowed'}`}
              >
                {/* Shine Effect */}
                {voucher.stock > 0 && (
                  <motion.div
                    initial={{ x: "-150%", skewX: -20 }}
                    animate={{ x: "200%" }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatDelay: 3, 
                      duration: 1.2, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent z-10 pointer-events-none"
                  />
                )}

                <div className={`${voucher.bgColor} h-28 flex items-center justify-center m-1 rounded-lg`}>
                  <img src={voucher.image} alt={voucher.provider} className="h-12 object-contain opacity-90" />
                </div>
                
                <div className="px-2.5 pb-2.5 pt-0.5 space-y-2 z-20">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 font-bold tracking-wide uppercase truncate">{voucher.provider}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 tracking-tight">{voucher.value}</span>
                      <span className={`text-[8px] font-bold uppercase ${voucher.stock === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {voucher.stock === 0 ? 'Out of stock' : `${voucher.stock} left`}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-center gap-1 py-1 rounded-md transition-all duration-200 ${voucher.stock > 0 ? 'bg-blue-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <img src="/assets/gem.png" alt="Gem" className={`w-3 h-3 object-contain ${voucher.stock === 0 ? 'opacity-40' : ''}`} />
                    <span className="text-[10px] font-bold">{voucher.price.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Redeem Modal Overlay */}
      <AnimatePresence>
        {selectedVoucher && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRedeeming && setSelectedVoucher(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-[100]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 pb-8 z-[110] shadow-2xl"
            >
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
              
              {!redeemSuccess ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className={`${selectedVoucher.bgColor} w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100 p-2.5`}>
                      <img src={selectedVoucher.image} alt={selectedVoucher.provider} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{selectedVoucher.provider}</h2>
                      <p className="text-slate-500 text-xs font-medium">Redeem for {selectedVoucher.value} credit</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                    <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Cost</span>
                    <div className="flex items-center gap-1.5">
                      <img src="/assets/gem.png" alt="Gem" className="w-4 h-4 object-contain" />
                      <span className="text-xl font-bold text-slate-900 tracking-tight">{selectedVoucher.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      disabled={isRedeeming}
                      onClick={handleRedeem}
                      className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg active:scale-[0.99] transition-all disabled:opacity-70 text-[13px] uppercase tracking-wide shadow-md shadow-blue-100"
                    >
                      {isRedeeming ? "Processing..." : "Confirm Redemption"}
                    </button>
                    <button
                      disabled={isRedeeming}
                      onClick={() => setSelectedVoucher(null)}
                      className="w-full bg-white text-slate-500 font-bold py-3.5 rounded-lg active:scale-[0.99] transition-all text-[13px] uppercase tracking-wide border border-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
                    <Check size={40} className="text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Redemption Successful!</h2>
                    <p className="text-slate-500 text-sm">Your voucher code has been sent to your registered email.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreView;
