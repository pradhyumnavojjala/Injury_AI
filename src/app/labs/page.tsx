"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, Check, ShoppingCart, TestTube, Microscope, Dna, 
  Droplets, CheckCircle2, ArrowRight, ShieldCheck, CreditCard,
  MapPin, Truck, Calendar, Sparkles, Receipt, Info, Zap
} from 'lucide-react';
import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@clerk/nextjs'; // Add this


// --- EXPANDED DATASET ---
const LAB_TESTS = [
  { id: 't1', name: 'Hematology Panel', price: 49, icon: Droplets, category: 'Blood', desc: 'Full CBC with Differential and Platelets.' },
  { id: 't2', name: 'Neural Recovery', price: 120, icon: Dna, category: 'Advanced', desc: 'AI screening for neurological recovery indicators.' },
  { id: 't3', name: 'Metabolic Panel', price: 85, icon: TestTube, category: 'Organ', desc: 'Comprehensive kidney and liver function profiling.' },
  { id: 't4', name: 'CRP Inflammation', price: 35, icon: Microscope, category: 'Stress', desc: 'Measures high-sensitivity physical tissue stress.' },
  { id: 't5', name: 'Vitamin & Nutrient', price: 65, icon: Beaker, category: 'Health', desc: 'Essential recovery-boosting micronutrient check.' },
  { id: 't6', name: 'Cardiac Health', price: 95, icon: ShieldCheck, category: 'Advanced', desc: 'Advanced heart-stress and lipid biomarkers.' },
];

