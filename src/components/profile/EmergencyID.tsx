"use client";
import React, { useState } from 'react';
import { ShieldAlert, Activity } from 'lucide-react';

export const EmergencyID = ({ personal, emergency, onSave }: any) => {
  const [form, setForm] = useState({ ...personal, ...emergency });
  const [isSaving, setIsSaving] = useState(false);

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(form);
    setTimeout(() => setIsSaving(false), 1200);
  };

  return (
    <div className="relative group bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-indigo-500/5 rounded-[2.5rem]" />
      
      <div className="relative z-10 flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-4">
          <ShieldAlert className="text-rose-500 animate-pulse" /> MASTER MEDICAL DOSSIER
        </h2>
        <div className="px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest">
          Encrypted Sync Active
        </div>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fields */}
        <TacticalField label="Full Name" value={form.fullName} onChange={(v:any) => update('fullName', v)} />
        <TacticalField label="DOB" value={form.dateOfBirth} onChange={(v:any) => update('dateOfBirth', v)} />
        <TacticalField label="Gender" value={form.gender} onChange={(v:any) => update('gender', v)} />
        <TacticalField label="Emergency ID" value={form.email || ''} onChange={(v:any) => update('email', v)} />

        <TacticalField label="Blood Type" value={form.bloodType} onChange={(v:any) => update('bloodType', v)} />
        <TacticalField label="Allergies" value={form.allergies?.join(', ')} onChange={(v:any) => update('allergies', v.split(','))} />
        <TacticalField label="Chronic" value={form.chronicDiseases?.join(', ')} onChange={(v:any) => update('chronicDiseases', v.split(','))} />
        <TacticalField label="Medications" value={form.medications?.join(', ')} onChange={(v:any) => update('medications', v.split(','))} />
        
        <div className="md:col-span-2 lg:col-span-4 mt-2">
           <TacticalField label="Critical Responders Notes" value={form.criticalNotes} onChange={(v:any) => update('criticalNotes', v)} />
        </div>
      </div>

      <button 
        onClick={handleSave} 
        className="relative z-10 mt-10 w-full py-5 bg-gradient-to-r from-rose-600 to-indigo-700 hover:from-rose-500 hover:to-indigo-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-[0.98]"
      >
        {isSaving ? "SYNCING..." : "COMMIT TO SECURE LEDGER"}
      </button>
    </div>
  );
};

const TacticalField = ({ label, value, onChange }: any) => (
  <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors focus-within:border-indigo-500/50">
    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{label}</label>
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full bg-transparent text-white font-mono font-bold mt-1 outline-none text-sm placeholder:text-slate-700"
    />
  </div>
);