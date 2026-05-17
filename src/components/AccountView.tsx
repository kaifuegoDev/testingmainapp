"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, ChevronRight, Trash2, Lock, Pencil, X, Check } from "lucide-react";

interface AccountViewProps {
  onBackAction: () => void;
  onLogoutAction: () => void;
}

export default function AccountView({ onBackAction, onLogoutAction }: AccountViewProps) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("Felix");

  const avatarOptions = ["Felix", "Aneka", "Max", "Jude", "Loki", "Coco", "Milo", "Pepper", "Zoe", "Buster", "Luna", "Lucky"];

  const user = {
    name: "Anshul Gamer",
    username: "@anshulgg",
    email: "anshul@example.com",
    phone: "+91 9876543210",
    joinDate: "March 2024"
  };

  const sections = [
    {
      title: "Personal Information",
      items: [
        { icon: <User size={18} />, label: user.name, value: "", isLocked: false },
        { icon: <Mail size={18} />, label: user.email, value: "", isLocked: true },
        { icon: <Phone size={18} />, label: user.phone, value: "", isLocked: true },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/20 lg:bg-slate-900/40 backdrop-blur-[2px] z-[70] flex items-center justify-center font-sora">
      <motion.div 
        initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, scale: 0.95 } : { x: "100%" }}
        animate={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 1, scale: 1 } : { x: 0 }}
        className="w-full h-full lg:w-[500px] lg:h-[80vh] lg:rounded-[32px] bg-white flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <header className="px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between border-b border-slate-50">
          <button onClick={onBackAction} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-800">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg lg:text-xl font-bold text-slate-900 font-kanit">My Account</h1>
          <div className="w-10" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Profile Top Section */}
          <div className="px-6 py-8 flex flex-col items-center bg-white">
            <div className="relative mb-4 cursor-pointer group" onClick={() => setShowAvatarPicker(true)}>
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl overflow-hidden group-hover:opacity-90 transition-opacity">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAvatar}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil size={18} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-[#003da5] text-white rounded-full shadow-lg border-2 border-white">
                <Pencil size={10} />
              </button>
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">{user.username}</p>
            <div className="mt-3 px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Joined {user.joinDate}
            </div>
          </div>

          {/* Menu Sections */}
          <div className="px-6 py-2 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest text-[10px]">
                  {section.title}
                </h3>
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                  {section.items.map((item, i) => (
                    <button
                      key={i}
                      className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                        i !== section.items.length - 1 ? "border-b border-slate-50" : ""
                      }`}
                    >
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="p-2 bg-slate-50 rounded-xl text-slate-600">
                            {item.icon}
                          </span>
                          <p className="text-[13px] font-semibold text-slate-800">{item.label}</p>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 pr-2">{item.value}</p>
                      </div>
                      {item.isLocked ? (
                        <Lock size={13} className="text-slate-300" />
                      ) : (
                        <Pencil size={13} className="text-slate-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Delete Account Button */}
            <div className="flex flex-col items-center py-6 mb-10">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    onLogoutAction();
                  }
                }}
                className="text-red-500 font-bold text-xs hover:text-red-600 transition-colors border-b border-red-200 pb-0.5 uppercase tracking-wider"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Avatar Picker Drawer */}
        <AnimatePresence>
          {showAvatarPicker && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAvatarPicker(false)}
                className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
              />
              
              {/* Drawer/Modal */}
              <motion.div
                initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, scale: 0.9 } : { y: "100%" }}
                animate={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 1, scale: 1 } : { y: 0 }}
                exit={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, scale: 0.9 } : { y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[400px] lg:h-fit bg-white rounded-t-[32px] lg:rounded-[32px] z-[110] px-6 pt-2 pb-10 shadow-2xl overflow-hidden max-h-[70vh] flex flex-col"
              >
                {/* Handle */}
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto my-3 lg:hidden" />
                
                <div className="flex items-center justify-between mb-5 mt-2">
                  <h3 className="text-lg font-bold text-slate-800 font-kanit">Choose Avatar</h3>
                  <button 
                    onClick={() => setShowAvatarPicker(false)}
                    className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3 overflow-y-auto pr-1">
                  {avatarOptions.map((seed) => {
                    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                    const isSelected = selectedAvatar === seed;
                    
                    return (
                      <button
                        key={seed}
                        onClick={() => {
                          setSelectedAvatar(seed);
                        }}
                        className={`relative aspect-square rounded-2xl border-2 transition-all p-1 flex items-center justify-center ${
                          isSelected 
                          ? "border-[#003da5] bg-blue-50 scale-95" 
                          : "border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <img src={url} alt={seed} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 bg-[#003da5] text-white p-0.5 rounded-full shadow-lg">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowAvatarPicker(false)}
                  className="mt-6 w-full bg-[#003da5] hover:bg-[#003da5]/90 text-white font-bold py-2.5 rounded-xl shadow-lg transition-all active:scale-[0.98] font-kanit uppercase tracking-wider text-sm"
                >
                  Done
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
