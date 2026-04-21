"use client";
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";
import { Mic, MicOff, Radio } from 'lucide-react';
import { cn } from "@/lib/utils";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

export default function VoiceSync() {
  const [isCalling, setIsCalling] = useState(false);

  const toggleCall = () => {
    if (isCalling) {
      vapi.stop();
      setIsCalling(false);
    } else {
      // Replace with your actual Assistant ID from Vapi Dashboard
      vapi.start("YOUR_ASSISTANT_ID"); 
      setIsCalling(true);
    }
  };

  return (
    <div className="p-8 rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden relative group">
      {/* Background Animation for Active Call */}
      {isCalling && (
        <div className="absolute inset-0 bg-blue-50/50 animate-pulse pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Neural Voice Link</h3>
          <Radio className={cn(isCalling ? "text-red-500 animate-bounce" : "text-blue-600")} size={18} />
        </div>

        <button 
          onClick={toggleCall}
          className={cn(
            "w-full py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
            isCalling 
              ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
              : "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
          )}
        >
          {isCalling ? (
            <>
              <MicOff size={18} /> Terminate Uplink
            </>
          ) : (
            <>
              <Mic size={18} /> Initialize Voice Sync
            </>
          )}
        </button>

        <p className="mt-4 text-[9px] text-center font-black text-slate-400 uppercase tracking-widest italic">
          {isCalling ? "Streaming Biometric Dialogue..." : "Uplink Standby"}
        </p>
      </div>
    </div>
  );
}