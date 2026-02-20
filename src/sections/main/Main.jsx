import React, { useEffect, useState } from "react";
import "./main.scss";
// import Menu from "../../components/Menu/Menu";
import MainFooter from "../../components/MainFooter/MainFooter";
import OrderButton from "../../components/OrderButton/OrderButton";

export default function Main({ user, isPanelOpen, setIsPanelOpen, customCity }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // USUNIĘTO: const [userPhoto, setUserPhoto]... 
  // USUNIĘTO: useEffect od userPhoto...
  // Dlaczego? Bo OrderButton sam sobie poradzi, jeśli dostanie null.

  let scrollTimeout;

  const titleText = customCity
    ? `Przeglądy Budowlane ${customCity}`
    : "Przeglądy Budowlane Śląsk";

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop + 10) {
      setIsVisible(false);
    } else if (scrollTop < lastScrollTop) {
      setIsVisible(true);
    }

    setLastScrollTop(scrollTop);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-bg-image"></div>
      <div className="mask-window"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="service-name">Przeglądy Budowlane</span>
          <span className="city-name">{customCity || "Śląsk"}</span>
        </h1>

        {/* --- POPRAWIONA SEKCJA BUTTONA --- */}
        <OrderButton
          text="Zamów przegląd"
          userAvatar={user?.photoURL}
          onClick={scrollToInspectionForm}
        />
        {/* ---------------------------------- */}

      </div>

      <div className="main-footer">
        <MainFooter />
      </div>
    </div>
  );
}