import React, { useState } from "react";
import "./CityListBanner.scss";
import SilesiaMapGL from "../../components/SilesiaMapGL/SilesiaMapGL";
import { useNavigate } from "react-router-dom";
import { citiesData } from "../../helpers/citiesData";

const CityListBanner = () => {
  const citiesLeft = [
    "Gliwice",
    "Zabrze",
    "Katowice",
    "Bytom",
    "Ruda Śląska",
    "Chorzów",
    "Tarnowskie Góry",
  ];
  const citiesRight = [
    "Mikołów",
    "Tychy",
    "Dąbrowa Górnicza",
    "Jaworzno",
    "Sosnowiec",
    "Piekary Śląskie",
    "Pyskowice",
    "Rybnik",
  ];

  const [hoveredCity, setHoveredCity] = useState(null);
  const navigate = useNavigate();

  const handleCityClick = (slug) => {
    // console.log("Kliknięto miasto:", slug);
    if (slug) {
      navigate(`/przeglad-budowlany-${slug}`);
      window.scrollTo(0, 0);
    }
  };

  // Ta funkcja była zdefiniowana, ale nieużywana - TERAZ JĄ UŻYJEMY
  const renderCityItem = (cityName, index) => {
    // 1. Znajdź pełne dane miasta
    const cityData = citiesData.find((c) => c.name === cityName);
    const slug = cityData ? cityData.slug : null;

    // 2. Sprawdź czy aktywne
    const isActive = hoveredCity === cityName;

    return (
      <li
        key={index}
        className={isActive ? "active-city" : ""}
        // INTERAKCJA 1: Hover
        onMouseEnter={() => setHoveredCity(cityName)}
        onMouseLeave={() => setHoveredCity(null)}
        // INTERAKCJA 2: Click
        onClick={() => handleCityClick(slug)}
        style={{ cursor: slug ? "pointer" : "default" }}
      >
        <span className={`dot ${isActive ? "active-dot" : ""}`}></span>
        {cityName}
      </li>
    );
  };

  return (
    <section className="city-list-panel">
      <div className="city-content-container">
        {/* LEWA STRONA: Tekst */}
        <div className="city-info-side">
          <div className="header-group">
            <h3>Działamy na terenie całej Aglomeracji Górnośląskiej.</h3>
            <p></p>
          </div>
        </div>
        <div className="two-columns">
          <div className="cities-columns">
            {/* TUTAJ BYŁ BŁĄD - Teraz używamy renderCityItem */}
            <ul>{citiesLeft.map((city, i) => renderCityItem(city, i))}</ul>
            <ul>{citiesRight.map((city, i) => renderCityItem(city, i))}</ul>
          </div>

          {/* PRAWA STRONA: Mapa 3D */}
          <div className="city-map-side">
            <SilesiaMapGL
              hoveredCity={hoveredCity}
              onCityHover={setHoveredCity}
              onCityClick={handleCityClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityListBanner;
