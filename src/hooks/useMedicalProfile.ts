import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';

export function useMedicalProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. FETCH & SUBSCRIBE: Sync from Firebase in real-time
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "medical_profiles", user.id);
    
    // Using onSnapshot for real-time updates across the app
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        // Initialize an empty profile if none exists
        const emptyProfile = {
          emergencyId: { bloodType: "", allergies: "", chronicDiseases: "", medications: "", criticalNotes: "" },
          contacts: [],
          sosSettings: { autoLocation: true, ambulancePref: "Private", shareDataOnSOS: true },
          aiPersonalization: { age: "", lifestyle: "", riskFactors: "" }
        };
        setProfile(emptyProfile);
      }
      setLoading(false);
    }, (err) => {
      console.error("Ledger Fetch Error:", err);
      setError("Failed to sync neural ledger.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. SAVE: Method to push updates to Firebase
  const saveProfile = useCallback(async (updatedProfile: any) => {
    if (!user?.id) return;
    try {
      const docRef = doc(db, "medical_profiles", user.id);
      await setDoc(docRef, updatedProfile, { merge: true });
    } catch (e) {
      console.error("Ledger Sync Failed:", e);
      throw e;
    }
  }, [user]);

  return { profile, setProfile, saveProfile, loading, error };
}