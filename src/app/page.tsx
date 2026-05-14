"use client";

import { useState } from "react";
import BottomNavbar from "@/components/BottomNavbar";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import MyMatches from "@/components/MyMatches";
import Wallet from "@/components/Wallet";
import AppDrawer from "@/components/AppDrawer";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, ShoppingBag } from "lucide-react";

import BannerCarousel from "@/components/BannerCarousel";
import QuickActions from "@/components/QuickActions";
import FeaturedSections from "@/components/FeaturedSections";
import SplashScreen from "@/components/SplashScreen";
import AuthScreen from "@/components/AuthScreen";
import { useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showWallet, setShowWallet] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col gap-0 pb-20 bg-[#F1F5F9]/30 min-h-screen">
            <Header 
              onWalletClickAction={() => setShowWallet(true)} 
              onMenuClickAction={() => setIsDrawerOpen(true)}
            />
            <BannerCarousel />
            <QuickActions onActionClick={(id) => setActiveTab(id)} />
            <FeaturedSections />
          </div>
        );
      case "matches":
        return <MyMatches />;
      case "leaderboard":
        return <Leaderboard />;
      case "store":
        return (
          <div className="flex flex-col h-full bg-white font-sora min-h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16">
              <ShoppingBag className="text-[#003da5] mb-4" size={48} />
              <h3 className="text-slate-700 font-semibold text-base mb-1">Coming Soon</h3>
              <p className="text-slate-400 text-sm">New items are on their way!</p>
            </div>
          </div>
        );
      case "rewards":
        return (
          <div className="flex flex-col h-full bg-white font-sora min-h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16">
              <Gift className="text-[#003da5] mb-4" size={48} />
              <h3 className="text-slate-700 font-semibold text-base mb-1">Rewards Center</h3>
              <p className="text-slate-400 text-sm">Win matches to earn exclusive rewards!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <AnimatePresence>
        {!showSplash && !isLoggedIn && (
          <AuthScreen 
            key="auth" 
            onLoginSuccessAction={() => {
              setIsLoggedIn(true);
              localStorage.setItem("isLoggedIn", "true");
            }} 
          />
        )}
      </AnimatePresence>

      {isLoggedIn && (
        <>
          <div className="flex-1 pb-16 overflow-y-auto overflow-x-hidden flex flex-col">
            {renderContent()}
          </div>
          <BottomNavbar activeTab={activeTab} setActiveTabAction={setActiveTab} />
        </>
      )}

      <AnimatePresence>
        {showWallet && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100]"
          >
            <Wallet onBackAction={() => setShowWallet(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AppDrawer 
        isOpen={isDrawerOpen} 
        onCloseAction={() => setIsDrawerOpen(false)} 
        onNavigateAction={setActiveTab}
        onWalletClickAction={() => { setIsDrawerOpen(false); setShowWallet(true); }}
        onLogoutAction={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }}
      />
    </main>
  );
}
