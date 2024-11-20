import React, { useEffect, useState } from "react";
import "./panel.scss";
import { auth, signOut } from "../../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
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



  // useEffect(() => {
  //   const fetchUserData = () => {
  //     const currentUser = auth.currentUser;
  //     if (currentUser) {
  //       setUserName(currentUser.displayName || "Użytkownik");
  //       setUserPhoto(currentUser.photoURL || "images/default-profile.jpg");

  //       // Aktualizuj zawartość koszyka z `localStorage`
  //       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //       setUserData(savedCart);
  //     }
  //   };

  //   if (isOpen) {
  //     fetchUserData();
  //   }
  // }, [isOpen]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(userCartRef);
        const userCart = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .find(cart => cart.userId === user.uid);
  
        if (userCart) {
          setUserData(userCart.cart);
        }
      }
    };
  
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen, user]);


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
                userData.map((item, index) => (
                  <button key={index} className="reminder-btn">
                    <div className="texts">
                      <span className="type">{item.type.toUpperCase()}</span>
                      <span className="adress">{item.address}</span>
                    </div>
                    <div className="date-btn">
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </button>
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
