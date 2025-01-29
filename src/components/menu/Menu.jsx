import React, { useEffect, useState } from "react";
import "./menu.scss";
import Panel from "../panel/Panel";
import { auth, onAuthStateChanged } from "../../firebase";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Menu({ isPanelOpen, setIsPanelOpen }) {
  // const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Funkcja nasłuchująca zmiany stanu logowania
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Ustawienie użytkownika, jeśli jest zalogowany
    });

    return () => unsubscribe(); // Sprzątanie nasłuchiwacza przy odmontowaniu
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  // Funkcja do przejścia do przewodnika
  const goToGuide = () => {
    navigate("/przewodnik"); // Przejście do ścieżki /przewodnik
  };

  // Dane użytkownika
  const userName = user?.displayName || "Użytkownik";
  const userPhoto = user?.photoURL || "images/default-profile.jpg";

  return (
    <>
      <Panel
        isOpen={isPanelOpen}
        setIsOpen={setIsPanelOpen}
        user={user}
        isLoggedIn={!!user} // Czy użytkownik jest zalogowany
        userName={userName}
        userPhoto={userPhoto}
      />
      {/* {isLoggedIn && <Panel isOpen={isPanelOpen} />} */}
      <div className="menu">
        
        <div className="logo" onClick={() => navigate("/")}>
          <span>przeglad.online</span>
        </div>
        <button className="przewodnik" onClick={goToGuide}>
          PRZEWODNIK_temp
        </button>
        <div className="menu-burger" onClick={togglePanel}>
          {isPanelOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </>
  );
}
