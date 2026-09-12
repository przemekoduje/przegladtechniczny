import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// --- IMPORTY STRON I KOMPONENTÓW ---
import Home from "./routes/Home/Home";
import Login from "./components/Login/Login";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import SignUp from "./components/SignUp/SignUp";
import PrzewodnikOcena from "./routes/Landingi/PrzewodnikOcena/PrzewodnikOcena";
import BlogDB from "./routes/BlogDB/BlogDB";
import AdminPanel from "./routes/AdminPanel/AdminPanel";
import UserDashboard from "./routes/UserDashboard/UserDashboard";
import PrzegladB from "./routes/PrzegladB/PrzegladB";
import PrzegladG from "./routes/PrzegladG/PrzegladG";
import PrzegladE from "./routes/PrzegladE/PrzegladE";
import PrzegladW from "./routes/PrzegladW/PrzegladW";
import Layout from "./layouts/Layout";
import FormLanding from "./routes/FormLanding/FormLanding";
import Terms from "./routes/legal/Terms.jsx";
import PrivacyPolicy from "./routes/legal/PrivacyPolicy.jsx";
import SingleBlogPost from "./routes/SingleBlogPost/SingleBlogPost";
import ThankYouPage from "./routes/ThankYouPage/ThankYouPage";

// --- NOWE IMPORTY DLA MIAST I LANDINGÓW ---
import CityLandingPage from "./routes/CityLandingPage/CityLandingPage"; // Twój nowy komponent
import { citiesData } from "./helpers/citiesData"; // Dane miast do generowania ścieżek
import AggressiveLanding from "./routes/AggressiveLanding/AggressiveLanding"; // Sprzedażowy landing page

function BlogSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const { currentUser: user } = useAuth();
  // const [user, setUser] = useState(null); // Managed by AuthProvider
  // const [loadingUser, setLoadingUser] = useState(true); // Managed by AuthProvider
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Jeśli nieużywane w App.js, można usunąć
  // const [showFlyout, setShowFlyout] = useState(false);

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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowFlyout(true);
  //     setTimeout(() => setShowFlyout(false), 4000);
  //   }, Math.random() * 20000 + 10000);
  //   return () => clearInterval(interval);
  // }, []);

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
      <ScrollToTop />
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
        {/* <Route path="/fach" element={<Fachowiec user={user} />} /> */}
        {/* <Route path="/hero" element={<HeroSnapScroller user={user} />} /> */}
        <Route path="/landing" element={<Layout user={user}><AggressiveLanding /></Layout>} />
        <Route path="/dziekuje" element={<Layout user={user}><ThankYouPage /></Layout>} />

        {/* --- BLOG --- */}
        <Route
          path="/blog"
          element={
            <Layout user={user}>
              <BlogDB />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout user={user}>
              <SingleBlogPost />
            </Layout>
          }
        />
        {/* Redirect legacy /blogDB URLs to canonical /blog */}
        <Route path="/blogDB" element={<Navigate to="/blog" replace />} />
        <Route path="/blogDB/:slug" element={<BlogSlugRedirect />} />

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
        {citiesData.map((city) => (
          <Route
            key={city.slug}
            path={`/przeglad-budowlany-${city.slug}`}
            element={
              <Layout user={user}>
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
        <Route path="/kontakt" element={<Navigate to="/form" replace />} />
        <Route path="/cennik" element={<Navigate to="/#scope" replace />} />
        <Route path="/regulamin" element={<Terms />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />

        {/* --- FALLBACK 404 --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
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