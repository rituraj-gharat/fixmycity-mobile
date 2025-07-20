// utils/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBw5b9_rh4yl6Kk2kP9yIY7On90UZbPVxc",
  authDomain: "fixmycity-ac0d2.firebaseapp.com",
  projectId: "fixmycity-ac0d2",
  storageBucket: "fixmycity-ac0d2.appspot.com",
  messagingSenderId: "821191588666",
  appId: "1:821191588666:web:25cefea825f7a84c1b6e03",
  measurementId: "G-RL6K4STDM1"
};

// ✅ Only use getAuth — DO NOT use initializeAuth in Expo
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
