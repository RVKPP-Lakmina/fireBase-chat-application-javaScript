import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-application-abe1e.firebaseapp.com",
  projectId: "react-chat-application-abe1e",
  storageBucket: "react-chat-application-abe1e.appspot.com",
  messagingSenderId: "252825240149",
  appId: "1:252825240149:web:8dee062279f1644b4a0adc",
  measurementId: "G-33JCW7PRZK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const store = getFirestore();
export const storage = getStorage();