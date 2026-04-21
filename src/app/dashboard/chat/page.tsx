"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send } from 'lucide-react';
import { cn } from "@/lib/utils";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CureLensChat() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([{ id: '1', role: 'assistant', content: "Neural Core Stabilized. Awaiting diagnostic input." }]);
  const [clinicalState, setClinicalState] = useState({ risk: "Low", inflammation: 10 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    
    // 1. Prepare message state
    const userMsg = input;
    const updatedMessages = [...messages, { id: Date.now().toString(), role: 'user', content: userMsg }];
    setMessages(updatedMessages);
    setInput("");
    setIsProcessing(true);

    try {
      // 2. Fetch AI response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();
      
      // 3. Extract Metadata
      const metaMatch = data.text.match(/\[METADATA\] (.*?) \[\/METADATA\]/);
      let nextRisk = clinicalState.risk;
      let nextInflammation = clinicalState.inflammation;

      if (metaMatch) {
        const parsed = JSON.parse(metaMatch[1]);
        nextRisk = parsed.risk;
        nextInflammation = parsed.inflammation;
        setClinicalState({ risk: nextRisk, inflammation: nextInflammation });
      }

      const cleanText = data.text.replace(/\[METADATA\][\s\S]*?\[\/METADATA\]/, "").trim();
      const finalMessages = [...updatedMessages, { id: (Date.now()+1).toString(), role: 'assistant', content: cleanText }];
      
      setMessages(finalMessages);

      // 4. Firebase Persistence
      try {
        await addDoc(collection(db, "chat_history"), {
          userId: "current-user-id",
          timestamp: serverTimestamp(),
          topic: "Neural Health Consultation",
          messages: finalMessages,
          finalRisk: nextRisk,
          finalInflammation: nextInflammation
        });
      } catch (e) {
        console.error("Firebase Sync Error:", e);
      }

    } catch (err) {
      console.error("Chat Execution Error", err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 flex flex-col font-sans text-slate-900">
      {/* HUD Header */}
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl text-white"><Zap size={20} /></div>
          <h1 className="font-black uppercase italic tracking-tighter">CureLens <span className="text-blue-600">Pro</span></h1>
        </div>
        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-pulse" /> Gemini Neural Link Active
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Chat Module */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col overflow-hidden">
          <div ref={chatRef} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[85%] p-6 rounded-[1.8rem] text-sm font-medium leading-relaxed shadow-sm", 
                  m.role === 'user' ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 border border-slate-100")}>
                  {m.content}
                </div>
              </div>
            ))}
            {isProcessing && <div className="text-[10px] font-black text-blue-500 animate-pulse uppercase tracking-widest">Processing Neural Data...</div>}
          </div>

          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe symptoms for neural analysis..."
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-200">
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Telemetry Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-8">Clinical Telemetry</h3>
            <div className="relative h-48 w-48 flex items-center justify-center mb-8">
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                  <motion.circle 
                    cx="96" cy="96" r="88" stroke="#2563EB" strokeWidth="12" fill="transparent"
                    strokeDasharray="553" animate={{ strokeDashoffset: 553 - (553 * clinicalState.inflammation) / 100 }}
                    strokeLinecap="round" className="transition-all duration-1000"
                  />
               </svg>
               <div className="text-center">
                  <div className="text-4xl font-black tracking-tighter">{clinicalState.inflammation}%</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Inflammation</div>
               </div>
            </div>
            <div className="w-full p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
               <span className="text-[10px] font-black text-slate-500 uppercase">Risk Level</span>
               <span className={cn("text-xs font-black uppercase px-3 py-1 rounded-lg", 
                 clinicalState.risk === 'Critical' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600")}>
                 {clinicalState.risk}
               </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}