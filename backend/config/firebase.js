// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE1bo6COSu7HHkWMcyEtOq0-Sazz_ooJ4",
  authDomain: "myproj-8d75b.firebaseapp.com",
  projectId: "myproj-8d75b",
  storageBucket: "myproj-8d75b.firebasestorage.app",
  messagingSenderId: "911206682473",
  appId: "1:911206682473:web:d082ff8dc1484ff3fdf7f8",
  measurementId: "G-7VSH1311RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth };