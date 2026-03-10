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
        <div className="hero-title-container">
          <AnimatedText
            text="Przeglądy Techniczne Nieruchomości"
            tag="h2"
            className="service-name"
            delay={0.2}
          />
          <AnimatedText
            text={customCity || "Śląsk"}
            tag="h1"
            className="city-name"
            delay={0.6}
          />
        </div>

        <MagneticButton>
          <div className="order-button-wrapper">
            <OrderButton
              text="Umów przegląd"
              userAvatar={user?.photoURL}
              onClick={scrollToInspectionForm}
            />
          </div>
        </MagneticButton>
      </div>

      <div className="main-footer">
        <MainFooter />
      </div>
    </div>
  );
}