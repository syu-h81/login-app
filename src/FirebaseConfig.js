import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC599-74vpAJ0zkOT1u59b3-SMTRfpPFU8",
  authDomain: "ts-login-app-2c1e3.firebaseapp.com",
  projectId: "ts-login-app-2c1e3",
  storageBucket: "ts-login-app-2c1e3.appspot.com",
  messagingSenderId: "75880309048",
  appId: "1:75880309048:web:0d8cd1e9465d1eb28ae1cd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);