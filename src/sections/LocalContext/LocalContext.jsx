import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import iconMining from "../../assets/mining-risk-icon.png";
import iconStarowka from "../../assets/risk-icon-starówka.png";
import iconZielone from "../../assets/risk-icon-zielone.png";
import "./localContext.scss";
import SilesiaMapGL from "../../components/SilesiaMapGL/SilesiaMapGL";

// WAŻNE:
// 1. Umieść swój film (np. gliwice_drone.mp4) w folderze: public/videos/
// 2. Podmień ścieżkę w parametrze videoSrc poniżej.

const LocalContext = ({
  city = "Gliwice",

  description = "Gliwice to poligon budowlany o dwóch twarzach. Z jednej strony historyczne Zatorze i Śródmieście z wymagającymi drewnianymi stropami. Z drugiej – dynamiczne nowe osiedla, gdzie pośpiech deweloperów często odbija się na izolacji. Znamy specyfikę każdej dzielnicy.",

  risks = [
    {
      icon: iconStarowka,
      title: "Poniemieckie Kamienice",
      description:
        "Specjalizujemy się w ocenie drewnianych stropów i zawilgoconych piwnic in budynkach z cegły (Zatorze, Centrum).",
    },
    {
      icon: iconMining,
      title: "Szkody Górnicze",
      description:
        "Mimo zamknięcia wielu kopalń, dzielnice jak Sośnica czy Łabędy wciąż wymagają weryfikacji wychyleń budynku.",
    },
    {
      icon: iconZielone,
      title: "Wilgoć i Drenaż",
      description:
        "Gliwice leżą na ciężkich gruntach gliniastych. Sprawdzamy czy deweloper wykonał poprawny drenaż opaskowy.",
    },
  ],

  // Zmień ten link na ścieżkę do Twojego pliku, np. "/videos/gliwice-intro.mp4"
  // Na razie zostawiłem placeholder, żebyś widział efekt:
}) => {
  const navigate = useNavigate();
  const [hoveredCityMap, setHoveredCityMap] = useState(null);

  const handleCityClick = (slug) => {
    if (slug) {
      navigate(`/przeglad-budowlany-${slug}`);
      window.scrollTo(0, 0); // Przewiń do góry po zmianie strony
    }
  };

  return (
    <section className="local-context-section">
      <div className="local-container">
        {/* GÓRA: OPIS + WIDEO */}
        <div className="local-header-wrapper">
          <div className="local-text-content">
            <div className="local-label">
              <MapPin size={18} />
              <span>Lokalny Ekspert</span>
            </div>
            <h2 className="local-title">
              {city} <span className="light">okiem inżyniera</span>
            </h2>
            <p className="local-description">{description}</p>
          </div>

          <div className="local-map-visual">
            <SilesiaMapGL
              hoveredCity={hoveredCityMap || city} // Podświetlamy hover, a jak brak to obecne miasto
              onCityHover={setHoveredCityMap}
              onCityClick={handleCityClick}
              interactive={true} // Włączamy interakcję (klik, hover)
              initialViewState={{
                longitude: 18.90, // Lekko przesunięte, żeby pasowało do układu
                latitude: 50.28,
                zoom: 8.5,
                pitch: 45,
                bearing: 0
              }}
            />
          </div>
        </div>

        {/* DÓŁ: KARTY ZAGROŻEŃ */}
        <div className="local-risks-grid">
          {risks.map((risk, index) => (
            <div key={index} className="risk-card">
              <div className="risk-icon-wrapper">
                {typeof risk.icon === 'string' ? (
                  <img src={risk.icon} alt={risk.title} className="risk-icon-img" />
                ) : (
                  risk.icon
                )}
              </div>
              <h3 className="risk-title">{risk.title}</h3>
              <p className="risk-desc">{risk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalContext;
