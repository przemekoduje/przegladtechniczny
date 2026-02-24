import React, { useState } from 'react';
import './InspectionsTimeline.scss';
import OrderButton from '../OrderButton/OrderButton';

const timelineData = [
  {
    period: "CO 1 ROK",
    items: [
      {
        id: 1,
        title: "Przegląd instalacji gazowej",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3a1 1 0 0 1 .4.2 8 8 0 0 0 2.5 2.6z"></path></svg>
        ),
        details: {
          why: "Wymagane przez Towarzystwa Ubezpieczeń oraz Nadzór Budowlany np. w sytuacji pożaru lub wybuchu gazu.",
          responsible: "Właściciel domu jednorodzinnego.",
          executor: "Osoby posiadające kwalifikacje wymagane przy wykonywaniu dozoru nad eksploatacją sieci gazowych.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.1.c"
        }
      },
      {
        id: 2,
        title: "Przegląd kominiarski (Wentylacja)",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path><path d="M10 12h4"></path><path d="M12 4v16"></path><path d="M16 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path></svg>
        ),
        details: {
          why: "Ryzyko zatrucia czadem i pożaru sadzy. Brak przeglądu to częsta podstawa do odmowy wypłaty odszkodowania.",
          responsible: "Właściciel domu jednorodzinnego.",
          executor: "Mistrz kominiarski.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.1.c"
        }
      }
    ]
  },
  {
    period: "CO 5 LAT",
    items: [
      {
        id: 3,
        title: "Pomiary elektryczne i piorunochronne",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        ),
        details: {
          why: "Zwarcie instalacji to jedna z najczęstszych przyczyn pożarów. Niezbędne do polisy ubezpieczeniowej.",
          responsible: "Właściciel nieruchomości.",
          executor: "Elektryk z uprawnieniami pomiarowymi.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.2"
        }
      },
      {
        id: 4,
        title: "Generalny przegląd budowlany",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l8-4 8 4v14"></path><path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5"></path></svg>
        ),
        details: {
          why: "Ocena stanu technicznego elementów konstrukcyjnych, dachu i elewacji. Pozwala uniknąć drogich awarii.",
          responsible: "Właściciel lub zarządca.",
          executor: "Inżynier z uprawnieniami budowlanymi.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.2"
        }
      }
    ]
  }
];

const InspectionsTimeline = ({ user, onOrderClick }) => {
  const [activeId, setActiveId] = useState(null);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <h2>Zapamiętaj te terminy!</h2>
        <p>Lista obowiązkowych przeglądów wymaganych do ubezpieczenia domu.</p>
      </div>

      <div className="timeline-container">
        {/* Linia pionowa */}
        <div className="timeline-line-center"></div>

        {timelineData.map((group, groupIndex) => (
          <div key={groupIndex} className="timeline-group">
            {/* Znacznik czasu (np. CO 1 ROK) */}
            <div className="timeline-period-marker">
              <span>{group.period}</span>
            </div>

            <div className="timeline-items-wrapper">
              {group.items.map((item, index) => {
                const isActive = activeId === item.id;
                // Logika: nieparzyste na lewo, parzyste na prawo (w CSS)
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className={`timeline-item ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}
                  >
                    <div className="timeline-card" onClick={() => toggleItem(item.id)}>
                      <div className="card-header">
                        <div className="icon-box">
                          {item.icon}
                        </div>
                        <h3>{item.title}</h3>
                        <div className={`arrow-icon ${isActive ? 'rotated' : ''}`}>
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>

                      <div className={`card-body ${isActive ? 'open' : ''}`}>
                        <div className="card-content">
                          <div className="info-block">
                            <strong>Dlaczego to ważne?</strong>
                            <p>{item.details.why}</p>
                          </div>
                          <div className="info-block">
                            <strong>Kto odpowiada?</strong>
                            <p>{item.details.responsible}</p>
                          </div>
                          <div className="info-block">
                            <strong>Kto wykonuje?</strong>
                            <p>{item.details.executor}</p>
                          </div>
                          <div className="info-block legal">
                            <strong>Podstawa prawna:</strong>
                            <p>{item.details.legal}</p>
                          </div>

                          <div className="timeline-card-order-button">
                            <OrderButton
                              text="Umów przegląd"
                              userAvatar={user?.photoURL}
                              onClick={(e) => {
                                e.stopPropagation(); // Zapobiegamy zamknięciu karty
                                if (onOrderClick) onOrderClick();
                              }}
                              padding="4px 4px 4px 24px" // Nieco mniejszy padding dla karty
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Kropka łącząca z linią */}
                    <div className="timeline-dot"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspectionsTimeline;