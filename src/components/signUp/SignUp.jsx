import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Hasła nie są zgodne.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
      navigate("/login");
    } catch (error) {
      alert("Błąd rejestracji: " + error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="img-left">
        <img src="/images/login_background.png" alt="" />
      </div>
      <div className="sign-up-page">
      <div className="arrowBack" onClick={() => navigate("/")}>
          <ArrowBackIcon style={{ fontSize: "36px" }} />
        </div>
        <h2>Zarejestruj się </h2>

        <div className="signup-email">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button 
          className="main_button"
          onClick={handleSignUp}>Zarejestruj się</button>
        </div>

        <p className="signup-login">
          Masz już konto?{" "}
          <button onClick={() => navigate("/login")}>Zaloguj się</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
