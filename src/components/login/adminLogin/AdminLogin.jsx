import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase Auth: Logowanie użytkownika
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore: Sprawdzenie uprawnień admina
      const adminsRef = collection(db, "admins");
      const q = query(adminsRef, where("email", "==", user.email), where("isActive", "==", true));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Brak uprawnień do logowania.");
      }

      // Przekierowanie do Admin Dashboard
      navigate("/adminDashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Logowanie</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default AdminLogin;
