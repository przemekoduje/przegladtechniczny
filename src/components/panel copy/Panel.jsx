import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
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
  const [isAdmin, setIsAdmin] = useState(false);
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

  const goToGuide = () => {
    navigate("/przewodnik"); // Przejście do ścieżki /przewodnik
  };

  // Sprawdzamy w Firestore, czy user jest w kolekcji admins
  useEffect(() => {
    const checkIfAdmin = async () => {
      if (user) {
        const adminsRef = collection(db, "admins");
        const q = query(
          adminsRef,
          where("email", "==", user.email),
          where("isActive", "==", true)
        );
        const querySnapshot = await getDocs(q);

        // Jeśli zapytanie zwraca dokument, to znaczy że user jest adminem
        if (!querySnapshot.empty) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkIfAdmin();
  }, [user]);

  // Pobieranie wpisów z userCarts
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

  const showTooltip = (event, id) => {
    // Jeśli tooltip dla tego elementu już jest aktywny, zamknij go
    if (activeMenu?.id === id) {
      setActiveMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect(); // Pobierz współrzędne przycisku

    setActiveMenu({
      id,
      position: {
        top: rect.bottom + window.scrollY, // Pozycja względem strony
        left: rect.left + window.scrollX,
      },
    });
  };

  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      <div className="left-panel">
        <div className="panel-menu">
          <button className="przewodnik" onClick={goToGuide}>
            PRZEWODNIK
          </button>

          {/* Pokazuj "BlogAdmin" i "Dashboard" tylko adminom */}
          {isAdmin && (
            <>
              <div className="blog" onClick={() => navigate("/admin")}>
                BlogAdmin
              </div>
              <div className="blog" onClick={() => navigate("/adminDashboard")}>
                Dashboard
              </div>
            </>
          )}
          
          
          <div className="blog" style={{cursor: "pointer"}} onClick={() => navigate("/BlogDB")}>
            Blog
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
        {user ? (
          <>
            {/* Nagłówek użytkownika */}
            <div className="head-account">
              {userPhoto ? (
                <img src={userPhoto || "images/user-50.png"} alt="Profil" />
              ) : (
                <img src="images/user-50.png" alt="Profil Domyślny" />
              )}
              <h3>
                Witaj, <br />
                {userName}
              </h3>
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
                          onClick={(event) => showTooltip(event, item.id)}
                        >
                          <MoreVertIcon />
                        </button>

                        {/* Tooltip przeniesiony do portalu */}
                        {activeMenu?.id === item.id &&
                          ReactDOM.createPortal(
                            <div
                              className="menu-tooltip"
                              style={{
                                position: "absolute",
                                top: `${activeMenu.position.top}px`,
                                left: `${activeMenu.position.left + 20}px`,
                              }}
                            >
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
                            </div>,
                            document.body // Portal przenosi menu-tooltip poza ograniczenia
                          )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nie masz zapisanych przeglądów.</p>
              )}
            </div>

            {/* Przycisk wylogowania */}
            <button className="main_button" onClick={handleLogout}>
              Wyloguj się
            </button>
          </>
        ) : (
          <>
            {/* Widok dla niezalogowanego użytkownika */}
            <h3>
              <span style={{ fontSize: "30px" }}>
                panel użytkownika <br />
              </span>
              <span style={{ fontSize: "16px" }}>
                tylko z dobrymi wiadomościami
              </span>
            </h3>
            <button
              className="main_button"
              onClick={() => (window.location.href = "/login")}
            >
              Zaloguj się
            </button>
          </>
        )}
      </div>

      {/* <div className="right-panel">
        <img src="images/panel-right.png" alt="" />
      </div> */}
    </div>
  );
}
