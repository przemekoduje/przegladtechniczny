import React from "react";
import "./ctaBanner.scss";
import CallButton from "../../components/CallButton/CallButton";
import OrderButton from "../../components/OrderButton/OrderButton";

const CtaBanner = ({ customCity }) => {
  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Potrzebujesz przeglądu budowlanego{customCity ? ` w ${customCity}` : ""}?</h2>

        <p className="cta-subtitle">
          Skontaktuj się z nami i otrzymaj bezpłatną wycenę w 3 minuty
        </p>

        <div className="cta-buttons-wrapper">
          {/* Przycisk telefonu */}
          <CallButton phoneNumber="690029414" />

          <OrderButton
            showIcon={false}
            text="Umów przegląd"
            onClick={scrollToInspectionForm}
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
