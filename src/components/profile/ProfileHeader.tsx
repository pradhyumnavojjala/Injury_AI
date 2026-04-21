"use client";
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

export const ProfileHeader = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return (
      <div className="w-full h-40 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      
      {/* Profile Image Module */}
      <div className="relative group">
        <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white">
          <img 
            src={user.imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Subtle status indicator */}
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-full border-4 border-white">
          <ShieldCheck size={16} className="text-white" />
        </div>
      </div>
      
      {/* Identity Information Module */}
      <div className="flex-1 text-center md:text-left space-y-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {user.fullName}
          </h1>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
            Authorized Medical Personnel
          </p>
        </div>
        
        {/* Contact Strip */}
        <div className="flex gap-6 mt-4 justify-center md:justify-start text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-indigo-400" /> 
            {user.primaryEmailAddress?.emailAddress}
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-indigo-400" /> 
            {user.phoneNumbers[0]?.phoneNumber || "No phone linked"}
          </div>
        </div>
      </div>

      {/* Decorative Branding Side-Panel */}
      <div className="hidden lg:block border-l border-slate-100 pl-8">
        <div className="text-right">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Status</p>
          <p className="text-sm font-bold text-slate-900">OPERATIONAL</p>
        </div>
      </div>
    </div>
  );
};