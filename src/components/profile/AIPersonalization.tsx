"use client";
import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';

interface AIPersonalizationProps {
  profile: any;
  onSave: (data: any) => void;
}

export const AIPersonalization = ({ profile, onSave }: AIPersonalizationProps) => {
  // Full-state initialization to prevent undefined access
  const [aiData, setAiData] = useState({
    age: profile.aiPersonalization?.age || "",
    weight: profile.aiPersonalization?.weight || "",
    height: profile.aiPersonalization?.height || "",
    riskFactors: Array.isArray(profile.aiPersonalization?.riskFactors) 
      ? profile.aiPersonalization.riskFactors 
      : []
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const chronicConditions = profile.emergencyId?.chronicDiseases || [];

  // Deep-sync handling for complex objects
  const handleSave = async () => {
    setIsSyncing(true);
    try {
      await onSave(aiData);
      // Simulate network latency for a high-end "system-processing" feel
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } catch (error) {
      console.error("Failed to sync neural ledger:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      
      {/* Header Module */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
          <Brain size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">AI Personalization</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Neural Engine Calibration</p>
        </div>
      </div>

      {/* Input Grid Module */}
      <div className="space-y-8 flex-grow">
        <div className="grid grid-cols-3 gap-4">
          <ExecField 
            label="Age" 
            value={aiData.age} 
            onChange={(v: string) => setAiData({...aiData, age: v})} 
          />
          <ExecField 
            label="Weight" 
            value={aiData.weight} 
            onChange={(v: string) => setAiData({...aiData, weight: v})} 
          />
          <ExecField 
            label="Height" 
            value={aiData.height} 
            onChange={(v: string) => setAiData({...aiData, height: v})} 
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            Risk Factors (Comma separated)
          </label>
          <input 
            value={aiData.riskFactors.join(', ')} 
            onChange={(e) => setAiData({...aiData, riskFactors: e.target.value.split(',').map((s: string) => s.trim())})}
            className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="e.g. Hypertension, Diabetes"
          />
        </div>

        {/* Status Monitor Module */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-indigo-600">
               <Cpu size={18} /> 
               <span className="text-[10px] font-bold uppercase tracking-widest">Active Logic</span>
             </div>
             <span className="text-[10px] font-mono text-indigo-500 font-bold">SYSTEM READY</span>
          </div>
          
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Neural engine is currently cross-referencing your profile against:
            <span className="block text-slate-900 font-bold mt-1 text-sm">
              {chronicConditions.length > 0 ? chronicConditions.join(', ') : 'No chronic conditions detected in active ledger.'}
            </span>
          </p>
        </div>
      </div>

      {/* Action Module */}
      <button 
        onClick={handleSave} 
        disabled={isSyncing}
        className={`mt-10 w-full py-4 font-bold rounded-2xl transition-all active:scale-[0.99] ${
          isSyncing 
          ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
          : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {isSyncing ? "SYNCING LEDGER..." : "SAVE CONFIGURATION"}
      </button>
    </div>
  );
};

// Sub-component for individual tactical fields
const ExecField = ({ label, value, onChange }: any) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
      {label}
    </label>
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full bg-transparent text-slate-900 font-bold text-sm outline-none"
    />
  </div>
);