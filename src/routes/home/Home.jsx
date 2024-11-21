import React, { useEffect, useState } from "react";
import "./home.scss"
import Main from "../../sections/main/Main";
import Explanations from "../../sections/explanations/Explanations";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";
import GoldHand from "../../sections/goldHand/GoldHand";
import Faq from "../../sections/faq/Faq";
import Footer from "../../sections/footer/Footer";
import { auth } from "../../firebase.js";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="home">
      <Main user={currentUser}/>
      <Explanations/>
      <InspectionForm/>
      <GoldHand/>
      <Faq/>
      <Footer/>
    </div>
  );
}
