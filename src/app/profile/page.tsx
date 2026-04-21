"use client";
import React from 'react';
import { useMedicalProfile } from '@/hooks/useMedicalProfile';
import { 
  ProfileHeader, 
  EmergencyID, 
  SOSEngine, 
  ContactManager, 
  AIPersonalization 
} from '@/components/profile';

export default function ProfilePage() {
  const { profile, saveProfile, loading } = useMedicalProfile();

  if (loading || !profile) return (
    <div className="min-h-screen flex items-center justify-center font-black text-rose-500 animate-pulse">
      INITIALIZING SECURE NEURAL LINK...
    </div>
  );

  const updateSection = async (section: keyof typeof profile, data: any) => {
    await saveProfile({ ...profile, [section]: data });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-black to-slate-950 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ProfileHeader />

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-8">
                <EmergencyID 
                  data={profile.emergencyId} 
                  onSave={(d: any) => updateSection('emergencyId', d)} 
                />
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SOSEngine settings={profile.sosSettings} onSave={(d: any) => updateSection('sosSettings', d)} />
                    <ContactManager contacts={profile.contacts} onUpdate={(d: any) => updateSection('contacts', d)} />
                </section>
            </div>

            <div className="xl:col-span-4">
                <AIPersonalization profile={profile} onSave={(d: any) => updateSection('aiPersonalization', d)} />
            </div>
        </section>

      </div>
    </main>
  );
}