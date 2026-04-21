"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Bell, Shield, Brain, Zap, 
  Smartphone, Globe, Lock, Save, Check, 
  Database, RefreshCw, Eye, User, Server, Cpu 
} from 'lucide-react';

// --- ENTERPRISE CONFIGURATION MODELS ---
interface SettingOption {
  id: string;
  title: string;
  desc: string;
  enabled: boolean;
  category: 'ai' | 'privacy' | 'network';
}

export default function PreferencesPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // --- ROBUST STATE MANAGEMENT ---
  const [settings, setSettings] = useState<SettingOption[]>([
    { id: 'ai_01', title: "Deep Neural Analysis", desc: "Enable multi-pass AI scanning for higher precision in biomarker detection.", enabled: true, category: 'ai' },
    { id: 'ai_02', title: "Predictive Health Alerts", desc: "Allow AI to notify you about potential future health trends based on history.", enabled: false, category: 'ai' },
    { id: 'prv_01', title: "Anonymized Research", desc: "Share de-identified data to help improve global medical AI models.", enabled: true, category: 'privacy' },
    { id: 'prv_02', title: "Biometric Authentication", desc: "Require FaceID/Fingerprint for report access.", enabled: true, category: 'privacy' },
    { id: 'net_01', title: "Auto-Sync to Cloud", desc: "Keep settings synchronized across all authorized enterprise nodes.", enabled: true, category: 'network' }
  ]);

  // --- PERSISTENCE ENGINE ---
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    // Simulated heavy I/O operation
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-20 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- EXECUTIVE HEADER --- */}
        <header className="mb-20 flex justify-between items-end border-b border-slate-200 pb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
              <Settings size={14} /> System Configuration / Root
            </div>
            <h1 className="text-7xl font-black italic tracking-tighter text-[#1A1A3F]">Preferences.</h1>
            <p className="text-slate-500 font-medium mt-4 text-lg">Define your diagnostic environment and security parameters.</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
             <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Node Sync Status</div>
             <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase"><Check size={14}/> Operational</div>
          </div>
        </header>

        {/* --- CONFIGURATION MATRIX --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <aside className="lg:col-span-3 space-y-4">
             {['ai', 'privacy', 'network'].map((cat) => (
               <button key={cat} className=" opacity-30 w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white border border-slate-100 font-black text-[10px] uppercase tracking-widest hover:border-indigo-200">
                  {cat} <ChevronRight size={14}  />
               </button>
             ))}
          </aside>

          <section className="lg:col-span-9 space-y-8">
            {['ai', 'privacy', 'network'].map((category) => (
              <PreferenceGroup 
                key={category} 
                title={`${category.toUpperCase()} PROTOCOLS`}
                settings={settings.filter(s => s.category === category)}
                onToggle={toggleSetting}
              />
            ))}
          </section>

        </div>

        {/* --- PERSISTENT CONTROL BAR --- */}
        <footer className="mt-20 pt-10 border-t border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-3 text-slate-400">
               <Shield size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise-Grade Encryption Active</span>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-3 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl ${
                saved ? 'bg-emerald-600 text-white' : 'bg-[#1A1A3F] text-white hover:bg-indigo-600'
              }`}
            >
              {isSaving ? <><RefreshCw className="animate-spin" size={16} /> Syncing...</> : saved ? <><Check size={16} /> Changes Saved</> : <><Save size={16} /> Execute Changes</>}
            </button>
        </footer>
      </div>
    </div>
  );
}

// --- ARCHITECTURAL HELPER COMPONENTS ---

function PreferenceGroup({ title, settings, onToggle }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] border border-slate-100 p-10">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-3">
        {title === 'AI PROTOCOLS' ? <Brain size={14}/> : title === 'PRIVACY PROTOCOLS' ? <Lock size={14}/> : <Server size={14}/>} {title}
      </h3>
      <div className="space-y-8">
        {settings.map((s: SettingOption) => (
          <div key={s.id} className="flex items-center justify-between gap-6 pb-8 border-b border-slate-50 last:border-0 last:pb-0">
            <div>
              <p className="font-black text-[#1A1A3F] text-sm tracking-tight mb-1">{s.title}</p>
              <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">{s.desc}</p>
            </div>
            <Toggle state={s.enabled} onToggle={() => onToggle(s.id)} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Toggle({ state, onToggle }: { state: boolean, onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className={`w-16 h-9 rounded-full transition-all relative ${state ? 'bg-indigo-600' : 'bg-slate-200'}`}
    >
      <motion.div 
        animate={{ x: state ? 30 : 0 }} 
        className="absolute top-1 left-1 h-7 w-7 bg-white rounded-full shadow-sm" 
      />
    </button>
  );
}

function ChevronRight({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;
}