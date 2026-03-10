import React from 'react';
import './process.scss';

const processSteps = [
    {
        id: "01",
        title: "Rozpoznanie i analiza",
        desc: "Przegląd budowlany rozpoczynamy od fachowej analizy dokumentacji projektowej i weryfikacji wpisów w Książce Obiektu Budowlanego (KOB). Przeprowadzamy szczegółowy wywiad inżynieryjny i planujemy precyzyjny zakres audytu technicznego.",
        data: [
            { label: "STATUS", value: "INICJACJA" },
            { label: "WYMAGANIA", value: "KOB, RZUTY" },
            { label: "CZAS", value: "24H" }
        ]
    },
    {
        id: "02",
        title: "Wizja lokalna i pomiary",
        desc: "Ekspercka inżynieryjna inspekcja oraz odbiór techniczny nieruchomości. Podczas diagnozowania uszkodzeń wykorzystujemy m.in. profesjonalne kamery termowizyjne, drony i zaawansowane mierniki do oceny stanu faktycznego nośności, szczelności oraz instalacji.",
        data: [
            { label: "STATUS", value: "W TOKU" },
            { label: "SPRZĘT", value: "DRON, FLIR, SONEL" },
            { label: "CZAS", value: "1-5H" }
        ]
    },
    {
        id: "03",
        title: "Analiza wad i usterek",
        desc: "Rzetelna inżynieryjna identyfikacja wad oraz usterek technicznych budynków jednorodzinnych i komercyjnych. Zapewniamy klasyfikację stopnia uszkodzeń pod względem bezpośredniego zagrożenia dla konstrukcji, wymagań bezpieczeństwa ubezpieczyciela oraz zgodności z Prawem Budowlanym.",
        data: [
            { label: "STATUS", value: "EWALUACJA" },
            { label: "NORMA", value: "PN-EN 1990" },
            { label: "CZAS", value: "48H" }
        ]
    },
    {
        id: "04",
        title: "Protokół i Certyfikat bezpieczeństwa",
        desc: "Zwieńczeniem procesu jest prawomocny protokół z wykonanego przeglądu rocznego lub 5-letniego opatrzony pieczęcią inżyniera z uprawnieniami konstrukcyjno-budowlanymi i instalacyjnymi. Dokument w pełni honorowany m.in. przez PINB czy Nadzór Budowlany (zgodnie z Art. 62 PB) oraz ubezpieczyciela.",
        data: [
            { label: "STATUS", value: "ZAKOŃCZONO" },
            { label: "MOC PRAWNA", value: "ART. 62 PB" },
            { label: "CZAS", value: "NATYCHMIAST" }
        ]
    }
];

export default function Process() {
    return (
        <section className="process-section" id="process">
            <div className="process-header">
                <h2>Procedura Audytowa</h2>
                <p>Proces inżynieryjny krok po kroku. Eliminujemy ryzyko na każdym etapie.</p>
            </div>

            <div className="process-stack-container">
                {processSteps.map((step, index) => (
                    <div
                        key={step.id}
                        className="process-card"
                        style={{
                            top: `calc(120px + ${index * 40}px)`,
                            zIndex: index, // Ensure stacking order
                        }}
                    >
                        <div className="noise-overlay"></div>
                        <div className="card-top-bar">
                            <span className="step-id">KROK_{step.id}</span>
                            <span className="step-dots">
                                {[0, 1, 2, 3].map((dotIndex) => (
                                    <span key={dotIndex} className={`dot ${dotIndex <= index ? 'active' : ''}`}></span>
                                ))}
                            </span>
                        </div>

                        <div className="card-content">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>

                        <div className="card-footer-data">
                            {step.data.map((d, i) => (
                                <div className="data-block" key={i}>
                                    <span className="data-label">{d.label}</span>
                                    <span className="data-value">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
