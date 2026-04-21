"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Building2, Phone, MessageSquare, Ambulance, X, Search, 
    CheckCircle2, MapPin, Zap, ShieldAlert, AlertTriangle, 
    Clock, Database, Wifi 
} from 'lucide-react';

// --- DATA LAYER: Full 40 Hospital Registry ---
const HOSPITALS = [
  { id: 1, name: "Narayanamma Hospital", desc: "Multi-specialty care near CMR Campus.", phone: "914023792011" },
  { id: 2, name: "Suraksha Children's Hospital", desc: "Specialized pediatric emergency care.", phone: "914023791122" },
  { id: 3, name: "Malla Reddy Narayana", desc: "Major tertiary care hospital with 24/7 trauma.", phone: "914023798899" },
  { id: 4, name: "Ankura Hospital", desc: "Specialized maternity and neonatal emergency.", phone: "914023796677" },
  { id: 5, name: "Russh Hospitals", desc: "Advanced surgical and emergency center.", phone: "914023794455" },
  { id: 6, name: "Dhruva Multi Speciality", desc: "General medical and urgent care.", phone: "914023795566" },
  { id: 7, name: "Sai Vani Hospital", desc: "Standard trauma and surgical facility.", phone: "914023797788" },
  { id: 8, name: "Apollo Clinic Kompally", desc: "High-end diagnostic and primary care.", phone: "914023792244" },
  { id: 9, name: "Tulasi Hospitals", desc: "Specialized critical care unit.", phone: "914023794466" },
  { id: 10, name: "Jeevan Hospital", desc: "Trauma and intensive care focus.", phone: "914023790022" },
  { id: 11, name: "Balaji Hospital", desc: "24/7 emergency and outpatient services.", phone: "914023793355" },
  { id: 12, name: "Sri Harsha Hospital", desc: "Surgical and trauma center.", phone: "914023795577" },
  { id: 13, name: "Avni Hospital", desc: "Maternity and general emergency.", phone: "914023796688" },
  { id: 14, name: "Om Hospital", desc: "Routine and emergency care services.", phone: "914023797799" },
  { id: 15, name: "Narayana Multi-Speciality", desc: "Cardiac and neuro emergency response.", phone: "914023798800" },
  { id: 16, name: "Life Care Hospital", desc: "General emergency and ward services.", phone: "914023799911" },
  { id: 17, name: "Sai Kiran Hospital", desc: "Local emergency support.", phone: "914023791133" },
  { id: 18, name: "Medwin Hospital (Satellite)", desc: "Primary emergency triage unit.", phone: "914023792244" },
  { id: 19, name: "Srujana Hospital", desc: "Women and child health specialty.", phone: "914023793355" },
  { id: 20, name: "Siddhartha Hospital", desc: "Orthopedic and general trauma.", phone: "914023794466" },
  { id: 21, name: "Varsha Hospital", desc: "Critical care and diagnostic center.", phone: "914023795577" },
  { id: 22, name: "Rishi Hospital", desc: "Routine health and minor emergency.", phone: "914023796688" },
  { id: 23, name: "Akshitha Hospital", desc: "Surgical intervention and trauma.", phone: "914023797799" },
  { id: 24, name: "Vamsi Hospital", desc: "General emergency and internal medicine.", phone: "914023798800" },
  { id: 25, name: "Mounika Hospital", desc: "24/7 patient support and care.", phone: "914023799911" },
  { id: 26, name: "Sai Teja Hospital", desc: "Pediatric emergency services.", phone: "914023790022" },
  { id: 27, name: "Medi-Hope Hospital", desc: "Comprehensive multi-specialty care.", phone: "914023791133" },
  { id: 28, name: "Shweta Hospital", desc: "Local multi-specialty emergency care.", phone: "914023799900" },
  { id: 29, name: "Gomathi Hospital", desc: "Diagnostic and acute care services.", phone: "914023791133" },
  { id: 30, name: "Prime Hospital", desc: "Advanced trauma and critical care.", phone: "914023795544" },
  { id: 31, name: "Sunshine Hospital", desc: "Specialized orthopedic emergency.", phone: "914023796655" },
  { id: 32, name: "Care Hospitals", desc: "Major multi-specialty trauma unit.", phone: "914023797766" },
  { id: 33, name: "Medicover Hospital", desc: "Comprehensive diagnostic & surgical care.", phone: "914023798877" },
  { id: 34, name: "KIMS Hospital", desc: "Tertiary care with 24/7 ER.", phone: "914023799988" },
  { id: 35, name: "Pranaam Hospital", desc: "Integrated medical emergency center.", phone: "914023793344" },
  { id: 36, name: "Astra Hospital", desc: "Modern emergency surgery facility.", phone: "914023794400" },
  { id: 37, name: "Hope Children's Hospital", desc: "Pediatric-focused emergency support.", phone: "914023795511" },
  { id: 38, name: "Metro Hospital", desc: "General trauma and medical urgencies.", phone: "914023796622" },
  { id: 39, name: "City Care Hospital", desc: "Routine and emergency hospital services.", phone: "914023797733" },
  { id: 40, name: "Global Health Hospital", desc: "Specialized multi-disciplinary emergency.", phone: "914023798844" }
];

