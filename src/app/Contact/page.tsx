"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Mail, Phone, MapPin, MessageSquare, 
  ShieldCheck, User, AlertCircle, Terminal, 
  RefreshCw, Cpu, Database, ChevronRight, Lock 
} from 'lucide-react';

// --- SYSTEM_TYPES ---
interface TicketSubmission {
  name: string;
  id: string;
  category: 'technical' | 'billing' | 'security' | 'access';
  message: string;
  priority: 'low' | 'medium' | 'high';
}

export default function EnterpriseContactPage() {
  const [ticket, setTicket] = useState<TicketSubmission>({ 
    name: '', id: '', category: 'technical', message: '', priority: 'medium' 
  });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'secured'>('idle');

  // --- CORE_TRANSMISSION_ENGINE ---
  const handleTransmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('transmitting');
    // Simulated Enterprise-API Latency
    await new Promise(resolve => setTimeout(resolve, 2500));
    setStatus('secured');
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- EXECUTIVE HEADER --- */}
        <header className="mb-20">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            <Terminal size={14} /> Support_Infrastructure / Root
          </div>
          <h1 className="text-8xl font-black italic tracking-tighter text-[#1A1A3F]">Communication_Hub.</h1>
          <p className="text-slate-500 font-medium mt-6 text-xl max-w-lg">
            Direct channel to the CureLens Engineering Division. All transmissions are routed through encrypted diagnostic nodes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT_CHANNEL: INFRASTRUCTURE_NODES --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
              <ContactNode icon={Mail} title="Technical Division" value="ops@curelens.tech" desc="For API, Neural Network, and Database queries." />
              <ContactNode icon={Phone} title="Emergency Node" value="+91 999 888 7776" desc="Available for priority Tier-1 support outages." />
              <ContactNode icon={MapPin} title="Operational HQ" value="Hyderabad, Tech District" desc="Physical access strictly by appointment only." />
            </div>
            
            <div className="bg-[#1A1A3F] text-white p-10 rounded-[3rem] shadow-2xl">
               <h4 className="flex items-center gap-3 font-black text-xs uppercase tracking-widest mb-6"><Cpu size={14} /> System Availability</h4>
               <div className="space-y-4">
                  <StatusRow label="Regional Server" status="ACTIVE" />
                  <StatusRow label="API Gateway" status="STABLE" />
                  <StatusRow label="Encryption Engine" status="SECURED" />
               </div>
            </div>
          </div>

          {/* --- RIGHT_CHANNEL: SECURE_TICKET_FORM --- */}
          <form onSubmit={handleTransmit} className="lg:col-span-7 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl">
             <div className="grid grid-cols-2 gap-8 mb-10">
                <InputGroup label="Full Identity" value={ticket.name} onChange={(v:any) => setTicket({...ticket, name: v})} />
                <InputGroup label="System Node ID" value={ticket.id} onChange={(v:any) => setTicket({...ticket, id: v})} />
             </div>

             <div className="mb-10">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Inquiry Priority & Category</label>
               <div className="grid grid-cols-2 gap-6">
                 <select className="p-5 bg-slate-50 rounded-2xl border-none text-sm font-black" onChange={(e) => setTicket({...ticket, category: e.target.value as any})}>
                    <option value="technical">Technical Error</option>
                    <option value="billing">Billing Inquiry</option>
                    <option value="security">Security Protocol</option>
                 </select>
                 <select className="p-5 bg-slate-50 rounded-2xl border-none text-sm font-black" onChange={(e) => setTicket({...ticket, priority: e.target.value as any})}>
                    <option value="low">Priority: Low</option>
                    <option value="medium">Priority: Medium</option>
                    <option value="high">Priority: High</option>
                 </select>
               </div>
             </div>

             <div className="mb-12">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Diagnostic Payload</label>
               <textarea rows={8} className="w-full p-8 bg-slate-50 rounded-3xl border-none text-sm font-bold text-[#1A1A3F]" placeholder="Detail your issue for the engineering team..." />
             </div>

             <button 
                disabled={status !== 'idle'}
                className={`w-full py-8 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 ${
                  status === 'secured' ? 'bg-emerald-600 text-white' : 'bg-[#1A1A3F] text-white hover:bg-indigo-600'
                }`}
             >
                {status === 'idle' && <><Send size={16} /> Transmit Diagnostic Ticket</>}
                {status === 'transmitting' && <><RefreshCw className="animate-spin" size={16} /> Routing Payload...</>}
                {status === 'secured' && <><ShieldCheck size={16} /> Transmission Confirmed</>}
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- SUB_COMPONENTS ---
function ContactNode({ icon: Icon, title, value, desc }: any) {
  return (
    <div className="flex items-start gap-6">
      <div className="h-16 w-16 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mt-1">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{title}</p>
        <p className="text-lg font-black text-[#1A1A3F] mb-1">{value}</p>
        <p className="text-[10px] font-medium text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">{label}</label>
      <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border-none text-sm font-black text-[#1A1A3F]" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function StatusRow({ label, status }: any) {
  return (
    <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{label}</span>
      <span className="text-[9px] font-black text-emerald-400">{status}</span>
    </div>
  );
}