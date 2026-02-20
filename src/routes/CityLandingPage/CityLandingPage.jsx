// routes/CityLandingPage/CityLandingPage.jsx

import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { citiesData } from '../../helpers/citiesData';

// Importy Twoich sekcji
import Main from "../../sections/main/Main";
import LocalContext from "../../sections/LocalContext/LocalContext";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";
import Footer from "../../sections/footer/Footer";
import Scope from "../../sections/scope/Scope";
import WhyImportant from "../../sections/WhyImportant/WhyImportant";
import CtaBanner from "../../sections/ctabanner/CtaBanner";
import Faq from "../../sections/faq/Faq";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import GoldHand from "../../sections/goldHand/GoldHand";

const CityLandingPage = () => {
  const location = useLocation();

  // 1. Wyciągamy slug ręcznie z URL-a
  // Usuwamy prefix "/przeglad-budowlany-" i ewentualne slashe
  const citySlug = location.pathname.replace('/przeglad-budowlany-', '').replace('/', '');

  // 2. Szukamy danych miasta
  const cityData = citiesData.find(c => c.slug === citySlug);

  // 3. Scroll to top przy zmianie miasta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [citySlug]);

  // 4. Jeśli ktoś wpisał błędny URL (miasto spoza bazy), przekieruj na Home
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  // 5. Renderowanie
  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{cityData.seoTitle || `Przegląd Budowlany ${cityData.name} - Inżynier`}</title>
        <meta name="description" content={cityData.seoDescription || `Profesjonalne przeglądy budowlane w mieście ${cityData.name}.`} />
        <meta property="og:title" content={cityData.seoTitle} />
        {/* Pamiętaj o podmianie domeny na produkcyjną */}
        <link rel="canonical" href={`https://twojadomena.pl/przeglad-budowlany-${citySlug}`} />
      </Helmet>

      {/* Hero Section - przekazujemy customCity, aby nagłówek był dynamiczny */}
      <Main customCity={cityData.name} />

      {/* NOWE SEKCJIE DLA LEPSZEGO SEO/UX */}
      <Scope />

      <InspectionForm />

      <CtaBanner />

      <WhyImportant />

      {/* Sekcja Lokalna - przekazujemy dane z citiesData */}
      <LocalContext
        city={cityData.name}
        description={cityData.localDescription} // Opis główny
        risks={cityData.risks}                  // Tablica z ryzykami (ikony)
      />

      <InspectionsTimeline />

      {(citySlug === "gliwice" || citySlug === "zabrze") && <GoldHand />}

      <Faq />

      <Footer />
    </div>
  );
};

export default CityLandingPage;