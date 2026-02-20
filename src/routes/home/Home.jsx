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

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Analityka - Śledzenie czasu na sekcjach
  const heroRef = useSectionTracker("hero_section");
  const scopeRef = useSectionTracker("scope_section");
  const importantRef = useSectionTracker("why_important_section");
  const formRef = useSectionTracker("inspection_form_section");
  const timelineRef = useSectionTracker("timeline_section");
  const faqRef = useSectionTracker("faq_section");



  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small delay to allow layout to stabilize
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 800);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
      }
    }
  }, [location]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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
  return (
    <div className="home">
      {/* SEKCJA 1 i 2 połączone efektem Parallax */}
      <div ref={heroRef}>
        <HeroParallaxWrapper>
          <Main
            user={currentUser}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
          <CityListBanner />
        </HeroParallaxWrapper>
      </div>

      <div ref={scopeRef}>
        <Scope />
      </div>

      <CtaBanner />

      <div ref={importantRef}>
        <WhyImportant />
      </div>

      <div ref={formRef}>
        <InspectionFormSlide />
      </div>

      <div ref={timelineRef}>
        <InspectionsTimeline />
      </div>

      <GoldHand />

      <div ref={faqRef}>
        <Faq />
      </div>

      <Footer />
    </div>
  );
}
