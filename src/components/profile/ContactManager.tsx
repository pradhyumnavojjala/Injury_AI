"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, Phone, User, ShieldCheck, X } from 'lucide-react';

export const ContactManager = ({ contacts = [], onUpdate }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;
    
    const contactEntry = {
      id: Date.now().toString(),
      ...newContact,
      isPrimary: contacts.length === 0 // Auto-set first contact as primary
    };
    
    onUpdate([...contacts, contactEntry]);
    setNewContact({ name: '', relation: '', phone: '' });
    setIsAdding(false);
  };

  const deleteContact = (id: string) => {
    onUpdate(contacts.filter((c: any) => c.id !== id));
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 h-full relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
             <Phone className="text-indigo-600" size={22} /> Trusted Contacts
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Emergency network</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-[0.98]"
        >
          <UserPlus size={14} /> Add
        </button>
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        <AnimatePresence>
          {contacts.map((c: any) => (
            <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex justify-between items-center bg-slate-50 p-5 rounded-2xl border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                    <User size={18} />
                </div>
                <div>
                   <p className="font-bold text-slate-900 text-sm">{c.name} {c.isPrimary && <ShieldCheck className="inline ml-1 text-emerald-500" size={14}/>}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{c.relation}</p>
                </div>
              </div>
              <button onClick={() => deleteContact(c.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Contact Modal */}
      {isAdding && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 p-8 rounded-[2rem] flex flex-col justify-center">
          <div className="flex justify-between mb-6">
            <h4 className="font-bold text-lg">New Contact</h4>
            <button onClick={() => setIsAdding(false)}><X size={20}/></button>
          </div>
          <div className="space-y-4">
            <input placeholder="Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" onChange={(e) => setNewContact({...newContact, name: e.target.value})} />
            <input placeholder="Relation" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" onChange={(e) => setNewContact({...newContact, relation: e.target.value})} />
            <input placeholder="Phone" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" onChange={(e) => setNewContact({...newContact, phone: e.target.value})} />
            <button onClick={addContact} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl">Confirm Addition</button>
          </div>
        </div>
      )}
    </div>
  );
}