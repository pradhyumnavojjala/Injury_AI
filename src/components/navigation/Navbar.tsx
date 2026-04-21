"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, LayoutDashboard, Beaker, MessageSquare, 
  AlertCircle, LogOut, Settings, 
  ShieldCheck, Activity, Pill, History, ChevronDown,
  Cpu, Zap, Globe, Lock, Search, Command,
  User
} from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, useClerk, useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const { user } = useUser();
  const { signOut } = useClerk();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle Scroll Effect & Real-time Clock
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    
    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 
      ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5'}`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between h-14">
        
        {/* --- BRANDING & SYSTEM STATUS --- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 bg-[#1A1A3F] rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-200 group-hover:rotate-[15deg] transition-transform duration-500">
              <HeartPulse className="text-white w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[#1A1A3F] text-xl tracking-tighter uppercase">CureLens</span>
              <span className="text-[8px] text-indigo-500 font-black tracking-[0.4em] mt-0.5">V3.0_LIVE</span>
            </div>
          </Link>

          {/* Hidden on Mobile: System Ticker */}
          <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-slate-200">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Node</span>
              <span className="text-[10px] font-bold text-[#1A1A3F] flex items-center gap-1.5">
                <Globe size={10} className="text-emerald-500" /> HYD_ZONE_IN
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Local Time</span>
              <span className="text-[10px] font-bold text-[#1A1A3F]">{time} HRS</span>
            </div>
          </div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-5">
          {/* Quick Search Trigger */}
          <button className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-xl text-slate-400 hover:bg-slate-200 transition-all">
            <Search size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Search CMD</span>
            <kbd className="text-[9px] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-sans">⌘K</kbd>
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-[#1A1A3F] hover:-translate-y-0.5 transition-all">
                Access Terminal
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-5 bg-[#1A1A3F] rounded-[1.2rem] border border-white/10 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 group"
              >
                <div className="relative">
                  <img 
                    src={user?.imageUrl} 
                    alt="avatar" 
                    className="h-10 w-10 rounded-xl object-cover border border-white/20" 
                  />
                  <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-[#1A1A3F] rounded-full" />
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Portal</span>
                  <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Authorized</span>
                </div>
                <ChevronDown size={14} className={`text-white/40 transition-transform duration-500 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                    className="absolute top-[130%] right-0 w-[480px] bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-slate-100 p-10 overflow-hidden"
                  >
                    {/* Header: Identity Card */}
                    <div className="flex items-center gap-5 pb-8 border-b border-slate-50 relative">
                      <div className="relative">
                        <img src={user?.imageUrl} alt="avatar" className="h-20 w-20 rounded-[2rem] object-cover shadow-xl" />
                        <div className="absolute inset-0 rounded-[2rem] border-2 border-indigo-500/20" />
                      </div>
                      <div>
                        <h4 className="font-black text-2xl text-[#1A1A3F] tracking-tighter italic">{user?.fullName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                            Senior Dev
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 truncate max-w-[150px]">{user?.primaryEmailAddress?.emailAddress}</span>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                          <Settings size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Stats Ticker */}
                    <div className="flex gap-4 my-8">
                       <MiniStat label="System Uptime" val="99.9%" icon={Zap} color="text-amber-500" />
                       <MiniStat label="Auth Strength" val="STABLE" icon={Lock} color="text-emerald-500" />
                       <MiniStat label="Node Cluster" val="ASIA-S1" icon={Cpu} color="text-indigo-500" />
                    </div>

                    {/* Grid: Navigation Matrix */}
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-2">Operations</p>
                        <MegaLink icon={LayoutDashboard} label="Control Center" href="/dashboard" />
                        <MegaLink icon={Beaker} label="Lab Analytics" href="/labs" />
                        <MegaLink icon={MessageSquare} label="Contact Us" href="/Contact" />
                        <MegaLink icon={AlertCircle} label="Emergency" href="dashboard/emergency" color="text-rose-500" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 ml-2">Personal Archive</p>
                        <MegaLink icon={History} label="Data Ledger" href="/history" />
                        <MegaLink icon={User} label="Identity Profile" href="/profile" />
                        <MegaLink icon={Activity} label="About Us" href="/about" />
                        <MegaLink icon={Command} label="Settings" href="/preferences" />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                       <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Encrypted Connection Established</p>
                       <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all group shadow-sm shadow-rose-100"
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest">Terminate Link</span>
                        <LogOut size={16} />
                      </button>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-[-20px] left-[-20px] opacity-[0.03] pointer-events-none">
                      <HeartPulse size={200} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

// Sub-components
function MiniStat({ label, val, icon: Icon, color }: any) {
  return (
    <div className="flex-1 bg-slate-50/50 border border-slate-100 p-4 rounded-3xl">
      <div className={`mb-2 ${color}`}><Icon size={14} /></div>
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xs font-black text-[#1A1A3F]">{val}</p>
    </div>
  );
}

function MegaLink({ icon: Icon, label, href, color = "text-slate-500" }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-indigo-50/50 transition-all group">
      <div className={`h-9 w-9 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center ${color} group-hover:bg-[#1A1A3F] group-hover:text-white transition-all`}>
        <Icon size={16} />
      </div>
      <span className="text-[13px] font-bold text-[#1A1A3F] group-hover:translate-x-1 transition-transform">{label}</span>
    </Link>
  );
}