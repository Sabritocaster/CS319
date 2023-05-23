// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDkSjzHteXcXdIB2alglgcdE4rvYP1o2y0",
  authDomain: "deneme-5b791.firebaseapp.com",
  projectId: "deneme-5b791",
  storageBucket: "deneme-5b791.appspot.com",
  messagingSenderId: "78415815091",
  appId: "1:78415815091:web:ce8d431d72b27d7dc36bc6",
  measurementId: "G-Y4XP40STPS"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(firebase_app)
export const storage = getStorage(firebase_app);

export default firebase_app;