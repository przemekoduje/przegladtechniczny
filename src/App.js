
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// --- IMPORTY STRON I KOMPONENTÓW ---
import Home from "./routes/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import SignUp from "./components/signUp/SignUp.jsx";
import PrzewodnikOcena from "./routes/landingi/przewodnikOcena/PrzewodnikOcena.jsx";
import BlogDB from "./routes/BlogDB/BlogDB.jsx";
import AdminPanel from "./routes/AdminPanel/AdminPanel.jsx";
import UserDashboard from "./routes/userDashboard/UserDashboard.jsx";
import PrzegladB from "./routes/przegladB/PrzegladB.jsx";
import PrzegladG from "./routes/przegladG/PrzegladG.jsx";
import PrzegladE from "./routes/przegladE/PrzegladE.jsx";
import PrzegladW from "./routes/przegladW/PrzegladW.jsx";
import Layout from "./layouts/Layout.jsx";
import FormLanding from "./routes/formLanding/FormLanding.jsx";
import Terms from "./routes/legal/Terms.jsx";
import PrivacyPolicy from "./routes/legal/PrivacyPolicy.jsx";
import HeroSnapScroller from "./fachowiec/pages/Mobile/HeroSnapScroller/HeroSnapScroller";
import Fachowiec from "./fachowiec/pages/Fachowiec";
import SingleBlogPost from "./routes/SingleBlogPost/SingleBlogPost";

// --- NOWE IMPORTY DLA MIAST ---
import CityLandingPage from "./routes/CityLandingPage/CityLandingPage.jsx"; // Twój nowy komponent
import { citiesData } from "./helpers/citiesData"; // Dane miast do generowania ścieżek

function AppContent() {
  const { currentUser: user } = useAuth();
  // const [user, setUser] = useState(null); // Managed by AuthProvider
  // const [loadingUser, setLoadingUser] = useState(true); // Managed by AuthProvider
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Jeśli nieużywane w App.js, można usunąć
  const [showFlyout, setShowFlyout] = useState(false);

  const location = useLocation();

  useEffect(() => {
    import('./utils/analytics').then(({ trackPageView }) => {
      trackPageView();
    });
  }, [location.pathname]);

  const isFullWidthPage = [
    "/login",
    "/signUp",
    "/adminLogin",
    "/przewodnik",
  ].includes(location.pathname);

  // --- EFEKTY (Flyout, Scroll) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFlyout(true);
      setTimeout(() => setShowFlyout(false), 4000);
    }, Math.random() * 20000 + 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const locationState = location.state;
    const isScrollTarget = locationState?.scrollTo === "inspectionForm";
    const isAllowedPath = ["/", "/form"].includes(location.pathname);

    if (isScrollTarget && isAllowedPath) {
      const inspectionFormElement = document.querySelector(".inspection-form");
      if (inspectionFormElement) {
        inspectionFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state, location.pathname]);

  return (
    <div className={`App ${isFullWidthPage ? "full-width" : ""}`}>
      <Routes>
        {/* --- STRONA GŁÓWNA --- */}
        <Route
          path="/"
          element={
            <Layout user={user}>
              <Home user={user} />
            </Layout>
          }
        />

        {/* --- AUTH & ADMIN --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <UserDashboard user={user} />
          }
        />


        {/* --- LANDINGI SPECJALNE --- */}
        <Route path="/przewodnik" element={<PrzewodnikOcena />} />
        <Route path="/fach" element={<Fachowiec user={user} />} />
        <Route path="/hero" element={<HeroSnapScroller user={user} />} />

        {/* --- BLOG --- */}
        <Route
          path="/blogDB"
          element={
            <Layout user={user}>
              <BlogDB />
            </Layout>
          }
        />
        <Route
          path="/blogDB/:slug"
          element={
            <Layout user={user}>
              <SingleBlogPost />
            </Layout>
          }
        />

        {/* --- USŁUGI GŁÓWNE --- */}
        <Route
          path="/przeglad-budowlany"
          element={
            <Layout user={user}>
              <PrzegladB />
            </Layout>
          }
        />
        <Route
          path="/przeglad-gazowy"
          element={
            <Layout user={user}>
              <PrzegladG />
            </Layout>
          }
        />
        <Route
          path="/przeglad-wentylacyjny"
          element={
            <Layout user={user}>
              <PrzegladW />
            </Layout>
          }
        />
        <Route
          path="/przeglad-elektryczny"
          element={
            <Layout user={user}>
              <PrzegladE />
            </Layout>
          }
        />

        {/* --- NOWOŚĆ: DYNAMICZNE LANDINGI DLA MIAST --- */}
        {/* Generujemy osobny Route dla każdego miasta z citiesData */}
        {/* Dzięki temu URL to np. /przeglad-budowlany-gliwice */}
        {citiesData.map((city) => (
          <Route
            key={city.slug}
            path={`/przeglad-budowlany-${city.slug}`}
            element={
              <Layout user={user}>
                {/* Nie musimy przekazywać citySlug, bo CityLandingPage pobierze go z URL lub możemy przekazać go tu jeśli zmienimy logikę */}
                <CityLandingPage />
              </Layout>
            }
          />
        ))}

        {/* --- FORMULARZ & LEGAL --- */}
        <Route
          path="/form"
          element={
            <Layout user={user}>
              <FormLanding user={user} />
            </Layout>
          }
        />
        <Route path="/regulamin" element={<Terms />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}