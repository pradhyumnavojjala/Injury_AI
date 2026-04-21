"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Scan, MessageSquare, AlertCircle, ArrowUpRight, 
  HeartPulse, Clock, ChevronRight, Zap,
  ShieldCheck, TrendingUp, MapPin, Activity,
  Cpu, Terminal, Binary, Filter
} from 'lucide-react';

export default function NexusDashboard() {
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPulse(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24 px-4 font-sans selection:bg-indigo-100">
      
      {/* --- TOP HUD: SYSTEM STATUS --- */}
      <section className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
              Live Connection
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Protocol: CureLens_v4.0</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-[#1A1A3F] leading-none">
            Intelligence <span className="text-indigo-600 italic">Nexus.</span>
          </h1>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">
          <StatusChip icon={Cpu} label="Neural Load" val="24%" color="text-indigo-600" />
          <StatusChip icon={HeartPulse} label="Core Pulse" val={`${pulse} BPM`} color="text-rose-500" />
          <div className="h-14 w-[1px] bg-slate-100 hidden md:block mx-2" />
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
             <div className="text-right">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Node</p>
                <p className="text-xs font-bold text-[#1A1A3F]">HYD-CENTER-01</p>
             </div>
             <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600">
                <MapPin size={18} />
             </div>
          </div>
        </div>
      </section>

      {/* --- CORE COMMAND MODULES --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NexusModule 
          title="Vision Engine" 
          desc="Neural-link analysis for dermal & structural trauma." 
          icon={Scan} 
          href="/dashboard/scanner" 
          theme="indigo"
          tag="v4 Ready"
        />
        <NexusModule 
          title="Neural Chat" 
          desc="Synchronous consultation with GPT-Health-Core." 
          icon={MessageSquare} 
          href="/dashboard/chat" 
          theme="dark"
          tag="Live Tips"
        />
        <NexusModule 
          title="Priority SOS" 
          desc="Emergency vectoring & critical care deployment." 
          icon={AlertCircle} 
          href="/dashboard/emergency" 
          theme="rose"
          tag="Encrypted"
        />
      </section>

      {/* --- ANALYTICS & ACTIVITY ENGINE --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-8 bg-white rounded-[4rem] border border-slate-100 p-12 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="font-black text-2xl text-[#1A1A3F] tracking-tighter italic">Diagnostic <span className="text-slate-300">Archives</span></h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time telemetry history</p>
            </div>
            <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Filter size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <NexusActivityRow 
              icon={Scan} 
              type="Neural Scan"
              label="Knee Anomaly Detection" 
              meta="Conf. 98.2%"
              timestamp="14:20 HRS" 
              status="Analyzed" 
            />
            <NexusActivityRow 
              icon={MessageSquare} 
              type="AI Query"
              label="Post-Op Recovery Path" 
              meta="24ms Latency"
              timestamp="09:12 HRS" 
              status="Completed" 
            />
            <NexusActivityRow 
              icon={Binary} 
              type="Data Sync"
              label="Global Health Ledger Update" 
              meta="Block #4021"
              timestamp="Yesterday" 
              status="Synced" 
            />
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-8">
          {/* Recovery Projection Card */}
          <div className="bg-[#1A1A3F] rounded-[4rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Zap size={16} className="text-indigo-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Recovery Matrix</span>
              </div>
              
              <div className="mb-8">
                <p className="text-5xl font-black italic tracking-tighter mb-2">78<span className="text-indigo-400">%</span></p>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                  Neural patterns suggest recovery is <span className="text-white">14.2 hours</span> ahead of standard baseline.
                </p>
              </div>

              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '78%' }} 
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)]" 
                />
              </div>
            </div>
            <Terminal size={180} className="absolute bottom-[-40px] right-[-40px] text-white/5 rotate-12" />
          </div>

          {/* Vitals Graph Card */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Vitality Flux</h4>
              <Activity size={16} className="text-emerald-500" />
            </div>
            <div className="flex items-end gap-3 h-24">
              {[40, 70, 45, 90, 65, 80, 100, 85].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-slate-50 rounded-xl group relative cursor-pointer hover:bg-indigo-600 transition-colors"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A3F] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center border-t border-slate-50 pt-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 uppercase">Status</span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Optimized</span>
              </div>
              <TrendingUp size={20} className="text-emerald-500" />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

// --- UPGRADED HELPER COMPONENTS ---

function StatusChip({ icon: Icon, label, val, color }: any) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-50 shadow-sm">
      <Icon size={14} className={color} />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</span>
        <span className="text-xs font-black text-[#1A1A3F] leading-none">{val}</span>
      </div>
    </div>
  );
}

function NexusModule({ title, desc, icon: Icon, href, theme, tag }: any) {
  const themes: any = {
    indigo: "bg-indigo-600 shadow-indigo-100",
    dark: "bg-[#1A1A3F] shadow-slate-200",
    rose: "bg-rose-500 shadow-rose-100"
  };

  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        className={`${themes[theme]} p-10 rounded-[4rem] text-white shadow-2xl transition-all cursor-pointer group relative overflow-hidden h-[300px] flex flex-col justify-between`}
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="h-16 w-16 rounded-[1.5rem] bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
              <Icon size={32} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-black/20 px-4 py-1.5 rounded-full border border-white/5">
              {tag}
            </span>
          </div>
          <h3 className="text-3xl font-black tracking-tighter mb-3 italic">{title}</h3>
          <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[240px]">{desc}</p>
        </div>
        <div className="relative z-10 flex justify-end">
           <div className="h-12 w-12 rounded-full bg-white text-[#1A1A3F] flex items-center justify-center group-hover:scale-110 transition-all">
             <ArrowUpRight size={24} />
           </div>
        </div>
        {/* Decorative Background Icon */}
        <Icon size={240} className="absolute bottom-[-60px] left-[-60px] opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000" />
      </motion.div>
    </Link>
  );
}

function NexusActivityRow({ icon: Icon, label, timestamp, status, type, meta }: any) {
  return (
    <div className="group flex items-center justify-between p-6 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors border border-slate-50">
          <Icon size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{type}</span>
            <span className="text-[9px] font-bold text-slate-300">•</span>
            <span className="text-[9px] font-bold text-slate-400">{meta}</span>
          </div>
          <p className="font-black text-lg text-[#1A1A3F] tracking-tight">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-[#1A1A3F] uppercase tracking-widest">{status}</p>
          <p className="text-[9px] font-bold text-slate-400 mt-1">{timestamp}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-200 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}