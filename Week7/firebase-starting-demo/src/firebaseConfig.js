// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw4NJewtV2O_P2GUko8NPYjOOAoF9rCPE",
  authDomain: "week7-demo-2ff93.firebaseapp.com",
  projectId: "week7-demo-2ff93",
  storageBucket: "week7-demo-2ff93.firebasestorage.app",
  messagingSenderId: "209861129670",
  appId: "1:209861129670:web:412c3d1c3e6ab3ecb8aec7",
  measurementId: "G-C4WL51GCC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();