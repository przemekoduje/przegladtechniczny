// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC079iqi5vJd18ilZe3ZcBTKwOBl5JsztU",
    authDomain: "przegladtechniczny-6b336.firebaseapp.com",
    projectId: "przegladtechniczny-6b336",
    storageBucket: "przegladtechniczny-6b336.firebasestorage.app",
    messagingSenderId: "390111216383",
    appId: "1:390111216383:web:7adf0275431877706042ca",
    measurementId: "G-PKDMDZTKX6"
  };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword };

