import React from 'react';
import { Scale, Info } from 'lucide-react';
import './WhyImportant.scss';
import insuranceIcon from '../../assets/why-insurance.png';
import lawIcon from '../../assets/why-law.png';

const WhyImportant = ({ customCity }) => {
  return (
    <section className="why-important-section">
      <div className="why-container">

        {/* Nagłówek sekcji */}
        <div className="why-header">
          <h2 className="why-title">Dlaczego przegląd{customCity ? ` w ${customCity}` : ""} jest <span className="highlight">kluczowy?</span></h2>
          <p className="why-subtitle">
            To nie tylko formalność. To bezpieczeństwo Twoich finansów i spełnienie wymogu prawnego.
          </p>
        </div>

        <div className="why-grid">

          {/* KARTA 1: UBEZPIECZENIE (Pieniądze) */}
          <div className="why-card insurance-card">
            <div className="icon-wrapper alert">
              <img src={insuranceIcon} alt="Ubezpieczenie" className="why-icon-img" />
            </div>
            <h3>Polisa Ubezpieczeniowa</h3>
            <p className="main-text">
              Czy wiesz, że Towarzystwo Ubezpieczeń może <strong>odmówić wypłaty odszkodowania</strong> lub drastycznie je obniżyć, jeśli szkoda (np. pożar, zalanie) powstała w wyniku wadliwej instalacji, a Ty nie masz ważnego przeglądu?
            </p>

            <div className="legal-quote">
              <Info size={16} className="quote-icon" />
              <div>
                <span className="quote-label">Typowy zapis w OWU:</span>
                <p>"Ubezpieczony obowiązany jest do utrzymania i użytkowania budynku zgodnie z przepisami Prawa Budowlanego."</p>
              </div>
            </div>
          </div>

          {/* KARTA 2: PRAWO (Art. 62) */}
          <div className="why-card law-card">
            <div className="icon-wrapper legal">
              <img src={lawIcon} alt="prawo" className="why-icon-img" />
            </div>
            <h3>Art. 62 Prawa Budowlanego</h3>
            <p className="main-text">
              Obowiązek wykonywania przeglądów okresowych wynika wprost z ustawy. Dotyczy on <strong>każdego</strong> właściciela domu jednorodzinnego, a nie tylko firm czy spółdzielni.
            </p>

            <ul className="legal-list">
              <li>
                <strong>Co roku:</strong> Kontrola instalacji gazowej i przewodów kominowych (wentylacja, dymowe, spalinowe).
              </li>
              <li>
                <strong>Co 5 lat:</strong> Kompleksowe sprawdzenie stanu technicznego i przydatności do użytkowania całego obiektu oraz instalacji elektrycznej.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyImportant;