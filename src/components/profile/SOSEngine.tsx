"use client";
import React, { useState } from 'react';
import { Radio, Settings, MapPin, Ambulance, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SOSEngineProps {
  settings: {
    autoLocation: boolean;
    ambulancePref: 'Govt' | 'Private';
  };
  onSave: (data: any) => void;
}

export const SOSEngine = ({ settings, onSave }: SOSEngineProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(localSettings);
    setTimeout(() => setIsSaving(false), 1200);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 h-full flex flex-col transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      
      {/* Header Module */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
             <Radio className="text-indigo-600" size={22} /> SOS Tactical Engine
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Protocols</p>
        </div>
        <Settings className="text-slate-300" size={20} />
      </div>

      {/* Protocol Configuration Module */}
      <div className="space-y-6 flex-grow">
        
        {/* Toggle: Geo-Intelligence */}
        <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">Auto-Geolocate</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Share coordinates on panic</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={localSettings.autoLocation}
            onChange={(e) => setLocalSettings({...localSettings, autoLocation: e.target.checked})}
            className="h-6 w-6 rounded-lg accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Select: Ambulance Preference */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
              <Ambulance size={20} />
            </div>
            <p className="font-bold text-sm text-slate-900">Ambulance Priority</p>
          </div>
          <select 
            value={localSettings.ambulancePref}
            onChange={(e) => setLocalSettings({...localSettings, ambulancePref: e.target.value as any})}
            className="w-full bg-white p-4 rounded-xl font-bold text-sm text-slate-700 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Govt">Government Emergency (Public)</option>
            <option value="Private">Private Emergency (Rapid)</option>
          </select>
        </div>
      </div>

      {/* Action Module */}
      <button 
        onClick={handleSave}
        disabled={isSaving}
        className={`mt-10 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
          isSaving 
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
          : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {isSaving ? (
          <>
            <CheckCircle2 size={18} /> PROTOCOL CALIBRATED
          </>
        ) : (
          <>
            <ShieldAlert size={18} /> UPDATE TACTICAL PROTOCOL
          </>
        )}
      </button>
    </div>
  );
};