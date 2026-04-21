"use client";
import React, { useState, useRef, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Zap, Dna, ChevronRight, Brain, History, Save, Trash2, 
  ShieldCheck, Microscope, Database, Bot, Mic, MicOff, RefreshCw
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message { id: string; role: 'assistant' | 'user'; content: string; timestamp: string; }
interface ClinicalRecord { id: string; date: string; risk: string; inflammation: number; summary: string; }

export default function NeuralCureLensHistory() {
  // Use a ref for Vapi to prevent re-initialization on every render
  const vapiRef = useRef<any>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Neural core synchronized. Awaiting voice uplink.", timestamp: 'SYSTEM' }
  ]);
  const [history, setHistory] = useState<ClinicalRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const [clinicalState, setClinicalState] = useState({
    risk: "Low",
    inflammation: 8,
    recovery: "N/A",
    heartRate: 72,
    temp: 36.6,
    neuralSync: 99
  });

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Vapi safely inside useEffect
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Vapi Public Key is missing from .env.local");
      return;
    }

    if (!vapiRef.current) {
      vapiRef.current = new Vapi(publicKey);
    }

    const vapi = vapiRef.current;

    // 2. Event Listeners
    vapi.on("call-start", () => setIsCalling(true));
    vapi.on("call-end", () => setIsCalling(false));
    vapi.on("message", (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        addMessage(message.role, message.transcript);
      }
      
      if (message.type === "transcript" && message.role === "assistant") {
        const metaMatch = message.transcript.match(/\[METADATA\] (.*?) \[\/METADATA\]/);
        if (metaMatch) {
          try {
            const parsed = JSON.parse(metaMatch[1]);
            setClinicalState(prev => ({ ...prev, ...parsed }));
          } catch (e) { console.error("Metadata error", e); }
        }
      }
    });

    const saved = localStorage.getItem('curelens_history');
    if (saved) setHistory(JSON.parse(saved));

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const toggleCall = async () => {
  // HARDCODE THESE STRINGS DIRECTLY FOR THIS TEST
  const testAssistantId = "bd00bac0-bd65-4322-a8e8-0997a28d2594"; 
  
  if (!vapiRef.current) return;

  if (isCalling) {
    vapiRef.current.stop();
  } else {
    try {
      console.log("Attempting call with ID:", testAssistantId);
      await vapiRef.current.start(testAssistantId);
    } catch (err) {
      console.error("Vapi Test Failed:", err);
    }
  }
};

  const addMessage = (role: 'assistant' | 'user', content: string) => {
    const cleanContent = content.replace(/\[METADATA\][\s\S]*?\[\/METADATA\]/, "").trim();
    if (!cleanContent) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role,
      content: cleanContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const recordSession = () => {
    if (messages.length < 2) return;
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      risk: clinicalState.risk,
      inflammation: clinicalState.inflammation,
      summary: messages[messages.length - 1]?.content.substring(0, 60) + "..."
    };
    const updated = [newRecord, ...history];
    setHistory(updated);
    localStorage.setItem('curelens_history', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-hidden flex flex-col p-4 lg:p-8 relative">
      <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between mb-8 px-8 py-5 bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center"><Zap size={24} className="text-white" /></div>
          <div>
            <h1 className="text-lg font-black uppercase italic tracking-tighter">CureLens <span className="text-blue-600">Pro</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", isCalling ? "bg-red-500 animate-pulse" : "bg-emerald-500")} /> 
                {isCalling ? "Neural Link Live" : "Core Ready"}
            </p>
          </div>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3"><History size={16} /> Archive [{history.length}]</button>
      </header>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 overflow-hidden">
        <section className="col-span-12 lg:col-span-8 flex flex-col bg-white/90 backdrop-blur-xl border border-white rounded-[3.5rem] overflow-hidden shadow-2xl relative">
          <div ref={chatRef} className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar relative">
             <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn("max-w-[80%] p-8 rounded-[2.5rem] border shadow-sm", msg.role === 'user' ? 'bg-slate-900 text-white border-slate-800' : 'bg-white border-slate-100 text-slate-700')}>
                    <p className="text-sm font-bold leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
             </AnimatePresence>
          </div>
          <div className="p-10 border-t border-slate-50 bg-slate-50/30 flex justify-center">
            <button onClick={toggleCall} className={cn("relative px-20 py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center gap-4 shadow-2xl active:scale-95", isCalling ? "bg-slate-900 text-white" : "bg-blue-600 text-white")}>
                {isCalling ? <><MicOff size={20} className="text-red-500" /> Terminate Link</> : <><Mic size={20} /> Initialize Voice Sync</>}
            </button>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm relative">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Diagnostic Telemetry</h3>
             <div className="flex flex-col items-center mb-10">
                <div className="relative h-44 w-44 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="88" cy="88" r="82" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                        <motion.circle 
                            cx="88" cy="88" r="82" stroke="currentColor" strokeWidth="10" fill="transparent"
                            strokeDasharray="515" animate={{ strokeDashoffset: 515 - (515 * clinicalState.inflammation) / 100 }}
                            className={cn("transition-all duration-1000", clinicalState.risk === 'High' ? "text-red-500" : "text-blue-600")}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="text-5xl font-black tabular-nums tracking-tighter">{clinicalState.inflammation}%</span>
                </div>
             </div>
             <div className="space-y-3">
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-slate-500">Stability</span>
                    <span className="text-xs font-black uppercase text-blue-600">{clinicalState.risk}</span>
                </div>
             </div>
          </div>
        </aside>
      </main>
    </div>
  );
}