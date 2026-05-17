"use client";

import { useState } from "react";
import BottomNavbar from "@/components/BottomNavbar";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import MyMatches from "@/components/MyMatches";
import Wallet from "@/components/Wallet";
import AppDrawer from "@/components/AppDrawer";
import AccountView from "@/components/AccountView";
import StoreView from "@/components/StoreView";
import RewardsView from "@/components/RewardsView";
import ReferEarnView from "@/components/ReferEarnView";
import PremiumView from "@/components/PremiumView";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, ShoppingBag, Construction } from "lucide-react";

import SplashScreen from "@/components/SplashScreen";
import AuthScreen from "@/components/AuthScreen";
import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showWallet, setShowWallet] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showRefer, setShowRefer] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
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
          <div className="flex flex-col h-full bg-white min-h-[calc(100dvh-4rem)] lg:min-h-screen">
            {/* Mobile-only header is handled by the global Header in page.tsx now, but views might still want their own sub-headers. 
                However, for 'home', the global header is enough. */}
            <div className="lg:hidden">
              <Header 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onWalletClickAction={() => setShowWallet(true)} 
                onMenuClickAction={() => setIsDrawerOpen(true)}
              />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-10 lg:mt-0">
              <Construction className="text-amber-500 mb-3 drop-shadow-sm" size={36} strokeWidth={1.5} />
              <h2 className="text-slate-400 font-bold text-xl tracking-tight font-sora uppercase lg:text-2xl">
                Construction
              </h2>
              <p className="text-slate-300 text-[13px] font-medium mt-1.5 lg:text-sm max-w-[280px]">
                Something exciting is in the works. Our new gaming arena is coming soon.
              </p>
            </div>
          </div>
        );
      case "matches":
        return <MyMatches />;
      case "leaderboard":
        return <Leaderboard />;
      case "store":
        return <StoreView />;
      case "rewards":
        return <RewardsView />;
      default:
        return null;
    }
  };

  const handleNavigate = (tab: string) => {
    if (tab === "account") {
      setShowAccount(true);
    } else if (tab === "rewards") {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setShowRewards(true);
      } else {
        setActiveTab(tab);
      }
    } else if (tab === "refer") {
      setShowRefer(true);
    } else if (tab === "premium") {
      setShowPremium(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <main className="h-[100dvh] overflow-hidden bg-white flex flex-col">
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
          {/* Desktop Persistent Header */}
          <div className="hidden lg:block h-[72px]">
            <Header 
              activeTab={activeTab}
              onTabChange={handleNavigate}
              onWalletClickAction={() => setShowWallet(true)} 
              onMenuClickAction={() => setIsDrawerOpen(true)}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="flex-1 pb-16 lg:pb-0 overflow-y-auto flex flex-col overscroll-none">
              <div className="max-w-7xl mx-auto w-full min-h-full flex flex-col">
                {renderContent()}
              </div>
            </div>
            
            {/* Mobile Bottom Navbar */}
            <div className="lg:hidden">
              <BottomNavbar activeTab={activeTab} setActiveTabAction={setActiveTab} />
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {showWallet && (
          <Wallet key="wallet" onBackAction={() => setShowWallet(false)} />
        )}

        {showAccount && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[120]"
          >
            <AccountView 
              onBackAction={() => setShowAccount(false)} 
              onLogoutAction={() => {
                setIsLoggedIn(false);
                setShowAccount(false);
                localStorage.removeItem("isLoggedIn");
              }}
            />
          </motion.div>
        )}

        {showRewards && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[120] lg:hidden"
          >
            <RewardsView 
              onBackAction={() => setShowRewards(false)} 
            />
          </motion.div>
        )}

        {showRefer && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[120]"
          >
            <ReferEarnView 
              onBackAction={() => setShowRefer(false)} 
            />
          </motion.div>
        )}

        {showPremium && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[120]"
          >
            <PremiumView 
              onBackAction={() => setShowPremium(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AppDrawer 
        isOpen={isDrawerOpen} 
        onCloseAction={() => setIsDrawerOpen(false)} 
        onNavigateAction={handleNavigate} 
        onWalletClickAction={() => { setIsDrawerOpen(false); setShowWallet(true); }}
        onLogoutAction={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }}
      />
    </main>
  );
}
