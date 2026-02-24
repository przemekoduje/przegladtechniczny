import React, { useEffect, useState } from "react";
import "./home.scss";
import Main from "../../sections/main/Main";
import Explanations from "../../sections/explanations/Explanations";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";
import GoldHand from "../../sections/goldHand/GoldHand";
import Faq from "../../sections/faq/Faq";
import Footer from "../../sections/footer/Footer";
import { auth } from "../../firebase.js";
import InspectionFormSlide from "../../sections/inspectionsForm/InspectionForm";
import { useLocation } from "react-router-dom";
import Scope from "../../sections/scope/Scope";
import CtaBanner from "../../sections/ctabanner/CtaBanner";
import { Pickaxe, Building, Droplets, MapPin } from "lucide-react";
import WhyImportant from "../../sections/WhyImportant/WhyImportant";
import CityListBanner from "../../sections/CityListBanner/CityListBanner";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import HeroParallaxWrapper from "../../components/HeroParallaxWrapper/HeroParallaxWrapper";
import { useNavigate } from "react-router-dom";
import { useSectionTracker } from "../../utils/analytics";
import CachedIcon from '@mui/icons-material/Cached'; // Stylized loading spinner
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "../../components/SEO/LocalBusinessSchema";

// Helper to preload a single critical image
const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve; // Resolve even on error so we don't break the page
  });
};

export default function Home({ user }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Analityka - Śledzenie czasu na sekcjach
  const heroRef = useSectionTracker("hero_section");
  const scopeRef = useSectionTracker("scope_section");
  const importantRef = useSectionTracker("why_important_section");
  const formRef = useSectionTracker("inspection_form_section");
  const timelineRef = useSectionTracker("timeline_section");
  const faqRef = useSectionTracker("faq_section");

  const location = useLocation();

  // Hero Image Preloader
  useEffect(() => {
    const loadHeroContent = async () => {
      // Obraz tła zdefiniowany w main.scss (.hero-bg-image) to:
      // ../../../public/images/v2/hh_desktop6.png -> /images/v2/hh_desktop6.png jako public root URL.
      const heroImageUrl = "/images/v2/hh_desktop6.png";

      try {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));
        await Promise.race([preloadImage(heroImageUrl), timeoutPromise]);
      } catch (error) {
        console.error("Failed to preload hero image:", error);
      } finally {
        setIsHeroLoaded(true);
      }
    };

    loadHeroContent();
  }, []);

  useEffect(() => {
    // Only attempt scrolling after hero is loaded so layout is complete
    if (isHeroLoaded) {
      if (location.hash) {
        // Small delay to allow layout to stabilize
        setTimeout(() => {
          const id = location.hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 800);
      } else if (!location.state?.scrollTo) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.hash, isHeroLoaded]);

  useEffect(() => {
    if (isHeroLoaded) {
      const scrollToId = location.state?.scrollTo;
      if (scrollToId) {
        const el = document.getElementById(scrollToId);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
        }
      }
    }
  }, [location.state, isHeroLoaded]);

  // Usuwamy lokalny stan user, bo dostajemy go z props (App.js)

  // Blokowanie przewijania, gdy panel jest otwarty
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Przywróć przewijanie przy odmontowaniu
    };
  }, [isPanelOpen]);

  if (!isHeroLoaded) {
    return (
      <div className="home-preloader">
        <CachedIcon className="spinner-icon" />
        <p>Inicjowanie aplikacji...</p>
      </div>
    );
  }

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <Helmet>
        <title>Przeglądy Techniczne Nieruchomości Gliwice & Śląsk | Inżynier Przemysław Rakotny</title>
        <meta name="description" content="Profesjonalne przeglądy techniczne nieruchomości w Gliwicach i na Śląsku. Przeglądy budowlane, gazowe, elektryczne i wentylacyjne. Zamów rzetelną kontrolę budynku już teraz!" />
        <link rel="canonical" href="https://przeglady-domu.online/" />
        <meta property="og:title" content="Przeglądy Techniczne Nieruchomości Gliwice & Śląsk" />
        <meta property="og:description" content="Skorzystaj z usług inżyniera. Wykonujemy pełny zakres przeglądów technicznych nieruchomości na Śląsku. Szybkie terminy i rzetelne protokoły." />
        <meta property="og:url" content="https://przeglady-domu.online/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LocalBusinessSchema />

      {/* SEKCJA 1 i 2 połączone efektem Parallax */}
      <div ref={heroRef}>
        <HeroParallaxWrapper>
          <Main
            user={user}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
          <CityListBanner />
        </HeroParallaxWrapper>
      </div>

      <div ref={scopeRef}>
        <Scope user={user} />
      </div>

      <CtaBanner />

      <div ref={importantRef}>
        <WhyImportant />
      </div>

      <div ref={formRef}>
        <InspectionFormSlide />
      </div>

      <div ref={timelineRef}>
        <InspectionsTimeline
          user={user}
          onOrderClick={scrollToInspectionForm}
        />
      </div>

      <GoldHand />

      <div ref={faqRef}>
        <Faq />
      </div>

      <Footer />
    </div>
  );
}
