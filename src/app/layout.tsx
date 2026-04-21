import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Navbar } from '@/components/navigation/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`bg-slate-50 ${inter.className}`}>
          <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <Navbar />

            <div className="flex-1 flex flex-col">

              {/* Page Content */}
              <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
                {children}
              </main>
            </div>

            {/* Mobile Bottom Nav */}
            <BottomNav />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}