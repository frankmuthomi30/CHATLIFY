import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDX9Li1vPNdgcDS8e39RbRatSfLQvnWJAo",
  authDomain: "coffee-bf1ed.firebaseapp.com",
  databaseURL: "https://coffee-bf1ed-default-rtdb.firebaseio.com",
  projectId: "coffee-bf1ed",
  storageBucket: "coffee-bf1ed.firebasestorage.app",
  messagingSenderId: "982863094946",
  appId: "1:982863094946:web:0de7ba198cc7e733ce63fb",
  measurementId: "G-0SPKY4LVJ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with local persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();