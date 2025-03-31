import React, { useState } from "react";
import "./przegladW.scss";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/menu/Menu";

const PrzegladW = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      
      <section className="przeglad-wentylacyjny">
        <div className="container">
          <div className="left">
            <h1>Przegląd instalacji wentylacyjnej</h1>
            <p className="description">
              Sprawna wentylacja to nie tylko komfort, ale przede wszystkim zdrowie domowników. Zgodnie z przepisami należy wykonywać regularne przeglądy instalacji wentylacyjnej – zadbaj o to z naszą pomocą.
            </p>

            <button className="cta">
              ZAMÓW BEZPŁATNĄ WYCENĘ <PersonIcon />
            </button>

            <div className="steps">
              <p>Cały proces w kilku prostych krokach:</p>
              <ol>
                <li>
                  Wypełnij formularz i prześlij nam zgłoszenie – to zajmie tylko chwilę.
                </li>
                <li>
                  W krótkim czasie wrócimy z propozycją terminu i wyceną.
                </li>
                <li>
                  Zrealizujemy przegląd wentylacji zgodnie z przepisami.
                </li>
                <li>
                  Po wszystkim otrzymasz dokumentację do wglądu i rozliczenia.
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

export default PrzegladW;
