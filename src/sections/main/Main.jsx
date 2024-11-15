import React, { useEffect, useState } from "react";
import "./main.scss";
import Menu from "../../components/menu/Menu";
import MainFooter from "../../components/main-footer/MainFooter";
import Person2Icon from "@mui/icons-material/Person2";
import Panel from "../../components/panel/Panel";

export default function Main() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    // const [isPanelOpen, setIsPanelOpen] = useState(false);
    let scrollTimeout;
  
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      console.log(scrollTop )
  
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

//   // Funkcja obsługująca kliknięcie burgera
//   const togglePanel = () => {
//     setIsPanelOpen(!isPanelOpen);
//   };

  

  return (
    <div className="main">
        {/* <Panel isOpen={isPanelOpen}/> */}
      <div className={`menu-section ${isVisible ? "visible" : "hidden"}`}>
        <Menu/>
      </div>
      <div className="bg_text_button">
        <div className="text_button">
          <h1 className="display01">
            <span style={{ fontSize: "48px" }}>Przeglądy</span> <br />
            techniczne <br />
            nieruchomości
          </h1>
          <button className="main_button">
            <span>KONTYNUUJ</span>
            <div className="btn-icon">
              <Person2Icon />
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
