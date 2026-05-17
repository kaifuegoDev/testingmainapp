"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Gem, History, X, Check, ArrowRight, Wallet as WalletIcon, ChevronRight, Flame } from 'lucide-react';

interface SwipeToRedeemProps {
  onConfirm: () => void;
  disabled: boolean;
}

const SwipeToRedeem: React.FC<SwipeToRedeemProps> = ({ onConfirm, disabled }) => {
  const [swiped, setSwiped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Create a background color transition from light slate to blue
  const background = useTransform(
    x,
    [0, 200],
    ["rgba(241, 245, 249, 1)", "rgba(37, 99, 235, 0.2)"]
  );

  const handleDragEnd = (_: any, info: any) => {
    if (disabled || swiped) return;
    
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const handleWidth = 46 + 8; // width + padding/margin
    const maxSwipe = containerWidth - handleWidth;
    const threshold = maxSwipe * 0.95; // 95% threshold for "full end" feel
    
    if (info.offset.x >= threshold) {
      setSwiped(true);
      onConfirm();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[54px] bg-slate-100 rounded-xl p-1 overflow-hidden select-none border border-slate-200/50"
    >
      <motion.div 
        style={{ background }}
        className="absolute inset-0 z-0"
      />
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex items-center gap-1 opacity-40">
           <span className="text-[10px] font-extrabold text-slate-900 tracking-[0.2em] uppercase">
            {swiped ? "Processing..." : "Slide to Redeem"}
          </span>
          {!swiped && (
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={14} className="text-slate-900" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Draggable Handle */}
      <motion.div
        drag={disabled || swiped ? false : "x"}
        dragConstraints={{ left: 0, right: (containerRef.current?.offsetWidth || 300) - 54 }} 
        dragElastic={0.05}
        dragSnapToOrigin={!swiped}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className={`absolute left-1 top-1 bottom-1 w-[46px] bg-blue-600 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg shadow-blue-200 z-20 ${disabled || swiped ? 'opacity-50 grayscale' : ''}`}
      >
        {swiped ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
          </motion.div>
        ) : (
          <ArrowRight className="text-white" size={20} strokeWidth={2.5} />
        )}
      </motion.div>

      {/* Progress Overlay */}
      <motion.div 
        style={{ width: x }}
        className="absolute left-0 top-0 bottom-0 bg-blue-600/10 z-0"
      />
    </div>
  );
};

interface Voucher {
  id: string;
  provider: string;
  value: string;
  stock: number;
  price: number;
  bgColor: string;
  logoColor: string;
  image: string;
  isHot?: boolean;
}

const VOUCHERS: Voucher[] = [
  // Google Play Group
  { id: '1', provider: 'GOOGLE PLAY', value: '₹25', stock: 0, price: 2500, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png', isHot: true },
  { id: '3', provider: 'GOOGLE PLAY', value: '₹50', stock: 95, price: 5000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png', isHot: true },
  { id: '5', provider: 'GOOGLE PLAY', value: '₹100', stock: 72, price: 10000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png', isHot: true },
  { id: '7', provider: 'GOOGLE PLAY', value: '₹250', stock: 42, price: 25000, bgColor: 'bg-[#F8FAFC]', logoColor: 'text-blue-500', image: '/assets/google-play.png', isHot: true },
  
  // Flipkart Group
  { id: '2', provider: 'FLIPKART', value: '₹25', stock: 0, price: 2500, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png', isHot: true },
  { id: '4', provider: 'FLIPKART', value: '₹50', stock: 88, price: 5000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png', isHot: true },
  { id: '6', provider: 'FLIPKART', value: '₹100', stock: 55, price: 10000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png', isHot: true },
  { id: '8', provider: 'FLIPKART', value: '₹250', stock: 38, price: 25000, bgColor: 'bg-[#EFF6FF]', logoColor: 'text-blue-600', image: '/assets/flipkart.png', isHot: true },
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
    <div className="flex flex-col bg-white min-h-full font-sora">
      {/* Sticky Header - Mobile Only */}
      <div className="sticky top-0 h-[68px] border-b border-slate-100 bg-white z-50 flex items-center justify-between px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full relative z-10 border border-slate-100">
          <img src="/assets/gem.png" alt="Gems" className="w-5 h-5 object-contain" />
          <span className="text-[14px] font-bold text-slate-900 leading-none tracking-tight">634,800</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-slate-900 font-extrabold text-[17px] tracking-tight font-kanit">
            Store
          </h1>
        </div>
        
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors relative z-10 hover:bg-slate-50 rounded-full">
          <History size={22} />
        </button>
      </div>

      <div className="p-4 lg:px-0 lg:pb-12 space-y-6 pb-24 max-w-5xl mx-auto w-full lg:mt-8">


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
              <div
                key={voucher.id}
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

                {/* Hot Badge */}
                {voucher.isHot && (
                  <div className="absolute top-2.5 right-2.5 z-30 bg-orange-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Flame size={10} fill="currentColor" />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Hot</span>
                  </div>
                )}

                <div className={`${voucher.bgColor} h-32 flex items-center justify-center m-1 rounded-lg`}>
                  <img src={voucher.image} alt={voucher.provider} className="h-14 object-contain opacity-90" />
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
                  
                  <div className={`flex items-center justify-center gap-1 py-1 rounded-md transition-all duration-200 ${voucher.stock > 0 ? 'bg-blue-50 text-slate-900' : 'bg-slate-50 text-slate-400'}`}>
                    <img src="/assets/gem.png" alt="Gem" className={`w-3 h-3 object-contain ${voucher.stock === 0 ? 'opacity-40' : ''}`} />
                    <span className="text-[10px] font-bold">{voucher.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redeem Modal Overlay */}
      <AnimatePresence>
        {selectedVoucher && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center lg:items-center lg:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRedeeming && setSelectedVoucher(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full mt-auto h-fit lg:mt-0 lg:max-w-[420px] bg-white rounded-t-[32px] lg:rounded-2xl p-6 lg:p-8 pb-8 lg:pb-8 shadow-2xl overflow-hidden"
            >
              <div className="w-10 h-1 bg-slate-100 rounded-full mx-auto mb-6 lg:hidden" />
              
              {!redeemSuccess ? (
                <div className="space-y-6">
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
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Cost</span>
                    <div className="flex items-center gap-1.5">
                      <img src="/assets/gem.png" alt="Gem" className="w-4 h-4 object-contain" />
                      <span className="text-lg font-bold text-slate-900 tracking-tight">{selectedVoucher.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <SwipeToRedeem 
                      onConfirm={handleRedeem}
                      disabled={isRedeeming}
                    />
                    
                    <button
                      disabled={isRedeeming}
                      onClick={() => setSelectedVoucher(null)}
                      className="w-full bg-white text-slate-400 font-bold py-3.5 rounded-lg active:scale-[0.99] transition-all text-[11px] uppercase tracking-[0.1em] border border-slate-100"
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreView;
