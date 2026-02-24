import React from 'react';
import './scope.scss'; // Importujemy plik ze stylami
import OrderButton from '../../components/OrderButton/OrderButton';
import CallButton from '../../components/CallButton/CallButton';

import iconB2B from '../../assets/roczny-scope-card-icon.png';
import iconHouse from '../../assets/5-scope-card-icon.png';
import iconGas from '../../assets/instal-scope-card-icon.png';
import iconEngineer from '../../assets/doradztwo-scope-card-icon.png';
import iconDrone from '../../assets/dron-scope-card-icon.png';
import iconEnergy from '../../assets/energ-scope-card-icon.png';

const Scope = ({ user }) => {
  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      title: "Przeglądy roczne (B2B)",
      description: "Dla zarządców wspólnot, budynków biurowych, przemysłowych i wielkopowierzchniowych",
      features: [
        "Wymagane Art. 62 Prawa Budowlanego",
        "Kontrola instalacji i konstrukcji",
        "Wpis do Książki Obiektu (KOB)"
      ],
      price: "Wycena indywidualna",
      imageSrc: iconB2B,
      isPopular: false,
      backContent: "Nasze przeglądy roczne dla sektora B2B to gwarancja spełnienia wszystkich wymogów prawnych dla dużych obiektów. Przeprowadzamy szczegółowe audyty elementów konstrukcyjnych, instalacji oraz przygotowujemy niezbędną dokumentację, w tym wpisy do KOB. Zapewniamy pełne wsparcie dla zarządców nieruchomości."
    },
    {
      title: "Przeglądy 5-letnie domu",
      description: "Kompleksowy przegląd konstrukcyjno-elektryczny wymagany przez ubezpieczycieli",
      features: [
        "Wymagany do wypłaty odszkodowania",
        "Pomiary elektryczne w cenie",
        "Sprawdzenie stanu technicznego domu"
      ],
      price: "od 300 zł",
      imageSrc: iconHouse,
      isPopular: true, // Ta oferta jest najczęściej wybierana przez właścicieli domów
      backContent: "Przegląd 5-letni domu to nie tylko formalność dla ubezpieczyciela, ale przede wszystkim spokój o bezpieczeństwo twoich bliskich. Wykonujemy pełen zakres badań, od sprawdzenia konstrukcji dachu i ścian, po wnikliwe pomiary instalacji elektrycznej. Otrzymujesz kompletny protokół do ręki."
    },
    {
      title: "Instalacje: Gaz i Prąd",
      description: "Okresowa kontrola bezpieczeństwa instalacji w Twoim budynku",
      features: [
        "Kontrola szczelności instalacji gazowej",
        "Pomiary elektryczne (odbiorcze/okresowe)",
        "Protokoły dla gazowni/elektrowni"
      ],
      price: "od 300 zł",
      imageSrc: iconGas,
      isPopular: false,
      backContent: "Nieszczelna instalacja gazowa lub przestarzała elektryka mogą stanowić bezpośrednie zagrożenie. Wykorzystujemy najwyższej klasy mierniki do wykrywania nawet najmniejszych ubytków gazu oraz nowoczesne analizatory do badana parametrów prądu. Posiadamy wszelkie niezbędne uprawnienia SEP i gazowe."
    },
    {
      title: "Doradztwo i Nadzory",
      description: "Wsparcie inżyniera przy zakupie, budowie lub problemach technicznych",
      features: [
        "Przegląd przed zakupem nieruchomości",
        "Opinie techniczne i ekspertyzy",
        "Kierownik budowy / Inspektor nadzoru"
      ],
      price: "Wycena indywidualna",
      imageSrc: iconEngineer,
      isPopular: false,
      backContent: "Budowa domu to proces pełen pułapek. Kupno mieszkania z rynku wtórnego również. Jako niezależni Inżynierowie stajemy po stronie Inwestora. Sprawdzimy usterki deweloperskie, poprowadzimy nadzór nad wykonawcą i sporządzimy wymaganą ekspertyzę budowlaną w razie sporów."
    },
    {
      title: "Termowizja i Dron",
      description: "Nowoczesna diagnostyka budynków i instalacji fotowoltaicznych",
      features: [
        "Termowizja paneli PV (wadliwe ogniwa)",
        "Dane do audytów energetycznych",
        "Fotogrametria i inspekcje dachów"
      ],
      price: "Wycena indywidualna",
      imageSrc: iconDrone,
      isPopular: false,
      backContent: "Dzięki zaawansowanym dronom z kamerami termowizyjnymi docieramy tam, gdzie wzrok nie sięga. Szybko ocenimy stan połaci dachowej, zajrzymy do kominów z góry i zmapujemy wszelkie mostki termiczne w elewacji. To potężne narzędzie diagnostyczne dla nowoczesnego inwestora."
    },
    {
      title: "Energetyka (ŚCHE)",
      description: "Dokumentacja energetyczna wymagana przy sprzedaży, wynajmie lub dotacjach",
      features: [
        "Świadectwa Charakterystyki Energetycznej",
        "Audyty energetyczne (Czyste Powietrze)",
        "Optymalizacja kosztów ogrzewania"
      ],
      price: "Wycena indywidualna",
      imageSrc: iconEnergy,
      isPopular: false,
      backContent: "Sprzedajesz lub wynajmujesz nieruchomość? Potrzebujesz Świadectwa Charakterystyki Energetycznej (ŚCHE). Dodatkowo sporządzamy kompleksowe audyty energetyczne, które pozwalają ubiegać się o dofinansowanie z programów takich jak 'Czyste Powietrze'."
    }
  ];

  return (
    <section className="scope-section" id="scope-container">
      <div className="scope-container">
        {/* Nagłówek */}
        <div className="scope-header">
          <h2>Przeglądy Techniczne Nieruchomości</h2>
          <p>Pytosz no czym się znomy? U nos mosz wszystko: od rzetelnej kontroli po dobro rada.</p>
        </div>

        {/* Lista kafelków */}
        <div className="scope-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`scope-card ${service.isPopular ? 'popular' : ''}`}
            >
              <div className="scope-card-inner">
                {/* Przód karty */}
                <div className="scope-card-front">
                  {service.isPopular && <span className="badge">Popularne</span>}

                  <div className="icon-wrapper">
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="service-icon-img"
                    />
                  </div>

                  <h3>{service.title}</h3>
                  <p className="description">{service.description}</p>

                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="price-tag">
                    {service.price}
                  </div>
                </div>

                {/* Tył karty */}
                <div className="scope-card-back">
                  <h3>{service.title} - Więcej informacji</h3>
                  <p className="back-description">{service.backContent}</p>
                  {/* Przycisk obracający powrotny (wymaga hover docelowo wiec mozna pominąć button, albo dać cta) */}
                  <div className="back-cta-wrapper">
                    {index < 3 ? (
                      <OrderButton
                        text="Umów przegląd"
                        onClick={scrollToInspectionForm}
                        showIcon={false}
                        padding="10px 20px"
                      />
                    ) : (
                      <CallButton phoneNumber="690029414" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scope;