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

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#inspection-form") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  
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
      <Main user={currentUser} isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <Explanations />
      <InspectionFormSlide />
      <GoldHand />
      <Faq />
      <Footer />
    </div>
  );
}
