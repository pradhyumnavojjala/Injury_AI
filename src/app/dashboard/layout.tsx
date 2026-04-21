"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  MessageSquare, 
  AlertCircle, 
  ChevronLeft, 
  LayoutDashboard, 
  Settings, 
  Bell,
  Search
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = useMemo(() => [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'scan', label: 'AI Scanner', icon: Scan, href: '/dashboard/scanner' },
    { id: 'chat', label: 'Medical AI Chat', icon: MessageSquare, href: '/dashboard/chat' },
    { id: 'emergency', label: 'SOS Hub', icon: AlertCircle, href: '/dashboard/emergency', color: 'text-rose-500' },
  ], []);

  // Simple logic to show the current page title in the header
  const currentLabel = menuItems.find(item => item.href === pathname)?.label || "Portal";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1A1A3F] selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- SIDEBAR --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full bg-white border-r border-slate-200/60 z-50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="h-11 w-11 shrink-0 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
            <Scan size={24} strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 overflow-hidden"
              >
                <span className="font-black text-xl tracking-tight block leading-none">CureLens<span className="text-indigo-600">.Ai</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health OS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} className="block">
                <div className={cn(
                  "relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group active:scale-[0.98]",
                  isActive 
                    ? "bg-indigo-50/80 text-indigo-600 shadow-sm shadow-indigo-100/50" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}>
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                    />
                  )}
                  
                  <item.icon className={cn("shrink-0 transition-transform group-hover:scale-110", isActive ? (item.color || 'text-indigo-600') : 'text-slate-400')} size={22} />
                  
                  {isSidebarOpen && (
                    <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Settings) */}
        <div className="p-4 border-t border-slate-100">
             <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                <Settings size={22} />
                {isSidebarOpen && <span className="text-sm font-semibold">Settings</span>}
             </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-[280px]" : "ml-[88px]"
      )}>

        {/* Page Container */}
        <div className="p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}