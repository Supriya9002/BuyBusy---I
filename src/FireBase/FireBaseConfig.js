
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXH11Aw0C-7DDlvkicI6Pos1ddicWekOI",
  authDomain: "busybuy-5bff0.firebaseapp.com",
  projectId: "busybuy-5bff0",
  storageBucket: "busybuy-5bff0.appspot.com",
  messagingSenderId: "309651652567",
  appId: "1:309651652567:web:7b04c3eef9113028525592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
