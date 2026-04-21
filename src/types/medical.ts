export interface MedicalProfile {
    personalInfo: {
      fullName: string;
      dateOfBirth: string;
      gender: string;
      profilePhoto?: string;
      phone?: string;
      email?: string;
    };
  
    emergencyId: {
      bloodType: string;
      allergies: string[];
      chronicDiseases: string[];
      medications: string[];
      surgicalHistory: string[];
      criticalNotes: string;
      organDonor?: boolean;
    };
  
    vitals: {
      height: number;
      weight: number;
      bmi?: number;
      heartRate?: number;
      bloodPressure?: string;
      oxygenLevel?: number;
      lastUpdated?: string;
    };
  
    contacts: {
      name: string;
      relation: string;
      phone: string;
      email?: string;
      isPrimary?: boolean;
    }[];
  
    sosSettings: {
      autoLocation: boolean;
      sendMedicalData: boolean;
      alertContacts: boolean;
      autoCallAmbulance: boolean;
      ambulancePref: 'Govt' | 'Private' | 'Any';
    };
  
    locationSettings: {
      liveTracking: boolean;
      lastKnownLocation?: string;
      geoFenceAlerts?: boolean;
    };
  
    medicalPreferences: {
      preferredHospitals: string[];
      preferredDoctors?: string[];
      insuranceProvider?: string;
      policyNumber?: string;
    };
  
    labRecords: {
      testName: string;
      category?: 'Blood' | 'Scan' | 'Urine' | 'Other';
      date: string;
      resultSummary?: string;
      reportUrl?: string;
      abnormal?: boolean;
    }[];
  
    prescriptions: {
      doctorName: string;
      date: string;
      medicines: {
        name: string;
        dosage: string;
        duration: string;
      }[];
    }[];
  
    vaccinations: {
      vaccineName: string;
      date: string;
      nextDue?: string;
    }[];
  
    medicalHistory: {
      condition: string;
      diagnosedDate?: string;
      status?: 'Ongoing' | 'Recovered';
    }[];
  
    aiPersonalization: {
      age: number;
      weight: number;
      height: number;
      riskFactors: string[];
      lifestyle?: 'Sedentary' | 'Moderate' | 'Active';
    };
  
    wearableData?: {
      steps?: number;
      caloriesBurned?: number;
      sleepHours?: number;
      syncedAt?: string;
    };
  
    emergencyLogs: {
      date: string;
      type: 'SOS' | 'Hospital Visit' | 'Alert';
      location?: string;
      notes?: string;
    }[];
  
    documents: {
      name: string;
      type: 'Report' | 'Prescription' | 'ID';
      fileUrl: string;
      uploadedAt: string;
    }[];
  
    accessibility: {
      disabilities?: string[];
      specialNeeds?: string[];
    };
  
    deviceInfo?: {
      deviceId?: string;
      lastActive: string;
      batteryLevel?: number;
    };
  
    privacy: {
      shareDataInEmergency: boolean;
      allowAIAccess: boolean;
      allowLocationTracking: boolean;
    };
  
    audit: {
      createdAt: string;
      updatedAt: string;
    };
  }