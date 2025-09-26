
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtrjr9vCUNjRi9vcjoST6NQi1pu3myQ4s",
  authDomain: "todo-app-541f3.firebaseapp.com",
  projectId: "todo-app-541f3",
  storageBucket: "todo-app-541f3.appspot.com", // 👈 fixed `.app` to `.appspot.com`
  messagingSenderId: "861991327437",
  appId: "1:861991327437:web:08ba5cf64335458a7abb84",
  measurementId: "G-R1G4ZDVQQ1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Google Sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
};
