"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  ArrowLeft, X, Download, FileText, ChevronRight, 
  Activity, Shield, Stethoscope, Clock, Database, 
  Layers, Zap, Terminal, Search, Filter 
} from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

// --- TYPE DEFINITIONS ---
interface RecordItem {
  id: string;
  type: 'lab' | 'chat' | 'wound' | 'profile';
  date?: string;
  testName?: string;
  topic?: string;
  status?: string;
  amount?: number;
  preview?: string;
  [key: string]: any;
}

// --- UTILITY COMPONENTS: STATUS INDICATORS ---
const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
    status === 'Completed' || status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
  }`}>
    {status || 'PENDING'}
  </span>
);

export default function GlobalHistoryLedger() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'labs' | 'activities'>('labs');
  const [labHistory, setLabHistory] = useState<RecordItem[]>([]);
  const [unifiedActivities, setUnifiedActivities] = useState<RecordItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RecordItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- PDF ENGINE ---
  const generateForensicPDF = useCallback((item: RecordItem) => {
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("CURELENS CLINICAL DOSSIER", 20, 25);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`RECORD_IDENTIFIER: ${item.id}`, 20, 32);
    doc.line(20, 38, 190, 38);
    
    let y = 55;
    doc.setFontSize(12);
    doc.setTextColor(0);
    Object.entries(item).forEach(([key, val]) => {
      if (key !== 'id' && key !== 'type' && typeof val !== 'object') {
        doc.setFont("helvetica", "bold");
        doc.text(`${key.toUpperCase()}:`, 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(`${val}`, 70, y);
        y += 12;
      }
    });
    doc.save(`Dossier_${item.id}.pdf`);
  }, []);

  // --- DATA SYNC LAYER ---
  useEffect(() => {
    if (!isLoaded || !user) return;
    let tempStore: any = { chat: [], wound: [], profile: [], lab: [] };
    
    const sync = (type: string, docs: any[]) => {
      tempStore[type] = docs.map(d => ({ type, id: d.id, ...d.data() }));
      const merged = [...tempStore.chat, ...tempStore.wound, ...tempStore.profile, ...tempStore.lab]
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      setUnifiedActivities(merged);
    };

    const unsub = [
      onSnapshot(query(collection(db, "labs")), (s) => { 
        setLabHistory(s.docs.map(d => ({ ...d.data(), id: d.id, type: 'lab' }))); 
        sync('lab', s.docs); 
      }),
      onSnapshot(query(collection(db, "chat_history")), (s) => sync('chat', s.docs)),
      onSnapshot(query(collection(db, "wound_scans")), (s) => sync('wound', s.docs)),
      onSnapshot(query(collection(db, "medical_profiles")), (s) => sync('profile', s.docs))
    ];
    return () => unsub.forEach(fn => fn());
  }, [user, isLoaded]);

  // --- FILTER ENGINE ---
  const displayItems = useMemo(() => {
    const source = activeTab === 'labs' ? labHistory : unifiedActivities;
    return source.filter(i => 
      (i.testName || i.topic || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, labHistory, unifiedActivities, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-all font-black uppercase tracking-[0.2em] text-[10px]">
            <ArrowLeft size={14} /> Back to Hub
          </Link>
          <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">CureLens // Vault Ledger</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h1 className="text-7xl font-black italic tracking-tighter mb-4 text-slate-900">Archive.</h1>
            <p className="text-slate-500 font-medium tracking-tight max-w-md">Comprehensive diagnostic repository and forensic timeline for neural data.</p>
          </div>
          <div className="flex bg-white rounded-2xl p-1 border border-slate-200 shadow-sm">
            <TabBtn active={activeTab === 'labs'} onClick={() => setActiveTab('labs')} label="Diagnostic Data" />
            <TabBtn active={activeTab === 'activities'} onClick={() => setActiveTab('activities')} label="Neural Timeline" />
          </div>
        </header>

        {/* --- GRID SYSTEM --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedItem(item)}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-200 cursor-pointer shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                    {item.type === 'lab' ? <Stethoscope size={20} /> : <Activity size={20} />}
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-all" />
                </div>
                <h4 className="font-bold text-base mb-1">{item.testName || item.topic || 'Unknown Record'}</h4>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.date}</p>
                  <StatusBadge status={item.status || 'Verified'} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* --- CLINICAL DOSSIER MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl border border-slate-100"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter">Clinical Dossier</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mt-1">{selectedItem.id}</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-4 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600"><X size={20}/></button>
              </div>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin">
                {Object.entries(selectedItem).map(([k, v]: any) => (
                  <div key={k} className="flex justify-between border-b border-slate-50 pb-4">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{k}</span>
                    <span className="text-sm font-semibold text-slate-800 break-words max-w-[60%] text-right">
                      {typeof v === 'string' ? v : JSON.stringify(v)}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => generateForensicPDF(selectedItem)}
                className="mt-12 w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Export Forensic Dossier
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TabBtn = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
    active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
  }`}>
    {label}
  </button>
);