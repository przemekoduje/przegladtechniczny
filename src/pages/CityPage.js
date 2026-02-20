// src/pages/CityPage.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { citiesData } from "../helpers/citiesData"; // Import bazy danych
import LocalContext from "../components/LocalContext/LocalContext";
// Import innych sekcji (Navbar, Footer, Hero itp.)

const CityPage = () => {
  // 1. Pobieramy slug z URL (to co jest po "przeglad-budowlany-")
  const { citySlug } = useParams();
  const navigate = useNavigate();

  // 2. Szukamy miasta w naszej bazie
  const currentCityData = citiesData.find((city) => city.slug === citySlug);

  // Zabezpieczenie: Jeśli ktoś wpisze zły adres (np. /przeglad-budowlany-warszawa),
  // a Warszawy nie ma w bazie -> przekieruj na główną lub pokaż 404.
  useEffect(() => {
    if (!currentCityData) {
      console.warn("Nie znaleziono miasta:", citySlug);
      navigate("/"); // Przekierowanie na stronę główną
    }
  }, [currentCityData, citySlug, navigate]);

  if (!currentCityData) return null; // Zwracamy null na ułamek sekundy przed przekierowaniem

  return (
    <div className="city-page">
      {/* Navbar, Hero itp... */}

      {/* 3. Przekazujemy dane dynamicznie do LocalContext */}
      <LocalContext 
        city={currentCityData.name}
        description={currentCityData.localDescription}
        risks={currentCityData.risks}
        // Możesz też przekazać np. wideo, jeśli jest w bazie:
        // videoSrc={`/videos/${currentCityData.slug}.mp4`} 
      />

      {/* Footer itp... */}
    </div>
  );
};

export default CityPage;