import React, { useState } from "react";
import "./przegladE.scss";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/menu/Menu";

const PrzegladE = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      
      <section className="przeglad-elektryczny">
        <div className="container">
          <div className="left">
            <h1>Przegląd instalacji elektrycznej</h1>
            <p className="description">
              Przegląd instalacji elektrycznej to obowiązek wynikający z przepisów prawa budowlanego, ale także gwarancja Twojego bezpieczeństwa. Zleć go naszym specjalistom, by mieć pewność, że instalacja działa sprawnie i bezpiecznie.
            </p>

            <button className="cta">
              ZAMÓW BEZPŁATNĄ WYCENĘ <PersonIcon />
            </button>

            <div className="steps">
              <p>Cały proces w kilku prostych krokach:</p>
              <ol>
                <li>
                  Wypełnij prosty formularz i wyślij zapytanie do naszych specjalistów.
                </li>
                <li>
                  Otrzymasz szybką odpowiedź z możliwymi terminami realizacji.
                </li>
                <li>
                  Wspólnie ustalimy dogodny termin i przygotujemy ofertę.
                </li>
                <li>
                  Po przeglądzie otrzymasz dokumentację zgodną z wymaganiami prawa.
                </li>
              </ol>
            </div>
          </div>

          <div className="right">
            <div className="placeholder" />
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladE;
