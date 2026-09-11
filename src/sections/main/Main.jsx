import React, { useEffect, useRef } from "react";
import "./main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OrderButton from "../../components/OrderButton/OrderButton";
import MainFooter from "../../components/MainFooter/MainFooter";
import AnimatedText from "../../components/animations/AnimatedText";
import MagneticButton from "../../components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Main({ user, customCity }) {
  const sectionRef = useRef(null);
  const scannerLineRef = useRef(null);
  const maskLayerRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger for scanner effect
    const ctx = gsap.context(() => {
      // Animate mask revealing the "blueprint" image and the laser line moving down
      gsap.to(maskLayerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(scannerLineRef.current, {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section" ref={sectionRef}>
      {/* Background Layer (Normal Image) */}
      <div className="hero-bg-normal"></div>

      {/* Masked Blueprint Layer & Scanner Line */}
      <div className="hero-bg-blueprint" ref={maskLayerRef}>
        <div className="blueprint-overlay"></div>
      </div>

      <div className="scanner-line" ref={scannerLineRef}>
        <div className="scanner-flare"></div>
      </div>

      <div className="hero-content">
        <div className="hero-header-group">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text-full">Przeglądy Budowlane & Techniczne</span>
            <span className="badge-text-short">Przeglądy Techniczne</span>
          </div>

          <h1 className="hero-title-container">
            <AnimatedText
              text={customCity ? `${customCity.toUpperCase()} & ŚLĄSK` : "GLIWICE & ŚLĄSK"}
              tag="span"
              className="city-name"
              delay={0.3}
            />
          </h1>

          <h2 className="hero-subtitle-expert">
            Twój Ekspert w Kontrolach Budowlanych
          </h2>

          <div className="hero-description-lines">
            <p className="desc-line">Roczne i 5-letnie kontrole.</p>
            <p className="desc-line credentials">Inżynier z uprawnieniami SLK/2122/OWOK/08.</p>
            <p className="desc-line">Zaufaj doświadczeniu.</p>
          </div>

          <div className="order-button-wrapper">
            <MagneticButton>
              <OrderButton
                text="Umów przegląd"
                userAvatar={user?.photoURL}
                onClick={scrollToInspectionForm}
              />
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="main-footer">
        <MainFooter />
      </div>
    </div>
  );
}