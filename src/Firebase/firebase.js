// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBGyyVl77SIRW7eOuauPTJ45-lJ9H49WTY",
  authDomain: "eshop-8bae2.firebaseapp.com",
  projectId: "eshop-8bae2",
  storageBucket: "eshop-8bae2.appspot.com",
  messagingSenderId: "95036158252",
  appId: "1:95036158252:web:af09000e3a58dad5a1bc89",
  measurementId: "G-0LPQB2FX2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
