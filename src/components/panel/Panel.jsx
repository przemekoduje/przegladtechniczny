import React, { useEffect, useState } from "react";
import "./panel.scss";
import { auth, signOut } from "../../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Panel({ isOpen, user }) {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("images/default-profile.jpg");
  const [userData, setUserData] = useState([]);
  const [cart, setCart] = useState([]); // Dane z serwera
  const [activeMenu, setActiveMenu] = useState(null); // Śledzenie aktywnego dymka

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
        const snapshot = await getDocs(
          query(userCartRef, where("userId", "==", user.uid))
        );

        const userCart = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCart(userCart); // Dane serwerowe w `cart`
      }
    };

    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen, user]);

  // Funkcja usuwania wpisu
  const handleDelete = async (id) => {
    // Weryfikacja przed usunięciem
    const confirmation = window.confirm("Czy na pewno chcesz usunąć ten wpis?");
    if (!confirmation) {
      return;
    }

    try {
      // Usunięcie wpisu z bazy danych
      await deleteDoc(doc(db, "userCarts", id));

      // Usunięcie wpisu ze stanu `cart`
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));

      alert("Wpis został usunięty.");
    } catch (error) {
      console.error("Błąd podczas usuwania wpisu:", error);
      alert("Nie udało się usunąć wpisu.");
    }
  };
  const proposeNewDate = (id) => {
    alert(`Zaproponowanie nowej daty dla wpisu o ID: ${id}`);
    // Logika dla proponowania nowej daty zostanie dodana później
  };


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
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="reminder-btn">
                    <div className="date-btn">
                      <span>
                        {new Date(
                          item.timestamp?.seconds * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="texts">
                      <span className="type">{item.type}</span>
                      <span className="adress">{item.address}</span>
                    </div>

                    {/* Dots Button */}
                    <div className="dots-wrapper">
                      <button
                        className="dots-btn"
                        onClick={() =>
                          setActiveMenu((prev) => (prev === item.id ? null : item.id))
                        }
                      >
                        <MoreVertIcon />
                      </button>

                      {/* Dymek z opcjami */}
                      {activeMenu === item.id && (
                        <div className="menu-tooltip">
                          <button
                            className="tooltip-option"
                            onClick={() => {
                              handleDelete(item.id);
                              setActiveMenu(null); // Zamknij dymek
                            }}
                          >
                            Usuń
                          </button>
                          <button
                            className="tooltip-option"
                            onClick={() => {
                              proposeNewDate(item.id);
                              setActiveMenu(null); // Zamknij dymek
                            }}
                          >
                            Zaproponuj nową datę
                          </button>
                        </div>
                      )}
                    </div>
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
