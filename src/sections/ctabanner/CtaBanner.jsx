import React, { useEffect, useState } from "react";
import "./ctaBanner.scss";
import CallButton from "../../components/CallButton/CallButton";
import OrderButton from "../../components/OrderButton/OrderButton";

const CtaBanner = ({ customCity }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  let scrollTimeout;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop + 10) {
      setIsVisible(false);
    } else if (scrollTop < lastScrollTop) {
      setIsVisible(true);
    }

    setLastScrollTop(scrollTop);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

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
          Skontaktuj się z nami i otrzymaj bezpłatną wycenę w 10minut
        </p>

        <div className="cta-buttons-wrapper">
          {/* Przycisk telefonu */}
          <CallButton phoneNumber="690029414" />

          <OrderButton
            showIcon={false}
            text="Zamów przegląd"
            padding="6px 32px 6px 32px"
            onClick={scrollToInspectionForm}
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
