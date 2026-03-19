import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1IrEVqUmGXvxcOKABDRgef4aQ1uypIm4",
  authDomain: "expense-tracker-da8c8.firebaseapp.com",
  projectId: "expense-tracker-da8c8",
  storageBucket: "expense-tracker-da8c8.firebasestorage.app",
  messagingSenderId: "1034279678281",
  appId: "1:1034279678281:web:8386f6fa78bf5eb3d6ea98",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
