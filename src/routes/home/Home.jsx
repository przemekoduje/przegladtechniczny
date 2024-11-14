import React from "react";
import "./home.scss"
import Main from "../../sections/main/Main";
import Explanations from "../../sections/explanations/Explanations";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";
import GoldHand from "../../sections/goldHand/GoldHand";
import Faq from "../../sections/faq/Faq";
import Footer from "../../sections/footer/Footer";

export default function Home() {
  return (
    <div className="home">
      <Main/>
      <Explanations/>
      <InspectionForm/>
      <GoldHand/>
      <Faq/>
      <Footer/>
    </div>
  );
}