// --- SUB-COMPONENTS: Demonstrating Modular Architecture ---
const SystemHeader = ({ address }: { address: string }) => (
  <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex justify-between items-center shadow-lg mb-8">
    <div className="flex items-center gap-4">
        <Wifi className="text-emerald-400" />
        <span className="font-bold tracking-widest text-emerald-400">LIVE TRIAGE CONNECTION</span>
    </div>
    <div className="text-right">
        <p className="text-xs text-slate-400 uppercase">Current Node Location</p>
        <p className="font-bold">{address}</p>
    </div>
  </div>
);

const HospitalCard = ({ h, onClick }: { h: any, onClick: () => void }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }} 
    onClick={onClick} 
    className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-400 cursor-pointer shadow-sm transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Building2 size={20}/></div>
        <h4 className="font-black text-lg">{h.name}</h4>
    </div>
    <p className="text-slate-500 text-sm h-12">{h.desc}</p>
  </motion.div>
);

// --- MAIN HUB ---
export default function UltimateEmergencyHub() {
  const [selectedHosp, setSelectedHosp] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("Localizing...");
  const [isDispatching, setIsDispatching] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // --- LOGIC: Advanced Logging & Event Handling ---
  const addLog = (msg: string) => {
    setEventLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDispatch = async (hospital: any, isSOS: boolean) => {
    setIsDispatching(true);
    addLog(`Initiating ${isSOS ? 'SOS_BROADCAST' : 'DISPATCH_PROTOCOL'}...`);
    
    try {
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hospitalName: isSOS ? "EMERGENCY BROADCAST" : hospital?.name, 
          location: address,
          timestamp: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error();
      addLog("SERVER_ACK: SIGNAL RECEIVED");
    } catch {
      addLog("ERROR: RELAY_FAILURE | SWITCHING_TO_EMAIL");
      window.location.href = `mailto:pradhyumnavojjala@gmail.com?subject=SOS&body=Emergency at ${address}`;
    } finally {
      setIsDispatching(false);
    }
  };

  // --- LIFECYCLE: Geolocation Init ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
        const data = await res.json();
        setAddress(data.display_name.split(',').slice(0, 3).join(','));
      });
    }
  }, []);

  const filtered = HOSPITALS.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <SystemHeader address={address} />

        {/* HERO SECTION */}
        <section className="bg-white p-10 rounded-[3rem] border-4 border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
            <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase">AEGIS Triage</h1>
                <p className="text-slate-500 font-bold mt-2">Tactical Emergency Response Engine</p>
            </div>
            <button 
                onClick={() => handleDispatch(null, true)} 
                className="px-12 py-6 bg-rose-600 text-white rounded-[2rem] font-black text-2xl hover:bg-rose-700 shadow-rose-300 shadow-2xl transition-all"
            >
                {isDispatching ? "TRANSMITTING..." : "SOS ACTIVATED"}
            </button>
        </section>

        {/* --- SEARCH BAR: Integrated --- */}
        <div className="relative group">
            <Search className="absolute left-8 top-7 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" size={28}/>
            <input 
                placeholder="Search triage units, hospitals, or specialized emergency care..."
                className="w-full p-8 pl-20 bg-white rounded-[2rem] shadow-sm border-2 border-slate-200 text-lg font-bold outline-none focus:border-indigo-500 transition-all"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-8 top-8 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:block">
                Showing {filtered.length} Results
            </div>
        </div>

       {/* LOG & GRID SECTION: Now with Scrollable Container */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            
            {/* Scrollable Hospital List */}
            <div className="lg:col-span-2 bg-slate-100/50 p-6 rounded-[2rem] border border-slate-200 overflow-y-auto shadow-inner">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filtered.map(h => (
                        <HospitalCard key={h.id} h={h} onClick={() => setSelectedHosp(h)} />
                    ))}
                </div>
            </div>
            
            {/* SIDEBAR LOGS */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 h-fit space-y-6">
                <h3 className="font-black text-lg flex items-center gap-2"><Database size={20}/> Event Log</h3>
                <div className="space-y-4">
                    {eventLog.map((log, i) => <p key={i} className="text-xs font-mono text-slate-500 border-l-2 border-indigo-200 pl-3">{log}</p>)}
                </div>
            </div>
        </div>

        {/* DETAIL MODAL */}
        <AnimatePresence>
            {selectedHosp && (
                <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div className="bg-white p-10 rounded-[3rem] max-w-lg w-full space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-black">{selectedHosp.name}</h2>
                            <button onClick={() => setSelectedHosp(null)} className="p-2 bg-slate-100 rounded-full"><X/></button>
                        </div>
                        <p className="text-slate-600">{selectedHosp.desc}</p>
                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => window.location.href=`tel:${selectedHosp.phone}`} className="p-4 bg-emerald-50 rounded-2xl flex flex-col items-center"><Phone size={24}/> Call</button>
                            <button onClick={() => window.location.href=`sms:${selectedHosp.phone}`} className="p-4 bg-sky-50 rounded-2xl flex flex-col items-center"><MessageSquare size={24}/> Msg</button>
                            <button onClick={() => handleDispatch(selectedHosp, false)} className="p-4 bg-rose-50 rounded-2xl flex flex-col items-center"><Ambulance size={24}/> Dispatch</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {toast && <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-6 rounded-2xl font-black shadow-2xl">{toast}</div>}
      </div>
    </div>
  );
}