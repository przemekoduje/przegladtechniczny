import React, { useEffect, useState } from "react";
import "./przegladG.scss"; // Używamy ten sam SCSS
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ServiceBlogSection from "../../components/ServiceBlogSection/ServiceBlogSection";

const PrzegladG = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Przegląd Instalacji Gazowej Gliwice & Śląsk | Szczelność i Bezpieczeństwo</title>
        <meta name="description" content="Obowiązkowy roczny przegląd gazowy w Gliwicach? Zadbaj o bezpieczeństwo swojej rodziny. Wykonujemy profesjonalne próby szczelności instalacji gazowych na całym Śląsku." />
        <link rel="canonical" href="https://przeglady-domu.com/przeglad-gazowy" />
      </Helmet>
      <section className="przeglad-gazowy">
        <div className="container_info">
          <h1>Przegląd instalacji gazowej</h1>

          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Zgodnie z art. 62 ustawy Prawo budowlane regularny przegląd
                instalacji gazowej jest obowiązkiem każdego właściciela
                nieruchomości. Skorzystaj z naszego kompleksowego przeglądu
                instalacji gazowej i zadbaj o bezpieczeństwo swoje oraz
                bliskich.
              </p>

              <button
                className="main_button"
                onClick={() => scrollToSection("inspection-form")}
              >
                <span>Umów przegląd</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>
              Dlaczego przegląd instalacji gazowej jest tak istotny i jak często
              należy go przeprowadzać?
            </p>
            <span>
              Przegląd instalacji gazowej jest obowiązkowy i należy
              przeprowadzać go co najmniej raz w roku (art. 62 ust. 1 pkt 1 lit.
              c ustawy Prawo budowlane). Ma to na celu wykrycie potencjalnych
              nieszczelności oraz innych usterek, które mogą prowadzić do
              wycieków gazu i stanowić zagrożenie dla zdrowia i życia
              użytkowników budynku.
            </span>
            <button
              className="main_button"
              onClick={() => scrollToSection("inspection-form")}
            >
              <span>Umów przegląd</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>
        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <ServiceBlogSection topic="gazowy" />
      </section>
    </>
  );
};

export default PrzegladG;
