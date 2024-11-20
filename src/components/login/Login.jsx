import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

const Login = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } catch (error) {
      alert("Błąd logowania przez Google: " + error.message);
    }
  };
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } catch (error) {
      alert("Błąd logowania przez Facebook: " + error.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    } catch (error) {
      alert("Błąd logowania: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Zaloguj się</h2>
      <button onClick={handleGoogleLogin}>Logowanie przez Google</button>
      <button onClick={handleFacebookLogin}>Logowanie przez Facebook</button>
      <div>
        <input type="email" placeholder="Email" id="email" />
        <input type="password" placeholder="Hasło" id="password" />
        <button onClick={() => handleEmailLogin(document.getElementById("email").value, document.getElementById("password").value)}>
          Logowanie przez Email
        </button>
      </div>
    </div>
  );
};

export default Login;
