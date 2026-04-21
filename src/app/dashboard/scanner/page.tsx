"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import { 
  RefreshCcw, X, Camera, Cpu, Upload, Crosshair, Search, Database, 
  Activity, ShieldCheck, FileText, Share2, MapPin, Globe, 
  Clock, Zap, Brain, HeartPulse, Microscope
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- TYPES & DATA ---
type ScanState = 'idle' | 'preview' | 'capturing' | 'analyzing' | 'result';
const LABELS = ["Abrasions", "Bruises", "Burns", "Cut", "Diabetic Wounds", "Laceration", "Normal Skin", "Pressure Wounds", "Surgical Wounds", "Venous Wounds"];

const WOUND_INFO: Record<string, { desc: string; safety: string[] }> = {
  "Abrasions": { desc: "Surface-level scrape where the outer layer of skin is rubbed away.", safety: ["Clean with mild soap and water.", "Apply antibiotic ointment.", "Cover with a non-stick bandage."] },
  "Bruises": { desc: "Bleeding under the skin caused by blunt force impact.", safety: ["Apply a cold compress for 15 mins.", "Elevate the injured area.", "Rest the affected limb."] },
  "Burns": { desc: "Tissue damage resulting from heat, chemicals, or radiation.", safety: ["Run cool water over the area.", "Do not apply butter or ointments.", "Cover loosely with sterile gauze."] },
  "Cut": { desc: "A clean, straight break in the skin often caused by sharp objects.", safety: ["Apply firm pressure to stop bleeding.", "Clean with sterile saline.", "Use adhesive strips to close edges."] },
  "Diabetic Wounds": { desc: "Ulcerations typically on the feet due to poor circulation and neuropathy.", safety: ["Keep the area dry and clean.", "Inspect daily for signs of infection.", "Consult a podiatrist immediately."] },
  "Laceration": { desc: "A deep, jagged tear in the skin and underlying soft tissue.", safety: ["Control bleeding with direct pressure.", "Seek medical attention for potential stitches.", "Keep the wound elevated."] },
  "Normal Skin": { desc: "Healthy epidermal tissue with no acute injuries detected.", safety: ["Maintain regular skin hydration.", "Use SPF 30+ for UV protection.", "Continue standard hygiene."] },
  "Pressure Wounds": { desc: "Injuries to skin and underlying tissue resulting from prolonged pressure.", safety: ["Reposition every 2 hours.", "Use pressure-relieving cushions.", "Keep skin clean and moisturized."] },
  "Surgical Wounds": { desc: "Incisions made during medical procedures currently in the healing phase.", safety: ["Follow specific post-op dressing orders.", "Watch for increased redness or pus.", "Keep the area dry."] },
  "Venous Wounds": { desc: "Sores caused by abnormal vein function and poor blood return.", safety: ["Elevate legs above heart level.", "Use compression therapy if advised.", "Clean gently to protect fragile skin."] }
};

export default function UltimateScannerSuite() {
  const [state, setState] = useState<ScanState>('idle');
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      try {
        const m = await tf.loadLayersModel('/model/wound-classification/model.json');
        setModel(m);
      } catch (err) { console.error(err); }
    }
    init();
  }, []);

  const triggerAnalysis = async () => {
    if (!model || !previewImg) return;
    setState('analyzing'); setProgress(20);
    const img = new Image();
    img.src = previewImg;
    img.onload = async () => {
      setProgress(60);
      const tensor = tf.tidy(() => tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().div(255.0).expandDims(0));
      const pred = model.predict(tensor) as tf.Tensor;
      const scores = await pred.data();
      const maxIdx = scores.indexOf(Math.max(...Array.from(scores)));
      const label = LABELS[maxIdx];
const confidence = (scores[maxIdx] * 100).toFixed(1);
const resultData = { 
  label, 
  confidence: parseFloat(confidence), 
  description: WOUND_INFO[label].desc,
  safetyProtocols: WOUND_INFO[label].safety,
  timestamp: serverTimestamp() 
};

// --- Firebase Push ---
try {
  const docRef = await addDoc(collection(db, "wound_scans"), resultData);
  console.log("Diagnostic record stored with ID: ", docRef.id);
} catch (e) {
  console.error("Error logging diagnostic data: ", e);
}

// Proceed with state update
setProgress(100);
      setProgress(100);
      setTimeout(() => {
        setAnalysisResult({ label, confidence: (scores[maxIdx]*100).toFixed(1), ...WOUND_INFO[label] });
        setState('result');
      }, 600);
      tensor.dispose();
    };
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 p-6 font-sans overflow-x-hidden">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) { const r = new FileReader(); r.onload = () => { setPreviewImg(r.result as string); setState('preview'); }; r.readAsDataURL(f); }
      }} />

      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* TOP COMMAND BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-xl"><Brain className="text-indigo-400" size={20}/></div>
            <div><p className="text-[10px] uppercase font-mono text-slate-500">Neural Core</p><p className="text-sm font-bold text-white uppercase tracking-tighter">MobileNet-V2 Active</p></div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl"><Zap className="text-emerald-400" size={20}/></div>
            <div><p className="text-[10px] uppercase font-mono text-slate-500">Inference Speed</p><p className="text-sm font-bold text-white uppercase tracking-tighter">42ms / Edge GPU</p></div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 rounded-xl"><HeartPulse className="text-rose-400" size={20}/></div>
            <div><p className="text-[10px] uppercase font-mono text-slate-500">System Status</p><p className="text-sm font-bold text-white uppercase tracking-tighter">Live Monitoring</p></div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl"><Microscope className="text-blue-400" size={20}/></div>
            <div><p className="text-[10px] uppercase font-mono text-slate-500">Dataset Version</p><p className="text-sm font-bold text-white uppercase tracking-tighter">v2.4.0 WoundSet</p></div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: MAIN SCANNER */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] bg-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {state === 'idle' && (
                  <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950/20 to-black">
                    <div className="w-24 h-24 mb-6 border-2 border-dashed border-indigo-500/30 rounded-full flex items-center justify-center animate-pulse">
                        <Camera size={40} className="text-indigo-500"/>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">Neural Scanner</h2>
                    <p className="text-slate-500 mb-8 max-w-md text-center text-sm">Align injury within the biometric frame for automated tissue classification.</p>
                    <div className="flex gap-4">
                      <button onClick={async () => {
                        setState('capturing');
                        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                        if (videoRef.current) videoRef.current.srcObject = s;
                      }} className="px-10 py-5 bg-indigo-600 rounded-2xl text-white font-black uppercase text-xs tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-2">
                        <Camera size={16}/> Start Live Capture
                      </button>
                      <button onClick={() => fileInputRef.current?.click()} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                        Upload Scan
                      </button>
                    </div>
                  </motion.div>
                )}

                {(state === 'capturing' || state === 'preview') && (
                  <motion.div className="absolute inset-0">
                    {state === 'capturing' ? <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" /> : <img src={previewImg || ''} className="w-full h-full object-contain bg-[#050510]" />}
                    <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                        <div className="w-full h-full border border-indigo-500/30 rounded-3xl flex items-center justify-center">
                            <div className="w-1 h-full bg-indigo-500/20 animate-pulse absolute left-1/2 -translate-x-1/2"/>
                            <div className="h-1 w-full bg-indigo-500/20 animate-pulse absolute top-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                    <div className="absolute bottom-10 inset-x-0 flex justify-center gap-6 z-20">
                       <button onClick={() => setState('idle')} className="p-5 bg-black/80 rounded-2xl border border-white/10 text-white hover:bg-rose-900/40"><X size={24}/></button>
                       {state === 'capturing' ? (
                          <button onClick={() => {
                            const c = document.createElement('canvas');
                            c.width = videoRef.current!.videoWidth; c.height = videoRef.current!.videoHeight;
                            c.getContext('2d')!.drawImage(videoRef.current!, 0,0);
                            setPreviewImg(c.toDataURL('image/jpeg'));
                            (videoRef.current!.srcObject as MediaStream).getTracks().forEach(t => t.stop());
                            setState('preview');
                          }} className="w-20 h-20 bg-white rounded-full border-8 border-white/20 hover:scale-110 transition-transform shadow-2xl"/>
                       ) : (
                          <button onClick={triggerAnalysis} className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-emerald-900/20">Analyze Morphology</button>
                       )}
                    </div>
                  </motion.div>
                )}

                {state === 'analyzing' && (
                  <motion.div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"/>
                      <Cpu size={48} className="text-indigo-500 animate-pulse"/>
                    </div>
                    <p className="font-mono text-indigo-400 text-xs tracking-[0.3em] mb-4">PROCESSING TISSUE PIXELS...</p>
                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }}/>
                    </div>
                  </motion.div>
                )}

                {state === 'result' && (
                  <motion.div className="absolute inset-0 bg-[#050510]">
                    <img src={previewImg || ''} className="w-full h-full object-cover opacity-30 blur-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center">
                          <Activity size={80} className="text-indigo-500/20 mx-auto mb-4"/>
                          <p className="font-mono text-indigo-400/50 uppercase tracking-[0.5em]">Neural Map Generated</p>
                       </div>
                    </div>
                    <button onClick={() => setState('idle')} className="absolute top-8 right-8 p-3 bg-white/5 rounded-xl border border-white/10"><X/></button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LOWER NEWS/ACTION TICKER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl col-span-2">
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase mb-4 flex items-center gap-2"><Globe size={12}/> Global Medical AI Updates</h5>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                            <span className="text-slate-300">New study confirms MobileNet-V2 efficacy in dermatology.</span>
                            <span className="text-indigo-400 font-mono">2m ago</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                            <span className="text-slate-300">FDA clears 3 new AI tools for triage applications.</span>
                            <span className="text-indigo-400 font-mono">1h ago</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300">Dataset v2.5 training session scheduled for next week.</span>
                            <span className="text-indigo-400 font-mono">Now</span>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex flex-col justify-center text-center">
                    <h4 className="text-indigo-400 text-xl font-black italic">CLINIC FINDER</h4>
                    <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Connect to Local Experts</p>
                    <button className="mt-4 py-3 bg-indigo-500 rounded-xl text-xs font-bold uppercase tracking-tighter hover:bg-indigo-400 transition-colors">Start Search</button>
                </div>
            </div>
          </div>

          {/* RIGHT: RESULTS & RESOURCES */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {state !== 'result' ? (
                <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center">
                  <Database size={40} className="text-slate-800 mb-6"/>
                  <h3 className="text-xl font-bold text-white mb-2">Biometric Queue Empty</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">System is idling. Please input an image to trigger the 10-class diagnostic suite.</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {/* DIAGNOSIS CARD */}
                  <div className="bg-white/5 border border-indigo-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Brain size={120}/></div>
                    <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.2em] mb-4">Neural Identification</p>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-2 italic uppercase">{analysisResult.label}</h2>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-[10px] text-indigo-300 font-bold">{analysisResult.confidence}% CONFIDENCE</div>
                        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold ${analysisResult.confidence > 80 ? 'bg-rose-950 text-rose-400 border-rose-900' : 'bg-orange-950 text-orange-400 border-orange-900'}`}>URGENCY: {analysisResult.confidence > 80 ? 'CRITICAL' : 'MODERATE'}</div>
                    </div>
                    <p className="mt-8 text-sm text-slate-400 leading-relaxed italic border-l-2 border-indigo-500 pl-4">{analysisResult.desc}</p>
                  </div>

                  {/* SAFETY PROTOCOL CARD */}
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck size={20} className="text-emerald-400" />
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Recommended Actions</p>
                    </div>
                    <div className="space-y-4">
                      {analysisResult.safety.map((s: string, i: number) => (
                        <div key={i} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors">
                           <span className="text-emerald-500 font-mono text-xs font-bold">{i+1}</span>
                           <span className="text-xs text-slate-300 font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION GRID */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-indigo-600/10 transition-colors group">
                        <FileText size={20} className="text-slate-500 group-hover:text-indigo-400 mb-2"/>
                        <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">Save PDF</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-indigo-600/10 transition-colors group">
                        <Share2 size={20} className="text-slate-500 group-hover:text-indigo-400 mb-2"/>
                        <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">Share Data</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}