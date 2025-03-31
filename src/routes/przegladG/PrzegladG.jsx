import React, { useState } from "react";
import "./przegladG.scss"; // Używamy ten sam SCSS
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/menu/Menu";

const PrzegladG = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      
      <section className="przeglad-gazowy">
        <div className="container">
          <div className="left">
            <h1>Przegląd instalacji gazowej</h1>
            <p className="description">
              Zgodnie z art. 62 ustawy Prawo budowlane regularny przegląd
              instalacji gazowej jest obowiązkiem każdego właściciela
              nieruchomości. Skorzystaj z naszego kompleksowego przeglądu
              instalacji gazowej i zadbaj o bezpieczeństwo swoje oraz bliskich.
            </p>

            <button className="cta">
              ZAMÓW BEZPŁATNĄ WYCENĘ <PersonIcon />
            </button>

            <div className="steps">
              <p>Cały proces w kilku prostych krokach:</p>
              <ol>
                <li>
                  Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                  naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                  asystentka chętnie pomoże.
                </li>
                <li>
                  Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                </li>
                <li>
                  Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                  przeglądu.
                </li>
                <li>
                  Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                  łatwo rozliczysz się z wykonawcą.
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

export default PrzegladG;
