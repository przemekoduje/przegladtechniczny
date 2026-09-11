import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { citiesData } from '../../helpers/citiesData';
import { useAuth } from '../../contexts/AuthContext';
import CitySchema from '../../components/SEO/CitySchema';

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
  const { currentUser: user } = useAuth();
  const location = useLocation();

  // 1. Wyciągamy slug ręcznie z URL-a
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

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pageTitle = cityData.seoTitle || `Przeglądy Budowlane ${cityData.name} - Inżynier z Uprawnieniami`;
  const pageDesc = cityData.seoDescription || `Profesjonalne okresowe przeglądy budowlane w mieście ${cityData.name} i na Śląsku. Roczne, 5-letnie, kontrole gazowe i elektryczne.`;
  const pageUrl = `https://przeglady-domu.com/przeglad-budowlany-${citySlug}`;

  // 5. Renderowanie
  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Przeglądy Techniczne Nieruchomości" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://przeglady-domu.com/images/v2/hh_desktop6.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>

      <CitySchema cityData={cityData} />

      <Main customCity={cityData.name} user={user} />

      <LocalContext
        city={cityData.name}
        description={cityData.localDescription}
        risks={cityData.risks}
      />

      <Scope user={user} />

      <InspectionForm />

      <CtaBanner />

      <WhyImportant />

      <InspectionsTimeline
        user={user}
        onOrderClick={scrollToInspectionForm}
      />

      {(citySlug === "gliwice" || citySlug === "zabrze") && <GoldHand />}

      <Faq />

      <Footer />
    </div>
  );
};

export default CityLandingPage;