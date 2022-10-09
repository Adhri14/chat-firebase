import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyl-etB_dPho8H0rC7t5riQPKRrlEBORU",
  authDomain: "chatappfirebase-db0b7.firebaseapp.com",
  projectId: "chatappfirebase-db0b7",
  storageBucket: "chatappfirebase-db0b7.appspot.com",
  messagingSenderId: "260811343438",
  appId: "1:260811343438:web:20797a407a98f6f45aa51f",
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