export default function UltimateLabDiagnostics() {
  const [cart, setCart] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [collectionMode, setCollectionMode] = useState<'home' | 'lab'>('home');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const { user } = useUser(); // Hook to get current user ID

  const handleBooking = async () => {
    if (!user) return alert("Please sign in to book.");
    setIsBooking(true);

    try {
      const newRecord = {
        testName: LAB_TESTS.filter(t => cart.includes(t.id)).map(t => t.name).join(' + '),
        date: new Date().toLocaleDateString(),
        status: 'Processing',
        lab: collectionMode === 'home' ? 'Home Collection (Bahadurpally)' : 'City Diagnostic Center',
        amount: total,
        timestamp: new Date() // Useful for sorting
      };

      // WRITE TO FIRESTORE
      // This matches the path: users/{userId}/labs
      const labsCollectionRef = collection(db, "labs");
      await addDoc(labsCollectionRef, newRecord);

      // Keep localStorage for instant UI feedback (optional)
      const existingHistory = JSON.parse(localStorage.getItem('curelens_history') || '[]');
      localStorage.setItem('curelens_history', JSON.stringify([newRecord, ...existingHistory]));

      setIsBooking(false);
      setIsDone(true);
    } catch (error) {
      console.error("Error saving booking:", error);
      setIsBooking(false);
    }
  };

  const toggleTest = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const subtotal = useMemo(() => 
    LAB_TESTS.filter(t => cart.includes(t.id)).reduce((acc, curr) => acc + curr.price, 0), 
    [cart]
  );
  
  const homeCollectionFee = collectionMode === 'home' ? 0 : 0;
  const total = subtotal + homeCollectionFee - discount;


  const applyPromo = () => {
    if (promo.toUpperCase() === 'CURELENS10') {
      setDiscount(subtotal * 0.1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-4 lg:p-12 font-sans">
      <div className="max-w-[1500px] mx-auto">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
              
              {/* --- HEADER --- */}
              <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={12} fill="currentColor" /> Neural-Lab Integration Active
                  </div>
                  <h1 className="text-7xl font-black tracking-tighter text-[#1A1A3F] leading-none italic">
                    Diagnostic <span className="text-indigo-600">Portal.</span>
                  </h1>
                  <p className="text-slate-400 font-medium max-w-xl text-lg">
                    Schedule clinical-grade tests analyzed by the CureLens AI engine. 
                    Real-time results sent to your dashboard by tomorrow morning.
                  </p>
                </div>

                <div className="flex gap-4 p-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                  {(['home', 'lab'] as const).map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setCollectionMode(mode)}
                      className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        collectionMode === mode ? 'bg-[#1A1A3F] text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {mode === 'home' ? <Truck size={14} /> : <MapPin size={14} />}
                      {mode === 'home' ? 'Home Collection' : 'Lab Visit'}
                    </button>
                  ))}
                </div>
              </header>

              {/* --- MAIN INTERFACE --- */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                
                {/* Product Grid (8/12) */}
                <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {LAB_TESTS.map((test) => {
                    const selected = cart.includes(test.id);
                    return (
                      <motion.div 
                        key={test.id}
                        whileHover={{ y: -8, scale: 1.01 }}
                        onClick={() => toggleTest(test.id)}
                        className={`p-10 rounded-[4rem] border-2 transition-all cursor-pointer relative flex flex-col justify-between min-h-[320px] group ${
                          selected ? 'border-indigo-600 bg-white shadow-2xl shadow-indigo-100' : 'border-slate-100 bg-white hover:border-indigo-200'
                        }`}
                      >
                        <div className="absolute top-8 right-8 text-[9px] font-black text-slate-200 uppercase tracking-widest group-hover:text-indigo-200">{test.category}</div>
                        <div>
                          <div className={`h-20 w-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 ${
                            selected ? 'bg-indigo-600 text-white shadow-xl rotate-12' : 'bg-slate-50 text-slate-400 group-hover:text-indigo-600'
                          }`}>
                            <test.icon size={36} />
                          </div>
                          <h3 className="text-3xl font-black text-[#1A1A3F] tracking-tighter mb-2 italic">{test.name}</h3>
                          <p className="text-sm text-slate-400 font-bold leading-relaxed">{test.desc}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-8">
                          <span className="text-4xl font-black text-[#1A1A3F] tracking-tighter">${test.price}</span>
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                            selected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'
                          }`}>
                            {selected ? <Check size={24} /> : <ShoppingCart size={24} />}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Billing Sidebar (4/12) */}
                <div className="xl:col-span-4">
                  <div className="bg-[#1A1A3F] rounded-[4rem] p-10 text-white shadow-2xl sticky top-12">
                    <div className="flex items-center justify-between mb-10">
                       <h3 className="font-black uppercase tracking-widest text-[11px] text-indigo-300 flex items-center gap-2">
                        <Receipt size={14} /> Cart Summary
                      </h3>
                      <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full">{cart.length} ITEMS</span>
                    </div>
                    
                    <div className="space-y-4 mb-10 max-h-[250px] overflow-y-auto custom-scrollbar pr-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-10 border border-white/5 rounded-3xl">
                          <p className="text-indigo-300/30 text-xs font-bold uppercase tracking-widest italic">No tests selected</p>
                        </div>
                      ) : (
                        LAB_TESTS.filter(t => cart.includes(t.id)).map(test => (
                          <motion.div key={test.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex justify-between items-center group">
                            <span className="text-indigo-100 font-bold text-sm group-hover:text-white transition-colors">{test.name}</span>
                            <span className="font-black text-sm">${test.price}</span>
                          </motion.div>
                        ))
                      )}
                      {collectionMode === 'home' && cart.length > 0 && (
                        <div className="flex justify-between items-center text-emerald-400 text-[10px] font-black uppercase italic">
                          <span>+ Home Collection Visit</span>
                          <span>$15</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6 pt-10 border-t border-white/10">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="PROMO CODE" 
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest w-full outline-none focus:bg-white/10"
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                        />
                        <button onClick={applyPromo} className="px-4 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white text-indigo-900 transition-all">Apply</button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Grand Total</span>
                          <span className="text-5xl font-black tracking-tighter italic">${total}</span>
                        </div>
                        <ShieldCheck className="text-emerald-500 mb-2" size={32} />
                      </div>

                      <button 
                        disabled={cart.length === 0 || isBooking}
                        onClick={handleBooking}
                        className="w-full py-7 bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/5 disabled:text-white/20 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 relative overflow-hidden group shadow-2xl shadow-indigo-950/50"
                      >
                        {isBooking ? (
                          <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Finalize Transaction <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                        )}
                      </button>
                      
                      <div className="flex items-center justify-center gap-3 text-[9px] text-indigo-300/40 font-black uppercase tracking-widest">
                        <Lock size={10} /> 256-Bit SSL Secured
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- SUCCESS STATE --- */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl mx-auto mt-12 bg-white p-12 lg:p-24 rounded-[5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-50 text-center relative overflow-hidden"
            >
              <div className="h-28 w-28 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <CheckCircle2 size={60} strokeWidth={3} />
              </div>
              
              <h2 className="text-6xl font-black tracking-tighter text-[#1A1A3F] mb-6 italic">Booking <span className="text-emerald-500">Confirmed.</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <Calendar size={24} className="mx-auto mb-4 text-indigo-600" />
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Date & Time</p>
                    <p className="text-sm font-black text-[#1A1A3F]">Today, 5:30 PM</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <Truck size={24} className="mx-auto mb-4 text-indigo-600" />
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Collection Point</p>
                    <p className="text-sm font-black text-[#1A1A3F]">Bahadurpally Home</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <Zap size={24} className="mx-auto mb-4 text-indigo-600" />
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Report TAT</p>
                    <p className="text-sm font-black text-[#1A1A3F]">Within 12 Hours</p>
                 </div>
              </div>

              <div className="bg-[#1A1A3F] p-8 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-xl shadow-indigo-100">
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest">Reference ID</p>
                  <p className="text-2xl font-black italic">#CL-LAB-88291</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white text-indigo-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Print Invoice</button>
                  <button className="px-8 py-4 bg-indigo-500 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">Track Tech</button>
                </div>
              </div>

              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                "Our phlebotomist is being dispatched. <br />
                <span className="text-[#1A1A3F] font-black italic">the reports will be sent</span> directly to your portal by tomorrow morning."
              </p>

              <button 
                onClick={() => setIsDone(false)}
                className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowRight className="rotate-180" size={14} /> Back to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Custom Helpers
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}