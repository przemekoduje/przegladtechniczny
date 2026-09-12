import React, { useState, Suspense, lazy } from "react";
import "./CityListBanner.scss";
import { useNavigate, Link } from "react-router-dom";
import { citiesData } from "../../helpers/citiesData";

const SilesiaMapGL = lazy(() => import("../SilesiaMapGL/SilesiaMapGL"));

const CityListBanner = () => {
  // Use all 20 cities from citiesData
  const allCities = citiesData.map((c) => c.name);

  const [hoveredCity, setHoveredCity] = useState(null);
  const navigate = useNavigate();

  const handleCityClick = (slug) => {
    if (slug) {
      navigate(`/przeglad-budowlany-${slug}`);
      window.scrollTo(0, 0);
    }
  };

  const renderCityItem = (cityName, index) => {
    const cityData = citiesData.find((c) => c.name === cityName);
    const slug = cityData ? cityData.slug : null;
    const isActive = hoveredCity === cityName;

    return (
      <li
        key={index}
        className={isActive ? "active-city" : ""}
        onMouseEnter={() => setHoveredCity(cityName)}
        onMouseLeave={() => setHoveredCity(null)}
      >
        {slug ? (
          <Link
            to={`/przeglad-budowlany-${slug}`}
            className="city-nav-link"
            title={`Przegląd Budowlany ${cityName} – Inżynier z Uprawnieniami`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className={`dot ${isActive ? "active-dot" : ""}`}></span>
            {cityName}
          </Link>
        ) : (
          <span className="city-nav-link">
            <span className={`dot ${isActive ? "active-dot" : ""}`}></span>
            {cityName}
          </span>
        )}
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
            <ul>{allCities.map((city, i) => renderCityItem(city, i))}</ul>
          </div>

          {/* PRAWA STRONA: Mapa 3D */}
          <div className="city-map-side">
            <Suspense fallback={<div className="map-loading-placeholder" style={{ minHeight: "260px", width: "100%" }}></div>}>
              <SilesiaMapGL
                hoveredCity={hoveredCity}
                onCityHover={setHoveredCity}
                onCityClick={handleCityClick}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityListBanner;
