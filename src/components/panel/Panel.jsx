import React from "react";
import "./panel.scss";
import { useNavigate } from "react-router-dom";

export default function Panel({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleClosePanel = () => {
    setIsOpen(false);
  };

  const goTo = (path) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 300);
  };

  const scrollToSection = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      <div className="left-panel">
        <div className="top">
          <button
            className="wycena"
            onClick={() => scrollToSection("inspection-form")}
          >
            Zamów bezpłatną wycenę
          </button>

          <div className="menu-list">
            <p onClick={() => goTo("/przeglad-budowlany")}>
              Przegląd budowlany
            </p>
            <p onClick={() => goTo("/przeglad-gazowy")}>
              Przegląd instalacji gazowej
            </p>
            <p onClick={() => goTo("/przeglad-elektryczny")}>
              Przegląd instalacji elektrycznej
            </p>
            <p onClick={() => goTo("/przeglad-wentylacyjny")}>
              Przegląd instalacji wentylacyjnej
            </p>
          </div>
        </div>

        <div className="middle">
          <p onClick={() => goTo("/BlogDB")}>Blog</p>
          <p onClick={() => scrollToSection("faq-section")}>FAQ</p>
          <p onClick={() => goTo("/dashboard")}>Panel Klienta</p>
        </div>

        <button className="przewodnik" onClick={() => goTo("/przewodnik")}>
          PRZEWODNIK
          <span className="podpis">
            <br />
            samodzielnej oceny stanu technicznego budynku
          </span>
        </button>
      </div>
    </div>
  );
}
