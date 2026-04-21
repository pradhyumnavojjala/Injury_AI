"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, MessageSquare, History, User } from 'lucide-react';
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Scan', href: '/scanner', icon: Camera },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'History', href: '/history', icon: History },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.name} href={tab.href} className="relative">
            <div className={cn(
              "flex flex-col items-center gap-1 min-w-[64px]",
              isActive ? "text-blue-600" : "text-slate-500"
            )}>
              <Icon className={cn("h-6 w-6", isActive && "animate-in zoom-in-75 duration-300")} />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </div>
            {isActive && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}