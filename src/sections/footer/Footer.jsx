import React from 'react';
import { Link } from 'react-router-dom';
import { citiesData } from '../../helpers/citiesData';
import "./footer.scss";

export default function Footer() {
  const topCities = [
    "Gliwice", "Katowice", "Zabrze", "Bytom", "Ruda Śląska",
    "Chorzów", "Tarnowskie Góry", "Mikołów", "Tychy",
    "Dąbrowa Górnicza", "Jaworzno", "Sosnowiec", "Piekary Śląskie",
    "Pyskowice", "Rybnik"
  ];

  return (
    <footer className='footer' role="contentinfo">
      <div className="texts">
        <div className="footer-header">
          <span className="footer-logo">przeglady-domu.online</span>
          <p className="footer-tagline">
            Inżynierskie przeglądy techniczne nieruchomości – Gliwice, Katowice i cała Aglomeracja Śląska
          </p>
        </div>

        <div className="footer-links-grid">
          {/* USŁUGI */}
          <div className="footer-col">
            <h4 className="footer-col-title">Usługi Inżynierskie</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/przeglad-budowlany">Przegląd Budowlany (Roczny i 5-letni)</Link>
              </li>
              <li>
                <Link to="/przeglad-gazowy">Przegląd Instalacji Gazowej</Link>
              </li>
              <li>
                <Link to="/przeglad-elektryczny">Przegląd Instalacji Elektrycznej</Link>
              </li>
              <li>
                <Link to="/przeglad-wentylacyjny">Kontrola Wentylacji i Kominów</Link>
              </li>
              <li>
                <Link to="/blogDB">Baza Wiedzy i Blog Inżyniera</Link>
              </li>
              <li>
                <Link to="/form">Formularz Zamówienia Przeglądu</Link>
              </li>
            </ul>
          </div>

          {/* LOKALIZACJE - AGLOMERACJA ŚLĄSKA */}
          <div className="footer-col footer-col-wide">
            <h4 className="footer-col-title">Obszar Działania (Województwo Śląskie)</h4>
            <ul className="footer-cities-grid">
              {topCities.map((cityName) => {
                const city = citiesData.find((c) => c.name === cityName);
                const slug = city ? city.slug : cityName.toLowerCase().replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e').replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o').replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z');
                return (
                  <li key={cityName}>
                    <Link
                      to={`/przeglad-budowlany-${slug}`}
                      title={`Przegląd budowlany w mieście ${cityName}`}
                    >
                      {cityName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* UPRAWNIENIA & KONTAKT */}
          <div className="footer-col">
            <h4 className="footer-col-title">Kadra Inżynierska & Uprawnienia</h4>
            <div className="audytors">
              <div className="audytor_prze">
                <p className="audytor-name"><strong>Przemysław Rakotny</strong></p>
                <p className="audytor-contact">tel. <a href="tel:+48690029414">690 029 414</a></p>
                <p className="audytor-license">Uprawnienia budowlane: <strong>SLK/2122/OWOK/08</strong></p>
                <p className="audytor-register">Wpis do rejestru świadectw energetycznych: <strong>nr 38909</strong></p>
              </div>

              <div className="audytor_mar">
                <p className="audytor-name"><strong>Marcin Wróbel</strong></p>
                <p className="audytor-contact">tel. <a href="tel:+48502212512">502 212 512</a></p>
                <p className="audytor-license">Uprawnienia elektryczne SEP: <strong>E-1/1276/691/22, D-1/1277/691/22</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Przeglądy Techniczne Nieruchomości. Wszelkie prawa zastrzeżone.
          </p>
          <div className="legal-links">
            <Link to="/regulamin">Regulamin</Link>
            <span className="separator">|</span>
            <Link to="/polityka-prywatnosci">Polityka Prywatności</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
