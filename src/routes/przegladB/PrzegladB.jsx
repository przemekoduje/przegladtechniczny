import React, { useState } from "react";
import "./przegladB.scss"; // stylizacja w osobnym pliku
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/menu/Menu";

const PrzegladB = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <section className="przeglad-budowlany">
        
        <div className="container">
          <div className="left">
            <h1>Przegląd budowlany</h1>
            <p className="description">
              Zgodnie z art. 62 ustawy Prawo budowlane, okresowy przegląd
              budowlany nieruchomości jest obowiązkowy. Skorzystaj z naszej
              kompleksowej usługi przeglądów i nie ryzykuj problemów z wypłatą
              odszkodowania przez ubezpieczyciela.
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
            {/* Można tu osadzić grafikę, animację, wideo lub mapę */}
            <div className="placeholder" />
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladB;
