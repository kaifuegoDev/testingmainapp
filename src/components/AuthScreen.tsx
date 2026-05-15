"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, User, Mail, AtSign, Ticket, ChevronLeft, Trophy } from "lucide-react";

interface AuthScreenProps {
  onLoginSuccessAction: () => void;
}

export default function AuthScreen({ onLoginSuccessAction }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  
  // Login States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // Signup/Onboarding States
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    referralCode: ""
  });

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "phone") {
      if (phoneNumber.length < 10) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep("otp");
      }, 1000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLoginSuccessAction();
      }, 1000);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccessAction();
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-white flex flex-col font-sora overflow-y-auto">
      <div className={`flex-1 flex flex-col px-6 ${step === "otp" ? "pt-24" : "pt-12"} pb-8 max-w-xl mx-auto w-full`}>
        
        {/* Logo Section - Only show on initial entry */}
        {step === "phone" && (
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-4xl font-black tracking-tight text-[#003da5] font-kanit">Zigzec</h1>
            <div className="h-[3px] w-16 bg-[#003da5] rounded-full mt-1" />
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight leading-none mb-2">
            {mode === "login" ? (step === "phone" ? "Welcome Back" : "Verification") : "Create Account"}
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            {mode === "login" 
              ? (step === "phone" ? "Sign in to your account" : "Enter the code sent to you") 
              : "Join the arena today"}
          </p>
        </motion.div>


        {/* Form Content */}
        <div>
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {step === "phone" ? (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 ml-1">Phone Number</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-200">
                          <span className="text-sm font-semibold text-slate-600">+91</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="0000000000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-16 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 ml-1 -mt-2">
                      <input 
                        type="checkbox" 
                        id="agree" 
                        className="w-4 h-4 accent-[#003da5] rounded border-slate-300 cursor-pointer" 
                        required
                      />
                      <label htmlFor="agree" className="text-[11px] text-slate-500 cursor-pointer select-none">
                        I agree to the <span className="text-slate-700 font-bold underline underline-offset-2">Terms & Conditions</span>
                      </label>
                    </div>
                    <button type="submit" disabled={loading || phoneNumber.length < 10} className="w-full bg-[#003da5] text-white rounded-lg py-3 font-semibold text-[15px] tracking-wide shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all disabled:opacity-50">
                      {loading ? "Please wait..." : "Continue"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-8">
                    <div className="grid grid-cols-6 gap-2.5 w-full">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => e.key === "Backspace" && !digit && idx > 0 && document.getElementById(`otp-${idx - 1}`)?.focus()}
                          className="w-full aspect-square bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-bold text-[#003da5] focus:outline-none focus:border-[#003da5] transition-all shadow-sm"
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Resend in <span className="font-bold text-slate-800">{timer}s</span></p>
                    </div>
                    <button type="submit" disabled={loading || otp.join("").length < 6} className="w-full bg-[#003da5] text-white rounded-lg py-3 font-semibold text-[15px] tracking-wide active:scale-[0.98] transition-all disabled:opacity-50">
                      {loading ? "Verifying..." : "Verify & Login"}
                    </button>
                    <button type="button" onClick={() => setStep("phone")} className="w-full text-xs font-medium text-slate-400 flex items-center justify-center gap-1">
                      <ChevronLeft size={14} /> Change Number
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="signup-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleSignup}
                className="space-y-4"
              >
                {/* Onboarding Fields */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 ml-1">Username</label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      type="text"
                      placeholder="johndoe123"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 ml-1">Referral Code (Optional)</label>
                  <div className="relative">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#003da5] transition-all placeholder:font-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[#003da5] text-white rounded-lg py-3 font-semibold text-[15px] tracking-wide shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all mt-2">
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation & Social Section - Only show on phone entry, not during OTP */}
        {step === "phone" && (
          <div className="mt-2">
            {mode === "login" && (
              <div className="mb-6">
                <div className="flex items-center gap-6 my-2">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Or</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <button className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg py-3 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5 12.2c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.8c2.2-2.1 3.6-5.2 3.6-8.7z" fill="#4285F4"/>
                    <path d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-3c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.8-2.1-6.8-5H1.3v3.1C3.3 21.4 7.4 24 12 24z" fill="#34A853"/>
                    <path d="M5.2 14.3c-.3-.8-.4-1.6-.4-2.3s.1-1.5.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l3.9-3.1z" fill="#FBBC05"/>
                    <path d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.3 2.6 1.3 6.6l3.9 3.1c1-2.9 3.6-5 6.8-5z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}

            <div className="text-center mt-6">
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <motion.p
                    key="login-toggle"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-slate-500"
                  >
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setMode("signup")} className="text-[#003da5] font-bold hover:underline">Register</button>
                  </motion.p>
                ) : (
                  <motion.p
                    key="signup-toggle"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-slate-500"
                  >
                    Already have an account?{" "}
                    <button type="button" onClick={() => setMode("login")} className="text-[#003da5] font-bold hover:underline">Login</button>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Footer - Only show on initial entry */}
        {step === "phone" && (
          <div className="mt-6 text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Secure connection by Zigzec. By continuing you agree to our <br />
              <span className="text-slate-600 font-bold">Terms</span> & <span className="text-slate-600 font-bold">Privacy Policy</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
