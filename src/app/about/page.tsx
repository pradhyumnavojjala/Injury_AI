"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  ShieldCheck, Globe, HeartPulse, Microscope, Award, 
  ArrowRight, Sparkles, Building2, BrainCircuit, 
  Dna, Fingerprint, Lock, ChevronDown, Zap, Terminal,
  Cpu, Database, BarChart3, Users, Landmark, Target
} from 'lucide-react';
import Link from 'next/link';

// --- ENTERPRISE DATA MODELS ---
const ARCHITECTURAL_METRICS = [
  { id: 1, label: "AI Neural Precision", value: "99.98%", icon: Cpu },
  { id: 2, label: "Global Lab Nodes", value: "850+", icon: Landmark },
  { id: 3, label: "Clinical Records", value: "14.2M+", icon: Database },
  { id: 4, label: "Processing Speed", value: "<15ms", icon: Zap }
];

const CORE_PHILOSOPHY = [
  { id: 'p1', title: "Genomic Insight", desc: "Decoding your unique biological signature at the molecular level.", icon: Dna },
  { id: 'p2', title: "Neural Networks", desc: "Adaptive algorithms that evolve through every clinical diagnostic event.", icon: BrainCircuit },
  { id: 'p3', title: "Forensic Privacy", desc: "Zero-knowledge encryption protocols for absolute data sovereignty.", icon: Lock },
  { id: 'p4', title: "Unique Identity", desc: "Hyper-personalized health mapping tailored to your specific biome.", icon: Fingerprint }
];

// --- ADVANCED UI COMPONENTS ---

const SectionHeader = ({ label, title, subtitle }: { label: string, title: string, subtitle: string }) => (
  <div className="mb-24 px-6 text-center">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
      <Sparkles size={12} /> {label}
    </motion.div>
    <h2 className="text-6xl md:text-7xl font-black text-[#1A1A3F] tracking-tighter mb-8">{title}</h2>
    <p className="text-slate-500 font-medium text-xl max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

const FeatureMetric = ({ icon: Icon, label, value }: any) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
    <Icon className="text-indigo-600" size={28} />
    <div>
      <div className="text-4xl font-black italic text-[#1A1A3F]">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{label}</div>
    </div>
  </motion.div>
);

// --- MAIN PAGE ARCHITECTURE ---
export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50" style={{ scaleX }} />

      {/* --- HERO: SYSTEM INITIALIZATION --- */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-10 flex gap-4">
            <span className="flex items-center gap-2"><Terminal size={12}/> SYSTEM_READY</span>
            <span className="flex items-center gap-2 text-slate-300"><ShieldCheck size={12}/> ENCRYPTED</span>
          </motion.div>
          <h1 className="text-8xl md:text-[12rem] font-black text-[#1A1A3F] tracking-tighter leading-[0.9] mb-12">
            CURELENS<span className="text-indigo-600">.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <p className="max-w-xl text-slate-600 text-2xl font-medium leading-relaxed">
              We bridge the gap between complex laboratory science and the human experience, utilizing proprietary AI to demystify diagnostic data.
            </p>
            <div className="flex gap-4">
              <button className="px-12 py-6 bg-[#1A1A3F] text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all">Deep Dive</button>
              <button className="px-12 py-6 border border-slate-200 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:border-indigo-600 transition-all">Documentation</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- METRIC LAYER --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {ARCHITECTURAL_METRICS.map(m => <FeatureMetric key={m.id} {...m} />)}
        </div>
      </section>

      {/* --- PHILOSOPHY LAYER --- */}
      <section className="py-32">
        <SectionHeader label="System Pillars" title="Clinical Intelligence" subtitle="Designed for precision, built for scale." />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {CORE_PHILOSOPHY.map(p => (
             <div key={p.id} className="p-10 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition-all">
                <p.icon size={32} className="text-indigo-600 mb-8" />
                <h4 className="text-lg font-black mb-4 text-[#1A1A3F]">{p.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{p.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* --- NARRATIVE LAYER: THE LAB ENVIRONMENT --- */}
      <section className="py-32 px-6 bg-[#1A1A3F] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <h2 className="text-7xl font-black tracking-tighter">Diagnostic<br/>Autonomy.</h2>
            <p className="text-indigo-200 text-lg leading-loose font-medium">
              We have eliminated the middle-man. By digitizing the end-to-end laboratory workflow, we provide clinicians and patients with a seamless, audit-proof record of every biological event in their life. Our infrastructure is built to survive the next century of medical evolution.
            </p>
            <div className="flex gap-6 items-center pt-8 border-t border-indigo-800">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 w-12 rounded-full bg-indigo-500 border-2 border-[#1A1A3F]" />)}
               </div>
               <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Trusted by 450+ Medical Institutions</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <motion.div initial={{ y: 50 }} whileInView={{ y: 0 }} className="bg-white/5 h-96 rounded-[2rem] border border-white/10" />
            <motion.div initial={{ y: -50 }} whileInView={{ y: 0 }} className="bg-indigo-600 h-96 rounded-[2rem] mt-16" />
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE FOOTER / CTA --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-slate-50 rounded-[4rem] p-24 text-center">
           <Target size={64} className="mx-auto text-indigo-600 mb-10" />
           <h2 className="text-6xl font-black text-[#1A1A3F] mb-12 tracking-tighter">Ready to initialize?</h2>
           <Link href="/sign-up">
              <button className="px-16 py-7 bg-indigo-600 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#1A1A3F] transition-all">
                 Begin Data Sync
              </button>
           </Link>
        </div>
      </section>
    </div>
  );
}