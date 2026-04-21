// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ADD THIS IMPORT

// Your existing config
const firebaseConfig = {
  apiKey: "AIzaSyDvK1pWcav8XPYPWxtpHWyyl_AL60FsZkI",
  authDomain: "entertain-hub-c0550.firebaseapp.com",
  projectId: "entertain-hub-c0550",
  storageBucket: "entertain-hub-c0550.firebasestorage.app",
  messagingSenderId: "1088042830816",
  appId: "1:1088042830816:web:a7b8b3ffb835b0ebdbb985",
  measurementId: "G-ZKH53PJZ2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);