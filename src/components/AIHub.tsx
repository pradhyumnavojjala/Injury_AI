"use client";
import React, { useState, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
import { Brain, Activity, Zap, Mic, MicOff, ShieldAlert } from 'lucide-react';
import { cn } from "@/lib/utils";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

export default function AIHub() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [transcript, setTranscript] = useState("Standing by for neural uplink...");

  useEffect(() => {
    vapi.on("call-start", () => setStatus('active'));
    vapi.on("call-end", () => setStatus('idle'));
    vapi.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "partial") {
        setTranscript(message.transcript);
      }
    });
  }, []);

  const handleToggle = () => {
    if (status === 'active') {
      vapi.stop();
    } else {
      setStatus('connecting');
      vapi.start("YOUR_ASSISTANT_ID"); // From Vapi Dashboard
    }
  };

  return (
    <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
      {/* Visualizer Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <Activity size={400} className={cn(status === 'active' && "animate-pulse text-blue-600")} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
              <Brain className="text-blue-600" /> Neural Interface
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">
              v0.4_Clinical_Engine
            </p>
          </div>
          <div className={cn(
            "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border",
            status === 'active' ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-blue-50 text-blue-600 border-blue-100"
          )}>
            {status === 'active' ? "Link_Live" : "Link_Ready"}
          </div>
        </div>

        {/* Real-time Transcript HUD */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-12">
          <div className="space-y-6">
            <div className={cn(
              "h-24 w-24 rounded-full flex items-center justify-center border-4 transition-all duration-500",
              status === 'active' ? "border-blue-600 scale-110 shadow-[0_0_30px_rgba(37,99,235,0.3)]" : "border-slate-100 scale-100"
            )}>
              {status === 'active' ? <Zap className="text-blue-600 fill-blue-600" /> : <Mic className="text-slate-300" />}
            </div>
            <p className={cn(
              "text-lg font-bold leading-tight max-w-md mx-auto transition-opacity",
              status === 'active' ? "text-slate-900" : "text-slate-300 italic"
            )}>
              "{transcript}"
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-auto flex justify-center pt-10">
          <button 
            onClick={handleToggle}
            className={cn(
              "group relative px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl",
              status === 'active' 
                ? "bg-slate-900 text-white shadow-slate-200" 
                : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
            )}
          >
            {status === 'active' ? "Terminate Neural Link" : "Initialize Core Sync"}
          </button>
        </div>
      </div>
    </div>
  );
}