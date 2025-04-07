import React, { useEffect, useState } from "react";
import "./main.scss";
import Menu from "../../components/menu/Menu";
import MainFooter from "../../components/main-footer/MainFooter";
import Person2Icon from "@mui/icons-material/Person2";
// import { auth, signOut } from "../../firebase.js";

export default function Main({ user, isPanelOpen, setIsPanelOpen }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");
  

  let scrollTimeout;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Jeśli użytkownik przesuwa stronę w górę o więcej niż 80px
    if (scrollTop > lastScrollTop + 10) {
      setIsVisible(false);
    } else if (scrollTop < lastScrollTop) {
      setIsVisible(true);
    }

    // Aktualizujemy wartość ostatniego przesunięcia
    setLastScrollTop(scrollTop);

    // Resetujemy timeout, aby opóźnić pojawienie się elementu po zatrzymaniu scrollowania
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Opóźnienie 300ms
  };

  useEffect(() => {
    // Dodajemy nasłuchiwanie zdarzenia scroll
    window.addEventListener("scroll", handleScroll);

    // Sprzątanie: usuwamy nasłuchiwanie przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const updateMenuWidth = () => {
    const parentWidth = document.querySelector(".main").offsetWidth;
    const menuSection = document.querySelector(".menu-section");

    if (menuSection) {
      menuSection.style.width = `${parentWidth}px`;
    }
  };

  // Używamy useEffect, aby dodać event listener na resize
  useEffect(() => {
    updateMenuWidth(); // Ustaw szerokość początkową

    // Dodajemy nasłuchiwanie na zmianę rozmiaru okna
    window.addEventListener("resize", updateMenuWidth);

    // Sprzątanie: usuwamy nasłuchiwanie przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("resize", updateMenuWidth);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="main">
      <div className="bg_text_button">
        <div className="text_button">
          <h1 className="display01">
            <span className="little">Obowiązkowe</span> <br />
            <span>Przeglądy </span><br />
            <span>Techniczne</span> <br/>
            <span>Budynku</span>
          </h1>
          <button className="main_button" onClick={scrollToInspectionForm}>
            <span>KONTYNUUJ</span>
            <div className="btn-icon">
              <img src={userPhoto} alt="Profil" />
            </div>
          </button>
        </div>
      </div>
      <div className="main-footer">
        <MainFooter />
      </div>
    </div>
  );
}
