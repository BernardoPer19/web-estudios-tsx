// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTvYd_2eWDoMuxllivErTBQ8VdBtcSQFU",
  authDomain: "web-estudios-cursos.firebaseapp.com",
  projectId: "web-estudios-cursos",
  storageBucket: "web-estudios-cursos.firebasestorage.app",
  messagingSenderId: "945226373860",
  appId: "1:945226373860:web:65ceae176905c020b02af1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
