import React, { useRef } from "react";
import "./AggressiveHero.scss";
import AlertTriangleIcon from "@mui/icons-material/ReportProblem";
import ShieldIcon from "@mui/icons-material/GppBad";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const AggressiveHero = () => {
    const heroRef = useRef(null);

    const scrollToForm = (e) => {
        e.preventDefault();
        const formElement = document.getElementById("inspection-form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="aggressive-hero-section" ref={heroRef}>
            <div className="container aggressive-hero-container">
                <div className="warning-badge">
                    <AlertTriangleIcon />
                    <span>PILNE ZAGROŻENIE PRAWNE I FINANSOWE</span>
                </div>

                <h1 className="aggressive-title">
                    Brak przeglądu budynku? <br />
                    <span className="text-red">Ubezpieczalnia NIE WYPŁACI CI ANI GROSZA</span> po pożarze!
                </h1>

                <p className="aggressive-subtitle">
                    Nawet jeśli opłacasz polisę od lat, brak aktualnego wpisu w Książce Obiektu Budowlanego to <strong className="highlight">autostrada do odrzucenia odszkodowania</strong> i gigantycznych kar od Inspektoratu (PINB).
                </p>

                <div className="risk-cards-container">
                    <div className="risk-card danger">
                        <div className="icon-wrapper">
                            <MoneyOffIcon fontSize="large" />
                        </div>
                        <h3>Odmowa Odszkodowania</h3>
                        <p>Ubezpieczyciele rutynowo proszą o dokumenty z przeglądów. Ich brak = 0 zł wypłaty za zniszczony majątek.</p>
                    </div>

                    <div className="risk-card penalty">
                        <div className="icon-wrapper">
                            <ShieldIcon fontSize="large" />
                        </div>
                        <h3>Obowiązek Prawny</h3>
                        <p>Zgodnie z Prawem Budowlanym art. 62 ust. 1 pkt 2 właściciel lub zarządca obiektu budowlanego ma obowiązek przeprowadzania okresowych kontroli stanu technicznego budynku. Brak aktualnego wpisu w Książce Obiektu Budowlanego jest rażącym naruszeniem tego obowiązku.</p>
                    </div>
                </div>

                <div className="cta-wrapper">
                    <button className="primary-red-btn" onClick={scrollToForm}>
                        Zabezpiecz Swój Majątek – Zamów Przegląd
                    </button>
                    <p className="guarantee-text">Działamy na terenie całej Śląskiej Aglomeracji. Szybkie terminy.</p>
                </div>
            </div>
            <div className="hero-background-overlay"></div>
        </section>
    );
};

export default AggressiveHero;
