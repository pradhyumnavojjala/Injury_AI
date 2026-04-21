"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MessageSquare, ArrowRight, Play, CheckCircle2, Star, 
  Plus, ShieldCheck, Activity, Zap, HeartPulse, Globe, 
  Scan, Crosshair, Thermometer, Droplets, Info, ArrowUpRight,
  Stethoscope, ShieldPlus, Users, Award, Headphones, MapPin
} from 'lucide-react';
import Link from 'next/link';

// --- SUB-COMPONENTS FOR ORGANIZATION ---

const StatCard = ({ pct, title, desc }: { pct: string, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-500 group"
  >
    <div className="text-6xl font-black text-[#6366F1] mb-6 group-hover:scale-110 transition-transform origin-left inline-block">
      {pct}
    </div>
    <h3 className="text-2xl font-bold text-[#1A1A3F] mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-lg">{desc}</p>
  </motion.div>
);

const FeaturePill = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 px-4 py-2 rounded-full">
    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
    <span className="text-sm font-bold text-indigo-700 uppercase tracking-tight">{text}</span>
  </div>
);

// --- MAIN PAGE ---

export default function MassiveUnifiedLanding() {
  const [activeCategory, setActiveCategory] = useState('Burns');
  const [scanStep, setScanStep] = useState(0);

  const categories = ['Burns', 'Lacerations', 'Fractures', 'Bites', 'Sprains'];

  return (
    <div className="relative min-h-screen bg-[#FDFDFF] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 🌌 BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-200/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full" />
      </div>

      {/* 🚀 1. HERO SECTION (#home) */}
      <section id="home" className="relative pt-48 pb-32 px-6 container mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-full shadow-md border border-slate-100 mb-12"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
            ))}
          </div>
          <p className="text-[11px] font-black text-slate-500 tracking-[0.1em] uppercase">Trusted by 15,000+ Healthcare Providers</p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[5rem] md:text-[9rem] font-black tracking-tighter text-[#1A1A3F] leading-[0.85] mb-12"
        >
          Automated <br />
          <span className="text-indigo-600">Diagnostics</span> <br />
          For Everyone.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-slate-500 text-xl mb-14 leading-relaxed font-medium"
        >
          CureLens AI agents work 24/7 to analyze injuries, provide immediate recovery steps, 
          and track healing progress with medical-grade precision.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href={'dashboard/scanner'}>
          <button className="bg-[#6366F1] text-white px-12 py-6 rounded-full font-black text-xl shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:scale-105 hover:bg-[#4F46E5] transition-all duration-300">
            Start AI Analysis
          </button>
          </Link>
          <button className="flex items-center gap-4 group px-8 py-6 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Play size={20} fill="currentColor" />
            </div>
            <Link href={'dashboard/chat'}>
            <button className="text-lg font-bold text-slate-700">See AI in Action</button>
            </Link>
          </button>
        </motion.div>
      </section>

      {/* 📊 2. PROVEN RESULTS (#results) */}
      <section id="results" className="relative py-32 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-5xl font-black text-[#1A1A3F] tracking-tight mb-4">Proven Results For <br /> Global Healthcare</h2>
            <div className="h-2 w-24 bg-indigo-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              pct="98.2%" 
              title="Detection Accuracy" 
              desc="Our vision models are trained on 2M+ dermatological and soft-tissue injury datasets."
            />
            <StatCard 
              pct="24/7" 
              title="Instant Availability" 
              desc="Eliminate waiting rooms for minor injuries. Get immediate first-aid protocols anytime."
            />
            <StatCard 
              pct="14" 
              title="Global Languages" 
              desc="Native support for English, Telugu, Hindi, Spanish, and more for universal healing."
            />
          </div>
        </div>
      </section>

      {/* 🛡️ 3. WHY CHOOSE US (#features) */}
      <section id="features" className="py-20 px-6 scroll-mt-24">
        <div className="container mx-auto bg-[#1A1A3F] rounded-[5rem] p-16 md:p-24 overflow-hidden relative text-white">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <span className="bg-indigo-500/20 text-indigo-300 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-indigo-500/30">
                Core Capabilities
              </span>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">Simply, Efficeintly, <br /> Smartly.</h2>
              <p className="text-slate-400 text-xl leading-relaxed">
                We combine LLMs with proprietary Computer Vision to provide a healthcare 
                assistant that actually sees what you&apos;re describing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['HIPAA Compliant', 'Real-time Tracking', 'Doctor Integration', 'Emergency Sync'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-200">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[3.5rem] p-1 shadow-2xl">
                <div className="bg-[#1A1A3F] rounded-[3.4rem] p-10">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-500 rounded-full animate-pulse" />
                        <span className="font-bold">AI Agent Active</span>
                      </div>
                      <Zap className="text-yellow-400" />
                   </div>
                   <div className="space-y-4">
                      <div className="h-4 w-full bg-white/5 rounded-full" />
                      <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                      <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                   </div>
                   <div className="mt-12 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                      <Camera size={48} className="text-white/20" />
                   </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl text-[#1A1A3F]">
                <Activity className="text-indigo-600 mb-2" />
                <p className="text-xs font-black uppercase">Live Analysis</p>
                <p className="text-2xl font-black tracking-tighter">94% Confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏥 4. CATEGORIES & GUIDES */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <h2 className="text-4xl font-black text-[#1A1A3F] mb-4">Specialized For Every <br /> Type of Injury</h2>
            <p className="text-slate-500 font-medium">Click a category to see how our AI handles specific trauma.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-black transition-all",
                  activeCategory === c ? "bg-[#1A1A3F] text-white shadow-xl" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[4rem] p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <h3 className="text-5xl font-black text-[#1A1A3F]">Expert Recovery for {activeCategory}</h3>
              <p className="text-lg text-slate-500 leading-relaxed">
                Whether it&apos;s a minor kitchen accident or a sports injury, our AI identifies 
                depth, surface area, and risk of infection instantly.
              </p>
              <ul className="space-y-4">
                {['Immediate Cooling Protocols', 'Antiseptic Selection', 'Bandaging Techniques', 'Warning Sign Monitoring'].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                    <Plus className="text-indigo-500" size={18} /> {item}
                  </li>
                ))}
              </ul>
              <button className="text-indigo-600 font-black flex items-center gap-2 group">
                View Detailed Guide <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
           <div className="aspect-square bg-slate-50 rounded-[3.5rem] border-4 border-white shadow-inner flex items-center justify-center">
              <Scan size={100} className="text-indigo-200 animate-pulse" />
           </div>
        </div>
      </section>

      {/* 💬 5. TESTIMONIALS & FAQ */}
      <section id="testimonials" className="py-32 bg-[#F8FAFF]">
        <div className="container mx-auto px-6">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-[#1A1A3F] mb-4 leading-tight">You&apos;re In Good Hands</h2>
              <div className="flex items-center justify-center gap-1 text-orange-400">
                 {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" size={20} />)}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative">
                  <div className="absolute top-[-20px] left-10 h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white italic font-serif text-2xl">&quot;</div>
                  <p className="text-slate-600 leading-relaxed italic mb-8">
                    &quot;This app bridged the gap between a panic moment and a calm recovery. 
                    The AI analysis was spot-on and the voice guidance kept me focused 
                    while I was treating my son&apos;s injury.&quot;
                  </p>
                  <div className="flex items-center gap-4 border-t pt-8">
                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                    <div>
                      <p className="font-black text-[#1A1A3F] text-sm">Alexander G.</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Athlete & Parent</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🏮 FOOTER (#faq) */}
      <footer id="faq" className="bg-[#1A1A3F] text-white pt-32 pb-16 px-6 rounded-t-[5rem]">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
               <div>
                  <h2 className="text-5xl font-black mb-10 leading-tight">Frequently <br /> Asked Questions</h2>
                  <div className="space-y-4">
                    {[
                      { q: "Is the AI medically certified?", a: "CureLens is an educational triage assistant designed to augment first-aid, not replace surgeons." },
                      { q: "How is my data stored?", a: "All medical images are processed using end-to-end AES-256 encryption." },
                      { q: "Can I use it for my children?", a: "Yes, our models are trained on pediatric injury datasets for all ages." }
                    ].map((item, i) => (
                      <div key={i} className="group border-b border-white/10 pb-6 cursor-pointer">
                        <div className="flex justify-between items-center mb-4">
                           <p className="text-xl font-bold">{item.q}</p>
                           <Plus className="group-hover:rotate-45 transition-transform" />
                        </div>
                        <p className="text-slate-400 text-sm hidden group-hover:block animate-in fade-in slide-in-from-top-2">{item.a}</p>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="bg-white/5 rounded-[4rem] p-12 border border-white/10 flex flex-col justify-center text-center items-center">
                  <Award size={64} className="text-indigo-400 mb-8" />
                  <h3 className="text-3xl font-black mb-4">Join the Future <br /> of Healthcare</h3>
                  <p className="text-slate-400 mb-10 max-w-xs">Be part of the 2,400+ clinics already using CureLens AI agents.</p>
                  <button className="bg-white text-[#1A1A3F] px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                    Get Started Now
                  </button>
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 gap-8">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black">C</div>
                  <span className="text-2xl font-black tracking-tighter">CureLens<span className="text-indigo-400">.Ai</span></span>
               </div>
               <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                  <Link href="#" className="hover:text-white transition-colors">Security</Link>
               </div>
               <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer"><Globe size={18}/></div>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}


// Utility to merge classes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

