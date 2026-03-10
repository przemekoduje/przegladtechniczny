import React, { useState } from 'react';
import './scope.scss';
import OrderButton from '../../components/OrderButton/OrderButton';
import CallButton from '../../components/CallButton/CallButton';

const Scope = ({ user }) => {
  const [activeServiceHover, setActiveServiceHover] = useState(null);
  const [activeServiceClick, setActiveServiceClick] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleServiceClick = (id) => {
    setActiveServiceClick(id);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      id: 'b2b',
      title: "Przeglądy roczne (B2B)",
      description: "Dla zarządców wspólnot, budynków biurowych, przemysłowych i wielkopowierzchniowych",
      features: ["Wymagane Art. 62 Prawa Budowlanego", "Kontrola instalacji i konstrukcji", "Wpis do KOB"],
      price: "Wycena indywidualna",
      backContent: "Nasze przeglądy roczne dla sektora B2B to gwarancja spełnienia wszystkich wymogów prawnych dla dużych obiektów."
    },
    {
      id: 'walls',
      title: "Przeglądy 5-letnie domu",
      description: "Kompleksowy przegląd konstrukcyjno-elektryczny wymagany przez ubezpieczycieli",
      features: ["Wymagany do wypłaty odszkodowania", "Pomiary elektryczne w cenie", "Sprawdzenie stanu technicznego domu"],
      price: "od 300 zł",
      backContent: "Przegląd 5-letni domu to nie tylko formalność dla ubezpieczyciela, ale przede wszystkim spokój o bezpieczeństwo twoich bliskich."
    },
    {
      id: 'pipes',
      title: "Instalacje: Gaz i Prąd",
      description: "Okresowa kontrola bezpieczeństwa instalacji w Twoim budynku",
      features: ["Kontrola szczelności instalacji gazowej", "Pomiary elektryczne", "Protokoły dla gazowni/elektrowni"],
      price: "od 300 zł",
      backContent: "Nieszczelna instalacja gazowa lub przestarzała elektryka mogą stanowić bezpośrednie zagrożenie."
    },
    {
      id: 'foundation',
      title: "Doradztwo i Nadzory",
      description: "Wsparcie inżyniera przy zakupie, budowie lub problemach technicznych",
      features: ["Przegląd przed zakupem", "Opinie techniczne i ekspertyzy", "Kierownik budowy / Inspektor nadzoru"],
      price: "Wycena indywidualna",
      backContent: "Jako niezależni Inżynierowie stajemy po stronie Inwestora. Sprawdzimy usterki deweloperskie, poprowadzimy nadzór."
    },
    {
      id: 'roof',
      title: "Termowizja i Dron",
      description: "Nowoczesna diagnostyka budynków i instalacji fotowoltaicznych",
      features: ["Termowizja paneli PV", "Dane do audytów energetycznych", "Fotogrametria i inspekcje dachów"],
      price: "Wycena indywidualna",
      backContent: "Dzięki zaawansowanym dronom docieramy tam, gdzie wzrok nie sięga. Szybko ocenimy stan połaci dachowej."
    },
    {
      id: 'energy',
      title: "Energetyka (ŚCHE)",
      description: "Dokumentacja energetyczna wymagana przy sprzedaży, wynajmie lub dotacjach",
      features: ["Świadectwa Charakterystyki Energetycznej", "Audyty energetyczne", "Optymalizacja kosztów ogrzewania"],
      price: "Wycena indywidualna",
      backContent: "Sprzedajesz lub wynajmujesz nieruchomość? Potrzebujesz Świadectwa Charakterystyki Energetycznej (ŚCHE)."
    }
  ];

  const activeServiceId = activeServiceClick || activeServiceHover || 'walls'; // default to walls
  const activeService = services.find(s => s.id === activeServiceId);

  return (
    <section className="scope-section" id="scope-container">
      <div className="scope-container-blueprint">

        <div className="scope-header-blueprint">
          <h2>Interaktywny Audyt Budowlany</h2>
          <p>Najedź na elementy budynku, aby poznać szczegóły naszych usług inżynieryjnych.</p>
        </div>

        <div className="audit-layout">

          <div className="audit-svg-container" style={{ background: '#fff' }}>
            <svg viewBox="0 0 1024 1024" className="interactive-house-svg" preserveAspectRatio="xMidYMid meet">

              {/* Background Image - Charcoal Sketch */}
              <image href={require("../../assets/blueprint-schematic.png")} x="0" y="0" width="1024" height="1024" />

              {/* 1. Walls / Przeglądy 5-letnie domu (Main house walls and rooms) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'walls' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('walls')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('walls')}
              >
                <polygon points="120,320 528,320 528,780 120,780" className="svg-hotspot" />
              </g>

              {/* 2. B2B / Przeglądy roczne (Commercial Right Wing) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'b2b' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('b2b')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('b2b')}
              >
                <polygon points="528,340 910,340 910,780 528,780" className="svg-hotspot" />
              </g>

              {/* 3. Pipes / Instalacje Gaz i Prąd (Piping lines inside walls and kitchen area) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'pipes' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('pipes')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('pipes')}
              >
                {/* Specific inner hotspots marking "Electrical" and "Plumbing" zones from the sketch */}
                <rect x="238" y="325" width="280" height="300" className="svg-hotspot" />
                <rect x="135" y="635" width="375" height="145" className="svg-hotspot" />
              </g>

              {/* 4. Roof / Termowizja i Dron (Attic & Roof) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'roof' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('roof')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('roof')}
              >
                <polygon points="325,145 100,320 550,320" className="svg-hotspot" />
                <rect x="290" y="70" width="70" height="85" className="svg-hotspot" /> {/* Chimney */}
              </g>

              {/* 5. Foundation / Doradztwo i Nadzory (Ground and Piers) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'foundation' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('foundation')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('foundation')}
              >
                <rect x="0" y="780" width="1024" height="150" className="svg-hotspot" />
              </g>

              {/* 6. Energy / ŚCHE (Thermal Envelope) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'energy' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('energy')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('energy')}
              >
                {/* A glowing envelope tracing the full exterior boundary of both structures */}
                <path d="M 0 780
                         L 0 514
                         L 100 440
                         L 100 320
                         L 326 142
                         L 556 320
                         L 556 339
                         L 910 339
                         L 910 780
                         Z"
                  className="svg-hotspot-envelope" />
              </g>

            </svg>
          </div>

          {/* RIGHT/MODAL: Active Service Details Panel */}
          <div className={`audit-details-panel ${isMobileModalOpen ? 'mobile-modal-open' : ''}`}>
            {activeService && (
              <div className="blueprint-card" key={activeService.id}>

                {/* Mobile Close Button */}
                <button className="mobile-close-btn" onClick={closeMobileModal} aria-label="Zamknij popup">
                  &times;
                </button>

                <div className="card-header-tech">
                  <span className="tech-id">DOC-{activeService.id.toUpperCase()}-01</span>
                  <h3>{activeService.title}</h3>
                </div>

                <p className="tech-desc">{activeService.description}</p>

                <div className="tech-specs">
                  <h4>SPECYFIKACJA AUDYTU</h4>
                  <ul>
                    {activeService.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="bracket">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tech-footer">
                  <div className="price-tag-tech">ESTYMACJA KOSZTÓW:<br /><span>{activeService.price}</span></div>

                  <div className="action-buttons">
                    {['b2b', 'walls', 'pipes'].includes(activeService.id) ? (
                      <OrderButton
                        text="Umów przegląd"
                        onClick={scrollToInspectionForm}
                        showIcon={false}
                      />
                    ) : (
                      <CallButton />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Scope;