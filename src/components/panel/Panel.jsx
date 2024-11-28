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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Person2Icon from "@mui/icons-material/Person2";
import { useNavigate } from "react-router-dom";

export default function Panel({ isOpen, setIsOpen, user }) {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("images/default-profile.jpg");
  const [cart, setCart] = useState([]); // Dane z serwera
  const [activeMenu, setActiveMenu] = useState(null); // Śledzenie aktywnego dymka
  const navigate = useNavigate();



  const handleClosePanel = () => {
    setIsOpen(false);
  };

  const handleCloseAndNavigate = (action) => {
    // Zamknij panel
    setIsOpen(false);

    // Poczekaj na animację zamykania panelu (jeśli jest)
    setTimeout(() => {
      if (typeof action === "function") {
        action(); // Wykonaj przesunięcie lub nawigację
      }
    }, 300); // Dopasuj czas do czasu animacji zamykania panelu
  };

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
    const confirmation = window.confirm("Czy na pewno chcesz usunąć ten wpis?");
    if (!confirmation) {
      return;
    }

    try {
      await deleteDoc(doc(db, "userCarts", id));
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

  const getStatus = (item) => {
    return item.scheduledDate
      ? "ustalony termin przeglądu"
      : "wysłano zapytanie";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return { day, month, year };
  };

  useEffect(() => {
    console.log("User data:", user);
    if (user) {
      const emailName = user.email
        ? user.email.split("@")[0]
        : "Nieznany użytkownik";
      setUserName(user.displayName || emailName);
      setUserPhoto(user.photoURL || null); // Ustaw null, jeśli brak photoURL
    }
  }, [user]);

  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
     

      <div className="left-panel">
        {user ? (
          <>
            {/* Nagłówek użytkownika */}
            <div className="head-account">
              {userPhoto ? (
                <img src={userPhoto} alt="Profil" />
              ) : (
                <Person2Icon style={{ fontSize: 48 }} /> // Wyświetl ikonę, jeśli brak zdjęcia
              )}
              <h3>Witaj, {userName}</h3>
            </div>

            {/* Przeglądy z formularza */}
            <div className="reminder-buttons">
              {cart.length > 0 ? (
                cart.map((item) => {
                  const date =
                    item.scheduledDate ||
                    (item.timestamp?.seconds
                      ? new Date(item.timestamp.seconds * 1000).toISOString()
                      : null);
                  const formattedDate = formatDate(date);

                  return (
                    <div key={item.id} className="reminder-btn">
                      <div className="date-btn">
                        {formattedDate ? (
                          <>
                            <span>{`${formattedDate.day}.${formattedDate.month}`}</span>
                            <span>{formattedDate.year}</span>
                          </>
                        ) : (
                          <span>Brak daty</span>
                        )}
                      </div>

                      <div className="texts">
                        <span className="type">{item.type}</span>
                        <span className="adress">{item.address}</span>
                        <span className="status">
                          Status: {getStatus(item)}
                        </span>
                      </div>

                      {/* Dots Button */}
                      <div className="dots-wrapper">
                        <button
                          className="dots-btn"
                          onClick={() =>
                            setActiveMenu((prev) =>
                              prev === item.id ? null : item.id
                            )
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
                  );
                })
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
        <div className="panel-menu">
          <div className="admin" onClick={() => navigate("/adminDashboard")}>
            Dashboard
          </div>
          <div
            className="faq"
            onClick={() =>
              handleCloseAndNavigate(() => {
                const faqSection = document.getElementById("faq-section");
                if (faqSection) {
                  faqSection.scrollIntoView({ behavior: "smooth" });
                }
              })
            }
          >
            FAQ
          </div>
        </div>

        <img src="images/panel-right.png" alt="" />
      </div>
    </div>
  );
}
