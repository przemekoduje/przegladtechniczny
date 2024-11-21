import React, { useEffect, useState } from "react";
import "./panel.scss";
import { auth, signOut } from "../../firebase.js";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


export default function Panel({ isOpen, user }) {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("images/default-profile.jpg");
  const [userData, setUserData] = useState([]);

  // Funkcja wylogowania
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };



  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(userCartRef);
        
        // Pobieranie wszystkich dokumentów użytkownika
        const userCart = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((cart) => cart.userId === user.uid);

          console.log(userCart)

        
        if (userCart.length > 0) {
          // Aktualizacja stanu z listą koszyków
          setUserData(userCart.map((cart) => cart.cart).flat());
        } else {
          setUserData([]);
        }
      }
    };

    console.log("Dane użytkownika:", userData);
  
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen, user]);

  // Funkcja usuwania wpisu
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "userCarts", id));
      setUserData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Wpis został usunięty.");
    } catch (error) {
      console.error("Błąd podczas usuwania wpisu:", error);
      alert("Nie udało się usunąć wpisu.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || "Użytkownik");
      setUserPhoto(user.photoURL || "images/default-profile.jpg");
    }
  }, [user]);

  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      <div className="left-panel">
        {user ? (
          <>
            {/* Nagłówek użytkownika */}
            <div className="head-account">
              <img src={userPhoto} alt="Profil" />
              <h3>Witaj, {userName}</h3>
            </div>

            {/* Przeglądy z formularza */}
            <div className="reminder-buttons">
            {userData.length > 0 ? (
                userData.map((item) => (
                  <div key={item.id} className="reminder-btn">
                    <div className="texts">
                      <span className="type">{item.type?.toUpperCase()}</span>
                      <span className="adress">{item.address}</span>
                    </div>
                    <div className="date-btn">
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                     x
                    </button>
                  </div>
                ))
              ) : (
                <p>Brak zapisanych przeglądów.</p>
              )}
            </div>

            {/* Przycisk wylogowania */}
            <button className="logout-btn" onClick={handleLogout}>
              Wyloguj się
            </button>
          </>
        ) : (
          <>
            {/* Widok dla niezalogowanego użytkownika */}
            <h3>Zaloguj się, aby zobaczyć swoje dane</h3>
            <button
              className="login-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Zaloguj się
            </button>
          </>
        )}
      </div>

      <div className="right-panel">
        <img src="images/panel-right.png" alt="" />
      </div>
    </div>
  );
}
